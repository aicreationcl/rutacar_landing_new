import { tipologias } from "@/lib/content/tipologias";
import { TipologiaDiagram } from "@/components/TipologiaDiagram";
import { FieldError } from "@/components/form/FieldError";

export function PasoTipologia({
  valor,
  onChange,
  error,
}: {
  valor: string;
  onChange: (slug: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-xs uppercase tracking-widest text-ink-muted">
        Tipo de carrocería
      </legend>
      <div
        id="tipologiaSlug"
        tabIndex={-1}
        role="radiogroup"
        aria-describedby={error ? "tipologiaSlug-error" : undefined}
        className="mt-4 grid gap-px overflow-hidden rounded-sm border border-line bg-line outline-none sm:grid-cols-2 lg:grid-cols-4"
      >
        {tipologias.map((tipologia) => {
          const seleccionado = tipologia.slug === valor;
          return (
            <button
              key={tipologia.slug}
              type="button"
              role="radio"
              aria-checked={seleccionado}
              onClick={() => onChange(tipologia.slug)}
              className={`flex flex-col gap-3 p-5 text-left transition-colors ${
                seleccionado ? "bg-graphite text-paper" : "bg-paper text-ink hover:bg-graphite hover:text-paper"
              }`}
            >
              <span className={`font-mono text-xs ${seleccionado ? "text-amber" : "text-ink-muted"}`}>
                {tipologia.codigo}
              </span>
              <TipologiaDiagram variante={tipologia.diagrama} className="h-16 w-full" />
              <span className="font-display text-lg uppercase leading-tight">{tipologia.nombre}</span>
            </button>
          );
        })}
      </div>
      <FieldError id="tipologiaSlug-error" mensaje={error} />
    </fieldset>
  );
}
