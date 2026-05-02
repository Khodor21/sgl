"use client";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { BADGE_STYLES } from "../../../data/product.js";

export default function MiniProductCard({ product }) {
  const [isFav, setIsFav] = useState(false);
  const [added, setAdded] = useState(false);
  const badgeStyle =
    BADGE_STYLES[product.badge ?? ""] || "bg-[#AEAEAE] text-white";

  return (
    <article className="flex flex-col bg-white rounded-2xl border border-[#AEAEAE]/40 overflow-hidden h-full cursor-pointer">
    
      <div className="relative w-full aspect-square overflow-hidden bg-[#f7f6fb]">
        {product.badge && (
          <span
            className={`absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${badgeStyle}`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setIsFav((f) => !f)}
          className="absolute top-3 left-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow border border-[#AEAEAE]/30"
        >
          {isFav ? (
            <AiFillHeart size={18} className="text-[#AEAEAE]" />
          ) : (
            <AiOutlineHeart size={18} className="text-[#AEAEAE]" />
          )}
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain px-4 py-3 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="h-px bg-black opacity-10" />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-1.5">
          <FaStar size={13} className="text-amber-400" />
          <span className="text-xs font-semibold text-[#222222]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-[#AEAEAE]">/5.0</span>
        </div>
        <h3 className="text-sm leading-snug text-[#222222] line-clamp-2 font-semibold">
          {product.title}
        </h3>
        <p className="text-lg font-extrabold text-[#1B53FE] mt-auto">
          {product.price} SAR
        </p>
        <button
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold mt-1 shadow-sm ${
            added
              ? "bg-emerald-500 text-white"
              : "bg-[#1B53FE] text-white hover:bg-[#1244d4]"
          }`}
        >
          <BsCartPlus size={16} />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
