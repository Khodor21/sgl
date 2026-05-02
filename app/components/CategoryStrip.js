"use client";

import { useRef, useState } from "react";
import categories from "../../data/categories.json";

export default function CategoryStrip() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);

  return (
    <div className="w-full">
      <h1>Top Categories</h1>
      {/* Scrollable row — hidden scrollbar, x-scroll only */}
      <div
        ref={scrollRef}
        className="no-scrollbar w-full flex gap-20 overflow-x-auto scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat) => {
          const isActive = active === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className={`
                  relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px]
                   overflow-hidden transition-all duration-200
                  
                `}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
              />
              {/* Active overlay tint */}
              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/10" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
