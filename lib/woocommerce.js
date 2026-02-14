import { fallbackCategories, fallbackProducts } from "./fallback";

const wcBase = (process.env.WC_API_URL || "").replace(/\/$/, "");
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

const hasConfig = wcBase && consumerKey && consumerSecret;
const apiBase = wcBase ? `${wcBase}/wp-json/wc/v3` : "";

function buildUrl(path, params = {}) {
  if (!apiBase) {
    return "";
  }
  const url = new URL(`${apiBase}/${path}`);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

function stripHtml(value) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price || product.regular_price,
    regular_price: product.regular_price,
    images: product.images && product.images.length ? product.images : [{ src: "/product-placeholder.svg" }],
    categories: product.categories || [],
    short_description: stripHtml(product.short_description),
    description: product.description || ""
  };
}

export async function getProducts(options = {}) {
  if (!hasConfig) {
    return fallbackProducts.map(normalizeProduct);
  }
  const url = buildUrl("products", {
    per_page: options.perPage || 8,
    page: options.page || 1,
    orderby: options.orderby || "date",
    order: options.order || "desc",
    category: options.category,
    search: options.search,
    featured: options.featured
  });
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    return fallbackProducts.map(normalizeProduct);
  }
  const data = await response.json();
  return data.map(normalizeProduct);
}

export async function getProductBySlug(slug) {
  if (!hasConfig) {
    const fallback = fallbackProducts.find((product) => product.slug === slug);
    return fallback ? normalizeProduct(fallback) : null;
  }
  const url = buildUrl("products", { slug });
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  if (!data.length) {
    return null;
  }
  return normalizeProduct(data[0]);
}

export async function getCategories() {
  if (!hasConfig) {
    return fallbackCategories;
  }
  const url = buildUrl("products/categories", { per_page: 20, hide_empty: true });
  const response = await fetch(url, { next: { revalidate: 120 } });
  if (!response.ok) {
    return fallbackCategories;
  }
  return response.json();
}

export async function createOrder(order) {
  if (!hasConfig) {
    throw new Error("WooCommerce API keys are missing.");
  }
  const url = buildUrl("orders");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Order creation failed.");
  }
  return response.json();
}
