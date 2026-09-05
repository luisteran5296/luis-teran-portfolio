import { motion } from "framer-motion";
import { Cpu, Brain, Cloud, Layout } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { useLanguage } from "../../context/LanguageContext";
import { AgentsAlmanac } from "./AgentsAlmanac";

export const ServicesSection = () => {
  const { t } = useLanguage();

  const iconMap: Record<string, any> = {
    Cpu,
    Brain,
    Cloud,
    Layout,
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-20 pb-8 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          {t.nav.services}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary">
          {t.services.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          {t.services.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {t.services.items.map((service, i) => {
          const Icon = iconMap[service.iconName] || Cpu;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <MagicCard
                className="h-full p-8 rounded-[2rem] border border-border/80 bg-card/80 shadow-lg"
                gradientSize={280}
                gradientColor="rgba(139, 92, 246, 0.14)"
                gradientFrom="#8b5cf6"
                gradientTo="#38bdf8"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    {/* Consistent Icon Styling with signature primary color */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>

      {/* Flagship Enterprise AI Agents: Cards Almanac Sticky Stack */}
      <AgentsAlmanac />
    </section>
  );
};

export default ServicesSection;
