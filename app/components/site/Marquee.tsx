import type { FC } from "react";

const items = [
  "Residential design",
  "Commercial spaces",
  "Architectural concepts",
  "3D visualization",
  "Author's supervision",
  "Furniture selection",
];

const Strip: FC = () => (
  <>
    {[...items, ...items, ...items].map((item, i) => (
      <span key={i} className="flex items-center gap-5 md:gap-10 flex-shrink-0">
        <span className="font-display font-medium text-lg md:text-4xl uppercase text-fg tracking-tight whitespace-nowrap">
          {item}
        </span>
        <span className="h-2 w-2 rounded-full bg-fg flex-shrink-0" aria-hidden="true" />
      </span>
    ))}
  </>
);

export default function Marquee() {
  return (
    <div className="bg-ink border-y hairline py-4 md:py-6 overflow-hidden">
      <div
        className="flex items-center gap-5 md:gap-10 w-max"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        <Strip />
      </div>
    </div>
  );
}
