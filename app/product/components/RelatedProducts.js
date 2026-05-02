"use client";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import MiniProductCard from "./MiniProductCard";
import { RELATED_PRODUCTS } from "../../../data/product";

export default function RelatedProducts() {
  return (
    <section className="mt-14">
      {/* Header */}
      <div className="flex items-end gap-3 mb-6 px-1">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#AEAEAE]">
            You May Also Like
          </p>
          <h2 className="text-xl font-extrabold text-[#222222] leading-tight">
            Related Products
          </h2>
        </div>
        <button className="flex items-center text-[13px] font-bold text-[#1B53FE] whitespace-nowrap hover:bg-[#1B53FE] hover:text-white px-3 py-1.5 rounded-xl transition-all duration-200">
          View All
          <MdOutlineKeyboardArrowLeft size={17} />
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        {RELATED_PRODUCTS.map((p) => (
          <MiniProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Mobile Scroll */}
      <div
        className="lg:hidden flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {RELATED_PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="flex-none w-[78vw] sm:w-[45vw] md:w-[31vw]"
            style={{ scrollSnapAlign: "start" }}
          >
            <MiniProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
