import React from "react";



export default function InputIcon({ icon, children }: InputIconProps) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3.5 z-10"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
      >
        {icon}
      </span>
      <div className="input-field-wrapper">{children}</div>
      <style>{`
        .input-field-wrapper input,
        .input-field-wrapper select {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-family: "Manrope", sans-serif;
          font-size: 14px;
          color: var(--app-black);
          background: #fff;
          outline: none;
          transition: border 0.18s, box-shadow 0.18s;
          appearance: none;
          -webkit-appearance: none;
        }
        .input-field-wrapper input:focus,
        .input-field-wrapper select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(27, 83, 254, 0.08);
        }
        .input-field-wrapper input::placeholder {
          color: #bbb;
        }
        .input-field-wrapper select {
          cursor: pointer;
          color: var(--app-black);
        }
        .input-field-wrapper select option {
          color: var(--app-black);
        }
      `}</style>
    </div>
  );
}
