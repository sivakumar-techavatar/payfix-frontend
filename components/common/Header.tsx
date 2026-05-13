"use client";

import {
  Box,
  Container,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { getPhNo } from "@/helpers";
import { Icon } from "@/components/common/Icon";

interface IHeader {
  scoreCheckText?: string;
  scoreCheckTextClick?: () => void;
}

const NavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    style={{
      display: "block",
      padding: "14px 0",
      fontSize: 16,
      fontWeight: 500,
      textDecoration: "none",
      color: "#111",
      borderBottom: "1px solid #f5f5f5",
    }}
  >
    {label}
  </a>
);

const SubNavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    style={{
      display: "block",
      padding: "10px 0",
      fontSize: 14,
      color: "#555",
      textDecoration: "none",
    }}
  >
    {label}
  </a>
);

const Header = ({
  scoreCheckText = "",
  scoreCheckTextClick = () => {},
}: IHeader) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  // Reset mobile state on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const toggleMobileDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  const toggleMobileServices = (e: MouseEvent) => {
    e.stopPropagation();
    setMobileServicesOpen((prev) => !prev);
  };

  return (
    <>
      {/* TOP BAR */}
      <Box className="top-bar">
        <Container>
          <Box className="top-bar-inner">
            <Typography component="p">
              <Icon name="map-marker" /> Onsite: Tamil Nadu ·
              Puducherry · Bangalore · Hyderabad &nbsp;|&nbsp; All other
              locations served remotely &nbsp;|&nbsp; Onsite visits available on
              request
            </Typography>

            <Box className="top-bar-right">
              <span>Talk to Us</span>

              <a href={`tel:+${getPhNo()}`}>
                <Icon name="phone" /> +91 86809 39401
              </a>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* HEADER */}
      <Box component="header" className="site-header" id="mainHeader">
        <Container>
          <Box className="nav-wrap">
            <Logo />

            {/* MOBILE ONLY: HAMBURGER */}
            {isMobile && (
              <button
                className="hamburger"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={toggleMobileDrawer}
              >
                <span />
                <span />
                <span />
              </button>
            )}

            {/* DESKTOP NAV */}
            {!isMobile && (
              <nav className="nav-links">
                <a href="/">Home</a>

                <Link href="/#services" className="nav-flat-link">
                  Services
                </Link>

                <a href="/#about">About</a>
                <a href="/#pricing">Pricing</a>
                <a href="/#careers">Careers</a>
                <a href="/#contact">Contact</a>
              </nav>
            )}

            {/* CTA */}
            {!isMobile && (
              <Box>
                {scoreCheckText ? (
                  <a
                    href="#"
                    className="btn btn-blue nav-cta"
                    onClick={scoreCheckTextClick}
                  >
                    <Icon name="check-square-o" /> {scoreCheckText}
                  </a>
                ) : (
                  <a href="/#contact" className="btn nav-cta">
                    SCHEDULE CONSULTATION
                  </a>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={closeMobileNav}>
        <Box
          sx={{
            width: 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "#fff",
          }}
        >
          {/* TOP SECTION */}
          <Box>
            {/* HEADER */}
            <Box
              sx={{
                px: 2,
                py: 2,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Logo />
              <button
                type="button"
                onClick={closeMobileNav}
                aria-label="Close navigation menu"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                ✕
              </button>
            </Box>

            {/* NAV LINKS */}
            <Box sx={{ px: 2, py: 2 }}>
              {/* LINK ITEM */}
              <NavItem href="/" label="Home" onClick={closeMobileNav} />

              {/* SERVICES */}
              <Box>
                <button
                  onClick={toggleMobileServices}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 0",
                    fontSize: 16,
                    fontWeight: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                  }}
                >
                  Services
                  <span>{mobileServicesOpen ? "−" : "+"}</span>
                </button>

                {mobileServicesOpen && (
                  <Box sx={{ pl: 1 }}>
                    <SubNavItem
                      href="/payroll-compliance"
                      label="Payroll Compliance"
                      onClick={closeMobileNav}
                    />
                    <SubNavItem
                      href="/hr-services"
                      label="HR Services"
                      onClick={closeMobileNav}
                    />
                    <SubNavItem
                      href="/tax-auditing"
                      label="Tax & Auditing"
                      onClick={closeMobileNav}
                    />
                    <SubNavItem
                      href="/registration-license"
                      label="Registration & License"
                      onClick={closeMobileNav}
                    />
                  </Box>
                )}
              </Box>

              <NavItem href="/#about" label="About" onClick={closeMobileNav} />
              <NavItem
                href="/#pricing"
                label="Pricing"
                onClick={closeMobileNav}
              />
              <NavItem
                href="/#careers"
                label="Careers"
                onClick={closeMobileNav}
              />
              <NavItem
                href="/#contact"
                label="Contact"
                onClick={closeMobileNav}
              />
            </Box>
          </Box>

          {/* CTA SECTION */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #eee",
              display:"flex",
              justifyContent: "center"
            }}
          >
            {scoreCheckText ? (
              <a
                href="#"
                onClick={scoreCheckTextClick}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "8px",
                  background: "#1976d2",
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {scoreCheckText}
              </a>
            ) : (
              <a href="/#contact" className="btn nav-cta">
                SCHEDULE CONSULTATION
              </a>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
