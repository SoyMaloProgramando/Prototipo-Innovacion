/**
 * Explanations for the "!" button: what to enter (or what it means) and an example.
 * Parts that depend on the country or on your data are functions that receive:
 *   f (currency format), ej (the country's example values), p (the country's parameters),
 *   r (live result), estado, pais (name and currency) and idioma.
 * The helpers and calculations are the same as in the Spanish file, so the examples
 * show the same numbers in every language.
 */
import { tasaSeguridadSocial } from '../../../logica/impuestos.js';
import { notaDePais, regimenDePais } from '../../../logica/paises.js';

const suma = (o) => Object.values(o ?? {}).reduce((s, v) => s + (Number(v) || 0), 0);
const HORAS_EJEMPLO = 40 * 4.33 * 0.6; // 103.9 hours billed per month
/** Rounds to two significant figures so the example is easy to read. */
const redondo = (v) => {
  if (!v) return 0;
  const potencia = 10 ** (Math.floor(Math.log10(Math.abs(v))) - 1);
  return Math.round(v / potencia) * potencia;
};
const nombrePais = ({ pais, idioma }) => pais.nombres[idioma] ?? pais.nombres.es;
const enColombia = ({ pais }) => pais.id === 'CO';

export default {
  // ── Step 1: your profile ────────────────────────────────────────
  pais: {
    que: 'The country where you work and where your client lives. It changes the currency, the minimum wage, taxes, social security contributions, public holidays and market rates.',
    ejemplo: 'If you live in Lima and charge a Peruvian company, choose Peru: everything is calculated in soles.',
    nota: 'When you change countries, your expenses and costs go back to that country’s example values, in its currency. Check them.',
  },
  carrera: {
    que: 'Choose the degree you graduated in. The app then shows the products from your field first in step 2.',
    ejemplo:
      'If you studied Multimedia Engineering, choose Multimedia. You can still quote products from the other degree if you know how to make them.',
  },
  nombre: {
    que: 'Your name as you want it to appear on the quote you give the client. It is optional.',
    ejemplo: 'Yerson Ariza',
  },
  ciudad: {
    que: 'The city where you work. It appears on the quote.',
    ejemplo: ({ ej }) => ej.ciudad,
  },
  contacto: {
    que: 'An email address or a cell phone number so the client can reply to you. It appears on the quote. It is optional.',
    ejemplo: 'youremail@gmail.com',
  },
  proyectosPrevios: {
    que: 'How many jobs like the one you are quoting you have already done, paid or for school. More experience raises your rate a little: from ×0.95 (none) to ×1.10 (6 or more).',
    ejemplo: 'You are quoting a logo and you have already made 2 logos for friends: choose “1 or 2 projects”.',
  },
  portafolio: {
    que: 'Whether you have a place to show your work: Behance, GitHub, ArtStation, a website or an Instagram account for your work. A solid portfolio justifies charging a little more.',
    ejemplo: 'You have 3 projects on Behance but want to improve your portfolio: choose “Basic or in progress”.',
  },
  formacion: {
    que: 'Whether, besides your degree, you have taken courses or have a certification in this specific kind of work.',
    ejemplo: 'You took an After Effects course and you are quoting motion graphics: choose “Courses on this topic”.',
  },
  gastos: {
    que: 'What you personally spend each month to live. These are not project expenses. With this, the app works out the minimum you need to earn. Enter approximate amounts in your currency.',
    ejemplo: ({ f, ej }) =>
      `Housing ${f.dinero(ej.gastos.vivienda)}, food ${f.dinero(ej.gastos.alimentacion)}, transportation ${f.dinero(ej.gastos.transporte)} and other ${f.dinero(ej.gastos.otros)}: ${f.dinero(suma(ej.gastos))} a month in total.`,
  },
  gastoVivienda: {
    que: 'Rent or what you contribute at home, plus utilities: water, electricity, gas. If you live with your family and pay nothing, enter what you contribute or 0.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.vivienda),
  },
  gastoAlimentacion: {
    que: 'Groceries, lunches and food delivery for the whole month.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.alimentacion),
  },
  gastoTransporte: {
    que: 'Buses, subway, fuel, taxis or fares for the whole month.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.transporte),
  },
  gastoOtros: {
    que: 'Phone plan, health, clothes, going out and personal subscriptions like Netflix or Spotify.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.otros),
  },
  ahorro: {
    que: 'The extra percentage you want to set aside each month for emergencies or for months without clients. It is added to your expenses.',
    ejemplo: ({ f, ej }) => `With 10% and expenses of ${f.dinero(suma(ej.gastos))}, your monthly target is ${f.dinero(suma(ej.gastos) * 1.1)}.`,
  },
  horasSemana: {
    que: 'How many hours a week you work in total as a freelancer, counting everything: projects, messages, meetings and learning. Not just the hours for this project.',
    ejemplo: 'Monday to Friday from 8 to 5 with an hour for lunch is 40 h. If you study and work, maybe 20 h.',
  },
  porcentajeFacturable: {
    que: 'Of all those hours, the percentage you end up billing to a client. The rest goes to things nobody pays you for: finding clients, answering messages, preparing quotes, invoicing, learning and fixing your computer. When you are starting out, 50% to 70% is normal. If you are not sure, leave 60%.',
    ejemplo: 'You work 40 h a week and 24 of those hours are client work: 24 ÷ 40 = 60%.',
  },
  horasFacturablesMes: {
    que: 'The hours you actually bill your clients in a month. It is calculated like this: hours per week × 4.33 weeks in a month × the percentage you bill. Your monthly expenses are spread across these hours: if you bill few hours, each hour has to be worth more.',
    ejemplo: '40 h × 4.33 × 60% = 103.9 hours billed per month.',
  },
  negocio: {
    que: 'What it costs you to work each month: internet, the electricity your computer uses, software and equipment wear. This is not your earnings: it is a cost the price must also cover.',
    ejemplo: ({ f, ej }) =>
      `Internet ${f.dinero(ej.negocio.internet)}, electricity ${f.dinero(ej.negocio.energia)}, software ${f.dinero(ej.negocio.software)}, other ${f.dinero(ej.negocio.otros)} and a computer worth ${f.dinero(ej.valorEquipo)} that lasts 3 years.`,
  },
  internet: {
    que: 'What you pay for internet each month. If you share it with your family, enter only the part you use for work.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.internet),
  },
  energia: {
    que: 'The part of your electricity bill your computer uses while you work. A powerful computer that is on 8 hours a day uses about 50 to 60 kWh a month: multiply that by the kWh price on your bill.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.energia),
  },
  software: {
    que: 'Software and services you pay for to work: Adobe, Autodesk, Figma, test hosting, plugins or fonts. If you only use free software like Blender, Godot or VS Code, enter 0.',
    ejemplo: ({ f }) => `If you pay for Adobe Creative Cloud and Figma, add up what both charge you per month. Free software only: ${f.dinero(0)}.`,
  },
  otrosNegocio: {
    que: 'Other work expenses: a phone plan for clients, coworking, advertising or courses.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.otros),
  },
  valorEquipo: {
    que: 'What your computer cost, or what it costs today, with monitor and accessories. The app spreads that value over the months it lasts, because equipment wears out and someday you will have to replace it.',
    ejemplo: ({ f, ej }) => f.dinero(ej.valorEquipo),
  },
  vidaUtil: {
    que: 'How many years you think your computer will last before you replace it. 3 to 5 years is normal.',
    ejemplo: '3',
  },
  tarifaMinima: {
    que: 'The least you have to earn for each hour you bill a client to pay your living expenses and your savings. If you charge less, you lose money.',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.dinero(r.tarifas.necesidadMensual)} you need per month ÷ ${f.horas(r.tarifas.horasMes)} you bill = ${f.dinero(r.tarifas.minima)} per hour.`,
  },
  costoOperativo: {
    que: 'What it costs you to work for each billed hour: internet, electricity, software and computer wear. It is added to the price separately from what you earn.',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.dinero(r.tarifas.gastosNegocio.total)} in work expenses per month ÷ ${f.horas(r.tarifas.horasMes)} = ${f.dinero(r.tarifas.costoOperativoHora)} per hour.`,
  },

  // ── Step 2: product ─────────────────────────────────────────────
  buscarProducto: {
    que: 'First choose the degree and, if you want, a group. You can also type a word to search.',
    ejemplo: 'Type “logo”, “app”, “database” or “animation”.',
  },
  producto: {
    que: 'The job the client asked you for. If there is no exact match, choose the closest one and adjust the hours in step 3. If the client asks for several things, make one quote for each and add them up.',
    ejemplo: 'They ask you for a logo and 10 posts: quote “Logo” and then “Social media graphics”.',
  },
  unidades: {
    que: 'The size of the job. Each product is measured in a different unit: screens, seconds, pages, proposals, tables... Enter how many you will deliver.',
    ejemplo:
      'Logo: how many initial proposals you show the client (3 is normal). Animation: how many seconds the video lasts.',
  },
  complejidad: {
    que: 'How hard the job is. Basic: simple, and the client already has everything clear. Intermediate: the usual, with some customization. Advanced: lots of detail, tricky effects or integrations, or a client who often changes their mind.',
    ejemplo:
      'Lettering-only logo: basic. Logo with its own icon: intermediate. Logo with a mascot and many variations: advanced.',
  },
  horasCatalogo: {
    que: 'The hours this job usually takes someone with average mastery. They come from: the product’s base hours (adjusted for complexity) + quantity × hours per unit. You can change them in step 3.',
    ejemplo: 'Intermediate logo with 3 proposals: 4 h base + 3 × 5 h = 19 h.',
  },

  // ── Step 3: hours, rate and mastery ─────────────────────────────
  horasEstimadas: {
    que: 'How many hours you think the job will take you. Do not count meetings, client changes or contingencies: the app adds those. If you are not sure, keep the hours the catalog suggests.',
    ejemplo: 'A logo with 3 proposals: about 19 hours.',
  },
  tarifaDeseada: {
    que: 'How much you personally want to take home for each hour of work. The app adjusts it for your mastery and experience, then adds your work costs, profit and social security. It should be higher than your minimum rate. If you are not sure, use the suggested one.',
    ejemplo: ({ f, p }) => {
      const mensual = redondo(p.smmlv * 1.7);
      return `You want to earn ${f.dinero(mensual)} a month and you bill 103.9 hours a month: ${f.dinero(mensual)} ÷ 103.9 ≈ ${f.dinero(redondo(mensual / HORAS_EJEMPLO))} per hour.`;
    },
  },
  especialidad: {
    que: 'How well you know how to do this specific kind of job, from 0 to 100%. 0 to 20%: you are learning it and need tutorials all the time. 21 to 40%: you have done it a few times. 41 to 60%: you do it well, looking a few things up. 61 to 80%: you do it fast and well. 81 to 100%: you could teach it.',
    ejemplo: 'You know Blender but have never done rigging: to quote a rigging job, enter 25%.',
    nota: 'More mastery raises the value of your hour (from ×0.70 to ×1.30). Less mastery adds contingency hours and shows you how many learning hours you will not be able to bill.',
  },
  revisiones: {
    que: 'How many times the client can ask for changes without paying more. Each round adds 6% of the estimated hours (at least 1 h). 2 is normal. Extra changes are charged separately.',
    ejemplo: '2 rounds: you show the work, they ask for tweaks, you make them; then the same a second time.',
  },
  horasDia: {
    que: 'How many hours a day you can put into this specific project. It is used to calculate the delivery date.',
    ejemplo: 'If you study in the morning and work in the afternoon, maybe 4 h.',
  },
  fechaInicio: {
    que: ({ pais, idioma }) =>
      `The day you would start working, usually when you receive the upfront payment. Delivery is counted in business days: no weekends or public holidays in ${pais.nombres[idioma] ?? pais.nombres.es}.`,
    ejemplo: 'If the client pays on Monday, enter that Monday.',
  },
  horasACobrar: {
    que: 'The hours you will bill for this project: your estimated hours plus contingency, the revision rounds and 10% for project management (meetings, messages and deliveries).',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.horas(r.horas.estimadas)} estimated + ${f.horas(r.horas.horasImprevistos)} contingency + ${f.horas(r.horas.horasRevisiones)} revisions + ${f.horas(r.horas.horasGestion)} project management = ${f.horas(r.horas.facturables)}.`,
  },
  tarifaAjustada: {
    que: 'What your hour is worth on this project: your desired rate multiplied by your profile factors (mastery, experience, portfolio and training).',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.dinero(r.tarifas.deseada)} ${f.factor(r.tarifas.factores.total)} = ${f.dinero(r.tarifas.ajustada)} per hour.`,
  },
  urgencia: {
    que: 'How fast the client needs it. Normal: usual timelines. Priority: they want it sooner and you work more hours a day (+20%). Urgent: you have to work nights or weekends (+45%).',
    ejemplo: 'They need it the day after tomorrow: urgent.',
  },

  // ── Step 4: client and terms ────────────────────────────────────
  clienteNombre: {
    que: 'Name of the person or company hiring you. It appears on the quote.',
    ejemplo: 'Café La Esquina',
  },
  tipoCliente: {
    que: 'Who pays. A large company can pay more (+25%) and an individual less (−10%). It also determines whether withholding tax is deducted from your payment.',
    ejemplo: 'A neighborhood shop: startup. A city hall: public institution.',
  },
  mercado: {
    que: 'Where the client is. Local or regional: −5%. National: no adjustment. International: +50%, and charging in dollars or euros is recommended.',
    ejemplo: ({ ej }) => `If you work in ${ej.ciudad} and the client is from another city in your country: national.`,
  },
  derechos: {
    que: 'What the client can do with your work. Usage license: they use it for what was agreed and you can show it in your portfolio. Broad commercial use: they can use it in advertising or in products they sell (+15%). Full transfer: the work becomes the client’s, with source files or code (+40%).',
    ejemplo:
      'A logo for a small business: usage license. A character the company wants to print on T-shirts: broad commercial use.',
  },
  costosDirectos: {
    que: 'What you pay other people or companies just for this project: domain, hosting, stock photos, music, materials or printing. Check the ones that apply and add any that are missing. They are charged at cost, with no markup.',
    ejemplo: 'A domain for one year or the Google Play developer account (25 US dollars).',
  },
  costoConcepto: {
    que: 'What you are going to pay for. Keep it short so you can recognize it on the quote.',
    ejemplo: 'Domain, paid template or font.',
  },
  costoValor: {
    que: 'How much it costs. Type just the number: the app adds the thousands separators.',
    ejemplo: ({ f, p }) => {
      const valor = redondo(p.trm * 25);
      return `Type ${valor} and it shows as ${f.dinero(valor)}.`;
    },
  },
  costoMoneda: {
    que: 'Choose dollars if you pay for it on a foreign website. The app converts it to your currency with the exchange rate on the “How we calculate” page.',
    ejemplo: 'The Google Play developer account costs 25 US dollars.',
  },
  margen: {
    que: 'The business’s profit, separate from what you earn per hour. It covers months without clients, replacing your equipment and paying for courses. 10% to 20% is normal.',
    ejemplo: '10%',
  },
  imprevistos: {
    que: 'Extra hours in case something goes wrong: a file that gets corrupted, an idea that does not work, a change you did not expect. In automatic mode they are calculated from the complexity and your mastery. If you turn it off, you set your own percentage.',
    ejemplo: 'Intermediate with 50% mastery: 20% extra hours.',
  },
  imprevistosManual: {
    que: 'The percentage of extra hours you want to add for contingencies, on top of your estimated hours.',
    ejemplo: 'With 15% and 20 estimated hours, 3 hours are added.',
  },
  seguridadSocial: {
    que: (ctx) => {
      const { f, p, pais } = ctx;
      const total = tasaSeguridadSocial(p);
      const regimen = regimenDePais(pais.id);
      const base = enColombia(ctx)
        ? 'As a freelancer in Colombia, you pay health, pension and occupational risk contributions yourself, on 40% of what you charge'
        : `As a freelancer in ${nombrePais(ctx)}, you pay your own social security contributions${regimen ? ` (${regimen})` : ''}`;
      return `${base}: about ${f.porcentaje(total, 1)} of your income in total. Leave it on so the price covers it and it does not come out of your earnings.`;
    },
    ejemplo: ({ f, p }) => {
      const cobro = redondo(p.smmlv * 0.6);
      const total = tasaSeguridadSocial(p);
      return `If you charge ${f.dinero(cobro)}, you pay about ${f.dinero(cobro * total)} in social security.`;
    },
    nota: (ctx) => notaDePais(ctx.pais.id, 'aportes', ctx.idioma),
  },
  iva: {
    que: (ctx) =>
      enColombia(ctx)
        ? 'Turn it on only if your RUT (your Colombian tax registration) says you must charge IVA, Colombia’s VAT. That happens if you invoice more than 3,500 UVT (Colombian tax units) a year, about COP 183 million, or if you registered that way. Almost no recent graduate has to.'
        : ctx.p.ivaPorDefecto
          ? `In ${nombrePais(ctx)}, freelancers normally charge ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) on their invoices, so it comes turned on. Turn it off only if you are exempt or under a regime that does not charge it.`
          : `Turn it on only if you are required to charge ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) in ${nombrePais(ctx)}. Many freelancers who are just starting out do not charge it.`,
    ejemplo: (ctx) =>
      ctx.p.ivaPorDefecto ? 'If you are not sure, leave it as it is and check with an accountant.' : 'If you are not sure, leave it off.',
    nota: (ctx) => notaDePais(ctx.pais.id, 'iva', ctx.idioma),
  },
  retencion: {
    que: 'When a company pays you, it may deduct a percentage as an advance on your income tax. In automatic mode, the app picks it based on the client, the product and your country. If the client tells you a different one, change it here.',
    ejemplo: (ctx) =>
      enColombia(ctx)
        ? 'A small business pays you for a logo: professional fees, 10%. If an individual pays you, it does not apply.'
        : 'If a company in your country pays you, the general withholding applies; if a person or a client abroad pays you, it usually does not apply.',
    nota: (ctx) => notaDePais(ctx.pais.id, 'retencion', ctx.idioma),
  },
  compensarRetencion: {
    que: 'If you turn it on, the price goes up a little so that, after the withholding is deducted, you receive what you calculated.',
    ejemplo: ({ f, p }) => {
      const precio = redondo(p.smmlv * 0.6);
      return `Price of ${f.dinero(precio)} with 10% withholding: it rises to about ${f.dinero(precio / 0.9)} and, after the deduction, ${f.dinero(precio)} is deposited in your account.`;
    },
  },
  gmf: {
    // The name comes last: some countries store a lowercase description instead of a proper name.
    que: ({ p, f }) =>
      `When you withdraw or transfer money, the bank charges a ${f.porcentaje(p.gmf, 2)} tax: ${p.gmfNombre ?? 'the financial transactions tax'}. Turn it on if your account is not exempt.`,
    ejemplo: ({ f, p }) => {
      const monto = redondo(p.smmlv * 0.6);
      return `Withdrawing ${f.dinero(monto)} costs ${f.dinero(monto * p.gmf)}.`;
    },
  },
  esquemaPago: {
    que: 'When the client pays you. Always ask for an upfront payment: that way you do not work for free if the client changes their mind. The most common is 50% at the start and 50% on delivery.',
    ejemplo: 'Long project: 40% at the start, 30% when you show progress and 30% on delivery.',
  },
  vigencia: {
    que: 'For how many days the price on the quote is valid. After that date, you can update it.',
    ejemplo: '15 days',
  },
  alcance: {
    que: 'Write what the job includes and what it does not, to avoid misunderstandings with the client. It appears on the quote.',
    ejemplo: 'Includes 3 logo proposals and 2 rounds of changes. Does not include printing or a brand manual.',
  },
  ajusteCondiciones: {
    que: 'All the adjustments in this step plus urgency, multiplied: client type × market × rights × urgency. If the result is above 1, the price goes up; if it is below 1, it goes down.',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.factor(r.multiplicadores.cliente)} × ${f.factor(r.multiplicadores.mercado)} × ${f.factor(r.multiplicadores.derechos)} × ${f.factor(r.multiplicadores.urgencia)} = ${f.factor(r.multiplicadores.total)}.`,
  },
  consignado: {
    que: 'What actually reaches your account: the price minus the withholding tax the client deducts.',
    ejemplo: ({ f, r }) =>
      `With your data: ${f.dinero(r.precio.total)} − ${f.dinero(r.neto.retencion)} withholding = ${f.dinero(r.neto.consignado)}.`,
  },

  // ── Result ──────────────────────────────────────────────────────
  precioSugerido: {
    que: ({ p }) =>
      `What you charge the client, before ${p.ivaNombre ?? 'IVA'}. It already includes your work, your costs, profit and social security.`,
    ejemplo: 'It is the amount you put on the quote.',
  },
  piso: {
    que: 'The lowest price you can accept without losing money: it covers your living expenses, your costs and your contributions, but with no extra profit.',
    ejemplo: 'If the client offers less than this, it is better not to accept, or to reduce what you deliver.',
  },
  paraNegociar: {
    que: '15% more than the suggested price. Start the conversation with this amount: if the client asks for a discount, you can go down to the suggested price without losing.',
    ejemplo: ({ f, r }) => `Suggested ${f.dinero(r.precio.sinIva)}: open with ${f.dinero(r.rango.apertura)}.`,
  },
  salud: {
    que: 'It checks 7 good practices, like asking for an upfront payment or not falling below the market. Each one adds points: 100 is a healthy quote.',
    ejemplo: 'The ones with a red X are the ones you should improve.',
  },
  recomendaciones: {
    que: 'Tips based on your data. Alerts matter most: read them before you send the quote.',
    ejemplo: 'If it says you do not cover your minimum, raise your rate or reduce the scope.',
  },
  desglose: {
    que: 'Where each part of the price comes from. The bar shows what share of the total each item is, and the table shows how it was calculated.',
    ejemplo: 'Your work = hours to bill × your adjusted rate.',
  },
  neto: {
    que: 'Of everything the client pays, what actually reaches your pocket after withholding, taxes, social security and costs.',
    ejemplo: ({ f, r }) => `With your data: you get paid ${f.dinero(r.precio.total)} and you keep about ${f.dinero(r.neto.ganancia)}.`,
  },
  mercadoResultado: {
    que: (ctx) =>
      `What others would charge for the same job in ${nombrePais(ctx)}, depending on their experience. A recent graduate is usually in the junior range.`,
    ejemplo: 'If you are below the junior range, you are charging too little.',
  },
  curva: {
    que: 'How the price of this same project would change if you knew more or less about the subject. Hover over or tap the chart to see each value.',
    ejemplo: 'It shows why training lets you charge more.',
  },
  nivelesResultado: {
    que: 'The same product and quantity at the three complexity levels, with the catalog hours.',
    ejemplo: 'Use it to offer the client a simpler option if the price does not fit their budget.',
  },
  horasResultado: {
    que: 'The hours you bill compared with the hours you will probably work. If you know little about the subject, you will work more hours than you bill.',
    ejemplo: 'That difference is your investment in learning.',
  },
  entrega: {
    que: (ctx) =>
      `The approximate date you would finish, counting only business days: no Saturdays, Sundays or public holidays in ${nombrePais(ctx)}.`,
    ejemplo: 'It changes with the hours a day you put into it.',
  },
  pagos: {
    que: 'How much the client pays you at each point, based on the payment terms you chose in step 4.',
    ejemplo: '50% upfront and 50% on delivery.',
  },

  // ── Country data ("How we calculate" page) ──────────────────────
  smmlv: {
    que: (ctx) =>
      `The monthly minimum wage in ${nombrePais(ctx)}. It is used to compare the price and, where it applies, to calculate the minimum social security contribution. Change it if a new decree comes out.`,
    ejemplo: ({ f, p }) => `${f.dinero(p.smmlv)} in ${p.anio}.`,
  },
  uvt: {
    que: 'The UVT (Unidad de Valor Tributario), the tax value unit set by the DIAN, Colombia’s tax authority (Colombia only). Tax thresholds are calculated with it, such as the one above which you must charge IVA (3,500 UVT a year).',
    ejemplo: 'COP 52,374 in 2026 (DIAN Resolution 000238 of 2025).',
  },
  trm: {
    que: ({ f }) =>
      `How many units of your currency (${f.codigo}) one US dollar is worth. It is used to convert dollar costs into your currency and to show the price in dollars. With internet it updates itself with today's rate; if you change it by hand, the app keeps your value.`,
    ejemplo: ({ f, p }) => `Today the app uses ${f.dinero(p.trm)} per dollar.`,
  },
  ivaTarifa: {
    que: ({ p }) =>
      `The standard sales tax rate (${p.ivaNombre ?? 'IVA'}). It is only added to the price if you say in step 4 that you must charge it.`,
    ejemplo: ({ f, p }) => f.porcentaje(p.iva),
  },
  ibc: {
    que: 'The part of your income your freelancer contributions are calculated on (in Colombia, 40%). In other countries, the app uses the base that sums up their system.',
    ejemplo: ({ f, p }) => f.porcentaje(p.ibcIndependiente),
  },
  saludTarifa: {
    que: 'What you contribute to health insurance on that base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.salud, 2),
  },
  pensionTarifa: {
    que: 'What you contribute to your pension or retirement on that base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.pension, 2),
  },
  arlTarifa: {
    que: 'Occupational risk insurance and other contributions in the system (for example, unemployment or training), on that base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.arl, 3),
  },
};
