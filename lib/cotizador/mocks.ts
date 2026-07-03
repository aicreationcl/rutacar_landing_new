import { mensajeErrorEnvio } from "./errores";
import type { CotizacionPayload, ResultadoEnvio } from "./types";

const LATENCIA_SIMULADA_MS = 600;

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Modo de desarrollo sin backend real (LA-2026-010, DT-06). El email de contacto
 * admite un sufijo "+<status>@" (ej. "prueba+429@cliente.cl") para forzar cada
 * camino de error del proxy real sin depender de que el backend esté disponible.
 * Es solo una convención de QA manual — nunca se envía así al backend real.
 */
export async function simularEnvioCotizacion(payload: CotizacionPayload): Promise<ResultadoEnvio> {
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
      rangoEstimadoCLP: { min: 8_000_000, max: 12_500_000 },
      reglaCalculoVersion: "mock-v0-conservador-provisional",
      contactoEmail: email,
    },
  };
}
