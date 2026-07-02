import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WhatsappCta } from "@/components/WhatsappCta";
import { empresa } from "@/lib/content/empresa";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Ruta Car por WhatsApp, teléfono o correo, o visita nuestro taller en La Pintana, Santiago.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre tu carrocería"
        lede="Escríbenos por WhatsApp con el tipo de vehículo y el uso que necesitas. Te contactamos directamente para cotizar."
      />

      <section className="bg-paper px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div className="rounded-sm border border-line bg-plate p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">WhatsApp</p>
            <p className="mt-2 font-display text-2xl text-ink">{empresa.telefono}</p>
            <WhatsappCta className="mt-6" />
          </div>

          <div className="rounded-sm border border-line bg-plate p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Correo</p>
            <a href={`mailto:${empresa.email}`} className="mt-2 block font-display text-2xl text-ink hover:text-amber-deep">
              {empresa.email}
            </a>
          </div>

          <div className="rounded-sm border border-line bg-plate p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Taller</p>
            <p className="mt-2 font-display text-xl leading-tight text-ink">
              {empresa.direccion.linea1}
              <br />
              {empresa.direccion.linea2}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
