import { describe, expect, it } from "vitest";
import { cotizadorReducer, crearEstadoInicial } from "./cotizadorReducer";

describe("crearEstadoInicial", () => {
  it("arranca en el paso 1 sin errores ni envío en curso", () => {
    const estado = crearEstadoInicial();
    expect(estado.paso).toBe(1);
    expect(estado.errores).toEqual({});
    expect(estado.envio).toEqual({ fase: "inactivo" });
    expect(estado.datos.tipologiaSlug).toBe("");
  });

  it("precarga tipologiaSlug cuando se llega desde una ficha de tipología", () => {
    const estado = crearEstadoInicial("carga-general");
    expect(estado.datos.tipologiaSlug).toBe("carga-general");
  });
});

describe("cotizadorReducer", () => {
  it("SET_CAMPO actualiza el dato y limpia el error de ese campo", () => {
    const inicial = crearEstadoInicial();
    const conError = { ...inicial, errores: { industria: "Selecciona la industria." } };
    const siguiente = cotizadorReducer(conError, { tipo: "SET_CAMPO", campo: "industria", valor: "Minería" });

    expect(siguiente.datos.industria).toBe("Minería");
    expect(siguiente.errores.industria).toBeUndefined();
  });

  it("SIGUIENTE_PASO no avanza y expone errores si el paso actual es inválido", () => {
    const inicial = crearEstadoInicial();
    const siguiente = cotizadorReducer(inicial, { tipo: "SIGUIENTE_PASO" });

    expect(siguiente.paso).toBe(1);
    expect(siguiente.errores.tipologiaSlug).toBeDefined();
  });

  it("SIGUIENTE_PASO avanza cuando el paso actual es válido", () => {
    const inicial = crearEstadoInicial("carga-general");
    const siguiente = cotizadorReducer(inicial, { tipo: "SIGUIENTE_PASO" });

    expect(siguiente.paso).toBe(2);
    expect(siguiente.errores).toEqual({});
  });

  it("SIGUIENTE_PASO no avanza más allá del último paso", () => {
    let estado = crearEstadoInicial("carga-general");
    estado = cotizadorReducer(estado, { tipo: "SET_CAMPO", campo: "industria", valor: "Logística" });
    estado = { ...estado, paso: 4 };

    const siguiente = cotizadorReducer(estado, { tipo: "SIGUIENTE_PASO" });
    expect(siguiente.paso).toBe(4);
  });

  it("PASO_ANTERIOR no retrocede antes del paso 1", () => {
    const inicial = crearEstadoInicial();
    const siguiente = cotizadorReducer(inicial, { tipo: "PASO_ANTERIOR" });
    expect(siguiente.paso).toBe(1);
  });

  it("ENVIAR / ENVIAR_EXITO / ENVIAR_ERROR actualizan la fase de envío", () => {
    const inicial = crearEstadoInicial();

    const enviando = cotizadorReducer(inicial, { tipo: "ENVIAR" });
    expect(enviando.envio).toEqual({ fase: "enviando" });

    const exito = cotizadorReducer(enviando, {
      tipo: "ENVIAR_EXITO",
      data: { id: "1", rangoEstimadoCLP: { min: 1, max: 2 }, reglaCalculoVersion: "v0", contactoEmail: "a@b.cl" },
    });
    expect(exito.envio.fase).toBe("exito");

    const error = cotizadorReducer(enviando, { tipo: "ENVIAR_ERROR", mensaje: "falló" });
    expect(error.envio).toEqual({ fase: "error", mensaje: "falló" });

    const reintentar = cotizadorReducer(error, { tipo: "REINTENTAR" });
    expect(reintentar.envio).toEqual({ fase: "inactivo" });
  });
});
