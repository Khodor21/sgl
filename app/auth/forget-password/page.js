"use client";
// app/auth/forgot-password/page.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/Toast";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address.");
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
      toast.success("Reset link sent! Check your inbox.");
    } catch {
      toast.error("No account found with this email address.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-app-grey)" }}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-8"
        style={{ border: "1.5px solid #ebebeb" }}
      >
        {sent ? (
          /* ── Success state ── */
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, background: "#e8f0ff" }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              >
                <path d="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h9" />
                <path d="M2 7l10 7 10-7" />
                <path
                  d="M16 19l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold mb-2">Check your inbox</h2>
            <p
              className="text-sm mb-2"
              style={{ color: "var(--color-secondary)" }}
            >
              We sent a password reset link to
            </p>
            <p className="text-sm font-bold mb-6" style={{ color: "#222" }}>
              {email}
            </p>
            <p
              className="text-xs mb-6"
              style={{ color: "var(--color-secondary)" }}
            >
              Didn&apos;t receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSent(false)}
                className="font-semibold"
                style={{
                  color: "var(--color-primary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                try again
              </button>
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-1.5 text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M19 12H5M12 5l-7 7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to sign in
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div className="mb-6">
              <Link
                href="/auth"
                className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6"
                style={{ color: "var(--color-secondary)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M19 12H5M12 5l-7 7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to sign in
              </Link>
              <h2
                className="text-2xl font-extrabold mb-1 mt-4"
                style={{ letterSpacing: "-0.5px" }}
              >
                Reset password
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-secondary)" }}
              >
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "#222" }}
              >
                Email address
              </label>
              <div className="relative mb-6">
                <span
                  className="pointer-events-none absolute left-3.5"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.35,
                  }}
                >
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
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 42px",
                    border: "1.5px solid #e8e8e8",
                    borderRadius: 10,
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 14,
                    outline: "none",
                    transition: "border 0.18s, box-shadow 0.18s",
                    color: "#222",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--color-primary)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(27,83,254,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8e8e8";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                style={{
                  background: loading ? "#7fa0fe" : "var(--color-primary)",
                  border: "none",
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
