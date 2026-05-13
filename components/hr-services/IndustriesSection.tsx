import { Icon } from "@/components/common/Icon";

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
            <Icon name="industry" />
            <span>Manufacturing</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="laptop" />
            <span>IT & Technology</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="shopping-bag" />
            <span>Retail</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="plus-square" />
            <span>Healthcare</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="rocket" />
            <span>Startups</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="building" />
            <span>Enterprises</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="shopping-cart" />
            <span>E-Commerce</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="briefcase" />
            <span>Services</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="leaf" />
            <span>Renewable Energy</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="truck" />
            <span>Logistics & Transport</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="cube" />
            <span>FMCG</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="home" />
            <span>Building Materials</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="credit-card" />
            <span>Fintech</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="heart" />
            <span>Non-Profit Organisations</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="microchip" />
            <span>Semiconductors</span>
          </div>

          <div className="pf-ind-item">
            <Icon name="car" />
            <span>Automobile</span>
          </div>
        </div>
      </div>
    </section>
  );
}