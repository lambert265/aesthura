import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "./components/site/Navbar";
import Footer from "./components/site/Footer";
import PageTransition from "./components/site/PageTransition";

const AiChat = dynamic(() => import("./components/site/AiChat"), { ssr: false });
const CustomCursor = dynamic(() => import("./components/site/CustomCursor"), { ssr: false });

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
  title: "Aesthura — Interior Design Studio, Nigeria",
  description: "Aesthura is a Nigerian interior design studio crafting quiet, considered interiors for residences and hospitality spaces across Port Harcourt and Lagos — with an editorial sensibility and enduring craft.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${inter.variable} ${aquarium.variable} antialiased`}>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <AiChat />
        <CustomCursor />
      </body>
    </html>
  );
}
