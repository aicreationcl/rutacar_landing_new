"use client";

import { useRef } from "react";
import Link from "next/link";
import { navegacion } from "@/lib/content/empresa";
import { WhatsappCta } from "@/components/WhatsappCta";

/**
 * Usa <dialog>.showModal() en vez de un focus-trap escrito a mano: el navegador
 * ya atrapa el foco y cierra con Esc de forma nativa (evita repetir LA-2026-031,
 * donde un menú móvil con foco custom dejaba escapar el Tab hacia contenido oculto).
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="md:hidden inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper"
        aria-label="Abrir menú de navegación"
      >
        Menú
        <span aria-hidden="true" className="flex flex-col gap-[3px]">
          <span className="block h-[2px] w-5 bg-paper" />
          <span className="block h-[2px] w-5 bg-paper" />
          <span className="block h-[2px] w-5 bg-paper" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-graphite p-0 text-paper backdrop:bg-graphite/70"
      >
        <div className="flex h-full flex-col p-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl uppercase tracking-wide">Ruta Car</span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="font-mono text-xs uppercase tracking-widest"
              aria-label="Cerrar menú"
            >
              Cerrar ✕
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col gap-6" aria-label="Navegación principal">
            {navegacion.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dialogRef.current?.close()}
                className="font-display text-4xl uppercase tracking-wide text-paper hover:text-amber"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <WhatsappCta className="w-full justify-center" />
        </div>
      </dialog>
    </>
  );
}
