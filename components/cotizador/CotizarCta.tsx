import Link from "next/link";
import { ctaClassName } from "@/components/WhatsappCta";

export function CotizarCta({
  href = "/cotizador",
  label = "Cotizar",
  variant = "solid",
  className = "",
}: {
  href?: string;
  label?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return (
    <Link href={href} className={ctaClassName(variant, className)}>
      {label}
    </Link>
  );
}
