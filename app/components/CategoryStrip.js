"use client";

import { useState } from "react";
import categories from "../../data/categories.json";

export default function CategoryStrip() {
  const [active, setActive] = useState(null);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-base text-[#222222] leading-tight">
          Our Categories
        </h1>
      </div>

      {/* ── Mobile Layout: Grid with 3 images per line ── */}
      <div className="md:hidden grid grid-cols-3 gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isActive = active === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className="relative aspect-square overflow-hidden transition-all duration-200 rounded-xl"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
              />

              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/10" />}
            </button>
          );
        })}
      </div>

      {/* ── Desktop Layout: Flex row, justify-between, full screen width ── */}
      <div className="hidden md:flex justify-between gap-4 w-full">
        {categories.map((cat) => {
          const isActive = active === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className="relative flex-1 aspect-square overflow-hidden transition-all duration-200 rounded-xl"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
              />

              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/10" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
