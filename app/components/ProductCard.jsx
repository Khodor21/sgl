"use client";

import Image from "next/image";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";

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
    <article className="product-card flex flex-col bg-white rounded border border-[#f5f5f5] overflow-hidden h-full cursor-pointer">
      {/* Image Area */}
      <div className="relative w-full h-44 overflow-hidden">
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
          className="btn-fav absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center"
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
        {/* Title */}
        <h3
          className="text-[13px] leading-snug text-[#222222] line-clamp-2"
          style={{ fontWeight: 800, minHeight: "2.8em" }}
        >
          {product.title}
        </h3>
        <div className="mt-1 flex w-full justify-between items-center">
          {" "}
          {/* Price */}
          <p
            className="text-base font-800 text-[#1B53FE] mt-auto"
            style={{ fontWeight: 600 }}
          >
            ${product.price.toLocaleString()}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar size={10} className="text-amber-400" />
            <span
              className="text-[13px] font-600 text-[#222222]"
              style={{ fontWeight: 600 }}
            >
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[13px] text-[#AEAEAE]">/5.0</span>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`btn-cart w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs mt-1 shadow-sm
            ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#1B53FE] text-white hover:bg-[#1244d4]"
            }`}
          style={{ fontWeight: 700, transition: "background 0.22s" }}
        >
          <HiOutlineShoppingBag size={16} />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
