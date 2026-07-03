export function FieldError({ id, mensaje }: { id: string; mensaje?: string }) {
  if (!mensaje) return null;

  return (
    <p id={id} role="alert" className="mt-1 font-mono text-xs text-amber-deep">
      {mensaje}
    </p>
  );
}
