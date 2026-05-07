// app/layout.js

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../components/Toast";
import { ShopProvider } from "../context/ShopContext";

export const metadata = {
  title: {
    default: "Laptop Store — Laptops & More",
    template: "%s | Laptop Store",
  },
  description:
    "Your trusted destination for premium laptops, computers, and accessories. Shop the best brands at competitive prices.",
  keywords: [
    "laptops",
    "computers",
    "accessories",
    "gaming laptops",
    "Laptop Store",
    "tech",
  ],
  authors: [{ name: "Laptop Store" }],
  creator: "Laptop Store",
  openGraph: {
    title: "Laptop Store — Laptops & More",
    description:
      "Your trusted destination for premium laptops, computers, and accessories.",
    siteName: "Laptop Store",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laptop Store — Laptops & More",
    description:
      "Your trusted destination for premium laptops and computers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#1B53FE",
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