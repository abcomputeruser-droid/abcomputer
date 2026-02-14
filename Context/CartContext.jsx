"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function readStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("ab_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("ab_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price || product.regular_price || "0",
          image: product.images?.[0]?.src || "/product-placeholder.svg",
          qty
        }
      ];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    const safeQty = Math.max(1, Number(qty) || 1);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: safeQty } : item))
    );
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.price || 0) * item.qty, 0);
  }, [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    subtotal,
    count
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

