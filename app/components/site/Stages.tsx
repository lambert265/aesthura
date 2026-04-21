"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUpView } from "../../lib/animations";

const stages = [
  { num: "01", title: "Briefing",       desc: "We meet, listen, and ask the right questions. Understanding your life, habits, and aspirations is the foundation of everything that follows." },
  { num: "02", title: "Concept",        desc: "Mood boards, spatial sketches, and material palettes — a visual language for the project that we refine together until it feels exactly right." },
  { num: "03", title: "Design",         desc: "Full technical drawings, 3D visualisations, and detailed specifications. Every surface, fixture, and fitting resolved before work begins." },
  { num: "04", title: "Documentation",  desc: "A complete set of construction documents and tender packages handed to contractors — precise, unambiguous, and buildable." },
  { num: "05", title: "Supervision",    desc: "We visit site regularly, review progress, and resolve issues in real time. The design intent is protected from first fix to final coat." },
  { num: "06", title: "Handover",       desc: "A final walkthrough, a curated handover pack, and an open door. We consider a project complete only when you feel completely at home." },
];

export default function Stages() {
  return (
    <section id="stages" className="bg-ink text-fg py-16 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 mb-10 md:mb-20">
          <motion.div className="md:col-span-6 flex flex-col gap-5" {...fadeUpView(0)}>
            <span className="eyebrow text-fg/45">— Process</span>
            <h2 className="display-text text-fg text-[12vw] md:text-[6vw] leading-[0.9]">
              Stages of{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, textTransform: "none" }}>
                works
              </em>
            </h2>
          </motion.div>

          <motion.div className="md:col-span-4 md:col-start-9 flex items-end" {...fadeUpView(0.15)}>
            <p className="font-body font-light text-[13px] md:text-[14px] leading-relaxed text-fg/55 max-w-[320px]">
              A clear, six-step process designed to keep you informed and
              confident at every stage — from the first conversation to the
              moment you walk through the door.
            </p>
          </motion.div>
        </div>

        {/* ── Stage rows ── */}
        <div className="flex flex-col border-t hairline">
          {stages.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              className="group flex flex-col md:grid md:grid-cols-12 gap-1 md:gap-6 py-5 md:py-9 border-b hairline transition-colors duration-500 hover:bg-fg/[0.03]"
              {...fadeUpView(i * 0.07)}
            >
              <span className="eyebrow text-fg/30 text-[10px] tracking-[0.25em] md:col-span-1 md:pt-1">
                {num}
              </span>

              <h3 className="display-text text-fg text-[7vw] md:text-4xl leading-none transition-colors duration-300 group-hover:text-fg/80 md:col-span-4">
                {title}
              </h3>

              <p className="hidden md:block md:col-span-6 md:col-start-7 font-body font-light text-[13px] md:text-[14px] leading-relaxed text-fg/65 max-w-lg">
                {desc}
              </p>
              <p className="md:hidden font-body font-light text-[12px] leading-relaxed text-fg/50 mt-0.5">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
