import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { REVIEWS } from "../../../data/product";

const TABS = ["Overview", "Reviews"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= rating ? (
          <AiFillStar key={s} className="text-amber-400" size={14} />
        ) : (
          <AiOutlineStar key={s} className="text-amber-400" size={14} />
        ),
      )}
    </div>
  );
}

export default function ProductTabs({ product }) {
  const [active, setActive] = useState("Overview");

  return (
    <div className="mt-12">
      {/* Tab bar */}
      <div className="flex border-b border-[#AEAEAE]/30">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 -mb-px ${
              active === t
                ? "border-[#1B53FE] text-[#1B53FE]"
                : "border-transparent text-[#AEAEAE] hover:text-[#444]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {active === "Overview" && (
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-[#222] mb-3">
              About this Laptop
            </h3>
            <p className="text-sm text-[#555] leading-relaxed">
              {product.description}
            </p>
            <h3 className="text-base font-bold text-[#222] mt-6 mb-3">
              Why Buy This?
            </h3>
            <p className="text-sm text-[#555] leading-relaxed">
              {product.whyBuy}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-base font-bold text-[#222] mb-3">
              Key Features
            </h3>
            <ul className="flex flex-col gap-3">
              {product.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-[#444]"
                >
                  <FiCheckCircle
                    className="text-[#1B53FE] flex-shrink-0 mt-0.5"
                    size={16}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Reviews */}
      {active === "Reviews" && (
        <div className="pt-8 flex flex-col gap-5 max-w-2xl">
          {REVIEWS.map((r) => (
            <div key={r.id} className="bg-[#F7F8FA] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1B53FE] text-white flex items-center justify-center text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#222]">{r.name}</p>
                    {r.verified && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                        <FiCheckCircle size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-[#AEAEAE]">{r.date}</span>
              </div>
              <StarRating rating={r.rating} />
              <p className="text-sm text-[#555] mt-2 leading-relaxed">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
