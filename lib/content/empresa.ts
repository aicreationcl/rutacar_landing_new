/**
 * Fuente única de verdad para datos de la empresa (LA-2026-027).
 * Ningún componente debe escribir estos valores a mano: siempre importar desde aquí.
 * Datos verificados contra rutacar.cl/contacto/ — no inventar ni completar campos vacíos.
 */
export const empresa = {
  nombre: "Ruta Car",
  descripcionCorta:
    "Fabricante de carrocerías especializadas para vehículos comerciales.",
  telefono: "+56 9 6787 4708",
  telefonoWhatsapp: "56967874708",
  email: "contacto@rutacar.cl",
  direccion: {
    linea1: "Tucapel 1285, Galpón 2",
    linea2: "La Pintana, Santiago, Chile",
  },
  redesSociales: [] as const, // No hay enlaces a redes sociales publicados en el sitio actual.
} as const;

export function whatsappUrl(mensaje: string) {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${empresa.telefonoWhatsapp}?text=${texto}`;
}

export const navegacion = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/industrias", label: "Industrias" },
  { href: "/carrocerias", label: "Carrocerías" },
  { href: "/cotizador", label: "Cotizador" },
  { href: "/contacto", label: "Contacto" },
] as const;
