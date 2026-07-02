import type { DiagramaVariante } from "@/lib/content/tipologias";

/**
 * Diagrama técnico tipo plano de ingeniería, generado en SVG.
 * Se usa como reemplazo de fotografía de producto hasta que Ruta Car entregue
 * material fotográfico real (riesgo R-001) — nunca usar fotos de stock genéricas
 * que no correspondan al producto real del cliente.
 */
export function TipologiaDiagram({
  variante,
  className,
}: {
  variante: DiagramaVariante;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 110"
      className={className}
      role="img"
      aria-label="Diagrama técnico esquemático de la carrocería"
    >
      <defs>
        <pattern id="grid" width="11" height="11" patternUnits="userSpaceOnUse">
          <path d="M 11 0 L 0 0 0 11" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="220" height="110" fill="url(#grid)" />

      {/* Chasis + cabina, común a todas las variantes */}
      <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <path d="M8 90 H210" strokeOpacity="0.5" />
        <circle cx="34" cy="92" r="7" />
        <circle cx="182" cy="92" r="7" />
        <circle cx="98" cy="92" r="7" strokeOpacity={variante === "minera" ? 1 : 0} />
        <path d="M8 90 L8 62 L34 62 L44 48 H58 V90" strokeOpacity="0.85" />
      </g>

      <VarianteBody variante={variante} />
    </svg>
  );
}

function VarianteBody({ variante }: { variante: DiagramaVariante }) {
  const bed = { x: 62, y: 40, w: 148, h: 50 };

  switch (variante) {
    case "plana":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <path d={`M${bed.x} ${bed.y + bed.h} H${bed.x + bed.w}`} strokeWidth="2.2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={bed.x + 14 + i * 28} cy={bed.y + bed.h - 3} r="2.2" fill="currentColor" stroke="none" />
          ))}
        </g>
      );
    case "plana-baranda":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <path d={`M${bed.x} ${bed.y + bed.h} H${bed.x + bed.w}`} strokeWidth="2.2" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${bed.x + 8 + i * 26} ${bed.y + bed.h} V${bed.y + bed.h - 22}`} />
          ))}
          <path d={`M${bed.x} ${bed.y + bed.h - 22} H${bed.x + bed.w}`} strokeOpacity="0.6" />
        </g>
      );
    case "cortinera":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x} y={bed.y + 6} width={bed.w} height={bed.h - 6} rx="2" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M${bed.x + 6 + i * (bed.w - 12) / 8} ${bed.y + 8}
                  q4 ${(bed.h - 10) / 2} 0 ${bed.h - 10}`}
              strokeOpacity="0.6"
            />
          ))}
        </g>
      );
    case "gas":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={bed.x + 20 + i * 27} cy={bed.y + bed.h / 2} r="9" />
              <path d={`M${bed.x + 20 + i * 27 - 3} ${bed.y + bed.h / 2 - 9} h6`} />
            </g>
          ))}
        </g>
      );
    case "ganadero":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx="2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={i} d={`M${bed.x} ${bed.y + 8 + i * 7.5} H${bed.x + bed.w}`} strokeOpacity="0.55" />
          ))}
        </g>
      );
    case "especiales":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx="2" strokeDasharray="5 4" />
          <path d={`M${bed.x + bed.w / 2 - 10} ${bed.y + bed.h / 2 - 10} l20 20 m0 -20 l-20 20`} />
        </g>
      );
    case "minera":
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x - 3} y={bed.y - 3} width={bed.w + 6} height={bed.h + 6} rx="2" strokeWidth="2.4" />
          <rect x={bed.x + 4} y={bed.y + 4} width={bed.w - 8} height={bed.h - 8} rx="1" strokeOpacity="0.6" />
        </g>
      );
    case "carga-general":
    default:
      return (
        <g stroke="currentColor" strokeWidth="1.6" fill="none">
          <rect x={bed.x} y={bed.y} width={bed.w} height={bed.h} rx="2" />
          <path d={`M${bed.x} ${bed.y} L${bed.x + bed.w} ${bed.y + bed.h}`} strokeOpacity="0.25" />
        </g>
      );
  }
}
