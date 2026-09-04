import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLanguage } from "../../context/LanguageContext";

const S = {
  baseVh: 8,          // floor: never pin a card higher than this
  peekPx: 34,         // vertical offset per card -> how much earlier cards peek above the next
  gapVh: 16,          // tight scroll length (vh) between cards -> cohesive stack without huge space
  revealPx: 280,      // distance over which an incoming card eases from "arriving" to "pinned"
  revealAt: 0.4,      // reveal card once 40% on screen
  persp: 1500,        // 3D perspective (px)
  arriveTilt: 12,     // deg incoming card is inclined as it rises
  buriedTilt: 2.5,    // deg each buried card reclines back per card stacked on top
  scaleStep: 0.025,   // how much each buried card shrinks per card on top
  dimStep: 0.02,      // how much each buried card dims per card on top
  liftPx: 3.5,        // how much each buried card tucks up per card on top
};

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export const ProjectsSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [activeCardNum, setActiveCardNum] = useState<number>(1);

  const cardsData = t.projects.items;
  const N = cardsData.length;

  const toggleSave = (id: string) => {
    setSaved((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
    let CARDH = 400;

    function layout() {
      if (!cards.length) return;
      const vh = window.innerHeight;
      CARDH = cards[0]?.offsetHeight || 400;
      // Centre the pile: middle card sits in viewport center, others fan around it
      const centred = (vh - CARDH) / 2 - ((N - 1) / 2) * S.peekPx;
      const base = Math.max(centred, (S.baseVh / 100) * vh);
      restTops = cards.map((el, i) => {
        const t = Math.round(base + i * S.peekPx);
        el.style.setProperty("--top", `${t}px`);
        return t;
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

      const risen: number[] = [];
      const tops: number[] = [];

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
        if (reduce) {
          el.style.transform = "";
          el.style.filter = "";
        } else {
          // Incline while arriving (eases to flat at pin), recline slightly once buried
          const rx = S.arriveTilt * (1 - risen[i]) - S.buriedTilt * b;
          el.style.transform = `perspective(${S.persp}px) translateY(${(-b * S.liftPx).toFixed(
            2
          )}px) rotateX(${rx.toFixed(2)}deg) scale(${(1 - S.scaleStep * b).toFixed(4)})`;
          el.style.filter = `brightness(${(1 - S.dimStep * b).toFixed(4)})`;
        }
        el.style.zIndex = String(10 + i);

        // Reveal card cover & text once ~half is on screen
        if (!shown[i] && tops[i] <= revealLine) {
          el.classList.add("-in");
          shown[i] = true;
        } else if (shown[i] && tops[i] >= hideLine) {
          el.classList.remove("-in");
          shown[i] = false;
        }
        suffix += risen[i];
      }

      const cur = clamp(Math.round(risen.reduce((a, r) => a + r, 0)), 1, N);
      if (cur !== lastCur) {
        lastCur = cur;
        setActiveCardNum(cur);
        const live = document.getElementById("almanac-live");
        if (live) live.textContent = `Card ${cur} of ${N}: ${cardsData[cur - 1]?.title || ""}`;
      }
    }

    function onScroll() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }

    // Pre-arm visible cards on mount
    cards.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("-in");
        shown[i] = true;
      }
    });

    window.addEventListener("resize", () => {
      layout();
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    layout();
    update();

    return () => {
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [cardsData, N]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="almanac-section"
      aria-label="Productos IA — Stack Almanac de Proyectos"
    >
      {/* Intro Header */}
      <div className="intro">
        <p className="intro__eyebrow" id="introEyebrow">
          <Sparkles className="w-3.5 h-3.5 inline-block mr-1 text-primary" />
          {t.projects.eyebrow}
        </p>
        <h2 className="intro__title" id="introTitle">
          {locale === "es" ? (
            <>
              Productos <span className="text-gradient-primary italic">IA</span>
            </>
          ) : (
            <>
              AI <span className="text-gradient-primary italic">Products</span>
            </>
          )}
        </h2>
        <p className="intro__sub" id="introSub">
          {t.projects.subtitle}
        </p>
      </div>

      {/* The Stack */}
      <div className="stack" id="stack">
        {cardsData.map((card, idx) => {
          const formattedIdx = `${String(idx + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
          const isSaved = !!saved[card.id];

          return (
            <article
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="card group"
              onClick={() => {
                // If user clicks on a peeking card in the stack, smoothly bring it forward
                if (activeCardNum !== idx + 1) {
                  scrollToCard(idx);
                }
              }}
            >
              {/* Stack Peek Tab Header: visible when card is layered behind */}
              <div className="card__peek-tab">
                <span className="card__peek-idx">{formattedIdx}</span>
                <span className="card__peek-title">{card.title}</span>
                <span className="card__peek-tag">{card.category}</span>
              </div>

              {/* Main Card Content Container */}
              <div className="card__main-content">
                {/* Media Column */}
                <div className="card__media">
                  <div
                    className="card__cover"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="card__media-hover">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="card__media-cta"
                      title={`Abrir ${card.title} en nueva pestaña`}
                    >
                      <span>{locale === "es" ? "Abrir Plataforma" : "Open Platform"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Body Column */}
                <div className="card__body">
                  <div className="card__meta-top">
                    <span className="card__date">
                      {formattedIdx} · {card.kicker}
                    </span>
                    <span className="card__category-badge">{card.category}</span>
                  </div>

                  <div className="card__title-row">
                    <h3 className="card__heading">{card.title}</h3>
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="card__heading-link"
                      title={`Visitar ${card.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="card__subheading">{card.subtitle}</p>
                  <p className="card__text">{card.description}</p>

                  {/* Tech Pills */}
                  <div className="card__pills">
                    {card.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="card__pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Foot Row */}
                <div className="card__foot">
                  <div className="flex items-center gap-2">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="card__visit-btn"
                    >
                      <span>{locale === "es" ? "Visitar Producto" : "Visit Product"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      className="card__tag"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(card.link, "_blank", "noopener,noreferrer");
                      }}
                    >
                      {card.category.split("·")[0].trim()}
                    </button>
                  </div>

                  {/* Bookmark Save Button */}
                  <button
                    className={`card__add ${isSaved ? "-saved" : ""}`}
                    type="button"
                    aria-label={isSaved ? "Guardado en favoritos" : "Guardar este producto"}
                    aria-pressed={isSaved}
                    title={isSaved ? "Quitar de favoritos" : "Guardar producto"}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(card.id);
                    }}
                  >
                    {/* PLUS */}
                    <svg
                      className="i-plus"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    {/* CHECK */}
                    <svg
                      className="i-check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tail Spacer: scroll room so last card fully rises & rests on top */}
      <div className="tail" aria-hidden="true" />

      {/* Screen Reader Live Region */}
      <div className="sr" id="almanac-live" aria-live="polite" />

      {/* Cards Almanac Styles */}
      <style>{`
        .almanac-section {
          --bg: var(--background);
          --card: var(--card);
          --ink: var(--foreground);
          --muted: var(--muted-foreground);
          --faint: rgba(148, 163, 184, 0.65);
          --line: var(--border);
          --accent: #8b5cf6;
          --gap: clamp(70px, 15vh, 130px);

          position: relative;
          min-height: 100svh;
          padding: 0 clamp(16px, 4vw, 40px) clamp(50px, 10vh, 120px);
          user-select: none;
        }

        /* Intro */
        .intro {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
          padding: clamp(40px, 7vh, 80px) 0 clamp(16px, 2.5vh, 28px);
        }
        .intro__eyebrow {
          font: 600 12px/1 ui-monospace, "SF Mono", Menlo, monospace;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .intro__title {
          margin: 0;
          font-size: clamp(36px, 5.8vw, 68px);
          font-weight: 800;
          letter-spacing: -.035em;
          line-height: .98;
          color: var(--ink);
        }
        .intro__sub {
          margin: 14px auto 0;
          max-width: 48ch;
          color: var(--muted);
          font-size: clamp(14px, 1.25vw, 16px);
          line-height: 1.55;
        }

        /* The Stack */
        .stack {
          width: min(86vw, 1020px);
          margin: 0 auto;
          position: relative;
        }

        .card {
          position: sticky;
          top: var(--top, 92px);
          margin: 0 0 var(--gap, 15vh);
          background: var(--card);
          border-radius: clamp(18px, 2vw, 26px);
          border: 1px solid var(--line);
          box-shadow:
            0 2px 8px rgba(0,0,0,0.05),
            0 28px 56px -20px rgba(0,0,0,0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding: 0;
          overflow: hidden;
          min-height: clamp(300px, 44vh, 460px);
          transform-origin: 50% 0;
          will-change: transform, filter;
          cursor: pointer;
        }

        .card:last-child {
          margin-bottom: 0;
        }

        .tail {
          height: clamp(36vh, 46vh, 58vh);
        }

        /* Stack Peek Tab Header (shows at the top when cards stack) */
        .card__peek-tab {
          height: 32px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid color-mix(in srgb, var(--line) 40%, transparent);
          background: color-mix(in srgb, var(--line) 15%, transparent);
          font: 700 11px/1 ui-monospace, monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .card__peek-idx {
          color: var(--accent);
        }
        .card__peek-title {
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.04em;
        }
        .card__peek-tag {
          color: var(--muted);
          font-size: 10px;
          opacity: 0.8;
        }

        /* Main Card Content Container */
        .card__main-content {
          padding: clamp(14px, 1.5vw, 22px);
          display: grid;
          grid-template-columns: minmax(200px, 42%) 1fr;
          grid-template-rows: 1fr auto;
          gap: clamp(16px, 1.6vw, 26px);
          min-height: calc(clamp(300px, 44vh, 460px) - 32px);
        }

        /* Card Media */
        .card__media {
          grid-column: 1;
          grid-row: 1 / span 2;
          position: relative;
          border-radius: clamp(12px, 1.3vw, 18px);
          overflow: hidden;
          min-height: 200px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
          background: #090d16;
        }

        .card__cover {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: top center;
          transform-origin: center;
          will-change: transform;
          transform: scale(1.12);
          transition: transform 1.15s cubic-bezier(.2,.7,.2,1);
        }

        .card__media-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,14,24,0.85) 0%, rgba(10,14,24,0.15) 60%, transparent 100%);
          display: flex;
          align-items: flex-end;
          padding: 14px;
          opacity: 0;
          transition: opacity .3s ease;
        }
        .card:hover .card__media-hover {
          opacity: 1;
        }

        .card__media-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          color: #ffffff;
          background: rgba(139, 92, 246, 0.9);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: transform .2s ease, background .2s ease;
        }
        .card__media-cta:hover {
          transform: translateY(-2px);
          background: #7c3aed;
        }

        /* Card Body */
        .card__body {
          grid-column: 2;
          grid-row: 1;
          padding: 2px clamp(4px, 1vw, 10px) 0 0;
          display: flex;
          flex-direction: column;
        }

        .card__meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: clamp(8px, 1vw, 14px);
        }

        .card__date {
          margin: 0;
          font: 700 11px/1 ui-monospace, monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--faint);
        }

        .card__category-badge {
          font: 700 10px/1 ui-monospace, monospace;
          letter-spacing: .08em;
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
          font-size: clamp(22px, 2.3vw, 32px);
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1.1;
          color: var(--ink);
        }

        .card__heading-link {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          background: rgba(140, 150, 170, 0.08);
          border: 1px solid var(--line);
          transition: transform .2s ease, color .2s ease, background .2s ease;
        }
        .card__heading-link:hover {
          color: var(--accent);
          transform: scale(1.1);
          background: color-mix(in srgb, var(--accent) 15%, transparent);
        }

        .card__subheading {
          margin: 4px 0 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
        }

        .card__text {
          margin: 0;
          max-width: 48ch;
          font-size: clamp(13.5px, 1.15vw, 15.5px);
          line-height: 1.5;
          font-weight: 450;
          letter-spacing: -.01em;
          color: var(--ink);
          opacity: 0.9;
        }

        .card__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 12px;
        }

        .card__pill {
          font: 600 10.5px/1 ui-monospace, monospace;
          padding: 3.5px 8px;
          border-radius: 999px;
          color: var(--muted);
          background: color-mix(in srgb, var(--line) 35%, transparent);
          border: 1px solid var(--line);
        }

        /* Card Foot */
        .card__foot {
          grid-column: 2;
          grid-row: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 clamp(4px, 1vw, 8px) 2px 0;
          border-top: 1px solid color-mix(in srgb, var(--line) 50%, transparent);
          padding-top: 12px;
        }

        .card__visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          background: var(--ink);
          box-shadow: 0 4px 12px -3px rgba(0,0,0,0.3);
          transition: transform .2s ease, background .2s ease;
          cursor: pointer;
        }
        .card__visit-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .card__tag {
          border: 0;
          cursor: pointer;
          padding: 7px 13px;
          border-radius: 999px;
          font: 600 11.5px/1 ui-monospace, monospace;
          color: var(--muted);
          background: color-mix(in srgb, var(--line) 30%, transparent);
          border: 1px solid var(--line);
          transition: background .18s ease, color .18s ease;
        }
        .card__tag:hover {
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          color: var(--accent);
          border-color: var(--accent);
        }

        .card__add {
          flex: none;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          color: #fff;
          background: var(--ink);
          transition: background .22s ease, transform .18s ease;
        }
        .card__add:hover {
          transform: scale(1.08);
        }
        .card__add:active {
          transform: scale(.94);
        }
        .card__add.-saved {
          background: var(--accent);
        }
        .card__add svg {
          width: 16px;
          height: 16px;
        }
        .card__add .i-check {
          display: none;
        }
        .card__add.-saved .i-plus {
          display: none;
        }
        .card__add.-saved .i-check {
          display: block;
        }

        .card__tag:focus-visible, .card__add:focus-visible, .card__visit-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        /* Reveal-on-arrival — JS toggles .-in when card reaches its pin */
        .card__date, .card__heading, .card__subheading, .card__text, .card__pills, .card__foot {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .5s ease, transform .55s cubic-bezier(.2,.7,.2,1);
        }
        .card.-in .card__cover {
          transform: scale(1);
        }
        .card.-in .card__date {
          opacity: 1;
          transform: none;
          transition-delay: .08s;
        }
        .card.-in .card__heading, .card.-in .card__subheading {
          opacity: 1;
          transform: none;
          transition-delay: .14s;
        }
        .card.-in .card__text {
          opacity: 0.9;
          transform: none;
          transition-delay: .2s;
        }
        .card.-in .card__pills {
          opacity: 1;
          transform: none;
          transition-delay: .24s;
        }
        .card.-in .card__foot {
          opacity: 1;
          transform: none;
          transition-delay: .28s;
        }

        .sr {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
        }

        /* Tablet */
        @media (max-width: 960px) {
          .stack {
            width: 88vw;
          }
          .card__main-content {
            grid-template-columns: minmax(170px, 38%) 1fr;
            min-height: clamp(280px, 40vh, 420px);
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .stack {
            width: 92vw;
          }
          .card {
            min-height: 0;
            border-radius: 20px;
          }
          .card__peek-tab {
            height: 28px;
            padding: 0 14px;
            font-size: 10px;
          }
          .card__main-content {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            min-height: 0;
            gap: 12px;
            padding: 12px;
          }
          .card__media {
            grid-column: 1;
            grid-row: 1;
            aspect-ratio: 16 / 10;
            min-height: 0;
          }
          .card__body {
            grid-column: 1;
            grid-row: 2;
            padding: 0 2px;
          }
          .card__foot {
            grid-column: 1;
            grid-row: 3;
            padding: 8px 2px 0;
          }
          .card__text {
            font-size: 14px;
            max-width: none;
          }
          .card__heading {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card__cover {
            transform: none !important;
            transition: none !important;
          }
          .card__date, .card__heading, .card__subheading, .card__text, .card__pills, .card__foot {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;

