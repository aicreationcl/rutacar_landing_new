type CuerpoError = { error?: unknown } | null | undefined;

function extraerMensaje(body: unknown): string | undefined {
  const cuerpo = body as CuerpoError;
  if (cuerpo && typeof cuerpo === "object" && typeof cuerpo.error === "string") {
    return cuerpo.error;
  }
  return undefined;
}

export function mensajeErrorEnvio(status: number, body: unknown): string {
  const mensaje = extraerMensaje(body);
  switch (status) {
    case 400:
      return mensaje ?? "Revisa los datos ingresados: hay campos inválidos o incompletos.";
    case 429:
      return "Alcanzaste el límite de solicitudes. Intenta de nuevo más tarde o escríbenos por WhatsApp.";
    case 503:
      return "El servicio no está disponible en este momento. Escríbenos por WhatsApp mientras tanto.";
    case 502:
      return "No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.";
    default:
      return mensaje ?? "Ocurrió un error inesperado al enviar tu solicitud. Intenta de nuevo.";
  }
}

export const MENSAJE_ERROR_RED =
  "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.";
