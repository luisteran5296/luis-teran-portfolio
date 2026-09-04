import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Layers, Award, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const CareerTimeline = () => {
  const { t } = useLanguage();

  const icons = [
    <Layers className="h-4 w-4 mr-2 text-primary" />,
    <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    <Award className="h-4 w-4 mr-2 text-primary" />,
    <Users className="h-4 w-4 mr-2 text-primary" />,
  ];

  const careerEvents = t.career.items.map((item, idx) => ({
    year: item.year,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    icon: icons[idx % icons.length],
  }));

  return (
    <div id="career" className="pt-8">
      <ScrollTimeline
        events={careerEvents}
        title={t.career.title}
        subtitle={t.career.subtitle}
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.12}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};

export default CareerTimeline;
