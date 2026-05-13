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
import ConversionSection from "./ConversionSection";
import ProcessSection from "./ProcessSection";
import IndustriesSection from "./IndustriesSection";
import TrustBar from "../services-shared/TrustBar";
import LateralServices from "../services-shared/LateralServices";
import Footer from "../common/Footer";

const HRServices = () => {
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
          <FaqSection title="HR Services — FAQs" faqs={HRFAQs} />
        </Container>
      </Box>
      <ConversionSection />
      <ProcessSection />
      <IndustriesSection />
      <TrustBar />
      <LateralServices exclude="hr-services" />
      <Footer />
    </>
  );
};

export default HRServices;
