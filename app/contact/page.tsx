"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { fadeUpView } from "../lib/animations";

const fv = fadeUpView;

const ENQUIRY_TYPES = ["General enquiry", "New project", "Collaboration", "Press & media", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ type: "", name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit = !!form.name && !!form.email && !!form.message;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to API
    setSent(true);
  }

  return (
    <main className="bg-bg text-fg min-h-screen">

      {/* ── Hero band ── */}
      <section className="pt-36 md:pt-48 pb-16 md:pb-24 px-5 md:px-10 max-w-[1600px] mx-auto">
        <motion.span className="eyebrow text-fg/45 block mb-6" {...fv(0)}>— Contact</motion.span>
        <motion.h1
          className="display-text text-fg leading-[0.9]"
          style={{ fontSize: "clamp(52px, 9vw, 140px)" }}
          {...fv(0.08)}
        >
          Let's talk<br />about your<br />space
        </motion.h1>
      </section>

      {/* ── Main grid ── */}
      <section className="px-5 md:px-10 pb-24 md:pb-36 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

        {/* Form */}
        <motion.div className="md:col-span-7" {...fv(0.1)}>
          {sent ? (
            <div className="flex flex-col gap-5 py-16 items-start">
              <div className="w-12 h-12 rounded-full border hairline flex items-center justify-center">
                <Check size={18} strokeWidth={1.5} />
              </div>
              <h2 className="display-text text-fg text-4xl md:text-6xl">Message sent</h2>
              <p className="font-body font-light text-[13px] text-fg/50 max-w-[320px] leading-relaxed">
                Thanks, <span className="text-fg">{form.name}</span>. We'll be in touch at <span className="text-fg">{form.email}</span> within one working day.
              </p>
              <button
                onClick={() => { setForm({ type: "", name: "", email: "", message: "" }); setSent(false); }}
                className="mt-2 font-body font-light text-[12px] text-fg/40 hover:text-fg transition-colors tracking-[0.06em] underline underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-8">

              {/* Enquiry type */}
              <div className="flex flex-col gap-3">
                <label className="eyebrow text-fg/35 text-[10px]">Enquiry type</label>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => set("type", t)}
                      className={`px-4 py-2 rounded-full border font-body font-light text-[12px] transition-all duration-300
                        ${form.type === t ? "border-fg/50 bg-fg/[0.07] text-fg" : "hairline text-fg/45 hover:border-fg/30 hover:text-fg"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["name", "email"] as const).map((k) => (
                  <div key={k} className="flex flex-col gap-2">
                    <label className="eyebrow text-fg/35 text-[10px]">{k === "name" ? "Full name" : "Email address"}</label>
                    <input
                      type={k === "email" ? "email" : "text"}
                      required
                      value={form[k]}
                      onChange={(e) => set(k, e.target.value)}
                      placeholder={k === "name" ? "Jane Smith" : "jane@example.com"}
                      className="bg-transparent border hairline rounded-xl px-5 py-3.5 font-body font-light text-[13px] text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/50 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="eyebrow text-fg/35 text-[10px]">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell us about your project, space, or question…"
                  className="bg-transparent border hairline rounded-xl px-5 py-3.5 font-body font-light text-[13px] text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/50 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t hairline">
                <span className="font-body font-light text-[11px] text-fg/30">We reply within one working day.</span>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group flex items-center gap-2 bg-fg text-ink rounded-full px-7 py-3 font-body font-light text-[12px] tracking-[0.08em] hover:bg-fg/90 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  Send message
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </form>
          )}
        </motion.div>

        {/* Studio info */}
        <motion.div className="md:col-span-4 md:col-start-9 flex flex-col gap-10 md:pt-2" {...fv(0.2)}>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-fg/30 text-[10px]">Email</span>
            <a href="mailto:hello@aesthura.studio"
              className="nav-link font-body font-light text-[14px] text-fg/65 hover:text-fg transition-colors duration-300">
              hello@aesthura.studio
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-fg/30 text-[10px]">Studios</span>
            <div className="flex flex-col gap-1 font-body font-light text-[14px] text-fg/65">
              <span>Port Harcourt, Nigeria</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-fg/30 text-[10px]">Hours</span>
            <div className="flex flex-col gap-1 font-body font-light text-[14px] text-fg/65">
              <span>Mon – Fri, 09:00 – 18:00</span>
              <span>WAT (West Africa Time)</span>
            </div>
          </div>

          <div className="border-t hairline pt-8">
            <a
              href="/#booking"
              className="group flex items-center justify-between border hairline rounded-2xl px-6 py-5 hover:border-fg/40 transition-all duration-300"
            >
              <div className="flex flex-col gap-1">
                <span className="eyebrow text-fg/35 text-[10px]">Ready to start?</span>
                <span className="font-body font-light text-[13px] text-fg/70 group-hover:text-fg transition-colors">Book a consultation</span>
              </div>
              <ArrowUpRight size={16} className="text-fg/30 transition-all duration-300 group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </motion.div>

      </section>

    </main>
  );
}
