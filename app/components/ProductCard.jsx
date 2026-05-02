"use client";

import Image from "next/image";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

const BADGE_STYLES = {
  New: "bg-[#1B53FE] text-white",
  "Best Seller": "bg-[#222222] text-white",
  Hot: "bg-rose-500 text-white",
  Sale: "bg-emerald-500 text-white",
};

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const badgeStyle = BADGE_STYLES[product.badge] || "bg-[#AEAEAE] text-white";

  return (
    <article className="product-card flex flex-col bg-white rounded-2xl border border-[#AEAEAE]/40 overflow-hidden h-full cursor-pointer">
      {/* Image Area */}
      <div className="relative w-full aspect-square overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 text-[10px] font-700 uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${badgeStyle}`}
            style={{ fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {product.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite((f) => !f)}
          aria-label="Toggle favorite"
          className="btn-fav absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow border border-[#AEAEAE]/30"
        >
          {isFavorite ? (
            <AiFillHeart size={18} className="text-rose-500" />
          ) : (
            <AiOutlineHeart size={18} className="text-[#AEAEAE]" />
          )}
        </button>

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain px-4 py-3 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 78vw, (max-width: 768px) 45vw, (max-width: 1024px) 31vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>

      <div className="h-px bg-black opacity-20"></div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <FaStar size={13} className="text-amber-400" />
          <span
            className="text-xs font-600 text-[#222222]"
            style={{ fontWeight: 600 }}
          >
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-[#AEAEAE]">/5.0</span>
        </div>

        {/* Title */}
        <h3
          className="text-[13px] leading-snug text-[#222222] line-clamp-2"
          style={{ fontWeight: 600, minHeight: "2.8em" }}
        >
          {product.title}
        </h3>

        {/* Price */}
        <p
          className="text-lg font-800 text-[#1B53FE] mt-auto"
          style={{ fontWeight: 800 }}
        >
          ${product.price.toLocaleString()}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`btn-cart w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-700 mt-1 shadow-sm
            ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#1B53FE] text-white hover:bg-[#1244d4]"
            }`}
          style={{ fontWeight: 700, transition: "background 0.22s" }}
        >
          <BsCartPlus size={16} />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
