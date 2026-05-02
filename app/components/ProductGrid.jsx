"use client";

import { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
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
          className="flex items-center text-[13px] font-700 text-primary whitespace-nowrap hover:bg-[#1B53FE] hover:text-white transition-all duration-200"
          style={{ fontWeight: 700 }}
        >
          View All
          <MdOutlineKeyboardArrowRight size={17} />
        </button>
      </div>

      {/* ── Laptop / Desktop: full-width CSS grid, no scroll ── */}
      <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── Mobile / Tablet: horizontal scroll ── */}
      <div
        ref={scrollRef}
        className="lg:hidden no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[78vw] sm:w-[45vw] md:w-[31vw]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
