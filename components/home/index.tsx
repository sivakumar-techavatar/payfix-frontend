"use client";

import { useState } from "react";
import Hero from "./Hero";
import Ticker from "./Ticker";
import Header from "../common/Header";
import ServicesOverview from "./ServicesOverview";
import Steps from "./Steps";
import WhyChoose from "./WhyChoose";
import About from "./About";
import Testimonials from "./Testimonials";
import PanIndiaBanner from "./PanIndiaBanner";
import Contact from "./Contact";
import MobilePage from "./MobilePage";
import Pricing from "./Pricing";
import useReveal from "@/hooks/useReveal";
import HealthCheckSection from "./HealthCheck";
import Careers from "./careers";
import Footer from "../common/Footer";
import EnquiryModal from "./EnquiryModal";

const HomePage = () => {
  useReveal();

  const [leadOpen, setLeadOpen] = useState(false);
  const [leadService, setLeadService] = useState("");

  const openLead = (service: string) => {
    setLeadService(service);
    setLeadOpen(true);
  };

  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <ServicesOverview />
      <Steps />
      <WhyChoose />
      <About />
      <PanIndiaBanner />
      <Testimonials />
      <Contact />
      <MobilePage />
      <Pricing openLead={openLead} />
      <HealthCheckSection />
      <Careers />
      <Footer />

      <EnquiryModal
        open={leadOpen}
        service={leadService}
        onClose={() => setLeadOpen(false)}
      />
    </>
  );
};

export default HomePage;
