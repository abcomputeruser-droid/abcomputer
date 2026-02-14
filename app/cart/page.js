"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="container cart-page">
        <div className="empty-state">
          Your cart is empty. <Link href="/products">Browse products</Link>.
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)}</p>
              <button className="btn btn-ghost" type="button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
            <div>
              <label htmlFor={`qty-${item.id}`}>Qty</label>
              <input
                id={`qty-${item.id}`}
                type="number"
                min="1"
                value={item.qty}
                onChange={(event) => updateQty(item.id, event.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <strong>Subtotal: {formatPrice(subtotal)}</strong>
        <Link className="btn btn-primary" href="/checkout">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

