import { AiFillStar } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RELATED_PRODUCTS, BADGE_STYLES } from "../../../data/product";

export default function RelatedProducts() {
  return (
    <div className="mt-12">
      <p className="text-xs font-bold uppercase tracking-widest text-[#AEAEAE] mb-5">
        You May Also Like
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {RELATED_PRODUCTS.map((p) => {
          const discount = p.originalPrice
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : null;
          return (
            <div
              key={p.id}
              className="group bg-[#F7F8FA] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-square bg-white overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {p.badge && (
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLES[p.badge] ?? "bg-gray-200 text-gray-700"}`}
                  >
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1.5">
                <p className="text-xs font-semibold text-[#222] leading-snug line-clamp-2">
                  {p.title}
                </p>
                <div className="flex items-center gap-1">
                  <AiFillStar className="text-amber-400" size={12} />
                  <span className="text-xs text-[#444] font-semibold">
                    {p.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-extrabold text-[#222]">
                    ${p.price.toLocaleString()}
                  </span>
                  {p.originalPrice && (
                    <span className="text-xs text-[#AEAEAE] line-through">
                      ${p.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {discount && (
                    <span className="text-[10px] font-bold text-emerald-500">
                      −{discount}%
                    </span>
                  )}
                </div>
                <button className="mt-1 w-full flex items-center justify-center gap-1.5 bg-[#1B53FE] hover:bg-[#1444d4] text-white text-xs font-bold py-2 rounded-lg transition-colors">
                  <FiShoppingCart size={12} />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
