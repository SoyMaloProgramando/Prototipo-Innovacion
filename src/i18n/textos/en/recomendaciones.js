/** Health checks and recommendations on the result screen. */
export default {
  tipos: { alerta: 'Warning', consejo: 'Tip', oportunidad: 'Opportunity' },
  chequeos: {
    piso: 'The price covers your floor (living and work costs)',
    mercado: 'It is not below the junior market range',
    anticipo: 'You ask for at least 30% upfront',
    revisiones: ({ aplica }) => (aplica ? 'Included revision rounds are limited (1 to 3)' : 'This service does not use revision rounds'),
    aportes: 'The price includes your social security contributions',
    margen: 'You keep at least 10% profit',
    'ganancia-real': 'What you earn per real hour is above your minimum rate',
  },
  'bajo-piso': {
    titulo: 'The price does not cover your minimum',
    texto: ({ f, precio, piso }) =>
      `You would charge ${f.dinero(precio)} and your floor is ${f.dinero(piso)}. Raise your rate, reduce the scope, or accept the difference only if the project gives you portfolio or learning.`,
  },
  'tarifa-bajo-minimo': {
    titulo: 'Your desired rate does not cover your living costs',
    texto: ({ f, deseada, horasMes, minima }) =>
      `You asked for ${f.dinero(deseada)} per hour, but with ${f.horas(horasMes)} billable a month you need at least ${f.dinero(minima)} per hour for your expenses and savings.`,
  },
  'sin-anticipo': {
    titulo: 'Ask for an upfront payment',
    texto: 'Charging everything at the end leaves you unprotected if the client cancels or pays late. It is normal to ask for 30% to 50% when the quote is approved.',
  },
  'debajo-mercado': {
    titulo: 'You are below the market',
    texto: ({ f, min, max }) =>
      `A junior would charge between ${f.dinero(min)} and ${f.dinero(max)} for this scope. Charging much less lowers prices for everyone and tells the client your work is worth little.`,
  },
  'poco-dominio': {
    titulo: 'You know little about this kind of product',
    texto: ({ f, especialidad, factor, imprevistos, noCobradas }) =>
      `With ${especialidad}% mastery your rate is multiplied by ${f.factor(factor)} and ${f.porcentaje(imprevistos)} is added for contingencies. You will probably work ${f.horas(noCobradas)} you cannot bill: take them as an investment in learning.`,
  },
  'sin-aportes': {
    titulo: 'You did not include social security',
    texto: ({ f, aportes }) => `You still have to pay it: for this project it is about ${f.dinero(aportes)}. It is already deducted from your earnings.`,
  },
  retencion: {
    titulo: 'The client will withhold tax',
    texto: ({ f, retencion, tasa, consignado }) =>
      `They will deduct ${f.dinero(retencion)} (${f.porcentaje(tasa, 2)}) as an advance on your income tax, so they will pay you ${f.dinero(consignado)}. Confirm the concept with their accounting team.`,
  },
  'muchas-revisiones': {
    titulo: 'You included many revisions',
    texto: 'Every round adds hours. State in the quote that extra changes are charged separately.',
  },
  'sin-revisiones': {
    titulo: 'You did not include revisions',
    texto: 'Almost every client asks for changes. If you do not include them, write down how much each extra round costs.',
  },
  urgencia: {
    titulo: 'Rush fee',
    texto: ({ f, recargo }) =>
      `Working more hours a day justifies the extra ${f.porcentaje(recargo)}. If the client can wait, offer the normal option too.`,
  },
  'proyecto-grande': {
    titulo: 'Split the project into phases',
    texto: ({ f, horas }) =>
      `That is ${f.horas(horas)} billable, more than a month of work. Charge by milestones and deliver in phases so you do not finance the project yourself.`,
  },
  exclusividad: {
    titulo: 'Put the transfer of rights in writing',
    texto: 'If you transfer the rights or the source code, sign it in a contract and list the files you deliver.',
  },
  'margen-bajo': {
    titulo: 'Your profit is low',
    texto: 'Profit covers months without projects, new equipment and your courses. It is common to keep between 10% and 20%.',
  },
  'aporte-minimo': {
    titulo: 'Watch the minimum contribution',
    texto: ({ f, aporte }) =>
      `As a freelancer you pay a minimum social security contribution: about ${f.dinero(aporte)} a month. If this is your only income this month, the real contribution will be higher than calculated.`,
  },
  'mucho-dominio': {
    titulo: 'Your mastery allows you to charge more',
    texto: 'With such high mastery you could get closer to the mid-level range. Back it up with your portfolio and results from past projects.',
  },
  internacional: {
    titulo: 'Quote in dollars',
    texto: ({ f, usd }) =>
      `For a client abroad, the price is about ${f.usd(usd)}. Use a payment platform with low fees and check the exchange rate on the day you get paid.`,
  },
  portafolio: {
    titulo: 'Turn it into portfolio',
    texto: 'Ask for permission to show the result. A good published case improves your profile for the next quote.',
  },
};
