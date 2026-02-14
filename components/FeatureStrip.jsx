export default function FeatureStrip() {
  const features = [
    { title: "Quick Delivery", text: "Fast dispatch and tracked shipping." },
    { title: "7 Days Return", text: "Easy returns on eligible items." },
    { title: "Secure Payment", text: "Trusted gateways and SSL security." },
    { title: "24/7 Support", text: "Friendly technical help anytime." }
  ];

  return (
    <section className="feature-strip">
      <div className="container feature-grid">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card reveal">
            <h4>{feature.title}</h4>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
