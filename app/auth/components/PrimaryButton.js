import React from "react";



export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-tight transition-all duration-200 cursor-pointer mt-1"
      style={{
        background: "var(--primary)",
        border: "none",
        fontSize: "15px",
        letterSpacing: "-0.2px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-dark)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}
