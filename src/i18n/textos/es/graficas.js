/** Textos de las gráficas SVG: títulos, descripciones para lectores de pantalla, ejes, etiquetas y tooltips. */
export default {
  curva: {
    titulo: 'Precio según tu dominio del tema',
    descripcion:
      'Con {cero} de dominio el precio sugerido sería {precioCero} y con {cien} sería {precioCien}. Tu nivel actual es {actual}.',
    eje: 'Dominio del tema',
    precioFinal: 'Precio {valor}',
    pisoFinal: 'Piso {valor}',
    dominio: 'Dominio {valor}',
    precio: '{valor} precio',
    piso: '{valor} piso',
    leyendaPrecio: 'Precio sugerido',
    leyendaPiso: 'Tu piso',
    leyendaActual: 'Tu dominio actual ({valor})',
  },
  rango: {
    titulo: 'Tu precio frente al mercado',
    nivel: '{nivel}: de {min} a {max}',
    tuyo: 'Tu precio: {precio}. Tu piso: {piso}.',
    piso: 'Tu piso',
    negociar: 'Para negociar',
    precio: 'Tu precio {valor}',
    entre: '{min} a {max}',
    porHora: '{nivel}: {min} a {max} por hora',
  },
};
