/**
 * Consulta en internet el tipo de cambio del día (API gratuitas, sin clave ni registro).
 * - Todas las monedas: ExchangeRate-API (open.er-api.com). Si no responde, Currency API
 *   en jsDelivr y, si tampoco, su copia en Cloudflare Pages.
 * - Peso colombiano: la TRM oficial de la Superintendencia Financiera (datos.gov.co).
 * Si nada responde, la app sigue con los valores guardados en src/datos.
 *
 * Es el único pedido a internet de la app. Lo usa CotizadorContext al abrir la página y
 * cada 6 horas; lo que llega pasa por el reducer (acción CAMBIO_RECIBIDO).
 */
import { combinarCambio, leerRespuesta } from '../logica/cambio.js';
import { referenciasDeCambio } from '../logica/paises.js';

export const FUENTES_GENERALES = [
  { id: 'exchangerate-api', url: 'https://open.er-api.com/v6/latest/USD' },
  { id: 'currency-api', url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json' },
  { id: 'currency-api', url: 'https://latest.currency-api.pages.dev/v1/currencies/usd.json' },
];

export const FUENTE_TRM = {
  id: 'trm-colombia',
  url: 'https://www.datos.gov.co/resource/32sa-8pi3.json?$select=valor,vigenciadesde&$order=vigenciadesde%20DESC&$limit=1',
};

async function pedirJSON(url, fetchFn, tiempoMaximo) {
  const control = typeof AbortController === 'undefined' ? null : new AbortController();
  const reloj = control ? setTimeout(() => control.abort(), tiempoMaximo) : null;
  try {
    const respuesta = await fetchFn(url, control ? { signal: control.signal } : undefined);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    return await respuesta.json();
  } finally {
    if (reloj) clearTimeout(reloj);
  }
}

async function leerFuente(fuente, fetchFn, tiempoMaximo) {
  const leido = leerRespuesta(fuente.id, await pedirJSON(fuente.url, fetchFn, tiempoMaximo));
  return leido ? { ...leido, fuente: fuente.id } : null;
}

/** Prueba las fuentes en orden y devuelve la primera que responde bien. */
async function primeraQueResponda(fuentes, fetchFn, tiempoMaximo) {
  for (const fuente of fuentes) {
    try {
      const leido = await leerFuente(fuente, fetchFn, tiempoMaximo);
      if (leido) return leido;
    } catch {
      // Sin conexión, bloqueada o con otro formato: se prueba la siguiente.
    }
  }
  return null;
}

/**
 * Devuelve { tasas, fuentes, fechas, fecha, consultado } con las monedas que se pudieron
 * validar (unidades por dólar). Lanza un error si ninguna fuente respondió.
 */
export async function obtenerTipoDeCambio({
  fetchFn = typeof fetch === 'function' ? fetch.bind(globalThis) : null,
  tiempoMaximo = 8000,
  referencias = referenciasDeCambio(),
  ahora = () => new Date(),
} = {}) {
  if (!fetchFn) throw new Error('Este navegador no puede consultar internet');
  const [general, colombia] = await Promise.all([
    primeraQueResponda(FUENTES_GENERALES, fetchFn, tiempoMaximo),
    leerFuente(FUENTE_TRM, fetchFn, tiempoMaximo).catch(() => null),
  ]);
  const cambio = combinarCambio(general, colombia, referencias);
  if (!cambio) throw new Error('No se pudo consultar el tipo de cambio');
  return { ...cambio, consultado: ahora().toISOString() };
}
