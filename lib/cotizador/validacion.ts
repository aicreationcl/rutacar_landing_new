import { getTipologiaBySlug } from "@/lib/content/tipologias";
import type { CotizadorFormData, ErroresPaso } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarPasoTipologia(data: CotizadorFormData): ErroresPaso {
  const errores: ErroresPaso = {};
  if (!data.tipologiaSlug || !getTipologiaBySlug(data.tipologiaSlug)) {
    errores.tipologiaSlug = "Selecciona un tipo de carrocería para continuar.";
  }
  return errores;
}

export function validarPasoIndustria(data: CotizadorFormData): ErroresPaso {
  const errores: ErroresPaso = {};
  if (!data.industria.trim()) {
    errores.industria = "Selecciona la industria o el uso principal.";
  }
  return errores;
}

export function validarPasoEspecificaciones(data: CotizadorFormData): ErroresPaso {
  const errores: ErroresPaso = {};

  if (data.vehiculoBase.trim().length < 2) {
    errores.vehiculoBase = "Indica la marca y modelo del vehículo o chasis.";
  }

  const capacidad = Number(data.capacidadCargaKg);
  if (!data.capacidadCargaKg.trim() || !Number.isFinite(capacidad) || capacidad <= 0) {
    errores.capacidadCargaKg = "Ingresa una capacidad de carga válida en kilos.";
  }

  if (data.largoUtilM.trim()) {
    const largo = Number(data.largoUtilM);
    if (!Number.isFinite(largo) || largo <= 0) {
      errores.largoUtilM = "El largo útil debe ser un número mayor a 0.";
    }
  }

  return errores;
}

export function validarPasoContacto(data: CotizadorFormData): ErroresPaso {
  const errores: ErroresPaso = {};

  if (data.nombre.trim().length < 2) {
    errores.nombre = "Ingresa tu nombre completo.";
  }
  if (!EMAIL_REGEX.test(data.email.trim())) {
    errores.email = "Ingresa un correo electrónico válido.";
  }
  if (data.telefono.trim().length < 6) {
    errores.telefono = "Ingresa un teléfono de contacto válido.";
  }

  return errores;
}

export function validarPaso(paso: number, data: CotizadorFormData): ErroresPaso {
  switch (paso) {
    case 1:
      return validarPasoTipologia(data);
    case 2:
      return validarPasoIndustria(data);
    case 3:
      return validarPasoEspecificaciones(data);
    case 4:
      return validarPasoContacto(data);
    default:
      return {};
  }
}
