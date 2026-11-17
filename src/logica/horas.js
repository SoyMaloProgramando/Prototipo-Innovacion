import {
  CURVA_APRENDIZAJE,
  GESTION_PROYECTO,
  HORAS_POR_REVISION,
  IMPREVISTOS_POR_POCO_DOMINIO,
  NIVELES_COMPLEJIDAD,
} from '../datos/parametros.js';
import { limitar } from './formato.js';

export function redondearMediaHora(horas) {
  return Math.round(horas * 2) / 2;
}

function nivelDe(complejidad) {
  return NIVELES_COMPLEJIDAD[complejidad] ?? NIVELES_COMPLEJIDAD.intermedio;
}

/**
 * Horas sugeridas por el catálogo para un producto:
 *   horasBase × factor del nivel + unidades × horas por unidad del nivel
 */
export function horasSugeridas(producto, unidades, complejidad) {
  const nivel = nivelDe(complejidad);
  const cantidad = Math.max(0, Number(unidades) || 0);
  const horas = producto.horasBase * nivel.factorBase + cantidad * producto.horasPorUnidad[nivel.id];
  return redondearMediaHora(horas);
}

/** Horas sugeridas en los tres niveles para las mismas unidades. */
export function horasPorNivel(producto, unidades = producto.unidades.defecto) {
  return {
    basico: horasSugeridas(producto, unidades, 'basico'),
    intermedio: horasSugeridas(producto, unidades, 'intermedio'),
    avanzado: horasSugeridas(producto, unidades, 'avanzado'),
  };
}

/** Horas de cada ronda de revisión (mínimo 1 h). */
export function horasPorRonda(horasEstimadas) {
  return horasEstimadas > 0 ? Math.max(1, horasEstimadas * HORAS_POR_REVISION) : 0;
}

/**
 * Convierte las horas estimadas en horas facturables y horas reales probables.
 *
 * - Facturables = estimadas + imprevistos + revisiones + gestión
 *   (imprevistos = colchón del nivel + hasta 20 % extra si dominas poco el tema).
 * - Reales = estimadas × (1 + imprevistos del nivel) + curva de aprendizaje + revisiones + gestión
 *   (aprender te toma hasta 50 % más; solo una parte se cobra, el resto es tu inversión).
 */
export function calcularHoras({
  horasEstimadas,
  especialidad,
  complejidad,
  revisiones,
  aplicaRevisiones = true,
  imprevistosManual = null,
}) {
  const estimadas = Math.max(0, Number(horasEstimadas) || 0);
  const dominio = limitar(Number(especialidad) || 0, 0, 100) / 100;
  const falta = 1 - dominio;
  const nivel = nivelDe(complejidad);

  const imprevistosNivel = nivel.imprevistos;
  const imprevistosDominio = IMPREVISTOS_POR_POCO_DOMINIO * falta;
  const imprevistosPct =
    imprevistosManual === null || imprevistosManual === undefined
      ? imprevistosNivel + imprevistosDominio
      : Math.max(0, Number(imprevistosManual) || 0);
  const horasImprevistos = estimadas * imprevistosPct;

  const rondas = aplicaRevisiones ? Math.max(0, Math.round(Number(revisiones) || 0)) : 0;
  const porRonda = horasPorRonda(estimadas);
  const horasRevisiones = rondas * porRonda;
  const horasGestion = estimadas * GESTION_PROYECTO;

  const facturables = estimadas + horasImprevistos + horasRevisiones + horasGestion;
  const horasAprendizaje = estimadas * CURVA_APRENDIZAJE * falta;
  const reales = estimadas * (1 + imprevistosNivel) + horasAprendizaje + horasRevisiones + horasGestion;
  // Se descartan residuos de coma flotante (por ejemplo 1e-14 h).
  const diferencia = reales - facturables;

  return {
    estimadas,
    imprevistosPct,
    imprevistosNivel,
    imprevistosDominio,
    horasImprevistos,
    rondas,
    horasPorRonda: porRonda,
    horasRevisiones,
    horasGestion,
    facturables,
    horasAprendizaje,
    reales,
    noCobradas: diferencia > 1e-9 ? diferencia : 0,
  };
}
