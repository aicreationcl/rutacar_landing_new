export type CampoEspecificacion = {
  campo: "vehiculoBase" | "capacidadCargaKg" | "largoUtilM" | "plazoEstimado" | "comentarioTecnico";
  label: string;
  tipo: "text" | "number" | "select" | "textarea";
  requerido: boolean;
  placeholder?: string;
};

export const PLAZO_OPCIONES: { value: string; label: string }[] = [
  { value: "inmediato", label: "Inmediato" },
  { value: "1-3-meses", label: "1 a 3 meses" },
  { value: "3-6-meses", label: "3 a 6 meses" },
  { value: "mas-de-6-meses", label: "Más de 6 meses" },
];

/**
 * Set genérico, común a las 8 tipologías. LA-2026-027: las especificaciones reales
 * de cada tipología viven solo en lib/content/tipologias.ts como texto de marketing,
 * nunca duplicadas aquí como opciones de formulario. Si Ruta Car define specs
 * configurables reales por tipología (pendiente de reunión comercial, R-001), este
 * es el único archivo a extender.
 */
export const CAMPOS_ESPECIFICACIONES: CampoEspecificacion[] = [
  {
    campo: "vehiculoBase",
    label: "Marca y modelo del vehículo o chasis",
    tipo: "text",
    requerido: true,
    placeholder: "Ej: Hino FC 500",
  },
  {
    campo: "capacidadCargaKg",
    label: "Capacidad de carga estimada (kg)",
    tipo: "number",
    requerido: true,
    placeholder: "Ej: 5000",
  },
  {
    campo: "largoUtilM",
    label: "Largo útil deseado (m)",
    tipo: "number",
    requerido: false,
    placeholder: "Ej: 6.5",
  },
  {
    campo: "plazoEstimado",
    label: "Plazo estimado",
    tipo: "select",
    requerido: false,
  },
  {
    campo: "comentarioTecnico",
    label: "Detalles técnicos adicionales",
    tipo: "textarea",
    requerido: false,
    placeholder: "Cualquier detalle relevante para la fabricación",
  },
];
