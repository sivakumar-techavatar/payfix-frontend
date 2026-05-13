"use client";
import { BRAND } from "@/constants/brand";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const images = [
  {
    image: "/posts/image1.jpg",
    link: "https://www.instagram.com/p/DUsA75zEX6H/?igsh=MTJ1ejIyZTQ1aHV1ZA==",
  },
  {
    image: "/posts/image2.jpg",
    link: "https://www.instagram.com/p/DU-ADpYEYV2/?igsh=MWg1ZnUzNjhsYjhkdA==",
  },
  {
    image: "/posts/image3.jpg",
    link: "https://www.instagram.com/p/DUkFdsWAZEj/?igsh=MThhYmtuN21hZ3poaQ==",
  },
  {
    image: "/posts/image4.jpg",
    link: "https://www.instagram.com/p/DUVtuPrAUr7/?igsh=bWh0YXM1OWxxazlw",
  },
];

const Hero = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect reduced-motion preference — no auto-rotation
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    let index = 0;
    slides[0].classList.add("active");

    if (reduceMotion) return;

    const interval = setInterval(() => {
      // Skip rotation if the user is hovering OR the tab is hidden.
      // Use refs (not state) so we don't tear the interval down on
      // every hover state change.
      if (pausedRef.current || document.hidden) return;

      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      slides[index].classList.add("active");
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg-img" />
      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-inner">
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="dot"></div>
              {BRAND.socialProof}
            </div>

            <h1>
              Payroll, HR, Tax Compliance & Business Licensing{" "}
              <em>Simplified.</em>
            </h1>

            <p className="hero-sub">
              End-to-end compliance management for Indian businesses — from
              payroll processing and statutory filings to HR consulting and tax
              auditing. Built around proactive deadline tracking systems.
            </p>

            <Link href="/compliance-check" passHref>
              <Button
                variant="contained"
                color="error"
                className="cta-border"
                sx={{
                  color: "#fff",
                  py: 2,
                  px: 4,
                  borderRadius: 40,
                  fontWeight: 900,
                  animation: "ctaGlow 1.5s ease-in-out infinite",
                  transition: "transform 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-2px) scale(1.03)",
                  },

                  "@keyframes ctaGlow": {
                    "0%": {
                      boxShadow: "0 0 0 0 rgba(255,255,255,0.8)",
                    },
                    "70%": {
                      boxShadow: "0 0 0 14px rgba(255,255,255,0)",
                    },
                    "100%": {
                      boxShadow: "0 0 0 0 rgba(255,255,255,0)",
                    },
                  },
                }}
              >
                Check Your Business Score
              </Button>
            </Link>

            <div className="hero-stats">
              {BRAND.heroStats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <div className="hero-stat-num">{s.value}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div>
            <div
              className="carousel"
              onMouseEnter={() => {
                pausedRef.current = true;
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
              }}
              onFocus={() => {
                pausedRef.current = true;
              }}
              onBlur={() => {
                pausedRef.current = false;
              }}
            >
              <div className="carousel-track" ref={trackRef}>
                {images.map((src, i) => (
                  <a
                    key={i}
                    href={src.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slide"
                    aria-label={`View Payfix Instagram post ${i + 1}`}
                  >
                    <Image
                      src={src.image}
                      alt={`Payfix Instagram post ${i + 1}`}
                      width={800}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 480px"
                      priority={i === 0}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
