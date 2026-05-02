"use client";

import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#AEAEAE]/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#f7f6fb] transition-colors"
      >
        <span className="font-bold text-[#222222] text-sm">{title}</span>
        {open ? (
          <BsChevronUp size={15} className="text-[#AEAEAE]" />
        ) : (
          <BsChevronDown size={15} className="text-[#AEAEAE]" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 bg-white text-sm text-[#444444] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
