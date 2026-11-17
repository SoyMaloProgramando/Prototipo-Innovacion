/**
 * Idiomas de TarifaJusta: español, inglés y portugués.
 *
 * Los textos viven en src/i18n/textos/<idioma>/<espacio>.js. Cada archivo exporta
 * por defecto un objeto y se encuentra con la clave "espacio.ruta.al.texto":
 *   textos/es/cotizar.js  →  export default { paso1: { titulo: 'Tu perfil' } }
 *   t('cotizar.paso1.titulo')  →  'Tu perfil'
 *
 * Un texto puede ser:
 *   - una cadena con marcadores: 'Paso {n} de {total}'
 *   - una función que recibe los valores: ({ n }) => (n === 1 ? '1 ronda' : `${n} rondas`)
 *   - una lista o un objeto (por ejemplo, los pasos de una guía)
 * Si falta en inglés o portugués, se usa el español. Si falta en español, se ve la clave.
 */
export const IDIOMAS = [
  { id: 'es', nombre: 'Español', corto: 'ES', locale: 'es-419' },
  { id: 'en', nombre: 'English', corto: 'EN', locale: 'en-US' },
  { id: 'pt', nombre: 'Português', corto: 'PT', locale: 'pt-BR' },
];

export const IDIOMA_BASE = 'es';

const modulos = import.meta.glob('./textos/*/*.js', { eager: true });

/** { es: { cotizar: {...}, comun: {...} }, en: {...}, pt: {...} } */
export const DICCIONARIOS = {};
for (const [ruta, modulo] of Object.entries(modulos)) {
  const coincidencia = ruta.match(/\.\/textos\/([a-z]+)\/([\w-]+)\.js$/);
  if (!coincidencia) continue;
  const [, idioma, espacio] = coincidencia;
  DICCIONARIOS[idioma] ??= {};
  DICCIONARIOS[idioma][espacio] = modulo.default;
}

function buscar(raiz, partes) {
  let nodo = raiz;
  for (const parte of partes) {
    if (nodo === undefined || nodo === null) return undefined;
    nodo = nodo[parte];
  }
  return nodo;
}

/** Reemplaza {marcadores} por valores. Los que no tienen valor se dejan como están. */
export function interpolar(texto, valores = {}) {
  return texto.replace(/\{(\w+)\}/g, (marca, nombre) => {
    const valor = valores[nombre];
    return valor === undefined || valor === null || typeof valor === 'object' ? marca : String(valor);
  });
}

export function existeTexto(idioma, clave) {
  return buscar(DICCIONARIOS[idioma], clave.split('.')) !== undefined;
}

export function traducir(idioma, clave, valores) {
  const partes = clave.split('.');
  let texto = buscar(DICCIONARIOS[idioma], partes);
  if (texto === undefined && idioma !== IDIOMA_BASE) texto = buscar(DICCIONARIOS[IDIOMA_BASE], partes);
  if (texto === undefined) return clave;
  if (typeof texto === 'function') return texto(valores ?? {});
  if (typeof texto === 'string') return interpolar(texto, valores);
  return texto;
}

/** Elige el idioma a partir de los idiomas del navegador (es, en o pt). */
export function detectarIdioma(preferidos = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]) {
  for (const etiqueta of preferidos ?? []) {
    const base = String(etiqueta || '')
      .slice(0, 2)
      .toLowerCase();
    if (IDIOMAS.some((i) => i.id === base)) return base;
  }
  return IDIOMA_BASE;
}

/** Región (país) del navegador, por ejemplo "MX" de "es-MX". */
export function detectarRegion(preferidos = typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]) {
  for (const etiqueta of preferidos ?? []) {
    const region = String(etiqueta || '').split('-')[1];
    if (region && /^[A-Za-z]{2}$/.test(region)) return region.toUpperCase();
  }
  return null;
}

/**
 * Pone en minúscula la primera letra de un nombre para usarlo dentro de una frase
 * ("Desarrollo de software" → "desarrollo de software"), sin tocar siglas ("UX/UI y web").
 */
export function minusculaInicial(texto) {
  const s = String(texto ?? '');
  if (s.length < 2) return s.toLowerCase();
  const segunda = s[1];
  const esMinuscula = segunda === segunda.toLowerCase() && segunda !== segunda.toUpperCase();
  return esMinuscula ? s[0].toLowerCase() + s.slice(1) : s;
}
