const NOMBRES_PASOS = ["Tipología", "Industria", "Especificaciones", "Contacto"];

export function StepIndicator({ pasoActual }: { pasoActual: number }) {
  return (
    <ol className="flex flex-wrap gap-4" aria-label="Progreso del formulario">
      {NOMBRES_PASOS.map((nombre, index) => {
        const numero = index + 1;
        const activo = numero === pasoActual;
        const completado = numero < pasoActual;

        return (
          <li key={nombre} className="flex items-center gap-2">
            <span
              aria-current={activo ? "step" : undefined}
              className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs ${
                activo
                  ? "bg-amber text-graphite"
                  : completado
                    ? "bg-ink text-paper"
                    : "border border-line text-ink-muted"
              }`}
            >
              {numero}
            </span>
            <span className={`font-mono text-xs uppercase tracking-widest ${activo ? "text-ink" : "text-ink-muted"}`}>
              {nombre}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
