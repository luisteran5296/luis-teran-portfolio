import SkillCategory from "./SkillCategory";
import { motion } from "framer-motion";
import { GraduationCap, Award, Sparkles, CheckCircle2, Calendar, Building2 } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { useLanguage } from "../../context/LanguageContext";

export const EducationSection = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { icon: Award, color: "text-primary bg-primary/10 border-primary/30" },
    { icon: Award, color: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
  ];

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-24 space-y-20">
      
      {/* Education Header & Cards */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {t.education.titlePre} <span className="text-gradient-primary">{t.education.titleHighlight}</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            {t.education.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.education.items.map((edu, i) => {
            const badgeMeta = badges[i % badges.length];
            const BadgeIcon = badgeMeta.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <MagicCard
                  className="h-full p-6 sm:p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl"
                  gradientSize={300}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Header with Icon and Distinction Badge */}
                      <div className="flex items-start justify-between gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-sm">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`px-3 py-1 rounded-full border text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm ${badgeMeta.color}`}>
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
                          <li key={j} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/90 font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {edu.credentialUrl && (
                        <div className="pt-3 border-t border-border/40 mt-auto">
                          <a
                            href={edu.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors group"
                          >
                            <span>{t.education.viewCredential}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expertise & Skills Component */}
      <div>
        <SkillCategory />
      </div>

    </section>
  );
};

export default EducationSection;
