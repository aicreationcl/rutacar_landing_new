import { getTipologiaBySlug } from "@/lib/content/tipologias";
import { obtenerIpCliente, verificarRateLimit } from "@/lib/server/rateLimit";

/**
 * Proxy server-to-server hacia el backend del Incremento 02
 * (`rutacar_landing_back`). El navegador nunca llama al backend directamente —
 * ver la decisión de arquitectura en
 * `2-propuesta/02-cotizador-carrocerias/prompt-maestro-desarrollo.md`.
 *
 * Validación: aquí solo se hace una verificación mínima de forma — la
 * validación completa y autoritativa (Zod) vive en el backend. Este Route
 * Handler SÍ es responsable de una cosa que el backend no puede hacer:
 * resolver `tipologiaNombre` desde `lib/content/tipologias.ts` (single source
 * of truth, LA-2026-027) en vez de confiar en lo que mande el cliente.
 */

const BACKEND_API_URL = process.env.BACKEND_API_URL;
const BACKEND_API_KEY = process.env.BACKEND_API_KEY;

// R-003: rate limiting por IP real del visitante — el mismo valor de
// referencia usado en el backend (5 envíos/hora), pero aplicado aquí porque
// solo este proxy ve la IP real.
const RATE_LIMIT_VENTANA_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_SOLICITUDES = 5;

interface ContactoInput {
  nombre?: unknown;
  email?: unknown;
  telefono?: unknown;
  empresa?: unknown;
  comentario?: unknown;
}

interface CotizacionRequestBody {
  tipologiaSlug?: unknown;
  especificaciones?: unknown;
  contacto?: ContactoInput;
}

function esContactoValido(contacto: unknown): contacto is Required<Pick<ContactoInput, "nombre" | "email" | "telefono">> & ContactoInput {
  if (typeof contacto !== "object" || contacto === null) return false;
  const c = contacto as ContactoInput;
  return typeof c.nombre === "string" && typeof c.email === "string" && typeof c.telefono === "string";
}

export async function POST(request: Request): Promise<Response> {
  if (!BACKEND_API_URL || !BACKEND_API_KEY) {
    console.error("[api/cotizaciones] BACKEND_API_URL/BACKEND_API_KEY no configurados en el entorno");
    return Response.json({ error: "Servicio de cotización no disponible" }, { status: 503 });
  }

  const ip = obtenerIpCliente(request);
  const { limitado } = verificarRateLimit(ip, {
    ventanaMs: RATE_LIMIT_VENTANA_MS,
    maxSolicitudes: RATE_LIMIT_MAX_SOLICITUDES,
  });

  if (limitado) {
    return Response.json(
      { error: "Demasiadas solicitudes de cotización. Intenta de nuevo más tarde." },
      { status: 429 },
    );
  }

  let body: CotizacionRequestBody;
  try {
    body = (await request.json()) as CotizacionRequestBody;
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof body.tipologiaSlug !== "string" || !body.tipologiaSlug) {
    return Response.json({ error: "tipologiaSlug es obligatorio" }, { status: 400 });
  }

  const tipologia = getTipologiaBySlug(body.tipologiaSlug);
  if (!tipologia) {
    return Response.json({ error: "Tipología desconocida" }, { status: 400 });
  }

  if (!esContactoValido(body.contacto)) {
    return Response.json({ error: "Datos de contacto incompletos" }, { status: 400 });
  }

  // tipologiaNombre se resuelve aquí, server-side — nunca se toma del cliente.
  const payloadBackend = {
    tipologiaSlug: tipologia.slug,
    tipologiaNombre: tipologia.nombre,
    especificaciones: body.especificaciones ?? {},
    contacto: body.contacto,
  };

  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/cotizaciones`, {
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
    console.error("[api/cotizaciones] Error llamando al backend:", error);
    return Response.json({ error: "No se pudo procesar la cotización, intenta de nuevo" }, { status: 502 });
  }
}
