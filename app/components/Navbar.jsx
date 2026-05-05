"use client";

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import BottomNavbar from "./BottomNavbar";
import { useShop } from "../../context/ShopContext";
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
  const { cartCount, favCount } = useShop();

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
                <button
                  aria-label={`Wishlist (${favCount} items)`}
                  className="relative flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                >
                  <AiOutlineHeart size={26} />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold px-0.5">
                      {favCount > 99 ? "99+" : favCount}
                    </span>
                  )}
                </button>
                {/* Cart */}
                <button
                  aria-label={`Cart (${cartCount} items)`}
                  className="relative flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                >
                  <LuShoppingBag size={24} />
                  {cartCount > 0 ? (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold px-0.5">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  ) : (
                    // original static red dot when empty
                    <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500" />
                  )}
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
          <button
            aria-label={`Wishlist (${favCount} items)`}
            className="relative flex items-center justify-center"
          >
            <AiOutlineHeart size={24} className="text-[#1b53fe]" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold px-0.5">
                {favCount > 99 ? "99+" : favCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Bottom Navbar (mobile only) ── */}
      <BottomNavbar />
    </>
  );
}
