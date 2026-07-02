import type { MetadataRoute } from "next";
import { tipologias } from "@/lib/content/tipologias";

// LA-2026-028: el dominio se lee de una única variable de entorno; verificar con
// curl contra la URL real de producción antes de dar el incremento por cerrado.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutasEstaticas = ["", "/nosotros", "/industrias", "/carrocerias", "/contacto"].map(
    (ruta) => ({
      url: `${siteUrl}${ruta}`,
      lastModified: new Date(),
    })
  );

  const rutasTipologias = tipologias.map((t) => ({
    url: `${siteUrl}/carrocerias/${t.slug}`,
    lastModified: new Date(),
  }));

  return [...rutasEstaticas, ...rutasTipologias];
}
