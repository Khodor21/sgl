export default function Footer() {
  return (
    <footer className="border-t border-[#AEAEAE]/20 bg-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B53FE] rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">iB</span>
            </div>
            <span className="font-extrabold text-[#222222] text-base">
              iBlack <span className="text-[#1B53FE]">Stores</span>
            </span>
          </div>
          <p className="text-xs text-[#AEAEAE] leading-relaxed">
            Your first destination for genuine, high-quality mobile accessories
            in Saudi Arabia.
          </p>
        </div>

        {/* Links */}
        {[
          {
            title: "Store",
            links: ["Cases", "Chargers", "Earphones", "Deals"],
          },
          {
            title: "Support",
            links: [
              "Contact Us",
              "Return Policy",
              "Shipping & Delivery",
              "FAQ",
            ],
          },
          {
            title: "Company",
            links: ["About Us", "Blog", "Partners", "Careers"],
          },
        ].map(({ title, links }) => (
          <div key={title} className="flex flex-col gap-3">
            <p className="font-extrabold text-[#222222] text-sm">{title}</p>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[#AEAEAE] hover:text-[#1B53FE] transition-colors font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-[#AEAEAE]/20 py-5 text-center text-xs text-[#AEAEAE]">
        © 2025 iBlack Stores. All rights reserved.
      </div>
    </footer>
  );
}
