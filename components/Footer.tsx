import Link from "next/link";
import { empresa, navegacion } from "@/lib/content/empresa";

export function Footer() {
  return (
    <footer className="bg-graphite text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl uppercase tracking-wide">
            Ruta<span className="text-amber">Car</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">{empresa.descripcionCorta}</p>
        </div>

        <nav aria-label="Mapa del sitio" className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Navegación</p>
          {navegacion.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-paper/80 hover:text-amber">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Contacto</p>
          <a href={`tel:${empresa.telefono.replace(/\s/g, "")}`} className="text-sm text-paper/80 hover:text-amber">
            {empresa.telefono}
          </a>
          <a href={`mailto:${empresa.email}`} className="text-sm text-paper/80 hover:text-amber">
            {empresa.email}
          </a>
          <p className="text-sm text-paper/80">
            {empresa.direccion.linea1}
            <br />
            {empresa.direccion.linea2}
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-4 text-center font-mono text-xs text-paper/60">
        © {new Date().getFullYear()} Dvlpr_Chris. Todos los derechos reservados.
      </div>
    </footer>
  );
}
