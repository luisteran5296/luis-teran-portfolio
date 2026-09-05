import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Play, CheckCircle2, Bot, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLanguage } from "../../context/LanguageContext";
import { VideoModal } from "../common/VideoModal";
import type { EnterpriseAgentItem } from "../../data/portfolioData";

const S = {
  baseVh: 8,          // floor: never pin a card higher than this
  peekPx: 38,         // vertical offset per card -> peek above the next
  gapVh: 6,           // tight, snappy scroll length (vh) between cards
  revealPx: 260,      // distance over which an incoming card eases
  revealAt: 0.35,     // reveal card once 35% on screen
  persp: 1500,        // 3D perspective
  arriveTilt: 12,     // deg incoming card is inclined
  buriedTilt: 2.5,    // deg each buried card reclines back
  scaleStep: 0.025,   // how much each buried card shrinks
  dimStep: 0.02,      // how much each buried card dims
  liftPx: 3.5,        // how much each buried card tucks up
};

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export const AgentsAlmanac: React.FC = () => {
  const { t } = useLanguage();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeCardNum, setActiveCardNum] = useState<number>(1);
  const [selectedAgent, setSelectedAgent] = useState<EnterpriseAgentItem | null>(null);

  const agents = t.enterpriseAgents.items;
  const N = agents.length;

  const scrollToCard = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -70 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const shown = new Array(N).fill(false);
    let restTops: number[] = [];
    let CARDH = 460;

    function layout() {
      if (!cards.length) return;
      const vh = window.innerHeight;
      CARDH = cards[0]?.offsetHeight || 460;
      const centred = (vh - CARDH) / 2 - ((N - 1) / 2) * S.peekPx;
      const base = Math.max(centred, (S.baseVh / 100) * vh);
      restTops = cards.map((el, i) => {
        const topVal = Math.round(base + i * S.peekPx);
        el.style.setProperty("--top", `${topVal}px`);
        return topVal;
      });
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastCur = -1;
    let queued = false;

    function update() {
      queued = false;
      const vh = window.innerHeight;
      const revealLine = vh - S.revealAt * CARDH;
      const hideLine = vh - 0.04 * CARDH;

      const tops: number[] = [];
      const risen: number[] = [];

      cards.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        tops[i] = rect.top;
        const restTop = restTops[i] ?? (90 + i * S.peekPx);
        risen[i] = clamp((restTop + S.revealPx - rect.top) / S.revealPx, 0, 1);
      });

      let suffix = 0;
      for (let i = N - 1; i >= 0; i--) {
        const b = suffix;
        const el = cards[i];
        const r = risen[i];
        if (reduce) {
          el.style.transform = "";
          el.style.filter = "";
        } else {
          const ty = -b * S.liftPx * r;
          const sc = 1 - b * S.scaleStep * r;
          const rx = (1 - r) * S.arriveTilt - b * S.buriedTilt * r;
          const br = 1 - b * S.dimStep * r;
          el.style.transform = `perspective(${S.persp}px) translate3d(0, ${ty}px, 0) scale(${sc}) rotateX(${rx}deg)`;
          el.style.filter = br < 0.999 ? `brightness(${br})` : "";
        }

        const top = tops[i];
        if (!shown[i] && top < revealLine) {
          shown[i] = true;
          el.classList.add("-in");
        } else if (shown[i] && top > hideLine) {
          shown[i] = false;
          el.classList.remove("-in");
        }

        if (r > 0.5) suffix++;
      }

      let cur = 0;
      cards.forEach((_, i) => {
        const restTop = restTops[i] ?? (90 + i * S.peekPx);
        if (tops[i] <= restTop + 2) cur = i;
      });
      if (cur !== lastCur) {
        lastCur = cur;
        setActiveCardNum(cur + 1);
      }
    }

    function onScroll() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }

    function onResize() {
      layout();
      update();
    }

    layout();
    cards.forEach((el) => el.classList.add("-in"));
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [N]);

  return (
    <div ref={sectionRef as any} className="agents-almanac-root w-full pt-4 pb-0">
      {/* Section Header */}
      <div className="almanac-head max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Bot className="w-3.5 h-3.5" />
          <span>{t.enterpriseAgents.eyebrow}</span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {t.enterpriseAgents.title}
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {t.enterpriseAgents.subtitle}
        </p>

        {/* Live Active Index Indicator */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/80 bg-card/90 shadow-sm text-xs font-mono font-bold text-foreground">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Microsoft Teams SDK</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-primary font-extrabold">0{activeCardNum} / 0{N}</span>
        </div>
      </div>

      {/* Cards Almanac Stack */}
      <div className="stack" style={{ "--count": N } as React.CSSProperties}>
        {agents.map((agent, i) => {
          const indexNum = i + 1;
          const indexStr = indexNum < 10 ? `0${indexNum}` : `${indexNum}`;
          const isCurrentActive = activeCardNum === indexNum;

          return (
            <article
              key={agent.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`almanac-card ${isCurrentActive ? "-current" : ""}`}
              style={{
                "--i": i,
                zIndex: i + 1,
              } as React.CSSProperties}
            >
              {/* Peek Tab (Top Sticking Strip) */}
              <div
                className="card__peek-tab cursor-pointer"
                onClick={() => scrollToCard(i)}
                role="button"
                tabIndex={0}
                aria-label={`Saltar a ${agent.title}`}
              >
                <span className="card__peek-num">{indexStr} / 0{N}</span>
                <span className="card__peek-name truncate">{agent.title}</span>
                <span className="card__peek-badge hidden sm:inline-block truncate">
                  {agent.badge}
                </span>
                <span className="card__peek-action hidden md:inline-flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>{agent.videoDuration}</span>
                </span>
              </div>

              {/* Main Card Body */}
              <div className="card__main-content">
                {/* Media Left: Video Player Interactive Cover */}
                <div
                  className="card__media group/cover cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                  onClick={() => setSelectedAgent(agent)}
                >
                  {/* Subtle Background Glow Canvas */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
                  <div className="absolute inset-0 bg-radial-gradient opacity-40 group-hover/cover:opacity-60 transition-opacity" />

                  {/* Mock Teams Video Window Header */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground font-semibold pl-1.5">
                        teams-recording.mp4
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        HD 1080p
                      </span>
                    </div>
                  </div>

                  {/* Centered Glowing Play Action Trigger */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] group-hover/cover:scale-115 group-hover/cover:shadow-[0_0_40px_rgba(139,92,246,0.9)] transition-all duration-300 mb-3">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide uppercase font-mono drop-shadow-md">
                      {t.enterpriseAgents.watchDemo}
                    </span>
                    <span className="text-[11px] font-mono text-white/70 mt-1 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                      {agent.videoDuration} · Stream GitHub CDN
                    </span>
                  </div>

                  {/* Tech stack watermark preview in bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/60 font-mono z-10 pointer-events-none">
                    <span>Microsoft Teams</span>
                    <span>Gemini 2.5</span>
                  </div>
                </div>

                {/* Content Right */}
                <div className="card__body flex flex-col justify-between">
                  <div>
                    {/* Badge Row */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="card__badge">{agent.badge}</span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {agent.videoDuration}
                      </span>
                    </div>

                    {/* Heading */}
                    <div className="card__title-row mb-1">
                      <h4 className="card__heading">{agent.title}</h4>
                      <a
                        href={agent.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card__heading-link"
                        title="Ver Repositorio GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="card__subheading">{agent.subtitle}</p>
                    <p className="card__text mb-4">{agent.description}</p>

                    {/* Architecture Highlights */}
                    <div className="space-y-1.5 mb-4">
                      {agent.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-tight">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="card__pills">
                      {agent.tags.map((tag) => (
                        <span key={tag} className="card__pill">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Card Foot Actions */}
                  <div className="card__foot mt-5 pt-3 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => setSelectedAgent(agent)}
                      className="card__visit-btn"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t.enterpriseAgents.watchDemo}</span>
                    </button>

                    <a
                      href={agent.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Video Modal Player (Zero initial bandwidth) */}
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

      {/* Scoped CSS Styles for Cards Almanac */}
      <style>{`
        .agents-almanac-root {
          --ink: var(--foreground, #ffffff);
          --paper: var(--card, #121217);
          --muted: var(--muted-foreground, #a1a1aa);
          --line: var(--border, rgba(255, 255, 255, 0.1));
          --accent: var(--primary, #8b5cf6);
        }

        .stack {
          position: relative;
          width: min(1040px, 92vw);
          margin: 0 auto;
          padding-bottom: 24px;
        }

        .almanac-card {
          position: sticky;
          top: var(--top, 90px);
          min-height: clamp(380px, 48vh, 500px);
          border-radius: 26px;
          color: var(--ink);
          background: color-mix(in srgb, var(--paper) 95%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--line);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05);
          will-change: transform, filter;
          transform-origin: 50% 0;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 8px;
        }

        .almanac-card:hover, .almanac-card.-current {
          border-color: color-mix(in srgb, var(--accent) 50%, var(--line));
        }

        /* Top Peek Tab */
        .card__peek-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 34px;
          padding: 0 18px;
          font-family: ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          border-bottom: 1px solid var(--line);
          background: color-mix(in srgb, var(--paper) 80%, black 20%);
          user-select: none;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .card__peek-tab:hover {
          background: color-mix(in srgb, var(--accent) 15%, var(--paper));
          color: var(--accent);
        }

        .card__peek-num {
          color: var(--accent);
          font-weight: 800;
        }

        .card__peek-name {
          color: var(--ink);
          font-weight: 600;
        }

        .card__peek-badge {
          margin-left: auto;
          color: var(--muted);
          font-size: 10px;
          text-transform: uppercase;
        }

        .card__peek-action {
          color: var(--accent);
          font-size: 10px;
        }

        /* Main Content Grid */
        .card__main-content {
          display: grid;
          grid-template-columns: minmax(280px, 44%) 1fr;
          gap: clamp(18px, 2.5vw, 32px);
          padding: clamp(16px, 2vw, 24px);
          min-height: clamp(340px, 42vh, 450px);
        }

        .card__media {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 220px;
          border-radius: 18px;
          overflow: hidden;
        }

        .card__badge {
          font: 700 10px/1 ui-monospace, monospace;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3.5px 7.5px;
          border-radius: 6px;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
        }

        .card__title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .card__heading {
          margin: 0;
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--ink);
        }

        .card__heading-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          background: rgba(140, 150, 170, 0.08);
          border: 1px solid var(--line);
          transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
        }

        .card__heading-link:hover {
          color: var(--accent);
          transform: scale(1.1);
          background: color-mix(in srgb, var(--accent) 15%, transparent);
        }

        .card__subheading {
          margin: 4px 0 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
        }

        .card__text {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          font-weight: 450;
          color: var(--muted);
        }

        .card__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }

        .card__pill {
          font: 600 10px/1 ui-monospace, monospace;
          padding: 3.5px 7px;
          border-radius: 6px;
          color: var(--muted);
          background: color-mix(in srgb, var(--line) 35%, transparent);
          border: 1px solid var(--line);
        }

        .card__foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .card__visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          background: var(--accent);
          box-shadow: 0 4px 14px -3px rgba(139, 92, 246, 0.5);
          transition: transform 0.2s ease, filter 0.2s ease;
          cursor: pointer;
        }

        .card__visit-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        /* Responsive */
        @media (max-width: 860px) {
          .card__main-content {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            min-height: auto;
          }
          .card__media {
            height: 200px;
            min-height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentsAlmanac;
