"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

interface HeaderProps {
  waNumber: string;
}

export default function Header({ waNumber }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      const sections = ["hero", "katalog", "cara-kerja", "faq"];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height || 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Beranda", id: "hero" },
    { name: "Katalog", id: "katalog" },
    { name: "Cara Kerja", id: "cara-kerja" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <header className={`nav ${isOpen ? "nav--open" : ""}`}>
      <div className="container nav__inner">
        {/* LOGO */}
        <a href="#hero" className="logo" aria-label="Festival Garage ID — Beranda" onClick={(e) => handleLinkClick(e, "hero")}>
          <span className="logo__mark" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="28" height="28">
              <path d="M 32 22 L 90 22 L 80 36 L 22 36 Z" fill="white" />
              <path d="M 22 44 L 68 44 L 58 58 L 12 58 Z" fill="white" />
              <path d="M 8 66 L 40 66 L 28 82 L -4 82 Z" fill="white" />
            </svg>
          </span>
          <span className="logo__text">
            <span className="logo__name">Festival Garage</span>
            <span className="logo__suffix">ID · Rare Car Dealer</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="nav__links" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${activeSection === link.id ? "nav__link--active" : ""}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNavUnderline"
                  className="nav__link-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, var(--accent), var(--accent-secondary))",
                    borderRadius: "999px"
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* WHATSAPP CTA */}
        <a
          href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20pesan%20mobil%20langka%20FH6`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary nav__cta"
          onClick={() => sendGAEvent("event", "whatsapp_click", { location: "header_desktop" })}
        >
          <svg className="ic-wa" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"
              fill="currentColor"
            />
          </svg>
          Chat WhatsApp
        </a>

        {/* MOBILE TOGGLE */}
        <button
          className="nav__toggle"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen ? "true" : "false"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {/* MOBILE NAV MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="nav__links--mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav__link ${activeSection === link.id ? "nav__link--active" : ""}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20pesan%20mobil%20langka%20FH6`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                style={{ justifyContent: "center", marginTop: "8px" }}
                onClick={() => sendGAEvent("event", "whatsapp_click", { location: "header_mobile" })}
              >
                <svg className="ic-wa" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"
                    fill="currentColor"
                  />
                </svg>
                Chat WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
