/** Catalog page. Product names and descriptions come from useCatalogo(). */
export default {
  titulo: 'Product catalog',
  intro:
    'Each product has its unit of measure, reference hours by complexity and the range a junior would charge for the typical size.',
  filtros: {
    carrera: 'Degree',
    todas: 'All',
    grupo: 'Group',
    todosLosGrupos: 'All groups',
    buscar: 'Search for a product or tool',
  },
  cantidad: ({ n }) => (n === 1 ? '1 product' : `${n} products`),
  vacio: 'We found no products with those filters. Clear the search or choose “{todas}”.',
  grupo: '{carrera}. Rates for {area}.',
  tabla: {
    producto: 'Product',
    unidad: 'Measured by',
    horas: 'Hours: basic, intermediate, advanced',
    junior: 'A junior charges',
    accion: 'Action',
  },
  tipico: '(typical: {n})',
  rango: '{min} to {max}',
  cotizar: 'Quote',
};
