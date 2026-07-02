import { whatsappUrl } from "@/lib/content/empresa";

/**
 * CTA con relleno sólido (LA-2026-033): nunca solo texto subrayado para una acción clickeable.
 * data-analytics-event permite enganchar el evento de clic en el Sprint 2 sin tocar este componente.
 */
export function WhatsappCta({
  mensaje = "Hola, quiero cotizar una carrocería",
  label = "Escribir por WhatsApp",
  variant = "solid",
  className = "",
}: {
  mensaje?: string;
  label?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-sm px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "bg-amber text-graphite hover:bg-amber-deep"
      : "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10";

  return (
    <a
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsappIcon />
      {label}
    </a>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.86 9.86 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.43-.7-2.9-1.14-4.77-4.05-4.92-4.24-.14-.19-1.17-1.55-1.17-2.96s.73-2.1.99-2.39c.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.06.63.48.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}
