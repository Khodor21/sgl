export default function HeroBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#222222] mb-10"
      style={{ minHeight: 180 }}>
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-[#1B53FE]/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#1B53FE]/10 blur-2xl" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
        <div>
          <span className="inline-block text-[10px] font-700 uppercase tracking-widest text-[#1B53FE] bg-[#1B53FE]/15 rounded-full px-3 py-1 mb-3" style={{ fontWeight: 700 }}>
            🔥 Limited Time Offer
          </span>
          <h1 className="text-2xl sm:text-3xl font-800 text-white leading-tight mb-2" style={{ fontWeight: 800 }}>
            Top Laptops<br />
            <span className="text-[#1B53FE]">Up to 40% Off</span>
          </h1>
          <p className="text-sm text-[#AEAEAE] max-w-xs">
            Premium refurbished & new laptops — tested, certified, and ready to ship.
          </p>
        </div>
        <button className="shrink-0 bg-[#1B53FE] hover:bg-blue-500 text-white font-700 px-7 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#1B53FE]/30" style={{ fontWeight: 700 }}>
          Shop Now →
        </button>
      </div>
    </div>
  );
}
