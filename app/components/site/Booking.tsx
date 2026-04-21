"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { fadeUpView } from "../../lib/animations";

const SERVICES = [
  "Interior Design",
  "Architectural Planning",
  "3D Visualization",
  "Author's Supervision",
  "Furniture & Decor",
  "Hospitality & Retail",
];

const TIMES = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

type Step = 1 | 2 | 3 | 4;

interface FormData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  message: string;
}

const empty: FormData = { service: "", date: "", time: "", name: "", email: "", message: "" };

const slide = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -32 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(empty);

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext =
    step === 1 ? !!form.service :
    step === 2 ? !!form.date && !!form.time :
    step === 3 ? !!form.name && !!form.email : true;

  async function submit() {
    // TODO: wire to API
    setStep(4);
  }

  return (
    <section id="booking" className="bg-ink text-fg py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <motion.div className="md:col-span-7 flex flex-col gap-4" {...fadeUpView(0)}>
            <span className="eyebrow text-fg/45">— Book a consultation</span>
            <h2
              className="display-text text-fg leading-[0.9]"
              style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
            >
              Let's start<br />your project
            </h2>
          </motion.div>
          <motion.div className="md:col-span-4 md:col-start-9 flex items-end" {...fadeUpView(0.15)}>
            <p className="font-body font-light text-[13px] md:text-[14px] leading-relaxed text-fg/50 max-w-[300px]">
              Three quick steps to schedule your first studio consultation.
              We'll confirm within one working day.
            </p>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          className="border hairline rounded-3xl overflow-hidden"
          {...fadeUpView(0.2)}
        >
          {/* Progress bar */}
          {step < 4 && (
            <div className="border-b hairline px-8 md:px-12 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {([1, 2, 3] as Step[]).map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-body transition-all duration-500
                      ${step > s ? "bg-fg text-ink" : step === s ? "border border-fg text-fg" : "border hairline text-fg/30"}`}>
                      {step > s ? <Check size={11} strokeWidth={2.5} /> : s}
                    </div>
                    {s < 3 && <div className={`w-8 md:w-16 h-px transition-all duration-500 ${step > s ? "bg-fg/40" : "bg-fg/10"}`} />}
                  </div>
                ))}
              </div>
              <span className="eyebrow text-fg/30 text-[10px]">Step {step} of 3</span>
            </div>
          )}

          {/* Steps */}
          <div className="px-8 md:px-12 py-10 md:py-14 min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">

              {/* Step 1 — Service */}
              {step === 1 && (
                <motion.div key="s1" {...slide} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="display-text text-fg text-2xl md:text-4xl">Choose a service</h3>
                    <p className="font-body font-light text-[12px] text-fg/45">Select the service you'd like to discuss.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {SERVICES.map((s, i) => (
                      <button
                        key={s}
                        onClick={() => set("service", s)}
                        className={`group flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition-all duration-300
                          ${form.service === s ? "border-fg/50 bg-fg/[0.07] text-fg" : "hairline text-fg/50 hover:border-fg/30 hover:text-fg"}`}
                      >
                        <span className="font-body font-light text-[13px] tracking-[0.02em]">{s}</span>
                        <span className="eyebrow text-[9px] text-fg/25 ml-3">0{i + 1}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Date & Time */}
              {step === 2 && (
                <motion.div key="s2" {...slide} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="display-text text-fg text-2xl md:text-4xl">Pick a date & time</h3>
                    <p className="font-body font-light text-[12px] text-fg/45">All consultations are 45 minutes via video call.</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="eyebrow text-fg/35 text-[10px]">Date</label>
                      <input
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => set("date", e.target.value)}
                        className="bg-transparent border hairline rounded-xl px-5 py-3.5 font-body font-light text-[13px] text-fg focus:outline-none focus:border-fg/50 transition-colors w-full md:w-64 [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="eyebrow text-fg/35 text-[10px]">Preferred time</label>
                      <div className="flex flex-wrap gap-2">
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            onClick={() => set("time", t)}
                            className={`px-4 py-2 rounded-full border font-body font-light text-[12px] transition-all duration-300
                              ${form.time === t ? "border-fg/50 bg-fg/[0.07] text-fg" : "hairline text-fg/45 hover:border-fg/30 hover:text-fg"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Contact */}
              {step === 3 && (
                <motion.div key="s3" {...slide} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="display-text text-fg text-2xl md:text-4xl">Your details</h3>
                    <p className="font-body font-light text-[12px] text-fg/45">We'll use this to confirm your consultation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[640px]">
                    {(["name", "email"] as const).map((k) => (
                      <div key={k} className="flex flex-col gap-2">
                        <label className="eyebrow text-fg/35 text-[10px]">{k === "name" ? "Full name" : "Email address"}</label>
                        <input
                          type={k === "email" ? "email" : "text"}
                          value={form[k]}
                          onChange={(e) => set(k, e.target.value)}
                          placeholder={k === "name" ? "Jane Smith" : "jane@example.com"}
                          className="bg-transparent border hairline rounded-xl px-5 py-3.5 font-body font-light text-[13px] text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/50 transition-colors"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="eyebrow text-fg/35 text-[10px]">Tell us about your project <span className="text-fg/20">(optional)</span></label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Brief description of your space, goals, or timeline…"
                        className="bg-transparent border hairline rounded-xl px-5 py-3.5 font-body font-light text-[13px] text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/50 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Confirmation */}
              {step === 4 && (
                <motion.div key="s4" {...slide} className="flex flex-col items-center justify-center gap-6 py-10 text-center">
                  <div className="w-14 h-14 rounded-full border hairline flex items-center justify-center">
                    <Check size={22} className="text-fg" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="display-text text-fg text-3xl md:text-5xl">Confirmed</h3>
                    <p className="font-body font-light text-[13px] text-fg/50 max-w-[320px]">
                      We've received your request for <span className="text-fg">{form.service}</span> on <span className="text-fg">{form.date}</span> at <span className="text-fg">{form.time}</span>. Expect a reply at <span className="text-fg">{form.email}</span> within one working day.
                    </p>
                  </div>
                  <button
                    onClick={() => { setForm(empty); setStep(1); }}
                    className="mt-2 font-body font-light text-[12px] text-fg/40 hover:text-fg transition-colors tracking-[0.06em] underline underline-offset-4"
                  >
                    Book another
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Nav buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-10 pt-8 border-t hairline">
                <button
                  onClick={() => setStep((s) => (s > 1 ? (s - 1) as Step : s))}
                  className={`flex items-center gap-2 font-body font-light text-[12px] tracking-[0.06em] text-fg/40 hover:text-fg transition-colors ${step === 1 ? "invisible" : ""}`}
                >
                  <ArrowLeft size={13} strokeWidth={1.5} /> Back
                </button>

                {step < 3 ? (
                  <button
                    disabled={!canNext}
                    onClick={() => setStep((s) => (s + 1) as Step)}
                    className="group flex items-center gap-2 border hairline rounded-full px-7 py-3 font-body font-light text-[12px] tracking-[0.08em] text-fg/60 hover:text-fg hover:border-fg/40 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                ) : (
                  <button
                    disabled={!canNext}
                    onClick={submit}
                    className="group flex items-center gap-2 bg-fg text-ink rounded-full px-7 py-3 font-body font-light text-[12px] tracking-[0.08em] hover:bg-fg/90 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    Request consultation
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
