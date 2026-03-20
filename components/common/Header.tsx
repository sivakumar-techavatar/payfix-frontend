"use client";

import {
  Box,
  Container,
  Typography,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import Logo from "./Logo";
import { getPhNo } from "@/helpers";

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
  const [servicesOpen, setServicesOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMobileDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const toggleServicesMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setServicesOpen((prev) => !prev);
  };

  return (
    <>
      {/* TOP BAR */}
      <Box className="top-bar">
        <Container>
          <Box className="top-bar-inner">
            <Typography component="p">
              <i className="fa fa-map-marker"></i> Onsite: Tamil Nadu ·
              Puducherry · Bangalore · Hyderabad &nbsp;|&nbsp; All other
              locations served remotely &nbsp;|&nbsp; Onsite visits available on
              request
            </Typography>

            <Box className="top-bar-right">
              <span>Talk to Us</span>

              <a href={`tel:+${getPhNo()}`}>
                <i className="fa fa-phone"></i> +91 86809 39401
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

                <div className="nav-dropdown">
                  <button
                    className="nav-dropdown-trigger"
                    onClick={toggleServicesMenu}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                  >
                    Services
                    <svg
                      className="nav-chevron"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <div className="nav-dropdown-menu">
                      <a href="/payroll-compliance" className="ndm-item">
                        <span className="ndm-icon">
                          <i className="fa fa-money"></i>
                        </span>
                        <span className="ndm-text">
                          <strong>Payroll Compliance</strong>
                          <em>PF · ESI · TDS · Labour Law</em>
                        </span>
                      </a>

                      <a href="/hr-services" className="ndm-item">
                        <span className="ndm-icon ndm-blue">
                          <i className="fa fa-users"></i>
                        </span>
                        <span className="ndm-text">
                          <strong>HR Services</strong>
                          <em>Hiring · HRMS · Policy Framework</em>
                        </span>
                      </a>

                      <a href="/tax-auditing" className="ndm-item">
                        <span className="ndm-icon ndm-teal">
                          <i className="fa fa-bar-chart"></i>
                        </span>
                        <span className="ndm-text">
                          <strong>Tax & Auditing</strong>
                          <em>GST · Income Tax · Internal Audit</em>
                        </span>
                      </a>

                      <a href="/registration-license" className="ndm-item">
                        <span className="ndm-icon ndm-slate">
                          <i className="fa fa-building-o"></i>
                        </span>
                        <span className="ndm-text">
                          <strong>Registration & License</strong>
                          <em>ROC · DSC · Factory License</em>
                        </span>
                      </a>
                    </div>
                  )}
                </div>

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
                    <i className="fa fa-check-square-o"></i> {scoreCheckText}
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
              <button onClick={closeMobileNav}>✕</button>
            </Box>

            {/* NAV LINKS */}
            <Box sx={{ px: 2, py: 2 }}>
              {/* LINK ITEM */}
              <NavItem href="/" label="Home" onClick={closeMobileNav} />

              {/* SERVICES */}
              <Box>
                <button
                  onClick={toggleServicesMenu}
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
                  <span>{servicesOpen ? "−" : "+"}</span>
                </button>

                {servicesOpen && (
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
