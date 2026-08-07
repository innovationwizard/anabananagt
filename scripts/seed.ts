import path from "path";
import { fileURLToPath } from "url";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

// ---------------------------------------------------------------------------
// Seed — migra el contenido actual del sitio (copy aprobado por el cliente,
// textual) al CMS. Idempotente: se puede re-ejecutar; localiza por slug/nombre
// y actualiza en lugar de duplicar. Uso: `npm run seed`.
// ---------------------------------------------------------------------------

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

const ctx = { context: { disableRevalidate: true } } as const;

async function upsertMedia(
  payload: Payload,
  relPath: string,
  alt: string,
): Promise<number> {
  const filename = path.basename(relPath);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs[0]) {
    console.log(`  media ✓ (ya existe) ${filename}`);
    return existing.docs[0].id;
  }
  const created = await payload.create({
    collection: "media",
    data: { alt, decorativa: false },
    filePath: path.join(publicDir, relPath),
    ...ctx,
  });
  console.log(`  media + ${filename}`);
  return created.id;
}

async function run() {
  const payload = await getPayload({ config });
  console.log("Sembrando contenido…");

  // --- Medios -----------------------------------------------------------------
  const covers = {
    "marca-personal": await upsertMedia(
      payload,
      "portfolio/marca-personal.jpg",
      "Taller Marca Personal",
    ),
    "yoga-facial": await upsertMedia(
      payload,
      "portfolio/yoga-facial.jpg",
      "Taller Yoga Facial",
    ),
    florecer: await upsertMedia(
      payload,
      "portfolio/florecer.jpg",
      "Taller Florecer",
    ),
  };
  const fotoDesarrollo = await upsertMedia(
    payload,
    "pillars/desarrollo-profesional.jpg",
    "Desarrollo Profesional",
  );

  const BRANDS: Array<[string, string]> = [
    ["brands/5b.png", "5B"],
    ["brands/clarity-law.png", "Clarity Law"],
    ["brands/rosal.png", "Rosal"],
    ["brands/pradera-concepcion.png", "Pradera Concepción"],
    ["brands/spectrum-brands.png", "Spectrum Brands"],
    ["brands/dorival.png", "Dorival"],
    ["brands/fundacion-novella.png", "Fundación Carlos F. Novella"],
    ["brands/intcomex.png", "Intcomex"],
    ["brands/bayer.png", "Bayer"],
    ["brands/mariscal.png", "Distribuidora Mariscal"],
    ["brands/oster.png", "Oster"],
    ["brands/canesten.png", "Canesten"],
    ["brands/bantrab.png", "Bantrab"],
    ["brands/ifx.png", "ifx"],
  ];

  // --- Logos de clientes ------------------------------------------------------
  for (let i = 0; i < BRANDS.length; i++) {
    const [file, nombre] = BRANDS[i];
    const logoId = await upsertMedia(payload, file, nombre);
    const existing = await payload.find({
      collection: "clientLogos",
      where: { nombre: { equals: nombre } },
      limit: 1,
    });
    const data = { nombre, logo: logoId, orden: i + 1 };
    if (existing.docs[0]) {
      await payload.update({
        collection: "clientLogos",
        id: existing.docs[0].id,
        data,
        ...ctx,
      });
    } else {
      await payload.create({ collection: "clientLogos", data, ...ctx });
    }
  }
  console.log(`clientLogos ✓ (${BRANDS.length})`);

  // --- Pilares de servicio ----------------------------------------------------
  const SERVICES = [
    {
      slug: "desarrollo-profesional" as const,
      icon: "graduation-cap" as const,
      orden: 1,
      title: "Desarrollo Profesional",
      tagline: "Crecer. Liderar. Comunicar.",
      resumen:
        "Hacer crecer a las personas: sus capacidades, su liderazgo, su comunicación y su marca profesional.",
      description:
        "Experiencias diseñadas para hacer crecer a las personas —sus capacidades, su liderazgo, su comunicación y su marca profesional. Cada programa se construye a partir del contexto real de su equipo, no de un catálogo.",
      audience:
        "Equipos de liderazgo, ventas, comunicación, RRHH y talento que quieren desarrollar capacidades con impacto medible.",
      deliverables: [
        "Diagnóstico previo: objetivos, contexto y cultura del equipo",
        "Experiencia a la medida (presencial, virtual o híbrida)",
        "Facilitación con dinámicas prácticas y aplicables",
        "Material de apoyo para participantes",
        "Seguimiento y recomendaciones post-experiencia",
      ],
      outcomes: [
        "Personas con nuevas capacidades de liderazgo y comunicación",
        "Equipos más alineados y con una marca profesional más fuerte",
        "Aprendizaje que se aplica desde el día siguiente",
      ],
      foto: fotoDesarrollo,
    },
    {
      slug: "bienestar-corporativo" as const,
      icon: "heart" as const,
      orden: 2,
      title: "Bienestar Corporativo",
      tagline: "Cuidar. Equilibrar. Renovar.",
      resumen:
        "Cuidar a las personas: su energía, su salud y su equilibrio, dentro y fuera del trabajo.",
      description:
        "Experiencias de bienestar que cuidan la energía, la salud y el equilibrio de las personas, dentro y fuera del trabajo. Bienestar que se siente, no que se anuncia.",
      audience:
        "Áreas de RRHH, cultura y bienestar que quieren cuidar a su gente de forma genuina y memorable.",
      deliverables: [
        "Diseño de la experiencia según el momento del equipo",
        "Activaciones de bienestar (wellness day, pausas activas, spa corporativo y más)",
        "Facilitadores y especialistas de bienestar",
        "Producción y cuidado del detalle en sitio",
        "Cierre con sensación de cuidado y renovación",
      ],
      outcomes: [
        "Personas con más energía, equilibrio y sensación de ser cuidadas",
        "Un clima laboral más sano y humano",
        "Bienestar percibido que fortalece el orgullo de pertenecer",
      ],
      foto: null,
    },
    {
      slug: "experiencias-de-integracion" as const,
      icon: "users" as const,
      orden: 3,
      title: "Experiencias de Integración",
      tagline: "Conectar. Pertenecer. Celebrar.",
      resumen:
        "Conectar a las personas: crear pertenencia, confianza y una cultura que se vive en equipo.",
      description:
        "Experiencias que conectan a las personas: crean pertenencia, confianza y una cultura que se vive en equipo. El momento en que un equipo vuelve a mirarse.",
      audience:
        "Organizaciones y equipos que quieren fortalecer vínculos, confianza y sentido de pertenencia.",
      deliverables: [
        "Diseño temático a la medida de la cultura y el objetivo",
        "Experiencias de integración (team building, kick off, rallys, activaciones)",
        "Facilitación y dinámicas colaborativas",
        "Producción integral del evento o experiencia",
        "Momentos memorables con propósito, no solo entretenimiento",
      ],
      outcomes: [
        "Equipos más unidos, con más confianza y pertenencia",
        "Una cultura que se vive y se recuerda",
        "Vínculos que sostienen la colaboración en el día a día",
      ],
      foto: null,
    },
  ];

  for (const svc of SERVICES) {
    const { deliverables, outcomes, foto, ...rest } = svc;
    const data = {
      ...rest,
      foto: foto ?? undefined,
      deliverables: deliverables.map((texto) => ({ texto })),
      outcomes: outcomes.map((texto) => ({ texto })),
      ctaEtiqueta: "Diseñemos esta experiencia",
      cierre: {
        titulo: "¿Es esta la experiencia que su equipo necesita?",
        texto:
          "Conversemos. Escuchamos sus objetivos y diseñamos una experiencia a la medida de su organización.",
        ctaEtiqueta: "Conversemos",
      },
      _status: "published" as const,
    };
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: svc.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
        ...ctx,
      });
    } else {
      await payload.create({ collection: "services", data, ...ctx });
    }
  }
  console.log("services ✓ (3)");

  // --- Experiencias -----------------------------------------------------------
  const EXPERIENCES = [
    {
      slug: "marca-personal",
      pillar: "desarrollo-profesional" as const,
      title: "Taller Marca Personal",
      tagline: "Marca Personal",
      cover: covers["marca-personal"],
      fecha: "2026-07-03",
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
      temasIntro: null as string | null,
      temas: [] as string[],
      duracion: "3 horas",
      modalidad: "Virtual, presencial o híbrido",
    },
    {
      slug: "yoga-facial",
      pillar: "bienestar-corporativo" as const,
      title: "Taller Yoga Facial",
      tagline: "Yoga Facial",
      cover: covers["yoga-facial"],
      fecha: "2026-07-02",
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
      contenidoItems: [] as string[],
      temasIntro: null as string | null,
      temas: [] as string[],
      duracion: "1 hora",
      modalidad: "Virtual, presencial o híbrido",
    },
    {
      slug: "florecer",
      pillar: "experiencias-de-integracion" as const,
      title: "Taller Florecer",
      tagline: "Florecer",
      cover: covers.florecer,
      fecha: "2026-07-01",
      objetivo:
        "Brindar a las participantes un espacio creativo y reflexivo para reconectar con su esencia, reconocer sus ciclos de vida y fortalecer su potencial personal, utilizando la pintura colectiva como herramienta simbólica para explorar la renovación, la sensibilidad y la fuerza interior.",
      resultados: [
        "A través del arte y la introspección, se busca que cada participante identifique el momento de su proceso en el que se encuentra y se permita florecer desde su propia historia, ritmo y posibilidades.",
      ],
      contenido:
        "Un taller inspirado en el cerezo (sakura). Un espacio para reconocer que la belleza no es perfección inmediata, sino proceso, ciclos y transformación.",
      contenidoItems: [] as string[],
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

  for (const exp of EXPERIENCES) {
    const { resultados, contenidoItems, temas, ...rest } = exp;
    const data = {
      ...rest,
      resultados: resultados.map((texto) => ({ texto })),
      contenidoItems: contenidoItems.map((texto) => ({ texto })),
      temas: temas.map((texto) => ({ texto })),
      destacada: false,
      _status: "published" as const,
    };
    const existing = await payload.find({
      collection: "experiences",
      where: { slug: { equals: exp.slug } },
      limit: 1,
      draft: true,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection: "experiences",
        id: existing.docs[0].id,
        data,
        ...ctx,
      });
    } else {
      await payload.create({ collection: "experiences", data, ...ctx });
    }
  }
  console.log("experiences ✓ (3)");

  // --- Testimonios (marcadores de posición actuales del sitio; pendientes los
  // reales del cliente) --------------------------------------------------------
  const TESTIMONIALS = [
    {
      cita: "Placeholder: testimonio real de un cliente. Idealmente 2-3 oraciones sobre cómo la experiencia impactó a las personas y la cultura de la organización.",
      autor: "Nombre del líder",
      cargo: "Dirección de RRHH",
      empresa: "Empresa regional",
      orden: 1,
    },
    {
      cita: "Placeholder: segundo testimonio. Enfóquese en el cambio en clima, vínculos y sentido de pertenencia del equipo tras la experiencia.",
      autor: "Nombre del líder",
      cargo: "Gerencia General",
      empresa: "Grupo corporativo",
      orden: 2,
    },
    {
      cita: "Placeholder: tercer testimonio. Destaque el cuidado del detalle, la personalización y el bienestar que sintieron las personas.",
      autor: "Nombre del líder",
      cargo: "Gerencia de Talento",
      empresa: "Compañía industrial",
      orden: 3,
    },
  ];
  for (const t of TESTIMONIALS) {
    const data = { ...t, destacado: true, _status: "published" as const };
    const existing = await payload.find({
      collection: "testimonials",
      where: { empresa: { equals: t.empresa } },
      limit: 1,
      draft: true,
    });
    if (existing.docs[0]) {
      await payload.update({
        collection: "testimonials",
        id: existing.docs[0].id,
        data,
        ...ctx,
      });
    } else {
      await payload.create({ collection: "testimonials", data, ...ctx });
    }
  }
  console.log("testimonials ✓ (3, marcadores de posición)");

  // --- Globals ----------------------------------------------------------------
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      identidad: {
        tituloBase: "ana banana Experiences — Transformar desde lo humano",
        metaDescripcion:
          "Diseñamos experiencias corporativas personalizadas que desarrollan personas, impulsan el bienestar y fortalecen la cultura de cada organización.",
      },
      contacto: {
        email: "consultas@anabanana.gt",
        whatsapp: "50250320841",
      },
      redes: {
        linkedin: "https://www.linkedin.com/company/grupoanabanana/",
        instagram: "https://www.instagram.com/anabanana.gt/",
        tiktok: "https://www.tiktok.com/@anabanana.gt",
      },
      nav: {
        enlaces: [
          { etiqueta: "Nosotros", destino: "/nosotros" as const },
          { etiqueta: "Portafolio", destino: "/portafolio" as const },
        ],
        ctaEtiqueta: "Conversemos",
      },
      footer: {
        ctaTitulo: "Transformemos su organización",
        ctaTituloDestacado: "desde lo humano.",
        ctaEtiqueta: "Conversemos",
        blurb:
          "Experiencias corporativas que desarrollan personas, impulsan el bienestar y fortalecen la cultura de cada organización.",
        enlaces: [
          { etiqueta: "Nosotros", destino: "/nosotros" as const },
          { etiqueta: "Portafolio", destino: "/portafolio" as const },
          { etiqueta: "Contacto", destino: "/contacto" as const },
        ],
        entidad: "Grupo anabanana, S.A.",
        ubicacion: "Guatemala City, Guatemala",
      },
      _status: "published" as const,
    },
    ...ctx,
  });
  console.log("siteSettings ✓");

  await payload.updateGlobal({
    slug: "homePage",
    data: {
      hero: {
        eyebrow: "Experiencias corporativas · Desde lo humano",
        titulo: "Las empresas crecen cuando",
        tituloDestacado: "las personas crecen.",
        subtitulo:
          "Diseñamos experiencias corporativas personalizadas que desarrollan personas, impulsan el bienestar y fortalecen la cultura de su organización.",
        ctaEtiqueta: "Agenda una conversación",
      },
      marcas: {
        titulo: "Marcas que han confiado en nosotros",
        texto:
          "Cada experiencia ha sido diseñada a la medida de las personas, los objetivos y la cultura de cada organización.",
      },
      pilares: {
        tag: "Nuestros pilares",
        titulo: "Tres pilares para transformar desde lo humano",
        descripcion:
          "Cada experiencia se diseña a la medida de su realidad, sus objetivos y la cultura de su organización.",
      },
      sembrando: {
        tag: "Compromiso social",
        titulo: "Sembrando futuro",
        texto:
          "En Anabanana también dedicamos parte de nuestro trabajo a inspirar a las nuevas generaciones. Por eso impulsamos Proyecto Estrella, una iniciativa con la que llevamos experiencias de aprendizaje a niños y jóvenes para inspirarlos a descubrir su potencial.",
        fotos: [],
      },
      destacada: {
        tag: "Experiencia destacada",
        resumen:
          "Placeholder — Breve resumen del impacto: personas participantes, tipo de experiencia, resultado clave en cultura o bienestar.",
        statValor: "XX+",
        statEtiqueta: "Personas",
        ctaEtiqueta: "Ver experiencia completa",
      },
      testimonios: {
        tag: "Testimonios",
        titulo: "Lo que dicen quienes confían en nosotros",
        descripcion:
          "Cada experiencia es una relación de confianza con organizaciones que ponen a las personas en el centro.",
      },
      _status: "published" as const,
    },
    ...ctx,
  });
  console.log("homePage ✓");

  await payload.updateGlobal({
    slug: "aboutPage",
    data: {
      hero: {
        eyebrow: "Quiénes somos",
        titulo: "Transformamos organizaciones",
        tituloDestacado: "desde las personas.",
        historia: [
          {
            parrafo:
              "Hay un momento que se repite en casi todas las organizaciones: la gente deja de mirarse. Las metas se cumplen, las reuniones se suceden, y en medio de todo eso las personas se vuelven invisibles entre sí. La empresa avanza, pero algo esencial se apaga.",
          },
          {
            parrafo:
              "Ana Banana Experiences nació para encender de nuevo ese algo. No para dar un taller más, sino para crear el momento en que un equipo vuelve a verse, a reírse, a confiar y a recordar por qué eligió trabajar junto.",
          },
          {
            parrafo:
              "Creemos que las empresas crecen cuando las personas crecen. Por eso diseñamos experiencias que desarrollan, cuidan y conectan a la gente —siempre desde la estrategia, siempre con cuidado del detalle, siempre con las personas en el centro.",
          },
        ],
      },
      esencia: {
        tag: "Nuestra esencia",
        titulo: "Transformar",
        tituloDestacado: "desde lo humano.",
        texto:
          "Nuestra promesa: cada experiencia que diseñamos deja a las personas y a su organización mejor de lo que las encontramos. No prometemos actividades entretenidas —prometemos impacto real, medible en cultura, vínculos y desarrollo.",
      },
      valores: {
        tag: "Valores",
        titulo: "Lo que nos sostiene",
        items: [
          {
            icono: "heart" as const,
            titulo: "Humanidad",
            descripcion:
              "Ponemos a las personas en el centro de cada experiencia, creando espacios donde puedan crecer, conectar y sentirse valoradas.",
          },
          {
            icono: "users" as const,
            titulo: "Conexión",
            descripcion:
              "Fomentamos relaciones auténticas que fortalecen la colaboración, la confianza y el sentido de pertenencia dentro de las organizaciones.",
          },
          {
            icono: "sparkles" as const,
            titulo: "Transformación",
            descripcion:
              "Diseñamos experiencias con propósito que generan cambios positivos y duraderos en las personas, los equipos y la cultura organizacional.",
          },
          {
            icono: "lightbulb" as const,
            titulo: "Creatividad",
            descripcion:
              "Desarrollamos experiencias innovadoras y personalizadas que responden a las necesidades de cada organización.",
          },
          {
            icono: "award" as const,
            titulo: "Excelencia",
            descripcion:
              "Trabajamos con profesionalismo y atención al detalle para ofrecer experiencias de alto valor e impacto.",
          },
        ],
      },
      arquetipos: {
        tag: "Arquetipos",
        titulo: "El carácter de la marca",
        descripcion:
          "Ana Banana Experiences combina tres arquetipos: uno que la define, uno que le da forma y uno que le da autoridad.",
        items: [
          {
            titulo: "El Cuidador",
            descripcion:
              "Existe para proteger, acompañar y hacer sentir bien a las personas. Es la raíz de nuestra empatía y de nuestro foco en el bienestar.",
          },
          {
            titulo: "El Creador",
            descripcion:
              "Aporta la imaginación y el diseño. Nos impulsa a construir experiencias originales, memorables y a medida, en lugar de repetir fórmulas.",
          },
          {
            titulo: "El Sabio",
            descripcion:
              "Aporta criterio, estrategia y credibilidad. Es la razón por la que trabajamos desde el porqué y no solo desde la actividad.",
          },
        ],
      },
      cierre: {
        titulo: "Las organizaciones más fuertes no son las que más exigen,",
        tituloDestacado: "sino las que mejor cuidan.",
        ctaEtiqueta: "Conversemos",
      },
      seo: {
        metaTitulo: "Nosotros",
        metaDescripcion:
          "Ana Banana Experiences diseña experiencias corporativas que transforman organizaciones desde lo humano. Esencia, valores y arquetipos de la marca.",
      },
      _status: "published" as const,
    },
    ...ctx,
  });
  console.log("aboutPage ✓");

  await payload.updateGlobal({
    slug: "contactPage",
    data: {
      header: {
        eyebrow: "Conversemos",
        titulo: "Diseñemos una experiencia para su equipo",
        texto:
          "Cuéntenos sobre su organización y sus objetivos. Escuchamos, y le proponemos una experiencia a la medida en las próximas 24 horas hábiles.",
      },
      altContacto: {
        texto: "¿Prefiere hablar directamente?",
        etiquetaEnlace: "Escríbanos por WhatsApp",
      },
      seo: {
        metaTitulo: "Contacto",
        metaDescripcion:
          "Agende una consulta privada. Cuéntenos sobre su organización y objetivos para recibir una propuesta personalizada.",
      },
      _status: "published" as const,
    },
    ...ctx,
  });
  console.log("contactPage ✓");

  await payload.updateGlobal({
    slug: "portfolioPage",
    data: {
      header: {
        eyebrow: "Experiencias",
        titulo: "Experiencias que dejan huella",
        texto:
          "Una selección de experiencias corporativas que transformaron equipos y culturas desde lo humano.",
      },
      cierreExperiencia: {
        titulo: "¿Quiere vivir esta experiencia con su equipo?",
        texto: "Cada experiencia se adapta a la realidad de su organización.",
        ctaEtiqueta: "Conversemos",
      },
      seo: {
        metaTitulo: "Experiencias",
        metaDescripcion:
          "Experiencias corporativas de desarrollo, bienestar e integración que transforman equipos y culturas desde lo humano.",
      },
      _status: "published" as const,
    },
    ...ctx,
  });
  console.log("portfolioPage ✓");

  console.log("Seed completo.");
  console.log(
    "Nota: el seed no revalida las cachés del sitio (se ejecuta fuera de Next). " +
      "Tras sembrar: en producción, despliega (build fresco); en dev, publica " +
      "cualquier documento en /admin o reconstruye.",
  );
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed falló:", err);
  process.exit(1);
});
