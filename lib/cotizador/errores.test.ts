import { describe, expect, it } from "vitest";
import { mensajeErrorEnvio } from "./errores";

describe("mensajeErrorEnvio", () => {
  it("400 usa el mensaje del backend cuando viene presente", () => {
    expect(mensajeErrorEnvio(400, { error: "Datos inválidos" })).toBe("Datos inválidos");
  });

  it("400 tiene un mensaje por defecto si el cuerpo no trae error", () => {
    expect(mensajeErrorEnvio(400, null)).toMatch(/campos inválidos/i);
  });

  it("429 menciona el límite de solicitudes", () => {
    expect(mensajeErrorEnvio(429, null)).toMatch(/límite/i);
  });

  it("503 menciona que el servicio no está disponible", () => {
    expect(mensajeErrorEnvio(503, null)).toMatch(/no está disponible/i);
  });

  it("502 menciona reintentar en unos minutos", () => {
    expect(mensajeErrorEnvio(502, null)).toMatch(/unos minutos/i);
  });

  it("un status desconocido cae al mensaje genérico", () => {
    expect(mensajeErrorEnvio(500, null)).toMatch(/error inesperado/i);
  });
});
