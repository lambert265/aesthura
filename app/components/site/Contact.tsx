"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUpView } from "../../lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="bg-bg text-fg py-20 md:py-36">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

          {/* Left */}
          <div className="md:col-span-8 flex flex-col gap-8 md:gap-10">
            <motion.div className="flex flex-col gap-4 md:gap-5" {...fadeUpView(0)}>
              <span className="eyebrow text-fg/45">— Let's build something</span>
              <h2
                className="display-text text-fg leading-[0.88]"
                style={{ fontSize: "clamp(52px, 8vw, 130px)" }}
              >
                Have a<br />project?
              </h2>
              <p className="font-body font-light text-[13px] md:text-[15px] leading-relaxed text-fg/60 max-w-[400px]">
                Tell us about your space, your vision, and your timeline.
                We'll get back to you within one working day.
              </p>
            </motion.div>

            {/* Info grid */}
            <motion.div
              className="grid grid-cols-2 gap-x-6 gap-y-5 border-t hairline pt-6 md:pt-8 max-w-[420px]"
              {...fadeUpView(0.2)}
            >
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-fg/35 text-[10px]">Email</span>
                <a
                  href="mailto:mienye488@gmail.com"
                  className="nav-link font-body font-light text-[12px] md:text-[14px] text-fg/70 hover:text-fg transition-colors duration-300 break-all"
                >
                  mienye488@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-fg/35 text-[10px]">Studio</span>
                <span className="font-body font-light text-[12px] md:text-[14px] text-fg/70">
                  Port Harcourt
                </span>
              </div>
            </motion.div>
          </div>

          {/* Circular CTA */}
          <motion.div
            className="md:col-span-4 flex justify-center"
            {...fadeUpView(0.25)}
          >
            <a
              href="mailto:mienye488@gmail.com"
              className="group relative flex items-center justify-center rounded-full bg-fg overflow-hidden flex-shrink-0"
              style={{ width: "clamp(180px, 30vw, 288px)", height: "clamp(180px, 30vw, 288px)" }}
            >
              <div
                className="absolute inset-4 rounded-full border border-ink/10"
                style={{ animation: "rotate-slow 24s linear infinite" }}
              />
              <div
                className="absolute inset-8 rounded-full border border-dashed border-ink/10"
                style={{ animation: "rotate-slow 24s linear infinite reverse" }}
              />
              <ArrowUpRight
                size={16}
                className="absolute top-5 right-5 text-ink/40 transition-all duration-300 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="display-text text-ink text-xl md:text-3xl leading-none text-center px-6 z-10">
                Start a<br />project
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
