import { Input } from "@/components/form/Input";
import { TextArea } from "@/components/form/TextArea";
import type { CotizadorFormData, ErroresPaso } from "@/lib/cotizador/types";

export function PasoContacto({
  datos,
  errores,
  onCambiarCampo,
}: {
  datos: CotizadorFormData;
  errores: ErroresPaso;
  onCambiarCampo: (campo: keyof CotizadorFormData, valor: string) => void;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Input
        id="nombre"
        label="Nombre completo"
        value={datos.nombre}
        onChange={(valor) => onCambiarCampo("nombre", valor)}
        requerido
        error={errores.nombre}
      />
      <Input
        id="email"
        type="email"
        label="Correo electrónico"
        value={datos.email}
        onChange={(valor) => onCambiarCampo("email", valor)}
        requerido
        error={errores.email}
      />
      <Input
        id="telefono"
        type="tel"
        label="Teléfono"
        value={datos.telefono}
        onChange={(valor) => onCambiarCampo("telefono", valor)}
        requerido
        error={errores.telefono}
      />
      <Input
        id="empresa"
        label="Empresa (opcional)"
        value={datos.empresa}
        onChange={(valor) => onCambiarCampo("empresa", valor)}
      />
      <div className="sm:col-span-2">
        <TextArea
          id="comentario"
          label="Comentario adicional (opcional)"
          value={datos.comentario}
          onChange={(valor) => onCambiarCampo("comentario", valor)}
        />
      </div>
    </div>
  );
}
