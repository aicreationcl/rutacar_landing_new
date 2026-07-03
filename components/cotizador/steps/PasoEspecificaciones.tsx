import { getTipologiaBySlug } from "@/lib/content/tipologias";
import { CAMPOS_ESPECIFICACIONES, PLAZO_OPCIONES } from "@/lib/cotizador/especificacionesConfig";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { TextArea } from "@/components/form/TextArea";
import type { CotizadorFormData, ErroresPaso } from "@/lib/cotizador/types";

export function PasoEspecificaciones({
  tipologiaSlug,
  datos,
  errores,
  onCambiarCampo,
}: {
  tipologiaSlug: string;
  datos: CotizadorFormData;
  errores: ErroresPaso;
  onCambiarCampo: (campo: keyof CotizadorFormData, valor: string) => void;
}) {
  const tipologia = getTipologiaBySlug(tipologiaSlug);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        {CAMPOS_ESPECIFICACIONES.map((config) => {
          const valor = datos[config.campo];
          const error = errores[config.campo];

          if (config.tipo === "select") {
            return (
              <Select
                key={config.campo}
                id={config.campo}
                label={config.label}
                value={valor}
                onChange={(nuevoValor) => onCambiarCampo(config.campo, nuevoValor)}
                opciones={PLAZO_OPCIONES}
                requerido={config.requerido}
                error={error}
              />
            );
          }

          if (config.tipo === "textarea") {
            return (
              <TextArea
                key={config.campo}
                id={config.campo}
                label={config.label}
                value={valor}
                onChange={(nuevoValor) => onCambiarCampo(config.campo, nuevoValor)}
                placeholder={config.placeholder}
                requerido={config.requerido}
                error={error}
              />
            );
          }

          return (
            <Input
              key={config.campo}
              id={config.campo}
              label={config.label}
              value={valor}
              onChange={(nuevoValor) => onCambiarCampo(config.campo, nuevoValor)}
              type={config.tipo === "number" ? "number" : "text"}
              placeholder={config.placeholder}
              requerido={config.requerido}
              error={error}
            />
          );
        })}
      </div>

      {tipologia ? (
        <div className="rounded-sm border border-line bg-plate p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Referencia — {tipologia.nombre}
          </p>
          <p className="mt-3 text-sm text-ink">{tipologia.descripcion}</p>
          {tipologia.especificaciones.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {tipologia.especificaciones.map((spec) => (
                <li key={spec} className="flex gap-2 text-sm text-ink-muted">
                  <span aria-hidden="true" className="text-amber-deep">
                    —
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
