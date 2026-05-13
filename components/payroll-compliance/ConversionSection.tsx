import { sendWAMessage } from "@/helpers";

const actions = [
  {
    label: "Talk to a Payroll Expert",
    icon: "fa-whatsapp",
    message: "Payroll Compliance",
    className: "btn btn-wa btn-lg",
    style: { fontSize: 15, padding: "16px 32px" },
  },
  {
    label: "Schedule a Consultation",
    icon: "fa-calendar",
    message: "Payroll Consultation",
    className: "btn btn-outline-dk",
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,.25)",
      padding: "16px 28px",
    },
  },
];

export default function ConversionSection() {

  return (
    <section className="conversion-section">
      <div className="container">
        <div className="conversion-block">
          <h2>Ready to Simplify Your Payroll Compliance?</h2>

          <p>
            Speak with a dedicated compliance expert. We'll map the right
            solution for your business — and give you a clear plan within 24
            hours.
          </p>

          <div className="conversion-ctas">
            {actions.map((action) => (
              <button
                key={action.label}
                className={action.className}
                style={action.style}
                onClick={() => sendWAMessage(action.message)}
              >
                <Icon
                  name={action.icon}
                  style={
                    action.icon === "fa-calendar" ? { marginRight: 4 } : {}
                  }
                />{" "}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
