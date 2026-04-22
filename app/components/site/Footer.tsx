"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, Layers, Mail } from "lucide-react";

const MOBILE_NAV = [
  { label: "Home",     href: "/",         icon: Home     },
  { label: "Projects", href: "/projects",  icon: FolderOpen },
  { label: "Services", href: "/services",  icon: Layers   },
  { label: "Contact",  href: "/contact",   icon: Mail     },
];

const navLinks = [
  { label: "About",           href: "/about"    },
  { label: "Services",        href: "/services" },
  { label: "Projects",        href: "/projects" },
  { label: "Stages of works", href: "/stages"   },
  { label: "Contact",         href: "/contact"  },
];

export default function Footer() {
  return (
    <>
    <footer className="bg-ink text-fg border-t hairline pb-20 md:pb-0">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-12 md:py-20">

        {/* ── Mobile layout ── */}
        <div className="md:hidden flex flex-col gap-8">

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <span className="font-aquarium text-fg text-[26px] tracking-wide">Aesthura</span>
            <p className="font-body font-light text-[12px] leading-relaxed text-fg/45 max-w-[220px]">
              Quiet, considered interiors designed to age beautifully.
            </p>
          </div>

          {/* Pill nav buttons */}
          <div className="flex flex-wrap gap-2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-full border hairline font-body font-light text-[12px] tracking-[0.04em] text-fg/60 hover:text-fg hover:border-fg/40 transition-colors duration-300 whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1.5">
            <span className="eyebrow text-fg/30 text-[10px]">Contact</span>
            <a
              href="mailto:hello@aesthura.studio"
              className="font-body font-light text-[12px] text-fg/55 hover:text-fg transition-colors duration-300"
            >
              hello@aesthura.studio
            </a>
            <span className="font-body font-light text-[12px] text-fg/45">Port Harcourt</span>
          </div>

          {/* Bottom */}
          <div className="border-t hairline pt-6 flex flex-col gap-1">
            <span className="font-body font-light text-[10px] text-fg/25 tracking-[0.04em]">
              © {new Date().getFullYear()} Aesthura Studio. All rights reserved.
            </span>
            <span className="font-body font-light text-[10px] text-fg/20 tracking-[0.04em]">
              Designed with intention.
            </span>
          </div>
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-8 mb-16">

            {/* Logo + tagline */}
            <div className="col-span-4 flex flex-col gap-4">
              <span className="font-aquarium text-fg text-[28px] tracking-wide">Aesthura</span>
              <p className="font-body font-light text-[13px] leading-relaxed text-fg/50 max-w-[240px]">
                Quiet, considered interiors designed to age beautifully.
              </p>
            </div>

            {/* Nav links */}
            <nav className="col-span-4 col-start-6 flex flex-col gap-3">
              <span className="eyebrow text-fg/30 text-[10px] mb-2">Navigation</span>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="nav-link font-body font-light text-[13px] text-fg/55 hover:text-fg transition-colors duration-300 w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Contact */}
            <div className="col-span-3 col-start-10 flex flex-col gap-3">
              <span className="eyebrow text-fg/30 text-[10px] mb-2">Contact</span>
              <a
                href="mailto:hello@aesthura.studio"
                className="nav-link font-body font-light text-[13px] text-fg/55 hover:text-fg transition-colors duration-300 w-fit"
              >
                hello@aesthura.studio
              </a>
              <span className="font-body font-light text-[13px] text-fg/55">Port Harcourt · Lagos</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t hairline pt-8">
            <span className="font-body font-light text-[11px] text-fg/30 tracking-[0.04em]">
              © {new Date().getFullYear()} Aesthura Studio. All rights reserved.
            </span>
            <span className="font-body font-light text-[11px] text-fg/25 tracking-[0.04em]">
              Designed with intention.
            </span>
          </div>
        </div>

      </div>
    </footer>

      {/* Mobile pill nav */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <MobilePillNav />
      </nav>
    </>
  );
}

function MobilePillNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 bg-bg/90 backdrop-blur-xl border hairline rounded-full px-2 py-2 shadow-2xl shadow-black/50">
      {MOBILE_NAV.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-full transition-all active:scale-95 min-w-[52px]
              ${active ? "bg-fg/10 text-fg" : "text-fg/45 hover:text-fg"}`}>
            <Icon size={15} strokeWidth={1.5} />
            <span className="eyebrow text-[8px] tracking-[0.08em]">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
