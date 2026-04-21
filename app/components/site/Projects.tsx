"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fadeUpView } from "../../lib/animations";
import { projects, type Project } from "../../lib/projects";

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div className="group flex flex-col gap-3" {...fadeUpView(delay)}>
      <Link href={`/projects/${project.slug}`} className="flex flex-col gap-3">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight size={14} className="text-fg" />
          </div>
        </div>
        <div className="flex flex-col gap-1 px-1">
          <span className="eyebrow text-fg/40 text-[10px]">{project.tag}</span>
          <h3 className="display-text text-fg text-2xl md:text-3xl leading-none">{project.title}</h3>
          <span className="font-body font-light text-[11px] md:text-[12px] text-fg/40 tracking-[0.04em]">
            {project.location} · {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects({ preview = false }: { preview?: boolean }) {
  const displayed = preview ? projects.slice(0, 2) : projects;
  const col1 = preview ? [displayed[0]] : [projects[0], projects[2]];
  const col2 = preview ? [displayed[1]] : [projects[1], projects[3]];

  return (
    <section id="projects" className="bg-bg text-fg py-20 md:py-36">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-20">
          <motion.div className="flex flex-col gap-3 md:gap-4" {...fadeUpView(0)}>
            <span className="eyebrow text-fg/45">— Recent work</span>
            <h2 className="display-text text-fg text-[13vw] md:text-[6vw] leading-[0.9]">
              Selected projects
            </h2>
          </motion.div>
          <motion.div {...fadeUpView(0.15)}>
            <Link
              href="/projects"
              className="nav-link font-body font-light text-[13px] tracking-[0.06em] text-fg/60 hover:text-fg flex items-center gap-1.5 transition-colors duration-300"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Desktop staggered grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-6 lg:gap-x-10">
          <div className="flex flex-col gap-16 lg:gap-20">
            {col1.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.12} />)}
          </div>
          <div className="flex flex-col gap-16 lg:gap-20" style={{ marginTop: preview ? "0" : "20vh" }}>
            {col2.map((p, i) => <ProjectCard key={p.id} project={p} delay={0.1 + i * 0.12} />)}
          </div>
        </div>

        {/* Mobile: 2-col compact grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:hidden">
          {displayed.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.08} />)}
        </div>

        {/* View more CTA */}
        {preview && (
          <motion.div className="flex justify-center mt-12 md:mt-16" {...fadeUpView(0.25)}>
            <Link
              href="/projects"
              className="group flex items-center gap-3 border hairline rounded-full px-6 md:px-8 py-3 md:py-3.5 font-body font-light text-[13px] tracking-[0.08em] text-fg/60 hover:text-fg hover:border-fg/40 transition-all duration-500"
            >
              View all projects
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
