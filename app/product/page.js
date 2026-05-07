"use client";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PRODUCT } from "../../data/product";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";

export default function App() {
  const product = PRODUCT;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
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
            Laptops
          </a>
          <MdOutlineKeyboardArrowRight size={14} />
          <a
            href="#"
            className="hover:text-[#1B53FE] transition-colors whitespace-nowrap"
          >
            Dell
          </a>
          <MdOutlineKeyboardArrowRight size={14} />
          <span className="text-[#222222] font-semibold whitespace-nowrap truncate">
            Dell XPS 15 (9530)
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          <ImageGallery images={product.images} badge={product.badge} />
          <ProductInfo
            product={product}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite((f) => !f)}
          />
        </div>

        <ProductTabs product={product} />

        <RelatedProducts />
      </main>

      {/* Footer strip */}
      <footer className="mt-16 border-t border-[#AEAEAE]/20 py-6 text-center text-xs text-[#AEAEAE]">
        © 2025 TechStore. All rights reserved.
      </footer>
    </div>
  );
}
