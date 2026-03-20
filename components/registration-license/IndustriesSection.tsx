const faIcons = [
  ["fa-industry", "Manufacturing"],
  ["fa-laptop", "IT & Technology"],
  ["fa-shopping-bag", "Retail"],
  ["fa-plus-square", "Healthcare"],
  ["fa-rocket", "Startups"],
  ["fa-building", "Enterprises"],
  ["fa-shopping-cart", "E-Commerce"],
  ["fa-briefcase", "Services"],
  ["fa-leaf", "Renewable Energy"],
  ["fa-truck", "Logistics & Transport"],
  ["fa-cube", "FMCG"],
  ["fa-home", "Building Materials"],
  ["fa-credit-card", "Fintech"],
  ["fa-heart", "Non-Profit Organisations"],
  ["fa-microchip", "Semiconductors"],
  ["fa-car", "Automobile"],
];

export default function IndustriesSection() {
  return (
    <section className="pf-authority">
      <div className="container">
        <div className="pf-authority-title">
          <div className="pf-ebar"></div>
          <span className="pf-eyeb">Industries</span>
          <h2>Who We Serve</h2>
          <p>Trusted by businesses across sectors.</p>
        </div>

        <div
          className="pf-ind-grid"
          style={{ gridTemplateColumns: "repeat(4,1fr)" }}
        >
          {faIcons.map(([icon, label]) => (
            <div className="pf-ind-item" key={label}>
              <i className={`fa ${icon}`}></i>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
