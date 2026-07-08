import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Jual Mobil Langka Forza Horizon 6 — Aman & Terpercaya | Festival Garage ID",
  description: "Diler virtual mobil langka Forza Horizon 6 #1 di Indonesia. Beli mobil unicorn, ultra-rare, Festival Playlist exclusive. Aman via Auction House, dipandu tim berpengalaman. Instan. Aman. Terpercaya.",
  keywords: ["mobil langka FH6", "beli mobil Forza Horizon 6", "jasa transfer FH6", "jual mobil Forza", "Festival Playlist FH6", "unicorn car FH6", "donor car FH6", "Forza Horizon 6 Japan", "FH6 Tokyo"],
  authors: [{ name: "Festival Garage ID" }],
  openGraph: {
    type: "website",
    title: "Festival Garage ID — Diler Mobil Langka Forza Horizon 6",
    description: "Dapatkan Mobil Langka Impianmu di Forza Horizon 6 Japan. Instan. Aman. Terpercaya.",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festival Garage ID — Diler Mobil Langka FH6",
    description: "Dapatkan Mobil Langka Impianmu di Forza Horizon 6 Japan. Instan. Aman. Terpercaya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={outfit.variable}>
      <head>
        {/* Favicon (inline SVG) */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23FF2E93'/%3E%3Cpath d='M 32 22 L 90 22 L 80 36 L 22 36 Z' fill='white'/%3E%3Cpath d='M 22 44 L 68 44 L 58 58 L 12 58 Z' fill='white'/%3E%3Cpath d='M 8 66 L 40 66 L 28 82 L -4 82 Z' fill='white'/%3E%3C/svg%3E" />
      </head>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
