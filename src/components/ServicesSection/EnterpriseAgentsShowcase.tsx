import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Play,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  BookOpen,
  FileSpreadsheet,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { useLanguage } from "../../context/LanguageContext";
import { VideoModal } from "../common/VideoModal";
import type { EnterpriseAgentItem } from "../../data/portfolioData";

export const EnterpriseAgentsShowcase = () => {
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<EnterpriseAgentItem | null>(null);

  const iconMap: Record<string, any> = {
    "teams-confluence-agent": BookOpen,
    "teams-analytics-excel-agent": FileSpreadsheet,
    "teams-expense-auditor-agent": ShieldCheck,
  };

  const gradientThemes: Record<string, { from: string; to: string; bg: string; border: string; glow: string }> = {
    "teams-confluence-agent": {
      from: "#38bdf8",
      to: "#818cf8",
      bg: "from-sky-500/10 to-indigo-500/10",
      border: "border-sky-500/30",
      glow: "rgba(56, 189, 248, 0.15)",
    },
    "teams-analytics-excel-agent": {
      from: "#10b981",
      to: "#38bdf8",
      bg: "from-emerald-500/10 to-teal-500/10",
      border: "border-emerald-500/30",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    "teams-expense-auditor-agent": {
      from: "#f59e0b",
      to: "#ef4444",
      bg: "from-amber-500/10 to-rose-500/10",
      border: "border-amber-500/30",
      glow: "rgba(245, 158, 11, 0.15)",
    },
  };

  return (
    <div className="mt-28 space-y-12">
      {/* Sub-section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Bot className="w-3.5 h-3.5" />
          <span>{t.enterpriseAgents.eyebrow}</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
          {t.enterpriseAgents.title}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {t.enterpriseAgents.subtitle}
        </p>
      </motion.div>

      {/* Agents Grid (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {t.enterpriseAgents.items.map((agent, i) => {
          const Icon = iconMap[agent.id] || Bot;
          const theme = gradientThemes[agent.id] || gradientThemes["teams-confluence-agent"];

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.55 }}
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col h-full"
            >
              <MagicCard
                className="h-full rounded-[2.25rem] border border-border/80 bg-card/85 p-6 sm:p-7 shadow-xl flex flex-col justify-between group hover:border-primary/40 transition-all duration-300"
                gradientSize={320}
                gradientColor={theme.glow}
                gradientFrom={theme.from}
                gradientTo={theme.to}
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  {/* Top: Header, Badge, and Icon */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                          Teams Agent
                        </span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="text-[11px] font-extrabold uppercase font-mono px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
                        {agent.badge}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {agent.title}
                    </h4>

                    <p className="text-xs sm:text-sm font-semibold text-foreground/80 mb-3 leading-snug">
                      {agent.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {agent.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      {agent.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {agent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Video Preview Launcher + GitHub link */}
                  <div className="pt-4 border-t border-border/60 space-y-3 mt-auto">
                    {/* Interactive Video Play Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedAgent(agent)}
                      className="w-full relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-r from-primary/15 via-primary/10 to-sky-500/10 border border-primary/30 hover:border-primary/60 transition-all flex items-center justify-between group/btn cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <span>{t.enterpriseAgents.watchDemo}</span>
                            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground">
                            {agent.videoDuration} · Transmisión HD
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-primary group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    {/* GitHub Link */}
                    <div className="flex justify-end">
                      <a
                        href={agent.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors group/link"
                      >
                        <span>{t.enterpriseAgents.viewCode}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>

      {/* Video Modal (Loads video ONLY on demand) */}
      {selectedAgent && (
        <VideoModal
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          title={selectedAgent.title}
          badge={selectedAgent.badge}
          repoUrl={selectedAgent.repoUrl}
          videoUrl={selectedAgent.videoUrl}
          videoDuration={selectedAgent.videoDuration}
        />
      )}
    </div>
  );
};

export default EnterpriseAgentsShowcase;
