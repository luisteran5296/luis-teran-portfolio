import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderKanban, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const projects = t.projects.items;

  // Custom bento layout spans for 5 items
  const bentoSpans = [
    "lg:col-span-7 min-h-[460px]",
    "lg:col-span-5 min-h-[460px]",
    "lg:col-span-4 min-h-[400px]",
    "lg:col-span-4 min-h-[400px]",
    "lg:col-span-4 min-h-[400px]",
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-14 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>{t.projects.eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {t.projects.titlePre}{" "}
          <span className="text-gradient-primary">{t.projects.titleHighlight}</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {t.projects.subtitle}
        </p>
      </motion.div>

      {/* 12-Column Executive Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {projects.map((project, i) => {
          const spanClass = bentoSpans[i] || "lg:col-span-4 min-h-[400px]";

          return (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-[2.25rem] block shadow-2xl border border-white/10 hover:border-primary/50 transition-all duration-500 ${spanClass} cursor-pointer bg-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Cover Background Image */}
              <div className="absolute inset-0 bg-neutral-950 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-65 group-hover:opacity-85 transform-gpu"
                />

                {/* Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Content Overlay */}
              <div className="relative h-full p-7 sm:p-9 flex flex-col justify-between z-10">
                {/* Top Row: Kicker Badge + Launch Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/90 shadow-sm">
                      {project.kicker}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Circular Arrow Action Badge */}
                  <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-md group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Area: Project Info & Tags */}
                <div className="mt-auto pt-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-primary transition-colors drop-shadow-md">
                    {project.title}
                  </h3>

                  <p className="text-sm font-semibold text-white/90 mb-2 drop-shadow">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl mb-5 line-clamp-3 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-black/40 text-white/80 border border-white/10 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}

                    <span className="ml-auto text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{t.projects.visit}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
