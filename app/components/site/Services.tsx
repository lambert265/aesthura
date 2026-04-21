"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fadeUpView } from "../../lib/animations";

const services = [
  { num: "01", title: "Interior Design",       desc: "Full-scope residential and commercial interiors from concept to completion." },
  { num: "02", title: "Architectural Planning", desc: "Spatial planning, layout optimisation, and structural coordination." },
  { num: "03", title: "3D Visualization",       desc: "Photorealistic renders and walkthroughs before a single wall is touched." },
  { num: "04", title: "Author's Supervision",   desc: "On-site oversight ensuring every detail matches the design intent." },
  { num: "05", title: "Furniture & Decor",      desc: "Curated selection of furniture, textiles, lighting, and objects." },
  { num: "06", title: "Hospitality & Retail",   desc: "Brand-led environments for hotels, restaurants, and retail spaces." },
];

export default function Services({ preview = false }: { preview?: boolean }) {
  const displayed = preview ? services.slice(0, 3) : services;

  return (
    <section id="services" className="bg-ink text-fg py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* ── Header row ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-16 md:mb-20">
          <motion.div className="md:col-span-7 flex flex-col gap-5" {...fadeUpView(0)}>
            <span className="eyebrow text-fg/45">— Services</span>
            <h2 className="display-text text-fg text-[13vw] md:text-[6.5vw] leading-[0.9]">
              What we{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>do</em>
            </h2>
          </motion.div>

          <motion.div className="md:col-span-4 md:col-start-9 flex items-end" {...fadeUpView(0.15)}>
            <p className="font-body font-light text-[13px] md:text-[14px] leading-relaxed text-fg/55 max-w-[320px]">
              From the first sketch to the final fitting, we offer a complete
              range of design services — each delivered with the same rigour
              and attention to detail.
            </p>
          </motion.div>
        </div>

        {/* ── Service cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t hairline border-l hairline">
          {displayed.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              className="group relative flex flex-col justify-between min-h-[280px] p-7 md:p-8 border-b hairline border-r hairline cursor-pointer transition-colors duration-500 hover:bg-fg/[0.04]"
              {...fadeUpView(i * 0.08)}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow text-fg/35 tracking-[0.3em] text-[11px]">{num}</span>
                <ArrowUpRight
                  size={18}
                  className="text-fg/30 transition-all duration-500 group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="display-text text-fg text-3xl md:text-4xl leading-none">{title}</h3>
                <p className="font-body font-light text-[12.5px] leading-relaxed text-fg/50">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View more CTA ── */}
        {preview && (
          <motion.div className="flex justify-center mt-12" {...fadeUpView(0.3)}>
            <Link
              href="/services"
              className="group flex items-center gap-3 border hairline rounded-full px-8 py-3.5 font-body font-light text-[13px] tracking-[0.08em] text-fg/60 hover:text-fg hover:border-fg/40 transition-all duration-500"
            >
              View all services
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
