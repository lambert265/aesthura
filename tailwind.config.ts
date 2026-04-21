import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display:   ["var(--font-display)", "sans-serif"],
        body:      ["var(--font-body)", "sans-serif"],
        aquarium:  ["var(--font-aquarium)", "sans-serif"],
      },
      colors: {
        bg:         "hsl(0 0% 7%)",
        fg:         "hsl(40 10% 96%)",
        ink:        "hsl(0 0% 4%)",
        paper:      "hsl(40 10% 96%)",
        hairline:   "hsl(40 8% 96% / 0.18)",
        /* ── Admin design system tokens ── */
        background: "hsl(var(--admin-background))",
        foreground: "hsl(var(--admin-foreground))",
        card:       "hsl(var(--admin-card))",
        surface:    "hsl(var(--admin-surface))",
        "surface-2":"hsl(var(--admin-surface-2))",
        primary:    "hsl(var(--admin-primary))",
        accent:     "hsl(var(--admin-accent))",
        muted:      "hsl(var(--admin-muted))",
        border:     "hsl(var(--admin-border))",
        ring:       "hsl(var(--admin-ring))",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        admin:   "0.75rem",
      },
      animation: {
        marquee:       "marquee 40s linear infinite",
        "rotate-slow": "rotate-slow 24s linear infinite",
        "pulse-soft":  "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "rotate-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.22, 1, 0.36, 1)",
        smooth:  "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
