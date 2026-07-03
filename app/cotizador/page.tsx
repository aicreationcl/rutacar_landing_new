import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { CotizadorWizard } from "@/components/cotizador/CotizadorWizard";

export const metadata: Metadata = {
  title: "Cotizador",
  description:
    "Cuéntanos el tipo de carrocería, la industria y las especificaciones que necesitas y recibe una cotización preliminar.",
};

function CotizadorWizardFallback() {
  return (
    <div className="rounded-sm border border-line bg-paper p-10 text-sm text-ink-muted">
      Cargando cotizador…
    </div>
  );
}

export default function CotizadorPage() {
  return (
    <>
      <PageHero
        eyebrow="Cotizador"
        title="Cotiza tu carrocería"
        lede="Cuéntanos el tipo de vehículo, la industria y el uso que necesitas. Recibirás una estimación preliminar y un asesor te contactará para confirmarla."
      />

      <section className="bg-plate px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Suspense fallback={<CotizadorWizardFallback />}>
            <CotizadorWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
