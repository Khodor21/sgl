"use client";

import { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  title,
  bannerLabel,
  products,
  bannerSrc,
  bannerType = "wide",
}) {
  const scrollRef = useRef(null);

  const isMono = bannerType === "mono";

  return (
    <section className="w-full">
      {/* ── Mono Banner (1.25 : 1.5) + Title side-by-side ── */}
      {isMono && bannerSrc && (
        <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-5">
          <div className="sm:w-[28%] w-full rounded-xs overflow-hidden flex-shrink-0">
            <img
              src={bannerSrc}
              alt={title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "1.25 / 1.5" }}
            />
          </div>
          <div className=" flex items-center justify-between py-2">
            <h2
              className="text-lg md:text-2xl text-[#222222] md:-tight mt-1"
              style={{ fontWeight: 800 }}
            >
              {title}
            </h2>
            <button
              className="flex items-center text-[13px] text-primary whitespace-nowrap
                         hover:bg-[#1B53FE] hover:text-white transition-all duration-200
                         mt-4 self-start px-3 py-1.5 rounded-md"
              style={{ fontWeight: 700 }}
            >
              View All
              <MdOutlineKeyboardArrowRight classname="hidden md:block" size={17} />
            </button>
          </div>
        </div>
      )}

      {/* ── Wide Banner (4 : 1.5) ── */}
      {!isMono && bannerSrc && (
        <div className="mb-5 rounded-xl overflow-hidden">
          <img
            src={bannerSrc}
            alt={title}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "4 / 1.5" }}
          />
        </div>
      )}

      {/* ── Title Row (wide-banner sections only) ── */}
      {!isMono && (
        <div className="flex items-end gap-3 mb-5 px-1">
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] uppercase tracking-widest text-[#AEAEAE]"
              style={{ fontWeight: 600 }}
            >
              {bannerLabel || ""}
            </p>
            <h2
              className="text-xl text-[#222222] leading-tight"
              style={{ fontWeight: 800 }}
            >
              {title}
            </h2>
          </div>
          <button
            className="flex items-center text-[13px] text-primary whitespace-nowrap
                       hover:bg-[#1B53FE] hover:text-white transition-all duration-200
                       px-3 py-1.5 rounded-md"
            style={{ fontWeight: 700 }}
          >
            View All
            <MdOutlineKeyboardArrowRight size={17} />
          </button>
        </div>
      )}

      {/* ── Product Cards Horizontal Scroll ── */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
              flex-none
              w-[50vw]
              sm:w-[45vw]
              md:w-[31vw]
              lg:w-[calc(20%-12.8px)]
              xl:w-[calc(20%-12.8px)]
            "
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
