// ---------------------------------------------------------------------------
// Experiences (portfolio) — single source of truth, shared by /portafolio, the
// experience detail pages, and the pillar pages' "experiences by section" view.
// Content is the client's real example workshops (CHANGES-REQUESTED-PORTFOLIO.pdf,
// one per pillar). Structure per client: Objetivo · Resultados esperados ·
// Contenido/Descripción (+ Duración / Modalidad). Orthography lightly corrected
// (accents / doubled letters) for production; wording preserved.
// Replaced by Sanity content once the CMS is wired (deferred).
// ---------------------------------------------------------------------------

export type PillarSlug =
  | "desarrollo-profesional"
  | "bienestar-corporativo"
  | "experiencias-de-integracion";

export const PILLAR_LABELS: Record<PillarSlug, string> = {
  "desarrollo-profesional": "Desarrollo Profesional",
  "bienestar-corporativo": "Bienestar Corporativo",
  "experiencias-de-integracion": "Experiencias de Integración",
};

export type Experience = {
  slug: string;
  pillar: PillarSlug;
  title: string;
  tagline: string; // short label for cards
  cover: string; // /portfolio/*.jpg
  objetivo: string;
  resultados: string[];
  /** Optional intro paragraph for Contenido/Descripción. */
  contenido: string;
  /** Optional ordered list of content topics. */
  contenidoItems?: string[];
  /** Optional "Temas a trabajar" block. */
  temasIntro?: string;
  temas?: string[];
  duracion: string;
  modalidad: string;
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "marca-personal",
    pillar: "desarrollo-profesional",
    title: "Taller Marca Personal",
    tagline: "Marca Personal",
    cover: "/portfolio/marca-personal.jpg",
    objetivo:
      "Permite a cada participante identificar y potenciar su propuesta de valor —esa combinación única de talentos, valores y propósito— para construir una marca personal auténtica y poderosa.",
    resultados: [
      "Colaboradores que venden más y mejor, transmitiendo confianza.",
      "Mayor innovación y propuestas de valor.",
      "Equipos más colaborativos, sin rivalidades improductivas.",
      "Metas alcanzadas más rápido y con mayor motivación.",
      "Profesionales voceros de la empresa con narrativa definida.",
      "Voceros de la empresa con discursos contundentes.",
    ],
    contenido: "",
    contenidoItems: [
      "Marca Personal: qué significa, cómo se construye y por qué es esencial en entornos profesionales.",
      "Propósito profesional: definición a través del uso de metodología.",
      "Estrategias y tipos de contenido: cómo comunicar lo que sabemos y aportamos de forma relevante.",
      "Autodiagnóstico: herramientas para identificar fortalezas, habilidades y áreas de mejora.",
      "Audiencia: entender a quién queremos llegar y cómo conectar genuinamente.",
      "Redes y contactos: construcción y fortalecimiento de círculos de influencia.",
      "LinkedIn y otras redes sociales: uso estratégico de las plataformas digitales para proyectar la marca personal.",
    ],
    duracion: "3 horas",
    modalidad: "Virtual, presencial o híbrido",
  },
  {
    slug: "yoga-facial",
    pillar: "bienestar-corporativo",
    title: "Taller Yoga Facial",
    tagline: "Yoga Facial",
    cover: "/portfolio/yoga-facial.jpg",
    objetivo:
      "Comprender la importancia de realizar una rutina diaria de ejercicios faciales como herramienta de relajación y drenaje linfático.",
    resultados: [
      "Colaboradores más relajados.",
      "Colaboradores más conectados con su interior.",
      "Colaboradores agradecidos.",
      "Colaboradores más creativos y con la mente despejada.",
    ],
    contenido:
      "Sesión de yoga facial de una hora para aprender técnicas para realizar un masaje de drenaje linfático y relajación en el rostro. Herramienta personal de uso diario.",
    duracion: "1 hora",
    modalidad: "Virtual, presencial o híbrido",
  },
  {
    slug: "florecer",
    pillar: "experiencias-de-integracion",
    title: "Taller Florecer",
    tagline: "Florecer",
    cover: "/portfolio/florecer.jpg",
    objetivo:
      "Brindar a las participantes un espacio creativo y reflexivo para reconectar con su esencia, reconocer sus ciclos de vida y fortalecer su potencial personal, utilizando la pintura colectiva como herramienta simbólica para explorar la renovación, la sensibilidad y la fuerza interior.",
    resultados: [
      "A través del arte y la introspección, se busca que cada participante identifique el momento de su proceso en el que se encuentra y se permita florecer desde su propia historia, ritmo y posibilidades.",
    ],
    contenido:
      "Un taller inspirado en el cerezo (sakura). Un espacio para reconocer que la belleza no es perfección inmediata, sino proceso, ciclos y transformación.",
    temasIntro:
      "Dentro del lienzo, cada elemento del cerezo representará un eje de reflexión:",
    temas: [
      "Renovación: ¿Qué estoy lista para soltar y qué deseo iniciar?",
      "Belleza en proceso: valorar lo que está en construcción, no solo el resultado.",
      "Ciclos de vida: reconocer cambios, pausas y nuevas etapas.",
      "Sensibilidad + fuerza: honrar la vulnerabilidad como parte de la fortaleza.",
    ],
    duracion: "1 hora",
    modalidad: "Virtual, presencial o híbrido",
  },
];

/** Experiences that belong to a given pillar. */
export function experiencesByPillar(pillar: PillarSlug): Experience[] {
  return EXPERIENCES.filter((e) => e.pillar === pillar);
}

/** A single experience by slug. */
export function experienceBySlug(slug: string): Experience | undefined {
  return EXPERIENCES.find((e) => e.slug === slug);
}
