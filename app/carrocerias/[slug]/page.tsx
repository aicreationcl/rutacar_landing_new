import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { TipologiaDiagram } from "@/components/TipologiaDiagram";
import { WhatsappCta } from "@/components/WhatsappCta";
import { CotizarCta } from "@/components/cotizador/CotizarCta";
import { PrecalificacionSection } from "@/components/precalificacion/PrecalificacionSection";
import { getTipologiaBySlug, tipologias } from "@/lib/content/tipologias";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tipologias.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tipologia = getTipologiaBySlug(slug);
  if (!tipologia) return {};

  return {
    title: tipologia.nombre,
    description: tipologia.descripcion,
    openGraph: {
      title: `${tipologia.nombre} — Ruta Car`,
      description: tipologia.descripcion,
    },
  };
}

export default async function TipologiaPage({ params }: Props) {
  const { slug } = await params;
  const tipologia = getTipologiaBySlug(slug);

  if (!tipologia) notFound();

  return (
    <>
      <PageHero eyebrow={`Carrocerías / ${tipologia.codigo}`} title={tipologia.nombre} />

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div className="rounded-sm border border-line bg-plate p-8">
            <TipologiaDiagram variante={tipologia.diagrama} className="h-40 w-full text-ink" />
          </div>

          <div>
            <p className="text-lg text-ink">{tipologia.descripcion}</p>

            <div className="mt-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink-muted">Industrias</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tipologia.industrias.map((industria) => (
                  <li
                    key={industria}
                    className="rounded-sm border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted"
                  >
                    {industria}
                  </li>
                ))}
              </ul>
            </div>

            {tipologia.especificaciones.length > 0 ? (
              <div className="mt-8">
                <h2 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Características
                </h2>
                <ul className="mt-3 space-y-2">
                  {tipologia.especificaciones.map((spec) => (
                    <li key={spec} className="flex gap-2 text-sm text-ink">
                      <span aria-hidden="true" className="text-amber-deep">
                        —
                      </span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tipologia.fichaPendiente ? (
              <p className="mt-8 rounded-sm border border-line bg-plate p-4 text-sm text-ink-muted">
                La ficha técnica detallada de este modelo (dimensiones, capacidad y
                materiales) está en proceso de validación con Ruta Car. Escríbenos
                para recibir las especificaciones exactas según tu vehículo.
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-4">
              <CotizarCta href={`/cotizador?tipologia=${tipologia.slug}`} label="Cotizar esta carrocería" />
              <WhatsappCta mensaje={`Hola, quiero cotizar una carrocería ${tipologia.nombre}`} />
              <Link
                href="/carrocerias"
                className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ink hover:border-amber-deep hover:text-amber-deep"
              >
                Ver todo el catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PrecalificacionSection
        heading="¿Prefieres que te contactemos primero?"
        description="Si no estás seguro de las especificaciones técnicas, déjanos tus datos y te ayudamos a definirlas — una alternativa más rápida que el cotizador completo."
        tipoVehiculoInicial={tipologia.slug}
      />
    </>
  );
}
