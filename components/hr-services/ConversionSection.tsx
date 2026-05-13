import { openWA } from "@/helpers";
import { Icon } from "@/components/common/Icon";

export default function ConversionSection() {
  return (
    <section className="conversion-section">
      <div className="container">
        <div className="conversion-block">
          <h2>Ready to Simplify Your HR Operations?</h2>

          <p>
            Speak with a dedicated HR specialist. We'll assess your current HR
            maturity and give you a clear action plan within 24 hours.
          </p>

          <div className="conversion-ctas">
            <button
              className="btn btn-wa btn-lg"
              onClick={() => openWA("HR Operations")}
              style={{ fontSize: 15, padding: "16px 32px" }}
            >
              <Icon name="whatsapp" />
              Talk to an HR Expert
            </button>

            <button
              className="btn btn-outline-dk"
              onClick={() => openWA("HR Consultation")}
              style={{
                color: "#fff",
                borderColor: "rgba(255,255,255,.25)",
                padding: "16px 28px",
              }}
            >
              <Icon name="calendar" style={{ marginRight: 4 }} />
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
