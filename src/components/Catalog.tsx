"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

interface Car {
  id: number;
  name: string;
  year: string;
  tag: "SEASONAL" | "RARE" | "UNICORN" | "TUNER";
  status: "LIMITED" | "READY";
  price: string;
  img: string;
  desc: string;
}

interface CatalogProps {
  waNumber: string;
}

export default function Catalog({ waNumber }: CatalogProps) {
  const [filter, setFilter] = useState<"ALL" | "LIMITED" | "READY">("ALL");

  const cars: Car[] = [
    {
      id: 1,
      name: "Toyota GR86",
      year: "2022 · STREET RIVAL",
      tag: "TUNER",
      status: "READY",
      price: "Rp 10.000",
      img: "/assets/1-toyota-gr86.png",
      desc: "Toyota GR86 (2022)"
    },
    {
      id: 2,
      name: "Toyota Camry TRD",
      year: "2023 · TRD SPORTED",
      tag: "RARE",
      status: "READY",
      price: "Rp 10.000",
      img: "/assets/2-toyota-camry-trd.png",
      desc: "Toyota Camry TRD (2023)"
    },
    {
      id: 3,
      name: "Nissan Z Nismo",
      year: "2024 · NISMO S-TUNE",
      tag: "UNICORN",
      status: "LIMITED",
      price: "Rp 15.000",
      img: "/assets/3-nissan-z-nismo.png",
      desc: "Nissan Z Nismo (2024)"
    },
    {
      id: 4,
      name: "Porsche 911 GT3 RS",
      year: "2024 · FESTIVAL EXCLUSIVE",
      tag: "SEASONAL",
      status: "LIMITED",
      price: "Rp 15.000",
      img: "/assets/4-porsche-gt3rs.png",
      desc: "Porsche 911 GT3 RS (2024)"
    }
  ];

  const filteredCars = cars.filter(car => {
    if (filter === "ALL") return true;
    return car.status === filter;
  });

  const getWaLink = (carName: string) => {
    const message = `Halo Festival Garage ID, saya tertarik dengan *${carName}* di Forza Horizon 6. Apakah masih ready stock?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };


  return (
    <section id="katalog" className="katalog">
      <div className="container">
        
        {/* Catalog Header */}
        <div className="section-head katalog__head">
          <div>
            <span className="tag tag--accent tag--sm">UPDATE MINGGUAN FH6</span>
            <h2 className="section-title">Katalog Ready Stock</h2>
            <p className="section-sub">
              Mobil langka FH6 yang siap kirim hari ini. Stok diperbarui secara realtime mengikuti rotasi Festival Playlist FH6 Jepang.
            </p>
          </div>
          
          {/* Filtering buttons */}
          <div className="filter-tabs">
            {(["ALL", "READY", "LIMITED"] as const).map((status) => {
              const isActive = filter === status;
              return (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    sendGAEvent("event", "catalog_filter", { filter_type: status });
                  }}
                  className={`filter-tab-btn ${isActive ? "filter-tab-btn--active" : ""}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="filter-tab-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{ position: "absolute", inset: 0 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {status === "ALL" ? "Semua" : status === "READY" ? "Ready" : "Limited"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="katalog__grid">
          {filteredCars.map((car) => (
            <motion.article 
              key={car.id} 
              className="car-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="car-card__img">
                <img 
                  src={car.img} 
                  alt={car.name} 
                  loading="lazy" 
                  onError={(e) => {
                    // Fallback SVG image in case the file doesn't exist
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%2312121E'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23FF2E93' font-family='Outfit, sans-serif' font-size='14' font-weight='800'%3E${car.name}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <span className="car-card__tag">{car.tag}</span>
                <span className={`car-card__status`}>
                  <span className={`dot ${car.status === "LIMITED" ? "dot--accent" : "dot--green"}`}></span>
                  {car.status}
                </span>
              </div>
              
              <div className="car-card__info">
                <div className="car-card__year">{car.year}</div>
                <h3 className="car-card__name">{car.name}</h3>
                
                <div className="car-card__bottom">
                  <div>
                    <div className="car-card__pricelabel">MULAI DARI</div>
                    <div className="car-card__price">{car.price}</div>
                  </div>
                  <a 
                    href={getWaLink(car.desc)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--primary btn--sm"
                    onClick={() => sendGAEvent("event", "whatsapp_click", { location: "catalog_item", car_name: car.name })}
                  >
                    Pesan <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Footnote catalog link */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href={`https://wa.me/${waNumber}?text=Halo%20Festival%20Garage%20ID%2C%20saya%20mau%20tanya%20katalog%20mobil%20lainnya%20di%20FH6`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
            style={{ margin: "0 auto" }}
            onClick={() => sendGAEvent("event", "whatsapp_click", { location: "catalog_view_all" })}
          >
            Lihat Semua Katalog di WhatsApp <span className="arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
