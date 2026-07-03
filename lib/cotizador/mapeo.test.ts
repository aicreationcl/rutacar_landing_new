import { describe, expect, it } from "vitest";
import { construirPayloadCotizacion } from "./mapeo";
import { ESTADO_INICIAL_FORMULARIO } from "./types";

const DATOS_COMPLETOS = {
  ...ESTADO_INICIAL_FORMULARIO,
  tipologiaSlug: "carga-general",
  industria: "Logística",
  usoEspecifico: "Reparto urbano",
  vehiculoBase: "Hino FC 500",
  capacidadCargaKg: "5000",
  largoUtilM: "6.5",
  plazoEstimado: "1-3-meses",
  comentarioTecnico: "Necesita rampa hidráulica",
  nombre: "Juan Pérez",
  email: "juan@cliente.cl",
  telefono: "+56912345678",
  empresa: "Transportes JP",
  comentario: "Urgente",
};

describe("construirPayloadCotizacion", () => {
  it("mapea todos los campos opcionales cuando vienen completos", () => {
    const payload = construirPayloadCotizacion(DATOS_COMPLETOS);

    expect(payload.tipologiaSlug).toBe("carga-general");
    expect(payload.especificaciones).toEqual({
      industria: "Logística",
      vehiculoBase: "Hino FC 500",
      capacidadCargaKg: 5000,
      usoEspecifico: "Reparto urbano",
      largoUtilM: 6.5,
      plazoEstimado: "1-3-meses",
      comentarioTecnico: "Necesita rampa hidráulica",
    });
    expect(payload.contacto).toEqual({
      nombre: "Juan Pérez",
      email: "juan@cliente.cl",
      telefono: "+56912345678",
      empresa: "Transportes JP",
      comentario: "Urgente",
    });
  });

  it("omite las claves opcionales vacías en vez de mandarlas como string vacío", () => {
    const payload = construirPayloadCotizacion({
      ...ESTADO_INICIAL_FORMULARIO,
      tipologiaSlug: "plana",
      industria: "Maquinaria",
      vehiculoBase: "Volvo FH",
      capacidadCargaKg: "8000",
      nombre: "Ana Soto",
      email: "ana@cliente.cl",
      telefono: "912345678",
    });

    expect(payload.especificaciones).toEqual({
      industria: "Maquinaria",
      vehiculoBase: "Volvo FH",
      capacidadCargaKg: 8000,
    });
    expect(payload.contacto).toEqual({
      nombre: "Ana Soto",
      email: "ana@cliente.cl",
      telefono: "912345678",
    });
    expect(payload.contacto.empresa).toBeUndefined();
    expect(payload.contacto.comentario).toBeUndefined();
  });

  it("nunca incluye tipologiaNombre: lo resuelve el proxy, no el cliente", () => {
    const payload = construirPayloadCotizacion(DATOS_COMPLETOS);
    expect(payload).not.toHaveProperty("tipologiaNombre");
  });
});
