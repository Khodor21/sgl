"use client";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsCartPlus,
  BsShieldCheck,
  BsArrowRight,
  BsShare,
  BsTruck,
  BsArrowRepeat,
} from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";

import StarRating from "./StarRating";

export default function ProductInfo({ product, isFavorite, onToggleFavorite }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedModel, setSelectedModel] = useState(product.models[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1600);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Product link copied to clipboard!");
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Title Row: title + share/fav (flex row, space-between on desktop; stacked on mobile) */}
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#AEAEAE]">
          iPhone 17 Accessories
        </p>

        {/* Title + Actions Row */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-black leading-tight flex-1">
            {product.title}
          </h1>
          {/* Share & Favorite — visible on lg+; on mobile they appear below */}
          <div className="hidden lg:flex items-center gap-2 flex-none mt-1">
            <button
              onClick={handleShare}
              title="Share product"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#AEAEAE]/40 hover:bg-[#1B53FE] hover:text-white hover:border-[#1B53FE] transition-all"
            >
              <BsShare size={15} className="text-black " />
            </button>
            <button
              onClick={onToggleFavorite}
              title="Add to favorites"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#AEAEAE]/40 hover:border-rose-400 transition-all"
            >
              {isFavorite ? (
                <AiFillHeart size={19} className="text-rose-500" />
              ) : (
                <AiOutlineHeart size={19} className="text-[#AEAEAE]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile: Share & Fav below title */}
        <div className="flex lg:hidden items-center gap-1 mt-1">
          <button
            onClick={handleShare}
            title="Share product"
            className="flex items-center gap-1.5 p-2 rounded-full bg-white text-black border border-[#AEAEAE]/40 hover:bg-[#1B53FE] hover:text-white hover:border-[#1B53FE] transition-all text-xs font-semibold text-[#444]"
          >
            <BsShare size={14} />
          </button>
          <button
            onClick={onToggleFavorite}
            title="Add to favorites"
            className="flex items-center gap-1.5 p-2 rounded-full bg-white border border-[#AEAEAE]/40 hover:border-rose-400 transition-all text-xs font-semibold text-[#444]"
          >
            {isFavorite ? (
              <AiFillHeart size={14} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={14} className="text-black" />
            )}
          </button>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <StarRating rating={product.rating} />
          <span className="text-xs font-bold text-black">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-[#AEAEAE]">
            ({product.reviewsCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-black">{product.price}$</p>

      <div className="h-px bg-[#AEAEAE]/20" />

      {/* Color Selector */}
      <div className="flex gap-3">
        <p className="text-sm font-bold text-[#222222]">Color: </p>
        <div className="flex items-center justify-between w-full">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedColor.id === color.id
                  ? "border-[#1B53FE] scale-110"
                  : "border-transparent hover:scale-105 hover:border-[#AEAEAE]"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Model Selector */}
      <div className="flex gap-3">
        <p className="text-sm font-bold text-black">Model:</p>
        <div className="flex flex-row gap-2">
          {product.models.map((model) => (
            <button
              key={model}
              onClick={() => setSelectedModel(model)}
              className={`px-2 py-1 rounded text-xs font-bold border-2 transition-all duration-200 ${
                selectedModel === model
                  ? "bg-[#1B53FE] text-white border-[#1B53FE]"
                  : "bg-white text-[#222222] border-[#AEAEAE]/50 hover:border-[#1B53FE] hover:text-[#1B53FE]"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-bold text-black">Quantity</h3>
        {/* Quantity */}
        <div className="flex items-center justify-between gap-1 bg-white rounded border border-[#AEAEAE]/40 p-1 w-full">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-3 h-3 flex items-center justify-center rounded-lg hover:bg-white hover:shadow transition-all font-bold text-lg text-[#222]"
          >
            −
          </button>
          <span className="w-5 text-center font-extrabold text-black text-sm">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-3 h-3 flex items-center justify-center rounded-lg hover:bg-white hover:shadow transition-all font-bold text-lg text-[#222]"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2.5 py-1 text-sm font-medium rounded shadow-sm transition-all duration-200 min-w-[160px] ${
            addedToCart
              ? "bg-emerald-500 text-white"
              : "bg-[#1B53FE] text-white hover:bg-[#1244d4] active:scale-[0.98]"
          }`}
        >
          <BsCartPlus size={16} />
          {addedToCart ? "Added to Cart! ✓" : "Add to Cart"}
        </button>
        {/* Buy Now */}
        <button className="w-full flex items-center justify-center gap-2 py-1 rounded text-sm font-medium border-2 border-[#1B53FE] text-[#1B53FE] hover:bg-[#1B53FE] hover:text-white transition-all duration-200 active:scale-[0.98]">
          <IoWalletOutline size={16} />
          Buy Now
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 mt-1">
        {[
          {
            icon: <BsTruck size={18} />,
            label: "Fast Delivery",
            sub: "2–4 business days",
          },
          {
            icon: <BsArrowRepeat size={18} />,
            label: "Free Returns",
            sub: "Within 14 days",
          },
          {
            icon: <BsShieldCheck size={18} />,
            label: "Quality Guarantee",
            sub: "Genuine product",
          },
        ].map(({ icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[#f7f6fb] border border-[#AEAEAE]/30 text-center"
          >
            <span className="text-[#1B53FE]">{icon}</span>
            <p className="text-[11px] font-bold text-[#222222]">{label}</p>
            <p className="text-[10px] text-[#AEAEAE] font-medium">{sub}</p>
          </div>
        ))}
      </div>

      {/* SKU */}
      <p className="text-xs text-[#AEAEAE] font-medium">
        SKU: <span className="text-[#444]">{product.sku}</span>
      </p>
    </div>
  );
}
