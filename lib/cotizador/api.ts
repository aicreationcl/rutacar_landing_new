import { MENSAJE_ERROR_RED, mensajeErrorEnvio } from "./errores";
import { construirPayloadCotizacion } from "./mapeo";
import { simularEnvioCotizacion } from "./mocks";
import type { CotizadorFormData, ResultadoEnvio } from "./types";

const USA_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function enviarCotizacion(datos: CotizadorFormData): Promise<ResultadoEnvio> {
  const payload = construirPayloadCotizacion(datos);

  if (USA_MOCKS) {
    return simularEnvioCotizacion(payload);
  }

  try {
    const respuesta = await fetch("/api/cotizaciones", {
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
