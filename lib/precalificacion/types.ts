/** Todos string a propósito, mismo motivo que CotizadorFormData (inputs controlados homomórficos). */
export type PrecalificacionFormData = {
  tipoVehiculo: string;
  industria: string;
  usoPrincipal: string;
  plazoEstimado: string;
  nombre: string;
  email: string;
  telefono: string;
};

export const ESTADO_INICIAL_FORMULARIO: PrecalificacionFormData = {
  tipoVehiculo: "",
  industria: "",
  usoPrincipal: "",
  plazoEstimado: "",
  nombre: "",
  email: "",
  telefono: "",
};

export type ErroresFormulario = Partial<Record<keyof PrecalificacionFormData, string>>;

/** Contrato exacto de app/api/precalificaciones/route.ts. */
export type PrecalificacionPayload = {
  tipoVehiculo: string;
  industria: string;
  usoPrincipal?: string;
  plazoEstimado: string;
  contacto: {
    nombre: string;
    email: string;
    telefono: string;
  };
};

export type PrecalificacionExito = {
  id: string;
  calificacion: string;
};

export type ResultadoEnvio = { ok: true; data: PrecalificacionExito } | { ok: false; mensaje: string };
