"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp, ArrowUpRight, MessageCircle, Trash2 } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "Book a consultation",
  "Tell me about the studio",
  "How does pricing work?",
  "View your projects",
];

const WELCOME = "Hello — I'm Aesthura's studio assistant.\n\nI can help you explore our services, navigate the site, or get you started with a consultation.\n\nWhat can I help you with?";

function renderContent(text: string) {
  const segments: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, match, idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      segments.push(...text.slice(last, match.index).split("\n").flatMap((line, i, arr) =>
        i < arr.length - 1 ? [<span key={idx++}>{line}</span>, <br key={idx++} />] : [<span key={idx++}>{line}</span>]
      ));
    }
    const isExternal = match[2].startsWith("http");
    segments.push(
      isExternal ? (
        <a key={idx++} href={match[2]} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:opacity-70 transition-opacity">
          {match[1]}<ArrowUpRight size={10} className="inline" />
        </a>
      ) : (
        <Link key={idx++} href={match[2]}
          className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:opacity-70 transition-opacity">
          {match[1]}<ArrowUpRight size={10} className="inline" />
        </Link>
      )
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    segments.push(...text.slice(last).split("\n").flatMap((line, i, arr) =>
      i < arr.length - 1 ? [<span key={idx++}>{line}</span>, <br key={idx++} />] : [<span key={idx++}>{line}</span>]
    ));
  }
  return segments;
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [{ role: "assistant", content: WELCOME }];
    try {
      const saved = localStorage.getItem("aesthura-chat");
      return saved ? JSON.parse(saved) : [{ role: "assistant", content: WELCOME }];
    } catch { return [{ role: "assistant", content: WELCOME }]; }
  });
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // persist to localStorage
  useEffect(() => {
    if (messages.length > 0) localStorage.setItem("aesthura-chat", JSON.stringify(messages));
  }, [messages]);

  function clearChat() {
    localStorage.removeItem("aesthura-chat");
    setMessages([{ role: "assistant", content: WELCOME }]);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  // auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok || !res.body) throw new Error("Bad response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: full }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: "Something went wrong. Please try again or email [mienye488@gmail.com](mailto:mienye488@gmail.com)." }]);
    } finally {
      setStreaming(false);
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open studio assistant"
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-[100px] right-5 md:bottom-8 md:right-8 z-50 group"
      >
        <div className="relative w-14 h-14 rounded-full bg-fg flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle size={18} strokeWidth={1.5} className="text-ink" />
              </motion.span>
            ) : (
              <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle size={18} strokeWidth={1.5} className="text-ink" />
              </motion.span>
            )}
          </AnimatePresence>
          {/* pulse ring */}
          {!open && <span className="absolute inset-0 rounded-full bg-fg/30 animate-ping" style={{ animationDuration: "2.5s" }} />}
        </div>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.4 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink border hairline rounded-full px-3 py-1.5 font-body font-light text-[11px] text-fg/70 shadow-xl pointer-events-none"
          >
            Ask me anything
          </motion.div>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="fixed z-50 flex flex-col overflow-hidden
                bottom-[72px] left-3 right-3 rounded-3xl
                md:bottom-28 md:right-8 md:left-auto md:w-[400px] md:rounded-3xl md:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
              style={{ height: "min(540px, calc(100vh - 160px))" }}
            >
              {/* Header */}
              <div className="relative bg-ink/95 backdrop-blur-xl border-b hairline px-6 py-5 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative w-9 h-9 rounded-full bg-fg/10 border hairline flex items-center justify-center shrink-0">
                    <MessageCircle size={15} strokeWidth={1.5} className="text-fg/80" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink" />
                  </div>
                  <div>
                    <p className="font-aquarium text-fg text-[14px] tracking-wide leading-none mb-0.5">Aesthura</p>
                    <p className="eyebrow text-fg/35 text-[9px]">Studio Assistant · Always on</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 1 && (
                    <button onClick={clearChat}
                      className="w-8 h-8 rounded-full bg-fg/[0.07] hover:bg-red-500/10 hover:text-red-400 flex items-center justify-center transition-colors">
                      <Trash2 size={13} strokeWidth={1.5} className="text-fg/40" />
                    </button>
                  )}
                  <button onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-fg/[0.07] hover:bg-fg/15 flex items-center justify-center transition-colors">
                    <X size={14} strokeWidth={1.5} className="text-fg/60" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-bg px-5 py-5 flex flex-col gap-4 scroll-smooth">

                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start items-end"}`}
                  >
                    {/* Assistant avatar dot */}
                    {m.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-fg/10 border hairline flex items-center justify-center shrink-0 mb-0.5">
                        <MessageCircle size={10} strokeWidth={1.5} className="text-fg/50" />
                      </div>
                    )}

                    <div className={`max-w-[82%] ${m.role === "user" ? "" : ""}`}>
                      <div className={`px-4 py-3 font-body font-light text-[13px] leading-[1.65]
                        ${m.role === "user"
                          ? "bg-fg text-ink rounded-2xl rounded-br-sm"
                          : "bg-fg/[0.05] border hairline text-fg/80 rounded-2xl rounded-bl-sm"
                        }`}>
                        {m.role === "assistant" ? (
                          <>
                            {renderContent(m.content)}
                            {streaming && i === messages.length - 1 && m.content === "" && (
                              <span className="inline-flex gap-1 items-center py-0.5">
                                {[0, 1, 2].map((d) => (
                                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-fg/30 animate-bounce" style={{ animationDelay: `${d * 0.18}s` }} />
                                ))}
                              </span>
                            )}
                            {streaming && i === messages.length - 1 && m.content !== "" && (
                              <span className="inline-block w-px h-3.5 bg-fg/40 ml-0.5 animate-pulse align-middle" />
                            )}
                          </>
                        ) : m.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex flex-col gap-2 pl-8"
                    >
                      <span className="eyebrow text-fg/25 text-[9px] mb-1">Suggested</span>
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          onClick={() => send(s)}
                          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border hairline font-body font-light text-[12px] text-fg/55 hover:text-fg hover:border-fg/35 hover:bg-fg/[0.04] transition-all duration-200 text-left"
                        >
                          <ArrowUpRight size={11} className="text-fg/30 shrink-0" />
                          {s}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="bg-ink/95 backdrop-blur-xl border-t hairline px-4 py-4 shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); send(input); }}
                  className="flex items-end gap-3 bg-fg/[0.05] border hairline rounded-2xl px-4 py-3"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                    }}
                    placeholder="Ask anything about Aesthura…"
                    disabled={streaming}
                    className="flex-1 bg-transparent font-body font-light text-[13px] text-fg placeholder:text-fg/25 focus:outline-none resize-none leading-relaxed disabled:opacity-40 max-h-[120px]"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || streaming}
                    whileTap={{ scale: 0.88 }}
                    className="w-8 h-8 rounded-xl bg-fg text-ink flex items-center justify-center disabled:opacity-20 transition-opacity hover:bg-fg/90 shrink-0 mb-0.5"
                  >
                    <ArrowUp size={14} strokeWidth={2} />
                  </motion.button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1">
                  <p className="font-body font-light text-[10px] text-fg/20">Powered by Groq · Llama 3.3 70B</p>
                  {input.length > 0 && (
                    <span className={`font-body font-light text-[10px] ${input.length > 480 ? "text-red-400" : "text-fg/25"}`}>
                      {input.length}/500
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
