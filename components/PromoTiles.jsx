import Link from "next/link";

export default function PromoTiles() {
  return (
    <section className="promo">
      <div className="container promo-grid">
        <div className="promo-card">
          <p className="promo-tag">Flash Deal</p>
          <h3>Upgrade your SSD today.</h3>
          <p>Save up to 25% on high-speed storage.</p>
          <Link className="btn btn-secondary" href="/products">Browse Storage</Link>
        </div>
        <div className="promo-card">
          <p className="promo-tag">Gaming Zone</p>
          <h3>RGB builds, built right.</h3>
          <p>Chassis, coolers, and components ready to ship.</p>
          <Link className="btn btn-secondary" href="/products">Shop Components</Link>
        </div>
        <div className="promo-card">
          <p className="promo-tag">Office Ready</p>
          <h3>Smart peripherals bundle.</h3>
          <p>Keyboards, mice, and webcams for productivity.</p>
          <Link className="btn btn-secondary" href="/products">See Accessories</Link>
        </div>
      </div>
    </section>
  );
}
