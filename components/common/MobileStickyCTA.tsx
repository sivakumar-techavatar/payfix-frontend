"use client";

import { getPhNo, openWA } from "@/helpers";
import { Icon } from "@/components/common/Icon";

/**
 * Sticky bottom CTA bar shown on mobile only. Three taps for the three
 * highest-converting actions from a mobile lead's perspective:
 *
 *   Call      — tel: link to the office number (one-tap dialer)
 *   WhatsApp  — opens WA with a pre-seeded message
 *   Quote     — anchors to the on-page contact form
 *
 * Hidden on desktop via the .mobile-only-flex class declared below in
 * a <style jsx global>-style block (kept here to avoid touching the
 * mega CSS files). The Floating chat widget gets a CSS-level z-index
 * bump and a body bottom-padding so content isn't hidden behind the
 * bar.
 */
export default function MobileStickyCTA() {
  const phone = getPhNo();
  const tel = `tel:+${phone}`;
  const wa = openWA();

  const scrollContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="mobile-sticky-cta" role="navigation" aria-label="Quick contact">
        <a
          href={tel}
          className="msc-btn msc-call"
          aria-label="Call Payfix Advisors"
        >
          <Icon name="phone" size={18} />
          <span>Call</span>
        </a>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="msc-btn msc-wa"
          aria-label="WhatsApp Payfix Advisors"
        >
          <Icon name="whatsapp" size={18} />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={scrollContact}
          className="msc-btn msc-quote"
          aria-label="Jump to quote form"
        >
          <Icon name="paper-plane" size={16} />
          <span>Get Quote</span>
        </button>
      </div>

      <style jsx global>{`
        .mobile-sticky-cta {
          display: none;
        }
        @media (max-width: 900px) {
          .mobile-sticky-cta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 800;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0;
            background: #fff;
            border-top: 1px solid var(--border-light);
            box-shadow: 0 -2px 12px rgba(0, 19, 40, 0.08);
            padding: 6px 4px calc(6px + env(safe-area-inset-bottom, 0px));
          }
          .msc-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            padding: 8px 4px;
            background: transparent;
            border: none;
            text-decoration: none;
            color: var(--navy);
            font-family: "Nunito", sans-serif;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.01em;
            cursor: pointer;
            border-radius: 10px;
            transition: background 0.18s ease;
          }
          .msc-btn:active {
            background: var(--bg-soft);
          }
          .msc-call {
            color: var(--blue);
          }
          .msc-wa {
            color: #25d366;
          }
          .msc-quote {
            color: var(--red);
          }
          .msc-btn span {
            white-space: nowrap;
          }
          /* Make sure page content doesn't hide behind the bar */
          body {
            padding-bottom: 68px;
          }
          /* Hide FloatingWidgets FAB entirely on mobile — the sticky
             bar already provides Call + WhatsApp, so the FAB is
             redundant clutter on small screens. Desktop still shows it. */
          .wa-fab,
          .wa-panel,
          .floating-widget-wrap {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
