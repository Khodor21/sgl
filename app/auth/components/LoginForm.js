// import { MdEmail, MdLock } from "react-icons/md";
// import Field from "./Field";
// import InputIcon from "./InputIcon";
// import PrimaryButton from "./PrimaryButton";
// import Divider from "./Divider";
// import GoogleButton from "./GoogleButton";

// export default function LoginForm({ onSwitch }) {
//   return (
//     <div>
//       <h2
//         className="text-2xl font-extrabold mb-1"
//         style={{ letterSpacing: "-0.5px", color: "var(--app-black)" }}
//       >
//         Welcome back
//       </h2>
//       <p className="text-sm mb-7" style={{ color: "var(--secondary)" }}>
//         Sign in to your account to continue
//       </p>

//       <form onSubmit={(e) => e.preventDefault()}>
//         <Field label="Email address">
//           <InputIcon icon={<MdEmail size={18} color="#222" />}>
//             <input type="email" placeholder="you@example.com" />
//           </InputIcon>
//         </Field>

//         <Field label="Password">
//           <InputIcon icon={<MdLock size={18} color="#222" />}>
//             <input type="password" placeholder="Enter your password" />
//           </InputIcon>
//         </Field>

//         <div className="text-right mb-5 -mt-2">
//           <a
//             href="#"
//             className="text-xs font-semibold"
//             style={{ color: "var(--primary)" }}
//           >
//             Forgot password?
//           </a>
//         </div>

//         <PrimaryButton>Sign in</PrimaryButton>
//       </form>

//       <Divider />
//       <GoogleButton />

//       <p
//         className="text-center mt-5 text-sm"
//         style={{ color: "var(--secondary)" }}
//       >
//         Don&apos;t have an account?{" "}
//         <button
//           onClick={onSwitch}
//           className="font-bold cursor-pointer"
//           style={{
//             color: "var(--primary)",
//             background: "none",
//             border: "none",
//           }}
//         >
//           Create one
//         </button>
//       </p>
//     </div>
//   );
// }
"use client";
// app/auth/components/LoginForm.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function LoginForm({ onSwitch, onSuccess }) {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err.code));
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

      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleLogin} noValidate>
        <Field label="Email address">
          <InputIcon icon={<EmailIcon />}>
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
          <InputIcon icon={<LockIcon />}>
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

// ─── Shared UI pieces (local to auth) ───

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
        className="pointer-events-none absolute left-3.5"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.35 }}
      >
        {icon}
      </span>
      <div className="auth-input-wrap">{children}</div>
      <style jsx>{`
        .auth-input-wrap input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-family: "Manrope", sans-serif;
          font-size: 14px;
          color: #222;
          background: #fff;
          outline: none;
          transition:
            border 0.18s,
            box-shadow 0.18s;
        }
        .auth-input-wrap input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(27, 83, 254, 0.08);
        }
        .auth-input-wrap input::placeholder {
          color: #bbb;
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
      }}
    >
      {loading ? "Please wait..." : children}
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
      }}
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

export function ErrorBanner({ message }) {
  return (
    <div
      className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
      style={{
        background: "#fff0f0",
        color: "#c0392b",
        border: "1.5px solid #f5c6c6",
      }}
    >
      {message}
    </div>
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

// ─── SVG Icons ───
const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#222"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#222"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);
