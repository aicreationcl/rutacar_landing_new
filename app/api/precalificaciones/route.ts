import { obtenerIpCliente, verificarRateLimit } from "@/lib/server/rateLimit";

/**
 * Proxy server-to-server hacia el backend, mirror exacto de
 * app/api/cotizaciones/route.ts (mismo backend, ruta hermana
 * /api/precalificaciones — ver plan del Incremento 03).
 */

const BACKEND_API_URL = process.env.BACKEND_API_URL;
const BACKEND_API_KEY = process.env.BACKEND_API_KEY;

const RATE_LIMIT_VENTANA_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_SOLICITUDES = 5;

interface ContactoInput {
  nombre?: unknown;
  email?: unknown;
  telefono?: unknown;
}

interface PrecalificacionRequestBody {
  tipoVehiculo?: unknown;
  industria?: unknown;
  usoPrincipal?: unknown;
  plazoEstimado?: unknown;
  contacto?: ContactoInput;
}

function esContactoValido(contacto: unknown): contacto is Required<ContactoInput> {
  if (typeof contacto !== "object" || contacto === null) return false;
  const c = contacto as ContactoInput;
  return typeof c.nombre === "string" && typeof c.email === "string" && typeof c.telefono === "string";
}

export async function POST(request: Request): Promise<Response> {
  if (!BACKEND_API_URL || !BACKEND_API_KEY) {
    console.error("[api/precalificaciones] BACKEND_API_URL/BACKEND_API_KEY no configurados en el entorno");
    return Response.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  const ip = obtenerIpCliente(request);
  const { limitado } = verificarRateLimit(ip, {
    ventanaMs: RATE_LIMIT_VENTANA_MS,
    maxSolicitudes: RATE_LIMIT_MAX_SOLICITUDES,
  });

  if (limitado) {
    return Response.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
      { status: 429 },
    );
  }

  let body: PrecalificacionRequestBody;
  try {
    body = (await request.json()) as PrecalificacionRequestBody;
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof body.tipoVehiculo !== "string" || !body.tipoVehiculo) {
    return Response.json({ error: "tipoVehiculo es obligatorio" }, { status: 400 });
  }

  if (typeof body.industria !== "string" || !body.industria) {
    return Response.json({ error: "industria es obligatorio" }, { status: 400 });
  }

  if (typeof body.plazoEstimado !== "string" || !body.plazoEstimado) {
    return Response.json({ error: "plazoEstimado es obligatorio" }, { status: 400 });
  }

  if (!esContactoValido(body.contacto)) {
    return Response.json({ error: "Datos de contacto incompletos" }, { status: 400 });
  }

  const payloadBackend = {
    tipoVehiculo: body.tipoVehiculo,
    industria: body.industria,
    usoPrincipal: body.usoPrincipal ?? undefined,
    plazoEstimado: body.plazoEstimado,
    contacto: body.contacto,
  };

  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/precalificaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-backend-api-key": BACKEND_API_KEY,
      },
      body: JSON.stringify(payloadBackend),
    });

    const data = (await backendResponse.json().catch(() => null)) as unknown;
    return Response.json(data ?? { error: "Respuesta inválida del backend" }, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error("[api/precalificaciones] Error llamando al backend:", error);
    return Response.json({ error: "No se pudo procesar la solicitud, intenta de nuevo" }, { status: 502 });
  }
}
