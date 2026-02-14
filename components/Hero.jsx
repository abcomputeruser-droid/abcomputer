import Link from "next/link";

export default function Hero({ categories = [] }) {
  const heroCategories = categories.slice(0, 6);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-rail">
          <h3>Top Categories</h3>
          <ul>
            {heroCategories.map((category) => (
              <li key={category.id}>
                <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/products">Browse All</Link>
            </li>
          </ul>
        </div>

        <div className="hero-main">
          <div className="hero-card reveal">
            <p className="hero-eyebrow">Tech Week Specials</p>
            <h1>Build the perfect workstation for work & play.</h1>
            <p className="hero-subtitle">
              Premium laptops, desktops, and accessories curated for creators and gamers.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/products">Shop Now</Link>
              <Link className="btn btn-ghost" href="/deals">View Deals</Link>
            </div>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-tile reveal" style={{ animationDelay: "0.1s" }}>
            <h4>Quick Delivery</h4>
            <p>Same-day dispatch in major cities.</p>
            <Link href="/support">Learn More</Link>
          </div>
          <div className="hero-tile reveal" style={{ animationDelay: "0.2s" }}>
            <h4>Secure Payments</h4>
            <p>Multiple payment options with full protection.</p>
            <Link href="/support">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
