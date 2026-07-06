import type { PrecalificacionFormData, PrecalificacionPayload } from "./types";

export function construirPayloadPrecalificacion(data: PrecalificacionFormData): PrecalificacionPayload {
  const payload: PrecalificacionPayload = {
    tipoVehiculo: data.tipoVehiculo,
    industria: data.industria.trim(),
    plazoEstimado: data.plazoEstimado,
    contacto: {
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      telefono: data.telefono.trim(),
    },
  };

  if (data.usoPrincipal.trim()) payload.usoPrincipal = data.usoPrincipal.trim();

  return payload;
}
