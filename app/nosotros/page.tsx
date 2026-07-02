import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { empresa } from "@/lib/content/empresa";
import { industrias } from "@/lib/content/tipologias";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Ruta Car es un fabricante chileno de carrocerías especializadas, con taller en La Pintana, Santiago.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Especialistas en fabricación de carrocerías a medida"
        lede="Diseñamos y fabricamos carrocerías especializadas para vehículos comerciales, adaptadas a la operación real de cada cliente."
      />

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
              Fabricación a medida, no en serie
            </h2>
            <p className="mt-4 text-ink-muted">
              {empresa.descripcionCorta} Cada carrocería se diseña según las
              necesidades específicas del cliente y del uso al que estará
              destinado el vehículo, en vez de partir de un modelo genérico.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
              Un taller, ocho especialidades
            </h2>
            <p className="mt-4 text-ink-muted">
              Nuestro catálogo cubre ocho tipologías distintas, desde carga
              general hasta carrocerías reforzadas para minería.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
            Industrias a las que servimos
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {industrias.map((industria) => (
              <li
                key={industria}
                className="rounded-sm border border-line bg-plate px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink-muted"
              >
                {industria}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-6xl rounded-sm border border-line bg-plate p-8">
          <h2 className="font-display text-xl uppercase tracking-tight text-ink">
            Nuestro taller
          </h2>
          <p className="mt-2 text-ink-muted">
            {empresa.direccion.linea1}, {empresa.direccion.linea2}
          </p>
        </div>
      </section>
    </>
  );
}
