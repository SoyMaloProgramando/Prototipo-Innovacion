/**
 * Datos por país para el cálculo: parámetros, valores de ejemplo, retenciones,
 * tarifas de mercado y festivos, todo en la moneda local. Funciones puras.
 *
 * Colombia es la base: sus parámetros y tarifas están en src/datos/parametros.js.
 * Las tarifas de mercado de los demás países salen de las de Colombia multiplicadas
 * por un factor de salarios (salario del sector en el país ÷ salario en Colombia,
 * los dos en moneda local), así que no dependen del tipo de cambio.
 */
import { DATOS_PAISES } from '../datos/datosPaises.js';
import { ANIOS_FESTIVOS, FESTIVOS } from '../datos/festivos.js';
import { buscarPais, PAIS_BASE, PAISES } from '../datos/paises.js';
import { BANDAS_MERCADO, PARAMETROS_2026 } from '../datos/parametros.js';
import { redondeoComercial } from './formato.js';

/** Día de la TRM guardada en PARAMETROS_2026 (el valor de respaldo cuando no hay internet). */
export const FECHA_TRM_COLOMBIA = '2026-10-31';

/** Áreas de mercado que siguen los salarios de tecnología; el resto sigue los de diseño. */
export const AREAS_TECNOLOGIA = new Set(['desarrollo', 'datos', 'infraestructura', 'consultoria', 'interactivos']);

/** Valores de ejemplo de Colombia (un recién egresado en Tunja). */
export const PERFIL_COLOMBIA = {
  ciudad: 'Tunja',
  gastos: { vivienda: 650_000, alimentacion: 550_000, transporte: 160_000, otros: 250_000 },
  negocio: { internet: 80_000, energia: 50_000, software: 90_000, otros: 40_000 },
  valorEquipo: 4_500_000,
};

export function tieneDatos(paisId) {
  return paisId === PAIS_BASE || Boolean(DATOS_PAISES[paisId]);
}

/**
 * Parámetros del país para el estado (editables en "Cómo calculamos").
 * Colombia detalla sus aportes (base × salud, pensión y riesgos). Los demás países
 * usan una tasa efectiva de aportes sobre lo que se cobra (aportesEfectivos) y, si
 * existe, la cuota mínima mensual de su régimen (aporteMinimo).
 */
export function parametrosDePais(paisId) {
  const pais = buscarPais(paisId);
  const datos = DATOS_PAISES[pais.id];
  if (pais.id === PAIS_BASE || !datos) {
    return {
      ...PARAMETROS_2026,
      trmFuente: 'datos',
      trmFecha: FECHA_TRM_COLOMBIA,
      copPorDolar: PARAMETROS_2026.trm,
      ivaNombre: 'IVA',
      ivaPorDefecto: false,
      gmfNombre: '4 por mil',
      aporteMinimo: null,
      aportesEfectivos: null,
      compensarPorDefecto: false,
    };
  }
  return {
    pais: pais.id,
    moneda: pais.moneda.codigo,
    anio: 2026,
    smmlv: datos.salarioMinimo,
    trm: pais.moneda.codigo === 'USD' ? 1 : datos.tipoCambio,
    trmFuente: pais.moneda.codigo === 'USD' ? 'fijo' : 'datos',
    trmFecha: pais.moneda.codigo === 'USD' ? null : datos.fechaCambio ?? null,
    copPorDolar: PARAMETROS_2026.trm,
    uvt: null,
    iva: datos.iva.tasa,
    ivaNombre: datos.iva.nombre,
    ivaPorDefecto: Boolean(datos.iva.porDefecto),
    ibcIndependiente: 1,
    salud: 0,
    pension: 0,
    arl: 0,
    aportesEfectivos: datos.aportes.tasa,
    aporteMinimo: datos.aportes.minimo ?? 0,
    compensarPorDefecto: Boolean(datos.compensarPorDefecto),
    gmf: datos.transacciones?.tasa ?? 0,
    gmfNombre: datos.transacciones?.nombre ?? null,
  };
}

/** Condiciones que dependen del país: si se cobra el impuesto a la venta y si se compensa la retención. */
export function condicionesDePais(parametros) {
  return {
    responsableIva: Boolean(parametros?.ivaPorDefecto),
    compensarRetencion: Boolean(parametros?.compensarPorDefecto),
  };
}

/** Valores de ejemplo del perfil en la moneda del país: ciudad, gastos, costos de trabajo y equipo. */
export function perfilDePais(paisId) {
  const pais = buscarPais(paisId);
  const datos = DATOS_PAISES[pais.id];
  if (pais.id === PAIS_BASE || !datos) {
    return { ...PERFIL_COLOMBIA, gastos: { ...PERFIL_COLOMBIA.gastos }, negocio: { ...PERFIL_COLOMBIA.negocio } };
  }
  return {
    ciudad: pais.ciudad,
    gastos: { ...datos.perfil.gastos },
    negocio: { ...datos.perfil.negocio },
    valorEquipo: datos.perfil.valorEquipo,
  };
}

/** Redondea un valor de tarifa a una cifra fácil de leer en la moneda del país. */
function redondearTarifa(valor, moneda) {
  if (moneda === 'COP') return Math.round(valor / 1_000) * 1_000;
  const potencia = 10 ** (Math.floor(Math.log10(Math.max(valor, 1e-9))) - 1);
  return Math.round(valor / potencia) * potencia;
}

const mediaGeometrica = (valores) => Math.exp(valores.reduce((suma, v) => suma + Math.log(v), 0) / valores.length);

/**
 * Cuánto ganan los profesionales del país frente a Colombia, cada uno en su moneda:
 * media geométrica de salario del país ÷ salario de Colombia en los niveles junior,
 * semi-senior y senior. tecnologia usa desarrolladores; creativo, diseñadores.
 */
export function factoresMercado(paisId) {
  const salarios = salariosDePais(paisId);
  if (paisId === PAIS_BASE || !salarios) return { tecnologia: 1, creativo: 1 };
  const factor = (propios, base) => mediaGeometrica(propios.map((v, i) => v / base[i]));
  return {
    tecnologia: factor(salarios.desarrollo, SALARIOS_COLOMBIA.desarrollo),
    creativo: factor(salarios.diseno, SALARIOS_COLOMBIA.diseno),
  };
}

const cacheBandas = new Map();

/**
 * Tarifas por hora de referencia (junior, semi-senior, senior) de cada área en el país.
 * Colombia: BANDAS_MERCADO. Otros: Colombia × factor de salarios del país.
 */
export function bandasDePais(paisId) {
  const pais = buscarPais(paisId);
  if (pais.id === PAIS_BASE || !DATOS_PAISES[pais.id]) return BANDAS_MERCADO;
  if (cacheBandas.has(pais.id)) return cacheBandas.get(pais.id);
  const factores = factoresMercado(pais.id);
  const moneda = pais.moneda.codigo;
  const bandas = {};
  for (const [id, banda] of Object.entries(BANDAS_MERCADO)) {
    const factor = AREAS_TECNOLOGIA.has(id) ? factores.tecnologia : factores.creativo;
    const escalar = ([min, max]) => [redondearTarifa(min * factor, moneda), redondearTarifa(max * factor, moneda)];
    bandas[id] = { ...banda, junior: escalar(banda.junior), semi: escalar(banda.semi), senior: escalar(banda.senior) };
  }
  cacheBandas.set(pais.id, bandas);
  return bandas;
}

/** Notas del país en el idioma pedido (iva, aportes, retencion): textos cortos para las explicaciones. */
export function notaDePais(paisId, tema, idioma = 'es') {
  const nota = DATOS_PAISES[paisId]?.notas?.[tema];
  if (!nota) return '';
  return nota[idioma] ?? nota.es ?? '';
}

/** Qué tan confiables son los datos del país: 'alta', 'media' o 'baja'. */
export function confianzaDePais(paisId) {
  if (paisId === PAIS_BASE) return 'alta';
  return DATOS_PAISES[paisId]?.confianza ?? null;
}

/** Fuentes de los datos del país: [{ tema, url }]. Las de Colombia están en la página "Cómo calculamos". */
export function fuentesDePais(paisId) {
  return DATOS_PAISES[paisId]?.fuentes ?? [];
}

/** Salarios de referencia (mensuales, en la moneda del país) que ajustan las tarifas de mercado. */
export const SALARIOS_COLOMBIA = {
  desarrollo: [3_200_000, 5_500_000, 9_000_000],
  diseno: [2_200_000, 3_300_000, 5_000_000],
};

export function salariosDePais(paisId) {
  if (paisId === PAIS_BASE) return SALARIOS_COLOMBIA;
  return DATOS_PAISES[paisId]?.mercado?.salarios ?? null;
}

/** Régimen de aportes del país (nombre local), si se conoce. */
export function regimenDePais(paisId) {
  return DATOS_PAISES[paisId]?.aportes?.regimen ?? '';
}

/** Retenciones de un país distinto de Colombia: [{ id, nombre, tasa }]. La primera es la automática. */
export function retencionesDePais(paisId) {
  return DATOS_PAISES[paisId]?.retenciones ?? [];
}

/**
 * Convierte a la moneda del país un valor del catálogo, que está en pesos colombianos
 * o en dólares. Pasa por dólares con el tipo de cambio de cada país (el del día si la
 * app lo pudo consultar: parametros.trm y parametros.copPorDolar).
 */
export function aMonedaLocal(valor, monedaOrigen, parametros) {
  const v = Number(valor) || 0;
  const destino = parametros?.moneda ?? 'COP';
  if (monedaOrigen === destino) return v;
  const trm = Number(parametros?.trm) || 1;
  if (monedaOrigen === 'USD') return v * trm;
  if (monedaOrigen === 'COP') return (v / (Number(parametros?.copPorDolar) || PARAMETROS_2026.trm)) * trm;
  return v;
}

/** Tipo de cambio guardado de cada moneda (por dólar): la referencia para validar el del día. */
export function referenciasDeCambio() {
  const referencias = {};
  for (const pais of Object.values(PAISES)) {
    const moneda = pais.moneda.codigo;
    if (moneda === 'USD' || referencias[moneda]) continue;
    referencias[moneda] = parametrosDePais(pais.id).trm;
  }
  return referencias;
}

/** Costo sugerido del catálogo listo para el país: los de pesos colombianos pasan a la moneda local. */
export function costoParaPais(costo, parametros) {
  const destino = parametros?.moneda ?? 'COP';
  if (costo.moneda !== 'COP' || destino === 'COP') return { ...costo };
  return { ...costo, valor: redondeoComercial(aMonedaLocal(costo.valor, 'COP', parametros), destino), moneda: destino };
}

/** Festivos del país en un año, desde la tabla generada: [{ fecha: 'AAAA-MM-DD', nombres }]. */
export function tablaFestivos(paisId, anio) {
  return FESTIVOS[paisId]?.[anio] ?? [];
}

export function aniosConFestivos() {
  return ANIOS_FESTIVOS;
}

export { PAISES };
