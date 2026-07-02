import type { NextConfig } from "next";

/**
 * Redirecciones 301 desde las URLs conocidas de rutacar.cl (WordPress) hacia la
 * nueva estructura. Verificadas manualmente: /carrocerias/ y /contacto/.
 * /nosotros/ se infiere del menú del sitio actual pero no fue verificada URL por URL.
 *
 * RIESGO R-002 (plan-ejecucion.md): antes de apuntar el dominio real de producción,
 * mapear el 100% de las URLs indexadas de rutacar.cl (ej. revisando Search Console
 * o un crawl completo) y completar esta lista — no asumir que son solo estas 3.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/nosotros/", destination: "/nosotros", permanent: true },
      { source: "/carrocerias/", destination: "/carrocerias", permanent: true },
      { source: "/contacto/", destination: "/contacto", permanent: true },
    ];
  },
};

export default nextConfig;
