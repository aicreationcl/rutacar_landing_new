import { FieldError } from "./FieldError";

export function Select({
  id,
  label,
  value,
  onChange,
  opciones,
  placeholder = "Selecciona una opción",
  requerido,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (valor: string) => void;
  opciones: { value: string; label: string }[];
  placeholder?: string;
  requerido?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-ink-muted">
        {label}
        {requerido ? (
          <span aria-hidden="true" className="text-amber-deep">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={requerido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="mt-2 w-full rounded-sm border border-line bg-paper px-4 py-3 text-ink"
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} mensaje={error} />
    </div>
  );
}
