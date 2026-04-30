import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import products from "../data/products.json";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <HeroBanner />

        {/* Category Tabs (decorative) */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {[
            "All",
            "Laptops",
            "Desktops",
            "Accessories",
            "Monitors",
            "Storage",
          ].map((cat, i) => (
            <button
              key={cat}
              className={`shrink-0 text-xs font-700 px-4 py-2 rounded-full border transition-all duration-150 ${
                i === 0
                  ? "bg-[#1B53FE] text-white border-[#1B53FE]"
                  : "bg-white text-[#222222] border-[#AEAEAE]/40 hover:border-[#1B53FE] hover:text-[#1B53FE]"
              }`}
              style={{ fontWeight: 700 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grids */}
        <div className="flex flex-col gap-12">
          <ProductGrid
            title="Laptops"
            bannerLabel="Most Popular"
            products={products}
          />
          <ProductGrid
            title="Best Sellers"
            bannerLabel="Top Rated"
            products={[...products].sort((a, b) => b.rating - a.rating)}
          />
          <ProductGrid
            title="New Arrivals"
            bannerLabel="Just In"
            products={products.filter(
              (p) => p.badge === "New" || p.badge === "Hot",
            )}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#AEAEAE]/30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1B53FE] flex items-center justify-center">
              <span
                className="text-white font-800 text-xs"
                style={{ fontWeight: 800 }}
              >
                T
              </span>
            </div>
            <span
              className="font-700 text-[#222222]"
              style={{ fontWeight: 700 }}
            >
              TechStore
            </span>
          </div>
          <p className="text-xs text-[#AEAEAE]">
            © 2025 TechStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
