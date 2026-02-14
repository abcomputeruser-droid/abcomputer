"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function AddToCartForm({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="add-to-cart">
      <p className="product-price">{formatPrice(product.price)}</p>
      <div className="qty-row">
        <label htmlFor="qty">Qty</label>
        <input
          id="qty"
          type="number"
          min="1"
          value={qty}
          onChange={(event) => setQty(Number(event.target.value) || 1)}
        />
      </div>
      <button className="btn btn-primary" type="button" onClick={() => addItem(product, qty)}>
        Add to Cart
      </button>
    </div>
  );
}

