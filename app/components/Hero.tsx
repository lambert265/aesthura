"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "../lib/animations";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col">

      {/* Background — scale 1.12 → 1 */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE.elegant }}
      >
        <Image src="/hero.jpg" alt="Interior" fill priority className="object-cover object-center" />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, hsl(0 0% 4% / 0.52) 0%, hsl(0 0% 4% / 0.12) 45%, hsl(0 0% 4% / 0.62) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between flex-1 px-5 md:px-10 pt-28 md:pt-40 pb-10 md:pb-16">

        {/* Headline */}
        <motion.div
          className="display-text text-fg leading-[0.92]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE.elegant }}
        >
          {/* Mobile: simple stack */}
          <div className="md:hidden text-[11.5vw]">
            <div>Aesthetics</div>
            <div>in every</div>
            <div>detail: your</div>
            <div>ideal</div>
            <div className="text-right">interior</div>
          </div>
          {/* Desktop: spaced layout */}
          <div className="hidden md:block text-[8.4vw]">
            <div>Aesthetics in every</div>
            <div className="flex items-baseline">
              <span>detail:</span>
              <span className="inline-block w-[18vw]" aria-hidden="true" />
              <span>your</span>
              <span className="flex-1" aria-hidden="true" />
              <span>ideal</span>
            </div>
            <div className="text-right">interior</div>
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-8 md:mt-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-0">

          {/* Paragraphs */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-x-6 md:gap-x-8 max-w-[480px]">
            <motion.p
              className="font-body font-light text-[12px] md:text-[14px] leading-relaxed text-fg/80 max-w-[220px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE.elegant }}
            >
              Creating a space where dreams and comfort are realized as an art
              that we have mastered down to the last detail.
            </motion.p>

            <motion.p
              className="font-body font-light text-[12px] md:text-[14px] leading-relaxed text-fg/65 max-w-[220px] md:pt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE.elegant }}
            >
              Trust us to transform your home into a source of inspiration and comfort.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            className="flex-shrink-0 flex items-center justify-center self-start md:self-auto w-36 h-36 md:w-52 md:h-52 rounded-full border border-fg/50 hover:border-fg font-body font-light text-fg text-[11px] md:text-[13px] tracking-[0.06em] text-center transition-[border-color,background] duration-500 hover:bg-fg/10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.95, ease: EASE.elegant }}
          >
            Get in touch
          </motion.a>
        </div>
      </div>
    </section>
  );
}
