"use client";

import { useState } from "react";
import categories from "../../data/categories.json";

export default function CategoryStrip() {
  const [active, setActive] = useState(null);

  return (
    <div className="w-full mb-6">
      <h1
        className="text-lg md:text-2xl text-[#222222] md:-tight mt-1"
        style={{ fontWeight: 800 }}
      >
        {" "}
        Our Categories
      </h1>

      {/* ── Mobile: 3-column grid ── */}
      <div className="md:hidden grid grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                isActive ? "ring-2 ring-[#1B53FE]" : ""
              }`}
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover object-center"
              />
              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/15" />}
            </button>
          );
        })}
      </div>

      {/* ── Desktop: flex row ── */}
      <div className="hidden md:flex justify-between gap-3 w-full">
        {categories.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className={`relative flex-1 overflow-hidden rounded-xl transition-all duration-200 ${
                isActive ? "ring-2 ring-[#1B53FE]" : ""
              }`}
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover object-center"
              />
              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/15" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
