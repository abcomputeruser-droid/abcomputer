"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const image = product.images?.[0]?.src || "/product-placeholder.svg";
  const category = product.categories?.[0]?.name;

  return (
    <div className="product-card reveal" style={{ animationDelay: `${index * 0.05}s` }}>
      <Link href={`/products/${product.slug}`} className="product-media">
        <img src={image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-body">
        {category && <p className="product-category">{category}</p>}
        <Link href={`/products/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button className="btn btn-primary" type="button" onClick={() => addItem(product, 1)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
