"use client";
import { BRAND } from "@/constants/brand";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = { image: string; link: string; alt?: string };

const FALLBACK_IMAGES: Slide[] = [
  {
    image: "/posts/image1.jpg",
    link: "https://www.instagram.com/p/DUsA75zEX6H/?igsh=MTJ1ejIyZTQ1aHV1ZA==",
    alt: "Payfix Instagram post 1",
  },
  {
    image: "/posts/image2.jpg",
    link: "https://www.instagram.com/p/DU-ADpYEYV2/?igsh=MWg1ZnUzNjhsYjhkdA==",
    alt: "Payfix Instagram post 2",
  },
  {
    image: "/posts/image3.jpg",
    link: "https://www.instagram.com/p/DUkFdsWAZEj/?igsh=MThhYmtuN21hZ3poaQ==",
    alt: "Payfix Instagram post 3",
  },
  {
    image: "/posts/image4.jpg",
    link: "https://www.instagram.com/p/DUVtuPrAUr7/?igsh=bWh0YXM1OWxxazlw",
    alt: "Payfix Instagram post 4",
  },
];

const Hero = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const [slidesData, setSlidesData] = useState<Slide[]>(FALLBACK_IMAGES);

  // Fetch from Sanity if configured; fall back to hardcoded if not.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { getFeaturedPosts } = await import("@/lib/sanity");
        const posts = await getFeaturedPosts();
        if (!cancelled && posts.length > 0) {
          setSlidesData(
            posts.map((p, i) => ({
              image: p.imageUrl,
              link: p.link,
              alt:
                p.caption ||
                p.title ||
                `Payfix ${p.platform || "social"} post ${i + 1}`,
            })),
          );
        }
      } catch {
        // Silent — fallback already loaded
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const track: any = trackRef.current;
    if (!track) return;

    const slides: any[] = Array.from(track.children);
    if (slides.length === 0) return;
    let index = 0;

    slides[0].classList.add("active");

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      slides[index].classList.add("active");
    }, 4000);

    return () => clearInterval(interval);
  }, [slidesData.length]);

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
                {slidesData.map((src, i) => (
                  <a
                    key={`${src.image}-${i}`}
                    href={src.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slide"
                    aria-label={src.alt || `View Payfix social post ${i + 1}`}
                  >
                    <Image
                      src={src.image}
                      alt={src.alt || `Payfix social post ${i + 1}`}
                      width={800}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 480px"
                      priority={i === 0}
                      unoptimized={src.image.startsWith("http")}
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
