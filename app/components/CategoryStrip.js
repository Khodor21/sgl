"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import categories from "../../data/categories.json";

export default function CategoryStrip() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);

  // ✅ Auto scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let interval;

    const startScroll = () => {
      interval = setInterval(() => {
        if (!container) return;

        container.scrollBy({
          left: 200,
          behavior: "smooth",
        });

        // loop back
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 2500);
    };

    const stopScroll = () => clearInterval(interval);

    startScroll();

    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  // ✅ Manual scroll (arrows)
  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full mb-8">
      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-black text-sm sm:text-base lg:text-lg font-extrabold">
          Top Categories
        </h1>

        {/* Arrows only on laptops */}
        <div className="hidden lg:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ✅ Scroll row */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 md:gap-10 overflow-x-auto scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((cat) => {
          const isActive = active === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className={`
                relative flex-shrink-0
                
                basis-[28%]       
                sm:basis-[22%]    
                md:basis-[17%]    
                lg:basis-[14%]    
                
                aspect-square
                overflow-hidden
                transition-all duration-200
                snap-start
                rounded-xl
              `}
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full" />

              {isActive && <div className="absolute inset-0 bg-[#1B53FE]/10" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
