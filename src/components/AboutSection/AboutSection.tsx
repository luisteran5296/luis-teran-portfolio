import { motion } from "framer-motion";
import { Brain, Cloud, Rocket, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const AboutSection = () => {
  const { t } = useLanguage();

  const statIcons = [
    <Brain className="w-6 h-6" />,
    <Rocket className="w-6 h-6" />,
    <Cloud className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col lg:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            {t.nav.about}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t.about.headingPre} <span className="text-gradient-primary">{t.about.headingHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.about.description}
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {t.about.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-panel p-6 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all group relative overflow-hidden shadow-md hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors pointer-events-none" />
              <div className="text-primary mb-4 p-3 bg-primary/10 w-max rounded-xl">
                {statIcons[i % statIcons.length]}
              </div>
              <h3 className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
