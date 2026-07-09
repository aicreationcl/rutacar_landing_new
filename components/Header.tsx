import Link from "next/link";
import { navegacion } from "@/lib/content/empresa";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CotizarCta } from "@/components/cotizador/CotizarCta";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-graphite text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl uppercase tracking-wide">
          Ruta<span className="text-amber">Car</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:flex md:items-center md:gap-8">
          {navegacion.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-white/80 hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />

        <div className="hidden md:block">
          <CotizarCta label="Cotizar" />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
