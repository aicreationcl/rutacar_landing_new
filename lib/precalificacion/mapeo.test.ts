import { describe, expect, it } from "vitest";
import { ESTADO_INICIAL_FORMULARIO } from "./types";
import { construirPayloadPrecalificacion } from "./mapeo";

describe("construirPayloadPrecalificacion", () => {
  it("mapea los campos requeridos y recorta espacios", () => {
    const payload = construirPayloadPrecalificacion({
      ...ESTADO_INICIAL_FORMULARIO,
      tipoVehiculo: "gas",
      industria: "  Minería  ",
      plazoEstimado: "inmediato",
      nombre: "  Juan Pérez  ",
      email: "  juan@cliente.cl  ",
      telefono: "  +56912345678  ",
    });

    expect(payload).toEqual({
      tipoVehiculo: "gas",
      industria: "Minería",
      plazoEstimado: "inmediato",
      contacto: { nombre: "Juan Pérez", email: "juan@cliente.cl", telefono: "+56912345678" },
    });
  });

  it("omite usoPrincipal cuando viene vacío, lo incluye recortado cuando viene con contenido", () => {
    const base = {
      ...ESTADO_INICIAL_FORMULARIO,
      tipoVehiculo: "gas",
      industria: "Minería",
      plazoEstimado: "inmediato",
      nombre: "Juan Pérez",
      email: "juan@cliente.cl",
      telefono: "+56912345678",
    };

    expect(construirPayloadPrecalificacion(base).usoPrincipal).toBeUndefined();
    expect(
      construirPayloadPrecalificacion({ ...base, usoPrincipal: "  Reparto urbano  " }).usoPrincipal,
    ).toBe("Reparto urbano");
  });
});
