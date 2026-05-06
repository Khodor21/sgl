"use client";

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import BottomNavbar from "./BottomNavbar";
import { useShop } from "../../context/ShopContext";

const categories = [
  "All Categories",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, favCount } = useShop();

  useEffect(() => {
    if (searchOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (searchOpen) {
        setTimeout(() => {
          document.getElementById("search-input")?.focus();
        }, 100);
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileMenuOpen]);

  const handleCategoryTap = (cat) => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP HEADER ── */}
      <header className="hidden md:block sticky top-0 z-50">
        <div className="bg-primary border-b border-[#1b53fe]/40">
          <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 gap-4">
              <a href="/" className="flex items-center gap-2 shrink-0">
                <img alt="Logo" src="/Logo.svg" className="w-10 h-10" />
                <span className="text-white font-bold text-xs">SGL Store</span>
              </a>

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

              <div className="flex items-center gap-3">
                <button
                  aria-label={`Wishlist (${favCount} items)`}
                  className="relative flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                >
                  <AiOutlineHeart size={26} />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 rounded-full w-3 h-3 flex items-center justify-center bg-rose-500 text-white text-[9px] font-bold px-0.5">
                      {favCount > 99 ? "99+" : favCount}
                    </span>
                  )}
                </button>
                <button
                  aria-label={`Cart (${cartCount} items)`}
                  className="relative flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200"
                >
                  <LuShoppingBag size={24} />
                  {cartCount > 0 ? (
                    <span className="absolute -top-1 -right-1.5 rounded-full w-3 h-3 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold px-0.5">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#D0DCFF]">
          <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="flex items-center h-10 gap-0 overflow-x-auto scrollbar-hide">
              {categories.map((cat, idx) => (
                <div key={cat} className="flex items-center shrink-0">
                  {idx === 0 ? (
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
                  ) : (
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

      {/* ── MOBILE HEADER ── */}
      <header className="md:hidden sticky top-0 z-50 bg-primary">
        {/* Row 1: Logo + Fav + Menu */}
        <div className="flex items-center justify-between h-12 px-3">
          <a href="/" className="flex items-center gap-1.5 shrink-0">
            <img alt="Logo" src="/Logo.svg" className="w-8 h-8" />
            <span className="text-white font-bold text-xs">SGL Store</span>
          </a>

          <div className="flex items-center gap-2">
            {/* Fav */}
            <button
              aria-label={`Wishlist (${favCount} items)`}
              className="relative flex items-center justify-center text-white"
            >
              <AiOutlineHeart size={24} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-3 h-3 flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold px-0.5">
                  {favCount > 99 ? "99+" : favCount}
                </span>
              )}
            </button>

            {/* Menu */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center text-white"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {/* Row 2: Search bar — full width, white, high contrast */}
        <div className="px-3 pb-2.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center w-full bg-white rounded-xl h-8 px-3 gap-2 shadow-sm"
          >
            <BsSearch size={14} className="text-[#1B53FE] shrink-0" />
            <span className="text-gray-400 text-sm flex-1 text-left">
              Search product...
            </span>
          </button>
        </div>
      </header>

      {/* ── MOBILE SIDE MENU ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0">
              <h2 className="text-base font-semibold text-gray-900">
                Categories
              </h2>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoClose size={20} className="text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryTap(cat)}
                  className={`w-full text-left px-5 py-3 text-sm transition-colors duration-200 ${
                    activeCategory === cat
                      ? "bg-[#D0DCFF] text-[#1b53fe] font-semibold border-l-4 border-[#1b53fe]"
                      : "text-gray-700 hover:bg-gray-50 font-medium"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* ── Bottom Navbar ── */}
      <BottomNavbar />
    </>
  );
}
