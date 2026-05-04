"use client";
// app/auth/components/LoginForm.js
import { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/Toast";

export default function LoginForm({ onSwitch, onSuccess }) {
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! You are now signed in.");
      onSuccess();
    } catch (err) {
      toast.error(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google successfully!");
      onSuccess();
    } catch (err) {
      toast.error(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2
        className="text-2xl font-extrabold mb-1"
        style={{ letterSpacing: "-0.5px" }}
      >
        Welcome back
      </h2>
      <p className="text-sm mb-7" style={{ color: "var(--color-secondary)" }}>
        Sign in to your account to continue
      </p>

      <form onSubmit={handleLogin} noValidate>
        <Field label="Email address">
          <InputIcon icon={<FiMail size={16} color="#222" />}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputIcon>
        </Field>

        <Field label="Password">
          <InputIcon icon={<FiLock size={16} color="#222" />}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputIcon>
        </Field>

        <div className="text-right mb-5 -mt-2">
          <Link
            href="/auth/forgot-password"
            className="text-xs font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Forgot password?
          </Link>
        </div>

        <PrimaryButton loading={loading}>Sign in</PrimaryButton>
      </form>

      <Divider />
      <GoogleButton onClick={handleGoogle} loading={loading} />

      <p
        className="text-center mt-5 text-sm"
        style={{ color: "var(--color-secondary)" }}
      >
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold cursor-pointer"
          style={{
            color: "var(--color-primary)",
            background: "none",
            border: "none",
          }}
        >
          Create one
        </button>
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════
// Shared UI components (exported for RegisterForm)
// ════════════════════════════════════════════════

export function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "#222" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function InputIcon({ icon, children }) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3.5 z-10"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.38 }}
      >
        {icon}
      </span>
      <div className="auth-input-wrap">{children}</div>
      <style>{`
        .auth-input-wrap input,
        .auth-input-wrap select {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-family: "Manrope", sans-serif;
          font-size: 14px;
          color: #222;
          background: #fff;
          outline: none;
          transition: border 0.18s, box-shadow 0.18s;
          appearance: none;
          -webkit-appearance: none;
        }
        .auth-input-wrap input:focus,
        .auth-input-wrap select:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(27, 83, 254, 0.08);
        }
        .auth-input-wrap input::placeholder {
          color: #bbb;
        }
        .auth-input-wrap select {
          cursor: pointer;
          color: #222;
        }
      `}</style>
    </div>
  );
}

export function PrimaryButton({ children, loading, type = "submit" }) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full py-3.5 rounded-xl text-white font-bold transition-all duration-200 cursor-pointer mt-1"
      style={{
        background: loading ? "#7fa0fe" : "var(--color-primary)",
        border: "none",
        fontSize: "15px",
        letterSpacing: "-0.2px",
        opacity: loading ? 0.85 : 1,
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner /> Please wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1" style={{ height: 1, background: "#ebebeb" }} />
      <span
        className="text-xs whitespace-nowrap"
        style={{ color: "var(--color-secondary)" }}
      >
        or continue with
      </span>
      <div className="flex-1" style={{ height: 1, background: "#ebebeb" }} />
    </div>
  );
}

export function GoogleButton({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
      style={{
        padding: "13px",
        border: "1.5px solid #e8e8e8",
        background: "#fff",
        color: "#222",
        fontFamily: "Manrope, sans-serif",
        opacity: loading ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.borderColor = "#d0d0d0";
          e.currentTarget.style.background = "#fafafa";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e8e8e8";
        e.currentTarget.style.background = "#fff";
      }}
    >
      <FcGoogle size={18} />
      Continue with Google
    </button>
  );
}

// ─── Spinner ───
function Spinner() {
  return (
    <FiLoader size={16} style={{ animation: "spin 0.7s linear infinite" }} />
  );
}

// ─── Firebase error code → human message ───
function getErrorMessage(code) {
  const map = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}
