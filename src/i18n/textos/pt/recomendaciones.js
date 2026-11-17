/** Verificações de saúde e recomendações do resultado. */
export default {
  tipos: { alerta: 'Alerta', consejo: 'Dica', oportunidad: 'Oportunidade' },
  chequeos: {
    piso: 'O preço cobre o seu piso (gastos de vida e de trabalho)',
    mercado: 'Não fica abaixo da faixa júnior do mercado',
    anticipo: 'Você pede pelo menos 30% de entrada',
    revisiones: ({ aplica }) => (aplica ? 'As revisões incluídas são limitadas (de 1 a 3)' : 'Este serviço não usa rodadas de revisão'),
    aportes: 'O preço inclui as suas contribuições à previdência social',
    margen: 'Você deixa pelo menos 10% de lucro',
    'ganancia-real': 'O seu ganho por hora real supera a sua tarifa mínima',
  },
  'bajo-piso': {
    titulo: 'O preço não cobre o seu mínimo',
    texto: ({ f, precio, piso }) =>
      `Você cobraria ${f.dinero(precio)} e o seu piso é ${f.dinero(piso)}. Aumente a tarifa, reduza o escopo ou aceite a diferença só se o projeto render portfólio ou aprendizado.`,
  },
  'tarifa-bajo-minimo': {
    titulo: 'A sua tarifa desejada não cobre os seus gastos de vida',
    texto: ({ f, deseada, horasMes, minima }) =>
      `Você pediu ${f.dinero(deseada)} por hora, mas com ${f.horas(horasMes)} faturáveis por mês precisa de pelo menos ${f.dinero(minima)} por hora para os seus gastos e a sua poupança.`,
  },
  'sin-anticipo': {
    titulo: 'Peça uma entrada',
    texto: 'Cobrar tudo no final deixa você sem garantia se o cliente cancelar ou atrasar o pagamento. O normal é pedir entre 30% e 50% ao aprovar o orçamento.',
  },
  'debajo-mercado': {
    titulo: 'Você está abaixo do mercado',
    texto: ({ f, min, max }) =>
      `Um júnior cobraria entre ${f.dinero(min)} e ${f.dinero(max)} por este escopo. Cobrar muito menos baixa os preços para todos e diz ao cliente que o seu trabalho vale pouco.`,
  },
  'poco-dominio': {
    titulo: 'Você domina pouco este tipo de produto',
    texto: ({ f, especialidad, factor, imprevistos, noCobradas }) =>
      `Com ${especialidad}% de domínio, a sua tarifa é multiplicada por ${f.factor(factor)} e somam-se ${f.porcentaje(imprevistos)} de imprevistos. Você provavelmente vai trabalhar ${f.horas(noCobradas)} que não são cobradas: encare como investimento em aprendizado.`,
  },
  'sin-aportes': {
    titulo: 'Você não incluiu a previdência social',
    texto: ({ f, aportes }) => `Você terá que pagá-la mesmo assim: neste projeto são cerca de ${f.dinero(aportes)}. Já estão descontados do seu ganho.`,
  },
  retencion: {
    titulo: 'O cliente vai reter imposto',
    texto: ({ f, retencion, tasa, consignado }) =>
      `Vão descontar ${f.dinero(retencion)} (${f.porcentaje(tasa, 2)}) como adiantamento do seu imposto de renda, então você vai receber ${f.dinero(consignado)}. Confirme o enquadramento com a contabilidade do cliente.`,
  },
  'muchas-revisiones': {
    titulo: 'Você incluiu muitas revisões',
    texto: 'Cada rodada soma horas. Escreva no orçamento que alterações adicionais são cobradas à parte.',
  },
  'sin-revisiones': {
    titulo: 'Você não incluiu revisões',
    texto: 'Quase todo cliente pede alterações. Se não incluir, deixe escrito quanto custa cada rodada adicional.',
  },
  urgencia: {
    titulo: 'Acréscimo por urgência',
    texto: ({ f, recargo }) =>
      `Trabalhar mais horas por dia justifica os ${f.porcentaje(recargo)} adicionais. Se o cliente puder esperar, ofereça também a opção normal.`,
  },
  'proyecto-grande': {
    titulo: 'Divida o projeto em fases',
    texto: ({ f, horas }) =>
      `São ${f.horas(horas)} faturáveis, mais de um mês de trabalho. Cobre por etapas e entregue por fases para não financiar o projeto do seu bolso.`,
  },
  exclusividad: {
    titulo: 'Deixe a cessão de direitos por escrito',
    texto: 'Se você ceder os direitos ou o código-fonte, assine um contrato e indique quais arquivos entrega.',
  },
  'margen-bajo': {
    titulo: 'O seu lucro está baixo',
    texto: 'O lucro cobre os meses sem projetos, a troca de equipamento e os seus cursos. O usual é deixar entre 10% e 20%.',
  },
  'aporte-minimo': {
    titulo: 'Atenção à contribuição mínima',
    texto: ({ f, aporte }) =>
      `Como autônomo, você paga uma contribuição mínima à previdência: cerca de ${f.dinero(aporte)} por mês. Se esta for a sua única renda do mês, a contribuição real será maior que a calculada.`,
  },
  'mucho-dominio': {
    titulo: 'O seu domínio permite cobrar mais',
    texto: 'Com um domínio tão alto você poderia se aproximar da faixa pleno. Sustente isso com portfólio e resultados de projetos anteriores.',
  },
  internacional: {
    titulo: 'Faça o orçamento em dólares',
    texto: ({ f, usd }) =>
      `Para um cliente do exterior, o preço equivale a ${f.usd(usd)}. Use uma plataforma de pagamentos com taxa baixa e confira o câmbio no dia em que receber.`,
  },
  portafolio: {
    titulo: 'Transforme em portfólio',
    texto: 'Peça permissão para mostrar o resultado. Um bom caso publicado melhora o seu perfil no próximo orçamento.',
  },
};
