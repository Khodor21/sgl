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
    </div>
  );
}
