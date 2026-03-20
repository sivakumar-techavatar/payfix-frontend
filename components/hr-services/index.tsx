"use client";

import { Box, Container } from "@mui/material";
import { HRFAQs } from "@/constants";
import useReveal from "@/hooks/useReveal";
import Header from "../common/Header";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import BenefitsSection from "./BenefitsSection";
import WhySection from "./WhySection";
import FaqSection from "../common/FaqSection";
import ConversionSection from "./ConversationSection";
import ProcessSection from "./ProcessSection";
import IndustriesSection from "./IndustriesSection";
import TrustBar from "./TrustBar";
import LateralServices from "./LateralServices";
import Footer from "../common/Footer";

const HRSevices = () => {
  useReveal();
  return (
    <>
      <Header scoreCheckText="Check Your HR Score" />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <WhySection />
      <Box py={10}>
        <Container>
          <FaqSection title="HR Services - FAQs" faqs={HRFAQs} />
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

export default HRSevices;
