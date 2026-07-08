"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

interface HeroProps {
  waNumber: string;
}

export default function Hero({ waNumber }: HeroProps) {
  const words = ["Tanpa Grinding.", "Proses Cepat.", "100% Aman."];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToKatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("katalog");
    if (target) {
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height || 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  const visualVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="hero__glow-2" aria-hidden="true"></div>
      <div className="hero__watermark" aria-hidden="true">ホライゾン</div>
      <div className="container hero__inner">

        {/* Left Side Content */}
        <motion.div
          className="hero__left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="tag tag--accent" variants={itemVariants}>
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px", display: "inline-block", verticalAlign: "middle" }}>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            <span style={{ verticalAlign: "middle" }}>FORZA HORIZON 6 · TOKYO DRIVE & RARE CARS</span>
          </motion.span>

          <motion.h1 className="hero__title" variants={itemVariants}>
            Mobil Langka FH6<br />
            Masuk Garasi<br />
            <span style={{ display: "block", position: "relative", width: "100%", height: "1.4em", verticalAlign: "top" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="hero__title--accent"
                  style={{ position: "absolute", left: 0, right: 0, textAlign: "inherit", paddingBottom: "10px", lineHeight: "1.2" }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p className="hero__sub" variants={itemVariants}>
            Festival Garage ID — diler virtual terpercaya untuk mobil{" "}
            <strong>unicorn</strong>, <strong>ultra-rare</strong>, &amp;{" "}
            Festival Playlist exclusive di peta Jepang <strong>Forza Horizon 6</strong>.
            Transfer aman via Auction House, dipandu penuh oleh tim berpengalaman.
          </motion.p>

          <motion.div className="hero__ctas" variants={itemVariants}>
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20pesan%20mobil%20langka%20FH6`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
              onClick={() => sendGAEvent("event", "whatsapp_click", { location: "hero_cta" })}
            >
              <svg className="ic-wa" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"
                  fill="currentColor"
                />
              </svg>
              Chat WhatsApp Sekarang
            </a>
            <a href="#katalog" className="btn btn--ghost btn--lg" onClick={handleScrollToKatalog}>
              Lihat Katalog
              <span className="arrow">→</span>
            </a>
          </motion.div>

          <motion.div className="hero__tagline" variants={itemVariants}>
            <span className="hero__taglineBar" aria-hidden="true"></span>
            <span>INSTAN &nbsp;·&nbsp; AMAN &nbsp;·&nbsp; TERPERCAYA</span>
          </motion.div>
        </motion.div>

        {/* Right Side Visual Preview */}
        <motion.div
          className="hero__right"
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero__visual">
            <div className="hero__badge">
              <span className="dot dot--accent" aria-hidden="true"></span>
              LIVE PREVIEW
            </div>
            <img
              src="/assets/hero-fh5.webp"
              alt="Live FH6 Japan Preview — Festival Garage ID"
              className="hero__img"
              loading="eager"
              onError={(e) => {
                // If original FH5 hero visual doesn't exist, we can fallback gracefully
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%230A0A10'/%3E%3Cpath d='M150 150 L650 450' stroke='rgba(255,46,147,0.1)' stroke-width='4'/%3E%3Cpath d='M650 150 L150 450' stroke='rgba(139,44,255,0.1)' stroke-width='4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Outfit, sans-serif' font-size='24' font-weight='800' letter-spacing='2'%3EFORZA HORIZON 6 JAPAN%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="hero__visual-glow" aria-hidden="true"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
