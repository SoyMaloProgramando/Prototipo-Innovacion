import { CATEGORIAS_SISTEMAS, PRODUCTOS_SISTEMAS } from './catalogoSistemas.js';
import { CATEGORIAS_MULTIMEDIA, PRODUCTOS_MULTIMEDIA } from './catalogoMultimedia.js';

export const CARRERAS = {
  sistemas: {
    id: 'sistemas',
    nombre: 'Ingeniería de Sistemas',
    corto: 'Sistemas',
    productoInicial: 'sis-landing',
  },
  multimedia: {
    id: 'multimedia',
    nombre: 'Ingeniería en Multimedia',
    corto: 'Multimedia',
    productoInicial: 'mul-logo',
  },
};

export const CATEGORIAS = [...CATEGORIAS_SISTEMAS, ...CATEGORIAS_MULTIMEDIA];

const categoriasPorId = new Map(CATEGORIAS.map((c) => [c.id, c]));

/** Todos los productos, cada uno con su carrera, categoría y área de mercado resueltas. */
export const PRODUCTOS = [...PRODUCTOS_SISTEMAS, ...PRODUCTOS_MULTIMEDIA].map((producto) => {
  const categoria = categoriasPorId.get(producto.categoria);
  return {
    aplicaRevisiones: true,
    nota: '',
    ...producto,
    carrera: categoria.carrera,
    area: categoria.area,
    retencion: producto.retencion ?? categoria.retencion,
  };
});

const productosPorId = new Map(PRODUCTOS.map((p) => [p.id, p]));

export function buscarProducto(id) {
  return productosPorId.get(id) ?? productosPorId.get(CARRERAS.multimedia.productoInicial);
}

export function buscarCategoria(id) {
  return categoriasPorId.get(id);
}

export function categoriasDeCarrera(carrera) {
  return CATEGORIAS.filter((c) => c.carrera === carrera);
}

export function productosDeCategoria(categoriaId) {
  return PRODUCTOS.filter((p) => p.categoria === categoriaId);
}

export function productosDeCarrera(carrera) {
  return PRODUCTOS.filter((p) => p.carrera === carrera);
}

/** Texto de la unidad en singular o plural según la cantidad. */
export function textoUnidad(producto, cantidad) {
  return Number(cantidad) === 1 ? producto.unidad.singular : producto.unidad.plural;
}

/** Busca productos por nombre, descripción o herramientas (sin tildes ni mayúsculas). */
export function filtrarProductos({ carrera = 'todas', categoria = 'todas', texto = '' } = {}) {
  const consulta = normalizar(texto);
  return PRODUCTOS.filter((p) => {
    if (carrera !== 'todas' && p.carrera !== carrera) return false;
    if (categoria !== 'todas' && p.categoria !== categoria) return false;
    if (!consulta) return true;
    const pajar = normalizar([p.nombre, p.descripcion, ...p.herramientas, p.unidad.plural].join(' '));
    return consulta.split(/\s+/).every((palabra) => pajar.includes(palabra));
  });
}

export function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}
