/**
 * Nombres traducidos de cosas que vienen del cálculo (retenciones, festivos...).
 * Uso: nombreRetencion(t, 'CO', 'honorarios10')
 */
import { retencionesDePais } from '../logica/paises.js';

/** Nombre de una retención: las de Colombia se traducen; las de otros países usan su nombre legal. */
export function nombreRetencion(t, paisId, retencionId) {
  if (!retencionId || retencionId === 'ninguna' || retencionId === 'auto') return t(`parametros.retenciones.${retencionId || 'ninguna'}`);
  if ((paisId ?? 'CO') === 'CO') return t(`parametros.retenciones.${retencionId}`);
  const encontrada = retencionesDePais(paisId).find((r) => r.id === retencionId);
  return encontrada?.nombre ?? retencionId;
}

/** Nombre de un festivo en el idioma pedido (o en el idioma del país si no hay traducción). */
export function nombreFestivo(festivo, idioma) {
  return festivo?.nombres?.[idioma] ?? festivo?.nombre ?? '';
}
