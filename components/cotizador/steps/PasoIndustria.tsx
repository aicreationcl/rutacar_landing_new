import { getTipologiaBySlug } from "@/lib/content/tipologias";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";

export function PasoIndustria({
  tipologiaSlug,
  industria,
  usoEspecifico,
  onCambiarIndustria,
  onCambiarUsoEspecifico,
  error,
}: {
  tipologiaSlug: string;
  industria: string;
  usoEspecifico: string;
  onCambiarIndustria: (valor: string) => void;
  onCambiarUsoEspecifico: (valor: string) => void;
  error?: string;
}) {
  const tipologia = getTipologiaBySlug(tipologiaSlug);
  const opciones = (tipologia?.industrias ?? []).map((valor) => ({ value: valor, label: valor }));

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Select
        id="industria"
        label="Industria o uso principal"
        value={industria}
        onChange={onCambiarIndustria}
        opciones={opciones}
        requerido
        error={error}
      />
      <Input
        id="usoEspecifico"
        label="Uso específico (opcional)"
        value={usoEspecifico}
        onChange={onCambiarUsoEspecifico}
        placeholder="Ej: Reparto urbano diario"
      />
    </div>
  );
}
