import Link from "next/link";
import { Icon } from "@/components/common/Icon";

type ServiceSlug =
  | "payroll-compliance"
  | "hr-services"
  | "tax-auditing"
  | "registration-license";

type ServiceCard = {
  slug: ServiceSlug;
  title: string;
  desc: string;
  icon: string;
  iconClass: string;
};

const SERVICES: ServiceCard[] = [
  {
    slug: "payroll-compliance",
    title: "Payroll Compliance",
    desc: "PF · ESI · TDS · Salary Processing",
    icon: "money",
    iconClass: "",
  },
  {
    slug: "hr-services",
    title: "HR Services",
    desc: "Hiring · HRMS · Policy Framework",
    icon: "users",
    iconClass: "li-blue",
  },
  {
    slug: "tax-auditing",
    title: "Tax & Auditing",
    desc: "GST · Income Tax · Internal Audit",
    icon: "bar-chart",
    iconClass: "li-teal",
  },
  {
    slug: "registration-license",
    title: "Registration & License",
    desc: "ROC · DSC · Factory License",
    icon: "building-o",
    iconClass: "li-slate",
  },
];

type Props = {
  exclude: ServiceSlug;
  heading?: string;
};

export default function LateralServices({
  exclude,
  heading = "Explore Other Services",
}: Props) {
  const others = SERVICES.filter((s) => s.slug !== exclude);

  return (
    <section className="lateral-services">
      <div className="container">
        <h2>{heading}</h2>

        <div className="lateral-grid">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="lateral-card"
            >
              <div className={`lateral-icon ${s.iconClass}`.trim()}>
                <Icon name={s.icon} />
              </div>

              <div className="lateral-text">
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </div>

              <Icon name="arrow-right" className="lateral-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
