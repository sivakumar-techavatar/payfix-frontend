"use client";

import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh S.",
    role: "CFO, Manufacturing Company · Chennai",
    quote:
      "Payfix transformed our payroll operations completely. Their team ensures our PF, ESI, and TDS filings are always on time — we haven't faced a single penalty.",
    avatar:
      "https://ui-avatars.com/api/?name=Rajesh+S&background=001328&color=fff",
  },
  {
    id: 2,
    name: "Priya K.",
    role: "Founder, Tech Startup · Bangalore",
    quote:
      "As a growing startup, we needed expert HR and compliance guidance. Payfix provided exactly that — structured onboarding, POSH compliance, and employee policies.",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+K&background=ee3234&color=fff",
  },
  {
    id: 3,
    name: "Arun M.",
    role: "Director, Retail Chain · Puducherry",
    quote:
      "Their GST filing accuracy is exceptional. Payfix helped us recover input credits we had been missing for years. Truly a game-changer for our business.",
    avatar:
      "https://ui-avatars.com/api/?name=Arun+M&background=0f6fd5&color=fff",
  },
  {
    id: 4,
    name: "Suresh V.",
    role: "Factory Manager · Coimbatore",
    quote:
      "We switched to Payfix for our factory compliance needs. Labour law filings, PF/ESI, professional tax — everything is handled seamlessly month after month.",
    avatar:
      "https://ui-avatars.com/api/?name=Suresh+V&background=10b981&color=fff",
  },
  {
    id: 5,
    name: "Kavitha R.",
    role: "Entrepreneur · Chennai",
    quote:
      "Payfix registered our company, obtained trade license, FSSAI, and MSME certificate — all within two weeks. Their knowledge of Tamil Nadu regulations is outstanding.",
    avatar:
      "https://ui-avatars.com/api/?name=Kavitha+R&background=8b5cf6&color=fff",
  },
  {
    id: 6,
    name: "Mohan P.",
    role: "CA & Director · Hyderabad",
    quote:
      "We rely on Payfix for income tax returns, TDS quarterly filings, and internal auditing. Their proactive approach ensures we are always audit-ready.",
    avatar:
      "https://ui-avatars.com/api/?name=Mohan+P&background=e67e22&color=fff",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const gap = 24; // match CSS gap
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Auto-scroll
  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <section
      className="sec testimonials-section"
      id="testimonials"
      style={{
        background: "linear-gradient(180deg,#f8fafc 0%,#fff 100%)",
        padding: "80px 0",
      }}
    >
      <div className="container">
        {/* TITLE */}
        <div className="sec-title center">
          <div className="eyebrow-bar"></div>
          <span className="eyebrow">Client Testimonials</span>
          <h2>What Our Clients Say</h2>
          <p>
            Trusted by 500+ businesses across India for compliance, payroll, and
            advisory services.
          </p>
        </div>

        <div className="testmonial-carousel">
          <button className="nav left" onClick={() => scroll("left")}>
            ‹
          </button>

          <div
            className="track"
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {testimonials.map((t) => (
              <div className="card" key={t.id}>
                <p className="text">"{t.quote}"</p>

                <div className="user">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="nav right" onClick={() => scroll("right")}>
            ›
          </button>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 13, color: "#8899a6", fontWeight: 600 }}>
            Have your own experience to share?{" "}
            <a href="#contact" style={{ color: "var(--red)", fontWeight: 700 }}>
              We'd love to hear it →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
