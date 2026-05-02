"use client";

import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCheck2, BsShieldCheck, BsBoxSeam } from "react-icons/bs";
import StarRating from "./StarRating";
import { REVIEWS } from "../../../data/product";

export default function ProductTabs({ product, selectedColor, selectedModel }) {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <div className="mt-14">
      {/* Tab Bar */}
      <div className="flex gap-1 bg-white rounded-2xl p-1.5 border border-[#AEAEAE]/30 shadow-sm w-fit mb-6">
        {[
          { key: "desc", label: "Description" },
          { key: "features", label: "Features" },
          { key: "reviews", label: `Reviews (${REVIEWS.length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === key
                ? "bg-[#1B53FE] text-white shadow-sm"
                : "text-[#AEAEAE] hover:text-[#222222]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-[#AEAEAE]/30 shadow-sm p-6 sm:p-8">
        {activeTab === "desc" && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-extrabold text-[#222222]">
              About This Product
            </h2>
            <p className="text-[#444444] leading-relaxed text-[15px]">
              {product.description}
            </p>
            <h3 className="text-base font-extrabold text-[#222222] mt-2">
              Why Buy This?
            </h3>
            <p className="text-[#444444] leading-relaxed text-[15px]">
              {product.whyBuy}
            </p>

            {/* Specs Table */}
            <div className="mt-2 rounded-2xl border border-[#AEAEAE]/30 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Compatibility", "iPhone 17 Pro / Pro Max"],
                    ["Material", "Polycarbonate + TPU"],
                    ["Color", selectedColor],
                    ["Model", selectedModel],
                    ["Extra Feature", "Magnetic Wireless Charging Support"],
                    ["Weight", "~45 g"],
                  ].map(([key, val], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? "bg-[#f7f6fb]" : "bg-white"}
                    >
                      <td className="px-5 py-3 font-bold text-[#222222] w-1/3">
                        {key}
                      </td>
                      <td className="px-5 py-3 text-[#444444]">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-extrabold text-[#222222]">
              Key Features
            </h2>
            <ul className="flex flex-col gap-3.5">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-none w-6 h-6 rounded-full bg-[#1B53FE]/10 flex items-center justify-center">
                    <BsCheck2 size={14} className="text-[#1B53FE]" />
                  </span>
                  <span className="text-[15px] text-[#444444] leading-relaxed">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[
                {
                  icon: <BsShieldCheck size={24} className="text-[#1B53FE]" />,
                  title: "Daily Protection",
                  desc: "Full edge and back coverage",
                },
                {
                  icon: <BsBoxSeam size={24} className="text-[#1B53FE]" />,
                  title: "Practical Design",
                  desc: "Firm grip and built-in kickstand",
                },
                {
                  icon: (
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#1B53FE]"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 7v5l3 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  title: "Wireless Charging",
                  desc: "Magnetic MagSafe support",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#f7f6fb] border border-[#AEAEAE]/30 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B53FE]/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <p className="font-extrabold text-[#222222] text-sm">
                    {title}
                  </p>
                  <p className="text-xs text-[#AEAEAE] leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            {/* Summary */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex flex-col items-center gap-1 min-w-[100px]">
                <p className="text-5xl font-extrabold text-[#222222]">
                  {product.rating.toFixed(1)}
                </p>
                <StarRating rating={product.rating} />
                <p className="text-xs text-[#AEAEAE] mt-1">
                  {product.reviewsCount} reviews
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-2 w-full">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct =
                    star === 5
                      ? 72
                      : star === 4
                        ? 20
                        : star === 3
                          ? 5
                          : star === 2
                            ? 2
                            : 1;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#444] w-3">
                        {star}
                      </span>
                      <AiFillStar size={12} className="text-amber-400" />
                      <div className="flex-1 h-2 bg-[#f7f6fb] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#AEAEAE] w-8 text-left">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-[#AEAEAE]/20" />

            {/* Individual Reviews */}
            <div className="flex flex-col gap-5">
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-2.5 p-5 rounded-2xl bg-[#f7f6fb] border border-[#AEAEAE]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#1B53FE] flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#222222]">
                          {review.name}
                        </p>
                        {review.verified && (
                          <p className="text-[10px] text-emerald-600 font-semibold">
                            ✓ Verified Buyer
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#AEAEAE]">
                      {review.date}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-[#444444] leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="w-full py-3.5 rounded-2xl border-2 border-[#1B53FE] text-[#1B53FE] font-bold text-sm hover:bg-[#1B53FE] hover:text-white transition-all duration-200">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
