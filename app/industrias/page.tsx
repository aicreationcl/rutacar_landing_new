import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { industrias, tipologias } from "@/lib/content/tipologias";

export const metadata: Metadata = {
  title: "Industrias",
  description:
    "Carrocerías especializadas para minería, ganadería, gas, construcción y logística. Conoce qué modelo de Ruta Car se ajusta a tu industria.",
};

export default function IndustriasPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrias"
        title="Una carrocería distinta para cada operación"
        lede="Cada industria exige requisitos técnicos distintos, y por eso organizamos el catálogo por sector."
      />

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-px overflow-hidden rounded-sm border border-line bg-line">
          {industrias.map((industria) => {
            const relacionadas = tipologias.filter((t) => t.industrias.includes(industria));
            return (
              <div key={industria} className="flex flex-col gap-4 bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-display text-xl uppercase tracking-tight text-ink sm:w-64">
                  {industria}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relacionadas.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/carrocerias/${t.slug}`}
                      className="rounded-sm border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-muted hover:border-amber-deep hover:text-amber-deep"
                    >
                      {t.codigo} · {t.nombre}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
