import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { TipologiaDiagram } from "@/components/TipologiaDiagram";
import { tipologias } from "@/lib/content/tipologias";

export const metadata: Metadata = {
  title: "Carrocerías",
  description:
    "Catálogo completo de carrocerías especializadas Ruta Car: carga general, plana, plana con baranda, gas, cortinera, especiales, ganadero y minera.",
};

export default function CarroceriasPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Ocho tipologías de carrocería"
        lede="Cada modelo se fabrica a medida según el chasis del vehículo y el uso operativo."
      />

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {tipologias.map((tipologia) => (
            <Link
              key={tipologia.slug}
              href={`/carrocerias/${tipologia.slug}`}
              className="group flex flex-col gap-4 bg-paper p-6 transition-colors hover:bg-graphite"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-muted group-hover:text-amber">
                  {tipologia.codigo}
                </span>
                {tipologia.fichaPendiente ? (
                  <span className="rounded-sm bg-plate px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted group-hover:bg-steel group-hover:text-white/70">
                    Ficha en validación
                  </span>
                ) : null}
              </div>
              <TipologiaDiagram
                variante={tipologia.diagrama}
                className="h-20 w-full text-ink group-hover:text-white"
              />
              <div>
                <h2 className="font-display text-xl uppercase leading-tight text-ink group-hover:text-white">
                  {tipologia.nombre}
                </h2>
                <p className="mt-1 text-sm text-ink-muted group-hover:text-white/70">
                  {tipologia.resumen}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
