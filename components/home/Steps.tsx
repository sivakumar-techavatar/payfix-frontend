"use client";

import React from "react";

const steps = [
  {
    id: "01",
    icon: "fa-comments-o",
    title: "Book a Free Consultation",
    text: "We learn about your business, headcount, and compliance challenges. No obligation — just a helpful conversation with our experts.",
    link: "#contact",
    linkText: "Schedule a Call",
  },
  {
    id: "02",
    icon: "fa-clipboard",
    title: "Receive a Custom Plan",
    text: "We design a service package tailored to your exact requirements — with transparent pricing, a clear timeline, and zero surprises.",
    link: "#pricing",
    linkText: "View Sample Plans",
  },
  {
    id: "03",
    icon: "fa-handshake-o",
    title: "We Handle Everything",
    text: "Your dedicated account manager takes over all compliance — every deadline tracked, every filing handled accurately and on schedule.",
    link: "#contact",
    linkText: "Get Started",
  },
];

const StepCard = ({
  step,
}: {
  step: {
    id: string;
    icon: string;
    title: string;
    text: string;
    link: string;
    linkText: string;
  };
}) => {
  return (
    <div className="step-card">
      <span className="step-num">{step.id}</span>

      <span className="step-icon">
        <i
          className={`fa ${step.icon}`}
          style={{ fontSize: 36, color: "rgba(255,255,255,.7)" }}
        />
      </span>

      <h3>{step.title}</h3>

      <p>{step.text}</p>

      <a href={step.link} className="step-link">
        {step.linkText} <i className="fa fa-arrow-right"></i>
      </a>
    </div>
  );
};

const Steps = () => {
  return (
    <section className="steps-section sec" id="how">
      <div className="container">
        <div className="sec-title light center" style={{ marginBottom: 52 }}>
          <div
            className="eyebrow-bar"
            style={{
              background: "#fff",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <span className="eyebrow">How We Work</span>
          <h2>Get Started in 3 Simple Steps</h2>
          <p style={{ color: "rgba(255,255,255,.5)" }}>
            From your first call to ongoing compliance — we make the process
            effortless.
          </p>
        </div>

        <div className="grid-3">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
