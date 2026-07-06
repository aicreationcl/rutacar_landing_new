"use client";

import { useState } from "react";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { ctaClassName } from "@/components/WhatsappCta";
import { trackEvent } from "@/components/Analytics";
import { tipologias } from "@/lib/content/tipologias";
import { PLAZO_OPCIONES } from "@/lib/cotizador/especificacionesConfig";
import { industriasGlobales } from "@/lib/precalificacion/industriasGlobales";
import { enviarPrecalificacion } from "@/lib/precalificacion/api";
import { validarFormulario } from "@/lib/precalificacion/validacion";
import { ESTADO_INICIAL_FORMULARIO } from "@/lib/precalificacion/types";
import type { ErroresFormulario, PrecalificacionFormData, PrecalificacionExito } from "@/lib/precalificacion/types";
import { ResultadoPrecalificacion } from "./ResultadoPrecalificacion";
import { ErrorEnvio } from "@/components/cotizador/ErrorEnvio";

const OPCIONES_TIPO_VEHICULO = [
  ...tipologias.map((t) => ({ value: t.slug, label: t.nombre })),
  { value: "no-se", label: "No estoy seguro" },
];

const OPCIONES_INDUSTRIA = industriasGlobales.map((valor) => ({ value: valor, label: valor }));

type EstadoEnvio =
  | { fase: "inactivo" }
  | { fase: "enviando" }
  | { fase: "exito"; data: PrecalificacionExito }
  | { fase: "error"; mensaje: string };

export function PrecalificacionForm({ tipoVehiculoInicial }: { tipoVehiculoInicial?: string }) {
  const [datos, setDatos] = useState<PrecalificacionFormData>(
    tipoVehiculoInicial ? { ...ESTADO_INICIAL_FORMULARIO, tipoVehiculo: tipoVehiculoInicial } : ESTADO_INICIAL_FORMULARIO,
  );
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [envio, setEnvio] = useState<EstadoEnvio>({ fase: "inactivo" });

  function setCampo(campo: keyof PrecalificacionFormData, valor: string) {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  async function enviar() {
    const erroresValidacion = validarFormulario(datos);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setEnvio({ fase: "enviando" });
    const resultado = await enviarPrecalificacion(datos);
    if (resultado.ok) {
      trackEvent("precalificacion_completada", {
        calificacion: resultado.data.calificacion,
        tipo_vehiculo: datos.tipoVehiculo,
      });
      setEnvio({ fase: "exito", data: resultado.data });
    } else {
      setEnvio({ fase: "error", mensaje: resultado.mensaje });
    }
  }

  if (envio.fase === "exito") {
    return <ResultadoPrecalificacion data={envio.data} />;
  }

  const enviando = envio.fase === "enviando";

  return (
    <div className="rounded-sm border border-line bg-paper p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          id="tipoVehiculo"
          label="Tipo de vehículo o carrocería"
          value={datos.tipoVehiculo}
          onChange={(valor) => setCampo("tipoVehiculo", valor)}
          opciones={OPCIONES_TIPO_VEHICULO}
          requerido
          error={errores.tipoVehiculo}
        />
        <Select
          id="industria"
          label="Industria o uso principal"
          value={datos.industria}
          onChange={(valor) => setCampo("industria", valor)}
          opciones={OPCIONES_INDUSTRIA}
          requerido
          error={errores.industria}
        />
        <Select
          id="plazoEstimado"
          label="Plazo estimado de compra"
          value={datos.plazoEstimado}
          onChange={(valor) => setCampo("plazoEstimado", valor)}
          opciones={PLAZO_OPCIONES}
          requerido
          error={errores.plazoEstimado}
        />
        <Input
          id="usoPrincipal"
          label="Uso específico (opcional)"
          value={datos.usoPrincipal}
          onChange={(valor) => setCampo("usoPrincipal", valor)}
          placeholder="Ej: Reparto urbano diario"
        />
        <Input
          id="nombre"
          label="Nombre completo"
          value={datos.nombre}
          onChange={(valor) => setCampo("nombre", valor)}
          requerido
          error={errores.nombre}
        />
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          value={datos.email}
          onChange={(valor) => setCampo("email", valor)}
          requerido
          error={errores.email}
        />
        <Input
          id="telefono"
          type="tel"
          label="Teléfono"
          value={datos.telefono}
          onChange={(valor) => setCampo("telefono", valor)}
          requerido
          error={errores.telefono}
        />
      </div>

      {envio.fase === "error" ? (
        <div className="mt-6">
          <ErrorEnvio mensaje={envio.mensaje} mostrarWhatsapp onReintentar={enviar} />
        </div>
      ) : null}

      <div className="mt-8">
        <button
          type="button"
          onClick={enviar}
          disabled={enviando}
          className={ctaClassName("solid", "disabled:opacity-60")}
        >
          {enviando ? "Enviando…" : "Enviar solicitud"}
        </button>
      </div>
    </div>
  );
}
