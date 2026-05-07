// app/layout.js

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../components/Toast";
import { ShopProvider } from "../context/ShopContext";

export const metadata = {
  title: {
    default: "SGL Store — Laptops & More",
    template: "%s | SGL Store",
  },
  description:
    "Lebanon's trusted destination for premium laptops, computers, and accessories. Shop the best brands at competitive prices.",
  keywords: [
    "laptops",
    "computers",
    "accessories",
    "Lebanon",
    "SGL Store",
    "tech",
  ],
  authors: [{ name: "SGL Store" }],
  creator: "SGL Store",
  metadataBase: new URL("https://sglstore.com"), // 🔁 replace with your real domain
  openGraph: {
    title: "SGL Store — Laptops & More",
    description:
      "Lebanon's trusted destination for premium laptops, computers, and accessories.",
    url: "https://sglstore.com",
    siteName: "SGL Store",
    images: [
      {
        url: "/og-image.png", // 📁 see image guide below
        width: 1200,
        height: 630,
        alt: "SGL Store – Laptops & More",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SGL Store — Laptops & More",
    description:
      "Lebanon's trusted destination for premium laptops and computers.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" }, // 📁 see image guide below
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest", // 📁 see guide below
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#1B53FE", // your brand blue
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <AuthProvider>
          <ShopProvider>
            <ToastProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </ToastProvider>
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
