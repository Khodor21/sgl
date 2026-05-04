"use client";

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import BottomNavbar from "./BottomNavbar";

const categories = [
  "All Categories", // Usually best to keep this first for navigation
  "Less than $200",
  "HP Laptops",
  "MacBooks",
  "Gaming",
  "Sgl Mouses",
  "Accessories",
];

const navLinks = ["Home", "About Us", "Contact Us", "Profile"];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* ───────────────────────────────────────────────────────────── */}
      {/*  DESKTOP & TABLET HEADER (md and up)                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className="hidden md:block sticky top-0 z-50">
        {/* ── Row 1: Main Nav ── */}
        <div className="bg-primary border-b border-[#1b53fe]/40">
          <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 gap-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 shrink-0">
                {/* Logo mark */}
                <img alt="Logo" src="/Logo.svg" className="w-10 h-10" />
                <span className="text-white font-bold text-xs">SGL Store</span>
              </a>

              {/* Nav Links */}
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white text-sm font-medium hover:text-white/80 transition-colors duration-200 whitespace-nowrap"
                  >
                    {link}
                  </a>
                ))}
              </nav>

              {/* Search Bar */}
              <div className="flex-1 max-w-sm">
                <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm h-9">
                  <input
                    type="text"
                    placeholder="Search Product..."
                    className="flex-1 px-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                    onFocus={() => setSearchOpen(true)}
                    readOnly
                  />
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center justify-center w-9 h-9 bg-[#D0DCFF] hover:bg-primary transition-colors shrink-0"
                  >
                    <BsSearch size={15} className="text-primary" />
                  </button>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-3">
                {/* Wishlist */}
                <button className="flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200">
                  <AiOutlineHeart size={26} />
                </button>
                {/* Cart */}
                <button className="relative flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200">
                  <LuShoppingBag size={24} />
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Category Bar ── */}
        <div className="bg-[#D0DCFF]">
          <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="flex items-center h-10 gap-0 overflow-x-auto scrollbar-hide">
              {categories.map((cat, idx) => (
                <div key={cat} className="flex items-center shrink-0">
                  {idx === 0 && (
                    <div className="flex items-center gap-2 pr-4 mr-1">
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                          activeCategory === cat
                            ? "text-black"
                            : "text-black/80 hover:text-black"
                        }`}
                      >
                        {cat}
                      </button>
                      <span className="text-black/40 text-lg font-light">
                        |
                      </span>
                    </div>
                  )}
                  {idx !== 0 && (
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 text-sm whitespace-nowrap transition-colors duration-200 ${
                        activeCategory === cat
                          ? "text-black font-semibold"
                          : "text-black/80 hover:text-black font-medium"
                      }`}
                    >
                      {cat}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  MOBILE HEADER (below md)                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className="md:hidden top-0 z-50 bg-white shadow-sm">
        {/* ── Mobile Row 1: Logo + Favourite ── */}
        <div className="flex items-center justify-between h-12 px-4 border-b border-gray-100">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            {/* Logo mark */}
            <img alt="Logo" src="/Logo.svg" className="w-10 h-10" />
            <span className="text-white font-bold text-xs">SGL Store</span>
          </a>

          {/* Favourite Icon */}
          <button className="relative flex items-center justify-center rounded-x transition-colors duration-200">
            <AiOutlineHeart size={24} className="text-[#1b53fe]" />
          </button>
        </div>

        {/* ── Mobile Row 2: Search Bar ── */}
        <div className="flex items-center h-11 px-4 gap-2 bg-white ">
          <div
            className="flex items-center flex-1 bg-gray-100 rounded-lg h-8 gap-2 cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <BsSearch size={14} className="text-gray-400 shrink-0" />
            <span className="text-sm text-gray-400 select-none">
              Search Product...
            </span>
          </div>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  SEARCH MODAL (shared for all breakpoints)                   */}
      {/* ───────────────────────────────────────────────────────────── */}
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

        {/* Modal */}
        <div
          className={`relative w-full max-w-2xl mx-auto mt-20 px-4 transition-all duration-300 ${
            searchOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <BsSearch size={18} className="text-gray-400 shrink-0" />
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
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <IoClose size={14} className="text-gray-400" />
                </button>
              )}
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-xs text-gray-400 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                ESC
              </button>
            </div>

            {/* Suggestions */}
            <div className="px-5 py-4">
              {searchQuery === "" ? (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Lunch Box",
                      "Puzzles",
                      "Baby Toys",
                      "Water Bottles",
                      "Stationary",
                      "Drawing Kit",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs text-gray-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Results for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <div className="flex items-center justify-center py-8 text-gray-400">
                    <p className="text-sm">No products found.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Navbar (mobile only) ── */}
      <BottomNavbar />
    </>
  );
}
