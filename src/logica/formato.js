/** Utilidades de formato y redondeo en español de Colombia. */

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatoDolares = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 });
const formatoEntero = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/** $ 1.250.000 */
export function formatoCOP(valor) {
  return formatoPesos.format(Math.round(Number(valor) || 0));
}

/** US$ 390 */
export function formatoUSD(valor) {
  return formatoDolares.format(Math.round(Number(valor) || 0));
}

/** 1.250.000 sin símbolo */
export function formatoMiles(valor) {
  return formatoEntero.format(Math.round(Number(valor) || 0));
}

/** 12,5 */
export function formatoNumeroCorto(valor) {
  return formatoNumero.format(Number(valor) || 0);
}

/** Valor compacto para gráficas: $850 mil, $1,8 M */
export function formatoCompacto(valor) {
  const v = Number(valor) || 0;
  const abs = Math.abs(v);
  const signo = v < 0 ? '−' : '';
  if (abs >= 1_000_000) return `${signo}$${formatoNumero.format(abs / 1_000_000)} M`;
  if (abs >= 1_000) return `${signo}$${formatoEntero.format(abs / 1_000)} mil`;
  return `${signo}$${formatoEntero.format(abs)}`;
}

/** 27,5 h */
export function formatoHoras(horas) {
  return `${formatoNumero.format(Number(horas) || 0)} h`;
}

/** 0.15 → 15 % (con espacio que no se parte: el % nunca queda solo en otra línea) */
export function formatoPorcentaje(fraccion, decimales = 0) {
  const n = (Number(fraccion) || 0) * 100;
  return `${n.toLocaleString('es-CO', { maximumFractionDigits: decimales, minimumFractionDigits: 0 })}\u00a0%`;
}

/** Evita que "25 %" o "40 h" se partan entre dos líneas. */
export function sinCortes(texto) {
  return typeof texto === 'string' ? texto.replace(/(\d) (%|h\b)/g, '$1\u00a0$2') : texto;
}

/** 1.3 → ×1,30 */
export function formatoFactor(factor) {
  return `×${(Number(factor) || 0).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const formatoFechaLarga = new Intl.DateTimeFormat('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const formatoFechaMedia = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
const formatoFechaCorta = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' });

/** martes, 24 de noviembre de 2026 */
export function formatoFecha(fecha) {
  return fecha ? formatoFechaLarga.format(fecha) : '';
}

/** 24 de noviembre de 2026 */
export function formatoFechaMediana(fecha) {
  return fecha ? formatoFechaMedia.format(fecha) : '';
}

/** 24 nov */
export function formatoFechaBreve(fecha) {
  return fecha ? formatoFechaCorta.format(fecha).replace('.', '') : '';
}

/** Limita un número a un rango. */
export function limitar(valor, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, valor));
}

/** Redondea hacia arriba al múltiplo indicado. */
export function redondearArriba(valor, multiplo) {
  // El pequeño margen evita que errores de coma flotante suban un escalón de más.
  return Math.ceil((valor - 1e-6) / multiplo) * multiplo;
}

/**
 * Escalón del redondeo comercial.
 * - Pesos colombianos: 1.000, 5.000 o 10.000 según el tamaño del valor.
 * - Otras monedas: se mira la cifra (1, 2 o 3 primeros dígitos) para que el
 *   escalón quede entre el 0,2 % y el 1,7 % del valor: 181 US$, 1.240 €, 63,5 US$.
 */
export function pasoComercial(valor, moneda = 'COP') {
  const v = Math.max(0, Number(valor) || 0);
  if (moneda === 'COP') return v >= 1_000_000 ? 10_000 : v >= 100_000 ? 5_000 : 1_000;
  if (v === 0) return 1;
  const potencia = 10 ** (Math.floor(Math.log10(v)) - 2);
  const cifra = v / (potencia * 100);
  return potencia * (cifra < 3 ? 1 : 5);
}

/** Redondeo comercial del precio hacia arriba, para que la cifra sea fácil de leer y negociar. */
export function redondeoComercial(valor, moneda = 'COP') {
  const v = Math.max(0, Number(valor) || 0);
  if (v === 0) return 0;
  return redondearArriba(v, pasoComercial(v, moneda));
}

/** Escalón para redondear una tarifa por hora: $500 en pesos colombianos, proporcional en otras monedas. */
export function pasoTarifa(valor, moneda = 'COP') {
  if (moneda === 'COP') return 500;
  return pasoComercial(valor, moneda) * 5;
}

/** Suma un arreglo de números. */
export function sumar(valores) {
  return valores.reduce((total, v) => total + (Number(v) || 0), 0);
}

/* ── Formatos según idioma y país ───────────────────────────────────── */

const LOCALE_IDIOMA = { es: 'es-419', en: 'en-US', pt: 'pt-BR' };

/**
 * Locale para formatear: si el idioma de la interfaz es el del país, se usan sus
 * convenciones (es-MX, pt-BR, es-ES...); si no, las del idioma (en-US, pt-BR, es-419).
 */
export function localeDe(idioma, pais) {
  if (pais && pais.idioma === idioma) return `${idioma}-${pais.id}`;
  return LOCALE_IDIOMA[idioma] ?? LOCALE_IDIOMA.es;
}

/**
 * Crea las funciones de formato para un idioma y un país.
 * pais: { id, idioma, moneda: { codigo, decimales } }
 * Con Colombia en español da los mismos textos que formatoCOP, formatoHoras, etc.
 */
export function crearFormato({ idioma = 'es', pais } = {}) {
  const codigo = pais?.moneda?.codigo ?? 'COP';
  const conDecimales = (pais?.moneda?.decimales ?? 0) > 0;
  const locale = localeDe(idioma, pais);
  const mismoIdioma = pais ? pais.idioma === idioma : idioma === 'es';
  // El escudo de Cabo Verde se muestra con su código: su símbolo ($ como separador) confunde.
  const display = codigo === 'CVE' ? 'code' : mismoIdioma || codigo === 'USD' || codigo === 'EUR' ? 'narrowSymbol' : 'code';

  const cache = new Map();
  const nf = (clave, opciones, loc = locale) => {
    const id = `${loc}|${clave}`;
    if (!cache.has(id)) cache.set(id, new Intl.NumberFormat(loc, opciones));
    return cache.get(id);
  };
  const fraccion = (v) => conDecimales && Math.abs(v) < 1000 && Math.abs(v - Math.round(v)) > 0.004;

  const dinero = (valor) => {
    const v = Number(valor) || 0;
    const dec = fraccion(v) ? 2 : 0;
    return nf(`d${dec}`, {
      style: 'currency',
      currency: codigo,
      currencyDisplay: display,
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(v);
  };

  const usd = (valor) => {
    const v = Number(valor) || 0;
    const loc = idioma === 'es' && locale === LOCALE_IDIOMA.es ? 'es-CO' : locale;
    return nf('usd', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }, loc).format(v);
  };

  const dineroCorto = (valor) => {
    const v = Number(valor) || 0;
    if (codigo === 'COP' && idioma === 'es') return formatoCompacto(v);
    return nf('corto', {
      style: 'currency',
      currency: codigo,
      currencyDisplay: display,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(v);
  };

  const numero = (valor, decimales = 1) => nf(`n${decimales}`, { maximumFractionDigits: decimales }).format(Number(valor) || 0);

  const miles = (valor) => {
    const v = Number(valor) || 0;
    return nf(`m${fraccion(v) ? 2 : 0}`, { maximumFractionDigits: fraccion(v) ? 2 : 0 }).format(v);
  };

  const partes = nf('simbolo', { style: 'currency', currency: codigo, currencyDisplay: display }).formatToParts(1);
  const simbolo = (partes.find((p) => p.type === 'currency')?.value ?? codigo).trim() || codigo;
  const separadorDecimal = nf('sep', { minimumFractionDigits: 1 }).formatToParts(1.5).find((p) => p.type === 'decimal')?.value ?? ',';

  const porcentaje = (fraccionValor, decimales = 0) => {
    const n = numero((Number(fraccionValor) || 0) * 100, decimales);
    return idioma === 'es' ? `${n} %` : `${n}%`;
  };

  const fechaLarga = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fechaMediaF = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  const fechaCortaF = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' });

  return {
    idioma,
    locale,
    codigo,
    simbolo,
    separadorDecimal,
    conDecimales,
    dinero,
    usd,
    dineroCorto,
    numero,
    miles,
    horas: (valor) => `${numero(valor)} h`,
    porcentaje,
    factor: (valor) => `×${nf('f', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(valor) || 0)}`,
    fecha: (fecha) => (fecha ? fechaLarga.format(fecha) : ''),
    fechaMedia: (fecha) => (fecha ? fechaMediaF.format(fecha) : ''),
    fechaBreve: (fecha) => (fecha ? fechaCortaF.format(fecha).replace('.', '') : ''),
    /**
     * Lee un número escrito por la persona: acepta puntos de miles y el separador decimal
     * del idioma. `decimales`: cuántos conservar (por defecto, los de la moneda: 0 o 2).
     */
    leerDinero: (texto, decimales = conDecimales ? 2 : 0) => {
      const crudo = String(texto ?? '').replace(/\s/g, '');
      if (!decimales) {
        const digitos = crudo.replace(/\D/g, '');
        return digitos === '' ? 0 : Number(digitos);
      }
      const decimal = separadorDecimal;
      const otro = decimal === ',' ? '.' : ',';
      const limpio = crudo.split(otro).join('').replace(decimal, '.').replace(/[^\d.]/g, '');
      const numeroLeido = Number.parseFloat(limpio);
      const factor = 10 ** decimales;
      return Number.isNaN(numeroLeido) ? 0 : Math.round(numeroLeido * factor) / factor;
    },
  };
}
