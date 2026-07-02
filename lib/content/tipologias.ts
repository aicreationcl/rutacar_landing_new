export type DiagramaVariante =
  | "carga-general"
  | "plana-baranda"
  | "plana"
  | "gas"
  | "cortinera"
  | "especiales"
  | "ganadero"
  | "minera";

export type Tipologia = {
  slug: string;
  codigo: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  industrias: string[];
  especificaciones: string[];
  diagrama: DiagramaVariante;
  /** true = descripción tomada del sitio actual, pendiente de ficha técnica real de Ruta Car (riesgo R-001). */
  fichaPendiente: boolean;
};

/**
 * Fuente única de verdad del catálogo de carrocerías (LA-2026-027).
 * Nombres y descripciones verificados contra rutacar.cl/carrocerias/ el 2026-07-02.
 * Las especificaciones detalladas (dimensiones, capacidad, materiales) NO estaban publicadas
 * en el sitio actual con el nivel de detalle necesario — quedan marcadas como fichaPendiente
 * hasta que Ruta Car entregue las fichas técnicas reales (ver plan-ejecucion.md, riesgo R-001).
 */
export const tipologias: Tipologia[] = [
  {
    slug: "carga-general",
    codigo: "RC-CG",
    nombre: "Carga General",
    resumen: "Transporte seguro y eficiente de mercadería diversa.",
    descripcion:
      "Pensada para el transporte de mercadería general, en un formato resistente y adaptable al vehículo del cliente.",
    industrias: ["Comercial", "Logística", "Industrial"],
    especificaciones: [
      "Fabricación a medida según chasis del vehículo",
      "Estructura reforzada para carga diversa",
    ],
    diagrama: "carga-general",
    fichaPendiente: true,
  },
  {
    slug: "plana-con-baranda",
    codigo: "RC-PB",
    nombre: "Plana Con Baranda",
    resumen: "Plataforma con barandas para facilitar carga y descarga.",
    descripcion:
      "Plataforma con barandas laterales abatibles o fijas que facilitan la carga y descarga de materiales.",
    industrias: ["Construcción", "Logística", "Distribución"],
    especificaciones: [
      "Barandas laterales abatibles o fijas",
      "Plataforma de carga a medida",
    ],
    diagrama: "plana-baranda",
    fichaPendiente: true,
  },
  {
    slug: "plana",
    codigo: "RC-PL",
    nombre: "Plana",
    resumen: "Superficie abierta y resistente para grandes volúmenes.",
    descripcion:
      "Superficie abierta y resistente, pensada para el transporte de materiales y maquinaria de gran volumen.",
    industrias: ["Transporte de materiales", "Maquinaria"],
    especificaciones: ["Superficie plana sin barandas", "Puntos de amarre para sujeción de carga"],
    diagrama: "plana",
    fichaPendiente: true,
  },
  {
    slug: "gas",
    codigo: "RC-GAS",
    nombre: "Gas",
    resumen: "Transporte seguro de cilindros de gas.",
    descripcion:
      "Carrocería diseñada específicamente para el transporte seguro de cilindros de gas.",
    industrias: ["Distribución de gas"],
    especificaciones: [
      "Estructura reforzada",
      "Sistemas de sujeción de cilindros",
      "Ventilación y divisiones internas",
    ],
    diagrama: "gas",
    fichaPendiente: true,
  },
  {
    slug: "cortinera",
    codigo: "RC-COR",
    nombre: "Cortinera",
    resumen: "Lonas laterales corredizas para acceso rápido a la carga.",
    descripcion:
      "Incorpora lonas laterales corredizas que permiten acceder fácilmente a la carga desde ambos costados, con protección frente al clima.",
    industrias: ["Logística", "Distribución"],
    especificaciones: ["Cortinas laterales corredizas", "Acceso bilateral a la carga"],
    diagrama: "cortinera",
    fichaPendiente: true,
  },
  {
    slug: "especiales",
    codigo: "RC-ESP",
    nombre: "Especiales",
    resumen: "Fabricación a medida según necesidades específicas.",
    descripcion:
      "Carrocerías fuera de catálogo, fabricadas con refuerzos y configuraciones únicas según lo que pida cada cliente.",
    industrias: ["Industrial", "Logística especializada"],
    especificaciones: ["Configuración 100% a medida", "Refuerzos según requerimiento del cliente"],
    diagrama: "especiales",
    fichaPendiente: true,
  },
  {
    slug: "estandar-ganadero",
    codigo: "RC-GAN",
    nombre: "Estándar Ganadero",
    resumen: "Transporte seguro de animales.",
    descripcion:
      "Diseñada para el transporte seguro de animales durante el traslado.",
    industrias: ["Agrícola", "Ganadero"],
    especificaciones: ["Ventilación diseñada para el traslado de animales", "Piso antideslizante", "Divisiones internas"],
    diagrama: "ganadero",
    fichaPendiente: true,
  },
  {
    slug: "minera",
    codigo: "RC-MIN",
    nombre: "Minera",
    resumen: "Carrocería robusta para faenas mineras.",
    descripcion:
      "Carrocería reforzada pensada para las exigencias de faenas mineras. La ficha técnica detallada de este modelo está pendiente de confirmación con Ruta Car.",
    industrias: ["Minería"],
    especificaciones: [],
    diagrama: "minera",
    fichaPendiente: true,
  },
];

export function getTipologiaBySlug(slug: string) {
  return tipologias.find((t) => t.slug === slug);
}

export const industrias = Array.from(
  new Set(tipologias.flatMap((t) => t.industrias))
).sort();
