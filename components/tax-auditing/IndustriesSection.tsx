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
          <div className="pf-ind-item">
            <i className="fa fa-industry"></i>
            <span>Manufacturing</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-laptop"></i>
            <span>IT & Technology</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-shopping-bag"></i>
            <span>Retail</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-plus-square"></i>
            <span>Healthcare</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-rocket"></i>
            <span>Startups</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-building"></i>
            <span>Enterprises</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-shopping-cart"></i>
            <span>E-Commerce</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-briefcase"></i>
            <span>Services</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-leaf"></i>
            <span>Renewable Energy</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-truck"></i>
            <span>Logistics & Transport</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-cube"></i>
            <span>FMCG</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-home"></i>
            <span>Building Materials</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-credit-card"></i>
            <span>Fintech</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-heart"></i>
            <span>Non-Profit Organisations</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-microchip"></i>
            <span>Semiconductors</span>
          </div>

          <div className="pf-ind-item">
            <i className="fa fa-car"></i>
            <span>Automobile</span>
          </div>
        </div>
      </div>
    </section>
  );
}
