"use client";

import { BsSearch } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LuShoppingBag } from "react-icons/lu";
import { LiaUserSolid } from "react-icons/lia";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-grey backdrop-blur-sm border-b border-[#AEAEAE]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#1B53FE] flex items-center justify-center">
              <span
                className="text-white font-800 text-sm"
                style={{ fontWeight: 800 }}
              >
                T
              </span>
            </div>
            <span
              className="font-800 text-[#222222] text-lg"
              style={{ fontWeight: 800 }}
            >
              TechStore
            </span>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-md flex items-center gap-2 bg-[#f7f6fb] border border-[#AEAEAE]/40 rounded-xl px-4 py-2.5">
            <BsSearch size={15} className="text-[#AEAEAE]" />
            <input
              type="text"
              placeholder="Search laptops, computers..."
              className="flex-1 bg-transparent text-sm text-[#222222] placeholder:text-[#AEAEAE] outline-none font-500"
              style={{ fontWeight: 500 }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f7f6fb]">
              <LuShoppingBag size={20} className="text-[#222222]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1B53FE]" />
            </button>
            <button
              className="flex items-center gap-2 bg-[#222222] text-white text-sm font-700 px-4 py-2 rounded-xl hover:bg-[#1B53FE] transition-colors duration-200"
              style={{ fontWeight: 700 }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navbar */}
        <div className="md:hidden flex items-center justify-between h-16 gap-4">
          {/* Left: Bag */}
          <div className="flex items-center gap-2">
            <button className=" flex items-center justify-center rounded-xl hover:bg-[#f7f6fb]">
              <LiaUserSolid size={22} className="text-[#222222]" />
            </button>
            <button className="relative  flex items-center justify-center rounded-xl hover:bg-[#f7f6fb]">
              <LuShoppingBag size={20} className="text-[#222222]" />
              <span className="absolute top-0.5 left-1.5 w-2 h-2 rounded-full bg-[#bb2500]" />
            </button>
          </div>
          {/* Center: Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#1B53FE] flex items-center justify-center">
              <span
                className="text-white font-800 text-sm"
                style={{ fontWeight: 800 }}
              >
                T
              </span>
            </div>
            <span
              className="font-800 text-[#222222] text-lg"
              style={{ fontWeight: 800 }}
            >
              TechStore
            </span>
          </a>

          {/* Right: User & Search & Menu */}
          <div className="flex items-center gap-2">
            <button className=" flex items-center justify-center rounded-xl hover:bg-[#f7f6fb]">
              <BsSearch size={18} className="text-[#222222]" />
            </button>
            <button className=" flex items-center justify-center rounded-xl hover:bg-[#f7f6fb]">
              <HiOutlineMenuAlt3 size={20} className="text-[#222222]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
