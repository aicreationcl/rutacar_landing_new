import { mensajeErrorEnvio } from "./errores";
import type { PrecalificacionPayload, ResultadoEnvio } from "./types";

const LATENCIA_SIMULADA_MS = 600;

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Modo mocks (LA-2026-010, DT-06 del cotizador, mismo patrón aquí). El plazo
 * decide la calificación simulada para poder ver los 2 mensajes de resultado
 * sin backend real: "inmediato" → prioritario, cualquier otro → a_seguir.
 */
export async function simularEnvioPrecalificacion(payload: PrecalificacionPayload): Promise<ResultadoEnvio> {
  await esperar(LATENCIA_SIMULADA_MS);

  const email = payload.contacto.email;
  const escenarioForzado = [429, 503, 502, 400].find((status) => email.includes(`+${status}@`));

  if (escenarioForzado) {
    const cuerpo =
      escenarioForzado === 400
        ? { error: "Datos inválidos (simulado): revisa el formato del correo." }
        : undefined;
    return { ok: false, mensaje: mensajeErrorEnvio(escenarioForzado, cuerpo) };
  }

  return {
    ok: true,
    data: {
      id: `mock-${Date.now()}`,
      calificacion: payload.plazoEstimado === "inmediato" ? "prioritario" : "a_seguir",
    },
  };
}
