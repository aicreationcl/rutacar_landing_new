# Arquitectura — rutacar_landing_new

## Incremento 01 · Sitio corporativo + SEO

Next.js 16 (App Router) + TypeScript + Tailwind CSS, contenido tipado (sin CMS externo). Justificación completa de esta decisión en [`../2-propuesta/01-sitio-corporativo-seo/prompt-maestro-desarrollo.md`](../2-propuesta/01-sitio-corporativo-seo/prompt-maestro-desarrollo.md). Catálogo de tipologías en `lib/content/tipologias.ts`, single source of truth (LA-2026-027) — cualquier dato de una tipología (nombre, specs, industrias) se lee de ahí, nunca se duplica a mano en un componente.

## Incremento 02 · Cotizador — este sitio como frontend + proxy

Este sitio sigue siendo el único punto público de contacto. La lógica de negocio del cotizador (persistencia, reglas de cálculo, notificaciones) vive en un backend separado, **`rutacar_landing_back`** — ver la justificación completa de por qué es un servicio aparte (y no Route Handlers embebidos) en [`../2-propuesta/02-cotizador-carrocerias/prompt-maestro-desarrollo.md`](../2-propuesta/02-cotizador-carrocerias/prompt-maestro-desarrollo.md).

```
Navegador ──POST──▶ app/api/cotizaciones/route.ts ──POST (x-backend-api-key)──▶ rutacar_landing_back ──▶ MongoDB Atlas
                     (este repo, server-side)
```

`app/api/cotizaciones/route.ts` es un **proxy server-to-server**, no un simple passthrough:

1. Aplica rate limiting por IP real del visitante (`lib/server/rateLimit.ts`) — el backend no puede hacerlo porque solo ve la IP de este servidor.
2. Resuelve `tipologiaNombre` desde `lib/content/tipologias.ts` a partir del `tipologiaSlug` recibido — nunca confía en un nombre que mande el cliente.
3. Reenvía al backend con la API key server-only (`BACKEND_API_KEY`, `BACKEND_API_URL` en `.env.example` — nunca `NEXT_PUBLIC_*`).
4. Relee la respuesta del backend y la devuelve tal cual al cliente.

El navegador nunca tiene, ni necesita, la URL o la API key del backend.

## Variables de entorno

Ver [`.env.example`](.env.example). Las variables del cotizador (`BACKEND_API_URL`, `BACKEND_API_KEY`) son server-only, a diferencia de las existentes del Incremento 01 (`NEXT_PUBLIC_*`).

## Deuda técnica

Ver [`../2-propuesta/02-cotizador-carrocerias/rutacar_landing_back/DEUDA_TECNICA.md`](../2-propuesta/02-cotizador-carrocerias/rutacar_landing_back/DEUDA_TECNICA.md) — cubre ambos repos del Incremento 02.
