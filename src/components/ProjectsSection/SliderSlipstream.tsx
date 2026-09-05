import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import type { ProjectItem } from "../../data/portfolioData";

interface SliderSlipstreamProps {
  items: ProjectItem[];
}

export const SliderSlipstream: React.FC<SliderSlipstreamProps> = ({ items }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Gentle auto-rotation when user is not hovering
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      className="slipstream-root relative w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stage Viewport */}
      <div className="slipstream-stage relative w-full h-[580px] sm:h-[620px] flex items-center justify-center overflow-hidden [perspective:1300px]">
        {/* Atmospheric Backing Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Diagonal Belt Track of Cards */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          {items.map((project, index) => {
            // Compute circular offset relative to activeIndex
            let diff = index - activeIndex;
            // Wrap diff around the shortest path
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // Compute 3D transforms for receding diagonal stream
            const xOffset = diff * 58; // percentage offset
            const zOffset = -Math.abs(diff) * 160; // depth receding into dark
            const yRotate = -diff * 26; // angle along the belt
            const cardScale = isActive ? 1 : Math.max(0.74, 1 - Math.abs(diff) * 0.14);
            const cardOpacity = isActive ? 1 : Math.max(0.25, 0.7 - Math.abs(diff) * 0.28);
            const zIndex = 30 - Math.abs(diff) * 10;

            return (
              <motion.div
                key={project.id}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`slipstream-card-wrap absolute top-1/2 left-1/2 w-[310px] sm:w-[360px] md:w-[390px] h-[500px] sm:h-[530px] -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                  isActive ? "cursor-default" : "hover:brightness-110"
                }`}
                style={{
                  zIndex,
                }}
                animate={{
                  x: `calc(-50% + ${xOffset}%)`,
                  y: "-50%",
                  z: zOffset,
                  rotateY: yRotate,
                  scale: cardScale,
                  opacity: cardOpacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.9,
                }}
              >
                {/* Card Outer Shell */}
                <div
                  className={`relative w-full h-full rounded-[2.25rem] overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "border-primary/50 shadow-[0_25px_60px_-15px_rgba(139,92,246,0.45)] bg-card/95 ring-1 ring-white/20"
                      : "border-white/10 shadow-2xl bg-card/75 backdrop-blur-md"
                  }`}
                >
                  {/* Top: Cover Art with Gradient Scrim */}
                  <div className="relative w-full h-[52%] overflow-hidden bg-neutral-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                        isActive ? "scale-105" : "scale-100 opacity-80"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />

                    {/* Card Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white shadow-sm">
                        {project.kicker}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-primary bg-primary/15 border border-primary/30 px-2.5 py-0.5 rounded-full truncate max-w-[160px]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Card Body & Actions */}
                  <div className="relative h-[48%] p-5 sm:p-6 flex flex-col justify-between z-10 bg-card">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight truncate">
                          {project.title}
                        </h3>
                        {isActive && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-primary/10 border border-primary/25 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                            title={t.projects.visit}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-primary/90 line-clamp-1 mb-2">
                        {project.subtitle}
                      </p>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:-translate-y-0.5"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span>{t.projects.visit}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="font-mono text-[11px] font-bold text-muted-foreground">
                        0{index + 1} / 0{count}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Glass Dock */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-border/80 bg-card/90 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
          aria-label="Proyecto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicator Segments */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-md shadow-sm">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.6)]"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-border/80 bg-card/90 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
          aria-label="Siguiente proyecto"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SliderSlipstream;
