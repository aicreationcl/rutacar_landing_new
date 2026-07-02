"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * No hace nada si NEXT_PUBLIC_GA_ID no está configurado (Ruta Car aún no ha
 * entregado su propiedad de GA4). Evita cargar un script roto o inventar un ID.
 *
 * Escucha clics en cualquier elemento con [data-analytics-event] (ver
 * WhatsappCta) y los reenvía como eventos de GA4, sin acoplar los componentes
 * de UI a la lógica de analítica.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID) return;

    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>(
        "[data-analytics-event]"
      );
      if (!target) return;
      window.gtag?.("event", target.dataset.analyticsEvent as string);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
