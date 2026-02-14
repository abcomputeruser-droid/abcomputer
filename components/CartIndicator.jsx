"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIndicator() {
  const { count } = useCart();

  return (
    <Link className="cart-indicator" href="/cart">
      <span className="cart-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 7h15l-1.5 9h-11z" />
          <path d="M6 7L4.5 3H2" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
      </span>
      <span>Cart</span>
      <span className="cart-count">{count}</span>
    </Link>
  );
}
