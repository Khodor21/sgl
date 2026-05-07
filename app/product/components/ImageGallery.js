import { useState } from "react";
import { BADGE_STYLES } from "../../../data/product";

export default function ImageGallery({ images, badge }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F7F8FA] aspect-square w-full group">
        <img
          src={images[selected]}
          alt="Product"
          className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${BADGE_STYLES[badge] ?? "bg-gray-200 text-gray-700"}`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-20 h-20 rounded-xl overflow-hidden bg-[#F7F8FA] border-2 transition-all flex-shrink-0 ${
              selected === i
                ? "border-[#1B53FE] shadow-md"
                : "border-transparent hover:border-[#AEAEAE]/60"
            }`}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
