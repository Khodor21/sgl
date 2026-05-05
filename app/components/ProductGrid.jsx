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
        <div className="flex flex-col sm:flex-row items-stretch">
          <div className="sm:w-[28%] w-full rounded-xs overflow-hidden flex-shrink-0">
            <img
              src={bannerSrc}
              alt={title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "1.25 / 1.5" }}
            />
          </div>
          <div className="mt-4 mb-2 flex items-end justify-between">
            <h2
              className="text-lg md:text-2xl text-[#222222] md:-tight mt-1"
              style={{ fontWeight: 800 }}
            >
              {title}
            </h2>
            <button
              className="flex items-center cursor-pointer text-[13px] text-primary whitespace-nowrap"
              style={{ fontWeight: 700 }}
            >
              View All
              <MdOutlineKeyboardArrowRight
                className="hidden md:block"
                size={17}
              />
            </button>
          </div>
        </div>
      )}

      {/* ── Wide Banner (4 : 1.5) ── */}
      {!isMono && bannerSrc && (
        <div className="mb-5 rounded-xs overflow-hidden">
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
        <div className="mt-4 mb-2 flex items-end justify-between">
          <h2
            className="text-lg md:text-2xl text-[#222222] md:-tight mt-1"
            style={{ fontWeight: 800 }}
          >
            {title}
          </h2>
          <button
            className="flex items-center cursor-pointer text-[13px] text-primary whitespace-nowrap"
            style={{ fontWeight: 700 }}
          >
            View All
            <MdOutlineKeyboardArrowRight
              className="hidden md:block"
              size={17}
            />
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
