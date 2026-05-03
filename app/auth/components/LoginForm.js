import { MdEmail, MdLock } from "react-icons/md";
import Field from "./Field";
import InputIcon from "./InputIcon";
import PrimaryButton from "./PrimaryButton";
import Divider from "./Divider";
import GoogleButton from "./GoogleButton";

export default function LoginForm({ onSwitch }) {
  return (
    <div>
      <h2
        className="text-2xl font-extrabold mb-1"
        style={{ letterSpacing: "-0.5px", color: "var(--app-black)" }}
      >
        Welcome back
      </h2>
      <p className="text-sm mb-7" style={{ color: "var(--secondary)" }}>
        Sign in to your account to continue
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <Field label="Email address">
          <InputIcon icon={<MdEmail size={18} color="#222" />}>
            <input type="email" placeholder="you@example.com" />
          </InputIcon>
        </Field>

        <Field label="Password">
          <InputIcon icon={<MdLock size={18} color="#222" />}>
            <input type="password" placeholder="Enter your password" />
          </InputIcon>
        </Field>

        <div className="text-right mb-5 -mt-2">
          <a
            href="#"
            className="text-xs font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Forgot password?
          </a>
        </div>

        <PrimaryButton>Sign in</PrimaryButton>
      </form>

      <Divider />
      <GoogleButton />

      <p
        className="text-center mt-5 text-sm"
        style={{ color: "var(--secondary)" }}
      >
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold cursor-pointer"
          style={{
            color: "var(--primary)",
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
