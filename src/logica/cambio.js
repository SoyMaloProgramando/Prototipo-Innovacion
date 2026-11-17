/**
 * Tipo de cambio en vivo: cómo leer las respuestas de las API de monedas y cuándo
 * usar sus tasas. Funciones puras: el pedido a internet está en
 * src/servicios/tipoDeCambio.js y los cambios de estado en el reducer.
 *
 * Todas las tasas son "unidades de la moneda local por 1 dólar" (como la TRM).
 */
import { PAISES } from '../datos/paises.js';

/**
 * Monedas cuyo valor de las API no sirve. Cuba publica varias tasas oficiales y las
 * API dan la antigua de 24 CUP; la app usa la tasa oficial flotante, que se edita a mano.
 */
export const MONEDAS_SIN_API = new Set(['CUP']);

/** Una tasa nueva se acepta si está entre 1/5 y 5 veces la guardada: protege de datos dañados. */
export const MARGEN_CAMBIO = 5;

/** Cada cuánto se vuelve a consultar mientras la página está abierta (las API cambian una vez al día). */
export const INTERVALO_CAMBIO_MS = 6 * 60 * 60 * 1000;

/** Monedas de los 29 países que necesitan tipo de cambio (todas menos el dólar). */
export const MONEDAS_CON_CAMBIO = [...new Set(Object.values(PAISES).map((p) => p.moneda.codigo))].filter((m) => m !== 'USD');

/** Nombre para mostrar de cada fuente y su página (las API gratuitas piden citarlas). */
export const FUENTES_CAMBIO = {
  'trm-colombia': { nombre: 'TRM oficial (Superintendencia Financiera, datos.gov.co)', url: 'https://www.datos.gov.co/d/32sa-8pi3' },
  'exchangerate-api': { nombre: 'ExchangeRate-API', url: 'https://www.exchangerate-api.com' },
  'currency-api': { nombre: 'Currency API (fawazahmed0)', url: 'https://github.com/fawazahmed0/exchange-api' },
};

const esTasa = (v) => typeof v === 'number' && Number.isFinite(v) && v > 0;

function fechaDeUnix(segundos) {
  if (!Number.isFinite(segundos)) return null;
  return new Date(segundos * 1000).toISOString().slice(0, 10);
}

/**
 * Lee la respuesta de una fuente y devuelve { tasas: { COP: 3183, ... }, fecha: 'AAAA-MM-DD' }
 * o null si no tiene el formato esperado.
 */
export function leerRespuesta(fuente, json) {
  if (!json || typeof json !== 'object') return null;
  if (fuente === 'exchangerate-api') {
    if (json.result !== 'success' || !json.rates || typeof json.rates !== 'object') return null;
    return { tasas: { ...json.rates }, fecha: fechaDeUnix(json.time_last_update_unix) };
  }
  if (fuente === 'currency-api') {
    if (!json.usd || typeof json.usd !== 'object') return null;
    const tasas = {};
    for (const [codigo, valor] of Object.entries(json.usd)) tasas[codigo.toUpperCase()] = valor;
    return { tasas, fecha: typeof json.date === 'string' ? json.date.slice(0, 10) : null };
  }
  if (fuente === 'trm-colombia') {
    const fila = Array.isArray(json) ? json[0] : null;
    const valor = Number.parseFloat(fila?.valor);
    if (!esTasa(valor)) return null;
    return { tasas: { COP: valor }, fecha: typeof fila.vigenciadesde === 'string' ? fila.vigenciadesde.slice(0, 10) : null };
  }
  return null;
}

/**
 * Deja solo las monedas de la app con un valor creíble frente al de referencia
 * (el guardado en los datos del país). Devuelve { tasas, descartadas }.
 */
export function filtrarTasas(tasas, referencias) {
  const aceptadas = {};
  const descartadas = [];
  for (const moneda of MONEDAS_CON_CAMBIO) {
    if (MONEDAS_SIN_API.has(moneda)) continue;
    const valor = tasas?.[moneda];
    if (!esTasa(valor)) continue;
    const referencia = referencias?.[moneda];
    if (esTasa(referencia) && (valor > referencia * MARGEN_CAMBIO || valor < referencia / MARGEN_CAMBIO)) {
      descartadas.push(moneda);
      continue;
    }
    aceptadas[moneda] = valor;
  }
  return { tasas: aceptadas, descartadas };
}

/**
 * Une lo que respondieron las fuentes: la general (todas las monedas) y la TRM oficial
 * de Colombia, que tiene prioridad para el peso colombiano.
 * Devuelve { tasas, fuentes: { MONEDA: idFuente }, fecha } o null si no hay nada útil.
 */
export function combinarCambio(general, colombia, referencias) {
  const tasas = {};
  const fuentes = {};
  const fechas = {};
  if (general?.tasas) {
    for (const [moneda, valor] of Object.entries(filtrarTasas(general.tasas, referencias).tasas)) {
      tasas[moneda] = valor;
      fuentes[moneda] = general.fuente;
      fechas[moneda] = general.fecha ?? null;
    }
  }
  if (colombia?.tasas) {
    const { tasas: cop } = filtrarTasas(colombia.tasas, referencias);
    if (cop.COP) {
      tasas.COP = cop.COP;
      fuentes.COP = colombia.fuente;
      fechas.COP = colombia.fecha ?? null;
    }
  }
  if (!Object.keys(tasas).length) return null;
  return { tasas, fuentes, fechas, fecha: general?.fecha ?? colombia?.fecha ?? null };
}

/**
 * Pone en los parámetros del país la tasa del día, si la hay.
 * - No toca el dólar de quien lo escribió a mano (trmFuente 'manual'), salvo con forzar.
 * - Siempre actualiza copPorDolar, que convierte los costos del catálogo (en pesos colombianos).
 */
export function aplicarCambio(parametros, cambio, { forzar = false } = {}) {
  if (!parametros || !cambio?.tasas) return parametros;
  const moneda = parametros.moneda;
  let nuevos = parametros;
  const cop = cambio.tasas.COP;
  if (esTasa(cop) && cop !== parametros.copPorDolar) nuevos = { ...nuevos, copPorDolar: cop };
  const tasa = cambio.tasas[moneda];
  if (moneda === 'USD' || !esTasa(tasa)) return nuevos;
  if (parametros.trmFuente === 'manual' && !forzar) return nuevos;
  if (parametros.trm === tasa && parametros.trmFuente === 'api') return nuevos;
  return {
    ...nuevos,
    trm: tasa,
    trmFuente: 'api',
    trmFecha: cambio.fechas?.[moneda] ?? cambio.fecha ?? null,
    trmProveedor: cambio.fuentes?.[moneda] ?? null,
  };
}

/** Tasa del día para una moneda, si se consultó y es usable. */
export function tasaDelDia(cambio, moneda) {
  const tasa = cambio?.tasas?.[moneda];
  return esTasa(tasa) ? tasa : null;
}
