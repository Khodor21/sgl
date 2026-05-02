"use client";

import { useEffect, useState } from "react";

const banners = ["/Banner-1.jpg", "/Banner-2.jpg"];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mb-10">
      {/* Carousel container (2:1 ratio) */}
      <div className="relative w-full aspect-[2/1] rounded overflow-hidden bg-black">
        {/* Slides */}
        {banners.map((img, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 transition-opacity duration-700
              ${i === index ? "opacity-100" : "opacity-0"}
            `}
          >
            <img
              src={img}
              alt={`banner-${i}`}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay for text readability (optional but pro) */}
          </div>
        ))}

        {/* Decorative circles (kept from your design) */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-[#1B53FE]/20 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#1B53FE]/10 blur-2xl" />

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all
                ${i === index ? "bg-[#1B53FE]" : "bg-white/50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
