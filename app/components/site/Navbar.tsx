"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const leftLinks  = [
  { href: "/about",    label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
];

const rightLinks = [
  { href: "/stages",  label: "Stages of works" },
  { href: "/contact", label: "Contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

const glassBase    = "backdrop-blur-xl border shadow-[0_4px_24px_rgba(0,0,0,0.35)]";
const glassTop     = `${glassBase} bg-fg/[0.06] border-fg/[0.12]`;
const glassScrolled = `${glassBase} bg-ink/80 border-fg/[0.18]`;

function NavLinks({
  links,
  pillRef,
  navRef,
  pathname,
  scrolled,
}: {
  links: { href: string; label: string }[];
  pillRef?: React.RefObject<HTMLSpanElement>;
  navRef?: React.RefObject<HTMLUListElement>;
  pathname: string;
  scrolled?: boolean;
}) {
  return (
    <ul ref={navRef} className="relative flex items-center gap-0.5 text-[13px]">
      {pillRef && (
        <span
          ref={pillRef}
          aria-hidden
          className="absolute top-0 h-full rounded-full bg-fg/10 transition-all duration-300 ease-out opacity-0 pointer-events-none"
        />
      )}
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            data-active={pathname === href}
            className={`relative z-10 px-4 py-1.5 rounded-full font-light tracking-[0.05em] transition-colors duration-200 block
              ${pathname === href ? "text-fg" : scrolled ? "text-fg/75 hover:text-fg" : "text-fg/55 hover:text-fg"}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Hamburger({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block w-5 h-px bg-fg rounded-full origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-5 h-px bg-fg rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block w-5 h-px bg-fg rounded-full origin-center"
      />
    </button>
  );
}

function MobileDrawer({ open, pathname }: { open: boolean; pathname: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`overflow-hidden rounded-3xl mt-2 ${glass}`}
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {allLinks.map(({ href, label }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={href}
                  className={`block px-4 py-2.5 rounded-xl text-[13px] font-light tracking-[0.04em] transition-colors
                    ${pathname === href ? "bg-fg/10 text-fg" : "text-fg/55 hover:bg-fg/[0.07] hover:text-fg"}`}
                >
                  {label}
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="px-6 pb-6">
            <Link
              href="/contact"
              className="block w-full text-center py-2.5 text-[13px] font-light tracking-[0.06em] border border-fg/20 rounded-full text-fg/70 hover:text-fg hover:border-fg/50 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const pathname  = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);
  const navRef  = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const glass = scrolled ? glassScrolled : glassTop;

  useEffect(() => setMobileOpen(false), [pathname]);

  // Sliding pill tracker
  useEffect(() => {
    if (!navRef.current || !pillRef.current) return;
    const active = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (!active) { pillRef.current.style.opacity = "0"; return; }
    const navRect    = navRef.current.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    pillRef.current.style.opacity   = "1";
    pillRef.current.style.width     = `${activeRect.width}px`;
    pillRef.current.style.transform = `translateX(${activeRect.left - navRect.left}px)`;
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 pt-4 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
      {/* ── Desktop: three split pills ── */}
      <div className="hidden md:flex max-w-[1600px] mx-auto items-center justify-between gap-4">

        {/* Left pill */}
        <div className={`flex items-center px-2 py-1.5 rounded-full ${glass}`}>
          <NavLinks links={leftLinks} pathname={pathname} scrolled={scrolled} />
        </div>

        {/* Center logo pill */}
        <Link
          href="/"
          className={`px-7 py-2.5 rounded-full font-aquarium text-[15px] tracking-[0.2em] uppercase text-fg ${glass}`}
        >
          Aesthura
        </Link>

        {/* Right pill */}
        <div className={`flex items-center px-2 py-1.5 rounded-full ${glass}`}>
          <NavLinks
            links={rightLinks}
            pathname={pathname}
            scrolled={scrolled}
            pillRef={pillRef}
            navRef={navRef}
          />
        </div>
      </div>

      {/* ── Mobile: logo + hamburger ── */}
      <div className="md:hidden max-w-[1600px] mx-auto flex flex-col">
        <div className={`flex items-center justify-between px-5 py-2.5 rounded-full ${glass}`}>
          <Link
            href="/"
            className="font-aquarium text-[14px] tracking-[0.2em] uppercase text-fg"
          >
            Aesthura
          </Link>
          <Hamburger open={mobileOpen} toggle={() => setMobileOpen((o) => !o)} />
        </div>
        <MobileDrawer open={mobileOpen} pathname={pathname} />
      </div>
    </header>
  );
}
