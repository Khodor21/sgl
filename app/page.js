import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import CategoryStrip from "./components/CategoryStrip";
import products from "../data/products.json";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full mx-auto px-2 sm:px-3 lg:px-4 py-4">
        {/* Hero */}
        <HeroBanner />
        <CategoryStrip />

        <div className="flex flex-col gap-6">
          <ProductGrid
            title="New Arrivals"
            bannerLabel="Just In"
            bannerSrc="/Mono-Banner 2.jpg"
            bannerType="mono"
            products={products.filter(
              (p) => p.badge === "New" || p.badge === "Hot",
            )}
          />

          {/* Gaming — Wide banner (4:1.5) */}
          <ProductGrid
            title="Gaming"
            bannerLabel="Most Popular"
            bannerSrc="/Banner-2.jpg"
            bannerType="wide"
            products={products.filter((p) => p.category === "Gaming")}
          />

          {/* HP Laptops — Mono banner (1.25:1.5) */}
          <ProductGrid
            title="HP Laptops"
            bannerLabel="Top Rated"
            bannerSrc="/Mono-Banner.jpg"
            bannerType="mono"
            products={products.filter((p) => p.category === "HP")}
          />
        </div>
      </main>
    </div>
  );
}
