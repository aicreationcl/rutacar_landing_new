import { describe, expect, it } from "vitest";
import { ESTADO_INICIAL_FORMULARIO } from "./types";
import { validarFormulario } from "./validacion";

describe("validarFormulario", () => {
  it("rechaza el formulario vacío en todos los campos requeridos", () => {
    const errores = validarFormulario(ESTADO_INICIAL_FORMULARIO);
    expect(errores.tipoVehiculo).toBeDefined();
    expect(errores.industria).toBeDefined();
    expect(errores.plazoEstimado).toBeDefined();
    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBeDefined();
    expect(errores.telefono).toBeDefined();
  });

  it("usoPrincipal es opcional — no aparece en los errores", () => {
    const errores = validarFormulario(ESTADO_INICIAL_FORMULARIO);
    expect(errores.usoPrincipal).toBeUndefined();
  });

  it("acepta un formulario completo válido", () => {
    const errores = validarFormulario({
      ...ESTADO_INICIAL_FORMULARIO,
      tipoVehiculo: "gas",
      industria: "Minería",
      plazoEstimado: "inmediato",
      nombre: "Juan Pérez",
      email: "juan@cliente.cl",
      telefono: "+56912345678",
    });
    expect(errores).toEqual({});
  });

  it("rechaza nombre corto, email inválido y teléfono corto", () => {
    const errores = validarFormulario({
      ...ESTADO_INICIAL_FORMULARIO,
      tipoVehiculo: "gas",
      industria: "Minería",
      plazoEstimado: "inmediato",
      nombre: "A",
      email: "no-es-un-email",
      telefono: "123",
    });
    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBeDefined();
    expect(errores.telefono).toBeDefined();
  });
});
