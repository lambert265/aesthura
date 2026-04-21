"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpView } from "../../lib/animations";

const fv = fadeUpView;

const stats = [
  { number: "12 yrs", label: "Practicing" },
  { number: "80+",    label: "Projects"   },
  { number: "6",      label: "Countries"  },
  { number: "24",     label: "Awards"     },
];

const values = [
  { index: "01", title: "Material Honesty",  body: "We work with materials that tell the truth — no veneers over emptiness, no ornament without purpose." },
  { index: "02", title: "Spatial Clarity",   body: "Every room should breathe. We remove until only what matters remains, then we refine what stays." },
  { index: "03", title: "Enduring Craft",    body: "Trends are noise. We design for the decade after next, building spaces that grow more beautiful with time." },
];

export default function About() {
  return (
    <main className="bg-bg text-fg min-h-screen">

      {/* ── Hero band ── */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/about us.jpg"
          alt="Studio"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(0 0% 4% / 0.35) 0%, hsl(0 0% 4% / 0.65) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-16">
          <motion.span className="eyebrow text-fg/50 mb-4" {...fv(0)}>— About the studio</motion.span>
          <motion.h1
            className="display-text text-fg text-[13vw] md:text-[7vw] leading-[0.9] max-w-[900px]"
            {...fv(0.1)}
          >
            Quiet spaces.<br />Considered craft.
          </motion.h1>
        </div>
      </section>

      {/* ── Intro two-col ── */}
      <section className="px-5 md:px-10 py-14 md:py-28 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
        <motion.div className="md:col-span-5 flex flex-col gap-6" {...fv(0)}>
          <h2 className="display-text text-fg text-[9vw] md:text-[3.4vw] leading-[0.92]">
            We design interiors that age beautifully.
          </h2>
          <div className="flex flex-col gap-0.5 pt-4">
            <span className="font-aquarium text-fg text-[22px] tracking-wide">Aesthura</span>
            <span className="eyebrow text-fg/40 text-[10px]">Interior Design Studio</span>
          </div>
        </motion.div>

        <motion.div className="md:col-span-6 md:col-start-7 flex flex-col justify-center gap-6" {...fv(0.2)}>
          <p className="font-body font-light text-[14px] md:text-[15px] leading-relaxed text-fg/70">
            Founded on the belief that great design is felt before it is seen,
            our studio approaches every project as a long-term collaboration.
            We listen carefully, move deliberately, and build spaces that carry
            meaning well beyond the moment of completion.
          </p>
          <p className="font-body font-light text-[14px] md:text-[15px] leading-relaxed text-fg/70">
            From private residences to cultural institutions, our work spans
            scales and geographies — united by a commitment to material
            honesty, spatial clarity, and enduring craft.
          </p>
        </motion.div>
      </section>

      {/* ── Stat strip ── */}
      <motion.div
        className="border-y hairline grid grid-cols-2 md:grid-cols-4 max-w-[1600px] mx-auto px-0"
        {...fv(0.1)}
      >
        {stats.map(({ number, label }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-1.5 py-7 md:py-12 px-4 md:px-10
              ${i !== 0 ? "border-l hairline" : ""}
              ${i >= 2 ? "border-t hairline md:border-t-0" : ""}
            `}
          >
            <span className="display-text text-fg text-[7vw] md:text-[3.5vw] leading-none">{number}</span>
            <span className="eyebrow text-fg/45 text-[10px]">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Values list ── */}
      <section className="px-5 md:px-10 py-14 md:py-28 max-w-[1600px] mx-auto">
        <motion.span className="eyebrow text-fg/40 block mb-12" {...fv(0)}>— Our values</motion.span>
        <div className="flex flex-col">
          {values.map(({ index, title, body }, i) => (
            <motion.div
              key={index}
              className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-8 py-6 md:py-10 border-t hairline"
              {...fv(i * 0.1)}
            >
              <span className="eyebrow text-fg/30 md:col-span-1 text-[10px]">{index}</span>
              <h3 className="display-text text-fg text-[5.5vw] md:text-[2vw] leading-none md:col-span-4">{title}</h3>
              <p className="font-body font-light text-[12px] md:text-[14px] leading-relaxed text-fg/60 md:col-span-5 md:col-start-8 mt-1 md:mt-0">{body}</p>
            </motion.div>
          ))}
          <div className="border-t hairline" />
        </div>
      </section>

    </main>
  );
}
