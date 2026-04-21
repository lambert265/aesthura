import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects, getProjectBySlug } from "../../lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Aesthura`,
    description: project.description[0],
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main className="bg-bg text-fg min-h-screen">

      {/* ── Hero ── */}
      <div className="relative w-full h-[55vh] md:h-[80vh] overflow-hidden">
        <Image
          src={project.img}
          alt={project.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(0 0% 4% / 0.2) 0%, hsl(0 0% 4% / 0.6) 100%)" }}
        />
        {/* Back link */}
        <Link
          href="/projects"
          className="absolute top-24 md:top-28 left-5 md:left-10 z-10 flex items-center gap-2 font-body font-light text-[12px] text-fg/70 hover:text-fg transition-colors duration-300 tracking-[0.06em]"
        >
          ← All projects
        </Link>
      </div>

      {/* ── Title + meta strip ── */}
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="py-10 md:py-14 border-b hairline grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

          {/* Title */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <span className="eyebrow text-fg/40 text-[10px]">{project.tag}</span>
            <h1 className="display-text text-fg text-[11vw] md:text-[5vw] leading-[0.9]">
              {project.title}
            </h1>
          </div>

          {/* Meta */}
          <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Location", value: project.location },
                { label: "Year",     value: project.year     },
                { label: "Area",     value: project.area     },
                { label: "Scope",    value: project.scope    },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="eyebrow text-fg/30 text-[10px]">{label}</span>
                  <span className="font-body font-light text-[12px] md:text-[13px] text-fg/70 leading-snug">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 md:col-start-4 flex flex-col gap-6">
            {project.description.map((para, i) => (
              <p key={i} className="font-body font-light text-[14px] md:text-[16px] leading-relaxed text-fg/70">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Next projects ── */}
        {others.length > 0 && (
          <div className="border-t hairline py-14 md:py-20">
            <span className="eyebrow text-fg/35 text-[10px] block mb-8 md:mb-10">— More projects</span>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {others.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex flex-col gap-3">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={13} className="text-fg" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <span className="eyebrow text-fg/35 text-[10px]">{p.tag}</span>
                    <h3 className="display-text text-fg text-xl md:text-3xl leading-none">{p.title}</h3>
                    <span className="font-body font-light text-[11px] text-fg/35">{p.location} · {p.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
