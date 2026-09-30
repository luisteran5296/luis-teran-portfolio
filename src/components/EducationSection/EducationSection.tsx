import React, { useRef, useState, useEffect } from "react";
import SkillCategory from "./SkillCategory";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { useLanguage } from "../../context/LanguageContext";
import type { EducationItem } from "../../data/portfolioData";

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBadge, setSelectedBadge] = useState<EducationItem | null>(null);

  const fallbackBadges = [
    { icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { icon: Award, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { icon: Award, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" },
    { icon: Award, color: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
    { icon: Award, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  ];

  const items = t.education.items;

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth =
      window.innerWidth >= 1024
        ? clientWidth / 3
        : window.innerWidth >= 768
        ? clientWidth / 2
        : clientWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const clientWidth = sliderRef.current.clientWidth;
    const scrollAmount =
      window.innerWidth >= 1024
        ? clientWidth / 3
        : window.innerWidth >= 768
        ? clientWidth / 2
        : clientWidth;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-24 space-y-20">
      {/* Education Header & Slider Controls */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {t.education.titlePre}{" "}
                <span className="text-gradient-primary">
                  {t.education.titleHighlight}
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              {t.education.subtitle}
            </p>
          </motion.div>

          {/* Slider Arrow Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-2xl border border-border/80 bg-card/80 hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all shadow-md active:scale-95"
              aria-label="Previous credential"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-2xl border border-border/80 bg-card/80 hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all shadow-md active:scale-95"
              aria-label="Next credential"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory -mx-6 px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((edu, i) => {
            const badgeMeta = fallbackBadges[i % fallbackBadges.length];
            const badgeColor = edu.badgeColor || badgeMeta.color;
            const BadgeIcon = badgeMeta.icon;

            return (
              <div
                key={i}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start flex"
              >
                <MagicCard
                  className="h-full w-full p-6 sm:p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl flex flex-col justify-between group transition-all duration-300"
                  gradientSize={300}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Top Header: Badge Logo/Symbol & Distinction Badge */}
                      <div className="flex items-start justify-between gap-3 mb-6">
                        <div
                          onClick={() => {
                            if (edu.credlyBadgeId) setSelectedBadge(edu);
                          }}
                          className={`w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shadow-sm overflow-hidden transition-transform group-hover:scale-105 ${
                            edu.credlyBadgeId ? "cursor-pointer" : ""
                          }`}
                          title={edu.credlyBadgeId ? "Ver insignia interactiva Credly" : undefined}
                        >
                          {edu.image ? (
                            <img
                              src={edu.image}
                              alt={edu.degree}
                              className="w-9 h-9 object-contain drop-shadow"
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full border text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm ${badgeColor}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          {edu.badge}
                        </span>
                      </div>

                      {/* Degree Title & Institution Meta */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-2">
                        {edu.degree}
                      </h3>

                      <div className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground mb-6 pb-4 border-b border-border/60">
                        <span className="flex items-center gap-1.5 text-foreground font-bold">
                          <Building2 className="w-3.5 h-3.5 text-primary" /> {edu.school}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-primary font-bold">
                          <Calendar className="w-3.5 h-3.5" /> {edu.year}
                        </span>
                      </div>

                      {/* Key Highlights List */}
                      <ul className="space-y-3 mb-5">
                        {edu.details.map((detail, j) => (
                          <li
                            key={j}
                            className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/90 font-medium">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Footer */}
                    {edu.credentialUrl && (
                      <div className="pt-3 border-t border-border/40 mt-auto flex items-center justify-between gap-3">
                        <a
                          href={edu.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors group/link"
                        >
                          <span>{t.education.viewCredential}</span>
                          <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>

                        {edu.credlyBadgeId && (
                          <button
                            type="button"
                            onClick={() => setSelectedBadge(edu)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/50 px-2.5 py-1 rounded-lg transition-all"
                            title="Verificar Credencial Credly"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Credly</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </MagicCard>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!sliderRef.current) return;
                const clientWidth = sliderRef.current.clientWidth;
                const cardWidth =
                  window.innerWidth >= 1024
                    ? clientWidth / 3
                    : window.innerWidth >= 768
                    ? clientWidth / 2
                    : clientWidth;
                sliderRef.current.scrollTo({
                  left: i * cardWidth,
                  behavior: "smooth",
                });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to credential ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Expertise & Skills Component */}
      <div>
        <SkillCategory />
      </div>

      {/* Interactive Credly Embed Modal */}
      <AnimatePresence>
        {selectedBadge && selectedBadge.credlyBadgeId && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-[2rem] border border-border/80 bg-card p-6 shadow-2xl flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Credly Live Verification</span>
              </div>

              <h4 className="text-lg font-extrabold text-foreground mb-1">
                {selectedBadge.degree}
              </h4>
              <p className="text-xs text-muted-foreground mb-5">
                {selectedBadge.school}
              </p>

              {/* Official Credly Embed Iframe */}
              <div className="p-3 bg-secondary/30 rounded-2xl border border-border/60 shadow-inner flex items-center justify-center my-1">
                <iframe
                  name="acclaim-badge"
                  allowTransparency={true}
                  frameBorder="0"
                  id={`embedded-badge-${selectedBadge.credlyBadgeId}`}
                  scrolling="no"
                  src={`https://www.credly.com/embedded_badge/${selectedBadge.credlyBadgeId}`}
                  style={{
                    width: "150px",
                    height: "270px",
                    border: "none",
                    overflow: "hidden",
                  }}
                  title={`Credly Badge - ${selectedBadge.degree}`}
                  className="rounded-xl"
                />
              </div>

              {/* Direct Verification Link */}
              <a
                href={selectedBadge.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-md group"
              >
                <span>Verificar en Credly Oficial</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationSection;
