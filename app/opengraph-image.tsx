import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aesthura — Editorial Interior Design Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: "hsl(0,0%,7%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Top — eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 24, height: 1, background: "hsla(40,10%,96%,0.4)" }} />
          <span style={{ fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: "hsla(40,10%,96%,0.45)" }}>
            Interior Design Studio
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: "hsl(40,10%,96%)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            Quiet spaces.
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: "hsl(40,10%,96%)", lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
            Considered craft.
          </div>
        </div>

        {/* Bottom — logo + stats */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <span style={{ fontSize: 32, letterSpacing: "0.2em", color: "hsl(40,10%,96%)" }}>
            Aesthura
          </span>
          <div style={{ display: "flex", gap: 48 }}>
            {[["12 yrs", "Practicing"], ["80+", "Projects"], ["6", "Countries"]].map(([n, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "hsl(40,10%,96%)", letterSpacing: "-0.02em" }}>{n}</span>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "hsla(40,10%,96%,0.4)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
