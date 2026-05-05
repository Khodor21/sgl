"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineViewGrid, HiOutlineUser } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { useShop } from "../../context/ShopContext";

const BottomNavbar = () => {
  const pathname = usePathname();
  const { cartCount } = useShop();

  const navItems = [
    { label: "Home", icon: <GoHomeFill size={24} />, href: "/" },
    {
      label: "Categories",
      icon: <HiOutlineViewGrid size={24} />,
      href: "/categories",
    },
    {
      label: "Cart",
      href: "/cart",
      // Cart icon with live badge
      icon: (
        <span className="relative inline-flex">
          <LuShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold px-0.5 leading-none">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </span>
      ),
    },
    { label: "Account", icon: <HiOutlineUser size={24} />, href: "/account" },
  ];

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f5f5f5] rounded-t-lg shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-12">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200"
            >
              <div className={isActive ? "text-primary" : "text-app-black"}>
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-medium mt-1 ${
                  isActive ? "text-primary" : "text-secondary"
                }`}
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
