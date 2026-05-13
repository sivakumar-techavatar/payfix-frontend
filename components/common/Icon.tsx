"use client";

import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  Book,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  Car,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Clock,
  Cog,
  Contact as ContactIcon,
  Cpu,
  CreditCard,
  Expand,
  Factory,
  FileText,
  Flame,
  Gavel,
  Globe,
  Handshake,
  Heart,
  HeartPulse,
  Home,
  IndianRupee,
  Key,
  Landmark,
  Laptop,
  Leaf,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  MessageSquareText,
  Monitor,
  Network,
  Package,
  Phone,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Signal,
  Star,
  Trophy,
  Truck,
  University,
  Upload,
  User,
  UserCircle,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number; color?: string }>;

/* ────────── Brand-logo SVGs (Lucide doesn't ship brand icons) ────────── */

const LinkedInIcon: LucideIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={p.size ?? 16}
    height={p.size ?? 16}
    {...p}
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const InstagramIcon: LucideIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={p.strokeWidth ?? 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={p.size ?? 16}
    height={p.size ?? 16}
    {...p}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: LucideIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={p.size ?? 16}
    height={p.size ?? 16}
    {...p}
  >
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const WhatsAppIcon: LucideIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={p.size ?? 16}
    height={p.size ?? 16}
    {...p}
  >
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.79.37c-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21.93h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.46-4.44 9.89-9.9 9.89ZM20.5 3.5A11.85 11.85 0 0 0 12.04 0C5.46 0 .11 5.34.1 11.91a11.86 11.86 0 0 0 1.58 5.95L0 24l6.27-1.65a11.88 11.88 0 0 0 5.77 1.48h.01c6.58 0 11.93-5.34 11.93-11.92 0-3.18-1.25-6.18-3.5-8.43Z" />
  </svg>
);

/* ────────── FA-name → Lucide-component map ────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  // Navigation / chevrons
  "angle-right": ChevronRight,
  "arrow-right": ArrowRight,
  "arrow-down": ArrowDown,
  "chevron-down": ChevronDown,
  "times": X,

  // Status / alerts
  "check-circle": CheckCircle2,
  "check-square-o": CheckSquare,
  "exclamation-triangle": AlertTriangle,
  "clock-o": Clock,

  // Business / finance
  "money": IndianRupee,
  "inr": IndianRupee,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  "line-chart": LineChart,
  "calculator": Calculator,
  "exchange": ArrowLeftRight,
  "balance-scale": Landmark,
  "gavel": Gavel,
  "trophy": Trophy,

  // People
  "user-o": User,
  "user-circle-o": UserCircle,
  "users": Users,
  "id-card-o": ContactIcon,
  "id-badge": BadgeCheck,
  "handshake-o": Handshake,

  // Communication
  "envelope-o": Mail,
  "phone": Phone,
  "comments": MessageSquare,
  "comments-o": MessageSquareText,
  "paper-plane": Send,
  "bell-o": Bell,

  // Documents / process
  "file-text-o": FileText,
  "book": Book,
  "clipboard": Clipboard,
  "calendar": Calendar,
  "calendar-check-o": CalendarCheck,
  "search": Search,
  "refresh": RefreshCw,
  "cogs": Cog,
  "sitemap": Network,
  "upload": Upload,

  // Buildings / places
  "home": Home,
  "building": Building,
  "building-o": Building2,
  "industry": Factory,
  "university": University,
  "institution": Landmark,
  "map-marker": MapPin,
  "certificate": Award,

  // Tech / objects
  "desktop": Monitor,
  "laptop": Laptop,
  "microchip": Cpu,
  "key": Key,
  "lock": Lock,
  "shield": Shield,
  "cube": Package,
  "rocket": Rocket,
  "fire-extinguisher": Flame,
  "expand": Expand,
  "signal": Signal,
  "globe": Globe,

  // Industries / verticals
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  "briefcase": Briefcase,
  "truck": Truck,
  "leaf": Leaf,
  "heart": Heart,
  "plus-square": HeartPulse,
  "cutlery": UtensilsCrossed,
  "car": Car,
  "star-o": Star,

  // Brand logos (inline SVG)
  "linkedin": LinkedInIcon,
  "instagram": InstagramIcon,
  "facebook": FacebookIcon,
  "whatsapp": WhatsAppIcon,
};

/* ────────── Component ────────── */

export type IconProps = {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  color?: string;
  strokeWidth?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function Icon({
  name,
  size = 16,
  className,
  style,
  color,
  strokeWidth = 2,
  ...rest
}: IconProps) {
  const key = name.replace(/^fa-/, "").replace(/^fa\s+fa-/, "");
  const Cmp = ICON_MAP[key];
  if (!Cmp) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[Icon] no mapping for "${name}" — add it to components/common/Icon.tsx`);
    }
    return null;
  }
  return (
    <Cmp
      width={size}
      height={size}
      size={size}
      className={className}
      style={style}
      color={color}
      strokeWidth={strokeWidth}
      aria-hidden={rest["aria-label"] ? undefined : "true"}
      {...rest}
    />
  );
}

export default Icon;
