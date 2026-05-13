"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "payfix-cookie-consent";
const CONSENT_VERSION = "v1";

type Consent = {
  version: string;
  acceptedAt: string;
};

/**
 * DPDP-aligned cookie notice. Shows once per browser; remembers
 * acceptance in localStorage. Tags ship by default (anonymous
 * analytics, legitimate-purpose under DPDP §7) — this banner is
 * a *notice* not a *gate*, which matches how Zoho/Razorpay/
 * GreytHR present cookies to Indian visitors.
 *
 * If you ever want strict opt-in (gating Meta Pixel + LinkedIn
 * behind acceptance), wire the consent state into Analytics.tsx
 * and skip rendering those <Script> tags until consent is given.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<Consent>;
      if (parsed?.version !== CONSENT_VERSION) {
        // policy version bumped — re-prompt
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      const data: Consent = {
        version: CONSENT_VERSION,
        acceptedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage unavailable (private mode, etc) — silently ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9000,
        maxWidth: 640,
        marginLeft: "auto",
        marginRight: "auto",
        background: "var(--navy)",
        color: "#fff",
        borderRadius: 14,
        padding: "18px 20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0, flex: "1 1 280px" }}>
        We use cookies for site analytics and lead-form attribution. Your
        contact information is handled per India&rsquo;s DPDP Act 2023.{" "}
        <Link
          href="/privacy"
          style={{
            color: "#9bc5ff",
            textDecoration: "underline",
            fontWeight: 700,
          }}
        >
          Read our Privacy Policy
        </Link>
        .
      </p>

      <button
        type="button"
        onClick={accept}
        style={{
          background: "var(--red)",
          color: "#fff",
          border: "none",
          borderRadius: 30,
          padding: "10px 22px",
          fontSize: 13,
          fontWeight: 800,
          cursor: "pointer",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        OK, Got It
      </button>
    </div>
  );
}
