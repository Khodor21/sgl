import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../components/Toast";
import { ShopProvider } from "../context/ShopContext";
export const metadata = {
  title: "TechStore — Laptops & Computers",
  description: "Browse our curated selection of premium laptops and computers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white">
        <AuthProvider>
          <ShopProvider>
            <ToastProvider>
              <Navbar />
              {children}
              <Footer />
            </ToastProvider>
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
