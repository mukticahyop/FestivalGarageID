"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: "Pilih Mobil",
      desc: "Browse katalog ready stock atau pre-order mobil tertentu via WhatsApp. Admin akan mengonfirmasi ketersediaan & harga final."
    },
    {
      num: "02",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      title: "Bayar",
      desc: "Lakukan pembayaran aman via E-wallet (OVO/DANA/GoPay/ShopeePay) atau Transfer Bank. Kirim bukti pembayaran ke admin."
    },
    {
      num: "03",
      icon: (
        <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      ),
      title: "Mobil Masuk Garasi",
      desc: "Tim kami memandu transfer via Auction House dengan metode donor car khusus. Mobil aman masuk garasi Anda — 100% bebas banned."
    }
  ];

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="cara-kerja" className="cara">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head section-head--center">
          <span className="tag tag--accent tag--sm">CARA KERJA</span>
          <h2 className="section-title">3 Langkah Mudah, Garasi Penuh</h2>
          <p className="section-sub">
            Dari pemesanan ke garasi dalam hitungan menit. Tanpa effort, tanpa risiko banned.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          className="cara__steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.article 
              key={index} 
              className="step"
              variants={stepVariants}
            >
              <div className="step__top">
                <span className="step__num">{step.num}</span>
                <span className="step__icon" aria-hidden="true">{step.icon}</span>
              </div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </motion.article>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
