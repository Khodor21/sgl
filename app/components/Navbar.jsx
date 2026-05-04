"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LuShoppingBag } from "react-icons/lu";
import { LiaUserSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f7f6fb] backdrop-blur-sm border-b border-[#AEAEAE]/30">
        <div className="w-full mx-auto px-2 sm:px-3 lg:px-4">
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between h-12">
            {/* Left: Cart & User */}
            <div className="flex items-center gap-1 ">
              <button className="relative flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <LuShoppingBag size={24} className="text-[#222222]" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B53FE]" />
              </button>
              <button className=" flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <LiaUserSolid size={28} className="text-[#222222]" />
              </button>
            </div>

            {/* Center: Logo */}
            <a href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/Logo.svg"
                alt="SGL Store Logo"
                width={48}
                height={48}
              />
              <span className="text-black text-sm" style={{ fontWeight: 800 }}>
                SGL Store
              </span>
            </a>

            {/* Right: Search & Menu */}
            <div className="flex items-center gap-1 justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200"
              >
                <BsSearch size={22} className="text-[#222222]" />
              </button>
              <button className="flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <HiOutlineMenuAlt3 size={22} className="text-[#222222]" />
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Navbar */}
          <div className="md:hidden flex items-center justify-between h-12">
            {/* Left: Cart & User */}
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <LiaUserSolid size={22} className="text-[#222222]" />
              </button>
              <button className="relative flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <LuShoppingBag size={20} className="text-[#222222]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1B53FE]" />
              </button>
            </div>

            {/* Center: Logo */}
            <a href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/Logo.svg"
                alt="SGL Store Logo"
                width={44}
                height={44}
              />
            </a>

            {/* Right: Search & Menu */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200"
              >
                <BsSearch size={18} className="text-[#222222]" />
              </button>
              <button className="flex items-center justify-center rounded-xl hover:bg-[#ebe9f5] transition-colors duration-200">
                <HiOutlineMenuAlt3 size={20} className="text-[#222222]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          searchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        />

        {/* Modal Content */}
        <div
          className={`relative w-full max-w-2xl mx-auto mt-20 px-4 transition-all duration-300 ${
            searchOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#AEAEAE]/20">
              <BsSearch size={18} className="text-[#AEAEAE] shrink-0" />
              <input
                id="search-input"
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
                className="flex-1 text-sm text-[#222222] placeholder-[#AEAEAE] outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#f7f6fb] transition-colors"
                >
                  <IoClose size={14} className="text-[#AEAEAE]" />
                </button>
              )}
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-xs text-[#AEAEAE] hover:text-[#222222] px-2 py-1 rounded-lg hover:bg-[#f7f6fb] transition-colors font-medium"
              >
                ESC
              </button>
            </div>

            {/* Suggestions Area */}
            <div className="px-5 py-4">
              {searchQuery === "" ? (
                <div>
                  <p className="text-xs font-semibold text-[#AEAEAE] uppercase tracking-wider mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "iPhone 16",
                      "MacBook Air",
                      "AirPods Pro",
                      "Samsung Galaxy",
                      "PS5",
                      "Mechanical Keyboard",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs text-[#555555] bg-[#f7f6fb] hover:bg-[#ebe9f5] px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-[#AEAEAE] uppercase tracking-wider mb-3">
                    Results for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <div className="flex items-center justify-center py-8 text-[#AEAEAE]">
                    <p className="text-sm">No products found.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
