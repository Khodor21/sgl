"use client";
// app/auth/components/RegisterForm.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/Toast";
import {
  Field,
  InputIcon,
  PrimaryButton,
  Divider,
  GoogleButton,
} from "./LoginForm";
import {
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineDown,
} from "react-icons/ai";

// ─── All 9 Lebanese governorates ───
const LEBANON_GOVERNORATES = [
  { value: "", label: "Select your governorate" },
  { value: "beirut", label: "Beirut — بيروت" },
  { value: "mount_lebanon", label: "Mount Lebanon — جبل لبنان" },
  { value: "north", label: "North Lebanon — الشمال" },
  { value: "akkar", label: "Akkar — عكار" },
  { value: "south", label: "South Lebanon — الجنوب" },
  { value: "nabatieh", label: "Nabatieh — النبطية" },
  { value: "bekaa", label: "Bekaa — البقاع" },
  { value: "baalbek_hermel", label: "Baalbek-Hermel — بعلبك الهرمل" },
];

export default function RegisterForm({ onSwitch, onSuccess }) {
  const { register, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    governorate: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // ─── Phone validation for Lebanon ───
  function isValidLebanesPhone(phone) {
    // Accepts: 70123456 / 03123456 / +96170123456 / 0096170123456
    const cleaned = phone.replace(/\s/g, "");
    return /^(\+961|00961|0)?[0-9]{7,8}$/.test(cleaned);
  }

  async function handleRegister(e) {
    e.preventDefault();

    // Client-side validation
    if (!form.firstName.trim())
      return toast.error("Please enter your first name.");
    if (!form.lastName.trim())
      return toast.error("Please enter your last name.");
    if (!isValidLebanesPhone(form.phone))
      return toast.error("Please enter a valid Lebanese phone number.");
    if (!form.governorate)
      return toast.error("Please select your governorate.");
    if (!form.email.trim())
      return toast.error("Please enter your email address.");
    if (form.password.length < 8)
      return toast.error("Password must be at least 8 characters.");

    setLoading(true);
    try {
      await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        governorate: form.governorate,
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Account created! Welcome to the store 🎉");
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
        Create account
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--color-secondary)" }}>
        Join us — it only takes a minute
      </p>

      <form onSubmit={handleRegister} noValidate>
        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name">
            <InputIcon icon={<AiOutlineUser />}>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </InputIcon>
          </Field>
          <Field label="Last name">
            <InputIcon icon={<AiOutlineUser />}>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </InputIcon>
          </Field>
        </div>

        {/* Phone number with Lebanon prefix */}
        <Field label="Phone number">
          <div className="flex gap-2 items-stretch">
            {/* Lebanon flag + code — static badge */}
            <div
              className="flex items-center gap-1.5 px-3 rounded-[10px] flex-shrink-0 font-semibold"
              style={{
                border: "1.5px solid #e8e8e8",
                background: "#f9f9f9",
                color: "#222",
                fontSize: "13px",
                minWidth: "78px",
                height: "48px",
              }}
            >
              🇱🇧 +961
            </div>
            {/* Phone input — no left padding override needed since prefix is outside */}
            <div className="relative flex-1">
              <span
                className="pointer-events-none absolute left-3.5 z-10"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.38,
                }}
              >
                <AiOutlinePhone />
              </span>
              <div className="auth-input-wrap">
                <input
                  type="tel"
                  name="phone"
                  placeholder="70 123 456"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <style>{`
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
                  transition: border 0.18s, box-shadow 0.18s;
                }
                .auth-input-wrap input:focus {
                  border-color: var(--color-primary);
                  box-shadow: 0 0 0 3px rgba(27, 83, 254, 0.08);
                }
                .auth-input-wrap input::placeholder { color: #bbb; }
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
                  cursor: pointer;
                }
                .auth-input-wrap select:focus {
                  border-color: var(--color-primary);
                  box-shadow: 0 0 0 3px rgba(27, 83, 254, 0.08);
                }
              `}</style>
            </div>
          </div>
        </Field>

        {/* Governorate */}
        <Field label="Governorate / المحافظة">
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3.5 z-10"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.38,
              }}
            >
              <AiOutlineEnvironment />
            </span>
            <div className="auth-input-wrap">
              <select
                name="governorate"
                value={form.governorate}
                onChange={handleChange}
                required
                style={{ color: form.governorate ? "#222" : "#bbb" }}
              >
                {LEBANON_GOVERNORATES.map((gov) => (
                  <option
                    key={gov.value}
                    value={gov.value}
                    disabled={gov.value === ""}
                  >
                    {gov.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Dropdown arrow */}
            <span
              className="pointer-events-none absolute right-3.5"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.4,
              }}
            >
              <AiOutlineDown size={14} />
            </span>
          </div>
        </Field>

        {/* Email */}
        <Field label="Email">
          <InputIcon icon={<AiOutlineMail />}>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </InputIcon>
        </Field>

        {/* Password */}
        <Field label="Password">
          <InputIcon icon={<AiOutlineLock />}>
            <input
              type="password"
              name="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </InputIcon>
        </Field>

        <PrimaryButton loading={loading}>Create account</PrimaryButton>
      </form>

      <p
        className="text-center mt-4"
        style={{
          fontSize: "11.5px",
          color: "var(--color-secondary)",
          lineHeight: 1.6,
        }}
      >
        By creating an account you agree to our{" "}
        <Link
          href="/terms"
          className="font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Privacy Policy
        </Link>
      </p>

      <Divider />
      <GoogleButton onClick={handleGoogle} loading={loading} />

      <p
        className="text-center mt-5 text-sm"
        style={{ color: "var(--color-secondary)" }}
      >
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold cursor-pointer"
          style={{
            color: "var(--color-primary)",
            background: "none",
            border: "none",
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}

// ─── Firebase error code → human message ───
function getErrorMessage(code) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

// ─── SVG Icons ───
