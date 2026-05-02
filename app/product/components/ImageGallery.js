"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const AUTO_INTERVAL = 3500;

export default function ImageGallery({ images, badge }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevImage = useCallback(
    () => setSelectedImage((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );

  const nextImage = useCallback(
    () => setSelectedImage((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextImage, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, nextImage]);

  const handleManual = (index) => {
    setSelectedImage(index);
    setPaused(true);
    // Resume auto after 8 s of inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  const handleArrow = (dir) => {
    dir === "prev" ? prevImage() : nextImage();
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative overflow-hidden aspect-square">
        {/* Badge */}
        <span className="absolute top-4 right-4 z-10 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#1B53FE] text-white shadow">
          {badge}
        </span>

        {/* Image */}
        <img
          src={images[selectedImage]}
          alt={`Product image ${selectedImage + 1}`}
          className="w-full h-full object-contain px-8 py-6 transition-all duration-500"
        />

        {/* Nav Arrows */}
        <button
          onClick={() => handleArrow("prev")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow border border-[#AEAEAE]/30 hover:bg-[#1B53FE] hover:text-white hover:border-[#1B53FE] transition-all"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
        <button
          onClick={() => handleArrow("next")}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow border border-[#AEAEAE]/30 hover:bg-[#1B53FE] hover:text-white hover:border-[#1B53FE] transition-all"
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManual(i)}
              className={`rounded-full transition-all duration-200 ${
                selectedImage === i
                  ? "w-5 h-2 bg-[#1B53FE]"
                  : "w-2 h-2 bg-[#AEAEAE]/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => handleManual(i)}
            className={`flex-none w-20 h-20 rounded-xl border-2 overflow-hidden bg-white transition-all duration-200 ${
              selectedImage === i
                ? "border-[#1B53FE] shadow-md shadow-[#1B53FE]/20"
                : "border-[#AEAEAE]/40 hover:border-[#1B53FE]/50"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-contain px-1.5 py-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
