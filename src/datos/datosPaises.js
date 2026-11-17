/**
 * Datos de los países de habla hispana y portuguesa (todo en la moneda local, año 2026).
 * Colombia está en src/datos/parametros.js y no aparece aquí.
 *
 * ARCHIVO GENERADO a partir de la investigación del 31/10/2026: si cambias un dato,
 * anota la fuente en docs/PAISES_Y_FUENTES.md.
 *
 * Por país:
 * - tipoCambio: unidades de la moneda local por 1 dólar (fechaCambio: de qué día es). Es el valor de
 *   respaldo: con internet, la app lo reemplaza por el del día (src/servicios/tipoDeCambio.js).
 * - salarioMinimo: mensual (en Venezuela, el ingreso mínimo integral de USD 240).
 * - iva: impuesto a la venta { tasa, nombre, porDefecto: si un independiente que empieza lo cobra }.
 * - aportes: { tasa: efectiva sobre lo facturado, minimo: cuota mínima mensual, regimen }.
 * - retenciones: [{ id, nombre, tasa, auto? }]. Se aplica sola la primera sin auto: false
 *   cuando el cliente es una empresa; las demás se eligen a mano.
 * - compensarPorDefecto: subir el precio para compensar la retención desde el inicio.
 * - transacciones: impuesto a los movimientos bancarios { tasa, nombre } o null.
 * - perfil: gastos y costos de trabajo de ejemplo de un recién egresado en la ciudad principal.
 * - mercado.salarios: sueldos mensuales [junior, semi-senior, senior] de desarrollo y diseño;
 *   ajustan las tarifas de mercado de Colombia (src/logica/paises.js, factoresMercado).
 * - notas: textos cortos para los "!" de impuestos, aportes y retención, en es, en y pt.
 * - confianza: 'alta', 'media' o 'baja'. fuentes: [{ tema, url }].
 */
export const DATOS_PAISES = {
  AO: {
    tipoCambio: 919.7,
    fechaCambio: '2026-10-30',
    salarioMinimo: 100_000,
    iva: { tasa: 0.14, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.08, minimo: 0, regimen: 'INSS' },
    retenciones: [{ id: 'irt-b', nombre: 'Retenção na fonte IRT – Grupo B (6,5 %)', tasa: 0.065 }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 66_000, alimentacion: 35_000, transporte: 8200, otros: 16_000 },
      negocio: { internet: 30_000, energia: 820, software: 26_000, otros: 3100 },
      valorEquipo: 1_000_000,
    },
    mercado: { salarios: { desarrollo: [210_000, 350_000, 560_000], diseno: [147_000, 245_000, 392_000] } },
    notas: {
      iva: {
        es: 'Si facturas menos de 25 millones de kwanzas al año quedas fuera del IVA (14 %); pagas el impuesto del sello del 1 % sobre los recibos.',
        en: 'If you invoice less than 25 million kwanzas a year, you fall outside IVA (14%). You pay the 1% stamp tax on receipts.',
        pt: 'Se você faturar menos de 25 milhões de kwanzas por ano, fica fora do IVA (14%). Paga o imposto do selo de 1% sobre os recibos.',
      },
      aportes: {
        es: 'Aportas el 8 % del ingreso que declaras al inscribirte.',
        en: 'You contribute 8% of the income you declare when you register.',
        pt: 'Você contribui com 8% do rendimento que declara quando se inscreve.',
      },
      retencion: {
        es: 'Las entidades con contabilidad organizada retienen el 6,5 % de IRT (Grupo B).',
        en: 'Entities with organized accounting withhold 6.5% as IRT (income tax), Group B.',
        pt: 'As entidades com contabilidade organizada retêm 6,5% de IRT (Grupo B).',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://tradingeconomics.com/angola/currency' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.verangola.net/va/pt/082025/Economia/45662/Governo-fixa-salário-mínimo-nos-100-mil-kwanzas-já-a-partir-de-Setembro.htm',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Luanda?displayCurrency=AOA' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/Angola/Corporate/Other-taxes' },
      {
        tema: 'aportes',
        url: 'https://angolex.com/paginas/decreto-presidencial/regime-juridico-da-proteccao-social-obrigatoria-dos-trabalhadores-por-conta-propria.html',
      },
      {
        tema: 'retencion',
        url: 'https://assets.kpmg.com/content/dam/kpmg/ao/pdf/200723-taxnews-personalincometaxamendments.pdf',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://worldsalaries.com/average-software-developer-salary-in-angola/',
      },
      { tema: 'salariosTecnologia', url: 'https://forbesafricalusofona.com/?p=162980' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'tarifas', url: 'https://visulry.com/salary/graphic-designer/angola' },
      {
        tema: 'internet',
        url: 'https://www.verangola.net/va/pt/032026/Telecomunicacoes/48108/Unitel-TV-Internet-e-televisão-num-só-pacote-para-os-clientes-Unitel.htm',
      },
      {
        tema: 'energia',
        url: 'https://angolex.com/paginas/despachos/actualizacao-tarifas-servico-electricidade-ciclo-tarifario-2025a-2028a-7536a-26a.html',
      },
    ],
  },
  AR: {
    tipoCambio: 1560,
    fechaCambio: '2026-10-30',
    salarioMinimo: 391_200,
    iva: { tasa: 0.21, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.075, minimo: 49_527, regimen: 'Monotributo' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: { tasa: 0.006, nombre: 'impuesto a los débitos y créditos bancarios' },
    perfil: {
      gastos: { vivienda: 460_000, alimentacion: 180_000, transporte: 23_000, otros: 120_000 },
      negocio: { internet: 48_000, energia: 12_000, software: 44_000, otros: 19_000 },
      valorEquipo: 1_900_000,
    },
    mercado: { salarios: { desarrollo: [1_390_000, 2_500_000, 3_750_000], diseno: [834_000, 1_390_000, 2_220_000] } },
    notas: {
      iva: {
        es: 'Si estás en el monotributo no cobras IVA: emites factura C y la cuota mensual ya lo incluye. Solo los responsables inscriptos suman el 21 %.',
        en: "If you're in the monotributo, you don't charge IVA. You issue factura C, and your monthly payment already includes it. Only responsables inscriptos (registered taxpayers) add the 21%.",
        pt: 'Se você estiver no monotributo, não cobra IVA. Você emite factura C e o pagamento mensal já inclui o IVA. Só os responsables inscriptos (contribuintes inscritos) somam os 21%.',
      },
      aportes: {
        es: 'El monotributo es una cuota fija al mes según tu categoría: incluye el impuesto integrado, la jubilación y la obra social. En la Ciudad de Buenos Aires se suma ingresos brutos. La tasa que usamos es la de una categoría B o C.',
        en: 'The monotributo is a fixed monthly payment based on your category. It includes the integrated tax, your pension and obra social (health coverage). In the City of Buenos Aires, ingresos brutos (turnover tax) is added. The rate we use is that of category B or C.',
        pt: 'O monotributo é um pagamento mensal fixo, conforme a sua categoria: inclui o imposto integrado, a aposentadoria e a obra social (cobertura de saúde). Na Cidade de Buenos Aires, é somado o imposto de ingresos brutos (sobre a receita bruta). A taxa que usamos é a de uma categoria B ou C.',
      },
      retencion: {
        es: 'A un monotributista que factura dentro de su categoría las empresas normalmente no le retienen Ganancias ni IVA.',
        en: "Companies don't normally withhold Ganancias (income tax) or IVA from a monotributo taxpayer who invoices within their category.",
        pt: 'As empresas normalmente não retêm Ganancias (imposto sobre o rendimento) nem IVA de um contribuinte do monotributo que fatura dentro da sua categoria.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://indicadores.ar/cotizacion-dolar/2026-10' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.colegio-escribanos.org.ar/noticias/2026_09_02_Consejo_Salario_Res-4-26.pdf',
      },
      {
        tema: 'costoVida',
        url: 'https://www.zonaprop.com.ar/blog/wp-content/uploads/2026/10/INDEX_CABA_REPORTE_2026-09.pdf',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Buenos-Aires?displayCurrency=ARS' },
      { tema: 'iva', url: 'https://yo-facturo.com/blog/que-es-el-iva-en-argentina/' },
      { tema: 'aportes', url: 'https://www.afip.gob.ar/monotributo/categorias.asp' },
      { tema: 'retencion', url: 'https://www.unc.edu.ar/sites/default/files/RG-AFIP-2616-2009.pdf' },
      {
        tema: 'transacciones',
        url: 'https://www.iprofesional.com/impuestos/369360-impuesto-al-cheque-cuanto-es-quien-lo-paga-y-como-se-calcula',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.innovaciondigital360.com/cio/los-salarios-tech-se-despegan-cuanto-piden-ganar-los-talentos-de-tecnologia-y-sistemas/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://developargentina.com/blog/cuanto-gana-programador-argentina-2026',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.sitioandino.com.ar/economia/cuales-son-los-salarios-pretendidos-mas-altos-y-mas-bajos-del-mercado-laboral-argentino-n5725092',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.iprofesional.com/management/457943-el-sueldo-que-piden-los-argentinos-para-aceptar-un-nuevo-trabajo-en-junio-2026',
      },
      {
        tema: 'tarifas',
        url: 'https://www.fcedu.uner.edu.ar/wp-content/uploads/2026/08/Tarifario-Agosto.pdf',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Buenos-Aires?displayCurrency=ARS' },
      { tema: 'energia', url: 'https://www.argentina.gob.ar/normativa/426258_res26-2_pdf/archivo' },
    ],
  },
  BO: {
    tipoCambio: 12.09,
    fechaCambio: '2026-10-31',
    salarioMinimo: 3300,
    iva: { tasa: 0.13, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.1, minimo: 476, regimen: 'Gestora Pública' },
    retenciones: [{ id: 'iue-it', nombre: 'Retención IUE + IT sin factura (15,5 %)', tasa: 0.155 }],
    compensarPorDefecto: false,
    transacciones: { tasa: 0.003, nombre: 'ITF (impuesto a las transacciones financieras)' },
    perfil: {
      gastos: { vivienda: 1600, alimentacion: 1100, transporte: 210, otros: 410 },
      negocio: { internet: 330, energia: 110, software: 340, otros: 82 },
      valorEquipo: 13_000,
    },
    mercado: { salarios: { desarrollo: [5500, 9000, 14_000], diseno: [4000, 5500, 8000] } },
    notas: {
      iva: {
        es: 'En Bolivia el IVA (13 %) va incluido en el precio de la factura y además se paga el IT (3 %). Si todavía no tienes NIT, no facturas IVA: la empresa te retiene el 15,5 %.',
        en: "In Bolivia, IVA (13%) is included in the invoice price, and you also pay the 3% IT (transactions tax). If you don't have a NIT (tax ID) yet, you don't invoice IVA: the company withholds 15.5% from you.",
        pt: 'Na Bolívia, o IVA (13%) vem incluído no preço da fatura e você também paga o IT de 3% (imposto sobre transações). Se você ainda não tem NIT (identificação fiscal), não fatura IVA: a empresa retém 15,5%.',
      },
      aportes: {
        es: 'Para un independiente el aporte a la Gestora es voluntario: cerca del 14,4 % del ingreso que declares. Lo calculamos con la base de un salario mínimo; si no aportas, apágalo en el paso 4.',
        en: "For self-employed workers, contributing to the Gestora (social security) is voluntary: about 14.4% of the income you declare. We calculate it on a base of one minimum wage. If you don't contribute, turn off \"Include my social security contributions in the price\" in step 4.",
        pt: 'Para autônomos, a contribuição para a Gestora é voluntária: cerca de 14,4% do rendimento que você declarar. Calculamos com a base de um salário mínimo. Se você não contribuir, desative a opção "Incluir minhas contribuições previdenciárias no preço" no passo 4.',
      },
      retencion: {
        es: 'Si no entregas factura, la empresa te retiene el 12,5 % del IUE y el 3 % del IT (15,5 % en total).',
        en: "If you don't provide an invoice, the company withholds 12.5% for the IUE (income tax) and 3% for the IT (transactions tax): 15.5% in total.",
        pt: 'Se você não entregar fatura, a empresa retém 12,5% de IUE (imposto sobre lucros) e 3% de IT (imposto sobre transações): 15,5% no total.',
      },
    },
    confianza: 'baja',
    fuentes: [
      { tema: 'cambio', url: 'https://www.bcb.gob.bo/' },
      { tema: 'salarioMinimo', url: 'https://www.playroll.com/minimum-wage/bolivia' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/La-Paz' },
      { tema: 'iva', url: 'https://taxdo.com/resources/countries/la/bolivia.md' },
      { tema: 'aportes', url: 'https://www.playroll.com/minimum-wage/bolivia' },
      { tema: 'retencion', url: 'https://taxdo.com/resources/countries/la/bolivia.md' },
      { tema: 'transacciones', url: 'https://www.bcb.gob.bo/' },
      { tema: 'salariosTecnologia', url: 'https://wage.is/bolivia/' },
      { tema: 'salariosTecnologia', url: 'https://www.playroll.com/minimum-wage/bolivia' },
      { tema: 'salariosDiseno', url: 'https://wage.is/bolivia/' },
      { tema: 'salariosDiseno', url: 'https://www.playroll.com/minimum-wage/bolivia' },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/bolivia/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/La-Paz' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Bolivia/electricity_prices/' },
    ],
  },
  BR: {
    tipoCambio: 5.3972,
    fechaCambio: '2026-10-31',
    salarioMinimo: 1621,
    iva: { tasa: 0.0, nombre: 'ISS', porDefecto: false },
    aportes: { tasa: 0.1, minimo: 178.31, regimen: 'Simples Nacional + INSS' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 1300, alimentacion: 490, transporte: 140, otros: 320 },
      negocio: { internet: 100, energia: 51, software: 150, otros: 56 },
      valorEquipo: 5900,
    },
    mercado: { salarios: { desarrollo: [4500, 7500, 11_300], diseno: [2010, 2800, 4320] } },
    notas: {
      iva: {
        es: 'El ISS (2 a 5 % según la ciudad) ya está dentro de la guía mensual del Simples Nacional, así que no se suma al precio.',
        en: "The ISS (services tax) is 2 to 5% depending on the city. It's already included in your monthly Simples Nacional payment slip, so it isn't added to the price.",
        pt: 'O ISS (2 a 5%, conforme a cidade) já está incluído na guia mensal do Simples Nacional, por isso não é somado ao preço.',
      },
      aportes: {
        es: 'Con una microempresa en el Simples Nacional pagas el DAS (6 % en la primera franja, con el ISS incluido) y el 11 % de INSS sobre un pró-labore de un salario mínimo: cerca del 10 % de lo que facturas. El MEI no permite programación ni diseño web.',
        en: "With a microenterprise in the Simples Nacional, you pay the DAS (6% in the first bracket, ISS included) and 11% INSS (social security) on a pró-labore (owner's salary) of one minimum wage: about 10% of what you invoice. The MEI (individual microentrepreneur) doesn't allow programming or web design.",
        pt: 'Com uma microempresa no Simples Nacional, você paga o DAS (6% na primeira faixa, com o ISS incluído) e 11% de INSS sobre um pró-labore de um salário mínimo: cerca de 10% do que fatura. O MEI não permite programação nem web design.',
      },
      retencion: {
        es: 'A una empresa del Simples Nacional los clientes normalmente no le retienen impuestos federales. Como autônomo persona física sí te descuentan el INSS (11 %) y, según el monto, el IRRF.',
        en: "Clients don't normally withhold federal taxes from a Simples Nacional company. As a self-employed individual, though, they do deduct INSS (11%) and, depending on the amount, IRRF (income tax).",
        pt: 'Os clientes normalmente não retêm impostos federais de uma empresa do Simples Nacional. Como autônomo pessoa física, porém, descontam o INSS (11%) e, conforme o valor, o IRRF.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://open.er-api.com/v6/latest/USD' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal',
      },
      {
        tema: 'costoVida',
        url: 'https://downloads.fipe.org.br/indices/fipezap/fipezap-202609-residencial-locacao.pdf',
      },
      { tema: 'costoVida', url: 'https://www.dieese.org.br/analisecestabasica/2026/202609cestabasica.pdf' },
      { tema: 'iva', url: 'https://www.contabilizei.com.br/contabilidade-online/iss/' },
      { tema: 'aportes', url: 'https://www.contabilizei.com.br/contabilidade-online/fator-r/' },
      { tema: 'retencion', url: 'https://www.contabilizei.com.br/contabilidade-online/iss/' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.salario.com.br/profissao/analista-de-desenvolvimento-de-sistemas-cbo-212405/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.salario.com.br/profissao/programador-de-sistemas-de-informacao-cbo-317110/',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.salario.com.br/profissao/desenhista-industrial-grafico-designer-grafico-cbo-262410/',
      },
      { tema: 'internet', url: 'https://bestbroadbanddeals.co.uk/broadband/pricing/worldwide-comparison/' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Brazil/electricity_prices/' },
    ],
  },
  CL: {
    tipoCambio: 993.22,
    fechaCambio: '2026-10-30',
    salarioMinimo: 553_553,
    iva: { tasa: 0.19, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0, minimo: 0, regimen: 'Ley 21.133' },
    retenciones: [{ id: 'boleta', nombre: 'Retención boleta de honorarios (15,25 %)', tasa: 0.1525 }],
    compensarPorDefecto: true,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 390_000, alimentacion: 210_000, transporte: 33_000, otros: 100_000 },
      negocio: { internet: 21_000, energia: 15_000, software: 28_000, otros: 18_000 },
      valorEquipo: 1_100_000,
    },
    mercado: { salarios: { desarrollo: [1_300_000, 2_100_000, 3_200_000], diseno: [800_000, 1_200_000, 1_800_000] } },
    notas: {
      iva: {
        es: 'Si emites boletas de honorarios no cobras IVA.',
        en: "If you issue boletas de honorarios (fee receipts), you don't charge IVA.",
        pt: 'Se você emitir boletas de honorarios (recibos de honorários), não cobra IVA.',
      },
      aportes: {
        es: 'Tus cotizaciones (pensión, salud y seguros) se pagan en la Operación Renta con lo que te retuvieron en las boletas, por eso no se suman aparte. Si te paga una persona que no retiene, tú pagas ese 15,25 % en tu declaración.',
        en: "Your contributions (pension, health and insurance) are paid in the Operación Renta (annual tax return) with what was withheld on your boletas (fee receipts), so they aren't added separately. If an individual who doesn't withhold pays you, you pay that 15.25% in your tax return.",
        pt: 'As suas contribuições (pensão, saúde e seguros) são pagas na Operación Renta (declaração anual) com o que foi retido nas suas boletas (recibos de honorários), por isso não são somadas à parte. Se quem paga for uma pessoa que não retém, você paga esses 15,25% na sua declaração.',
      },
      retencion: {
        es: 'En 2026 la empresa retiene el 15,25 % de cada boleta. Esa plata paga tus cotizaciones y tu impuesto en la Operación Renta: si sobra, te la devuelven.',
        en: 'In 2026, the company withholds 15.25% of each boleta (fee receipt). That money pays your contributions and your tax in the Operación Renta (annual tax return). If any is left over, you get it back.',
        pt: 'Em 2026, a empresa retém 15,25% de cada boleta (recibo de honorários). Esse dinheiro paga as suas contribuições e o seu imposto na Operación Renta (declaração anual). Se sobrar, é devolvido a você.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://mindicador.cl/api/dolar' },
      { tema: 'salarioMinimo', url: 'https://www.previred.com/indicadores-previsionales/' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Santiago' },
      { tema: 'iva', url: 'https://taxdo.com/resources/countries/la/chile.md' },
      { tema: 'aportes', url: 'https://www.previred.com/indicadores-previsionales/' },
      { tema: 'retencion', url: 'https://www.sii.cl/destacados/boletas_honorarios/index.html' },
      { tema: 'salariosTecnologia', url: 'https://talently.tech/herramientas/chile/salario' },
      { tema: 'salariosTecnologia', url: 'https://lemon.io/rate-calculator/chile/' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.mercadonegro.pe/publicidad/cuanto-ganan-disenadores-graficos-america-latina',
      },
      { tema: 'salariosDiseno', url: 'https://www.previred.com/indicadores-previsionales/' },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/chile/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Santiago' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Chile/electricity_prices/' },
    ],
  },
  CR: {
    tipoCambio: 449.7,
    fechaCambio: '2026-10-31',
    salarioMinimo: 367108.5,
    iva: { tasa: 0.13, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.12, minimo: 0, regimen: 'CCSS' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 180_000, alimentacion: 86_000, transporte: 15_000, otros: 110_000 },
      negocio: { internet: 31_000, energia: 5000, software: 13_000, otros: 9700 },
      valorEquipo: 490_000,
    },
    mercado: { salarios: { desarrollo: [697_000, 1_320_000, 1_800_000], diseno: [421_000, 746_000, 997_000] } },
    notas: {
      iva: {
        es: 'Desde 2019 los servicios profesionales pagan IVA: si estás inscrito, cobras el 13 % a tus clientes del país. Los servicios al exterior están exentos.',
        en: "Since 2019, professional services are subject to IVA. If you're registered, you charge domestic clients 13%. Services to clients abroad are exempt.",
        pt: 'Desde 2019, os serviços profissionais estão sujeitos ao IVA: se você estiver inscrito, cobra 13% dos seus clientes do país. Os serviços para o exterior são isentos.',
      },
      aportes: {
        es: 'La afiliación a la CCSS es obligatoria para quien trabaja por cuenta propia. La cuota depende del ingreso que declares; usamos una estimación del 12 %. Confírmala con la CCSS.',
        en: 'Joining the CCSS (social security) is mandatory for self-employed workers. The contribution depends on the income you declare. We use an estimate of 12%. Confirm it with the CCSS.',
        pt: 'A filiação à CCSS é obrigatória para autônomos. A contribuição depende do rendimento que você declarar; usamos uma estimativa de 12%. Confirme com a CCSS.',
      },
      retencion: {
        es: 'Entre empresas privadas no se acostumbra retener renta a un profesional independiente: tú declaras y pagas tu impuesto.',
        en: "Private companies don't usually withhold income tax from a self-employed professional. You declare and pay your own tax.",
        pt: 'Entre empresas privadas, não se costuma reter imposto sobre o rendimento de um profissional autônomo: você declara e paga o seu imposto.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://api.hacienda.go.cr/indicadores/tc/dolar' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.mtss.go.cr/temas-laborales/salarios/Documentos-Salarios/lista_salarios_2025.pdf',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/San-Jose-Costa-Rica' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/San-Jose-Costa-Rica' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/costa-rica/individual/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/costa-rica/individual/other-taxes' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/costa-rica/corporate/withholding-taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/cr/salaryinfo/information-technology/programmer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/cr/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/costa-rica/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/San-Jose-Costa-Rica' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Costa-Rica/electricity_prices/' },
    ],
  },
  CU: {
    tipoCambio: 758,
    fechaCambio: '2026-10-29',
    salarioMinimo: 2100,
    iva: { tasa: 0.1, nombre: 'impuesto sobre los servicios', porDefecto: false },
    aportes: { tasa: 0.12, minimo: 420, regimen: 'TCP' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 160_000, alimentacion: 120_000, transporte: 17_000, otros: 61_000 },
      negocio: { internet: 30_000, energia: 42, software: 21_000, otros: 8900 },
      valorEquipo: 830_000,
    },
    mercado: { salarios: { desarrollo: [762_000, 1_310_000, 2_140_000], diseno: [524_000, 786_000, 1_190_000] } },
    notas: {
      iva: {
        es: 'Cuba no tiene IVA: el impuesto sobre los servicios (cerca del 10 % de lo que cobras) lo paga quien presta el servicio. Dato sin verificar en fuentes oficiales.',
        en: "Cuba has no IVA. The tax on services (about 10% of what you charge) is paid by whoever provides the service. This information hasn't been verified against official sources.",
        pt: 'Cuba não tem IVA: o imposto sobre os serviços (cerca de 10% do que você cobra) é pago por quem presta o serviço. Informação não verificada em fontes oficiais.',
      },
      aportes: {
        es: 'Como trabajador por cuenta propia aportas cerca del 20 % sobre una base que eliges, con un mínimo de unos 420 CUP al mes. Dato sin verificar en fuentes oficiales.',
        en: "As a self-employed worker, you contribute about 20% on a base you choose, with a minimum of about 420 CUP a month. This information hasn't been verified against official sources.",
        pt: 'Como autônomo, você contribui com cerca de 20% sobre uma base que escolhe, com um mínimo de aproximadamente 420 CUP por mês. Informação não verificada em fontes oficiais.',
      },
      retencion: {
        es: 'No encontramos una retención general cuando te paga una entidad.',
        en: 'We found no general withholding tax when an entity pays you.',
        pt: 'Não encontramos uma retenção na fonte geral quando você recebe de uma entidade.',
      },
    },
    confianza: 'baja',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.cibercuba.com/noticias/2026-10-29-u1-e129488-s27061-nid344175-dolar-euro-baten-nuevos-records-cuba-asi-amanece',
      },
      { tema: 'salarioMinimo', url: 'https://en.wikipedia.org/wiki/Economy_of_Cuba' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Havana' },
      { tema: 'iva', url: 'https://en.wikipedia.org/wiki/Taxation_in_Cuba' },
      { tema: 'aportes', url: 'https://en.wikipedia.org/wiki/Taxation_in_Cuba' },
      { tema: 'retencion', url: 'https://en.wikipedia.org/wiki/Taxation_in_Cuba' },
      { tema: 'salariosTecnologia', url: 'https://en.wikipedia.org/wiki/Economy_of_Cuba' },
      { tema: 'salariosDiseno', url: 'https://en.wikipedia.org/wiki/Economy_of_Cuba' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Havana' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Cuba/electricity_prices/' },
    ],
  },
  CV: {
    tipoCambio: 98.7,
    fechaCambio: '2026-10-30',
    salarioMinimo: 17_000,
    iva: { tasa: 0.15, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.235, minimo: 0, regimen: 'INPS + REMPE' },
    retenciones: [{ id: 'irps-b', nombre: 'Retenção IRPS – Categoria B (20 %)', tasa: 0.2, auto: false }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 10_000, alimentacion: 4700, transporte: 790, otros: 2100 },
      negocio: { internet: 5100, energia: 1800, software: 2800, otros: 440 },
      valorEquipo: 110_000,
    },
    mercado: { salarios: { desarrollo: [30_000, 42_500, 55_000], diseno: [21_000, 29_800, 38_500] } },
    notas: {
      iva: {
        es: 'Un independiente que empieza suele entrar al REMPE: paga un tributo único del 4 % de lo que vende, en lugar del IVA y del impuesto sobre la renta, y no cobra IVA.',
        en: "If you're self-employed and just starting out, you usually join the REMPE (small-business regime). You pay a single tax of 4% of what you sell, instead of IVA and income tax, and you don't charge IVA.",
        pt: 'Quando você começa como autônomo, costuma entrar no REMPE: paga um tributo único de 4% do que vende, em vez do IVA e do imposto sobre o rendimento, e não cobra IVA.',
      },
      aportes: {
        es: 'Incluye el 19,5 % del INPS sobre lo que declaras y el 4 % del tributo único del REMPE.',
        en: 'It includes 19.5% for the INPS (social security) on what you declare and the 4% single tax of the REMPE (small-business regime).',
        pt: 'Inclui 19,5% do INPS sobre o que você declara e 4% do tributo único do REMPE.',
      },
      retencion: {
        es: 'Con contabilidad organizada, la empresa retiene el 20 % de IRPS. En el REMPE normalmente no hay retención.',
        en: "If the company has organized accounting, it withholds 20% as IRPS (income tax). Under the REMPE (small-business regime), there's normally no withholding tax.",
        pt: 'Com contabilidade organizada, a empresa retém 20% de IRPS. No REMPE, normalmente não há retenção na fonte.',
      },
    },
    confianza: 'media',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      { tema: 'salarioMinimo', url: 'https://forbesafricalusofona.com/?p=119448' },
      {
        tema: 'costoVida',
        url: 'https://www.numbeo.com/cost-of-living/in/Praia-Cape-Verde?displayCurrency=CVE',
      },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/cabo-verde/individual/income-determination' },
      {
        tema: 'salariosTecnologia',
        url: 'https://africarrieres.com/cape-verde/en/guide/marche-emploi/salary-guide',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      {
        tema: 'internet',
        url: 'https://www.numbeo.com/cost-of-living/in/Praia-Cape-Verde?displayCurrency=CVE',
      },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Cape-Verde/electricity_prices/' },
    ],
  },
  DO: {
    tipoCambio: 60.32,
    fechaCambio: '2026-10-28',
    salarioMinimo: 29_988,
    iva: { tasa: 0.18, nombre: 'ITBIS', porDefecto: true },
    aportes: { tasa: 0, minimo: 0, regimen: 'SDSS' },
    retenciones: [{ id: 'isr15', nombre: 'Retención ISR honorarios (15 %)', tasa: 0.15 }],
    compensarPorDefecto: false,
    transacciones: { tasa: 0.002, nombre: 'impuesto a los cheques y transferencias' },
    perfil: {
      gastos: { vivienda: 8400, alimentacion: 5400, transporte: 1200, otros: 3700 },
      negocio: { internet: 2200, energia: 390, software: 1700, otros: 460 },
      valorEquipo: 66_000,
    },
    mercado: { salarios: { desarrollo: [35_000, 58_300, 93_300], diseno: [18_400, 29_600, 47_400] } },
    notas: {
      iva: {
        es: 'Si estás inscrito en el RNC, sumas el 18 % de ITBIS. Si te paga una empresa, ella retiene todo el ITBIS y lo paga a la DGII.',
        en: "If you're registered in the RNC (taxpayer registry), you add 18% ITBIS (sales tax). If a company pays you, it withholds all the ITBIS and pays it to the DGII (tax agency).",
        pt: 'Se você estiver inscrito no RNC, soma 18% de ITBIS. Se quem paga for uma empresa, ela retém todo o ITBIS e paga à DGII.',
      },
      aportes: {
        es: 'No hay un aporte obligatorio para independientes: el régimen para cuenta propia todavía no empieza. Si pagas un seguro de salud o ahorras para tu pensión, pon esa tasa en "Cómo calculamos".',
        en: "There's no mandatory contribution for self-employed workers: the self-employed regime hasn't started yet. If you pay for health insurance or save for your pension, enter that rate in \"How we calculate\".",
        pt: 'Não há contribuição obrigatória para autônomos: o regime para trabalhadores por conta própria ainda não começou. Se você pagar um seguro de saúde ou poupar para a sua pensão, coloque essa taxa em "Como calculamos".',
      },
      retencion: {
        es: 'Desde julio de 2026 (Ley 30-26) las empresas retienen el 15 % de ISR sobre honorarios de personas físicas; antes era el 10 %.',
        en: 'Since July 2026 (Ley 30-26), companies withhold 15% ISR (income tax) on fees paid to individuals. Before, it was 10%.',
        pt: 'Desde julho de 2026 (Ley 30-26), as empresas retêm 15% de ISR sobre honorários de pessoas físicas; antes era de 10%.',
      },
    },
    confianza: 'media',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://revistamercado.do/money-invest/republica-dominicana/precio-del-dolar-hoy-en-republica-dominicana-compra-y-venta-este-miercoles-28-de-octubre-de-2026/',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://www.ey.com/es_ce/technical/tax/tax-alerts/republica-dominicana-salario-minimo-2026',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Santo-Domingo?displayCurrency=DOP' },
      {
        tema: 'iva',
        url: 'https://eldinero.com.do/369509/retencion-de-15-del-isr-igual-que-antes-pero-diferente/',
      },
      {
        tema: 'aportes',
        url: 'https://dida.panel-dev-pys.ogtic.gob.do/wp-content/uploads/2024/10/ABC-No.-40-Febrero-2024-generalidades-del-Sistema-Dominicano-de-la-Seguridad-Social.pdf',
      },
      {
        tema: 'retencion',
        url: 'https://eldinero.com.do/369509/retencion-de-15-del-isr-igual-que-antes-pero-diferente/',
      },
      {
        tema: 'transacciones',
        url: 'https://siemprealdia.co/republica-dominicana/impuestos/calendario-de-implementacion-de-la-ley-30-26/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/DO/Job=Software_Developer/Salary',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/do/salarios/tecnologias-de-la-informacion/programador-java?lang=es',
      },
      { tema: 'salariosDiseno', url: 'https://www.payscale.com/research/DO/Job=Graphic_Designer/Salary' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.ey.com/es_ce/technical/tax/tax-alerts/republica-dominicana-salario-minimo-2026',
      },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/dominican-republic/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Santo-Domingo?displayCurrency=DOP' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Dominican-Republic/electricity_prices/' },
    ],
  },
  EC: {
    tipoCambio: 1,
    fechaCambio: '2026-10-31',
    salarioMinimo: 482,
    iva: { tasa: 0.15, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.089, minimo: 84.83, regimen: 'IESS' },
    retenciones: [
      { id: 'renta10', nombre: 'Retención renta honorarios (10 %)', tasa: 0.1 },
      { id: 'renta3', nombre: 'Retención renta mano de obra (3 %)', tasa: 0.03, auto: false },
    ],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 260, alimentacion: 200, transporte: 17, otros: 81 },
      negocio: { internet: 28, energia: 5.5, software: 28, otros: 14 },
      valorEquipo: 1000,
    },
    mercado: { salarios: { desarrollo: [950, 1700, 2500], diseno: [650, 950, 1400] } },
    notas: {
      iva: {
        es: 'Un profesional que factura honorarios suele estar en el régimen general y cobra el 15 % de IVA. Los servicios a clientes del exterior pueden ir con tarifa 0 %.',
        en: "As a professional invoicing fees, you're usually in the general regime and charge 15% IVA. Services to clients abroad can have a 0% rate.",
        pt: 'Como profissional que fatura honorários, você normalmente está no regime geral e cobra 15% de IVA. Os serviços para clientes no exterior podem ter taxa de 0%.',
      },
      aportes: {
        es: 'Aportas el 17,6 % sobre lo que declares. La base mínima es un salario básico, así que el aporte mínimo es de USD 84,83 al mes. Calculamos con esa base mínima.',
        en: 'You pay 17.6% of the income you declare. The minimum base is one basic salary, so the minimum contribution is USD 84.83 a month. We calculate with that minimum base.',
        pt: 'Você contribui com 17,6% sobre o que declarar. A base mínima é um salário básico, então a contribuição mínima é de USD 84,83 por mês. Calculamos com essa base mínima.',
      },
      retencion: {
        es: 'Desde marzo de 2026 las empresas retienen el 10 % de renta sobre honorarios profesionales de personas naturales.',
        en: 'Since March 2026, companies withhold 10% income tax on professional fees paid to individuals.',
        pt: 'Desde março de 2026, as empresas retêm 10% de imposto sobre o rendimento nos honorários profissionais de pessoas físicas.',
      },
    },
    confianza: 'media',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Quito' },
      {
        tema: 'costoVida',
        url: 'https://www.nucamp.co/blog/cost-of-living-vs-tech-salaries-in-ecuador-in-2026-can-you-actually-afford-it',
      },
      { tema: 'iva', url: 'https://taxdo.com/resources/countries/la/ecuador.md' },
      {
        tema: 'aportes',
        url: 'https://www.eluniverso.com/noticias/economia/salario-basico-unificado-482-aportes-iess-ecuador-2025-nota/',
      },
      {
        tema: 'retencion',
        url: 'https://nmslaw.com.ec/blog/2026/03/02/sri-nuevos-porcentajes-retencion-fuente-impuesto-renta/',
      },
      { tema: 'salariosTecnologia', url: 'https://devsdata.com/average-salary-in-ecuador/' },
      { tema: 'salariosTecnologia', url: 'https://talently.tech/herramientas/ecuador/salario' },
      { tema: 'salariosDiseno', url: 'https://www.payscale.com/research/EC/Job=Graphic_Designer/Salary' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269',
      },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/ecuador/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Quito' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Ecuador/electricity_prices/' },
    ],
  },
  ES: {
    tipoCambio: 0.8951,
    fechaCambio: '2026-10-30',
    salarioMinimo: 1221,
    iva: { tasa: 0.21, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.175, minimo: 205.88, regimen: 'RETA' },
    retenciones: [
      { id: 'irpf7', nombre: 'Retención IRPF nuevos profesionales (7 %)', tasa: 0.07 },
      { id: 'irpf15', nombre: 'Retención IRPF profesionales (15 %)', tasa: 0.15, auto: false },
    ],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 650, alimentacion: 350, transporte: 33, otros: 250 },
      negocio: { internet: 31, energia: 15, software: 25, otros: 32 },
      valorEquipo: 980,
    },
    mercado: { salarios: { desarrollo: [2050, 2880, 4180], diseno: [1920, 2250, 2500] } },
    notas: {
      iva: {
        es: 'En España el autónomo suma el 21 % de IVA desde la primera factura: no hay exención por facturar poco.',
        en: "In Spain, as a self-employed worker, you add 21% IVA from your first invoice. There's no exemption if you invoice only a little.",
        pt: 'Na Espanha, como autônomo você soma 21% de IVA desde a primeira fatura. Não há isenção por faturar pouco.',
      },
      aportes: {
        es: 'La cuota de autónomos depende de tus rendimientos netos: desde 205,88 € al mes. El primer año puedes pagar la tarifa plana de 80 €.',
        en: 'The self-employed contribution depends on your net income: from €205.88 a month. In your first year, you can pay the flat rate of €80.',
        pt: 'A contribuição dos autônomos depende dos seus rendimentos líquidos: a partir de 205,88 € por mês. No primeiro ano, você pode pagar a tarifa fixa de 80 €.',
      },
      retencion: {
        es: 'Las empresas retienen el 15 % de IRPF; en el año en que empiezas y los dos siguientes puedes pedir el 7 %.',
        en: 'Companies withhold 15% IRPF (income tax). In the year you start and the next two, you can request 7%.',
        pt: 'As empresas retêm 15% de IRPF. No ano em que você começa e nos dois seguintes, pode pedir 7%.',
      },
    },
    confianza: 'alta',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://www.cuestioneslaborales.es/cuantia-smi-2026-diario-mensual-y-anual/',
      },
      { tema: 'costoVida', url: 'https://www.idealista.com/news/node/892181' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Madrid?displayCurrency=EUR' },
      {
        tema: 'iva',
        url: 'https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html',
      },
      {
        tema: 'aportes',
        url: 'https://upta.es/wp-content/uploads/2026/03/RES-ORDEN-COTIZACION-2026-RETA.pdf',
      },
      { tema: 'retencion', url: 'https://guiafiscal.es/irpf/retencion-7-autonomo-nuevo/' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/ES/Job=Software_Developer/Salary',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/ES/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://eiposgrados.com/wp-content/uploads/2026/06/Estudio-de-Remuneracion-2026-Michael-Page-Spain.pdf',
      },
      { tema: 'salariosDiseno', url: 'https://es.talent.com/salary?job=dise%C3%B1ador+gr%C3%A1fico' },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/spain/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Madrid?displayCurrency=EUR' },
      { tema: 'energia', url: 'https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table' },
    ],
  },
  GQ: {
    tipoCambio: 587.14,
    fechaCambio: '2026-10-30',
    salarioMinimo: 129_035,
    iva: { tasa: 0.15, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.15, minimo: 78_000, regimen: 'INSESO' },
    retenciones: [{ id: 'wht10', nombre: 'Retención sobre servicios (10 %)', tasa: 0.1 }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 87_000, alimentacion: 150_000, transporte: 22_000, otros: 37_000 },
      negocio: { internet: 59_000, energia: 5100, software: 16_000, otros: 7400 },
      valorEquipo: 650_000,
    },
    mercado: { salarios: { desarrollo: [510_000, 850_000, 1_360_000], diseno: [357_000, 595_000, 952_000] } },
    notas: {
      iva: {
        es: 'El IVA es del 15 %. Si estás registrado como empresa debes cobrarlo; muchos independientes trabajan de manera informal.',
        en: "IVA is 15%. If you're registered as a company, you must charge it. Many self-employed workers operate informally.",
        pt: 'O IVA é de 15%. Se você estiver inscrito como empresa, deve cobrá-lo; muitos autônomos trabalham de maneira informal.',
      },
      aportes: {
        es: 'Para un independiente la afiliación al INSESO es voluntaria: el 26 % sobre al menos 300.000 XAF al mes (78.000 XAF).',
        en: 'For self-employed workers, joining the INSESO (social security) is voluntary: 26% on at least 300,000 XAF a month (78,000 XAF).',
        pt: 'Para autônomos, a filiação ao INSESO é voluntária: 26% sobre pelo menos 300.000 XAF por mês (78.000 XAF).',
      },
      retencion: {
        es: 'Las empresas retienen el 10 % al pagar servicios.',
        en: 'Companies withhold 10% when they pay for services.',
        pt: 'As empresas retêm 10% ao pagar serviços.',
      },
    },
    confianza: 'baja',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://www.issa.int/sites/default/files/documents/2024-07/Equatorial%20Guinea.pdf',
      },
      { tema: 'costoVida', url: 'https://nomad.watch/cities/GQ/malabo/costs' },
      {
        tema: 'costoVida',
        url: 'https://africarrieres.com/equatorial-guinea/en/guide/decouvrir/cost-of-living',
      },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/equatorial-guinea/individual/other-taxes' },
      {
        tema: 'aportes',
        url: 'https://www.issa.int/sites/default/files/documents/2024-07/Equatorial%20Guinea.pdf',
      },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/equatorial-guinea/corporate/withholding-taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://africarrieres.com/equatorial-guinea/en/guide/marche-emploi/salary-guide',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      {
        tema: 'internet',
        url: 'https://africarrieres.com/equatorial-guinea/en/guide/decouvrir/cost-of-living',
      },
    ],
  },
  GT: {
    tipoCambio: 7.64187,
    fechaCambio: '2026-10-31',
    salarioMinimo: 4002.28,
    iva: { tasa: 0.12, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0, minimo: 0, regimen: 'IGSS' },
    retenciones: [{ id: 'pequeno5', nombre: 'Retención IVA Pequeño Contribuyente (5 %)', tasa: 0.05 }],
    compensarPorDefecto: true,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 2400, alimentacion: 1400, transporte: 66, otros: 530 },
      negocio: { internet: 330, energia: 130, software: 210, otros: 110 },
      valorEquipo: 8400,
    },
    mercado: { salarios: { desarrollo: [6280, 10_500, 16_700], diseno: [6300, 10_200, 14_800] } },
    notas: {
      iva: {
        es: 'Casi todos los que empiezan se inscriben como Pequeño Contribuyente: no cobran el 12 % aparte y pagan el 5 % de lo que facturan.',
        en: "Almost everyone starting out registers as a Pequeño Contribuyente (small taxpayer). You don't charge the 12% IVA separately, and you pay 5% of what you invoice.",
        pt: 'Quase todos os que começam se inscrevem como Pequeño Contribuyente (pequeno contribuinte). Você não cobra os 12% de IVA à parte e paga 5% do que fatura.',
      },
      aportes: {
        es: 'El IGSS no tiene un programa abierto para independientes que nunca fueron asalariados. Si pagas un seguro médico, pon esa tasa en "Cómo calculamos".',
        en: 'The IGSS (social security) has no open program for self-employed workers who were never employees. If you pay for health insurance, enter that rate in "How we calculate".',
        pt: 'O IGSS não tem um programa aberto para autônomos que nunca foram assalariados. Se você pagar um seguro de saúde, coloque essa taxa em "Como calculamos".',
      },
      retencion: {
        es: 'Si el cliente es agente de retención del IVA, te descuenta el 5 % del Pequeño Contribuyente; si no, tú pagas ese 5 % cada mes.',
        en: 'If your client is an IVA withholding agent, they deduct the 5% Pequeño Contribuyente tax. If not, you pay that 5% yourself every month.',
        pt: 'Se o cliente for agente de retenção do IVA, ele desconta os 5% do Pequeño Contribuyente; se não for, você paga esses 5% todos os meses.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://www.banguat.gob.gt/tipo_cambio/' },
      { tema: 'salarioMinimo', url: 'https://agn.gt/asi-quedan-los-montos-del-salario-minimo-para-el-2026/' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Guatemala-City' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Guatemala-City' },
      { tema: 'iva', url: 'https://livinginguatemala.com/tramites/isr-vs-iva-guatemala/' },
      { tema: 'aportes', url: 'https://livinginguatemala.com/es/tramites/igss-cuota-voluntaria/' },
      { tema: 'retencion', url: 'https://livinginguatemala.com/tramites/isr-vs-iva-guatemala/' },
      {
        tema: 'salariosTecnologia',
        url: 'https://livinginguatemala.com/es/precios-servicios/ingeniero-en-sistemas-guatemala/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/gt/salarios/tecnologias-de-la-informacion/programador-python?lang=es',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/gt/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://paylab.com/gt/salaryinfo/journalism-printing-arts-media/senior-graphic-designer',
      },
      {
        tema: 'tarifas',
        url: 'https://livinginguatemala.com/es/precios-servicios/ingeniero-en-sistemas-guatemala/',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Guatemala-City' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Guatemala/electricity_prices/' },
    ],
  },
  GW: {
    tipoCambio: 587.14,
    fechaCambio: '2026-10-30',
    salarioMinimo: 59_000,
    iva: { tasa: 0.19, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.075, minimo: 0, regimen: 'INSS' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 57_000, alimentacion: 40_000, transporte: 7600, otros: 15_000 },
      negocio: { internet: 47_000, energia: 5100, software: 16_000, otros: 3000 },
      valorEquipo: 650_000,
    },
    mercado: { salarios: { desarrollo: [200_000, 450_000, 600_000], diseno: [140_000, 315_000, 420_000] } },
    notas: {
      iva: {
        es: 'El IVA es del 19 % desde 2025, pero solo hay que registrarse si se facturan más de 10 millones de XOF al año.',
        en: 'IVA has been 19% since 2025, but you only have to register if you invoice more than 10 million XOF a year.',
        pt: 'O IVA é de 19% desde 2025, mas só precisa se inscrever quem fatura mais de 10 milhões de XOF por ano.',
      },
      aportes: {
        es: 'Aportas entre el 5 % y el 10 % de lo que declaras, según la cobertura que elijas. Usamos el 7,5 %.',
        en: 'You contribute between 5% and 10% of what you declare, depending on the coverage you choose. We use 7.5%.',
        pt: 'A contribuição fica entre 5% e 10% do que você declara, conforme a cobertura que escolher. Usamos 7,5%.',
      },
      retencion: {
        es: 'No encontramos una retención general sobre honorarios.',
        en: 'We found no general withholding tax on fees.',
        pt: 'Não encontramos uma retenção na fonte geral sobre honorários.',
      },
    },
    confianza: 'baja',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      { tema: 'salarioMinimo', url: 'https://rivermate.com/guides/guinea-bissau/salary' },
      { tema: 'costoVida', url: 'https://nomad.watch/cities/GW/bissau/costs' },
      { tema: 'iva', url: 'https://rivermate.com/guides/guinea-bissau/taxes' },
      { tema: 'aportes', url: 'https://www.issa.int/sites/default/files/documents/2024-07/Guinea-Bissau.pdf' },
      { tema: 'retencion', url: 'https://rivermate.com/guides/guinea-bissau/taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://africarrieres.com/guinea-bissau/en/guide/marche-emploi/salary-guide',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'internet', url: 'https://nomad.watch/cities/GW/bissau/costs' },
    ],
  },
  HN: {
    tipoCambio: 26.8964,
    fechaCambio: '2026-10-27',
    salarioMinimo: 13292.06,
    iva: { tasa: 0.15, nombre: 'ISV', porDefecto: true },
    aportes: { tasa: 0.06, minimo: 1595, regimen: 'IHSS' },
    retenciones: [{ id: 'isr125', nombre: 'Retención ISR honorarios (12.5 %)', tasa: 0.125 }],
    compensarPorDefecto: false,
    transacciones: { tasa: 0.002, nombre: 'tasa de seguridad poblacional' },
    perfil: {
      gastos: { vivienda: 6900, alimentacion: 6400, transporte: 530, otros: 1800 },
      negocio: { internet: 970, energia: 340, software: 750, otros: 390 },
      valorEquipo: 30_000,
    },
    mercado: { salarios: { desarrollo: [27_200, 52_000, 72_800], diseno: [17_400, 29_400, 40_300] } },
    notas: {
      iva: {
        es: 'Si estás inscrito, facturas con CAI y cobras el 15 % de ISV a tus clientes del país. Los servicios exportados normalmente no lo llevan.',
        en: "If you're registered, you invoice with a CAI (authorization code) and charge your domestic clients 15% ISV (sales tax). Exported services normally don't carry it.",
        pt: 'Se você estiver inscrito, fatura com CAI (código de autorização) e cobra 15% de ISV dos seus clientes do país. Os serviços exportados normalmente não incluem o ISV.',
      },
      aportes: {
        es: 'La afiliación al IHSS es voluntaria para independientes: cerca de L 1,595 al mes sobre un salario mínimo.',
        en: 'Joining the IHSS (social security) is voluntary for self-employed workers: about L 1,595 a month on one minimum wage.',
        pt: 'A filiação ao IHSS é voluntária para autônomos: cerca de L 1.595 por mês sobre um salário mínimo.',
      },
      retencion: {
        es: 'Quien te paga honorarios retiene el 12.5 % como anticipo del ISR. Si tu impuesto del año es menor, la diferencia es un saldo a tu favor.',
        en: 'Whoever pays you fees withholds 12.5% as an advance payment of ISR (income tax). If your tax for the year is lower, the difference is a balance in your favor.',
        pt: 'Quem paga seus honorários retém 12,5% como antecipação do ISR. Se o seu imposto do ano for menor, a diferença fica como saldo a seu favor.',
      },
    },
    confianza: 'baja',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.laprensa.hn/economia/honduras-precio-dolar-martes-27-octubre-bch-tipo-cambio-KA32450864',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://www.bloomberglinea.com/latinoamerica/honduras/salario-minimo-2026-en-honduras-estos-son-los-nuevos-montos-por-actividad-economica/',
      },
      { tema: 'costoVida', url: 'https://livingcost.org/cost/honduras/tegucigalpa' },
      { tema: 'iva', url: 'https://ivacalculator.com/honduras/regimen-simplificado/' },
      { tema: 'aportes', url: 'https://honduras.eregulations.org/media/Convenio%20independientes.pdf' },
      { tema: 'retencion', url: 'https://invoicedataextraction.com/blog/honduras-withholding-tax-invoices' },
      {
        tema: 'transacciones',
        url: 'https://laprensa.hn/honduras/buscan-ampliar-limite-transacciones-financieras-KL32287940',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://paylab.com/hn/salaryinfo/information-technology/programmer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/hn/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/hn/salaryinfo/journalism-printing-arts-media/junior-graphic-designer?lang=en',
      },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/honduras/' },
      { tema: 'internet', url: 'https://livingcost.org/cost/honduras/tegucigalpa' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Honduras/electricity_prices/' },
    ],
  },
  MX: {
    tipoCambio: 18.7962,
    fechaCambio: '2026-10-30',
    salarioMinimo: 9582.47,
    iva: { tasa: 0.16, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.1, minimo: 1906, regimen: 'IMSS' },
    retenciones: [
      { id: 'resico', nombre: 'Retención ISR RESICO (1.25 %)', tasa: 0.0125 },
      {
        id: 'honorarios10',
        nombre: 'Retención ISR honorarios, actividades profesionales (10 %)',
        tasa: 0.1,
        auto: false,
      },
    ],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 5200, alimentacion: 2300, transporte: 140, otros: 2600 },
      negocio: { internet: 620, energia: 120, software: 530, otros: 250 },
      valorEquipo: 21_000,
    },
    mercado: { salarios: { desarrollo: [19_200, 32_000, 51_200], diseno: [10_000, 12_500, 15_800] } },
    notas: {
      iva: {
        es: 'Como persona física con actividad profesional cobras el 16 % de IVA. Si te paga una empresa, te retiene dos terceras partes de ese IVA.',
        en: 'As an individual with a professional activity, you charge 16% IVA. If a company pays you, it withholds two thirds of that IVA.',
        pt: 'Como pessoa física com atividade profissional, você cobra 16% de IVA. Se quem paga for uma empresa, ela retém dois terços desse IVA.',
      },
      aportes: {
        es: 'El IMSS es voluntario para independientes: unos 1,906 MXN al mes cotizando sobre el salario mínimo.',
        en: 'The IMSS (social security) is voluntary for self-employed workers: about 1,906 MXN a month, contributing on the minimum wage.',
        pt: 'O IMSS é voluntário para autônomos: cerca de 1.906 MXN por mês, contribuindo sobre o salário mínimo.',
      },
      retencion: {
        es: 'En el RESICO las empresas te retienen el 1.25 % de ISR; en el régimen de actividades profesionales, el 10 %.',
        en: 'Under the RESICO (simplified regime), companies withhold 1.25% ISR (income tax) from you; under the professional activities regime, 10%.',
        pt: 'No RESICO, as empresas retêm 1,25% de ISR; no regime de atividades profissionais, 10%.',
      },
    },
    confianza: 'alta',
    fuentes: [
      { tema: 'cambio', url: 'https://www.banxico.org.mx/tipcamb/tipCamMIAction.do?idioma=es' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.unotv.com/negocios/salario-minimo-2026-aumento-montos-y-fecha-de-entrada-en-vigor/',
      },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Mexico-City' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Mexico-City' },
      { tema: 'iva', url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LIVA.pdf' },
      {
        tema: 'aportes',
        url: 'https://calcforlife.com/es/calculadora-modalidad-10-trabajadores-independientes-imss/',
      },
      {
        tema: 'retencion',
        url: 'https://praxiumconsultores.com/blog/retenciones-a-freelancers-resico-vs-actividad-profesional',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.glassdoor.com/Salaries/mexico-software-developer-salary-SRCH_IL.0,6_IN169_KO7,25.htm',
      },
      { tema: 'salariosTecnologia', url: 'https://talently.tech/herramientas/mexico/salario' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.glassdoor.com.mx/Sueldos/dise%C3%B1ador-gr%C3%A1fico-sueldo-SRCH_KO0,18.htm',
      },
      { tema: 'salariosDiseno', url: 'https://mx.talent.com/salary?job=dise%C3%B1ador+grafico' },
      { tema: 'tarifas', url: 'https://www.cronoshare.com.mx/cuanto-cuesta/servicio-diseno-grafico' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Mexico-City' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Mexico/electricity_prices/' },
    ],
  },
  MZ: {
    tipoCambio: 63.91,
    fechaCambio: '2026-08-20',
    salarioMinimo: 10_845,
    iva: { tasa: 0.16, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.1, minimo: 759.15, regimen: 'INSS + ISPC' },
    retenciones: [{ id: 'irps20', nombre: 'Retenção IRPS trabalho independente (20 %)', tasa: 0.2, auto: false }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 9200, alimentacion: 4200, transporte: 520, otros: 1600 },
      negocio: { internet: 5600, energia: 470, software: 1800, otros: 390 },
      valorEquipo: 70_000,
    },
    mercado: { salarios: { desarrollo: [25_000, 55_000, 91_500], diseno: [19_400, 32_200, 44_700] } },
    notas: {
      iva: {
        es: 'Desde 2026 el pequeño contribuyente puede pagar el ISPC (desde el 3 % de lo que factura) en lugar del IVA y del IRPS, y no cobra IVA.',
        en: "Since 2026, if you're a small taxpayer, you can pay the ISPC (small-taxpayer tax), from 3% of what you invoice, instead of IVA and IRPS (income tax). You don't charge IVA.",
        pt: 'Desde 2026, se você for pequeno contribuinte, pode pagar o ISPC (a partir de 3% do que fatura) em vez do IVA e do IRPS. Você não cobra IVA.',
      },
      aportes: {
        es: 'Incluye el 7 % del INSS sobre lo que declaras (mínimo un salario mínimo del sector) y el 3 % del ISPC.',
        en: 'It includes 7% for the INSS (social security) on what you declare (minimum: one minimum wage for the sector) and the 3% ISPC (small-taxpayer tax).',
        pt: 'Inclui 7% do INSS sobre o que você declara (mínimo de um salário mínimo do setor) e 3% do ISPC.',
      },
      retencion: {
        es: 'En el régimen general, las entidades con contabilidad organizada retienen el 20 % de IRPS. En el ISPC normalmente no hay retención.',
        en: "Under the general regime, entities with organized accounting withhold 20% IRPS (income tax). Under the ISPC, there's normally no withholding tax.",
        pt: 'No regime geral, as entidades com contabilidade organizada retêm 20% de IRPS. No ISPC, normalmente não há retenção na fonte.',
      },
    },
    confianza: 'media',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.bancomoc.mz/media/g0zlcvgk/taxas-de-câmbio-de-referência-do-mercado-cambial-do-dia-20082026.pdf',
      },
      { tema: 'salarioMinimo', url: 'https://wageindicator.org/pt-mz/trabalho-em-mocambique/salario-minimo/' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Maputo?displayCurrency=MZN' },
      {
        tema: 'iva',
        url: 'https://www.rsm.global/mozambique/sites/default/files/media/documents/Mo%C3%A7ambique%20Guia%20Fiscal%202026.PT%20_0.pdf',
      },
      { tema: 'aportes', url: 'https://un.social-protection.org/gimi/Media.action?id=18633' },
      {
        tema: 'retencion',
        url: 'https://www.rsm.global/mozambique/sites/default/files/media/documents/Mo%C3%A7ambique%20Guia%20Fiscal%202026.PT%20_0.pdf',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Maputo?displayCurrency=MZN' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Mozambique/electricity_prices/' },
    ],
  },
  NI: {
    tipoCambio: 36.6243,
    fechaCambio: '2026-10-16',
    salarioMinimo: 8320.47,
    iva: { tasa: 0.15, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.15, minimo: 1851, regimen: 'INSS' },
    retenciones: [
      { id: 'ir10', nombre: 'Retención IR servicios profesionales (10 %)', tasa: 0.1 },
      { id: 'ir2', nombre: 'Retención IR compras de bienes y servicios (2 %)', tasa: 0.02, auto: false },
    ],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 2800, alimentacion: 2000, transporte: 50, otros: 2300 },
      negocio: { internet: 1200, energia: 380, software: 1000, otros: 180 },
      valorEquipo: 40_000,
    },
    mercado: { salarios: { desarrollo: [12_000, 23_300, 31_900], diseno: [8320, 10_300, 14_100] } },
    notas: {
      iva: {
        es: 'Los servicios profesionales pagan IVA: si estás inscrito, cobras el 15 % a tus clientes del país.',
        en: "Professional services are subject to IVA. If you're registered, you charge domestic clients 15%.",
        pt: 'Os serviços profissionais estão sujeitos ao IVA: se você estiver inscrito, cobra 15% dos seus clientes do país.',
      },
      aportes: {
        es: 'Como asegurado facultativo pagas tú solo la cuota del INSS sobre el salario que declares. Usamos una estimación sin verificar.',
        en: 'As a voluntary insured member, you alone pay the INSS (social security) contribution, based on the salary you declare. We use an unverified estimate.',
        pt: 'Como segurado facultativo, só você paga a contribuição ao INSS, sobre o salário que declarar. Usamos uma estimativa não verificada.',
      },
      retencion: {
        es: 'Las empresas retienen el 10 % de IR al pagar servicios profesionales.',
        en: 'Companies withhold 10% IR (income tax) when they pay for professional services.',
        pt: 'As empresas retêm 10% de IR ao pagar serviços profissionais.',
      },
    },
    confianza: 'baja',
    fuentes: [
      { tema: 'cambio', url: 'https://www.bcn.gob.ni/' },
      { tema: 'salarioMinimo', url: 'https://tradingeconomics.com/nicaragua/minimum-wages' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Managua' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Managua' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/nicaragua/corporate/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/nicaragua/corporate/other-taxes' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/nicaragua/corporate/withholding-taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/ni/salaryinfo/information-technology/programmer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/ni/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'salariosDiseno', url: 'https://tradingeconomics.com/nicaragua/minimum-wages' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Managua' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Nicaragua/electricity_prices/' },
    ],
  },
  PA: {
    tipoCambio: 1,
    fechaCambio: '2026-10-31',
    salarioMinimo: 651.04,
    iva: { tasa: 0.07, nombre: 'ITBMS', porDefecto: false },
    aportes: { tasa: 0.1, minimo: 0, regimen: 'CSS' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 600, alimentacion: 260, transporte: 19, otros: 81 },
      negocio: { internet: 52, energia: 10, software: 28, otros: 24 },
      valorEquipo: 1100,
    },
    mercado: { salarios: { desarrollo: [1760, 3200, 4490], diseno: [985, 1710, 2310] } },
    notas: {
      iva: {
        es: 'Si facturas menos de USD 36,000 al año no tienes que cobrar el 7 % de ITBMS.',
        en: "If you invoice less than USD 36,000 a year, you don't have to charge the 7% ITBMS (sales tax).",
        pt: 'Se você faturar menos de USD 36.000 por ano, não precisa cobrar os 7% de ITBMS.',
      },
      aportes: {
        es: 'Los independientes cotizan a la CSS sobre lo que declaran. Usamos una estimación cercana a la cuota de un asalariado (10 %).',
        en: "Self-employed workers contribute to the CSS (social security) on what they declare. We use an estimate close to an employee's rate (10%).",
        pt: 'Os autônomos contribuem para a CSS sobre o que declaram. Usamos uma estimativa próxima da contribuição de um assalariado (10%).',
      },
      retencion: {
        es: 'Las empresas no retienen ISR al pagar a un profesional independiente residente: tú lo declaras y lo pagas.',
        en: "Companies don't withhold ISR (income tax) when paying a resident self-employed professional. You declare it and pay it yourself.",
        pt: 'As empresas não retêm ISR ao pagar a um profissional autônomo residente: é você quem declara e paga o imposto.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://tradingeconomics.com/panama/minimum-wages' },
      { tema: 'salarioMinimo', url: 'https://tradingeconomics.com/panama/minimum-wages' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Panama-City' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Panama-City' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/panama/corporate/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/panama/individual/other-taxes' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/panama/individual/taxes-on-personal-income' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/pa/salaryinfo/information-technology/programmer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/pa/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Panama-City' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/electricity_prices/' },
    ],
  },
  PE: {
    tipoCambio: 3.4535,
    fechaCambio: '2026-10-29',
    salarioMinimo: 1130,
    iva: { tasa: 0.18, nombre: 'IGV', porDefecto: false },
    aportes: { tasa: 0.06, minimo: 147, regimen: 'ONP / AFP' },
    retenciones: [{ id: 'cuarta8', nombre: 'Retención renta de cuarta categoría (8 %)', tasa: 0.08 }],
    compensarPorDefecto: false,
    transacciones: { tasa: 5e-05, nombre: 'ITF (impuesto a las transacciones financieras)' },
    perfil: {
      gastos: { vivienda: 840, alimentacion: 560, transporte: 100, otros: 210 },
      negocio: { internet: 92, energia: 41, software: 97, otros: 42 },
      valorEquipo: 3800,
    },
    mercado: { salarios: { desarrollo: [3300, 5500, 8500], diseno: [1600, 2400, 3800] } },
    notas: {
      iva: {
        es: 'Si emites recibos por honorarios no cobras IGV.',
        en: "If you issue recibos por honorarios (fee receipts), you don't charge IGV (sales tax).",
        pt: 'Se você emitir recibos por honorarios, não cobra IGV.',
      },
      aportes: {
        es: 'Para quien emite recibos por honorarios la pensión es voluntaria: en la ONP, el 13 % de lo que declares. Calculamos con la base de una remuneración mínima.',
        en: 'If you issue recibos por honorarios, paying into a pension is voluntary: in the ONP (public pension system), 13% of what you declare. We calculate using a base of one minimum wage.',
        pt: 'Para quem emite recibos por honorarios, a pensão é voluntária: na ONP, 13% do que você declarar. Calculamos com a base de uma remuneração mínima.',
      },
      retencion: {
        es: 'La empresa retiene el 8 % en recibos de más de S/ 1.500. Si en el año vas a ganar menos de S/ 48.125, puedes pedir la suspensión de retenciones a la SUNAT.',
        en: "The company withholds 8% on receipts over S/ 1,500. If you're going to earn less than S/ 48,125 during the year, you can ask the SUNAT (tax agency) to suspend withholding.",
        pt: 'A empresa retém 8% em recibos acima de S/ 1.500. Se você for ganhar menos de S/ 48.125 no ano, pode pedir à SUNAT a suspensão das retenções.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://open.er-api.com/v6/latest/USD' },
      { tema: 'salarioMinimo', url: 'https://www.playroll.com/minimum-wage/peru' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Lima' },
      { tema: 'iva', url: 'https://taxdo.com/resources/countries/la/peru.md' },
      { tema: 'aportes', url: 'https://www.playroll.com/minimum-wage/peru' },
      { tema: 'retencion', url: 'https://www.sunat.gob.pe/indicestasas/uit.html' },
      { tema: 'transacciones', url: 'https://www.sunat.gob.pe/legislacion/general/index.html' },
      { tema: 'salariosTecnologia', url: 'https://talently.tech/herramientas/peru/salario' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/PE/Job=Software_Developer/Salary',
      },
      { tema: 'salariosDiseno', url: 'https://www.aprender21.com/blog/salario-disenador-grafico-2026' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.mercadonegro.pe/publicidad/cuanto-ganan-disenadores-graficos-america-latina',
      },
      {
        tema: 'tarifas',
        url: 'https://gestion.pe/economia/management-empleo/freelancers-peruanos-de-que-carreras-son-cuanto-cobran-y-oportunidades-contratacion-tarifa-por-hora-noticia/',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Lima' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Peru/electricity_prices/' },
    ],
  },
  PR: {
    tipoCambio: 1,
    fechaCambio: '2026-10-31',
    salarioMinimo: 1820,
    iva: { tasa: 0.115, nombre: 'IVU', porDefecto: false },
    aportes: { tasa: 0.13, minimo: 0, regimen: 'Self-employment tax' },
    retenciones: [{ id: 'servicios10', nombre: 'Retención en el origen por servicios (10 %)', tasa: 0.1 }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 1000, alimentacion: 400, transporte: 250, otros: 340 },
      negocio: { internet: 71, energia: 20, software: 28, otros: 49 },
      valorEquipo: 1100,
    },
    mercado: { salarios: { desarrollo: [4130, 6620, 8130], diseno: [2140, 2850, 4050] } },
    notas: {
      iva: {
        es: 'El IVU general es 11.5 % para servicios a consumidores. Los servicios a otros negocios pagan 4 %, y estás exento si facturas menos de USD 200,000 al año.',
        en: "The general IVU (sales tax) is 11.5% for services to consumers. Services to other businesses are taxed at 4%, and you're exempt if you invoice less than USD 200,000 a year.",
        pt: 'O IVU geral é de 11,5% para serviços a consumidores. Os serviços a outras empresas pagam 4%, e você está isento se faturar menos de USD 200.000 por ano.',
      },
      aportes: {
        es: 'Pagas el 15.3 % sobre el 92.35 % de tu ganancia neta (Seguro Social y Medicare): cerca del 13 % de lo que facturas.',
        en: 'You pay 15.3% on 92.35% of your net profit (Social Security and Medicare): about 13% of what you invoice.',
        pt: 'Você paga 15,3% sobre 92,35% do seu lucro líquido (Seguro Social e Medicare): cerca de 13% do que fatura.',
      },
      retencion: {
        es: 'Las empresas retienen el 10 % al pagar servicios. Hacienda puede darte un certificado de relevo de retención.',
        en: 'Companies withhold 10% when they pay for services. Hacienda (Treasury Department) can give you a withholding waiver certificate.',
        pt: 'As empresas retêm 10% ao pagar serviços. A Hacienda (Departamento do Tesouro) pode emitir um certificado de dispensa de retenção.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://www.onetonline.org/link/localwages/15-1252.00?st=PR' },
      { tema: 'salarioMinimo', url: 'https://fred.stlouisfed.org/series/STTMINWGPR' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/San-Juan' },
      {
        tema: 'costoVida',
        url: 'https://www.elnuevodia.com/noticias/locales/notas/nueva-tarifa-record-alza-de-18-lleva-el-costo-del-kilovatio-hora-a-336-centavos/',
      },
      { tema: 'iva', url: 'https://trykintsugi.com/es-419/sales-tax-guides/usa/puerto-rico' },
      {
        tema: 'aportes',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes',
      },
      {
        tema: 'retencion',
        url: 'https://hacienda.pr.gov/comerciantes/patronos-y-agentes-retenedores/retencion-en-servicios-prestados',
      },
      { tema: 'salariosTecnologia', url: 'https://www.onetonline.org/link/localwages/15-1252.00?st=PR' },
      { tema: 'salariosTecnologia', url: 'https://www.bls.gov/oes/2023/may/oes_pr.htm' },
      { tema: 'salariosDiseno', url: 'https://www.onetonline.org/link/localwages/27-1024.00?st=PR' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/San-Juan' },
      {
        tema: 'energia',
        url: 'https://www.elnuevodia.com/noticias/locales/notas/nueva-tarifa-record-alza-de-18-lleva-el-costo-del-kilovatio-hora-a-336-centavos/',
      },
    ],
  },
  PT: {
    tipoCambio: 0.8951,
    fechaCambio: '2026-10-30',
    salarioMinimo: 920,
    iva: { tasa: 0.23, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.15, minimo: 20, regimen: 'Segurança Social' },
    retenciones: [
      { id: 'irs23', nombre: 'Retenção na fonte IRS categoria B (23 %)', tasa: 0.23 },
      { id: 'irs115', nombre: 'Retenção IRS outras prestações (11,5 %)', tasa: 0.115, auto: false },
    ],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 570, alimentacion: 300, transporte: 38, otros: 220 },
      negocio: { internet: 30, energia: 14, software: 25, otros: 28 },
      valorEquipo: 980,
    },
    mercado: { salarios: { desarrollo: [1720, 2430, 3560], diseno: [1490, 1870, 2250] } },
    notas: {
      iva: {
        es: 'Si facturas menos de 15.000 € al año puedes acogerte a la exención del artículo 53 del CIVA y no cobrar el 23 % de IVA.',
        en: 'If you invoice less than €15,000 a year, you can opt for the exemption in Article 53 of the CIVA (IVA code) and not charge the 23% IVA.',
        pt: 'Se você faturar menos de 15.000 € por ano, pode optar pela isenção do artigo 53.º do CIVA e não cobrar os 23% de IVA.',
      },
      aportes: {
        es: 'Pagas el 21,4 % sobre el 70 % de lo que facturas (cerca del 15 %). Los primeros 12 meses estás exento.',
        en: "You pay 21.4% on 70% of what you invoice (about 15%). For the first 12 months, you're exempt.",
        pt: 'Você paga 21,4% sobre 70% do que fatura (cerca de 15%). Nos primeiros 12 meses, está isento.',
      },
      retencion: {
        es: 'Las empresas retienen el 23 % de IRS. Si facturas menos de 15.000 € al año puedes pedir la dispensa de retención.',
        en: 'Companies withhold 23% IRS (Portuguese income tax). If you invoice less than €15,000 a year, you can request an exemption from withholding.',
        pt: 'As empresas retêm 23% de IRS. Se você faturar menos de 15.000 € por ano, pode pedir a dispensa de retenção na fonte.',
      },
    },
    confianza: 'media',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://rr.pt/noticia/economia/2025/12/29/agora-e-oficial-subida-do-salario-minimo-para-920-euros-em-2026-publicada-em-diario-da-republica/453287/',
      },
      { tema: 'costoVida', url: 'https://executivedigest.sapo.pt/?p=747117' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Lisbon?displayCurrency=EUR' },
      {
        tema: 'iva',
        url: 'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx',
      },
      {
        tema: 'aportes',
        url: 'https://crncontabilidade.pt/blog/calculadora-seguranca-social-2026-para-trabalhadores-independentes-quanto-pagar-de-contribuicoes-irs-e-iva/',
      },
      {
        tema: 'retencion',
        url: 'https://www.deco.proteste.pt/dinheiro/impostos/dicas/retencao-fonte-recibos-verdes',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/PT/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.payscale.com/research/PT/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary/5ba588fa/Early-Career',
      },
      { tema: 'salariosDiseno', url: 'https://www.payscale.com/research/PT/Job=Graphic_Designer/Salary' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.payscale.com/research/PT/Job=Senior_Graphic_Designer/Salary',
      },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/portugal/' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Lisbon?displayCurrency=EUR' },
      { tema: 'energia', url: 'https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table' },
    ],
  },
  PY: {
    tipoCambio: 5944.76,
    fechaCambio: '2026-10-30',
    salarioMinimo: 2_899_408,
    iva: { tasa: 0.1, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0, minimo: 0, regimen: 'IPS' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 1_500_000, alimentacion: 810_000, transporte: 130_000, otros: 300_000 },
      negocio: { internet: 130_000, energia: 23_000, software: 170_000, otros: 68_000 },
      valorEquipo: 6_500_000,
    },
    mercado: {
      salarios: { desarrollo: [4_520_000, 7_530_000, 12_000_000], diseno: [3_390_000, 5_640_000, 9_030_000] },
    },
    notas: {
      iva: {
        es: 'Los servicios personales pagan IVA: si estás inscrito en el RUC, facturas el 10 % y lo liquidas cada mes.',
        en: "Personal services are subject to IVA. If you're registered with the RUC (taxpayer registry), you charge 10% and settle it every month.",
        pt: 'Os serviços pessoais estão sujeitos ao IVA: se você estiver inscrito no RUC, fatura 10% e liquida o imposto todos os meses.',
      },
      aportes: {
        es: 'Para independientes el IPS es voluntario, así que no lo sumamos. Sin él no tienes jubilación ni salud: si cotizas o pagas un seguro, pon esa tasa en "Cómo calculamos".',
        en: "The IPS (social security) is voluntary for self-employed workers, so we don't add it. Without it, you have no pension or health coverage. If you contribute or pay for insurance, enter that rate in \"How we calculate\".",
        pt: 'Para autônomos, o IPS é voluntário, por isso não o somamos. Sem ele, você não tem aposentadoria nem cobertura de saúde: se contribuir ou pagar um seguro, coloque essa taxa em "Como calculamos".',
      },
      retencion: {
        es: 'No encontramos una retención general cuando una empresa te paga honorarios.',
        en: 'We found no general withholding tax when a company pays you fees.',
        pt: 'Não encontramos uma retenção na fonte geral quando uma empresa paga honorários a você.',
      },
    },
    confianza: 'baja',
    fuentes: [
      { tema: 'cambio', url: 'https://www.bcp.gov.py/webapps/web/cotizacion/monedas' },
      { tema: 'salarioMinimo', url: 'https://wageindicator.org/es-py/trabajo-en-paraguay/salario-minimo' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Asuncion' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Asuncion?displayCurrency=USD' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/paraguay/individual/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/paraguay/individual/taxes-on-personal-income' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/paraguay/individual/tax-administration' },
      { tema: 'salariosTecnologia', url: 'https://www.levels.fyi/t/software-engineer/locations/paraguay' },
      { tema: 'salariosDiseno', url: 'https://www.levels.fyi/t/software-engineer/locations/paraguay' },
      {
        tema: 'salariosDiseno',
        url: 'https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025',
      },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Asuncion' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Paraguay/electricity_prices/' },
    ],
  },
  ST: {
    tipoCambio: 21.93,
    fechaCambio: '2026-10-30',
    salarioMinimo: 3000,
    iva: { tasa: 0.15, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0.17, minimo: 0, regimen: 'INSS' },
    retenciones: [{ id: 'irs15', nombre: 'Retenção IRS categoria B (15 %)', tasa: 0.15, auto: false }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 1300, alimentacion: 1300, transporte: 180, otros: 430 },
      negocio: { internet: 880, energia: 320, software: 610, otros: 80 },
      valorEquipo: 24_000,
    },
    mercado: { salarios: { desarrollo: [5300, 7500, 9700], diseno: [3710, 5250, 6790] } },
    notas: {
      iva: {
        es: 'Si facturas menos de 1.000.000 STN al año no cobras IVA, pero pagas el 7 % de lo que facturas.',
        en: "If you invoice less than 1,000,000 STN a year, you don't charge IVA, but you pay 7% of what you invoice.",
        pt: 'Se você faturar menos de 1.000.000 STN por ano, não cobra IVA, mas paga 7% do que fatura.',
      },
      aportes: {
        es: 'Incluye el 10 % del INSS sobre lo que declaras y el 7 % sobre la facturación del régimen de exención del IVA.',
        en: 'It includes 10% for the INSS (social security) on what you declare and 7% on your invoicing under the IVA exemption regime.',
        pt: 'Inclui 10% do INSS sobre o que você declara e 7% sobre o que você fatura no regime de isenção do IVA.',
      },
      retencion: {
        es: 'Sobre trabajo independiente puede haber una retención del 15 % como pago a cuenta del IRS.',
        en: 'On self-employed work, there may be a 15% withholding as an advance payment toward IRS (income tax).',
        pt: 'Sobre o trabalho independente pode haver uma retenção na fonte de 15%, como pagamento por conta do IRS.',
      },
    },
    confianza: 'baja',
    fuentes: [
      {
        tema: 'cambio',
        url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html',
      },
      {
        tema: 'salarioMinimo',
        url: 'https://wageindicator.org/pt-st/trabalho-em-sao-tome-e-principe/salario-minimo/',
      },
      { tema: 'costoVida', url: 'https://nomad.watch/cities/ST/sao-tome/costs' },
      { tema: 'iva', url: 'https://vatcalc.com/?p=25943' },
      { tema: 'aportes', url: 'https://immigrantinvest.com/de/blog/sao-tome-and-principe-taxes/' },
      { tema: 'retencion', url: 'https://immigrantinvest.com/de/blog/sao-tome-and-principe-taxes/' },
      {
        tema: 'salariosTecnologia',
        url: 'https://wageindicator.org/pt-st/trabalho-em-sao-tome-e-principe/salario-minimo/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://africarrieres.com/cape-verde/en/guide/marche-emploi/salary-guide',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      {
        tema: 'internet',
        url: 'https://360nations.com/africa/sao-tome-and-principe/cost-utilities-internet.html',
      },
      {
        tema: 'energia',
        url: 'https://360nations.com/africa/sao-tome-and-principe/cost-utilities-internet.html',
      },
    ],
  },
  SV: {
    tipoCambio: 1,
    fechaCambio: '2026-10-31',
    salarioMinimo: 408.8,
    iva: { tasa: 0.13, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.075, minimo: 40, regimen: 'ISSS' },
    retenciones: [{ id: 'isr10', nombre: 'Retención ISR servicios (10 %)', tasa: 0.1 }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 210, alimentacion: 79, transporte: 6, otros: 32 },
      negocio: { internet: 38, energia: 16, software: 28, otros: 8 },
      valorEquipo: 1100,
    },
    mercado: { salarios: { desarrollo: [531, 947, 1380], diseno: [409, 466, 644] } },
    notas: {
      iva: {
        es: 'Si estás inscrito como contribuyente de IVA, cobras el 13 % a tus clientes del país. Los servicios a clientes del exterior van al 0 %.',
        en: "If you're registered as an IVA taxpayer, you charge domestic clients 13%. Services to clients abroad are taxed at 0%.",
        pt: 'Se você estiver inscrito como contribuinte de IVA, cobra 13% dos seus clientes do país. Os serviços para clientes no exterior têm taxa de 0%.',
      },
      aportes: {
        es: 'El ISSS para independientes es una cuota fija de USD 40 al mes (cobertura individual). La AFP es voluntaria.',
        en: 'For self-employed workers, the ISSS (social security) is a fixed payment of USD 40 a month (individual coverage). The AFP (pension fund) is voluntary.',
        pt: 'Para autônomos, o ISSS é uma contribuição fixa de USD 40 por mês (cobertura individual). A AFP (fundo de pensões) é voluntária.',
      },
      retencion: {
        es: 'Las empresas retienen el 10 % de ISR al pagar servicios de personas naturales.',
        en: 'Companies withhold 10% ISR (income tax) when they pay for services from individuals.',
        pt: 'As empresas retêm 10% de ISR ao pagar serviços de pessoas físicas.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://taxsummaries.pwc.com/el-salvador/individual/taxes-on-personal-income' },
      { tema: 'salarioMinimo', url: 'https://tradingeconomics.com/el-salvador/minimum-wages' },
      { tema: 'costoVida', url: 'https://livingcost.org/cost/guatemala-city/san-salvador' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/San-Salvador' },
      { tema: 'iva', url: 'https://ivacalculator.com/el-salvador/' },
      { tema: 'aportes', url: 'https://www.isss.gob.sv/regimen-especial-para-trabajadores-independientes/' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/el-salvador/corporate/withholding-taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/sv/salaryinfo/information-technology/programmer?lang=en',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/sv/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'salariosDiseno', url: 'https://tradingeconomics.com/el-salvador/minimum-wages' },
      { tema: 'tarifas', url: 'https://lemon.io/rate-calculator/el-salvador/' },
      { tema: 'internet', url: 'https://livingcost.org/cost/guatemala-city/san-salvador' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/El-Salvador/electricity_prices/' },
    ],
  },
  TL: {
    tipoCambio: 1,
    fechaCambio: '2026-10-30',
    salarioMinimo: 115,
    iva: { tasa: 0.0, nombre: 'IVA', porDefecto: false },
    aportes: { tasa: 0, minimo: 0, regimen: '' },
    retenciones: [],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 110, alimentacion: 44, transporte: 11, otros: 25 },
      negocio: { internet: 55, energia: 8.5, software: 28, otros: 4.5 },
      valorEquipo: 1100,
    },
    mercado: { salarios: { desarrollo: [320, 600, 815], diseno: [225, 420, 570] } },
    notas: {
      iva: { es: 'Timor-Leste no tiene IVA.', en: 'Timor-Leste has no IVA.', pt: 'Timor-Leste não tem IVA.' },
      aportes: {
        es: 'No encontramos un régimen de seguridad social para independientes.',
        en: 'We found no social security program for self-employed workers.',
        pt: 'Não encontramos um regime de segurança social para autônomos.',
      },
      retencion: {
        es: 'No hay retención sobre honorarios pagados a profesionales residentes.',
        en: "There's no withholding tax on fees paid to resident professionals.",
        pt: 'Não há retenção na fonte sobre honorários pagos a profissionais residentes.',
      },
    },
    confianza: 'baja',
    fuentes: [
      { tema: 'cambio', url: 'https://taxsummaries.pwc.com/timor-leste/individual/taxes-on-personal-income' },
      { tema: 'salarioMinimo', url: 'https://rivermate.com/guides/timor-leste/salary' },
      { tema: 'costoVida', url: 'https://nomad.watch/cities/TL/dili/costs' },
      { tema: 'iva', url: 'https://taxsummaries.pwc.com/timor-leste/corporate/other-taxes' },
      { tema: 'aportes', url: 'https://taxsummaries.pwc.com/timor-leste/individual/other-taxes' },
      { tema: 'retencion', url: 'https://taxsummaries.pwc.com/timor-leste/corporate/withholding-taxes' },
      {
        tema: 'salariosTecnologia',
        url: 'https://worldsalaries.com/average-software-developer-salary-in-angola/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en',
      },
      { tema: 'internet', url: 'https://nomad.watch/cities/TL/dili/costs' },
    ],
  },
  UY: {
    tipoCambio: 40.21,
    fechaCambio: '2026-10-30',
    salarioMinimo: 25_383,
    iva: { tasa: 0.22, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0.14, minimo: 8833, regimen: 'BPS + FONASA' },
    retenciones: [{ id: 'irpf7', nombre: 'Retención IRPF servicios personales (7 %)', tasa: 0.07, auto: false }],
    compensarPorDefecto: false,
    transacciones: null,
    perfil: {
      gastos: { vivienda: 21_000, alimentacion: 10_000, transporte: 2300, otros: 4600 },
      negocio: { internet: 1700, energia: 600, software: 1100, otros: 940 },
      valorEquipo: 44_000,
    },
    mercado: { salarios: { desarrollo: [62_500, 97_500, 130_000], diseno: [47_500, 72_500, 95_000] } },
    notas: {
      iva: {
        es: 'Los servicios personales pagan IVA del 22 % y no hay exención por facturar poco.',
        en: "Personal services are subject to 22% IVA, and there's no exemption if you invoice only a little.",
        pt: 'Os serviços pessoais estão sujeitos a IVA de 22%, e não há isenção por faturar pouco.',
      },
      aportes: {
        es: 'Los aportes al BPS son fijos según tu categoría, no un porcentaje: la categoría 1 con FONASA cuesta unos UYU 8.833 al mes.',
        en: 'BPS (social security) contributions are fixed based on your category, not a percentage: category 1 with FONASA (health coverage) costs about UYU 8,833 a month.',
        pt: 'As contribuições ao BPS são fixas conforme a sua categoria, não um percentual: a categoria 1 com FONASA (saúde) custa cerca de UYU 8.833 por mês.',
      },
      retencion: {
        es: 'Solo retienen el 7 % de IRPF las grandes empresas y el Estado. Si ganas poco, lo recuperas en la declaración anual.',
        en: 'Only large companies and the government withhold 7% IRPF (income tax). If you earn little, you get it back in your annual tax return.',
        pt: 'Só as grandes empresas e o Estado retêm 7% de IRPF. Se você ganhar pouco, recupera esse valor na declaração anual.',
      },
    },
    confianza: 'media',
    fuentes: [
      { tema: 'cambio', url: 'https://www.poundsterlinglive.com/history/USD-UYU-2026' },
      { tema: 'salarioMinimo', url: 'https://www.impo.com.uy/bases/decretos/319-2025' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/cost-of-living/in/Montevideo?displayCurrency=UYU' },
      { tema: 'costoVida', url: 'https://www.numbeo.com/food-prices/in/Montevideo' },
      {
        tema: 'iva',
        url: 'https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/2024-04/IVA%20SERVICIOS%20PERSONALES%20-%202023.pdf',
      },
      { tema: 'aportes', url: 'https://www.bps.gub.uy/6665/industria-y-comercio.html' },
      {
        tema: 'retencion',
        url: 'https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/documentos/publicaciones/Aspectos%20generales%20de%20la%20tributaci%C3%B3n%20del%20IRPF.pdf',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-full-stack-uruguay-2025',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-aplicaciones-uruguay-2025',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025',
      },
      {
        tema: 'tarifas',
        url: 'https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-full-stack-uruguay-2025',
      },
      { tema: 'tarifas', url: 'https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025' },
      { tema: 'internet', url: 'https://www.numbeo.com/cost-of-living/in/Montevideo?displayCurrency=UYU' },
      { tema: 'energia', url: 'https://www.impo.com.uy/bases/decretos/339-2025' },
    ],
  },
  VE: {
    tipoCambio: 889.2553,
    fechaCambio: '2026-10-30',
    salarioMinimo: 213_421,
    iva: { tasa: 0.16, nombre: 'IVA', porDefecto: true },
    aportes: { tasa: 0, minimo: 0, regimen: 'IVSS' },
    retenciones: [{ id: 'islr3', nombre: 'Retención ISLR honorarios (3 %)', tasa: 0.03 }],
    compensarPorDefecto: false,
    transacciones: { tasa: 0.03, nombre: 'IGTF (impuesto a las grandes transacciones financieras)' },
    perfil: {
      gastos: { vivienda: 120_000, alimentacion: 62_000, transporte: 8600, otros: 27_000 },
      negocio: { internet: 26_000, energia: 2400, software: 25_000, otros: 5400 },
      valorEquipo: 890_000,
    },
    mercado: { salarios: { desarrollo: [356_000, 622_000, 1_070_000], diseno: [267_000, 400_000, 667_000] } },
    notas: {
      iva: {
        es: 'Quien factura formalmente a empresas del país cobra el 16 % de IVA. Los servicios a clientes del exterior van al 0 %.',
        en: 'If you formally invoice domestic companies, you charge 16% IVA. Services to clients abroad are taxed at 0%.',
        pt: 'Se você faturar formalmente a empresas do país, cobra 16% de IVA. Os serviços para clientes no exterior têm taxa de 0%.',
      },
      aportes: {
        es: 'La afiliación al IVSS es voluntaria y su costo es muy bajo, así que no la sumamos.',
        en: "Joining the IVSS (social security) is voluntary and costs very little, so we don't add it.",
        pt: 'A filiação ao IVSS é voluntária e o custo é muito baixo, por isso não a somamos.',
      },
      retencion: {
        es: 'Las empresas retienen el 3 % de ISLR sobre honorarios de personas naturales residentes.',
        en: 'Companies withhold 3% ISLR (income tax) on fees paid to resident individuals.',
        pt: 'As empresas retêm 3% de ISLR sobre honorários de pessoas físicas residentes.',
      },
    },
    confianza: 'baja',
    fuentes: [
      { tema: 'cambio', url: 'https://finanzasdigital.com/category/tasa-bcv/' },
      {
        tema: 'salarioMinimo',
        url: 'https://www.infobae.com/venezuela/2026/05/05/venezuela-aplaza-de-nuevo-la-reforma-salarial-el-aumento-a-240-dolares-ira-en-bonos-no-en-salario/',
      },
      { tema: 'costoVida', url: 'https://expatistan.com/cost-of-living/caracas' },
      {
        tema: 'costoVida',
        url: 'https://eldiario.com/2026/03/23/canasta-alimentaria-venezuela-febrero-2026/',
      },
      { tema: 'iva', url: 'https://taxdo.com/resources/countries/la/venezuela.md' },
      {
        tema: 'aportes',
        url: 'https://eldiario.com/2024/04/07/ivss-pasos-para-cotizar-trabajador-independiente-venezuela/',
      },
      {
        tema: 'retencion',
        url: 'https://www.forvismazars.com/ve/es/insights/forvis-mazars-insights/tabla-de-retenciones-islr-ut-9-00-bs-may-2023',
      },
      { tema: 'transacciones', url: 'https://finanzasdigital.com/glosario/igtf/' },
      {
        tema: 'salariosTecnologia',
        url: 'https://www.bloomberglinea.com/latinoamerica/venezuela/salarios-de-sector-privado-se-erosionan-en-venezuela-por-inflacion-esto-gana-un-gerente/',
      },
      {
        tema: 'salariosTecnologia',
        url: 'https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://www.bloomberglinea.com/latinoamerica/venezuela/salarios-de-sector-privado-se-erosionan-en-venezuela-por-inflacion-esto-gana-un-gerente/',
      },
      {
        tema: 'salariosDiseno',
        url: 'https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/',
      },
      {
        tema: 'tarifas',
        url: 'https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/',
      },
      { tema: 'internet', url: 'https://expatistan.com/cost-of-living/caracas' },
      { tema: 'energia', url: 'https://www.globalpetrolprices.com/Venezuela/electricity_prices/' },
    ],
  },
};
