import { validarPaso } from "@/lib/cotizador/validacion";
import { ESTADO_INICIAL_FORMULARIO } from "@/lib/cotizador/types";
import type { CotizacionExito, CotizadorFormData, ErroresPaso } from "@/lib/cotizador/types";

export const PASO_INICIAL = 1;
export const TOTAL_PASOS = 4;

export type EstadoEnvio =
  | { fase: "inactivo" }
  | { fase: "enviando" }
  | { fase: "exito"; data: CotizacionExito }
  | { fase: "error"; mensaje: string };

export type EstadoWizard = {
  paso: number;
  datos: CotizadorFormData;
  errores: ErroresPaso;
  envio: EstadoEnvio;
};

/** tipologiaSlug precargado cuando se llega desde una ficha de tipología (?tipologia=slug). */
export function crearEstadoInicial(tipologiaSlug?: string): EstadoWizard {
  return {
    paso: PASO_INICIAL,
    datos: tipologiaSlug ? { ...ESTADO_INICIAL_FORMULARIO, tipologiaSlug } : ESTADO_INICIAL_FORMULARIO,
    errores: {},
    envio: { fase: "inactivo" },
  };
}

export type AccionWizard =
  | { tipo: "SET_CAMPO"; campo: keyof CotizadorFormData; valor: string }
  | { tipo: "SIGUIENTE_PASO" }
  | { tipo: "PASO_ANTERIOR" }
  | { tipo: "ENVIAR" }
  | { tipo: "ENVIAR_EXITO"; data: CotizacionExito }
  | { tipo: "ENVIAR_ERROR"; mensaje: string }
  | { tipo: "REINTENTAR" };

export function cotizadorReducer(estado: EstadoWizard, accion: AccionWizard): EstadoWizard {
  switch (accion.tipo) {
    case "SET_CAMPO":
      return {
        ...estado,
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        errores: { ...estado.errores, [accion.campo]: undefined },
      };

    case "SIGUIENTE_PASO": {
      const errores = validarPaso(estado.paso, estado.datos);
      if (Object.keys(errores).length > 0) {
        return { ...estado, errores };
      }
      if (estado.paso >= TOTAL_PASOS) return estado;
      return { ...estado, paso: estado.paso + 1, errores: {} };
    }

    case "PASO_ANTERIOR":
      if (estado.paso <= PASO_INICIAL) return estado;
      return { ...estado, paso: estado.paso - 1, errores: {} };

    case "ENVIAR":
      return { ...estado, envio: { fase: "enviando" } };

    case "ENVIAR_EXITO":
      return { ...estado, envio: { fase: "exito", data: accion.data } };

    case "ENVIAR_ERROR":
      return { ...estado, envio: { fase: "error", mensaje: accion.mensaje } };

    case "REINTENTAR":
      return { ...estado, envio: { fase: "inactivo" } };

    default:
      return estado;
  }
}
