/**
 * Catálogo en el idioma de la interfaz. El español está en src/datos/catalogo*.js;
 * el inglés y el portugués, en src/i18n/catalogo/en.js y pt.js (por id de producto).
 */
import { useMemo } from 'react';
import { buscarProducto, CARRERAS, CATEGORIAS, filtrarProductos, normalizar, PRODUCTOS } from '../datos/catalogo.js';
import { useIdioma } from './IdiomaContext.jsx';

const modulos = import.meta.glob('./catalogo/*.js', { eager: true });
const TRADUCCIONES = {};
for (const [ruta, modulo] of Object.entries(modulos)) {
  const idioma = ruta.match(/\/(\w+)\.js$/)?.[1];
  if (idioma) TRADUCCIONES[idioma] = modulo.default;
}

/** Producto con nombre, descripción, unidad, entregables, nota y costos en el idioma pedido. */
export function traducirProducto(idioma, producto) {
  const tr = TRADUCCIONES[idioma]?.productos?.[producto.id];
  if (!tr) return producto;
  return {
    ...producto,
    nombre: tr.nombre ?? producto.nombre,
    descripcion: tr.descripcion ?? producto.descripcion,
    unidad: tr.unidad ?? producto.unidad,
    entregables: tr.entregables ?? producto.entregables,
    nota: producto.nota ? tr.nota ?? producto.nota : producto.nota,
    costos: producto.costos.map((c, i) => ({ ...c, concepto: tr.costos?.[i] ?? c.concepto })),
  };
}

/**
 * Nombre de un costo directo en el idioma pedido. Los sugeridos por el catálogo se
 * traducen (por producto e índice); los que escribió la persona quedan como están.
 */
export function conceptoCosto(idioma, costo, producto) {
  if (!costo) return '';
  if (costo.propio) return costo.concepto;
  const base = (costo.productoId && buscarProducto(costo.productoId)) || producto;
  if (!base?.costos) return costo.concepto;
  const coincide = Number.isInteger(costo.indice) && base.costos[costo.indice]?.concepto === costo.concepto;
  const indice = coincide ? costo.indice : base.costos.findIndex((c) => c.concepto === costo.concepto);
  if (indice < 0) return costo.concepto;
  return traducirProducto(idioma, base).costos[indice]?.concepto ?? costo.concepto;
}

export function nombreCategoria(idioma, categoria) {
  if (!categoria) return '';
  return TRADUCCIONES[idioma]?.categorias?.[categoria.id] ?? categoria.nombre;
}

export function nombreCarrera(idioma, carreraId, corto = false) {
  const carrera = CARRERAS[carreraId];
  if (!carrera) return '';
  const tr = TRADUCCIONES[idioma]?.carreras?.[carreraId];
  return corto ? tr?.corto ?? carrera.corto : tr?.nombre ?? carrera.nombre;
}

/** Unidad en singular o plural según la cantidad, ya traducida. */
export function unidadDe(idioma, producto, cantidad) {
  const p = traducirProducto(idioma, producto);
  return Number(cantidad) === 1 ? p.unidad.singular : p.unidad.plural;
}

/** Busca en español y en el idioma de la interfaz. */
export function filtrarProductosEn(idioma, filtros = {}) {
  const base = filtrarProductos({ ...filtros, texto: '' });
  const consulta = normalizar(filtros.texto ?? '');
  if (!consulta) return base;
  return base.filter((p) => {
    const tr = traducirProducto(idioma, p);
    const pajar = normalizar(
      [p.nombre, p.descripcion, p.unidad.plural, tr.nombre, tr.descripcion, tr.unidad.plural, ...p.herramientas].join(' '),
    );
    return consulta.split(/\s+/).every((palabra) => pajar.includes(palabra));
  });
}

/** Ayudas del catálogo ya atadas al idioma actual. */
export function useCatalogo() {
  const { idioma } = useIdioma();
  return useMemo(
    () => ({
      producto: (p) => traducirProducto(idioma, p),
      categoria: (c) => nombreCategoria(idioma, c),
      carrera: (id, corto) => nombreCarrera(idioma, id, corto),
      unidad: (p, n) => unidadDe(idioma, p, n),
      concepto: (costo, producto) => conceptoCosto(idioma, costo, producto),
      filtrar: (filtros) => filtrarProductosEn(idioma, filtros),
    }),
    [idioma],
  );
}

export { CARRERAS, CATEGORIAS, PRODUCTOS };
