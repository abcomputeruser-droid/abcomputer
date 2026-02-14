import { notFound } from "next/navigation";
import AddToCartForm from "@/components/AddToCartForm";
import { getProductBySlug } from "@/lib/woocommerce";

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const image = product.images?.[0]?.src || "/product-placeholder.svg";

  return (
    <div className="container product-page">
      <div className="product-detail">
        <img src={image} alt={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.short_description || "High-quality product ready for your setup."}</p>
          <AddToCartForm product={product} />
        </div>
      </div>

      {product.description && (
        <section className="section">
          <div className="container">
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

