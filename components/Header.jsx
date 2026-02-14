import Image from "next/image";
import Link from "next/link";
import CartIndicator from "./CartIndicator";

export default function Header({ categories = [] }) {
  const primaryCategories = categories.slice(0, 8);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            Customer Care: <strong>09678-100500</strong>
          </div>
          <div className="topbar-right">
            <div className="topbar-social">
              <a href="#" aria-label="Facebook">Fb</a>
              <a href="#" aria-label="YouTube">Yt</a>
              <a href="#" aria-label="Instagram">Ig</a>
              <a href="#" aria-label="LinkedIn">In</a>
            </div>
            <div className="topbar-auth">
              <Link href="/login">Login</Link>
              <span>/</span>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mainbar">
        <div className="container mainbar-inner">
          <Link className="logo" href="/">
            <Image src="/logo.svg" alt="AB Computer" width={180} height={40} priority />
          </Link>

          <form className="search">
            <input type="search" placeholder="Search laptops, components, accessories..." />
            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <button type="button" className="action-pill">Track Order</button>
            <button type="button" className="action-pill">Wishlist</button>
            <CartIndicator />
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="container nav-inner">
          <div className="category-menu">
            <span>All Categories</span>
            <div className="category-dropdown">
              {primaryCategories.map((category) => (
                <Link key={category.id} href={`/products?category=${category.slug}`}>
                  {category.name}
                </Link>
              ))}
              <Link href="/products">Browse All</Link>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/products">Products</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/support">Support</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="nav-badge">Hot Deals</div>
        </div>
      </nav>
    </header>
  );
}
