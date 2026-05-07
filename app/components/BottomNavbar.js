"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiUserFill } from "react-icons/ri";
import { PiMonitorFill } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useShop } from "../../context/ShopContext";

const BottomNavbar = () => {
  const pathname = usePathname();
  const { cartCount } = useShop();

  const navItems = [
    { label: "Home", icon: <MdHomeFilled size={23} />, href: "/" },
    {
      label: "Categories",
      icon: <PiMonitorFill size={23} />,
      href: "/categories",
    },
    {
      label: "Cart",
      href: "/cart",
      icon: (
        <span className="relative flex items-center justify-center leading-none">
          <RiShoppingBag3Fill size={23} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold px-0.5 leading-none">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </span>
      ),
    },
    {
      label: "My Orders",
      icon: <PiPackageFill size={23} />,
      href: "/orders",
    },
    { label: "Account", icon: <RiUserFill size={23} />, href: "/account" },
  ];

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-secondary rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const content = (
            <div className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 gap-1">
              <div className={isActive ? "text-primary" : "text-black/75"}>
                {item.icon}
              </div>
              <span
                className={`text-[12px] ${isActive ? "text-primary" : "text-black/75"}`}
              >
                {item.label}
              </span>
            </div>
          );

          // Use button if no href, Link otherwise
          if (!item.href) {
            return (
              <button
                key={item.label}
                className="flex items-center justify-center w-full h-full bg-transparent"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-center w-full h-full"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
