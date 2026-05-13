import { Icon } from "@/components/common/Icon";

const services = [
  {
    title: "HR Services",
    desc: "Hiring · HRMS · Policy Framework",
    icon: "fa-users",
    iconClass: "li-blue",
    href: "/hr-services",
  },
  {
    title: "Tax & Auditing",
    desc: "GST · Income Tax · Internal Audit",
    icon: "fa-bar-chart",
    iconClass: "li-teal",
    href: "/tax-auditing",
  },
  {
    title: "Registration & License",
    desc: "ROC · DSC · Factory License",
    icon: "fa-building-o",
    iconClass: "li-slate",
    href: "/registration-license",
  },
];

export default function LateralServices() {
  return (
    <section className="lateral-services">
      <div className="container">
        <h2>Explore Other Services</h2>

        <div className="lateral-grid">
          {services.map((service) => (
            <a key={service.title} href={service.href} className="lateral-card">
              <div className={`lateral-icon ${service.iconClass}`}>
                <Icon name={service.icon} />
              </div>

              <div className="lateral-text">
                <strong>{service.title}</strong>
                <span>{service.desc}</span>
              </div>

              <Icon name="arrow-right" className="lateral-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
