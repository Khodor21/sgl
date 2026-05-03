"use client";
// app/auth/forgot-password/page.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError("No account found with this email address.");
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
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "#e8f0ff" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              >
                <path d="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h9" />
                <path d="M2 7l10 7 10-7" />
                <path d="M16 19l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold mb-2">Check your inbox</h2>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-secondary)" }}
            >
              We sent a reset link to <strong>{email}</strong>. Check your spam
              folder if you don&apos;t see it.
            </p>
            <Link
              href="/auth"
              className="text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h2
              className="text-2xl font-extrabold mb-1"
              style={{ letterSpacing: "-0.5px" }}
            >
              Reset password
            </h2>
            <p
              className="text-sm mb-7"
              style={{ color: "var(--color-secondary)" }}
            >
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div
                className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: "#fff0f0",
                  color: "#c0392b",
                  border: "1.5px solid #f5c6c6",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <label className="block text-xs font-semibold mb-1.5">
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
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold"
                style={{
                  background: loading ? "#7fa0fe" : "var(--color-primary)",
                  border: "none",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <p
              className="text-center mt-5 text-sm"
              style={{ color: "var(--color-secondary)" }}
            >
              Remember it?{" "}
              <Link
                href="/auth"
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
