import Link from "next/link";
import { tipologias, industrias } from "@/lib/content/tipologias";
import { TipologiaDiagram } from "@/components/TipologiaDiagram";
import { WhatsappCta } from "@/components/WhatsappCta";
import { CotizarCta } from "@/components/cotizador/CotizarCta";
import { PrecalificacionSection } from "@/components/precalificacion/PrecalificacionSection";

export default function Home() {
  return (
    <>
      <section className="cut-edge-down flex min-h-[80svh] flex-col justify-center bg-graphite px-6 py-24 text-paper">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            Fabricación de carrocerías especializadas · Chile
          </p>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Carrocerías a medida para trabajo pesado.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            Diseño robusto y funcional para minería, ganadería, gas, construcción
            y carga general. Cada carrocería se fabrica según las necesidades
            específicas del cliente.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CotizarCta label="Cotizar una carrocería" />
            <Link
              href="/carrocerias"
              className="inline-flex items-center gap-2 rounded-sm border border-paper/40 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-paper hover:border-amber hover:text-amber"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-plate px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl uppercase tracking-tight text-ink sm:text-4xl">
              Catálogo de carrocerías
            </h2>
            <Link href="/carrocerias" className="font-mono text-xs uppercase tracking-widest text-amber-deep hover:underline">
              Ver todas →
            </Link>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {tipologias.map((tipologia) => (
              <Link
                key={tipologia.slug}
                href={`/carrocerias/${tipologia.slug}`}
                className="group flex flex-col gap-3 bg-paper p-5 transition-colors hover:bg-graphite"
              >
                <span className="font-mono text-xs text-ink-muted group-hover:text-amber">
                  {tipologia.codigo}
                </span>
                <TipologiaDiagram
                  variante={tipologia.diagrama}
                  className="h-16 w-full text-ink group-hover:text-paper"
                />
                <span className="font-display text-lg uppercase leading-tight text-ink group-hover:text-paper">
                  {tipologia.nombre}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cut-edge-up bg-steel px-6 py-20 text-paper">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
            Industrias que confían en fabricación a medida
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {industrias.map((industria) => (
              <li
                key={industria}
                className="rounded-sm border border-paper/25 px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper/80"
              >
                {industria}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/industrias"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-paper hover:text-amber hover:underline"
            >
              Conocer más sobre cada industria →
            </Link>
          </div>
        </div>
      </section>

      <PrecalificacionSection
        heading="¿No sabes qué carrocería necesitas?"
        description="Cuéntanos brevemente tu vehículo, industria y plazo — te contactamos con una recomendación, sin tener que completar el cotizador técnico."
      />

      <section className="bg-paper px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-sm border border-line bg-plate p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight text-ink sm:text-3xl">
              ¿Necesitas una carrocería a medida?
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Cuéntanos el uso, el vehículo y la industria. Te contactamos para cotizar.
            </p>
          </div>
          <WhatsappCta label="Escribir por WhatsApp" />
        </div>
      </section>
    </>
  );
}
