/** Home page: hero, live demo, degrees, calculation steps and country data. */
export default {
  titulo: 'How much should I charge for this?',
  lema:
    'TarifaJusta works out a fair price for your Systems or Multimedia Engineering work. You enter the hours, what you want to earn and how well you know the subject; it gives you the price, your minimum and how it compares with the market.',
  cotizarProyecto: 'Quote my project',
  verProductos: 'See all {n} products',
  demo: {
    leyenda: 'Try it with a product',
    dominio: 'How well you know this kind of work',
    // "I am learning it" keeps its capital I.
    valorDominio: ({ porcentaje, nivel }) => `${porcentaje}, ${/^I\b/.test(nivel) ? nivel : nivel.toLowerCase()}`,
    datos: ({ n, horas, gastos, pais }) =>
      `Sample data: ${horas} ${n === 1 ? 'hour' : 'hours'} a week, ${gastos} a month in expenses and a small business client in ${pais}.`,
    cotizar: 'Quote this product',
  },
  /** Short names of the demo products (by product id). */
  demos: {
    'mul-logo': 'Logo',
    'mul-model-sheet': 'Model sheet',
    'mul-animacion-3d': '3D animation',
    'sis-landing': 'Landing page',
    'sis-multiplataforma': 'Cross-platform app',
    'sis-base-datos': 'Database',
  },
  carreras: {
    titulo: 'Two degrees, {n} products',
    resumen: ({ total, grupos }) =>
      `${total} ${total === 1 ? 'product' : 'products'} in ${grupos} ${grupos === 1 ? 'group' : 'groups'}`,
  },
  pasos: {
    titulo: 'How it gets to the price',
    perfil: {
      titulo: 'Your profile',
      texto: 'Your monthly expenses and the hours you can actually bill set your minimum rate.',
    },
    producto: {
      titulo: 'The product',
      texto: 'You choose from {n} products. Each one comes with reference hours based on its size and complexity.',
    },
    tiempo: {
      titulo: 'Hours, rate and mastery',
      texto: 'What you want to earn per hour is adjusted by how well you know the subject, from 0 to 100%.',
    },
    condiciones: {
      titulo: 'Client and terms',
      texto: 'Client type, urgency, rights, social security, withholding and {impuesto} complete the price.',
    },
    verFormula: 'See the full formula, step by step',
  },
  datos: {
    titulo: '{pais} data used in the calculation',
    salarioMinimo: 'Minimum wage {anio}',
    uvt: 'UVT {anio}',
    dolar: 'Reference dollar rate',
    aportes: 'Freelancer social security',
    aportesValor: '{porcentaje} of income',
    nota: 'You can update these values on the “{pagina}” page.',
  },
};
