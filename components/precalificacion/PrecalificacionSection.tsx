import { PrecalificacionForm } from "./PrecalificacionForm";

/**
 * Wrapper compartido para insertar el formulario de forma consistente en las
 * 3 páginas del Incremento 03 (home, tipología, contacto) sin duplicar el
 * marcado de sección tres veces.
 */
export function PrecalificacionSection({
  heading,
  description,
  tipoVehiculoInicial,
}: {
  heading: string;
  description: string;
  tipoVehiculoInicial?: string;
}) {
  return (
    <section className="bg-plate px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-deep">Precalificación</p>
        <h2 className="mt-3 font-display text-3xl text-ink">{heading}</h2>
        <p className="mt-3 text-sm text-ink-muted">{description}</p>
        <div className="mt-8">
          <PrecalificacionForm tipoVehiculoInicial={tipoVehiculoInicial} />
        </div>
      </div>
    </section>
  );
}
