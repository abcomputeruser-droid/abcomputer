import FeatureStrip from "@/components/FeatureStrip";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromoTiles from "@/components/PromoTiles";
import { getCategories, getProducts } from "@/lib/woocommerce";

export default async function HomePage() {
  const [categories, latestProducts, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts({ perPage: 8, orderby: "date" }),
    getProducts({ perPage: 8, orderby: "popularity" })
  ]);

  return (
    <div>
      <Hero categories={categories} />
      <PromoTiles />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Latest Products</h2>
            <p>Fresh picks from our curated catalog.</p>
          </div>
          <ProductGrid products={latestProducts} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Best Sellers</h2>
            <p>Popular choices trusted by professionals.</p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <FeatureStrip />
    </div>
  );
}

