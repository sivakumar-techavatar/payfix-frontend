"use client";

import React, { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

/**
 * Replace with real client testimonials only.
 *
 * Each entry must include: full name (with permission), role + company,
 * quote, and ideally a real headshot path under /public/testimonials/.
 *
 * If this array is empty the section is hidden entirely — prefer hiding
 * over fabricating social proof.
 */
const testimonials: Testimonial[] = [];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isHovered || testimonials.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  if (testimonials.length === 0) return null;

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
        <div className="sec-title center">
          <div className="eyebrow-bar"></div>
          <span className="eyebrow">Client Testimonials</span>
          <h2>What Our Clients Say</h2>
          <p>
            Trusted by growing businesses across India for compliance, payroll
            and advisory services.
          </p>
        </div>

        <div className="testmonial-carousel">
          <button
            type="button"
            className="nav left"
            onClick={() => scroll("left")}
            aria-label="Previous testimonial"
          >
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
                <p className="text">&ldquo;{t.quote}&rdquo;</p>

                <div className="user">
                  {t.avatar && <img src={t.avatar} alt="" />}
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="nav right"
            onClick={() => scroll("right")}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 13, color: "#8899a6", fontWeight: 600 }}>
            Have your own experience to share?{" "}
            <a href="#contact" style={{ color: "var(--red)", fontWeight: 700 }}>
              We&apos;d love to hear it →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
