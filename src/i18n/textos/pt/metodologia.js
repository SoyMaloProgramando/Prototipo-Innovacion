/**
 * Página "Como calculamos": fórmula, fatores, tarifas de mercado e dados do país.
 * O nome do país vai entre parênteses ("no seu país (Colômbia)") para não depender do artigo.
 */

/** Um valor redondo na moeda do país (uns 1.000 dólares) para os exemplos. */
const montoEjemplo = (p) => {
  const v = 1000 * (Number(p.trm) || 1);
  const potencia = 10 ** Math.floor(Math.log10(v));
  return Math.round(v / potencia) * potencia;
};

export default {
  titulo: 'Como calculamos',
  intro: ({ pais, producto }) =>
    `A fórmula completa, os fatores que ela usa e os dados do seu país (${pais}) que a alimentam. Os exemplos usam o orçamento que você tem aberto: ${producto}.`,
  tuEjemplo: 'Seu exemplo:',

  formula: {
    titulo: 'A fórmula, passo a passo',
    horas: {
      titulo: 'Horas a cobrar',
      texto: ({ maximo }) =>
        `Horas estimadas + imprevistos + revisões + gestão. Os imprevistos são a reserva da complexidade (5, 10 ou 15%) mais até ${maximo} se você domina pouco o assunto.`,
    },
    tarifa: {
      titulo: 'Tarifa ajustada pelo seu perfil',
      texto: 'Sua tarifa desejada × domínio × experiência × portfólio × formação. O domínio vai de ×0,70 (0%) a ×1,30 (100%).',
      porHora: ({ valor }) => `${valor} por hora`,
    },
    trabajo: {
      titulo: 'Seu trabalho e os custos de trabalhar',
      texto:
        'Horas a cobrar × tarifa ajustada, mais horas a cobrar × custo operacional por hora. O custo operacional divide a sua internet, energia, software e a depreciação do equipamento entre as suas horas faturáveis do mês.',
    },
    condiciones: {
      titulo: 'Ajuste pelas condições',
      texto: 'É multiplicado pelo tipo de cliente, pelo mercado dele, pelos direitos que recebe e pela urgência.',
      ejemplo: ({ factor, valor }) => `${factor}, que soma ${valor}`,
    },
    utilidad: {
      titulo: 'Lucro',
      texto: 'Uma porcentagem do subtotal para o negócio: meses sem clientes, equipamento novo e cursos.',
    },
    aportes: {
      titulo: 'Previdência social',
      colombia: ({ salud, pension, arl, base, tasa }) =>
        `Como autônomo, você contribui para saúde (${salud}), previdência (${pension}) e riscos de trabalho (${arl}) sobre ${base} do que cobra: ${tasa} da renda. O preço é dividido por (1 − essa taxa) para que, depois de pagar, fique com você o valor calculado.`,
      pais: ({ pais, regimen, tasa }) =>
        `No seu país (${pais}), como autônomo, você paga as suas próprias contribuições${regimen ? ` (${regimen})` : ''}. Nós as resumimos em uma taxa efetiva de ${tasa} do que você cobra. O preço é dividido por (1 − essa taxa) para que, depois de pagar, fique com você o valor calculado.`,
      sinAportes: ({ pais, regimen }) =>
        `No seu país (${pais}), as contribuições de um autônomo são voluntárias ou não se aplicam${regimen ? ` (${regimen})` : ''}; por isso, não são somadas ao preço. Se você contribui por conta própria, coloque a sua taxa nos dados do país, mais abaixo.`,
    },
    impuestos: {
      titulo: ({ impuesto }) => `Custos diretos, retenção, arredondamento e ${impuesto}`,
      texto: ({ impuesto, tasa }) =>
        `Somam-se os custos de terceiros (os que estão em dólares são convertidos com o câmbio). Se você pedir, a retenção é compensada. O preço é arredondado para cima e, se você cobra ${impuesto}, recebe um acréscimo de ${tasa}.`,
      sinImpuesto:
        'Somam-se os custos de terceiros (os que estão em dólares são convertidos com o câmbio). Se você pedir, a retenção é compensada. O preço é arredondado para cima.',
      ejemplo: ({ impuesto }) => `preço sem ${impuesto}`,
      ejemploSinImpuesto: 'preço',
    },
    rango: {
      titulo: 'Faixa e mercado',
      texto:
        'O piso usa a sua tarifa mínima, sem lucro nem ajustes. O preço para negociar é 15% mais alto que o sugerido. O mercado é calculado com as horas de referência do catálogo vezes as tarifas júnior, pleno e sênior da área.',
      ejemplo: ({ piso, apertura, posicion }) => `piso ${piso}, negociar a partir de ${apertura}. ${posicion}.`,
    },
  },

  dominio: {
    titulo: 'O que o domínio muda',
    columnas: {
      dominio: 'Domínio',
      tarifa: 'Tarifa',
      imprevistos: 'Imprevistos cobrados',
      horasExtra: 'Horas extras reais a cada 10 h',
    },
    nota: ({ niveles }) => `Mais os imprevistos do nível de complexidade: ${niveles}.`,
  },

  factores: {
    titulo: 'Fatores de perfil e de condições',
    experiencia: 'Projetos parecidos',
    portafolio: 'Portfólio',
    formacion: 'Formação extra',
    clientes: 'Tipo de cliente',
    mercados: 'Mercado',
    derechos: 'Direitos',
    urgencia: 'Urgência',
  },

  bandas: {
    titulo: 'Tarifas de referência do mercado',
    colombia: ({ moneda }) =>
      `Em ${moneda} por hora, tudo incluído, para trabalho autônomo na Colômbia. Saem de salários de mercado multiplicados pelo custo de ser autônomo e divididos pelas horas realmente cobradas.`,
    // O país aparece uma vez, entre parênteses; na segunda menção, "no seu país" evita o artigo.
    pais: ({ pais, moneda, devPais, devColombia, disPais, disColombia }) =>
      `Em ${moneda} por hora, tudo incluído, para trabalho autônomo no seu país (${pais}). São as tarifas da Colômbia ajustadas pelo que os profissionais ganham em cada país: um desenvolvedor júnior ganha cerca de ${devPais} por mês no seu país e ${devColombia} na Colômbia; um designer júnior, ${disPais} e ${disColombia}. Assim, as tarifas não dependem de o dólar subir ou cair.`,
    area: 'Área',
    rango: ({ min, max }) => `${min} a ${max}`,
  },

  parametros: {
    titulo: ({ pais, anio }) => `Dados de ${anio}: ${pais}`,
    intro: 'Mude-os se saiu uma norma nova ou se o dólar mudou. Tudo é recalculado na hora.',
    salarioMinimo: 'Salário mínimo mensal',
    uvt: 'UVT',
    trm: 'Dólar (TRM)',
    tipoCambio: ({ moneda }) => `Um dólar em ${moneda}`,
    iva: ({ impuesto }) => impuesto,
    ibc: 'Base de contribuição (IBC)',
    salud: 'Saúde',
    pension: 'Previdência',
    arl: 'Riscos de trabalho (ARL)',
    aportesEfectivos: 'Contribuições à previdência social',
    aporteMinimo: 'Contribuição mínima por mês',
    transacciones: ({ nombre }) => nombre,
    regimen: ({ regimen }) => `Regime de contribuições: ${regimen}.`,
    restablecer: ({ anio }) => `Voltar aos valores de ${anio}`,
    confianza: {
      alta: 'Dados oficiais e recentes.',
      media: 'Dados de fontes confiáveis, com algumas estimativas.',
      baja: 'Dados com muitas estimativas: revise-os com alguém do país antes de fazer o orçamento.',
    },
    cambio: {
      titulo: 'Dólar do dia',
      api: 'Atualizado automaticamente: 1 dólar = {valor}, segundo {fuente} ({fecha}). O app consulta de novo a cada 6 horas.',
      guardado: 'Não foi possível consultar o dólar de hoje (sem internet?): usamos o valor salvo de {fecha}, 1 dólar = {valor}.',
      cargando: 'Consultando o dólar de hoje…',
      manual: 'Você digitou o dólar ({valor}): a atualização automática não o altera.',
      sinApi: 'Em Cuba há várias taxas oficiais, e os serviços on-line publicam a antiga (24 CUP por dólar). O app usa a taxa oficial flutuante ({valor}, de {fecha}): atualize à mão no campo abaixo.',
      fijo: 'O seu país usa o dólar: não é preciso taxa de câmbio.',
      actualizar: 'Atualizar agora',
      actualizando: 'Consultando…',
      usarDelDia: 'Usar o de hoje: {valor}',
    },
    confianzaTitulo: 'Confiabilidade destes dados',
    ayudas: {
      aportesEfectivos: {
        que: 'Que parte do que você cobra vai para contribuições à previdência social (saúde, aposentadoria e outras) como autônomo. Resume as cotas, faixas ou porcentagens do regime do seu país em um só número.',
        ejemplo: ({ f, p }) =>
          `Com ${f.porcentaje(p.aportesEfectivos ?? 0, 1)}, de cada ${f.dinero(montoEjemplo(p))} que você cobra, ${f.dinero(montoEjemplo(p) * (p.aportesEfectivos ?? 0))} vão para contribuições.`,
        nota: 'Se você já contribui e sabe quanto paga por mês, divida esse valor pelo que você cobra em um mês normal.',
      },
      aporteMinimo: {
        que: 'A menor contribuição mensal que um autônomo paga, mesmo que nesse mês cobre pouco. Se não houver contribuição mínima, coloque 0.',
        ejemplo: ({ f, p }) => (p.aporteMinimo ? f.dinero(p.aporteMinimo) : f.dinero(0)),
      },
      transacciones: {
        que: 'Imposto que o banco cobra ao movimentar ou sacar dinheiro. Só é descontado se você marcar no passo 4.',
        ejemplo: ({ f, p }) =>
          `Com ${f.porcentaje(p.gmf ?? 0, 2)}, ao sacar ${f.dinero(montoEjemplo(p))} você paga ${f.dinero(montoEjemplo(p) * (p.gmf ?? 0))}.`,
      },
    },
  },

  diagramas: {
    titulo: 'Fluxogramas',
    leyenda: 'Oval: início ou fim. Paralelogramo: dados que entram ou saem. Losango: decisão. Retângulo: processo.',
    usuarioAlt: 'Fluxograma do percurso do usuário pelo app',
    usuario: 'Percurso do usuário.',
    calculoAlt: 'Fluxograma da lógica de cálculo do preço',
    calculo: 'Lógica de cálculo do preço.',
    abrir: 'Abrir em tamanho completo',
    idioma: 'Os diagramas estão em espanhol.',
  },

  glosario: {
    titulo: 'Glossário',
    general: [
      ['Tarifa mínima', 'O que você deve ganhar por cada hora que cobra para cobrir os seus gastos de vida e a sua poupança.'],
      ['Horas faturáveis', 'As horas que você realmente cobra. O resto do tempo vai para procurar clientes, fazer orçamentos e aprender.'],
      ['Custo operacional', 'Quanto custa trabalhar: internet, energia, software e o desgaste do seu computador, dividido por hora.'],
      ['Domínio', 'O quanto você sabe desse produto em particular, de 0 a 100%. Aumenta o valor da sua hora e reduz os imprevistos.'],
      ['Piso', 'O preço mais baixo que você pode aceitar sem perder: cobre a sua tarifa mínima, os seus custos e as suas contribuições, sem lucro.'],
      ['Preço para negociar', '15% acima do sugerido. Comece por ele para ter margem se o cliente pedir desconto.'],
      ['Tarifa com tudo incluído', 'O preço do serviço dividido pelas horas que você cobra. É ela que se compara com o mercado.'],
      ['Retenção na fonte', 'Porcentagem que uma empresa desconta ao pagar você, como antecipação do seu imposto de renda.'],
      ['Cessão de direitos', 'Quando o cliente fica com os direitos patrimoniais da obra ou do código e você já não pode explorá-la comercialmente.'],
    ],
    colombia: [
      ['IBC', 'Ingreso base de cotización: a renda sobre a qual são calculadas as suas contribuições. Para um autônomo, é 40% do que ele cobra por mês, e nunca menos que um salário mínimo.'],
      ['Responsable de IVA', 'Quem deve cobrar IVA (o imposto sobre a venda colombiano) nas suas faturas. Um autônomo passa a ser responsável se a renda dele superar 3.500 UVT por ano, entre outros casos.'],
      ['UVT', 'Unidad de Valor Tributario, a unidade de valor tributário da Colômbia. A DIAN, a autoridade tributária, define o valor todo ano, e com ela se expressam limites e bases de impostos.'],
      ['TRM', 'Tasa Representativa del Mercado: a cotação oficial do dólar em pesos colombianos de cada dia.'],
    ],
    pais: ({ impuesto }) => [
      [impuesto, 'O imposto sobre a venda do seu país. Você só o cobra se o seu regime obrigar; se cobrar, ele é somado ao preço e você o repassa ao fisco.'],
      ['Taxa efetiva de contribuições', 'A parte do que você cobra que vai para a previdência social. Resume em um número as cotas ou porcentagens do seu regime.'],
      ['Taxa de câmbio', 'Quantas unidades da sua moeda vale um dólar. Serve para converter os custos que você paga em dólares.'],
    ],
  },

  fuentes: {
    titulo: 'Fontes',
    colombia: [
      'Decreto 1469 de 2025: salário mínimo de 2026 (COP 1.750.905)',
      'Resolução DIAN 000238 de 2025: UVT de 2026 (COP 52.374)',
      'Tabela de retenção na fonte de 2026 e Decreto 572 de 2025',
      'Contribuições de autônomos à previdência social em 2026',
      'UGPP: o ABC do trabalhador autônomo com contrato de prestação de serviços',
      'Salário de um desenvolvedor de software na Colômbia (Portafolio)',
      'Salário de um designer gráfico na Colômbia (Magneto)',
      'Taxa de câmbio representativa do mercado (Superintendencia Financiera)',
    ],
    temas: {
      cambio: 'Câmbio',
      salarioMinimo: 'Salário mínimo',
      costoVida: 'Custo de vida',
      iva: 'Imposto sobre a venda',
      aportes: 'Contribuições à previdência social',
      retencion: 'Retenção sobre honorários',
      transacciones: 'Imposto sobre transações financeiras',
      salariosTecnologia: 'Salários de desenvolvimento de software',
      salariosDiseno: 'Salários de design',
      tarifas: 'Tarifas de autônomos',
      internet: 'Internet',
      energia: 'Energia',
    },
    tema: ({ tema, sitio }) => `${tema} (${sitio})`,
    nota: 'As tarifas por hora do mercado são uma estimativa do projeto a partir dessas fontes. Revise os impostos com um contador antes de assinar um contrato.',
    documento: 'Todas as fontes e como cada dado foi calculado, país por país, estão em docs/PAISES_Y_FUENTES.md (em espanhol).',
  },
};
