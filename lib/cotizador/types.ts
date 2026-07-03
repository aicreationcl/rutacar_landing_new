/**
 * Todos los campos son string (valores crudos de inputs controlados) a propósito:
 * mantiene CotizadorFormData homomórfico para que `{ ...datos, [campo]: valor }`
 * en cotizadorReducer.ts tipe correctamente con `campo: keyof CotizadorFormData`.
 * Los valores válidos de plazoEstimado viven en especificacionesConfig.ts.
 */
export type CotizadorFormData = {
  tipologiaSlug: string;
  industria: string;
  usoEspecifico: string;
  vehiculoBase: string;
  capacidadCargaKg: string;
  largoUtilM: string;
  plazoEstimado: string;
  comentarioTecnico: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  comentario: string;
};

export const ESTADO_INICIAL_FORMULARIO: CotizadorFormData = {
  tipologiaSlug: "",
  industria: "",
  usoEspecifico: "",
  vehiculoBase: "",
  capacidadCargaKg: "",
  largoUtilM: "",
  plazoEstimado: "",
  comentarioTecnico: "",
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  comentario: "",
};

export type ErroresPaso = Partial<Record<keyof CotizadorFormData, string>>;

/** Contrato exacto de app/api/cotizaciones/route.ts — nunca incluir tipologiaNombre, lo resuelve el proxy. */
export type CotizacionPayload = {
  tipologiaSlug: string;
  especificaciones: Record<string, string | number | boolean>;
  contacto: {
    nombre: string;
    email: string;
    telefono: string;
    empresa?: string;
    comentario?: string;
  };
};

export type CotizacionExito = {
  id: string;
  rangoEstimadoCLP: { min: number; max: number };
  reglaCalculoVersion: string;
  contactoEmail: string;
};

export type ResultadoEnvio = { ok: true; data: CotizacionExito } | { ok: false; mensaje: string };
