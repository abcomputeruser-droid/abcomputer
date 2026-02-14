import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { getCategories } from "@/lib/woocommerce";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata = {
  title: "AB Computer",
  description: "Headless WooCommerce storefront for AB Computer."
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header categories={categories} />
          <main className="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

