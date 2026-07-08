"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs: FaqItem[] = [
    {
      question: "Aman tidak? Akun saya tidak akan kena banned?",
      answer: "Aman. Kami menggunakan metode transfer via Auction House dengan donor car & timing khusus yang sudah teruji 100+ transaksi tanpa kasus banned di Forza Horizon 5, dan kami terus menyempurnakan teknik kami menyesuaikan sistem keamanan terupdate dari Forza Horizon 6."
    },
    {
      question: "Berapa lama prosesnya?",
      answer: "Setelah pembayaran dikonfirmasi oleh admin, proses transfer mobil di dalam game memakan waktu sekitar 5–15 menit saja, tergantung antrean diler."
    },
    {
      question: "Bayar pakai apa?",
      answer: "Kami menerima berbagai opsi pembayaran digital: E-wallet (OVO, DANA, GoPay, ShopeePay) serta Transfer Bank Utama (BCA, Mandiri, BNI, BRI). Cukup kirim tangkapan layar (screenshot) bukti pembayaran ke admin."
    },
    {
      question: "Jam operasional toko?",
      answer: "Setiap hari mulai pukul 09.00 – 23.00 WIB. Pemesanan atau pertanyaan di luar jam tersebut tetap akan ditanggapi sesegera mungkin pada jam operasional berikutnya."
    },
    {
      question: "Mobil yang saya cari tidak ada di katalog. Bagaimana?",
      answer: "Cukup hubungi admin via WhatsApp — kami menerima pre-order (request) untuk mobil langka apa pun di Forza Horizon 6. Admin akan mengecek ketersediaan donor dan menginformasikan estimasi harga serta waktunya."
    }
  ];

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      sendGAEvent("event", "faq_open", { faq_question: faqs[index].question });
    }
  };

  return (
    <section id="faq" className="faq">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head section-head--center">
          <span className="tag tag--accent tag--sm">FAQ</span>
          <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="section-sub">
            Hal-hal yang paling sering ditanyakan pelanggan kami seputar diler virtual FH6.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article 
                key={index} 
                className={`faq__item ${isOpen ? "faq__item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq__trigger"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen ? "true" : "false"}
                >
                  <span>{faq.question}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="faq__answer">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
