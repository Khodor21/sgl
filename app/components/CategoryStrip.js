"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import categories from "../../data/categories.json";

export default function CategoryStrip() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.children.length < 2) return;

    const getScrollAmount = () => {
      const first = container.children[0];
      const second = container.children[1];
      if (!first || !second) return 200;
      return second.offsetLeft - first.offsetLeft;
    };

    let interval;
    let resetTimeout;

    const startScroll = () => {
      interval = setInterval(() => {
        if (!container) return;

        const scrollAmount = getScrollAmount();
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - scrollAmount) {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
          resetTimeout = setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }, 600);
          clearInterval(interval);
          resetTimeout = setTimeout(() => {
            startScroll();
          }, 1000);
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 2500);
    };

    const stopScroll = () => {
      clearInterval(interval);
      clearTimeout(resetTimeout);
    };

    startScroll();

    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container || container.children.length < 2) return;

    const scrollAmount =
      container.children[1].offsetLeft - container.children[0].offsetLeft;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <h1
          className="text-lg text-[#222222] leading-tight"
          style={{ fontWeight: 800 }}
        >
          Top Categories
        </h1>

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

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-3 md:gap-6 overflow-x-auto scroll-smooth"
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
                
                basis-[22%]       
                sm:basis-[18%]    
                md:basis-[14%]    
                lg:basis-[11%]    
                
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
