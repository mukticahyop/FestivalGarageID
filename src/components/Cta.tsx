"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

interface CtaProps {
  waNumber: string;
}

export default function Cta({ waNumber }: CtaProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="wa" className="cta">
      <div className="container">
        <motion.div
          className="cta__card"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="cta__pill">
            <span className="dot dot--white" aria-hidden="true"></span>
            ADMIN ONLINE · RESPON &lt; 5 MENIT
          </span>
          <h2 className="cta__title">Siap Lengkapi Garasi Impianmu?</h2>
          <p className="cta__sub">
            &ldquo;Dapatkan Mobil Langka Impianmu di Forza Horizon 6. Instan. Aman. Terpercaya.&rdquo;
          </p>
          <div className="cta__btns">
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20pesan%20mobil%20langka%20FH6`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--dark btn--lg"
              onClick={() => sendGAEvent("event", "whatsapp_click", { location: "cta_card" })}
            >
              <svg className="ic-wa" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                  d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"
                  fill="currentColor"
                />
              </svg>
              Hubungi Admin Sekarang
            </a>
            <a
              href="https://instagram.com/festivalgarage.id"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost-light btn--lg"
              onClick={() => sendGAEvent("event", "social_click", { platform: "instagram", location: "cta_card" })}
            >
              Follow di Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
