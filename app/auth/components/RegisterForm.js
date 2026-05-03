// import {
//   MdPerson,
//   MdEmail,
//   MdLock,
//   MdPhone,
//   MdLocationOn,
// } from "react-icons/md";
// import Field from "./Field";
// import InputIcon from "./InputIcon";
// import PrimaryButton from "./PrimaryButton";
// import Divider from "./Divider";
// import GoogleButton from "./GoogleButton";

// // All Lebanese governorates (محافظات لبنان)
// const LEBANON_GOVERNORATES = [
//   { value: "", label: "Select your governorate / اختر محافظتك" },
//   { value: "beirut", label: "Beirut — بيروت" },
//   { value: "mount_lebanon", label: "Mount Lebanon — جبل لبنان" },
//   { value: "north", label: "North Lebanon — الشمال" },
//   { value: "akkar", label: "Akkar — عكار" },
//   { value: "south", label: "South Lebanon — الجنوب" },
//   { value: "nabatieh", label: "Nabatieh — النبطية" },
//   { value: "bekaa", label: "Bekaa — البقاع" },
//   { value: "baalbek_hermel", label: "Baalbek-Hermel — بعلبك الهرمل" },
// ];

// export default function RegisterForm({ onSwitch }) {
//   return (
//     <div>
//       <h2
//         className="text-2xl font-extrabold mb-1"
//         style={{ letterSpacing: "-0.5px", color: "var(--app-black)" }}
//       >
//         Create account
//       </h2>
//       <p className="text-sm mb-6" style={{ color: "var(--secondary)" }}>
//         Join us — it only takes a minute
//       </p>

//       <form onSubmit={(e) => e.preventDefault()}>
//         {/* First Name & Last Name */}
//         <div className="grid grid-cols-2 gap-4">
//           <Field label="First name">
//             <InputIcon icon={<MdPerson size={18} color="#222" />}>
//               <input type="text" placeholder="John" />
//             </InputIcon>
//           </Field>
//           <Field label="Last name">
//             <InputIcon icon={<MdPerson size={18} color="#222" />}>
//               <input type="text" placeholder="Doe" />
//             </InputIcon>
//           </Field>
//         </div>

//         {/* Phone Number */}
//         <Field label="Phone number">
//           <div className="flex gap-2">
//             {/* Lebanon country code badge */}
//             <div
//               className="flex items-center gap-1.5 px-3 rounded-[10px] flex-shrink-0 font-semibold text-sm"
//               style={{
//                 border: "1.5px solid #e8e8e8",
//                 background: "#f9f9f9",
//                 color: "var(--app-black)",
//                 minWidth: "72px",
//                 fontSize: "13px",
//               }}
//             >
//               🇱🇧 +961
//             </div>
//             <InputIcon icon={<MdPhone size={18} color="#222" />}>
//               <input
//                 type="tel"
//                 placeholder="70 123 456"
//                 style={{ borderRadius: "10px" }}
//               />
//             </InputIcon>
//           </div>
//         </Field>

//         {/* Email */}
//         <Field label="Email address">
//           <InputIcon icon={<MdEmail size={18} color="#222" />}>
//             <input type="email" placeholder="you@example.com" />
//           </InputIcon>
//         </Field>

//         {/* Governorate */}
//         <Field label="Governorate / المحافظة">
//           <InputIcon icon={<MdLocationOn size={18} color="#222" />}>
//             <select defaultValue="">
//               {LEBANON_GOVERNORATES.map((gov) => (
//                 <option
//                   key={gov.value}
//                   value={gov.value}
//                   disabled={gov.value === ""}
//                 >
//                   {gov.label}
//                 </option>
//               ))}
//             </select>
//           </InputIcon>
//           {/* Dropdown arrow */}
//           <span
//             className="pointer-events-none absolute right-3.5"
//             style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.45 }}
//           >
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#222"
//               strokeWidth="2.5"
//             >
//               <path
//                 d="M6 9l6 6 6-6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </span>
//         </Field>

//         {/* Password */}
//         <Field label="Password">
//           <InputIcon icon={<MdLock size={18} color="#222" />}>
//             <input type="password" placeholder="Min. 8 characters" />
//           </InputIcon>
//         </Field>

//         <PrimaryButton>Create account</PrimaryButton>
//       </form>

//       <p
//         className="text-center mt-4"
//         style={{
//           fontSize: "11.5px",
//           color: "var(--secondary)",
//           lineHeight: 1.6,
//         }}
//       >
//         By creating an account you agree to our{" "}
//         <a
//           href="#"
//           className="font-semibold"
//           style={{ color: "var(--primary)" }}
//         >
//           Terms
//         </a>{" "}
//         and{" "}
//         <a
//           href="#"
//           className="font-semibold"
//           style={{ color: "var(--primary)" }}
//         >
//           Privacy Policy
//         </a>
//       </p>

//       <Divider />
//       <GoogleButton />

//       <p
//         className="text-center mt-5 text-sm"
//         style={{ color: "var(--secondary)" }}
//       >
//         Already have an account?{" "}
//         <button
//           onClick={onSwitch}
//           className="font-bold cursor-pointer"
//           style={{
//             color: "var(--primary)",
//             background: "none",
//             border: "none",
//           }}
//         >
//           Sign in
//         </button>
//       </p>
//     </div>
//   );
// }

"use client";
// app/auth/components/RegisterForm.js
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import {
  Field,
  InputIcon,
  PrimaryButton,
  Divider,
  GoogleButton,
  ErrorBanner,
} from "./LoginForm";

export default function RegisterForm({ onSwitch, onSuccess }) {
  const { register, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
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
        Create account
      </h2>
      <p className="text-sm mb-7" style={{ color: "var(--color-secondary)" }}>
        Join us — it only takes a minute
      </p>

      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleRegister} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name">
            <InputIcon icon={<UserIcon />}>
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
            <InputIcon icon={<UserIcon />}>
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

        <Field label="Email address">
          <InputIcon icon={<EmailIcon />}>
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

        <Field label="Password">
          <InputIcon icon={<LockIcon />}>
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
const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#222"
    strokeWidth="2"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

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
