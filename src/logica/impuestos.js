import { RETENCIONES, TIPOS_CLIENTE } from '../datos/parametros.js';
import { retencionesDePais } from './paises.js';

/**
 * Fracción del ingreso que se va en aportes a seguridad social como independiente.
 * Colombia: base de cotización × (salud + pensión + riesgos) = 0,4 × 29,022 % = 11,61 %.
 * Otros países: la tasa efectiva de su régimen (aportesEfectivos), que resume cuotas
 * fijas, tramos o porcentajes (ver docs/PAISES_Y_FUENTES.md).
 */
export function tasaSeguridadSocial(parametros) {
  if (parametros.aportesEfectivos !== undefined && parametros.aportesEfectivos !== null) {
    return Number(parametros.aportesEfectivos) || 0;
  }
  return (
    (Number(parametros.ibcIndependiente) || 0) *
    ((Number(parametros.salud) || 0) + (Number(parametros.pension) || 0) + (Number(parametros.arl) || 0))
  );
}

/**
 * Aporte mínimo mensual de un independiente. Si el país tiene una cuota mínima
 * conocida se usa esa (0 si no hay); si no, el aporte sobre un salario mínimo (Colombia).
 */
export function aporteMinimoMensual(parametros) {
  if (parametros.aporteMinimo !== undefined && parametros.aporteMinimo !== null) return Number(parametros.aporteMinimo) || 0;
  return (Number(parametros.smmlv) || 0) * ((Number(parametros.salud) || 0) + (Number(parametros.pension) || 0) + (Number(parametros.arl) || 0));
}

/** Retenciones que se pueden elegir en el país (sin la opción automática). */
export function opcionesRetencion(parametros) {
  const pais = parametros?.pais ?? 'CO';
  if (pais === 'CO') return Object.values(RETENCIONES).filter((r) => r.id !== 'auto');
  return [{ id: 'ninguna', nombre: RETENCIONES.ninguna.nombre, tasa: 0 }, ...retencionesDePais(pais)];
}

/**
 * Concepto de retención que aplica. En modo automático:
 * - Personas naturales y emprendimientos pequeños normalmente no retienen.
 * - Los clientes del exterior no practican retención local.
 * - Colombia: el concepto típico de la categoría del producto.
 * - Otros países: la retención general sobre honorarios del país (la primera de su lista
 *   que no tenga auto: false). Si no hay, ninguna.
 */
export function resolverRetencion(condiciones, producto, parametros = { pais: 'CO' }) {
  const pais = parametros?.pais ?? 'CO';
  const elegida = condiciones.retencion ?? 'auto';
  if (elegida !== 'auto' && opcionesRetencion(parametros).some((r) => r.id === elegida)) return elegida;
  if (condiciones.mercado === 'internacional') return 'ninguna';
  const cliente = TIPOS_CLIENTE[condiciones.tipoCliente];
  if (!cliente || !cliente.retiene) return 'ninguna';
  if (pais === 'CO') return producto.retencion ?? 'honorarios10';
  return retencionesDePais(pais).find((r) => r.auto !== false)?.id ?? 'ninguna';
}

export function tasaRetencion(idRetencion, parametros = { pais: 'CO' }) {
  const pais = parametros?.pais ?? 'CO';
  if (pais === 'CO') return RETENCIONES[idRetencion]?.tasa ?? 0;
  return opcionesRetencion(parametros).find((r) => r.id === idRetencion)?.tasa ?? 0;
}
