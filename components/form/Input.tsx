import { FieldError } from "./FieldError";

export function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  requerido,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (valor: string) => void;
  type?: "text" | "email" | "tel" | "number";
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
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={requerido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="mt-2 w-full rounded-sm border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60"
      />
      <FieldError id={errorId} mensaje={error} />
    </div>
  );
}
