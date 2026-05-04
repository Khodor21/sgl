"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineViewGrid,
  HiOutlineUser,
} from "react-icons/hi";

const BottomNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: <HiOutlineHome size={24} />, href: "/" },
    {
      label: "Categories",
      icon: <HiOutlineViewGrid size={24} />,
      href: "/categories",
    },
    { label: "Cart", icon: <HiOutlineShoppingBag size={24} />, href: "/cart" },
    { label: "Account", icon: <HiOutlineUser size={24} />, href: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f5f5f5] rounded-t-lg shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200"
            >
              <div
                className={`${isActive ? "text-primary" : "text-app-black"}`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-medium mt-1 ${isActive ? "text-primary" : "text-secondary"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
