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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extra user data from Firestore
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        setUser({ ...firebaseUser, ...snap.data() });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ─── Login with email/password ───
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  // ─── Register with email/password ───
  async function register(firstName, lastName, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    // Update Firebase display name
    await updateProfile(firebaseUser, {
      displayName: `${firstName} ${lastName}`,
    });

    // Save user to Firestore "users" collection
    await setDoc(doc(db, "users", firebaseUser.uid), {
      uid: firebaseUser.uid,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      role: "customer", // used later for admin vs customer
      fcmTokens: [], // for push notifications later
      createdAt: serverTimestamp(),
    });

    return firebaseUser;
  }

  // ─── Google Sign-In ───
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // Create Firestore doc only if first time
    const snap = await getDoc(doc(db, "users", firebaseUser.uid));
    if (!snap.exists()) {
      const [firstName, ...rest] = (firebaseUser.displayName || "").split(" ");
      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        firstName: firstName || "",
        lastName: rest.join(" ") || "",
        fullName: firebaseUser.displayName || "",
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
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        forgotPassword,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
