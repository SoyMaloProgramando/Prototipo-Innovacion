/** "How we calculate" page: formula, factors, market rates and country data. */

/** A round amount in the country's currency (about 1,000 dollars) for the examples. */
const montoEjemplo = (p) => {
  const v = 1000 * (Number(p.trm) || 1);
  const potencia = 10 ** Math.floor(Math.log10(v));
  return Math.round(v / potencia) * potencia;
};

export default {
  titulo: 'How we calculate',
  intro: ({ pais, producto }) =>
    `The full formula, the factors it uses and the data for ${pais} that feeds it. The examples use the quote you have open: ${producto}.`,
  tuEjemplo: 'Your example:',

  formula: {
    titulo: 'The formula, step by step',
    horas: {
      titulo: 'Hours to bill',
      texto: ({ maximo }) =>
        `Estimated hours + contingency + revisions + project management. Contingency is the buffer for complexity (5, 10 or 15%) plus up to ${maximo} if you know little about the subject.`,
    },
    tarifa: {
      titulo: 'Rate adjusted for your profile',
      texto: 'Your desired rate × mastery × experience × portfolio × training. Mastery goes from ×0.70 (0%) to ×1.30 (100%).',
      porHora: ({ valor }) => `${valor} per hour`,
    },
    trabajo: {
      titulo: 'Your work and the cost of working',
      texto:
        'Hours to bill × adjusted rate, plus hours to bill × operating cost per hour. The operating cost spreads your internet, electricity, software and equipment depreciation across your billable hours for the month.',
    },
    condiciones: {
      titulo: 'Adjustment for conditions',
      texto: 'It is multiplied by the client type, their market, the rights they receive and the urgency.',
      ejemplo: ({ factor, valor }) => `${factor}, which adds ${valor}`,
    },
    utilidad: {
      titulo: 'Profit',
      texto: 'A percentage of the subtotal for the business: months without clients, new equipment and courses.',
    },
    aportes: {
      titulo: 'Social security',
      colombia: ({ salud, pension, arl, base, tasa }) =>
        `As a freelancer, you pay health (${salud}), pension (${pension}) and occupational risk (${arl}) contributions on ${base} of what you charge: ${tasa} of your income. The price is divided by (1 − that rate) so that, after paying, you keep the calculated amount.`,
      pais: ({ pais, regimen, tasa }) =>
        `As a freelancer in ${pais}, you pay your own contributions${regimen ? ` (${regimen})` : ''}. We sum them up as an effective rate of ${tasa} of what you charge. The price is divided by (1 − that rate) so that, after paying, you keep the calculated amount.`,
      sinAportes: ({ pais, regimen }) =>
        `In ${pais}, freelancer contributions are voluntary or do not apply${regimen ? ` (${regimen})` : ''}, so they are not added to the price. If you contribute on your own, enter your rate in the country data below.`,
    },
    impuestos: {
      titulo: ({ impuesto }) => `Direct costs, withholding, rounding and ${impuesto}`,
      texto: ({ impuesto, tasa }) =>
        `Third-party costs are added (those in dollars are converted with the exchange rate). If you ask for it, withholding is offset. The price is rounded up and, if you charge ${impuesto}, ${tasa} is added.`,
      sinImpuesto:
        'Third-party costs are added (those in dollars are converted with the exchange rate). If you ask for it, withholding is offset. The price is rounded up.',
      ejemplo: ({ impuesto }) => `price before ${impuesto}`,
      ejemploSinImpuesto: 'price',
    },
    rango: {
      titulo: 'Range and market',
      texto:
        'The floor uses your minimum rate with no profit or adjustments. The price to negotiate is 15% higher than the suggested one. The market comparison uses the catalog’s reference hours times the junior, mid-level and senior rates for the field.',
      ejemplo: ({ piso, apertura, posicion }) => `floor ${piso}, negotiate from ${apertura}. ${posicion}.`,
    },
  },

  dominio: {
    titulo: 'What mastery changes',
    columnas: {
      dominio: 'Mastery',
      tarifa: 'Rate',
      imprevistos: 'Contingency you bill',
      horasExtra: 'Actual extra hours per 10 h',
    },
    nota: ({ niveles }) => `Plus the contingency for the complexity level: ${niveles}.`,
  },

  factores: {
    titulo: 'Profile and condition factors',
    experiencia: 'Similar projects',
    portafolio: 'Portfolio',
    formacion: 'Extra training',
    clientes: 'Client type',
    mercados: 'Market',
    derechos: 'Rights',
    urgencia: 'Urgency',
  },

  bandas: {
    titulo: 'Market reference rates',
    colombia: ({ moneda }) =>
      `In ${moneda} per hour, all included, for freelance work in Colombia. They come from market salaries multiplied by the cost of being a freelancer and divided by the hours actually billed.`,
    pais: ({ pais, moneda, devPais, devColombia, disPais, disColombia }) =>
      `In ${moneda} per hour, all included, for freelance work in ${pais}. They are Colombia’s rates adjusted for what professionals earn in each country: a junior developer earns about ${devPais} a month in ${pais} and ${devColombia} in Colombia; a junior designer, ${disPais} and ${disColombia}. That way, the rates do not depend on the dollar going up or down.`,
    area: 'Field',
    rango: ({ min, max }) => `${min} to ${max}`,
  },

  parametros: {
    titulo: ({ pais, anio }) => `Data for ${pais}, ${anio}`,
    intro: 'Change them if a new regulation came out or the dollar moved. Everything is recalculated instantly.',
    salarioMinimo: 'Monthly minimum wage',
    uvt: 'UVT',
    trm: 'US dollar (TRM)',
    tipoCambio: ({ moneda }) => `One US dollar in ${moneda}`,
    iva: ({ impuesto }) => impuesto,
    ibc: 'Contribution base (IBC)',
    salud: 'Health',
    pension: 'Pension',
    arl: 'Occupational risk (ARL)',
    aportesEfectivos: 'Social security contributions',
    aporteMinimo: 'Minimum monthly contribution',
    transacciones: ({ nombre }) => nombre,
    regimen: ({ regimen }) => `Contribution system: ${regimen}.`,
    restablecer: ({ anio }) => `Reset to the ${anio} values`,
    confianza: {
      alta: 'Official, recent data.',
      media: 'Data from reliable sources, with some estimates.',
      baja: 'Data with many estimates: check them with someone from the country before you quote.',
    },
    cambio: {
      titulo: "Today's dollar rate",
      api: 'Updated automatically: 1 US dollar = {valor}, according to {fuente} ({fecha}). The app checks it again every 6 hours.',
      guardado: "Today's rate could not be checked (no internet?): we use the saved rate from {fecha}, 1 US dollar = {valor}.",
      cargando: "Checking today's dollar rate…",
      manual: 'You typed the dollar rate yourself ({valor}): automatic updates leave it as it is.',
      sinApi: 'Cuba has several official rates, and online services publish the old one (24 CUP per dollar). The app uses the official floating rate ({valor}, from {fecha}): update it by hand in the field below.',
      fijo: 'Your country uses the US dollar: no exchange rate is needed.',
      actualizar: 'Update now',
      actualizando: 'Checking…',
      usarDelDia: "Use today's rate: {valor}",
    },
    confianzaTitulo: 'How reliable this data is',
    ayudas: {
      aportesEfectivos: {
        que: 'The share of what you charge that goes to social security contributions (health, pension and others) as a freelancer. It sums up the fees, brackets or percentages of your country’s system in a single number.',
        ejemplo: ({ f, p }) =>
          `With ${f.porcentaje(p.aportesEfectivos ?? 0, 1)}, out of every ${f.dinero(montoEjemplo(p))} you charge, ${f.dinero(montoEjemplo(p) * (p.aportesEfectivos ?? 0))} goes to contributions.`,
        nota: 'If you already contribute and know how much you pay a month, divide that amount by what you charge in a normal month.',
      },
      aporteMinimo: {
        que: 'The lowest monthly fee a freelancer pays, even in a month when they bill little. If there is no minimum fee, enter 0.',
        ejemplo: ({ f, p }) => (p.aporteMinimo ? f.dinero(p.aporteMinimo) : f.dinero(0)),
      },
      transacciones: {
        que: 'A tax the bank charges when you move or withdraw money. It is only deducted if you check it in step 4.',
        ejemplo: ({ f, p }) =>
          `With ${f.porcentaje(p.gmf ?? 0, 2)}, withdrawing ${f.dinero(montoEjemplo(p))} costs you ${f.dinero(montoEjemplo(p) * (p.gmf ?? 0))}.`,
      },
    },
  },

  diagramas: {
    titulo: 'Flowcharts',
    leyenda: 'Oval: start or end. Parallelogram: data in or out. Diamond: decision. Rectangle: process.',
    usuarioAlt: 'Flowchart of the user’s path through the app',
    usuario: 'User flow.',
    calculoAlt: 'Flowchart of the price calculation logic',
    calculo: 'Price calculation logic.',
    abrir: 'Open full size',
    idioma: 'The diagrams are in Spanish.',
  },

  glosario: {
    titulo: 'Glossary',
    general: [
      ['Minimum rate', 'What you must earn for each hour you bill to cover your living expenses and your savings.'],
      ['Billable hours', 'The hours you actually bill. The rest of your time goes to finding clients, preparing quotes and learning.'],
      ['Operating cost', 'What it costs to work: internet, electricity, software and the wear on your computer, spread per hour.'],
      ['Mastery', 'How well you know that particular product, from 0 to 100%. It raises the value of your hour and lowers the contingency.'],
      ['Floor', 'The lowest price you can accept without losing money: it covers your minimum rate, your costs and your contributions, with no profit.'],
      ['Price to negotiate', '15% above the suggested price. Start there so you have room if the client asks for a discount.'],
      ['All-inclusive rate', 'The price of the service divided by the hours you bill. This is the rate compared with the market.'],
      ['Withholding tax', 'A percentage a company deducts when it pays you, as an advance on your income tax.'],
      ['Transfer of rights', 'When the client keeps the economic rights to the work or the code, and you can no longer exploit it yourself.'],
    ],
    colombia: [
      ['IBC', 'Ingreso base de cotización: the income on which your social security contributions are calculated. For a freelancer, it is 40% of what they bill per month, and never less than one minimum wage.'],
      ['Responsable de IVA', 'Someone who must charge IVA (Colombia’s VAT) on their invoices. A freelancer becomes one if their income exceeds 3,500 UVT a year, among other cases.'],
      ['UVT', 'Unidad de Valor Tributario, Colombia’s tax value unit. The DIAN, the tax authority, sets it every year, and tax thresholds and bases are expressed in it.'],
      ['TRM', 'Tasa Representativa del Mercado: the official US dollar exchange rate in Colombian pesos for each day.'],
    ],
    pais: ({ impuesto }) => [
      [impuesto, 'Your country’s sales tax. You only charge it if your tax regime requires it; if you do, it is added to the price and you pay it to the tax authority.'],
      ['Effective contribution rate', 'The share of what you charge that goes to social security. It sums up the fees or percentages of your system in one number.'],
      ['Exchange rate', 'How many units of your currency one US dollar is worth. It is used to convert the costs you pay in dollars.'],
    ],
  },

  fuentes: {
    titulo: 'Sources',
    colombia: [
      'Decree 1469 of 2025: 2026 minimum wage (COP 1,750,905)',
      'DIAN Resolution 000238 of 2025: 2026 UVT (COP 52,374)',
      '2026 withholding tax table and Decree 572 of 2025',
      'Social security contributions for freelancers in 2026',
      'UGPP: the basics for independent workers with a service contract',
      'Software developer salary in Colombia (Portafolio)',
      'Graphic designer salary in Colombia (Magneto)',
      'Representative market exchange rate (Superintendencia Financiera)',
    ],
    temas: {
      cambio: 'Exchange rate',
      salarioMinimo: 'Minimum wage',
      costoVida: 'Cost of living',
      iva: 'Sales tax',
      aportes: 'Social security contributions',
      retencion: 'Withholding on professional fees',
      transacciones: 'Financial transactions tax',
      salariosTecnologia: 'Software development salaries',
      salariosDiseno: 'Design salaries',
      tarifas: 'Freelancer rates',
      internet: 'Internet',
      energia: 'Electricity',
    },
    tema: ({ tema, sitio }) => `${tema} (${sitio})`,
    nota: 'The market hourly rates are the project’s own estimate based on those sources. Check taxes with an accountant before you sign a contract.',
    documento: 'All sources, and how each figure was calculated country by country, are in docs/PAISES_Y_FUENTES.md (in Spanish).',
  },
};
