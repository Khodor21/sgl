"use client";

import { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import ProductCard from "./ProductCard";

export default function ProductGrid({ title, bannerLabel, products }) {
  const scrollRef = useRef(null);

  return (
    <section className="w-full">
      {/* Category Banner */}
      <div className="flex items-end gap-3 mb-5 px-1">
        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] font-600 uppercase tracking-widest text-[#AEAEAE]"
            style={{ fontWeight: 600 }}
          >
            {bannerLabel || ""}
          </p>
          <h2
            className="text-xl font-800 text-[#222222] leading-tight"
            style={{ fontWeight: 800 }}
          >
            {title}
          </h2>
        </div>
        <button
          className="flex items-center text[13px] font-700 text-primary whitespace-nowrap  hover:bg-[#1B53FE] hover:text-white transition-all duration-200"
          style={{ fontWeight: 700 }}
        >
          View All
          <MdOutlineKeyboardArrowRight size={17} />
        </button>
      </div>

      {/* Scrollable Grid */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none"
            style={{
              scrollSnapAlign: "start",
              // Mobile: 85vw (shows hint of next), sm: 45%, md: 30%, lg+: 20%
              width: "clamp(260px, 85vw, 320px)",
            }}
          >
            {/* Responsive width overrides via Tailwind */}
            <div
              className="
              w-full
              sm:w-[220px]
              md:w-[210px]
              lg:w-[220px]
              xl:w-[230px]
              h-full
            "
            >
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint Fade — mobile only */}
      <div className="pointer-events-none relative -mt-2 h-0 sm:hidden">
        {/* just decorative, actual hint is partial card visibility */}
      </div>
    </section>
  );
}
