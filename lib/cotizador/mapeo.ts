import type { CotizacionPayload, CotizadorFormData } from "./types";

/** Nunca incluye tipologiaNombre: el proxy (app/api/cotizaciones/route.ts) lo resuelve desde el catálogo. */
export function construirPayloadCotizacion(data: CotizadorFormData): CotizacionPayload {
  const especificaciones: Record<string, string | number | boolean> = {
    industria: data.industria.trim(),
    vehiculoBase: data.vehiculoBase.trim(),
    capacidadCargaKg: Number(data.capacidadCargaKg),
  };

  if (data.usoEspecifico.trim()) especificaciones.usoEspecifico = data.usoEspecifico.trim();
  if (data.largoUtilM.trim()) especificaciones.largoUtilM = Number(data.largoUtilM);
  if (data.plazoEstimado) especificaciones.plazoEstimado = data.plazoEstimado;
  if (data.comentarioTecnico.trim()) especificaciones.comentarioTecnico = data.comentarioTecnico.trim();

  const contacto: CotizacionPayload["contacto"] = {
    nombre: data.nombre.trim(),
    email: data.email.trim(),
    telefono: data.telefono.trim(),
  };
  if (data.empresa.trim()) contacto.empresa = data.empresa.trim();
  if (data.comentario.trim()) contacto.comentario = data.comentario.trim();

  return {
    tipologiaSlug: data.tipologiaSlug,
    especificaciones,
    contacto,
  };
}
