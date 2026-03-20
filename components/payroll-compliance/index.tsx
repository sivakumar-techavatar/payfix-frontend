"use client";

import { Box, Container } from "@mui/material";
import { PayrollComplianceFAQs } from "@/constants";
import Header from "../common/Header";
import BenefitsSection from "./BenefitsSection";
import FaqSection from "../common/FaqSection";
import ProblemSection from "./ProblemSection";
import Hero from "./Hero";
import SolutionSection from "./SolutionSection";
import WhySection from "./WhySection";
import ConversionSection from "./ConversionSection";
import ProcessSection from "./ProcessSection";
import IndustriesSection from "./IndustriesSection";
import TrustBar from "./TrustBar";
import LateralServices from "./LateralServices";
import Footer from "../common/Footer";
import useReveal from "@/hooks/useReveal";

const PayrollCompliance = () => {
  useReveal();
  return (
    <>
      <Header scoreCheckText="Check Your Payroll Score" />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <WhySection />
      <Box py={10}>
        <Container>
          <FaqSection
            title="Payroll Compliance - FAQs"
            faqs={PayrollComplianceFAQs}
          />
        </Container>
      </Box>
      <ConversionSection />
      <ProcessSection />
      <IndustriesSection />
      <TrustBar />
      <LateralServices />
      <Footer />
    </>
  );
};

export default PayrollCompliance;
