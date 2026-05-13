"use client";

import { getMailId, getPhNo, openWA } from "@/helpers";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/schemas/leadSchema";
import { z } from "zod";
import { Icon } from "@/components/common/Icon";

type FormData = z.infer<typeof contactSchema>;

const contactItems = [
  {
    icon: "fa-envelope-o",
    title: "Email",
    value: getMailId(),
    link: `mailto:${getMailId()}`,
  },
  {
    icon: "fa-phone",
    title: "Phone & WhatsApp",
    value: "+91 86809 39401",
    link: `tel:+${getPhNo()}`,
  },
   {
    icon: "fa-map-marker",
    title: "Chennai (Head Office)",
    value:
      "Centre Point, 2/4, Mount Poonamallee High Road, Manapakkam, Porur – 600 089",
  },
  {
    icon: "fa-map-marker",
    title: "Puducherry (Regional Office)",
    value: "AR Plaza, 4th Floor, Brindavanam,",
    value2: "Puducherry – 605 011"
  },
];

const socialLinks = [
  {
    icon: "fa-linkedin",
    url: "https://www.linkedin.com/company/payfix-advisors",
  },
  { icon: "fa-instagram", url: "https://www.instagram.com/payfix_advisors" },
  { icon: "fa-facebook", url: "https://www.facebook.com/payfixadvisors" },
  { icon: "fa-whatsapp", url: openWA() },
];

const services = [
  "Payroll Compliance",
  "Temp Staffing",
  "HR Services",
  "Recruitment",
  "GST Filing",
  "Tax & Auditing",
  "DSC Registration",
  "Multiple Services",
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Inquiry sent successfully");
      reset();
    } catch {
      toast.error("Failed to send inquiry");
    }
  };
  
  return (
    <section
      className="sec contact-section"
      id="contact"
      style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}
    >
      <div className="container">
        <div className="contact-layout">
          {/* LEFT INFO */}
          <div>
            <div className="sec-title light">
              <div className="eyebrow-bar" style={{ background: "#fff" }}></div>
              <span className="eyebrow">Get In Touch</span>
              <h2>Let's Start a Conversation</h2>
              <p style={{ color: "rgba(255,255,255,.45)" }}>
                Ready to simplify compliance? We respond within one business
                day. No obligation, just helpful advice.
              </p>
            </div>

            {contactItems.map((item, i) => (
              <div key={i} className="contact-info-item">
                <div className="contact-icon">
                  <Icon name={item.icon} />
                </div>

                <div className="contact-text">
                  <strong>{item.title}</strong>

                  {item.link ? (
                    <a href={item.link}>{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}

                  {item?.value2  && <><br /> <span>{item.value2}</span> </>}
                </div>
              </div>
            ))}

            {/* SOCIAL */}
            <div className="contact-social-row">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  className="csoc"
                  rel="noopener noreferrer"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-card">
            <h3
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "var(--navy)",
                margin: "0 0 4px",
              }}
            >
              Send Us a Message
            </h3>

            <p
              style={{
                fontSize: 13,
                color: "var(--text)",
                fontWeight: 600,
                margin: "0 0 24px",
              }}
            >
              We'll get back to you within one business day
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input {...register("first")} placeholder="Arjun" />
                  {errors.first && (
                    <span className="form-error">{errors.first.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input {...register("last")} placeholder="Sharma" />
                </div>
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  {...register("company")}
                  placeholder="Your Company Pvt Ltd"
                />
                {errors.company && (
                  <span className="form-error">{errors.company.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+91 99999 00000"
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Service Required</label>

                <select {...register("service")}>
                  <option value="">Select a service</option>

                  {services.map((s, i) => (
                    <option key={i}>{s}</option>
                  ))}
                </select>

                {errors.service && (
                  <span className="form-error">{errors.service.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  {...register("message")}
                  placeholder="Tell us about your business..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-red"
                style={{
                  width: "100%",
                  padding: 17,
                  borderRadius: 40,
                  justifyContent: "center",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
