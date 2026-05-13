"use client";

import { usePathname } from "next/navigation";
import FloatingWidgets from "@/components/home/FloatingWidgets";
import MobileStickyCTA from "@/components/common/MobileStickyCTA";
import CookieBanner from "@/components/common/CookieBanner";

/**
 * Renders the marketing-site overlays (chat bubble, sticky mobile CTA,
 * cookie banner) only on marketing routes. Hidden on /admin (Sanity
 * Studio) — those overlays would obstruct the content editor UI.
 */
export default function LayoutShell() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <FloatingWidgets />
      <MobileStickyCTA />
      <CookieBanner />
    </>
  );
}
