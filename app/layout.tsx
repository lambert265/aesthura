import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/site/Navbar";
import Footer from "./components/site/Footer";
import AiChat from "./components/site/AiChat";

const aquarium = localFont({
  src: "./fonts/AQUARIUM.ttf",
  variable: "--font-aquarium",
  weight: "400",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["300", "400", "500"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesthura — Editorial Interior Design Studio",
  description: "Aesthura is a design studio crafting quiet, considered interiors for residences and hospitality spaces — with an editorial sensibility and enduring craft.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${inter.variable} ${aquarium.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <AiChat />
      </body>
    </html>
  );
}
