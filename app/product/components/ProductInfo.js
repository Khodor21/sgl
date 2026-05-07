import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  FiHeart,
  FiShoppingCart,
  FiZap,
  FiShield,
  FiTruck,
} from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= Math.round(rating) ? (
          <AiFillStar key={s} className="text-amber-400" size={15} />
        ) : (
          <AiOutlineStar key={s} className="text-amber-400" size={15} />
        ),
      )}
    </div>
  );
}

const SPEC_LABELS = {
  processor: "Processor",
  ram: "RAM",
  storage: "Storage",
  display: "Display",
  gpu: "Graphics",
  battery: "Battery",
  os: "Operating System",
  weight: "Weight",
};

export default function ProductInfo({ product, isFavorite, onToggleFavorite }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].id);
  const [qty, setQty] = useState(1);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Title & subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-[#222222] leading-snug">
          {product.title}
        </h1>
        <p className="text-sm text-[#AEAEAE] mt-1">{product.subtitle}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <span className="text-sm font-semibold text-[#222222]">
          {product.rating}
        </span>
        <span className="text-sm text-[#AEAEAE]">
          ({product.reviewsCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-extrabold text-[#222222]">
          ${product.price.toLocaleString()}
        </span>
        <span className="text-base text-[#AEAEAE] line-through mb-0.5">
          ${product.originalPrice.toLocaleString()}
        </span>
        <span className="text-sm font-bold text-emerald-500 mb-0.5">
          −{discount}%
        </span>
      </div>

      <div className="h-px bg-[#AEAEAE]/20" />

      {/* Quick Specs */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {Object.entries(product.specs).map(([key, val]) => (
          <div key={key} className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AEAEAE]">
              {SPEC_LABELS[key] ?? key}
            </span>
            <span className="text-sm font-semibold text-[#222222] leading-tight">
              {val}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#AEAEAE]/20" />

      {/* Color */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#AEAEAE] mb-2">
          Color
        </p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.id}
              title={c.name}
              onClick={() => setSelectedColor(c.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all ${
                selectedColor === c.id
                  ? "border-[#1B53FE] text-[#1B53FE]"
                  : "border-[#AEAEAE]/40 text-[#444] hover:border-[#1B53FE]/40"
              }`}
            >
              <span
                className="inline-block w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Qty picker */}
        <div className="flex items-center border border-[#AEAEAE]/40 rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-10 text-lg font-bold text-[#444] hover:bg-[#F7F8FA] transition-colors"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-bold text-[#222]">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-10 text-lg font-bold text-[#444] hover:bg-[#F7F8FA] transition-colors"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-[#1B53FE] hover:bg-[#1444d4] text-white font-bold text-sm py-2.5 px-5 rounded-xl transition-colors shadow-md shadow-[#1B53FE]/20">
          <FiShoppingCart size={16} />
          Add to Cart
        </button>

        {/* Wishlist */}
        <button
          onClick={onToggleFavorite}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all ${
            isFavorite
              ? "border-rose-400 bg-rose-50 text-rose-500"
              : "border-[#AEAEAE]/40 text-[#AEAEAE] hover:border-rose-400 hover:text-rose-400"
          }`}
        >
          <FiHeart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Buy now */}
      <button className="w-full flex items-center justify-center gap-2 bg-[#222222] hover:bg-black text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
        <FiZap size={15} />
        Buy Now
      </button>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 mt-1">
        {[
          {
            icon: <FiTruck size={15} />,
            label: "Free Shipping",
            sub: "Orders over $500",
          },
          {
            icon: <FiShield size={15} />,
            label: "2-Year Warranty",
            sub: "Official coverage",
          },
          {
            icon: <FiZap size={15} />,
            label: "Fast Delivery",
            sub: "2–4 business days",
          },
        ].map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center text-center gap-1 bg-[#F7F8FA] rounded-xl py-3 px-2"
          >
            <span className="text-[#1B53FE]">{b.icon}</span>
            <span className="text-[10px] font-bold text-[#222]">{b.label}</span>
            <span className="text-[9px] text-[#AEAEAE]">{b.sub}</span>
          </div>
        ))}
      </div>

      {/* SKU & Availability */}
      <div className="flex items-center justify-between text-xs text-[#AEAEAE] pt-1">
        <span>
          SKU: <span className="text-[#444] font-semibold">{product.sku}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {product.availability}
        </span>
      </div>
    </div>
  );
}
