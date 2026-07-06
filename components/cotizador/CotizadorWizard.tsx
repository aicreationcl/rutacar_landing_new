"use client";

import { useEffect, useReducer, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getTipologiaBySlug } from "@/lib/content/tipologias";
import { enviarCotizacion } from "@/lib/cotizador/api";
import { validarPaso } from "@/lib/cotizador/validacion";
import { ctaClassName } from "@/components/WhatsappCta";
import { trackEvent } from "@/components/Analytics";
import type { CotizadorFormData } from "@/lib/cotizador/types";
import { StepIndicator } from "./StepIndicator";
import { ResultadoCotizacion } from "./ResultadoCotizacion";
import { ErrorEnvio } from "./ErrorEnvio";
import { PasoTipologia } from "./steps/PasoTipologia";
import { PasoIndustria } from "./steps/PasoIndustria";
import { PasoEspecificaciones } from "./steps/PasoEspecificaciones";
import { PasoContacto } from "./steps/PasoContacto";
import { cotizadorReducer, crearEstadoInicial, TOTAL_PASOS } from "./cotizadorReducer";

const NOMBRES_PASO = ["Tipo de carrocería", "Industria y uso", "Especificaciones técnicas", "Datos de contacto"];

export function CotizadorWizard() {
  const searchParams = useSearchParams();
  const tipologiaQuery = searchParams.get("tipologia");
  const slugInicial = tipologiaQuery && getTipologiaBySlug(tipologiaQuery) ? tipologiaQuery : undefined;

  const [estado, dispatch] = useReducer(cotizadorReducer, slugInicial, crearEstadoInicial);
  const tituloPasoRef = useRef<HTMLHeadingElement>(null);
  const pasoMontadoRef = useRef(estado.paso);

  // Mueve el foco al título del paso solo cuando el paso realmente cambia
  // (avanzar/retroceder), nunca en cada tecleo — LA-2026-043.
  useEffect(() => {
    if (pasoMontadoRef.current !== estado.paso) {
      tituloPasoRef.current?.focus();
      pasoMontadoRef.current = estado.paso;
    }
  }, [estado.paso]);

  function setCampo(campo: keyof CotizadorFormData, valor: string) {
    dispatch({ tipo: "SET_CAMPO", campo, valor });
  }

  async function enviar() {
    dispatch({ tipo: "ENVIAR" });
    const resultado = await enviarCotizacion(estado.datos);
    if (resultado.ok) {
      trackEvent("cotizacion_completada", { tipologia_slug: estado.datos.tipologiaSlug });
      dispatch({ tipo: "ENVIAR_EXITO", data: resultado.data });
    } else {
      dispatch({ tipo: "ENVIAR_ERROR", mensaje: resultado.mensaje });
    }
  }

  function manejarSiguienteOEnviar() {
    const errores = validarPaso(estado.paso, estado.datos);
    if (Object.keys(errores).length > 0) {
      dispatch({ tipo: "SIGUIENTE_PASO" });
      const primerCampoInvalido = Object.keys(errores)[0];
      requestAnimationFrame(() => document.getElementById(primerCampoInvalido)?.focus());
      return;
    }

    // Paso validado y completado — evento dormido hasta que Ruta Car entregue
    // NEXT_PUBLIC_GA_ID (ver Analytics.tsx), habilita medir abandono por paso.
    trackEvent("cotizador_paso_completado", { paso: estado.paso, tipologia_slug: estado.datos.tipologiaSlug });

    if (estado.paso < TOTAL_PASOS) {
      dispatch({ tipo: "SIGUIENTE_PASO" });
    } else {
      void enviar();
    }
  }

  if (estado.envio.fase === "exito") {
    return <ResultadoCotizacion data={estado.envio.data} />;
  }

  const enviando = estado.envio.fase === "enviando";
  const esUltimoPaso = estado.paso === TOTAL_PASOS;

  return (
    <div className="rounded-sm border border-line bg-paper p-6 sm:p-10">
      <StepIndicator pasoActual={estado.paso} />

      <h2
        ref={tituloPasoRef}
        tabIndex={-1}
        className="mt-8 font-display text-2xl uppercase tracking-tight text-ink outline-none"
      >
        {NOMBRES_PASO[estado.paso - 1]}
      </h2>

      <div className="mt-6">
        {estado.paso === 1 ? (
          <PasoTipologia
            valor={estado.datos.tipologiaSlug}
            onChange={(slug) => setCampo("tipologiaSlug", slug)}
            error={estado.errores.tipologiaSlug}
          />
        ) : null}

        {estado.paso === 2 ? (
          <PasoIndustria
            tipologiaSlug={estado.datos.tipologiaSlug}
            industria={estado.datos.industria}
            usoEspecifico={estado.datos.usoEspecifico}
            onCambiarIndustria={(valor) => setCampo("industria", valor)}
            onCambiarUsoEspecifico={(valor) => setCampo("usoEspecifico", valor)}
            error={estado.errores.industria}
          />
        ) : null}

        {estado.paso === 3 ? (
          <PasoEspecificaciones
            tipologiaSlug={estado.datos.tipologiaSlug}
            datos={estado.datos}
            errores={estado.errores}
            onCambiarCampo={setCampo}
          />
        ) : null}

        {estado.paso === 4 ? (
          <PasoContacto datos={estado.datos} errores={estado.errores} onCambiarCampo={setCampo} />
        ) : null}
      </div>

      {estado.envio.fase === "error" ? (
        <div className="mt-6">
          <ErrorEnvio mensaje={estado.envio.mensaje} mostrarWhatsapp onReintentar={enviar} />
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap justify-between gap-4">
        <button
          type="button"
          onClick={() => dispatch({ tipo: "PASO_ANTERIOR" })}
          disabled={estado.paso === 1 || enviando}
          className="inline-flex items-center gap-2 rounded-sm border border-line px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-ink hover:border-amber-deep hover:text-amber-deep disabled:opacity-40"
        >
          Anterior
        </button>

        <button
          type="button"
          onClick={manejarSiguienteOEnviar}
          disabled={enviando}
          className={ctaClassName("solid", "disabled:opacity-60")}
        >
          {enviando ? "Enviando…" : esUltimoPaso ? "Enviar cotización" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
