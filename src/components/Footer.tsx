"use client";

import React from "react";
import { sendGAEvent } from "@next/third-parties/google";

interface FooterProps {
  waNumber: string;
}

export default function Footer({ waNumber }: FooterProps) {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height || 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            
            {/* Brand column */}
            <div className="footer__brand">
              <a href="#hero" className="logo" onClick={(e) => handleScrollToSection(e, "hero")}>
                <span className="logo__mark">
                  <svg viewBox="0 0 100 100" width="24" height="24">
                    <path d="M 32 22 L 90 22 L 80 36 L 22 36 Z" fill="white" />
                    <path d="M 22 44 L 68 44 L 58 58 L 12 58 Z" fill="white" />
                    <path d="M 8 66 L 40 66 L 28 82 L -4 82 Z" fill="white" />
                  </svg>
                </span>
                <span className="logo__text">
                  <span className="logo__name">Festival Garage</span>
                  <span className="logo__suffix">ID</span>
                </span>
              </a>
              <p className="footer__tagline">
                Diler virtual mobil langka Forza Horizon 6 #1 di Indonesia. Hemat waktumu — biarkan kami yang grinding.
              </p>
              <div className="footer__socials">
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  onClick={() => sendGAEvent("event", "whatsapp_click", { location: "footer_socials" })}
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/festivalgarage.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  onClick={() => sendGAEvent("event", "social_click", { platform: "instagram", location: "footer_socials" })}
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@festivalgarage.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  onClick={() => sendGAEvent("event", "social_click", { platform: "tiktok", location: "footer_socials" })}
                >
                  TikTok
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer__col">
              <h4>TOKO</h4>
              <ul>
                <li>
                  <a href="#hero" onClick={(e) => handleScrollToSection(e, "hero")}>
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#katalog" onClick={(e) => handleScrollToSection(e, "katalog")}>
                    Katalog
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" onClick={(e) => handleScrollToSection(e, "cara-kerja")}>
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => handleScrollToSection(e, "faq")}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4>KONTAK</h4>
              <ul>
                <li>WhatsApp: +62 821-9890-1253</li>
                <li>Instagram: @festivalgarage.id</li>
                <li>TikTok: @festivalgarage.id</li>
              </ul>
            </div>

            {/* Operational */}
            <div className="footer__col">
              <h4>OPERASIONAL</h4>
              <ul>
                <li>Setiap Hari</li>
                <li>09.00 — 23.00 WIB</li>
                <li>Respon &lt; 5 menit</li>
                <li>Yogyakarta, ID</li>
              </ul>
            </div>
            
          </div>

          <hr className="footer__divider" />

          <div className="footer__bottom">
            <span>© {currentYear} Festival Garage ID. All rights reserved.</span>
            <span className="footer__disclaimer">
              Tidak berafiliasi dengan Microsoft / Playground Games / Forza Horizon 6.
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20pesan%20mobil%20langka%20FH6`}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-wa"
        aria-label="Chat WhatsApp"
        onClick={() => sendGAEvent("event", "whatsapp_click", { location: "floating_action_button" })}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path
            d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"
            fill="currentColor"
          />
        </svg>
      </a>
    </>
  );
}
