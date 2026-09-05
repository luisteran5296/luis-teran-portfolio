import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Linkedin, Github, FileText } from "lucide-react";
import TechStackSection from "../TechStackSection/TechStackSection";
import { Button } from "../lightswind/button";
import { Badge } from "../lightswind/badge";
import { HangingIdCard } from "../lightswind/HangingIdCard";
import { AuroraTextEffect } from "../lightswind/aurora-text-effect";
import { DotPattern } from "../lightswind/dot-pattern";
import { useLanguage } from "../../context/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col pt-16 md:pt-20 overflow-hidden bg-background">
      {/* Background Dot Pattern with Radial Glow */}
      <DotPattern width={18} height={18} cx={1} cy={1} cr={1} glow />
      
      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 pb-12 pt-8">
        
        {/* Left Content */}
        <motion.div 
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-5"
          >
            <Badge variant="outline" size="lg" className="gap-2.5 py-1.5 px-4 glass-panel border-foreground/10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-foreground">{t.hero.badge}</span>
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-center lg:text-left w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
              {t.hero.greeting}
            </h1>
            
            {/* Light Theme: Vibrant Gradient Text */}
            <div className="block dark:hidden">
              <span className="bg-gradient-to-r from-violet-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent font-extrabold text-[clamp(2.8rem,6vw,5rem)] leading-none tracking-tight block pb-2 select-none">
                {t.hero.name}
              </span>
            </div>

            {/* Dark Theme: Rich Lightswind Aurora Text Effect */}
            <div className="hidden dark:block">
              <AuroraTextEffect
                text={t.hero.name}
                fontSize="clamp(2.8rem, 6vw, 5rem)"
                className="bg-transparent overflow-visible p-0 justify-start"
                textClassName="bg-gradient-to-r from-cyan-400 via-purple-400 to-sky-300 bg-clip-text text-transparent pb-2 font-extrabold"
              />
            </div>

            <div className="inline-block mt-2">
              <span className="text-sm md:text-base font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
                {t.hero.title}
              </span>
            </div>
          </motion.div>

          <motion.p 
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div 
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full lg:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection("projects")}
              className="rounded-full px-7 h-12 bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1 cursor-pointer"
            >
              {t.hero.viewWork} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-7 h-12 glass-panel text-foreground font-semibold flex items-center gap-2 hover:bg-foreground/10 transition-all hover:-translate-y-1 border-foreground/10 cursor-pointer"
            >
              {t.hero.contactBtn} <Mail className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              onClick={() => scrollToSection("career")}
              className="rounded-full px-6 h-12 text-foreground/80 hover:text-foreground hover:bg-foreground/5 font-semibold flex items-center gap-2 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-primary" /> {t.hero.downloadCv}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex flex-wrap items-center gap-3 justify-center lg:justify-start w-full lg:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="mailto:luisteran5296@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 flex items-center gap-2 text-xs font-semibold"
              title="Email"
            >
              <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-foreground/10">
                <Mail className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">luisteran5296@gmail.com</span>
            </a>
            <a 
              href="tel:+525573652856" 
              className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 flex items-center gap-2 text-xs font-semibold"
              title="Phone"
            >
              <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-foreground/10">
                <Phone className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">+52 55 7365 2856</span>
            </a>
            <a 
              href={t.socials.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 flex items-center gap-2 text-xs font-semibold"
              title="LinkedIn"
            >
              <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-foreground/10">
                <Linkedin className="w-4 h-4" />
              </div>
            </a>
            <a 
              href={t.socials.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 flex items-center gap-2 text-xs font-semibold"
              title="GitHub"
            >
              <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center border border-foreground/10">
                <Github className="w-4 h-4" />
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Visual Hanging ID Card */}
        <motion.div 
          className="flex-1 w-full max-w-md relative flex justify-center items-center py-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HangingIdCard
            name={t.hero.hangingCard.name}
            role={t.hero.hangingCard.role}
            badgeId={t.hero.hangingCard.badgeId}
            accentColor="#8b5cf6"
            ropeLength={70}
            ropeColor="#27272a"
            cardWidth="w-72 sm:w-80 md:w-84"
          >
            <div className="flex flex-col h-full bg-card w-full">
              {/* Card Header Banner with Avatar */}
              <div className="relative px-5 pt-7 pb-6 flex flex-col items-center bg-gradient-to-br from-purple-700 via-primary to-indigo-950 text-white overflow-hidden">
                {/* Circuit background overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {/* Profile Photo with Dual Glowing Ring */}
                <div className="mt-1 relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 backdrop-blur-md shadow-2xl border border-white/50 overflow-hidden flex items-center justify-center group">
                  <img 
                    src="/avatar/luis-teran.png" 
                    alt="Luis Terán" 
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                    loading="eager"
                  />
                  <div className="absolute bottom-1.5 right-2.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-md z-10" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col items-center text-center bg-card text-card-foreground flex-1 gap-3">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">{t.hero.hangingCard.name}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
                    <span>{t.hero.hangingCard.role}</span>
                  </div>
                </div>

                <div className="w-full border-t border-border/60 my-0.5" />

                {/* Details 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2.5 w-full text-left bg-muted/40 p-3 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Specialty</span>
                    <span className="font-bold text-foreground text-xs">{t.hero.hangingCard.specialty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Location</span>
                    <span className="font-bold text-foreground text-xs">{t.hero.hangingCard.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Experience</span>
                    <span className="font-bold text-foreground text-xs">{t.hero.hangingCard.experience}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Status</span>
                    <span className="font-bold text-emerald-500 text-xs flex items-center gap-1">
                      {t.hero.hangingCard.status}
                    </span>
                  </div>
                </div>

                {/* HD Barcode & Auth Tag */}
                <div className="flex flex-col items-center mt-1 w-full gap-1">
                  <div className="flex gap-[2.5px] items-end h-6 px-3 py-0.5 bg-white/90 dark:bg-black/40 rounded-lg border border-border/40 w-full justify-center">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-foreground rounded-[1px]"
                        style={{
                          width: i % 4 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                          height: `${50 + Math.sin(i * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full px-1 text-[10px]">
                    <span className="font-mono font-bold tracking-widest text-primary">
                      {t.hero.hangingCard.badgeId}
                    </span>
                    <span className="text-muted-foreground font-semibold text-[9px] uppercase tracking-wider">
                      {t.hero.hangingCard.authTag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </HangingIdCard>
        </motion.div>

      </div>

      {/* Marquee appended natively to the bottom to span Full Width */}
      <div className="w-full relative z-10 mt-auto">
        <TechStackSection />
      </div>
    </section>
  );
};

export default HeroSection;
