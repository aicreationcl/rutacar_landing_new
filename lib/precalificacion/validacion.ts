import type { ErroresFormulario, PrecalificacionFormData } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarFormulario(data: PrecalificacionFormData): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (!data.tipoVehiculo.trim()) {
    errores.tipoVehiculo = "Selecciona el tipo de vehículo o carrocería.";
  }
  if (!data.industria.trim()) {
    errores.industria = "Selecciona la industria o el uso principal.";
  }
  if (!data.plazoEstimado.trim()) {
    errores.plazoEstimado = "Selecciona el plazo estimado de compra.";
  }
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
