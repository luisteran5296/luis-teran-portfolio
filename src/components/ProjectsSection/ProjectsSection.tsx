import React from "react";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SliderSlipstream } from "./SliderSlipstream";

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-8 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>{t.projects.eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">
          {t.projects.titlePre}{" "}
          <span className="text-gradient-primary">{t.projects.titleHighlight}</span>
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {t.projects.subtitle}
        </p>
      </motion.div>

      {/* Slider Slipstream 3D Infinite Receding Carousel */}
      <SliderSlipstream items={t.projects.items} />
    </section>
  );
};

export default ProjectsSection;
