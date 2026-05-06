"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineViewGrid, HiOutlineUser } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useShop } from "../../context/ShopContext";

const BottomNavbar = () => {
  const pathname = usePathname();
  const { cartCount } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: "Home", icon: <GoHomeFill size={24} />, href: "/" },
    {
      label: "Categories",
      icon: <HiOutlineViewGrid size={24} />,
      href: "/categories",
    },
    {
      label: "Search",
      icon: <BiSearch size={24} />,
      isSearch: true,
    },
    {
      label: "Cart",
      href: "/cart",
      hasCart: true,
      icon: (
        <span className="relative flex items-center justify-center leading-none">
          <LuShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold px-0.5 leading-none">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </span>
      ),
    },
    { label: "Account", icon: <HiOutlineUser size={24} />, href: "/account" },
  ];

  return (
    <>
      <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-secondary rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const navContent = (
              <div className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 gap-1">
                <div className={isActive ? "text-primary" : "text-black"}>
                  {item.icon}
                </div>
                <span
                  className={`text-[13px] font-medium ${
                    isActive ? "text-primary" : "text-black"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );

            if (item.isSearch) {
              return (
                <button
                  key={item.label}
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                  {navContent}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-center w-full h-full"
              >
                {navContent}
              </Link>
            );
          })}
        </div>
      </nav>

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
    </>
  );
};

export default BottomNavbar;
