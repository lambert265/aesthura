"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "../lib/animations";

const FADE_DURATION = 1.2; // seconds before end to start fade-out

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_DURATION && !fading) {
        setFading(true);
      }
    };

    const onSeeked = () => {
      // after loop restarts, fade back in
      if (video.currentTime < 0.5) {
        setFading(false);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("play", () => setFading(false));

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [fading]);

  return (
    <section className="relative w-full min-h-screen flex flex-col">

      {/* Background video — scale 1.12 → 1 */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE.elegant }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION}s ease`,
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero.webm" type="video/webm" />
        </video>

        {/* Static poster shown during fade — prevents black flash */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')", zIndex: -1 }}
        />
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
          <div className="md:hidden text-[11.5vw]">
            <div>Aesthetics</div>
            <div>in every</div>
            <div>detail: your</div>
            <div>ideal</div>
            <div className="text-right">interior</div>
          </div>
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

          {/* Right side — card + CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end gap-4">

            {/* Studio card */}
            <motion.div
              className="relative w-full sm:w-[220px] md:w-[260px] rounded-2xl overflow-hidden border border-fg/15 bg-ink/60 backdrop-blur-md"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 1.0, ease: EASE.elegant }}
            >
              {/* Image slot */}
              <div className="relative w-full h-[110px] md:h-[130px] overflow-hidden">
                <Image
                  src="/project-1.jpg"
                  alt="Aesthura interior"
                  fill
                  priority
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.5) 100%)" }} />
              </div>
              {/* Card body */}
              <div className="px-4 py-4 flex flex-col gap-2">
                <span className="eyebrow text-fg/35 text-[9px]">— Our philosophy</span>
                <p className="font-body font-light text-[12px] md:text-[13px] leading-relaxed text-fg/80">
                  We don’t just design interiors — we craft spaces that shape how you feel, live, and belong.
                </p>
                <a href="/about" className="mt-1 font-body font-light text-[10px] tracking-[0.08em] text-fg/40 hover:text-fg transition-colors underline underline-offset-2">
                  About the studio
                </a>
              </div>
            </motion.div>

            {/* CTA circle */}
            <motion.a
              href="/contact"
              className="group flex-shrink-0 flex flex-col items-center justify-center self-start md:self-auto w-36 h-36 md:w-44 md:h-44 rounded-full border border-fg/50 hover:border-fg hover:bg-fg/10 transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.95, ease: EASE.elegant }}
            >
              {/* rotating ring */}
              <span className="absolute inset-3 rounded-full border border-dashed border-fg/20 group-hover:border-fg/40 transition-colors duration-500" style={{ animation: "rotate-slow 18s linear infinite" }} />
              <span className="font-aquarium text-fg text-[13px] md:text-[15px] tracking-[0.15em] z-10">Get</span>
              <span className="font-aquarium text-fg text-[13px] md:text-[15px] tracking-[0.15em] z-10">in touch</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
