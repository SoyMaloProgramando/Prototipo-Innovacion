/** Textos dos gráficos SVG: títulos, descrições para leitores de tela, eixos, rótulos e tooltips. */
export default {
  curva: {
    titulo: 'Preço conforme o seu domínio do tema',
    descripcion:
      'Com {cero} de domínio o preço sugerido seria {precioCero} e com {cien} seria {precioCien}. Seu nível atual é {actual}.',
    eje: 'Domínio do tema',
    precioFinal: 'Preço {valor}',
    pisoFinal: 'Piso {valor}',
    dominio: 'Domínio {valor}',
    precio: '{valor} preço',
    piso: '{valor} piso',
    leyendaPrecio: 'Preço sugerido',
    leyendaPiso: 'Seu piso',
    leyendaActual: 'Seu domínio atual ({valor})',
  },
  rango: {
    titulo: 'Seu preço comparado ao mercado',
    nivel: '{nivel}: de {min} a {max}',
    tuyo: 'Seu preço: {precio}. Seu piso: {piso}.',
    piso: 'Seu piso',
    negociar: 'Para negociar',
    precio: 'Seu preço {valor}',
    entre: '{min} a {max}',
    porHora: '{nivel}: {min} a {max} por hora',
  },
};
