"use client";

import { Box, Button } from "@mui/material";

interface ICard {
  title: string;
  price: string;
  subtitle: string;
  badge: string;
  features: {
    label: string;
    ok: boolean;
  }[];
  button: string;
  color?:string;
  isPremium: boolean;
}

export default function HealthCheckSection() {
  const cards: ICard[] = [
    {
      title: "Basic",
      price: "FREE",
      color: "#25d366",
      subtitle: "14 Qs · Quick PDF",
      badge: "",
      features: [
        { label: "Instant compliance score", ok: true },
        { label: "Risk level badges", ok: true },
        { label: "1-page PDF report", ok: true },
        { label: "Statutory references", ok: false },
        { label: "Advisory notes", ok: false },
        { label: "Expert call", ok: false },
      ],
      button: "Get Basic",
      isPremium: false,
    },
    {
      title: "Detailed",
      price: "₹999",
      color: "orange",
      subtitle: "27 Qs · 3-page PDF",
      badge: "BEST VALUE",
      features: [
        { label: "All flags + statutory refs", ok: true },
        { label: "+13 deep-dive questions", ok: true },
        { label: "Penalty breakdown per gap", ok: true },
        { label: "4 service-wise advisories", ok: true },
        { label: "Business maturity score", ok: true },
        { label: "Expert call", ok: false },
      ],
      button: "Get Detailed",
      isPremium: false,
    },
    {
      title: "Premium",
      price: "₹1,999",
      subtitle: "40 Qs · 4-page PDF",
      badge: "",
      features: [
        { label: "Everything in Detailed", ok: true },
        { label: "+13 premium questions", ok: true },
        { label: "30-day action roadmap", ok: true },
        { label: "90-day strategic plan", ok: true },
        { label: "15-min expert call", ok: true },
        { label: "Priority WhatsApp", ok: true },
      ],
      button: "Get Premium",
      isPremium: true,
    },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
      }}
    >
      <Header />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {cards.map((card, i) => (
          <PricingCard key={i} {...card} />
        ))}
      </div>
    </Box>
  );
}

function Header() {
  return (
    <>
      <div
        style={{
          display: "inline-block",
          background: "rgba(238,50,52,.15)",
          color: "var(--red)",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          padding: "5px 16px",
          borderRadius: 20,
          marginBottom: 14,
          border: "1px solid rgba(238,50,52,.25)",
          width: "max-content",
        }}
      >
        ✦ Business Health Check Report
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: "var(--navy)",
          margin: "0 0 8px",
        }}
      >
        Know Where Your Business Stands
      </h3>

      <p
        style={{
          fontSize: 14,
          color: "#64748b",
          margin: "0 0 36px",
          fontWeight: 600,
        }}
      >
        Instant compliance scoring with statutory references & downloadable PDF
        report
      </p>
    </>
  );
}

function PricingCard({
  title,
  price,
  subtitle,
  badge,
  features,
  button,
  color,
  isPremium,
}: any) {
  return (
    <Box
      sx={{
        background: "#0f172a",
        border: "2px solid rgba(99,102,241,.35)",
        borderRadius: "18px",
        padding: "32px 26px",
        position: "relative",
        transition: "all .25s ease",
        boxShadow: "0 4px 20px rgba(0,0,0,.15)",

        "&:hover": {
          borderColor: "#8b5cf6",
          boxShadow: "0 0 0 4px #8b5cf6, 0 20px 50px rgba(139,92,246,.25)",
          transform: "translateY(-6px)",
        },
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            padding: "5px 16px",
            borderRadius: 20,
          }}
        >
          {badge}
        </div>
      )}

      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "rgba(255,255,255,1)",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: color ||"#fff",
          marginBottom: 4,
        }}
      >
        {price}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.8)",
          marginBottom: 24,
        }}
      >
        {subtitle}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.06)",
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {features.map((f: any, i: number) => (
          <Feature key={i} ok={f.ok}>
            {f.label}
          </Feature>
        ))}
      </div>

      <Button
        style={{
          width: "100%",
          display: "block",
          textAlign: "center",
          padding: 13,
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 800,
          textDecoration: "none",
          background: isPremium
            ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
            : "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.12)",
          color: "#fff",
        }}
      >
        {button}
      </Button>
    </Box>
  );
}

function Feature({
  children,
  ok,
}: {
  children: React.ReactNode;
  ok?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: ok ? "rgba(255,255,255,1)" : "rgba(255,255,255,.5)",
      }}
    >
      <span>{ok ? "✓" : "✗"}</span>
      {children}
    </div>
  );
}
