import { tipologias } from "@/lib/content/tipologias";

/**
 * El visitante de este formulario puede no saber aún qué tipología necesita
 * (esa es la premisa del Incremento 03), así que la industria no se filtra
 * por una tipología — se deriva del catálogo completo (LA-2026-027, single
 * source of truth), nunca duplicada a mano.
 */
export const industriasGlobales: string[] = Array.from(
  new Set(tipologias.flatMap((tipologia) => tipologia.industrias)),
).sort();
