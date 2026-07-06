import { MENSAJE_ERROR_RED, mensajeErrorEnvio } from "./errores";
import { construirPayloadPrecalificacion } from "./mapeo";
import { simularEnvioPrecalificacion } from "./mocks";
import type { PrecalificacionFormData, ResultadoEnvio } from "./types";

const USA_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function enviarPrecalificacion(datos: PrecalificacionFormData): Promise<ResultadoEnvio> {
  const payload = construirPayloadPrecalificacion(datos);

  if (USA_MOCKS) {
    return simularEnvioPrecalificacion(payload);
  }

  try {
    const respuesta = await fetch("/api/precalificaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const cuerpo = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
      return { ok: false, mensaje: mensajeErrorEnvio(respuesta.status, cuerpo) };
    }

    return { ok: true, data: cuerpo };
  } catch {
    return { ok: false, mensaje: MENSAJE_ERROR_RED };
  }
}
