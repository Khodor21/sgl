export const PRODUCT = {
  id: 1,
  title: 'Dell XPS 15 (9530) — 15.6" OLED Laptop',
  subtitle: "Ultra-thin performance laptop with OLED display and Intel Core i9",
  badge: "New",
  price: 1899,
  originalPrice: 2199,
  rating: 4.8,
  reviewsCount: 214,
  sku: "DELL-XPS15-9530-i9",
  availability: "In Stock",
  images: ["/Main.jpeg", "/Main 1.jpeg", "/Main 2.jpeg", "/Main 3.jpeg"],
  colors: [
    { name: "Platinum Silver", hex: "#C0C0C0", id: "silver" },
    { name: "Graphite Black", hex: "#222222", id: "black" },
  ],
  specs: {
    processor: "Intel Core i9-13900H",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    display: '15.6" 3.5K OLED, 60Hz',
    gpu: "NVIDIA GeForce RTX 4070 8GB",
    battery: "86Whr — Up to 12 hrs",
    os: "Windows 11 Home",
    weight: "1.86 kg",
  },
  features: [
    "Stunning 3.5K OLED display with 100% DCI-P3 color accuracy for vivid visuals.",
    "Intel Core i9-13900H delivers blazing-fast multitasking and content creation performance.",
    "NVIDIA RTX 4070 GPU handles demanding games, 3D rendering, and AI workloads.",
    "32GB DDR5 RAM for smooth multitasking across heavy applications.",
    "1TB NVMe SSD for lightning-fast boot and file load times.",
    "Premium all-aluminum chassis — thin, rigid, and built to last.",
  ],
  description:
    "The Dell XPS 15 redefines what a thin-and-light laptop can do. Featuring a breathtaking 3.5K OLED display, 13th-gen Intel Core i9 processor, and NVIDIA RTX 4070 graphics, it handles everything from creative workloads to serious gaming — all in an elegantly slim aluminum body.",
  whyBuy:
    "Choose the XPS 15 if you need a portable powerhouse for video editing, design, development, or gaming. The OLED display and premium build make every interaction feel premium, while the battery easily carries you through a full workday.",
};

export const REVIEWS = [
  {
    id: 1,
    name: "Ahmed Al-Otaibi",
    rating: 5,
    date: "2 weeks ago",
    text: "Incredible machine. The OLED screen is absolutely stunning — colors pop like nothing I've seen on a laptop. Fast delivery too.",
    verified: true,
  },
  {
    id: 2,
    name: "Sara Al-Mutairi",
    rating: 5,
    date: "1 month ago",
    text: "Perfect for video editing. Premiere Pro and After Effects run flawlessly. Build quality feels super premium.",
    verified: true,
  },
  {
    id: 3,
    name: "Mohammed Al-Shammari",
    rating: 4,
    date: "1 month ago",
    text: "Very powerful and the display is gorgeous. Fan noise under heavy load is noticeable but expected for this performance level.",
    verified: true,
  },
];

export const RELATED_PRODUCTS = [
  {
    id: 101,
    title: 'MacBook Pro 16" M3 Pro — Space Black',
    price: 2499,
    originalPrice: 2699,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://cdn.salla.sa/XnEj/522d18f4-e0c6-411c-bade-642c89536801-1000x1000-JcGoJnrgdNj3kIZGYis0ulZ605GzJvG3zzC0DnMC.jpg",
  },
  {
    id: 102,
    title: "ASUS ROG Zephyrus G16 — AMD Ryzen 9 RTX 4080",
    price: 2099,
    originalPrice: 2399,
    rating: 4.8,
    badge: "New",
    image:
      "https://cdn.salla.sa/XnEj/b9589a73-e0f4-435a-8708-8c135fb96cf5-1000x1000-ExyUn8W64aGH63CrlOz54lesYbeMsyu8WDG9EBFq.jpg",
  },
  {
    id: 103,
    title: "Lenovo ThinkPad X1 Carbon Gen 12 — Business Ultrabook",
    price: 1699,
    originalPrice: 1899,
    rating: 4.7,
    badge: null,
    image:
      "https://cdn.salla.sa/XnEj/8aac47a5-54d2-4dad-88ed-b3ca64d1c97b-1000x1000-ztyPY4p5y6GJZZYOmWZK8GLkVus5rAlyO5BVgpmp.jpg",
  },
  {
    id: 104,
    title: 'HP Spectre x360 14" 2-in-1 OLED Laptop',
    price: 1499,
    originalPrice: 1699,
    rating: 4.6,
    badge: "Sale",
    image:
      "https://cdn.salla.sa/XnEj/db3968d3-b2f1-4cd9-b75d-6441637b7253-1000x1000-OIZRqhDNp3IBIUhdy1gCSLUKC4jKJLGkXJdvFRbY.jpg",
  },
];

export const BADGE_STYLES = {
  New: "bg-[#1B53FE] text-white",
  "Best Seller": "bg-[#222222] text-white",
  Hot: "bg-rose-500 text-white",
  Sale: "bg-emerald-500 text-white",
};
