"use client";
// app/auth/page.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftPanel from "./components/LeftPanel";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const router = useRouter();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left branding panel — hidden on mobile */}
      <LeftPanel />

      {/* Right form panel */}
      <div
        className="flex items-center justify-center bg-white px-6 py-12 lg:px-10"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-full max-w-md">
          {/* Mode Tabs */}
          <div
            className="flex gap-0 rounded-xl p-1 mb-8"
            style={{
              border: "1.5px solid #ebebeb",
              background: "var(--color-app-grey)",
            }}
          >
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-[9px] transition-all duration-200 cursor-pointer"
                style={{
                  background: mode === t ? "#fff" : "transparent",
                  color:
                    mode === t
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                  boxShadow:
                    mode === t ? "0 1px 4px rgba(27,83,254,0.08)" : "none",
                  border: "none",
                }}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Form Content */}
          {mode === "login" ? (
            <LoginForm
              onSwitch={() => setMode("register")}
              onSuccess={() => router.push("/")}
            />
          ) : (
            <RegisterForm
              onSwitch={() => setMode("login")}
              onSuccess={() => router.push("/")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
