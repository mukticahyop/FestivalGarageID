import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Catalog from "@/components/Catalog";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  // Configured WhatsApp Admin Number (62 + number without leading 0)
  const WA_NUMBER = "6282198901253";

  return (
    <>
      <Header waNumber={WA_NUMBER} />
      <main>
        <Hero waNumber={WA_NUMBER} />
        <TrustBar />
        <Catalog waNumber={WA_NUMBER} />
        <HowItWorks />
        <Faq />
        <Cta waNumber={WA_NUMBER} />
      </main>
      <Footer waNumber={WA_NUMBER} />
    </>
  );
}
