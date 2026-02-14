"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return <p className="empty-state">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id || product.slug || index} product={product} index={index} />
      ))}
    </div>
  );
}
