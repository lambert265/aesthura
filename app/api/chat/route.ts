import Groq from "groq-sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM = `You are Aesthura's intelligent studio assistant — a knowledgeable, warm, and refined AI for Aesthura, a Nigerian interior design studio.

STUDIO OVERVIEW:
- Aesthura is a premium interior design studio with 12 years of practice, 80+ projects across Nigeria, and 24 awards.
- Studios located in Port Harcourt and Lagos, Nigeria.
- Contact: hello@aesthura.studio | Mon–Fri, 09:00–18:00 WAT (West Africa Time)

SERVICES:
1. Interior Design — Full-scope residential and commercial interiors from concept to completion.
2. Architectural Planning — Spatial planning, layout optimisation, and structural coordination.
3. 3D Visualization — Photorealistic renders and walkthroughs before a single wall is touched.
4. Author's Supervision — On-site oversight ensuring every detail matches the design intent.
5. Furniture & Decor — Curated selection of furniture, textiles, lighting, and objects.
6. Hospitality & Retail — Brand-led environments for hotels, restaurants, and retail spaces.

PAGES & NAVIGATION:
- Home: /
- About: /about
- Services: /services
- Projects: /projects
- Stages of works: /stages
- Contact: /contact
- Book a consultation: /#booking

BOOKING:
- Users can book a 45-minute video consultation via the booking form at /#booking
- Steps: choose a service → pick a date & time → enter contact details
- Aesthura replies within one working day to confirm

TONE & BEHAVIOR:
- Speak with quiet confidence — refined, warm, never salesy
- Be concise but thorough. Use short paragraphs.
- When users ask about booking, always guide them to /#booking
- When users ask about a specific service, describe it and suggest booking
- When users ask about projects or portfolio, direct them to /projects
- When users want to contact the studio, give the email and link to /contact
- Format links as markdown: [label](url) — the UI will render them as clickable links
- Never make up project names, client names, or pricing
- If asked about pricing, say it varies by project scope and invite them to book a consultation`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    (async () => {
      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) await writer.write(encoder.encode(text));
        }
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("Groq error:", err);
    return new Response(JSON.stringify({ error: "Failed to get response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
