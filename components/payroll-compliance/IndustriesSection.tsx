const industries = [
  { icon: "fa-industry", name: "Manufacturing" },
  { icon: "fa-laptop", name: "IT & Technology" },
  { icon: "fa-shopping-bag", name: "Retail" },
  { icon: "fa-plus-square", name: "Healthcare" },
  { icon: "fa-rocket", name: "Startups" },
  { icon: "fa-building", name: "Enterprises" },
  { icon: "fa-shopping-cart", name: "E-Commerce" },
  { icon: "fa-briefcase", name: "Services" },
  { icon: "fa-leaf", name: "Renewable Energy" },
  { icon: "fa-truck", name: "Logistics & Transport" },
  { icon: "fa-cube", name: "FMCG" },
  { icon: "fa-home", name: "Building Materials" },
  { icon: "fa-credit-card", name: "Fintech" },
  { icon: "fa-heart", name: "Non-Profit Organisations" },
  { icon: "fa-microchip", name: "Semiconductors" },
  { icon: "fa-car", name: "Automobile" },
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
          {industries.map((industry) => (
            <div className="pf-ind-item" key={industry.name}>

              <i className={`fa ${industry.icon}`}></i>

              <span>{industry.name}</span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}