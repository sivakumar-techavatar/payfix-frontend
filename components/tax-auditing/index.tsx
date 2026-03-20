"use client";

import { Box, Container } from "@mui/material";
import Header from "../common/Header";
import BenefitsSection from "./BenefitsSection";
import Hero from "./Hero";
import { ProblemSection } from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import WhySection from "./WhySection";
import FaqSection from "../common/FaqSection";
import { TaxAuditFAQs } from "@/constants";
import ConversionSection from "./ConversationSection";
import ProcessSection from "./ProcessSection";
import IndustriesSection from "./IndustriesSection";
import LateralServices from "./LateralServices";
import TrustBar from "./TrustBar";
import Footer from "../common/Footer";
import useReveal from "@/hooks/useReveal";

const TaxAuditing = () => {
  useReveal();
  return (
    <>
      <Header scoreCheckText="Check Your Tax Score" />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <WhySection />
      <Box py={10}>
        <Container>
          <FaqSection title="HR Services - FAQs" faqs={TaxAuditFAQs} />
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

export default TaxAuditing;
