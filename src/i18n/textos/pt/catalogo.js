/** Página do catálogo. Os nomes e as descrições dos produtos vêm de useCatalogo(). */
export default {
  titulo: 'Catálogo de produtos',
  intro:
    'Cada produto tem sua unidade de medida, horas de referência por complexidade e a faixa que um júnior cobraria pelo tamanho típico.',
  filtros: {
    carrera: 'Curso',
    todas: 'Todos',
    grupo: 'Grupo',
    todosLosGrupos: 'Todos os grupos',
    buscar: 'Buscar produto ou ferramenta',
  },
  cantidad: ({ n }) => (n === 1 ? '1 produto' : `${n} produtos`),
  vacio: 'Não encontramos produtos com esses filtros. Apague a busca ou escolha “{todas}”.',
  grupo: '{carrera}. Tarifas de {area}.',
  tabla: {
    producto: 'Produto',
    unidad: 'Medido por',
    horas: 'Horas básico, intermediário, avançado',
    junior: 'Um júnior cobra',
    accion: 'Ação',
  },
  tipico: '(típico: {n})',
  rango: '{min} a {max}',
  cotizar: 'Orçar',
};
