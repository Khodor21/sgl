import React from "react";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export default function Field({ label, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "var(--app-black)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
