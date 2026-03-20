import { openWA } from "@/helpers";

export default function ConversionSection() {
  return (
    <section className="conversion-section">
      <div className="container">
        <div className="conversion-block">
          <h2>Ready to Simplify Your Tax & GST Compliance?</h2>

          <p>
            Speak with a dedicated compliance expert. We'll map the right
            solution for your business — and give you a clear plan within 24
            hours.
          </p>

          <div className="conversion-ctas">
            <button
              className="btn btn-wa btn-lg"
              onClick={() => openWA("Tax & GST Compliance")}
              style={{ fontSize: 15, padding: "16px 32px" }}
            >
              <i className="fa fa-whatsapp"></i> Talk to a Tax Expert
            </button>

            <button
              className="btn btn-outline-dk"
              onClick={() => openWA("Tax Consultation")}
              style={{
                color: "#fff",
                borderColor: "rgba(255,255,255,.25)",
                padding: "16px 28px",
              }}
            >
              <i className="fa fa-calendar" style={{ marginRight: 4 }}></i>{" "}
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
