export type Locale = "es" | "en";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  link: string;
  image: string;
  gridClass: string;
  tags: string[];
  kicker: string;
}

export interface CareerItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
  badge: string;
  details: string[];
  credentialUrl?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
}

export interface EnterpriseAgentItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  repoUrl: string;
  videoUrl: string;
  videoDuration: string;
}

export interface PortfolioContent {
  locale: Locale;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    career: string;
    education: string;
    contact: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewWork: string;
    downloadCv: string;
    contactBtn: string;
    hangingCard: {
      name: string;
      role: string;
      badgeId: string;
      specialty: string;
      location: string;
      experience: string;
      status: string;
      authTag: string;
    };
  };
  about: {
    headingPre: string;
    headingHighlight: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  enterpriseAgents: {
    eyebrow: string;
    title: string;
    subtitle: string;
    watchDemo: string;
    viewCode: string;
    modalTitle: string;
    items: EnterpriseAgentItem[];
  };
  projects: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    visit: string;
    items: ProjectItem[];
  };
  career: {
    title: string;
    subtitle: string;
    items: CareerItem[];
  };
  education: {
    titlePre: string;
    titleHighlight: string;
    subtitle: string;
    viewCredential: string;
    items: EducationItem[];
    arsenalTitle: string;
    traitsTitle: string;
    footerNoteTitle: string;
    footerNoteDesc: string;
  };
  testimonials: {
    titlePre: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      name: string;
      role: string;
      content: string;
      image: string;
    }[];
  };
  contact: {
    titlePre: string;
    titleHighlight: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
    };
  };
  footer: {
    role: string;
    backToTop: string;
    tagline: string;
    morphingTexts: string[];
    copyright: string;
  };
}

export const portfolioData: Record<Locale, PortfolioContent> = {
  es: {
    locale: "es",
    socials: {
      github: "https://github.com/luisteran5296",
      linkedin: "https://www.linkedin.com/in/luis-angel-teran-miranda/",
      email: "mailto:luisteran5296@gmail.com",
      phone: "tel:+525573652856",
    },
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      services: "Especialidad",
      projects: "Productos IA",
      career: "Trayectoria",
      education: "Educación",
      contact: "Contacto",
    },
    hero: {
      badge: "Disponible para trabajo",
      greeting: "Hola, soy",
      name: "Luis Terán",
      title: "AI Engineer · Especialista en IA Aplicada",
      description:
        "Ingeniero de IA y especialista en IA aplicada con más de 5 años transformando modelos, agentes autónomos y arquitecturas serverless en productos listos para producción en GCP y AWS.",
      viewWork: "Ver Productos IA",
      downloadCv: "Ver CV",
      contactBtn: "Contactar",
      hangingCard: {
        name: "Luis Terán",
        role: "AI Engineer & Applied AI Specialist",
        badgeId: "LT-AI-9620",
        specialty: "AI Agents · LLMs · Cloud AI",
        location: "México (CDMX) · Remoto",
        experience: "5+ Años",
        status: "● Activo / Disponible",
        authTag: "VERIFIED AI ENGINEER",
      },
    },
    about: {
      headingPre: "Apasionado por la",
      headingHighlight: "IA Aplicada y Sistemas Autónomos",
      description:
        "Mi enfoque une ingeniería de software, arquitectura cloud y modelos de lenguaje de última generación. Cuento con más de cinco años implementando soluciones de machine learning, orquestación de agentes inteligentes y pipelines de datos aplicados en industrias de streaming, aviación y lealtad. Me especializo en llevar agentes de IA, LLMs y visión computacional desde el prototipo hasta arquitecturas cloud serverless de alto desempeño.",
      stats: [
        { value: "5+", label: "Años de Experiencia" },
        { value: "5", label: "Productos IA Shipped" },
        { value: "3+", label: "Industrias Clave" },
        { value: "100%", label: "Enfoque Remoto" },
      ],
    },
    services: {
      title: "Especialidad & Soluciones",
      subtitle:
        "Capacidades técnicas de ingeniería de IA: diseño de agentes autónomos, integración de LLMs, pipelines de datos y despliegue administrado en la nube.",
      items: [
        {
          title: "Agentes de IA & LLMs",
          description:
            "Diseño y orquestación de agentes autónomos con Gemini 2.5, Vertex AI, Genkit, LangChain y OpenAI para automatizar flujos de trabajo complejos, herramientas (function calling) y sistemas conversacionales.",
          iconName: "Cpu",
        },
        {
          title: "Machine Learning & Modelos Predictivos",
          description:
            "Desarrollo y entrenamiento de modelos de clasificación, forecasting de series temporales, NLP, análisis de sentimiento y pipelines de visión por computadora.",
          iconName: "Brain",
        },
        {
          title: "Cloud & Data Engineering",
          description:
            "Arquitecturas serverless y microservicios contenerizados en Google Cloud Run, BigQuery, SQL, stored procedures, bases vectoriales y flujos de datos en GCP y AWS.",
          iconName: "Cloud",
        },
        {
          title: "Ingeniería de Producto & Dashboards",
          description:
            "Conexión de modelos de IA a aplicaciones web interactivas y tableros analíticos en Tableau y Power BI para seguimiento y toma de decisiones estratégicas.",
          iconName: "Layout",
        },
      ],
    },
    enterpriseAgents: {
      eyebrow: "Sistemas en Producción",
      title: "Agentes de IA Empresariales",
      subtitle:
        "Agentes conversacionales y multimodales diseñados para Microsoft Teams, conectando modelos fundacionales (Google Gemini) con herramientas empresariales críticas (Atlassian Confluence, Google Analytics, Excel y auditoría de pólizas).",
      watchDemo: "Ver Demo en Video",
      viewCode: "Ver Repositorio",
      modalTitle: "Demostración en Video",
      items: [
        {
          id: "teams-confluence-agent",
          title: "Teams Confluence Assistant",
          badge: "Enterprise Knowledge AI",
          subtitle: "Asistente con citas grounded y Function Calling para documentación corporativa",
          description:
            "Agente autónomo para Microsoft Teams inspirado en Microsoft Build 2026. Orquesta Google Gemini 2.5 Flash con Function Calling nativo y la API REST v2 de Confluence Cloud mediante CQL dinámico, respondiendo con citas verificadas y enlaces directos en Adaptive Cards.",
          highlights: [
            "Búsqueda semántica con Confluence Query Language (CQL) dinámico",
            "Limpieza profunda de storage XML a Markdown con BeautifulSoup4",
            "Tarjetas interactivas Adaptive Cards en hilos de chats y canales Teams",
          ],
          tags: ["Python 3.12", "FastAPI", "Gemini 2.5 Flash", "Atlassian REST v2", "Teams SDK", "Adaptive Cards"],
          repoUrl: "https://github.com/luisteran5296/teams-confluence-agent",
          videoUrl: "https://github.com/user-attachments/assets/7bb250e4-5e26-4c31-ac81-a2ac4749e880",
          videoDuration: "1:15 min",
        },
        {
          id: "teams-analytics-excel-agent",
          title: "Teams Analytics & Excel Agent",
          badge: "Conversational BI & Automation",
          subtitle: "BI conversacional conectado a Google Analytics 4 y generación de reportes Excel",
          description:
            "Automatiza el análisis de tráfico y finanzas en Microsoft Teams. Permite consultas en lenguaje natural a la API de GA4 y genera hojas de cálculo ejecutivas formateadas profesionalmente con openpyxl en menos de 60 segundos.",
          highlights: [
            "Conexión directa a Google Analytics Data API v1beta (GA4)",
            "Generación automática de libros de cálculo con estilos ejecutivos",
            "Formulario interactivo nativo de filtros por fecha y métricas en Teams",
          ],
          tags: ["Python 3.12", "GA4 API", "Gemini 2.5 Flash", "openpyxl", "Azure Bot", "Teams SDK"],
          repoUrl: "https://github.com/luisteran5296/teams-analytics-excel-agent",
          videoUrl: "https://github.com/user-attachments/assets/8cc50f51-ba29-4a7a-9705-c70888a91034",
          videoDuration: "1:30 min",
        },
        {
          id: "teams-expense-auditor-agent",
          title: "Teams Multi-Agent Expense Auditor",
          badge: "Multimodal Vision & HITL",
          subtitle: "Auditoría de facturas con visión artificial y flujo de aprobación Human-in-the-Loop",
          description:
            "Sistema multi-agente para fiscalización de gastos corporativos. Recibe recibos o PDFs en Teams, extrae líneas detalladas con Gemini 2.5 Vision sin necesidad de OCR tradicional, evalúa cumplimiento de políticas (límites y restricciones) y envía tarjetas de aprobación a directores.",
          highlights: [
            "Extracción estructurada Zero-OCR con Gemini 2.5 Vision",
            "Motor de scoring de riesgo y detección de compras no permitidas",
            "Flujo interactivo HITL con acciones de Aprobación, Rechazo y Clarificación",
          ],
          tags: ["Python 3.12", "Gemini 2.5 Vision", "Policy Auditor", "Adaptive Cards", "HITL", "Excel Ledger"],
          repoUrl: "https://github.com/luisteran5296/teams-expense-auditor-agent",
          videoUrl: "https://github.com/user-attachments/assets/afe8096b-92ad-4eee-8896-97883e131aa7",
          videoDuration: "1:45 min",
        },
      ],
    },
    projects: {
      eyebrow: "Portafolio de Productos",
      titlePre: "",
      titleHighlight: "Productos IA",
      subtitle:
        "Cinco plataformas de inteligencia artificial construidas de forma independiente: arquitectura, pipelines de datos, orquestación de modelos y despliegue en la nube.",
      cta: "Explorar Productos",
      visit: "Visitar Producto",
      items: [
        {
          id: "gymgineer",
          title: "Gymgineer",
          subtitle: "Visión por computadora & Rutinas adaptadas por IA",
          category: "Computer Vision · AI Planning",
          description:
            "Reconoce equipamiento de gimnasio disponible mediante visión por computadora y genera planes de entrenamiento adaptados usando Gemini 2.5 y Genkit en GCP.",
          link: "https://gymgineer.com/",
          image: "/projects/gymgineer-hero.png",
          gridClass: "md:col-span-7 h-[430px]",
          tags: ["Gemini 2.5", "Genkit", "Computer Vision", "GCP"],
          kicker: "Producto 01",
        },
        {
          id: "voxify",
          title: "Voxify",
          subtitle: "Locuciones y síntesis de voz con IA en 140+ idiomas",
          category: "Generative Audio · TTS",
          description:
            "Estudio web de texto a voz con más de 450 voces para crear locuciones expresivas configurables por acento, emoción, ritmo y tono con exportación de audio.",
          link: "https://voxify.ai/features",
          image: "/projects/voxify-hero.png",
          gridClass: "md:col-span-5 h-[430px]",
          tags: ["TTS", "450+ Voces", "Audio AI", "Cloud Hosting"],
          kicker: "Producto 02",
        },
        {
          id: "genovideo",
          title: "Genovideo",
          subtitle: "Generación de video para redes sociales con voces sintéticas",
          category: "Text-to-Video · Social Content",
          description:
            "Convierte guiones en videos narrados para Reels y Shorts con selección automatizada de material visual, voces en español y edición interactiva.",
          link: "https://genovideo.com/features",
          image: "/projects/genovideo-hero.png",
          gridClass: "md:col-span-5 h-[400px]",
          tags: ["Video Gen", "Reels & Shorts", "Media Pipelines", "Cloud Run"],
          kicker: "Producto 03",
        },
        {
          id: "inkredo",
          title: "Inkredo",
          subtitle: "Investigación autónoma y redacción de newsletters con LLMs",
          category: "AI Research · Content Automation",
          description:
            "Investiga fuentes de actualidad, redacta ediciones en la voz de marca y automatiza la programación y envío con dashboard de analítica de audiencia.",
          link: "https://inkredo.com/",
          image: "/projects/inkredo-hero.png",
          gridClass: "md:col-span-7 h-[400px]",
          tags: ["LLM Agents", "Brand Voice", "Automation", "Newsletters"],
          kicker: "Producto 04",
        },
        {
          id: "opinizoom",
          title: "Opinizoom",
          subtitle: "Minería de texto, tópicos y análisis de sentimiento sin código",
          category: "NLP · Text Analytics",
          description:
            "Herramienta no-code que procesa archivos CSV y Excel con reseñas y encuestas para identificar temas recurrentes, sentimiento y patrones estadísticos.",
          link: "https://opinizoom.com/",
          image: "/projects/opinizoom-hero.png",
          gridClass: "md:col-span-12 h-[380px]",
          tags: ["NLP", "Sentiment Analysis", "CSV / Excel", "Text Mining"],
          kicker: "Producto 05",
        },
      ],
    },
    career: {
      title: "Trayectoria Profesional",
      subtitle: "Orden cronológico de evolución técnica, impacto en datos e ingeniería de IA",
      items: [
        {
          year: "Dic 2020 – Jul 2022",
          title: "Data Scientist",
          subtitle: "Club Premier",
          description:
            "Análisis de datos de clientes y lealtad para comunicar hallazgos estratégicos a áreas de negocio. Desarrollo y mantenimiento de modelos de machine learning orientados a retención, valor de cliente y engagement.",
          skills: ["Python", "Customer Analytics", "Modelos ML", "Loyalty", "Business Intelligence"],
        },
        {
          year: "Jul 2022 – 2024",
          title: "Especialista de Data & Analytics",
          subtitle: "Aeroméxico",
          description:
            "Análisis de datos de consumo y comportamiento de clientes para apoyar decisiones comerciales y operativas. Desarrollo de proyecciones de actividad y mantenimiento de algoritmos de machine learning. Procesamiento y análisis de datos en AWS y creación de dashboards automatizados en Tableau.",
          skills: ["Machine Learning", "AWS", "Tableau", "Proyecciones", "SQL"],
        },
        {
          year: "Nov 2022 – 2024",
          title: "Profesor Tutor de Data Science",
          subtitle: "Coderhouse",
          description:
            "Acompañamiento académico y mentoría técnica a estudiantes en conceptos de ciencia de datos, programación en Python, algoritmos de machine learning y evaluación de proyectos aplicados.",
          skills: ["Python", "Machine Learning", "Mentoría", "Estadística Aplicada"],
        },
        {
          year: "2024 – Actualidad",
          title: "Científico de Datos / Especialista en IA",
          subtitle: "HITSS · Consultoría para Claro video",
          description:
            "Implementación de agentes de inteligencia artificial para apoyar tareas de desarrollo y automatizar flujos repetitivos. Desarrollo y despliegue de microservicios contenerizados en Google Cloud Run. Integración de Vertex AI, BigQuery, SQL y stored procedures en Google Cloud Platform.",
          skills: ["Vertex AI", "Google Cloud Run", "BigQuery", "Agentes de IA", "Stored Procedures"],
        },
      ],
    },
    education: {
      titlePre: "Formación",
      titleHighlight: "Académica & Certificaciones",
      subtitle: "Bases cuantitativas sólidas y certificaciones profesionales oficiales verificables.",
      viewCredential: "Ver Credencial ↗",
      items: [
        {
          degree: "Ingeniería Geofísica",
          school: "Universidad Nacional Autónoma de México (UNAM)",
          year: "2015 – 2020",
          badge: "Facultad de Ingeniería",
          credentialUrl: "https://www.ingenieria.unam.mx/",
          details: [
            "Fuerte formación cuantitativa en física matemática, métodos numéricos y modelos inversos",
            "Procesamiento avanzado de señales y análisis de grandes volúmenes de datos espaciales y temporales",
            "Modelado probabilístico y computación científica orientada a resolución de problemas complejos",
          ],
        },
        {
          degree: "Data Science Professional Certificate",
          school: "IBM",
          year: "2020",
          badge: "Certificación Oficial IBM",
          credentialUrl: "https://www.youracclaim.com/users/luis-angel-teran-miranda/",
          details: [
            "Especialización en herramientas de ciencia de datos: Python, SQL, visualización y análisis exploratorio",
            "Modelos supervisados y no supervisados con Scikit-Learn aplicados a casos de negocio reales",
            "Metodología completa de ciencia de datos desde formulación de hipótesis hasta despliegue de resultados",
          ],
        },
        {
          degree: "Data Science Specialization",
          school: "Johns Hopkins University (Coursera)",
          year: "2019 – 2020",
          badge: "Especialización Coursera",
          credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/QSDM7CAKMSNE",
          details: [
            "Inferencia estadística, análisis de regresión y diseño de experimentos analíticos",
            "Desarrollo de productos de datos reproducibles y dashboards interactivos",
            "Modelado predictivo y validación cruzada con rigor metodológico",
          ],
        },
      ],
      arsenalTitle: "Arsenal Técnico",
      traitsTitle: "Competencias Clave",
      footerNoteTitle: "Evolución en IA Generativa y Agentes",
      footerNoteDesc:
        "Actualizado constantemente con los últimos avances en arquitecturas de agentes, LLMs, function calling, bases vectoriales y servicios cloud serverless.",
    },
    testimonials: {
      titlePre: "Referencias &",
      titleHighlight: "Recomendaciones",
      subtitle: "Testimonios de líderes y colegas sobre la calidad de entrega y solvencia técnica.",
      items: [
        {
          name: "Líder Técnico Cloud",
          role: "Claro video / HITSS",
          content:
            "Luis demostró una enorme capacidad para aterrizar agentes de IA y servicios contenerizados en Cloud Run sin fricción, conectando bases de datos y Vertex AI con total fiabilidad.",
          image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
          name: "Gerente de Analytics",
          role: "Aeroméxico",
          content:
            "Su habilidad para traducir requerimientos comerciales en algoritmos predictivos y dashboards en Tableau permitió tomar decisiones con respaldo de datos claros y precisos.",
          image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
          name: "Director de Producto",
          role: "Ecosistema Digital",
          content:
            "Pocos ingenieros dominan tanto el rigor matemático de los datos como la agilidad para diseñar y desplegar productos web de IA completos de extremo a extremo.",
          image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
      ],
    },
    contact: {
      titlePre: "Oportunidades &",
      titleHighlight: "Contacto Laboral",
      description:
        "Abierto a nuevas oportunidades laborales y contratación como AI Engineer, Applied AI Specialist o Científico de Datos. Disponible para roles remotos o híbridos con alto impacto.",
      emailLabel: "luisteran5296@gmail.com",
      phoneLabel: "+52 55 7365 2856",
      locationLabel: "Ciudad de México (Disponible para Trabajo Remoto)",
      form: {
        nameLabel: "Nombre / Reclutador / Empresa",
        namePlaceholder: "Tu nombre o empresa",
        emailLabel: "Correo Electrónico",
        emailPlaceholder: "contacto@empresa.com",
        messageLabel: "Propuesta Laboral o Mensaje",
        messagePlaceholder: "Cuéntame sobre el rol, equipo y desafíos técnicos de la vacante...",
        submitBtn: "Enviar Propuesta Laboral",
      },
    },
    footer: {
      role: "AI Engineer · Applied AI Specialist",
      backToTop: "Volver arriba",
      tagline: "Diseñando & Construyendo IA en Producción",
      morphingTexts: [
        "AI Engineer",
        "Applied AI Specialist",
        "AI Agents Developer",
        "Data Scientist",
        "Luis Terán",
      ],
      copyright: `© ${new Date().getFullYear()} Luis Terán. Diseñado con excelencia visual y arquitecturas modernas.`,
    },
  },
  en: {
    locale: "en",
    socials: {
      github: "https://github.com/luisteran5296",
      linkedin: "https://www.linkedin.com/in/luis-angel-teran-miranda/",
      email: "mailto:luisteran5296@gmail.com",
      phone: "tel:+525573652856",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "AI Products",
      career: "Career",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      badge: "Available for work",
      greeting: "Hi, I'm",
      name: "Luis Terán",
      title: "AI Engineer · Applied AI Specialist",
      description:
        "AI Engineer and Applied AI Specialist with 5+ years of experience transforming models, autonomous agents, and serverless architectures into production systems on GCP and AWS.",
      viewWork: "View AI Products",
      downloadCv: "View CV",
      contactBtn: "Get in Touch",
      hangingCard: {
        name: "Luis Terán",
        role: "AI Engineer & Applied AI Specialist",
        badgeId: "LT-AI-9620",
        specialty: "AI Agents · LLMs · Cloud AI",
        location: "Mexico City · Remote",
        experience: "5+ Years",
        status: "● Active / Available",
        authTag: "VERIFIED AI ENGINEER",
      },
    },
    about: {
      headingPre: "Passionate about",
      headingHighlight: "Applied AI & Autonomous Systems",
      description:
        "My work bridges software engineering, cloud architecture, and modern language models. Over five years deploying machine learning solutions, autonomous agents orchestration, and data pipelines across streaming, aviation, and loyalty industries. Dedicated to shipping resilient products that take AI agents, LLMs, and computer vision from prototypes to production.",
      stats: [
        { value: "5+", label: "Years of Experience" },
        { value: "5", label: "Shipped AI Products" },
        { value: "3+", label: "Major Industries" },
        { value: "100%", label: "Remote Focused" },
      ],
    },
    services: {
      title: "Expertise & What I Do",
      subtitle:
        "End-to-end AI engineering capabilities: autonomous agent workflows, LLM integration, cloud data pipelines, and managed deployment.",
      items: [
        {
          title: "AI Agents & LLMs",
          description:
            "Designing and orchestrating autonomous intelligent agents with Gemini 2.5, Vertex AI, Genkit, LangChain, and OpenAI to automate operational workflows, tool calling, and assistants.",
          iconName: "Cpu",
        },
        {
          title: "Machine Learning & Predictive Models",
          description:
            "Training and deploying forecasting algorithms, customer behavior models, NLP sentiment analysis, and computer vision systems.",
          iconName: "Brain",
        },
        {
          title: "Cloud & Data Engineering",
          description:
            "Serverless systems and containerized microservices on Google Cloud Run, BigQuery, SQL, stored procedures, vector databases, and AWS services.",
          iconName: "Cloud",
        },
        {
          title: "Product Engineering & Dashboards",
          description:
            "Connecting machine learning and AI models with interactive web applications and executive dashboards in Tableau and Power BI.",
          iconName: "Layout",
        },
      ],
    },
    enterpriseAgents: {
      eyebrow: "Production Systems",
      title: "Enterprise AI Agents",
      subtitle:
        "Conversational and multimodal agents engineered for Microsoft Teams, connecting frontier models (Google Gemini) with mission-critical enterprise workflows (Atlassian Confluence, Google Analytics, Excel, and corporate policy auditing).",
      watchDemo: "Watch Video Demo",
      viewCode: "View Repository",
      modalTitle: "Video Demonstration",
      items: [
        {
          id: "teams-confluence-agent",
          title: "Teams Confluence Assistant",
          badge: "Enterprise Knowledge AI",
          subtitle: "Grounded assistant with citation verification and Function Calling for enterprise docs",
          description:
            "Autonomous agent for Microsoft Teams inspired by Microsoft Build 2026. Orchestrates Google Gemini 2.5 Flash with native Function Calling and Confluence Cloud REST v2 API via dynamic CQL, delivering verified answers with citations directly in Adaptive Cards.",
          highlights: [
            "Semantic retrieval via dynamic Confluence Query Language (CQL)",
            "Deep HTML/storage cleaning into clean Markdown via BeautifulSoup4",
            "Threaded interactive Adaptive Cards inside Teams chats and channels",
          ],
          tags: ["Python 3.12", "FastAPI", "Gemini 2.5 Flash", "Atlassian REST v2", "Teams SDK", "Adaptive Cards"],
          repoUrl: "https://github.com/luisteran5296/teams-confluence-agent",
          videoUrl: "https://github.com/user-attachments/assets/7bb250e4-5e26-4c31-ac81-a2ac4749e880",
          videoDuration: "1:15 min",
        },
        {
          id: "teams-analytics-excel-agent",
          title: "Teams Analytics & Excel Agent",
          badge: "Conversational BI & Automation",
          subtitle: "Conversational BI powered by GA4 and automated executive Excel report generation",
          description:
            "Automates business intelligence inside Microsoft Teams. Translates natural language questions into Google Analytics 4 API queries and delivers professionally formatted executive Excel spreadsheets with openpyxl in under 60 seconds.",
          highlights: [
            "Direct integration with Google Analytics Data API v1beta (GA4)",
            "Automated Excel spreadsheet generation with corporate formatting",
            "Native interactive date-picker and metric filtering forms in Teams",
          ],
          tags: ["Python 3.12", "GA4 API", "Gemini 2.5 Flash", "openpyxl", "Azure Bot", "Teams SDK"],
          repoUrl: "https://github.com/luisteran5296/teams-analytics-excel-agent",
          videoUrl: "https://github.com/user-attachments/assets/8cc50f51-ba29-4a7a-9705-c70888a91034",
          videoDuration: "1:30 min",
        },
        {
          id: "teams-expense-auditor-agent",
          title: "Teams Multi-Agent Expense Auditor",
          badge: "Multimodal Vision & HITL",
          subtitle: "Invoice auditing with multimodal vision AI and Human-in-the-Loop manager approval",
          description:
            "Multi-agent architecture for corporate financial auditing. Employees drop receipt images or PDFs in Teams; the vision agent extracts itemized lines without traditional OCR, assesses company policy rules, and delivers an interactive approval card to managers.",
          highlights: [
            "Zero-OCR structured extraction using Gemini 2.5 Vision",
            "Automated risk scoring and restricted purchase policy validation",
            "Interactive HITL approval workflow with Approve, Reject, and Clarify actions",
          ],
          tags: ["Python 3.12", "Gemini 2.5 Vision", "Policy Auditor", "Adaptive Cards", "HITL", "Excel Ledger"],
          repoUrl: "https://github.com/luisteran5296/teams-expense-auditor-agent",
          videoUrl: "https://github.com/user-attachments/assets/afe8096b-92ad-4eee-8896-97883e131aa7",
          videoDuration: "1:45 min",
        },
      ],
    },
    projects: {
      eyebrow: "Product Portfolio",
      titlePre: "",
      titleHighlight: "AI Products",
      subtitle:
        "Five independent AI platforms engineered end-to-end: system architecture, database modeling, data pipelines, model integration, and cloud hosting.",
      cta: "Explore Products",
      visit: "Visit Product",
      items: [
        {
          id: "gymgineer",
          title: "Gymgineer",
          subtitle: "Computer Vision & Adaptive AI Workout Generation",
          category: "Computer Vision · AI Planning",
          description:
            "A mobile AI trainer that recognizes gym equipment through computer vision and generates tailored workouts based on available machines and history using Gemini 2.5 and Genkit.",
          link: "https://gymgineer.com/",
          image: "/projects/gymgineer-hero.png",
          gridClass: "md:col-span-7 h-[430px]",
          tags: ["Gemini 2.5", "Genkit", "Computer Vision", "GCP"],
          kicker: "Product 01",
        },
        {
          id: "voxify",
          title: "Voxify",
          subtitle: "Multilingual AI Voiceover Platform across 140+ Locales",
          category: "Generative Audio · TTS",
          description:
            "Web-based text-to-speech studio with 450+ voices allowing fine-tuned controls over emotion, accent, pace, tone, and multi-segment exporting.",
          link: "https://voxify.ai/features",
          image: "/projects/voxify-hero.png",
          gridClass: "md:col-span-5 h-[430px]",
          tags: ["TTS", "450+ Voices", "Audio AI", "Cloud Hosting"],
          kicker: "Product 02",
        },
        {
          id: "genovideo",
          title: "Genovideo",
          subtitle: "Automated Text-to-Video Engine for Reels & Shorts",
          category: "Text to Video · Social Media",
          description:
            "Generates ready-to-publish social videos from text scripts with automated visual curation, synthetic Spanish voices, and interactive editing.",
          link: "https://genovideo.com/features",
          image: "/projects/genovideo-hero.png",
          gridClass: "md:col-span-5 h-[400px]",
          tags: ["Video Gen", "Reels & Shorts", "Media Pipelines", "Cloud Run"],
          kicker: "Product 03",
        },
        {
          id: "inkredo",
          title: "Inkredo",
          subtitle: "Autonomous AI Newsletter Research & Brand Voice Authoring",
          category: "AI Research · Content Automation",
          description:
            "Researches trending industry topics, drafts full issues in distinct brand voices, and automates scheduling and audience delivery with analytics.",
          link: "https://inkredo.com/",
          image: "/projects/inkredo-hero.png",
          gridClass: "md:col-span-7 h-[400px]",
          tags: ["LLM Agents", "Brand Voice", "Automation", "Newsletters"],
          kicker: "Product 04",
        },
        {
          id: "opinizoom",
          title: "Opinizoom",
          subtitle: "No-code NLP Sentiment & Topic Mining for Surveys",
          category: "NLP · Text Analytics",
          description:
            "Extracts key themes, sentiment distributions, and statistical insights from CSV and Excel survey or customer review files without writing code.",
          link: "https://opinizoom.com/",
          image: "/projects/opinizoom-hero.png",
          gridClass: "md:col-span-12 h-[380px]",
          tags: ["NLP", "Sentiment Analysis", "CSV / Excel", "Text Mining"],
          kicker: "Product 05",
        },
      ],
    },
    career: {
      title: "Career Journey",
      subtitle: "Chronological progression of technical leadership, data impact, and AI engineering",
      items: [
        {
          year: "Dec 2020 – Jul 2022",
          title: "Data Scientist",
          subtitle: "Club Premier",
          description:
            "Customer and loyalty program analytics translated into high-level business models. Developing and maintaining customer retention, lifetime value, and engagement ML models.",
          skills: ["Python", "Customer Analytics", "ML Models", "Loyalty", "Business Intelligence"],
        },
        {
          year: "Jul 2022 – 2024",
          title: "Data & Analytics Specialist",
          subtitle: "Aeroméxico",
          description:
            "Customer analytics and consumer behavior modeling supporting commercial and operational strategy. Maintenance of ML forecasting algorithms and automated KPI dashboards in Tableau with AWS data processing.",
          skills: ["Machine Learning", "AWS", "Tableau", "Forecasting", "SQL"],
        },
        {
          year: "Nov 2022 – 2024",
          title: "Data Science Tutor",
          subtitle: "Coderhouse",
          description:
            "Academic instruction and technical mentorship for data science students covering Python programming, machine learning algorithms, and practical project evaluation.",
          skills: ["Python", "Machine Learning", "Mentorship", "Applied Statistics"],
        },
        {
          year: "2024 – Present",
          title: "Data Scientist / AI Specialist",
          subtitle: "HITSS · Consulting for Claro video",
          description:
            "Implementation of AI agents to accelerate development and repetitive workflows. Development and deployment of containerized microservices on Google Cloud Run. Connecting Vertex AI, BigQuery, SQL, and stored procedures on GCP.",
          skills: ["Vertex AI", "Google Cloud Run", "BigQuery", "AI Agents", "Stored Procedures"],
        },
      ],
    },
    education: {
      titlePre: "Academic",
      titleHighlight: "Background & Credentials",
      subtitle: "Rigorous quantitative foundations paired with verifiable official certifications.",
      viewCredential: "View Credential ↗",
      items: [
        {
          degree: "Geophysical Engineering",
          school: "National Autonomous University of Mexico (UNAM)",
          year: "2015 – 2020",
          badge: "Faculty of Engineering",
          credentialUrl: "https://www.ingenieria.unam.mx/",
          details: [
            "Strong quantitative basis in mathematical physics, numerical analysis, and inverse problem theory",
            "Advanced signal processing and high-dimensional spatio-temporal data modeling",
            "Probabilistic modeling and scientific computing applied to complex systems",
          ],
        },
        {
          degree: "Data Science Professional Certificate",
          school: "IBM",
          year: "2020",
          badge: "Official IBM Certificate",
          credentialUrl: "https://www.youracclaim.com/users/luis-angel-teran-miranda/",
          details: [
            "Comprehensive data science toolkit: Python, SQL, data visualization, and exploratory analysis",
            "Supervised and unsupervised models with Scikit-Learn applied to practical business use cases",
            "Complete data science methodology from problem framing to deployment",
          ],
        },
        {
          degree: "Data Science Specialization",
          school: "Johns Hopkins University (Coursera)",
          year: "2019 – 2020",
          badge: "Coursera Specialization",
          credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/QSDM7CAKMSNE",
          details: [
            "Statistical inference, regression modeling, and analytical experiment design",
            "Building reproducible data products and interactive web analytical apps",
            "Predictive modeling and cross-validation with rigorous methodology",
          ],
        },
      ],
      arsenalTitle: "Technical Arsenal",
      traitsTitle: "Core Competencies",
      footerNoteTitle: "Continuous LLMs & AI Agents Evolution",
      footerNoteDesc:
        "Constantly adopting modern breakthroughs in autonomous agents, LLMs, function calling, vector databases, and serverless cloud ecosystems.",
    },
    testimonials: {
      titlePre: "Professional",
      titleHighlight: "Endorsements",
      subtitle: "Feedback from engineering and product leaders on technical quality and delivery.",
      items: [
        {
          name: "Cloud Technical Lead",
          role: "Claro video / HITSS",
          content:
            "Luis demonstrated exceptional ability in implementing AI agents and containerized Cloud Run services smoothly, integrating Vertex AI and BigQuery with total reliability.",
          image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
          name: "Analytics Manager",
          role: "Aeroméxico",
          content:
            "His capacity to translate commercial challenges into predictive algorithms and Tableau dashboards enabled clear, data-backed decision making across our leadership teams.",
          image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
        {
          name: "Product Director",
          role: "Digital Venture",
          content:
            "Very few engineers possess both the mathematical rigor of data science and the engineering drive to build and ship production AI web products end-to-end.",
          image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150",
        },
      ],
    },
    contact: {
      titlePre: "Career &",
      titleHighlight: "Job Inquiries",
      description:
        "Open to new full-time career opportunities and hiring as an AI Engineer, Applied AI Specialist, or Senior Data Scientist. Available for remote or hybrid high-impact roles.",
      emailLabel: "luisteran5296@gmail.com",
      phoneLabel: "+52 55 7365 2856",
      locationLabel: "Mexico City (Available for Remote Work)",
      form: {
        nameLabel: "Name / Recruiter / Company",
        namePlaceholder: "Your name or organization",
        emailLabel: "Work Email",
        emailPlaceholder: "recruiter@company.com",
        messageLabel: "Job Opportunity or Role Details",
        messagePlaceholder: "Tell me about the role, team, and engineering challenges...",
        submitBtn: "Send Job Inquiry",
      },
    },
    footer: {
      role: "AI Engineer · Applied AI Specialist",
      backToTop: "Back to top",
      tagline: "Designing & Shipping Production AI",
      morphingTexts: [
        "AI Engineer",
        "Applied AI Specialist",
        "AI Agents Developer",
        "Data Scientist",
        "Luis Terán",
      ],
      copyright: `© ${new Date().getFullYear()} Luis Terán. Crafted with visual excellence & modern architectures.`,
    },
  },
};
