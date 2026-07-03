/**
 * Rate limiting por IP real del visitante (R-003 del prompt maestro del
 * Incremento 02): el backend (`rutacar_landing_back`) solo ve la IP de este
 * servidor Next.js, nunca la del navegador — por eso el límite por visitante
 * real tiene que vivir aquí, en el proxy.
 *
 * Estado en memoria: válido porque Railway despliega este sitio como un
 * proceso Node.js persistente (no funciones lambda) — ver la sección
 * "Deployment environment" de la doc de Next.js sobre Route Handlers. Si el
 * despliegue cambiara a un host serverless, este límite dejaría de ser
 * confiable entre invocaciones y habría que moverlo a un store compartido
 * (ej. Redis).
 */
const intentosPorIp = new Map<string, number[]>();

export interface RateLimitResult {
  limitado: boolean;
  restantes: number;
}

export function verificarRateLimit(
  ip: string,
  { ventanaMs, maxSolicitudes }: { ventanaMs: number; maxSolicitudes: number },
): RateLimitResult {
  const ahora = Date.now();
  const historial = (intentosPorIp.get(ip) ?? []).filter((t) => ahora - t < ventanaMs);

  if (historial.length >= maxSolicitudes) {
    intentosPorIp.set(ip, historial);
    return { limitado: true, restantes: 0 };
  }

  historial.push(ahora);
  intentosPorIp.set(ip, historial);
  return { limitado: false, restantes: maxSolicitudes - historial.length };
}

/** Railway (y la mayoría de proxies) inyectan la IP real del visitante en `x-forwarded-for`. */
export function obtenerIpCliente(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "desconocida";
  }
  return "desconocida";
}
