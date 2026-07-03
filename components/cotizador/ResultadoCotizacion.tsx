import type { CotizacionExito } from "@/lib/cotizador/types";

function formatearCLP(valor: number): string {
  return valor.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

export function ResultadoCotizacion({ data }: { data: CotizacionExito }) {
  return (
    <div role="status" className="rounded-sm border border-line bg-plate p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-amber-deep">Cotización preliminar</p>
      <p className="mt-3 font-display text-3xl text-ink">
        {formatearCLP(data.rangoEstimadoCLP.min)} — {formatearCLP(data.rangoEstimadoCLP.max)}
      </p>
      <p className="mt-4 max-w-md text-sm text-ink-muted">
        Este rango es preliminar y está sujeto a confirmación. Un asesor de Ruta Car te
        contactará a <span className="text-ink">{data.contactoEmail}</span> para validar los
        detalles y entregarte una cotización final.
      </p>
    </div>
  );
}
