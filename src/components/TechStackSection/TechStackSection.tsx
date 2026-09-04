import { motion } from "framer-motion";
import { Bot, Sparkles, Brain, Cpu, Database } from "lucide-react";

interface TechItem {
  name: string;
  icon?: string;
  lucideIcon?: any;
  customColor?: string;
}

const technologies: TechItem[] = [
  { name: "Agentes de IA", lucideIcon: Bot, customColor: "text-purple-400" },
  { name: "LLMs & GenAI", lucideIcon: Sparkles, customColor: "text-amber-400" },
  { name: "Gemini 2.5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
  { name: "Google Genkit", lucideIcon: Cpu, customColor: "text-cyan-400" },
  { name: "LangChain", lucideIcon: Brain, customColor: "text-emerald-400" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Vertex AI & GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
  { name: "Vector DBs", lucideIcon: Database, customColor: "text-rose-400" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "BigQuery & SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Next.js & React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
];

export const TechStackSection = () => {
  return (
    <div className="w-full py-6 border-t border-b border-foreground/10 bg-foreground/[0.02] flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden relative flex items-center"
      >
        {/* Gradients to fade edges */}
        <div className="absolute left-0 w-24 md:w-36 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-24 md:w-36 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Animation */}
        <div className="flex w-max animate-[marquee_38s_linear_infinite] whitespace-nowrap items-center hover:[animation-play-state:paused] py-1">
          {[...technologies, ...technologies].map((tech, i) => {
            const LucideIcon = tech.lucideIcon;
            return (
              <div 
                key={i} 
                className="mx-2.5 px-4 py-2 rounded-full border border-foreground/10 bg-background/80 text-foreground font-medium text-xs md:text-sm flex items-center gap-2.5 transition-all hover:scale-105 hover:border-primary/50 hover:bg-foreground/5 cursor-default shadow-sm group shrink-0"
              >
                {tech.icon ? (
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-4 h-4 md:w-5 md:h-5 object-contain group-hover:scale-110 transition-transform duration-300" 
                    loading="lazy"
                    decoding="async" 
                  />
                ) : LucideIcon ? (
                  <LucideIcon className={`w-4 h-4 md:w-4.5 md:h-4.5 ${tech.customColor || 'text-primary'}`} />
                ) : null}
                <span className="tracking-wide">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default TechStackSection;
