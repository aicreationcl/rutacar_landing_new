import { WhatsappCta } from "@/components/WhatsappCta";

export function ErrorEnvio({
  mensaje,
  mostrarWhatsapp,
  onReintentar,
}: {
  mensaje: string;
  mostrarWhatsapp: boolean;
  onReintentar: () => void;
}) {
  return (
    <div role="alert" className="rounded-sm border border-amber-deep/40 bg-plate p-6">
      <p className="text-sm text-ink">{mensaje}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReintentar}
          className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ink hover:border-amber-deep hover:text-amber-deep"
        >
          Reintentar
        </button>
        {mostrarWhatsapp ? <WhatsappCta /> : null}
      </div>
    </div>
  );
}
