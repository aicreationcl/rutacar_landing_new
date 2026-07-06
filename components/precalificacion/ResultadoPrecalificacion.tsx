import type { PrecalificacionExito } from "@/lib/precalificacion/types";

/**
 * Solo dos tonos, nunca la etiqueta interna de calificación
 * (prioritario/a_seguir/descartar) — esa distinción es para el equipo
 * comercial, no para el visitante.
 */
export function ResultadoPrecalificacion({ data }: { data: PrecalificacionExito }) {
  const mensajePlazo =
    data.calificacion === "prioritario"
      ? "Un asesor de Ruta Car te contactará hoy."
      : "Un asesor de Ruta Car te contactará a la brevedad.";

  return (
    <div role="status" className="rounded-sm border border-line bg-plate p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-amber-deep">Solicitud recibida</p>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        Gracias por dejarnos tus datos. <span className="text-ink">{mensajePlazo}</span>
      </p>
    </div>
  );
}
