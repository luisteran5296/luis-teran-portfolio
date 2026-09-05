import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { AnimatedProductPreview } from "./AnimatedProductPreview";
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
      <div className="slipstream-stage relative w-full h-[530px] sm:h-[570px] md:h-[600px] flex items-center justify-center overflow-hidden [perspective:1400px]">
        {/* Atmospheric Backing Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[420px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Diagonal Belt Track of Cards */}
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
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
            const xOffset = diff * 64; // percentage offset
            const zOffset = -Math.abs(diff) * 180; // depth receding into dark
            const yRotate = -diff * 22; // angle along the belt
            const cardScale = isActive ? 1 : Math.max(0.78, 1 - Math.abs(diff) * 0.12);
            const cardOpacity = isActive ? 1 : Math.max(0.35, 0.75 - Math.abs(diff) * 0.25);
            const zIndex = 30 - Math.abs(diff) * 10;

            return (
              <motion.div
                key={project.id}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 60) prevSlide();
                  else if (info.offset.x < -60) nextSlide();
                }}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`slipstream-card-wrap absolute top-1/2 left-1/2 w-[320px] sm:w-[420px] md:w-[480px] lg:w-[520px] h-[510px] sm:h-[550px] md:h-[580px] cursor-pointer ${
                  isActive ? "cursor-grab active:cursor-grabbing" : "hover:brightness-110"
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
                  stiffness: 260,
                  damping: 26,
                  mass: 0.85,
                }}
              >
                {/* Card Outer Shell */}
                <div
                  className={`relative w-full h-full rounded-[2.5rem] overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "border-primary/60 shadow-[0_30px_90px_-20px_rgba(139,92,246,0.55)] bg-card ring-1 ring-white/20"
                      : "border-white/10 shadow-2xl bg-card/85 backdrop-blur-md"
                  }`}
                >
                  {/* Top: Living Animated Product UI Preview (Authentic, Non-AI Generated) */}
                  <div className="relative w-full h-[53%] sm:h-[55%] overflow-hidden bg-neutral-950">
                    <AnimatedProductPreview projectId={project.id} isActive={isActive} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent pointer-events-none z-10" />

                    {/* Card Top Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
                      <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/20 bg-black/75 backdrop-blur-md text-white shadow-md">
                        {project.kicker}
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold text-primary bg-primary/20 border border-primary/40 px-2.5 py-0.5 rounded-full truncate max-w-[190px] backdrop-blur-md shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Card Body & Actions */}
                  <div className="relative h-[47%] sm:h-[45%] p-5 sm:p-7 flex flex-col justify-between z-10 bg-card">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight truncate">
                          {project.title}
                        </h3>
                        {isActive && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm shrink-0"
                            title={t.projects.visit}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-primary/95 line-clamp-1 mb-2">
                        {project.subtitle}
                      </p>

                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-3 mb-3.5">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-muted/80 text-foreground/80 border border-border/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3.5 border-t border-border/70 flex items-center justify-between">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span>{t.projects.visit}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <span className="font-mono text-xs font-bold text-muted-foreground">
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
      <div className="flex items-center justify-center gap-4 mt-4 sm:mt-5">
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
