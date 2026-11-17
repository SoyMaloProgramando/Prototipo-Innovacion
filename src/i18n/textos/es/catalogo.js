/** Página del catálogo. Los nombres y descripciones de los productos vienen de useCatalogo(). */
export default {
  titulo: 'Catálogo de productos',
  intro:
    'Cada producto tiene su unidad de medida, horas de referencia por complejidad y el rango que cobraría un junior por el tamaño típico.',
  filtros: {
    carrera: 'Carrera',
    todas: 'Todas',
    grupo: 'Grupo',
    todosLosGrupos: 'Todos los grupos',
    buscar: 'Buscar producto o herramienta',
  },
  cantidad: ({ n }) => (n === 1 ? '1 producto' : `${n} productos`),
  vacio: 'No encontramos productos con esos filtros. Borra la búsqueda o elige “{todas}”.',
  grupo: '{carrera}. Tarifas de {area}.',
  tabla: {
    producto: 'Producto',
    unidad: 'Se mide por',
    horas: 'Horas básico, intermedio, avanzado',
    junior: 'Junior cobra',
    accion: 'Acción',
  },
  tipico: '(típico: {n})',
  rango: '{min} a {max}',
  cotizar: 'Cotizar',
};
