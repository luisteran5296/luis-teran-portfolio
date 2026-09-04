export type Locale = "en" | "es";

export interface HeroMediaConfig {
  src: string;
  poster?: string;
  type?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  workflow: string[];
  role: string;
  capabilities: string[];
  image: string;
  url: string;
  year: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  context?: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  period: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SiteContent {
  locale: Locale;
  nav: { projects: string; expertise: string; experience: string; contact: string };
  languageLabel: string;
  hero: {
    eyebrow: string;
    name: string;
    title: string;
    description: string;
    labels: [string, string, string];
  };
  projects: {
    eyebrow: string;
    titleMuted: string;
    titleStrong: string;
    intro: string;
    visit: string;
    problemLabel: string;
    solutionLabel: string;
    workflowLabel: string;
    roleLabel: string;
    capabilitiesLabel: string;
    items: ProjectCaseStudy[];
  };
  expertise: {
    eyebrow: string;
    titleMuted: string;
    titleStrong: string;
    lead: string;
    groups: SkillGroup[];
    principles: { title: string; body: string }[];
  };
  experience: {
    eyebrow: string;
    titleMuted: string;
    titleStrong: string;
    intro: string;
    items: ExperienceItem[];
  };
  credentials: {
    eyebrow: string;
    title: string;
    items: Credential[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    emailLabel: string;
  };
}

export const heroVideo: HeroMediaConfig = {
  // To replace the video, add a file to public/media and set this to "/media/your-video.mp4".
  src: "https://firebasestorage.googleapis.com/v0/b/genovideoapp.appspot.com/o/test%2FHumanoid_figure_moving_head_202609010523.mp4?alt=media&token=0f538c27-d3ee-4ac1-897a-90ae7faab773",
  type: "video/mp4",
};

const projectImages = {
  gymgineer: "/projects/gymgineer-hero.png",
  voxify: "/projects/voxify-hero.png",
  genovideo: "/projects/genovideo-hero.png",
  inkredo: "/projects/inkredo-hero.png",
  opinizoom: "/projects/opinizoom-hero.png",
};

export const content: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    nav: { projects: "Projects", expertise: "Expertise", experience: "Experience", contact: "Contact" },
    languageLabel: "ES",
    hero: {
      eyebrow: "Independent AI product builder",
      name: "Luis Terán",
      title: "Data Scientist / Applied AI Specialist",
      description: "I turn data, models, and cloud systems into AI products people can actually use.",
      labels: ["Machine Learning", "Applied AI", "Cloud Data"],
    },
    projects: {
      eyebrow: "Independent products",
      titleMuted: "Applied AI,",
      titleStrong: "shipped into the real world",
      intro: "Five independent AI products built from the ground up — covering architecture design, database modeling, data processing pipelines, AI integration, and cloud deployment.",
      visit: "Visit product",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      workflowLabel: "AI workflow",
      roleLabel: "My role",
      capabilitiesLabel: "Verified capabilities",
      items: [
        {
          slug: "gymgineer",
          name: "Gymgineer",
          category: "Computer Vision · AI Planning",
          problem: "Workout plans often assume fixed equipment and ideal training conditions.",
          solution: "A mobile AI trainer that recognizes available equipment and generates routines around goals, constraints, and training history.",
          workflow: ["Scan equipment", "Capture goals and constraints", "Generate an equipment-aware plan", "Track progress and adapt"],
          role: "Independent project covering system architecture, database modeling, computer vision pipelines, AI planning logic (Gemini 2.5 & Genkit), and serverless cloud deployment on GCP/Firebase.",
          capabilities: ["Gemini 2.5 Flash", "Google Genkit", "OpenAI Agents", "Computer vision", "Retrieval-aware planning"],
          image: projectImages.gymgineer,
          url: "https://gymgineer.com/",
          year: "2024–2026",
        },
        {
          slug: "voxify",
          name: "Voxify",
          category: "Generative Audio · Localization",
          problem: "Producing expressive multilingual narration is slow when every revision requires new recording work.",
          solution: "A browser-based text-to-speech product for configurable voiceovers across languages, accents, and delivery styles.",
          workflow: ["Write or segment a script", "Choose voices and locale", "Tune emotion, pitch, and speed", "Preview and export audio"],
          role: "Full-cycle development including architecture design, database flow, audio chunking & processing pipelines, voice service integration, and cloud hosting.",
          capabilities: ["450+ voices", "140+ languages and accents", "Emotion controls", "Segment editing", "Audio export"],
          image: projectImages.voxify,
          url: "https://voxify.ai/features",
          year: "2024–2026",
        },
        {
          slug: "genovideo",
          name: "Genovideo",
          category: "Text to Video · Generative Media",
          problem: "Short-form video production requires coordinating scripts, narration, footage, and repeated edits.",
          solution: "A Spanish-first platform that turns text into narrated social videos with editable scripts, voices, and visual selections.",
          workflow: ["Provide source text", "Select voice and language", "Assemble matching visuals", "Edit and produce social video"],
          role: "End-to-end development: system design, database schemas, generative pipelines (scripting, voice synthesis, video assembly), media processing, and cloud deployment.",
          capabilities: ["Text-to-video", "450+ voices", "120+ languages and accents", "Reels and shorts", "Editable output"],
          image: projectImages.genovideo,
          url: "https://genovideo.com/features",
          year: "2024–2026",
        },
        {
          slug: "inkredo",
          name: "Inkredo",
          category: "AI Research · Content Automation",
          problem: "Newsletter teams spend hours researching, drafting, formatting, and scheduling each issue.",
          solution: "An AI newsletter product that researches a topic, drafts an issue in the brand voice, and supports scheduling and distribution.",
          workflow: ["Define a topic", "Research current sources", "Generate and edit the issue", "Schedule and measure distribution"],
          role: "Full-cycle implementation: system architecture, database design, research data ingestion pipelines, brand-voice LLM orchestration, and automated cloud scheduling.",
          capabilities: ["AI research", "Content generation", "Brand voice", "Scheduling", "Analytics dashboard"],
          image: projectImages.inkredo,
          url: "https://inkredo.com/",
          year: "2024–2026",
        },
        {
          slug: "opinizoom",
          name: "Opinizoom",
          category: "NLP · Text Analytics",
          problem: "Teams with survey and review data often need code or manual work to understand recurring themes and sentiment.",
          solution: "A no-code analysis tool that processes CSV and Excel feedback into topics, sentiment patterns, and useful statistics.",
          workflow: ["Upload CSV or Excel", "Detect topics and sentiment", "Explore patterns and statistics", "Export structured results"],
          role: "End-to-end build covering product architecture, database and storage workflows, unstructured text preprocessing, NLP topic & sentiment models, and cloud infrastructure.",
          capabilities: ["Topic extraction", "Sentiment analysis", "CSV and Excel", "Summary statistics", "Data export"],
          image: projectImages.opinizoom,
          url: "https://opinizoom.com/",
          year: "2024",
        },
      ],
    },
    expertise: {
      eyebrow: "Expertise",
      titleMuted: "From model",
      titleStrong: "to dependable product",
      lead: "My work sits where data science, product engineering, and cloud architecture meet. I focus on systems that are useful, observable, and ready to evolve.",
      groups: [
        { label: "AI & models", items: ["Machine Learning", "Deep Learning", "Generative AI", "AI Agents", "NLP", "Computer Vision"] },
        { label: "Cloud & data", items: ["Google Cloud Platform", "AWS", "BigQuery", "Vertex AI", "Cloud Run", "Firebase", "Serverless architecture"] },
        { label: "Engineering", items: ["Python", "SQL", "R", "APIs", "Containers", "Automation", "Data pipelines"] },
        { label: "Analytics", items: ["Tableau", "Power BI", "Excel", "Executive dashboards", "Product measurement", "Google Analytics"] },
      ],
      principles: [
        { title: "Product thinking", body: "Start with a real decision or workflow, then choose the simplest AI system that improves it." },
        { title: "End-to-end delivery", body: "Connect data, models, interfaces, deployment, and measurement into one coherent product loop." },
        { title: "Evidence over theater", body: "Communicate what a system actually does, where it helps, and what remains uncertain." },
      ],
    },
    experience: {
      eyebrow: "Professional experience",
      titleMuted: "Data work",
      titleStrong: "with operational consequences",
      intro: "More than five years applying analytics, machine learning, and cloud systems in streaming, aviation, loyalty, and education.",
      items: [
        { role: "Data Scientist / AI Specialist", company: "HITSS", context: "Consulting for Claro video", period: "2024 — present", summary: "Applied AI and cloud services for development support and operational automation.", highlights: ["Implemented AI agents for repetitive development and operational workflows.", "Deployed managed container services on Google Cloud Run.", "Connected Vertex AI, BigQuery, SQL, and stored procedures in production data workflows."] },
        { role: "Data & Analytics Specialist", company: "Aeroméxico", period: "Jul 2022 — 2024", summary: "Customer analytics, activity forecasting, and automated operational reporting.", highlights: ["Analyzed customer behavior to support commercial and operational decisions.", "Maintained machine-learning forecasting algorithms.", "Processed data in AWS and created automated Tableau KPI dashboards."] },
        { role: "Data Scientist", company: "Club Premier", period: "Dec 2020 — Jul 2022", summary: "Customer and loyalty analytics translated into business-facing reports and models.", highlights: ["Developed and maintained customer-oriented machine-learning models.", "Communicated findings through reports for business stakeholders."] },
        { role: "Data Science Tutor", company: "Coderhouse", period: "Nov 2022 — Nov 2023", summary: "Academic guidance and assessment for working data-science students.", highlights: ["Reviewed concepts, advised students, and evaluated project submissions."] },
      ],
    },
    credentials: {
      eyebrow: "Education & credentials",
      title: "A quantitative foundation for applied work",
      items: [
        { title: "Geophysical Engineering", issuer: "National Autonomous University of Mexico (UNAM)", period: "2015 — 2020" },
        { title: "Data Science Professional Certificate", issuer: "IBM", period: "2020" },
        { title: "Data Science Specialization", issuer: "Coursera", period: "2019 — 2020" },
      ],
    },
    contact: {
      eyebrow: "Remote collaboration",
      title: "Let’s build something useful",
      body: "Open to remote roles and collaborations in Data Science, Machine Learning, Applied AI, and Cloud Data.",
      email: "luisteran5296@gmail.com",
      emailLabel: "Email me",
    },
  },
  es: {
    locale: "es",
    nav: { projects: "Proyectos", expertise: "Especialidad", experience: "Experiencia", contact: "Contacto" },
    languageLabel: "EN",
    hero: {
      eyebrow: "Creador independiente de productos de IA",
      name: "Luis Terán",
      title: "Científico de Datos / Especialista en IA Aplicada",
      description: "Convierto datos, modelos y sistemas cloud en productos de IA que las personas realmente pueden usar.",
      labels: ["Machine Learning", "IA Aplicada", "Datos en Cloud"],
    },
    projects: {
      eyebrow: "Productos independientes",
      titleMuted: "IA aplicada,",
      titleStrong: "llevada al mundo real",
      intro: "Cinco proyectos independientes desarrollados de principio a fin — abarcando diseño de arquitectura, modelado de bases de datos, pipelines de procesamiento, integración de IA y despliegue en la nube.",
      visit: "Visitar producto",
      problemLabel: "Problema",
      solutionLabel: "Solución",
      workflowLabel: "Flujo de IA",
      roleLabel: "Mi rol",
      capabilitiesLabel: "Capacidades verificadas",
      items: [],
    },
    expertise: {
      eyebrow: "Especialidad",
      titleMuted: "Del modelo",
      titleStrong: "a un producto confiable",
      lead: "Mi trabajo está en la intersección de ciencia de datos, ingeniería de producto y arquitectura cloud. Me enfoco en sistemas útiles, observables y preparados para evolucionar.",
      groups: [
        { label: "IA y modelos", items: ["Machine Learning", "Deep Learning", "IA Generativa", "Agentes de IA", "NLP", "Visión por computadora"] },
        { label: "Cloud y datos", items: ["Google Cloud Platform", "AWS", "BigQuery", "Vertex AI", "Cloud Run", "Firebase", "Arquitectura serverless"] },
        { label: "Ingeniería", items: ["Python", "SQL", "R", "APIs", "Contenedores", "Automatización", "Flujos de datos"] },
        { label: "Analítica", items: ["Tableau", "Power BI", "Excel", "Dashboards ejecutivos", "Medición de producto", "Google Analytics"] },
      ],
      principles: [
        { title: "Pensamiento de producto", body: "Partir de una decisión o flujo real y elegir el sistema de IA más simple que lo mejore." },
        { title: "Entrega de extremo a extremo", body: "Conectar datos, modelos, interfaces, despliegue y medición en un mismo ciclo de producto." },
        { title: "Evidencia sobre espectáculo", body: "Comunicar qué hace realmente un sistema, dónde ayuda y qué permanece incierto." },
      ],
    },
    experience: {
      eyebrow: "Experiencia profesional",
      titleMuted: "Trabajo con datos",
      titleStrong: "que impacta operaciones",
      intro: "Más de cinco años aplicando analítica, machine learning y sistemas cloud en streaming, aviación, lealtad y educación.",
      items: [],
    },
    credentials: {
      eyebrow: "Educación y credenciales",
      title: "Una base cuantitativa para el trabajo aplicado",
      items: [
        { title: "Ingeniería Geofísica", issuer: "Universidad Nacional Autónoma de México (UNAM)", period: "2015 — 2020" },
        { title: "Data Science Professional Certificate", issuer: "IBM", period: "2020" },
        { title: "Data Science Specialization", issuer: "Coursera", period: "2019 — 2020" },
      ],
    },
    contact: {
      eyebrow: "Colaboración remota",
      title: "Construyamos algo útil",
      body: "Disponible para roles remotos y colaboraciones en Ciencia de Datos, Machine Learning, IA Aplicada y Datos en Cloud.",
      email: "luisteran5296@gmail.com",
      emailLabel: "Enviar correo",
    },
  },
};

content.es.projects.items = [
  { ...content.en.projects.items[0], category: "Visión por computadora · Planeación con IA", problem: "Los planes de entrenamiento suelen asumir equipo fijo y condiciones ideales.", solution: "Un entrenador móvil con IA que reconoce el equipo disponible y genera rutinas según objetivos, restricciones e historial.", workflow: ["Escanear el equipo", "Capturar objetivos y restricciones", "Generar un plan adaptado", "Registrar progreso y ajustar"], role: "Desarrollo independiente de principio a fin: diseño de arquitectura, modelado de base de datos, pipelines de visión por computadora, lógica de IA (Gemini 2.5 y Genkit) y despliegue serverless en GCP/Firebase.", capabilities: ["Gemini 2.5 Flash", "Google Genkit", "OpenAI Agents", "Visión por computadora", "Planeación con recuperación"] },
  { ...content.en.projects.items[1], category: "Audio generativo · Localización", problem: "Producir narración expresiva y multilingüe es lento cuando cada cambio requiere una nueva grabación.", solution: "Un producto web de texto a voz para crear locuciones configurables por idioma, acento y estilo de entrega.", workflow: ["Escribir o segmentar el guion", "Elegir voces e idioma", "Ajustar emoción, tono y velocidad", "Previsualizar y exportar audio"], role: "Desarrollo integral: arquitectura del sistema, estructura de base de datos, pipelines de procesamiento de audio, integración de APIs de voz con IA y despliegue en la nube.", capabilities: ["450+ voces", "140+ idiomas y acentos", "Control de emoción", "Edición por segmentos", "Exportación de audio"] },
  { ...content.en.projects.items[2], category: "Texto a video · Medios generativos", problem: "El video corto exige coordinar guiones, narración, material visual y ediciones repetidas.", solution: "Una plataforma en español que convierte texto en videos narrados con guiones, voces y material visual editables.", workflow: ["Proporcionar el texto", "Elegir voz e idioma", "Combinar elementos visuales", "Editar y producir el video"], role: "Implementación de extremo a extremo: diseño del sistema, esquemas de base de datos, pipelines generativos (guion, síntesis de voz, ensamble de video), procesamiento multimedia y despliegue cloud.", capabilities: ["Texto a video", "450+ voces", "120+ idiomas y acentos", "Reels y shorts", "Resultado editable"] },
  { ...content.en.projects.items[3], category: "Investigación con IA · Automatización de contenido", problem: "Los equipos invierten horas investigando, redactando, dando formato y programando cada newsletter.", solution: "Un producto que investiga un tema, redacta en la voz de marca y permite programar y distribuir el resultado.", workflow: ["Definir un tema", "Investigar fuentes recientes", "Generar y editar la edición", "Programar y medir la distribución"], role: "Construcción completa del producto: arquitectura del sistema, diseño de base de datos, ingesta de datos de investigación, orquestación de LLMs con tono de marca y automatización en la nube.", capabilities: ["Investigación con IA", "Generación de contenido", "Voz de marca", "Programación", "Dashboard de analítica"] },
  { ...content.en.projects.items[4], category: "NLP · Analítica de texto", problem: "Los equipos con encuestas y reseñas suelen necesitar código o trabajo manual para entender temas y sentimiento.", solution: "Una herramienta sin código que procesa comentarios en CSV o Excel para obtener temas, sentimiento y estadísticas.", workflow: ["Subir CSV o Excel", "Detectar temas y sentimiento", "Explorar patrones y estadísticas", "Exportar resultados estructurados"], role: "Desarrollo de extremo a extremo: arquitectura del producto, almacenamiento y flujo de datos, pipelines de procesamiento de texto no estructurado, modelos NLP y despliegue cloud.", capabilities: ["Extracción de temas", "Análisis de sentimiento", "CSV y Excel", "Estadísticas", "Exportación de datos"] },
];

content.es.experience.items = [
  { role: "Científico de Datos / Especialista en IA", company: "HITSS", context: "Consultoría para Claro video", period: "2024 — actualidad", summary: "IA aplicada y servicios cloud para desarrollo y automatización operativa.", highlights: ["Implementación de agentes de IA para flujos repetitivos de desarrollo y operación.", "Despliegue de servicios administrados en Google Cloud Run.", "Integración de Vertex AI, BigQuery, SQL y stored procedures en flujos de datos."] },
  { role: "Especialista de Data & Analytics", company: "Aeroméxico", period: "Jul 2022 — 2024", summary: "Analítica de clientes, proyección de actividad y reportería operativa automatizada.", highlights: ["Análisis de comportamiento para decisiones comerciales y operativas.", "Mantenimiento de algoritmos de machine learning para proyecciones.", "Procesamiento en AWS y dashboards automatizados de KPIs en Tableau."] },
  { role: "Data Scientist", company: "Club Premier", period: "Dic 2020 — Jul 2022", summary: "Analítica de clientes y lealtad convertida en reportes y modelos para negocio.", highlights: ["Desarrollo y mantenimiento de modelos de machine learning orientados a clientes.", "Comunicación de hallazgos mediante reportes para áreas de negocio."] },
  { role: "Tutor de Data Science", company: "Coderhouse", period: "Nov 2022 — Nov 2023", summary: "Acompañamiento académico y evaluación para estudiantes de ciencia de datos.", highlights: ["Revisión de conceptos, asesoría y evaluación de proyectos."] },
];
