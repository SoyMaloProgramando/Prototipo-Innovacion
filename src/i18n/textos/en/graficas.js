/** SVG chart texts: titles, screen reader descriptions, axes, labels and tooltips. */
export default {
  curva: {
    titulo: 'Price by your mastery of the topic',
    descripcion:
      'With {cero} mastery the suggested price would be {precioCero}, and with {cien} it would be {precioCien}. Your current level is {actual}.',
    eje: 'Topic mastery',
    precioFinal: 'Price {valor}',
    pisoFinal: 'Floor {valor}',
    dominio: 'Mastery {valor}',
    precio: '{valor} price',
    piso: '{valor} floor',
    leyendaPrecio: 'Suggested price',
    leyendaPiso: 'Your floor',
    leyendaActual: 'Your current mastery ({valor})',
  },
  rango: {
    titulo: 'Your price compared with the market',
    nivel: '{nivel}: {min} to {max}',
    tuyo: 'Your price: {precio}. Your floor: {piso}.',
    piso: 'Your floor',
    negociar: 'To negotiate',
    precio: 'Your price {valor}',
    entre: '{min} to {max}',
    porHora: '{nivel}: {min} to {max} per hour',
  },
};
