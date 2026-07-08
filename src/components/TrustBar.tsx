"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export default function TrustBar() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      className="trust"
      aria-label="Angka kepercayaan"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container trust__inner">
        
        {/* Metric 1 */}
        <motion.div className="trust__item" variants={itemVariants}>
          <div className="trust__num">
            100<span className="trust__suffix">+</span>
          </div>
          <div className="trust__label">TRANSAKSI SUKSES</div>
        </motion.div>
        
        <div className="trust__divider" aria-hidden="true"></div>
        
        {/* Metric 2 */}
        <motion.div className="trust__item" variants={itemVariants}>
          <div className="trust__num">
            &lt; 5<span className="trust__suffix">MIN</span>
          </div>
          <div className="trust__label">RESPON ADMIN</div>
        </motion.div>
        
        <div className="trust__divider" aria-hidden="true"></div>
        
        {/* Metric 3 */}
        <motion.div className="trust__item" variants={itemVariants}>
          <div className="trust__num">
            5.0<span className="trust__suffix">★</span>
          </div>
          <div className="trust__label">RATING PELANGGAN</div>
        </motion.div>
        
      </div>
    </motion.section>
  );
}
