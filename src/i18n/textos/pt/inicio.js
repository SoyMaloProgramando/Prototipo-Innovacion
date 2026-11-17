/** Página inicial: capa, demonstração ao vivo, cursos, passos do cálculo e dados do país. */
export default {
  titulo: 'Quanto eu cobro por isso?',
  lema:
    'O TarifaJusta calcula um preço justo para o seu trabalho de Engenharia de Sistemas ou de Multimídia. Você informa as horas, quanto quer ganhar e o quanto domina o assunto; ele devolve o preço, o seu mínimo e como ele se compara com o mercado.',
  cotizarProyecto: 'Orçar meu projeto',
  verProductos: 'Ver os {n} produtos',
  demo: {
    leyenda: 'Teste com um produto',
    dominio: 'O quanto você domina este tipo de trabalho',
    valorDominio: ({ porcentaje, nivel }) => `${porcentaje}, ${nivel.toLowerCase()}`,
    // O país vai entre parênteses para não depender do artigo (da Colômbia, do Brasil, de Portugal).
    datos: ({ n, horas, gastos, pais }) =>
      `Dados de exemplo (${pais}): ${horas} ${n === 1 ? 'hora' : 'horas'} por semana, despesas de ${gastos} por mês e uma PME como cliente.`,
    cotizar: 'Orçar este produto',
  },
  /** Nomes curtos dos produtos da demonstração (por id de produto). */
  demos: {
    'mul-logo': 'Logotipo',
    'mul-model-sheet': 'Model sheet',
    'mul-animacion-3d': 'Animação 3D',
    'sis-landing': 'Landing page',
    'sis-multiplataforma': 'App multiplataforma',
    'sis-base-datos': 'Banco de dados',
  },
  carreras: {
    titulo: 'Dois cursos, {n} produtos',
    resumen: ({ total, grupos }) =>
      `${total} ${total === 1 ? 'produto' : 'produtos'} em ${grupos} ${grupos === 1 ? 'grupo' : 'grupos'}`,
  },
  pasos: {
    titulo: 'Como ele chega ao preço',
    perfil: {
      titulo: 'Seu perfil',
      texto: 'Suas despesas do mês e as horas que você realmente consegue cobrar definem a sua tarifa mínima.',
    },
    producto: {
      titulo: 'O produto',
      texto: 'Você escolhe entre {n} produtos. Cada um traz horas de referência conforme o tamanho e a complexidade.',
    },
    tiempo: {
      titulo: 'Horas, tarifa e domínio',
      texto: 'O que você quer ganhar por hora se ajusta conforme o quanto você domina o assunto, de 0 a 100%.',
    },
    condiciones: {
      titulo: 'Cliente e condições',
      texto: 'Tipo de cliente, urgência, direitos, previdência, retenção e {impuesto} fecham o preço.',
    },
    verFormula: 'Ver a fórmula completa, passo a passo',
  },
  datos: {
    titulo: 'Dados usados no cálculo: {pais}',
    salarioMinimo: 'Salário mínimo {anio}',
    uvt: 'UVT {anio}',
    dolar: 'Dólar de referência',
    aportes: 'Contribuições de um autônomo',
    aportesValor: '{porcentaje} da renda',
    nota: 'Você pode atualizar esses valores na página {pagina}.',
  },
};
