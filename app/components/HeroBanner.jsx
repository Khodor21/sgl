import Image from "next/image";

const banners = ["/Banner-1.jpg"];

export default function HeroBanner() {
  return (
    <div className="w-full mb-4">
      <div className="relative w-full aspect-[4/1.8] rounded-xs overflow-hidden">
        <img
          src={banners[0]}
          alt="banner-1"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
