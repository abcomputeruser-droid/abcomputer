"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    city: "",
    postcode: "",
    notes: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method: "cod",
          payment_method_title: "Cash on Delivery",
          set_paid: false,
          billing: {
            ...form,
            country: "BD"
          },
          shipping: {
            first_name: form.first_name,
            last_name: form.last_name,
            address_1: form.address_1,
            city: form.city,
            postcode: form.postcode,
            country: "BD"
          },
          line_items: items.map((item) => ({
            product_id: item.id,
            quantity: item.qty
          })),
          customer_note: form.notes
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Checkout failed.");
      }

      clear();
      setStatus({ type: "success", message: "Order placed successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container checkout-page">
      <h2>Checkout</h2>
      <p>Total: {formatPrice(subtotal)}</p>

      {status && (
        <div className="notice" style={{ color: status.type === "error" ? "#b42318" : undefined }}>
          {status.message}
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <div>
            <label>First Name</label>
            <input name="first_name" required value={form.first_name} onChange={handleChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input name="last_name" required value={form.last_name} onChange={handleChange} />
          </div>
        </div>
        <div className="checkout-grid">
          <div>
            <label>Email</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" required value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>Address</label>
          <input name="address_1" required value={form.address_1} onChange={handleChange} />
        </div>
        <div className="checkout-grid">
          <div>
            <label>City</label>
            <input name="city" required value={form.city} onChange={handleChange} />
          </div>
          <div>
            <label>Postal Code</label>
            <input name="postcode" required value={form.postcode} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>Order Notes</label>
          <textarea name="notes" rows="4" value={form.notes} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading || !items.length}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

