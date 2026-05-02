"use client";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PRODUCT } from "../../data/product";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import FAQ from "./components/FAQ";
import RelatedProducts from "./components/RelatedProducts";

export default function App() {
  const product = PRODUCT;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-[#AEAEAE]/20">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-[#AEAEAE] font-medium overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <a
            href="#"
            className="hover:text-[#1B53FE] transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <MdOutlineKeyboardArrowRight size={14} />
          <a
            href="#"
            className="hover:text-[#1B53FE] transition-colors whitespace-nowrap"
          >
            Phone Accessories
          </a>
          <MdOutlineKeyboardArrowRight size={14} />
          <a
            href="#"
            className="hover:text-[#1B53FE] transition-colors whitespace-nowrap"
          >
            iPhone Cases
          </a>
          <MdOutlineKeyboardArrowRight size={14} />
          <span className="text-[#222222] font-semibold whitespace-nowrap truncate">
            Ring Grip Case with Wireless Charging
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left: Image Gallery */}
          <ImageGallery images={product.images} badge={product.badge} />

          {/* Right: Product Info */}
          <ProductInfo
            product={product}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite((f) => !f)}
          />
        </div>

        {/* Tabs */}
        <ProductTabs
          product={product}
          selectedColor={product.colors[0].name}
          selectedModel={product.models[0]}
        />

        {/* FAQ */}
        <FAQ />

        {/* Related Products */}
        <RelatedProducts />

        {/* Recently Viewed */}
        <div className="mt-10 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#AEAEAE] mb-3">
            Recently Viewed
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              "Ring Grip Case — Orange",
              "Clear MagSafe Case",
              "Carbon Fiber Case — Black",
            ].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-full bg-white border border-[#AEAEAE]/40 text-xs font-semibold text-[#444] hover:border-[#1B53FE] hover:text-[#1B53FE] transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
