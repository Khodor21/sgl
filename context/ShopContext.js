"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // [{ product, qty }]
  const [favorites, setFavorites] = useState([]); // [product]

  // ── Cart ──────────────────────────────────────────
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // ── Favorites ─────────────────────────────────────
  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.some((p) => p.id === productId),
    [favorites],
  );

  const favCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        favorites,
        favCount,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
