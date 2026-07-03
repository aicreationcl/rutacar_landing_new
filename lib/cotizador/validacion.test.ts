import { describe, expect, it } from "vitest";
import { ESTADO_INICIAL_FORMULARIO } from "./types";
import {
  validarPasoContacto,
  validarPasoEspecificaciones,
  validarPasoIndustria,
  validarPasoTipologia,
} from "./validacion";

describe("validarPasoTipologia", () => {
  it("rechaza cuando no hay tipología seleccionada", () => {
    const errores = validarPasoTipologia(ESTADO_INICIAL_FORMULARIO);
    expect(errores.tipologiaSlug).toBeDefined();
  });

  it("rechaza un slug que no existe en el catálogo", () => {
    const errores = validarPasoTipologia({ ...ESTADO_INICIAL_FORMULARIO, tipologiaSlug: "no-existe" });
    expect(errores.tipologiaSlug).toBeDefined();
  });

  it("acepta un slug real del catálogo", () => {
    const errores = validarPasoTipologia({ ...ESTADO_INICIAL_FORMULARIO, tipologiaSlug: "carga-general" });
    expect(errores.tipologiaSlug).toBeUndefined();
  });
});

describe("validarPasoIndustria", () => {
  it("rechaza industria vacía", () => {
    const errores = validarPasoIndustria(ESTADO_INICIAL_FORMULARIO);
    expect(errores.industria).toBeDefined();
  });

  it("acepta una industria no vacía", () => {
    const errores = validarPasoIndustria({ ...ESTADO_INICIAL_FORMULARIO, industria: "Minería" });
    expect(errores.industria).toBeUndefined();
  });
});

describe("validarPasoEspecificaciones", () => {
  it("rechaza vehiculoBase demasiado corto y capacidadCargaKg vacía", () => {
    const errores = validarPasoEspecificaciones({ ...ESTADO_INICIAL_FORMULARIO, vehiculoBase: "H" });
    expect(errores.vehiculoBase).toBeDefined();
    expect(errores.capacidadCargaKg).toBeDefined();
  });

  it("rechaza capacidadCargaKg no numérica o negativa", () => {
    const base = { ...ESTADO_INICIAL_FORMULARIO, vehiculoBase: "Hino FC 500" };
    expect(validarPasoEspecificaciones({ ...base, capacidadCargaKg: "abc" }).capacidadCargaKg).toBeDefined();
    expect(validarPasoEspecificaciones({ ...base, capacidadCargaKg: "-5" }).capacidadCargaKg).toBeDefined();
  });

  it("largoUtilM es opcional, pero si viene debe ser un número mayor a 0", () => {
    const base = { ...ESTADO_INICIAL_FORMULARIO, vehiculoBase: "Hino FC 500", capacidadCargaKg: "5000" };
    expect(validarPasoEspecificaciones(base).largoUtilM).toBeUndefined();
    expect(validarPasoEspecificaciones({ ...base, largoUtilM: "0" }).largoUtilM).toBeDefined();
    expect(validarPasoEspecificaciones({ ...base, largoUtilM: "6.5" }).largoUtilM).toBeUndefined();
  });

  it("acepta el set mínimo requerido", () => {
    const errores = validarPasoEspecificaciones({
      ...ESTADO_INICIAL_FORMULARIO,
      vehiculoBase: "Hino FC 500",
      capacidadCargaKg: "5000",
    });
    expect(errores).toEqual({});
  });
});

describe("validarPasoContacto", () => {
  it("rechaza nombre corto, email inválido y teléfono corto", () => {
    const errores = validarPasoContacto({
      ...ESTADO_INICIAL_FORMULARIO,
      nombre: "A",
      email: "no-es-un-email",
      telefono: "123",
    });
    expect(errores.nombre).toBeDefined();
    expect(errores.email).toBeDefined();
    expect(errores.telefono).toBeDefined();
  });

  it("acepta datos de contacto válidos", () => {
    const errores = validarPasoContacto({
      ...ESTADO_INICIAL_FORMULARIO,
      nombre: "Juan Pérez",
      email: "juan@cliente.cl",
      telefono: "+56912345678",
    });
    expect(errores).toEqual({});
  });
});
