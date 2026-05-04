"use client";
// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = logged out, object = logged in
  const [authLoading, setAuthLoading] = useState(true); // true until Firebase resolves

  // ─── Listen to Firebase auth state (persists across page refreshes) ───
  // Firebase automatically stores the session in IndexedDB/localStorage.
  // onAuthStateChanged fires on every page load and tells us if the user is still signed in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Merge Firebase user with our extra Firestore fields (name, phone, governorate...)
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          const firestoreData = snap.exists() ? snap.data() : {};
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            ...firestoreData, // firstName, lastName, phone, governorate, role, fcmTokens
          });
        } catch {
          // Firestore read failed but user IS logged in — set basic user
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ─── Login ───
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  // ─── Register (email + password + Lebanese fields) ───
  async function register({
    firstName,
    lastName,
    phone,
    governorate,
    email,
    password,
  }) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    await updateProfile(firebaseUser, {
      displayName: `${firstName} ${lastName}`,
    });

    // Save full profile to Firestore
    await setDoc(doc(db, "users", firebaseUser.uid), {
      uid: firebaseUser.uid,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone, // Lebanese phone — very important for orders & delivery
      governorate, // One of the 9 Lebanese governorates
      email,
      role: "customer",
      fcmTokens: [], // Push notification tokens — ready for next phase
      createdAt: serverTimestamp(),
    });

    return firebaseUser;
  }

  // ─── Google Sign-In ───
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Only create Firestore doc on first Google login
    const snap = await getDoc(doc(db, "users", firebaseUser.uid));
    if (!snap.exists()) {
      const nameParts = (firebaseUser.displayName || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        firstName,
        lastName,
        fullName: firebaseUser.displayName || "",
        phone: "", // They can complete profile later
        governorate: "",
        email: firebaseUser.email,
        role: "customer",
        fcmTokens: [],
        createdAt: serverTimestamp(),
      });
    }

    return firebaseUser;
  }

  // ─── Forgot password ───
  async function forgotPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  // ─── Logout ───
  async function logout() {
    await signOut(auth);
    // Firebase automatically clears its session storage
    // No need to clear anything manually
  }

  // ─── Helpers for components ───
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isLoggedIn,
        isAdmin,
        login,
        register,
        loginWithGoogle,
        forgotPassword,
        logout,
      }}
    >
      {/* Don't render children until Firebase resolves the auth state */}
      {/* This prevents flash of wrong UI (e.g. showing "Sign in" to a logged-in user) */}
      {!authLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
