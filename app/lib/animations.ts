export const EASE = {
  elegant: [0.22, 1, 0.36, 1] as const,
  smooth:  [0.65, 0, 0.35, 1] as const,
  bounce:  [0.68, -0.55, 0.265, 1.55] as const,
};

export const viewport = { once: true, margin: "-100px" };

export const fadeUp = (delay = 0, y = 24) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE.elegant },
});

export const fadeUpView = (delay = 0, y = 30) => ({
  initial:     { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition:  { duration: 1, delay, ease: EASE.elegant },
});

export const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 1, delay, ease: EASE.elegant },
});

export const scaleIn = (delay = 0) => ({
  initial:    { opacity: 0, scale: 0.85 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 1, delay, ease: EASE.elegant },
});

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export const textReveal = {
  initial:    { y: "100%", opacity: 0 },
  animate:    { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: EASE.elegant },
};

export const pageTransition = {
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: EASE.elegant },
};
