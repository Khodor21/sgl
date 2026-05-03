import {
  MdPerson,
  MdEmail,
  MdLock,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";
import Field from "./Field";
import InputIcon from "./InputIcon";
import PrimaryButton from "./PrimaryButton";
import Divider from "./Divider";
import GoogleButton from "./GoogleButton";

// All Lebanese governorates (محافظات لبنان)
const LEBANON_GOVERNORATES = [
  { value: "", label: "Select your governorate / اختر محافظتك" },
  { value: "beirut", label: "Beirut — بيروت" },
  { value: "mount_lebanon", label: "Mount Lebanon — جبل لبنان" },
  { value: "north", label: "North Lebanon — الشمال" },
  { value: "akkar", label: "Akkar — عكار" },
  { value: "south", label: "South Lebanon — الجنوب" },
  { value: "nabatieh", label: "Nabatieh — النبطية" },
  { value: "bekaa", label: "Bekaa — البقاع" },
  { value: "baalbek_hermel", label: "Baalbek-Hermel — بعلبك الهرمل" },
];

export default function RegisterForm({ onSwitch }) {
  return (
    <div>
      <h2
        className="text-2xl font-extrabold mb-1"
        style={{ letterSpacing: "-0.5px", color: "var(--app-black)" }}
      >
        Create account
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--secondary)" }}>
        Join us — it only takes a minute
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name">
            <InputIcon icon={<MdPerson size={18} color="#222" />}>
              <input type="text" placeholder="John" />
            </InputIcon>
          </Field>
          <Field label="Last name">
            <InputIcon icon={<MdPerson size={18} color="#222" />}>
              <input type="text" placeholder="Doe" />
            </InputIcon>
          </Field>
        </div>

        {/* Phone Number */}
        <Field label="Phone number">
          <div className="flex gap-2">
            {/* Lebanon country code badge */}
            <div
              className="flex items-center gap-1.5 px-3 rounded-[10px] flex-shrink-0 font-semibold text-sm"
              style={{
                border: "1.5px solid #e8e8e8",
                background: "#f9f9f9",
                color: "var(--app-black)",
                minWidth: "72px",
                fontSize: "13px",
              }}
            >
              🇱🇧 +961
            </div>
            <InputIcon icon={<MdPhone size={18} color="#222" />}>
              <input
                type="tel"
                placeholder="70 123 456"
                style={{ borderRadius: "10px" }}
              />
            </InputIcon>
          </div>
        </Field>

        {/* Email */}
        <Field label="Email address">
          <InputIcon icon={<MdEmail size={18} color="#222" />}>
            <input type="email" placeholder="you@example.com" />
          </InputIcon>
        </Field>

        {/* Governorate */}
        <Field label="Governorate / المحافظة">
          <InputIcon icon={<MdLocationOn size={18} color="#222" />}>
            <select defaultValue="">
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
          </InputIcon>
          {/* Dropdown arrow */}
          <span
            className="pointer-events-none absolute right-3.5"
            style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.45 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#222"
              strokeWidth="2.5"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Field>

        {/* Password */}
        <Field label="Password">
          <InputIcon icon={<MdLock size={18} color="#222" />}>
            <input type="password" placeholder="Min. 8 characters" />
          </InputIcon>
        </Field>

        <PrimaryButton>Create account</PrimaryButton>
      </form>

      <p
        className="text-center mt-4"
        style={{
          fontSize: "11.5px",
          color: "var(--secondary)",
          lineHeight: 1.6,
        }}
      >
        By creating an account you agree to our{" "}
        <a
          href="#"
          className="font-semibold"
          style={{ color: "var(--primary)" }}
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-semibold"
          style={{ color: "var(--primary)" }}
        >
          Privacy Policy
        </a>
      </p>

      <Divider />
      <GoogleButton />

      <p
        className="text-center mt-5 text-sm"
        style={{ color: "var(--secondary)" }}
      >
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold cursor-pointer"
          style={{
            color: "var(--primary)",
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
