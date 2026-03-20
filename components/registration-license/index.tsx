"use client";

import { Box, Container } from "@mui/material";
import Header from "../common/Header";
import BenefitsSection from "./BenefitsSection";
import Hero from "./Hero";
import { ProblemSection } from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import WhySection from "./WhySection";
import FaqSection from "../common/FaqSection";
import { RegisterLicenseFAQs } from "@/constants";
import ConversionSection from "./ConversationSection";
import ProcessSection from "./ProcessSection";
import IndustriesSection from "./IndustriesSection";
import LateralServices from "./LateralServices";
import TrustBar from "./TrustBar";
import Footer from "../common/Footer";
import useReveal from "@/hooks/useReveal";

const RegistrationLicense = () => {
  useReveal();
  return (
    <>
      <Header scoreCheckText="Check Your Business Health" />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <WhySection />
      <Box py={10}>
        <Container>
          <FaqSection title="HR Services - FAQs" faqs={RegisterLicenseFAQs} />
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

export default RegistrationLicense;
