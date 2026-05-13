"use client";

import { Container } from "@mui/material";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

type Props = {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
};

/**
 * Shared shell for the legal pages (privacy, terms, refund). Renders the
 * standard header + footer with a typography-tuned content block in the
 * middle. Per-page content is passed as children from each route.
 */
export default function LegalPage({ title, effectiveDate, children }: Props) {
  return (
    <>
      <Header />
      <main
        style={{
          padding: "60px 0 80px",
          background: "var(--bg-soft)",
          minHeight: "60vh",
        }}
      >
        <Container maxWidth="md">
          <header style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "var(--navy)",
                margin: "0 0 8px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-muted)",
                margin: 0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Effective {effectiveDate}
            </p>
          </header>

          <div
            className="legal-content"
            style={{
              background: "#fff",
              padding: "32px 36px",
              borderRadius: 12,
              border: "1px solid var(--border-light)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--text)",
            }}
          >
            {children}
          </div>

          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            Questions? Reach our grievance officer at{" "}
            <a
              href="mailto:info@payfixadvisors.in"
              style={{ color: "var(--blue)", fontWeight: 700 }}
            >
              info@payfixadvisors.in
            </a>{" "}
            — we respond within one business day.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
