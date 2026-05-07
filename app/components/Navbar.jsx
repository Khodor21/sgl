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
  "Dell Laptops",
  "MacBooks",
  "Gaming",
  "Sgl Mouses",
  "Accessories",
  "Laptop Bags",
  "Monitor",
];

const navLinks = ["Home", "Our Location", "Contact Us", "Profile"];

const popularSearches = [
  "HP Laptop",
  "MacBook Pro",
  "Gaming Laptop",
  "Laptop Stand",
  "Wireless Mouse",
  "Laptop Bag",
];

/* ────────────────────────────────────────────
   DESKTOP NAVBAR  (md and above)
   ──────────────────────────────────────────── */
const DesktopNavbar = ({
  setSearchOpen,
  activeCategory,
  setActiveCategory,
  cartCount,
  favCount,
}) => (
  <header className="hidden md:block sticky top-0 z-50">
    {/* Top bar */}
    <div className="bg-primary border-b border-[#1b53fe]/40">
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img alt="Logo" src="/Logo.svg" className="w-10 h-10" />
            <span className="text-white font-bold text-xs">SGL Store</span>
          </a>

          {/* Nav links */}
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

          {/* Search bar */}
          <div className="flex-1 max-w-sm">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm h-9">
              <input
                type="text"
                placeholder="Search Product..."
                className="flex-1 px-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
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

          {/* Action icons */}
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

    {/* Categories bar */}
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
                  <span className="text-black/40 text-lg font-light">|</span>
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
);

/* ────────────────────────────────────────────
   MOBILE NAVBAR  (below md)
   ──────────────────────────────────────────── */
const MobileNavbar = ({ setSearchOpen, favCount, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:hidden sticky top-0 z-50 bg-primary">
      {/* Row 1 — Logo + Icons (collapses on scroll) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <div className="px-3 flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img alt="Logo" src="/Logo.svg" className="w-10 h-10" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-sm">SGL Store</span>
              <span className="text-white/60 text-[11px] font-medium tracking-wide">
                laptops & more
              </span>
            </div>
          </a>
          <div className="flex items-center">
            <button
              aria-label={`Wishlist (${favCount} items)`}
              className="relative flex items-center justify-center text-white p-1"
            >
              <AiOutlineHeart size={23} />
              {favCount > -1 && (
                <span className="absolute top-0 right-0 w-3 h-3 flex items-center justify-center rounded-full bg-rose-500 text-white text-[8px] font-bold">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center text-white p-1"
            >
              <HiMenuAlt3 size={23} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 — Search bar (always visible) */}
      <div className="px-3 pb-2.5 pt-1.5">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center w-full bg-white rounded h-7 px-3 gap-2 shadow-sm"
        >
          <BsSearch size={14} className="text-gray-400 shrink-0" />
          <span className="text-gray-400 text-sm flex-1 text-left">
            Search product...
          </span>
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   MOBILE SIDE MENU  (shared overlay)
   ──────────────────────────────────────────── */
const MobileSideMenu = ({
  menuMounted,
  mobileMenuOpen,
  handleMenuClose,
  activeCategory,
  handleCategoryTap,
}) =>
  menuMounted && (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleMenuClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-semibold text-gray-900">Categories</h2>
          <button
            aria-label="Close menu"
            onClick={handleMenuClose}
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
  );

/* ────────────────────────────────────────────
   SEARCH MODAL  (shared)
   ──────────────────────────────────────────── */
const SearchModal = ({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}) => (
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
        searchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
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
            autoFocus
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
            <IoClose size={18} className="text-gray-400" />
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
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-xs text-gray-600 bg-[#D0DCFF]/50 hover:bg-[#D0DCFF] px-3 py-1.5 rounded-lg transition-colors duration-200"
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
);

/* ────────────────────────────────────────────
   MAIN NAVBAR  (orchestrator)
   ──────────────────────────────────────────── */
export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const { cartCount, favCount } = useShop();

  // Animated mount for the side menu
  useEffect(() => {
    if (mobileMenuOpen) setMenuMounted(true);
  }, [mobileMenuOpen]);

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
    setTimeout(() => setMenuMounted(false), 300);
  };

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (searchOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileMenuOpen]);

  const handleCategoryTap = (cat) => {
    setActiveCategory(cat);
    handleMenuClose();
  };

  return (
    <>
      <DesktopNavbar
        setSearchOpen={setSearchOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
        favCount={favCount}
      />

      <MobileNavbar
        setSearchOpen={setSearchOpen}
        favCount={favCount}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <MobileSideMenu
        menuMounted={menuMounted}
        mobileMenuOpen={mobileMenuOpen}
        handleMenuClose={handleMenuClose}
        activeCategory={activeCategory}
        handleCategoryTap={handleCategoryTap}
      />

      <SearchModal
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <BottomNavbar />
    </>
  );
}
