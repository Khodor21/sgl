"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // <-- Added import
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useShop } from "../../context/ShopContext";

const BADGE_STYLES = {
  New: "bg-[#1B53FE] text-white",
  "Best Seller": "bg-[#222222] text-white",
  Hot: "bg-rose-500 text-white",
  Sale: "bg-emerald-500 text-white",
};

function formatPrice(value) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return formatted.replace(/\.00$/, "");
}

export default function ProductCard({ product }) {
  const router = useRouter(); // <-- Added router
  const { addToCart, toggleFavorite, isFavorite, cartItems } = useShop();

  const favorited = isFavorite(product.id);
  const inCart = cartItems.some((i) => i.product.id === product.id);
  const [added, setAdded] = useAddedFlash();

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  const handleToggleFavorite = () => toggleFavorite(product);

  const badgeStyle = BADGE_STYLES[product.badge] || "bg-[#AEAEAE] text-white";
  const formattedPrice = formatPrice(product.price ?? 0);

  if (!product) return null;

  return (
    <article
      aria-label={product.title}
      // ✅ FIX: Navigate on card click
      onClick={() => router.push(`/product`)} // Changed to dynamic route, use "/product" if you prefer
      className="group product-card flex flex-col bg-white rounded border border-[#f5f5f5] overflow-hidden h-full cursor-pointer"
    >
      {/* ── Image Area ── */}
      <div className="relative w-full h-44 overflow-hidden">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm ${badgeStyle}`}
          >
            {product.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          // ✅ FIX: Stop propagation so it doesn't navigate
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
          aria-label={`${favorited ? "Remove from" : "Add to"} favorites: ${product.title}`}
          className="btn-fav absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center"
        >
          {favorited ? (
            <AiFillHeart size={18} className="text-rose-500" />
          ) : (
            <AiOutlineHeart size={18} className="text-[#AEAEAE]" />
          )}
        </button>

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain px-4 py-3 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 78vw, (max-width: 768px) 45vw,
                 (max-width: 1024px) 31vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>

      <hr className="border-black/20" />

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Add to Cart */}
        <button
          // ✅ FIX: Stop propagation so it doesn't navigate
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          aria-label={`Add ${product.title} to cart`}
          className={`btn-cart w-full flex items-center justify-center gap-2 py-[7px] rounded text-xs mb-1 shadow-sm font-bold transition-colors duration-[220ms]
            ${added ? "bg-emerald-500 text-white" : "bg-[#1B53FE] text-white hover:bg-[#1244d4]"}`}
        >
          <HiOutlineShoppingBag size={15} />
          {added ? "Added!" : "Add to Cart"}
        </button>

        {/* Title */}
        <h3
          className="text-[13px] font-extrabold leading-snug text-[#222222] line-clamp-2"
          style={{ minHeight: "2.8em" }}
        >
          {product.title}
        </h3>

        <div className="mt-1 flex w-full justify-between items-center">
          <p className="text-base font-semibold text-[#1B53FE] mt-auto">
            {formattedPrice}
          </p>

          <div className="flex items-center gap-1">
            <FaStar size={10} className="text-amber-400" />
            <span className="text-[13px] font-semibold text-[#222222]">
              {(product.rating ?? 0).toFixed(1)}
            </span>
            <span className="text-[13px] text-[#AEAEAE]">/5.0</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function useAddedFlash(duration = 1400) {
  const [added, setAddedRaw] = useState(false);
  const timerRef = useRef(null);

  const setAdded = (val) => {
    if (val) {
      setAddedRaw(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setAddedRaw(false), duration);
    } else {
      setAddedRaw(false);
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return [added, setAdded];
}
