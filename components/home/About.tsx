"use client";

import React from "react";

const aboutPoints = [
  "500+ Clients Served",
  "PAN India Reach",
  "3 Core Verticals",
  "0 Missed Deadlines",
  "100% Confidential",
  "Dedicated Account Manager",
];

const About = () => {
  return (
    <section className="sec about-section" id="about">
      <div className="container">
        <div className="grid-2">
          {/* LEFT IMAGE */}
          <div>
            <div className="about-img-wrap">
              <div className="about-main-img">
                <img
                  loading="lazy"
                  src="/team-photo.png"
                  alt="Payfix Advisors team at work"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>

              <div className="about-badge-box">
                <div className="about-badge-num">10+</div>
                <div className="about-badge-label">Years of Trust</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="about-content">
            <div className="sec-title">
              <div className="eyebrow-bar"></div>
              <span className="eyebrow">About Us</span>
              <h2>Your Trusted Compliance Partner Since Day One</h2>
            </div>

            <p className="about-text">
              Payfix Advisors was founded to remove the burden of payroll, HR,
              and tax compliance from business owners — freeing them to focus on
              growth, not paperwork.
            </p>

            <p className="about-text">
              With onsite presence in Tamil Nadu, Puducherry, Bangalore, and
              Hyderabad — and a remote-capable team — we serve businesses across
              India from startups to enterprises across manufacturing, IT,
              retail, healthcare, and more. Our combination of deep statutory
              knowledge and a client-first approach has earned us long-standing
              partnerships built entirely on trust and accuracy.
            </p>

            {/* FEATURES */}
            <div className="about-list">
              {aboutPoints.map((item, index) => (
                <div key={index} className="about-list-item">
                  <i className="fa fa-check-circle"></i>
                  {item}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <a href="#health-check" className="btn btn-red">
                View Pricing Plans
              </a>

              <a href="#careers" className="btn btn-outline-dk">
                Join Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
