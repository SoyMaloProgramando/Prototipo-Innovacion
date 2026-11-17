/**
 * Explicações do botão "!": o que colocar (ou o que significa) e um exemplo.
 * As partes que dependem do país ou dos seus dados são funções que recebem:
 *   f (formato da moeda), ej (valores de exemplo do país), p (parâmetros do país),
 *   r (resultado atual), estado, pais (nome e moeda) e idioma.
 * As funções auxiliares e os cálculos são os mesmos do arquivo em espanhol, para que
 * os exemplos mostrem os mesmos números em todos os idiomas. O nome do país vai entre
 * parênteses ("no seu país (Colômbia)") para não depender do artigo (da, do, de).
 */
import { tasaSeguridadSocial } from '../../../logica/impuestos.js';
import { notaDePais, regimenDePais } from '../../../logica/paises.js';

const suma = (o) => Object.values(o ?? {}).reduce((s, v) => s + (Number(v) || 0), 0);
const HORAS_EJEMPLO = 40 * 4.33 * 0.6; // 103,9 horas cobradas por mês
/** Arredonda para dois algarismos significativos, para o exemplo ficar fácil de ler. */
const redondo = (v) => {
  if (!v) return 0;
  const potencia = 10 ** (Math.floor(Math.log10(Math.abs(v))) - 1);
  return Math.round(v / potencia) * potencia;
};
const nombrePais = ({ pais, idioma }) => pais.nombres[idioma] ?? pais.nombres.es;
const enColombia = ({ pais }) => pais.id === 'CO';

export default {
  // ── Passo 1: seu perfil ─────────────────────────────────────────
  pais: {
    que: 'O país onde você trabalha e onde vive o seu cliente. Muda a moeda, o salário mínimo, os impostos, as contribuições à previdência social, os feriados e as tarifas do mercado.',
    ejemplo: 'Se você mora em Lima e cobra de uma empresa peruana, escolha Peru: tudo é calculado em soles.',
    nota: 'Ao mudar de país, as suas despesas e custos voltam aos valores de exemplo desse país, na moeda dele. Revise-os.',
  },
  carrera: {
    que: 'Escolha o curso em que você se formou. Com isso, o app mostra primeiro os produtos da sua área no passo 2.',
    ejemplo:
      'Se você estudou Engenharia Multimídia, escolha Multimídia. Mesmo assim, você pode orçar produtos do outro curso se souber fazê-los.',
  },
  nombre: {
    que: 'O seu nome como você quer que apareça no orçamento que entrega ao cliente. É opcional.',
    ejemplo: 'Yerson Ariza',
  },
  ciudad: {
    que: 'A cidade onde você trabalha. Aparece no orçamento.',
    ejemplo: ({ ej }) => ej.ciudad,
  },
  contacto: {
    que: 'Um e-mail ou um número de telefone para o cliente responder. Aparece no orçamento. É opcional.',
    ejemplo: 'seuemail@gmail.com',
  },
  proyectosPrevios: {
    que: 'Quantos trabalhos parecidos com o que vai orçar você já fez, pagos ou da universidade. Mais experiência aumenta um pouco a sua tarifa: de ×0,95 (nenhum) a ×1,10 (6 ou mais).',
    ejemplo: 'Você vai orçar um logo e já fez 2 logos para amigos: escolha “1 ou 2 projetos”.',
  },
  portafolio: {
    que: 'Se você tem onde mostrar os seus trabalhos: Behance, GitHub, ArtStation, um site ou um Instagram de trabalhos. Um portfólio sólido justifica cobrar um pouco mais.',
    ejemplo: 'Você tem 3 projetos no Behance, mas quer melhorar o portfólio: escolha “Básico ou em construção”.',
  },
  formacion: {
    que: 'Se, além da graduação, você fez cursos ou tem uma certificação neste tipo específico de trabalho.',
    ejemplo: 'Você fez um curso de After Effects e vai orçar motion graphics: escolha “Cursos neste tema”.',
  },
  gastos: {
    que: 'O que você mesmo gasta por mês para viver. Não são despesas do projeto. Com isso, o app calcula quanto você precisa ganhar no mínimo. Coloque valores aproximados na sua moeda.',
    ejemplo: ({ f, ej }) =>
      `Moradia ${f.dinero(ej.gastos.vivienda)}, comida ${f.dinero(ej.gastos.alimentacion)}, transporte ${f.dinero(ej.gastos.transporte)} e outros ${f.dinero(ej.gastos.otros)}: no total, ${f.dinero(suma(ej.gastos))} por mês.`,
  },
  gastoVivienda: {
    que: 'Aluguel ou o que você contribui em casa, mais as contas: água, luz, gás. Se você mora com a família e não paga nada, coloque o que contribui ou 0.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.vivienda),
  },
  gastoAlimentacion: {
    que: 'Compras de supermercado, almoços e pedidos de comida do mês inteiro.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.alimentacion),
  },
  gastoTransporte: {
    que: 'Transporte público, combustível, táxis ou passagens do mês inteiro.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.transporte),
  },
  gastoOtros: {
    que: 'Plano de telefone, saúde, roupa, saídas e assinaturas pessoais como Netflix ou Spotify.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.otros),
  },
  ahorro: {
    que: 'Que porcentagem extra você quer guardar por mês para emergências ou para os meses sem clientes. Ela é somada às suas despesas.',
    ejemplo: ({ f, ej }) => `Com 10% e despesas de ${f.dinero(suma(ej.gastos))}, a sua meta mensal é ${f.dinero(suma(ej.gastos) * 1.1)}.`,
  },
  horasSemana: {
    que: 'Quantas horas por semana você trabalha no total como autônomo, contando tudo: projetos, mensagens, reuniões e estudo. Não só as horas deste projeto.',
    ejemplo: 'De segunda a sexta, das 8 às 17, com uma hora de almoço, são 40 h. Se você estuda e trabalha, talvez 20 h.',
  },
  porcentajeFacturable: {
    que: 'De todas essas horas, que porcentagem você acaba cobrando de um cliente. O resto vai para coisas que ninguém paga: procurar clientes, responder mensagens, fazer orçamentos, faturar, aprender e consertar o computador. No começo, o normal é entre 50% e 70%. Se não souber, deixe 60%.',
    ejemplo: 'Você trabalha 40 h por semana e 24 dessas horas são trabalho para clientes: 24 ÷ 40 = 60%.',
  },
  horasFacturablesMes: {
    que: 'As horas que você realmente cobra dos seus clientes em um mês. O cálculo é: horas por semana × 4,33 semanas por mês × a porcentagem que você cobra. As suas despesas do mês são divididas entre essas horas: se você cobra poucas horas, cada hora tem que valer mais.',
    ejemplo: '40 h × 4,33 × 60% = 103,9 horas cobradas por mês.',
  },
  negocio: {
    que: 'Quanto custa trabalhar por mês: internet, a luz que o computador gasta, programas e o desgaste do equipamento. Isso não é o seu ganho: é um custo que o preço também deve cobrir.',
    ejemplo: ({ f, ej }) =>
      `Internet ${f.dinero(ej.negocio.internet)}, energia ${f.dinero(ej.negocio.energia)}, software ${f.dinero(ej.negocio.software)}, outros ${f.dinero(ej.negocio.otros)} e um computador de ${f.dinero(ej.valorEquipo)} que dura 3 anos.`,
  },
  internet: {
    que: 'O que você paga de internet por mês. Se você divide com a família, coloque só a parte que usa para trabalhar.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.internet),
  },
  energia: {
    que: 'A parte da conta de luz que o seu computador gasta enquanto você trabalha. Um computador potente ligado 8 horas por dia gasta uns 50 a 60 kWh por mês: multiplique isso pelo preço do kWh da sua conta.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.energia),
  },
  software: {
    que: 'Programas e serviços que você paga para trabalhar: Adobe, Autodesk, Figma, hospedagem de testes, plugins ou fontes. Se você só usa programas gratuitos como Blender, Godot ou VS Code, coloque 0.',
    ejemplo: ({ f }) => `Se você paga Adobe Creative Cloud e Figma, coloque o total que os dois cobram por mês. Só programas gratuitos: ${f.dinero(0)}.`,
  },
  otrosNegocio: {
    que: 'Outras despesas para trabalhar: plano de telefone para clientes, coworking, publicidade ou cursos.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.otros),
  },
  valorEquipo: {
    que: 'Quanto custou, ou quanto custa hoje, o seu computador com monitor e acessórios. O app divide esse valor pelos meses que ele dura, porque o equipamento se desgasta e um dia você vai precisar trocá-lo.',
    ejemplo: ({ f, ej }) => f.dinero(ej.valorEquipo),
  },
  vidaUtil: {
    que: 'Quantos anos você acha que o computador vai durar antes de trocá-lo. O normal é entre 3 e 5 anos.',
    ejemplo: '3',
  },
  tarifaMinima: {
    que: 'O mínimo que você tem que ganhar por cada hora que cobra de um cliente para pagar os seus gastos de vida e a sua poupança. Se cobrar menos, você perde dinheiro.',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.dinero(r.tarifas.necesidadMensual)} necessários por mês ÷ ${f.horas(r.tarifas.horasMes)} que você cobra = ${f.dinero(r.tarifas.minima)} por hora.`,
  },
  costoOperativo: {
    que: 'Quanto custa trabalhar por cada hora cobrada: internet, luz, software e desgaste do computador. É somado ao preço, à parte do que você ganha.',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.dinero(r.tarifas.gastosNegocio.total)} de despesas de trabalho por mês ÷ ${f.horas(r.tarifas.horasMes)} = ${f.dinero(r.tarifas.costoOperativoHora)} por hora.`,
  },

  // ── Passo 2: produto ────────────────────────────────────────────
  buscarProducto: {
    que: 'Primeiro escolha o curso e, se quiser, um grupo. Você também pode escrever uma palavra para buscar.',
    ejemplo: 'Escreva “logo”, “app”, “banco de dados” ou “animação”.',
  },
  producto: {
    que: 'O trabalho que o cliente pediu. Se não houver um igual, escolha o mais parecido e ajuste as horas no passo 3. Se o cliente pedir várias coisas, faça um orçamento para cada uma e depois junte os valores.',
    ejemplo: 'Pedem um logo e 10 posts: orce “Logotipo” e depois “Peças para redes sociais”.',
  },
  unidades: {
    que: 'O tamanho do trabalho. Cada produto é medido com uma unidade diferente: telas, segundos, páginas, propostas, tabelas... Coloque quantas unidades você vai entregar.',
    ejemplo:
      'Logotipo: quantas propostas iniciais você mostra ao cliente (o normal são 3). Animação: quantos segundos o vídeo dura.',
  },
  complejidad: {
    que: 'O quanto o trabalho é difícil. Básico: simples, e o cliente já tem tudo claro. Intermediário: o normal, com alguma personalização. Avançado: muitos detalhes, efeitos ou integrações difíceis, ou um cliente que muda de ideia com frequência.',
    ejemplo:
      'Logo só com letras: básico. Logo com um ícone próprio: intermediário. Logo com mascote e muitas variações: avançado.',
  },
  horasCatalogo: {
    que: 'As horas que este trabalho normalmente leva para alguém com domínio médio. Saem de: horas base do produto (ajustadas pela complexidade) + quantidade × horas por unidade. Você pode mudá-las no passo 3.',
    ejemplo: 'Logotipo intermediário com 3 propostas: 4 h de base + 3 × 5 h = 19 h.',
  },

  // ── Passo 3: horas, tarifa e domínio ────────────────────────────
  horasEstimadas: {
    que: 'Quantas horas você acha que vai levar para fazer o trabalho. Não conte reuniões, alterações do cliente nem imprevistos: o app soma isso. Se não souber, deixe as horas sugeridas pelo catálogo.',
    ejemplo: 'Um logotipo com 3 propostas: umas 19 horas.',
  },
  tarifaDeseada: {
    que: 'Quanto você mesmo quer ganhar por cada hora de trabalho, líquido para você. O app ajusta esse valor conforme o seu domínio e a sua experiência e depois soma os seus custos de trabalho, o lucro e a previdência social. Deve ser maior que a sua tarifa mínima. Se não souber, use a sugerida.',
    ejemplo: ({ f, p }) => {
      const mensual = redondo(p.smmlv * 1.7);
      return `Você quer ganhar ${f.dinero(mensual)} por mês e cobra 103,9 horas por mês: ${f.dinero(mensual)} ÷ 103,9 ≈ ${f.dinero(redondo(mensual / HORAS_EJEMPLO))} por hora.`;
    },
  },
  especialidad: {
    que: 'O quanto você sabe fazer este tipo específico de trabalho, de 0 a 100%. 0 a 20%: você está aprendendo e precisa de tutoriais o tempo todo. 21 a 40%: você fez poucas vezes. 41 a 60%: você faz bem, com algumas consultas. 61 a 80%: você faz rápido e bem. 81 a 100%: você poderia ensinar.',
    ejemplo: 'Você sabe Blender, mas nunca fez um rigging: para orçar um rigging, coloque 25%.',
    nota: 'Mais domínio aumenta o valor da sua hora (de ×0,70 a ×1,30). Menos domínio soma horas de imprevistos e mostra quantas horas de aprendizado você não vai poder cobrar.',
  },
  revisiones: {
    que: 'Quantas vezes o cliente pode pedir alterações sem pagar mais. Cada rodada soma 6% das horas estimadas (no mínimo 1 h). O normal são 2. Alterações adicionais são cobradas à parte.',
    ejemplo: '2 rodadas: você mostra o trabalho, o cliente pede ajustes, você faz; e o mesmo uma segunda vez.',
  },
  horasDia: {
    que: 'Quantas horas por dia você pode dedicar a este projeto específico. Serve para calcular a data de entrega.',
    ejemplo: 'Se você estuda de manhã e trabalha à tarde, talvez 4 h.',
  },
  fechaInicio: {
    que: ({ pais, idioma }) =>
      `O dia em que você começaria a trabalhar, normalmente quando recebe a entrada. A entrega é contada em dias úteis: sem fins de semana nem feriados do seu país (${pais.nombres[idioma] ?? pais.nombres.es}).`,
    ejemplo: 'Se o cliente pagar na segunda-feira, coloque essa segunda-feira.',
  },
  horasACobrar: {
    que: 'As horas que você vai cobrar neste projeto: as suas horas estimadas mais os imprevistos, as rodadas de revisão e 10% de gestão (reuniões, mensagens e entregas).',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.horas(r.horas.estimadas)} estimadas + ${f.horas(r.horas.horasImprevistos)} de imprevistos + ${f.horas(r.horas.horasRevisiones)} de revisões + ${f.horas(r.horas.horasGestion)} de gestão = ${f.horas(r.horas.facturables)}.`,
  },
  tarifaAjustada: {
    que: 'O que vale a sua hora neste projeto: a sua tarifa desejada multiplicada pelos fatores do seu perfil (domínio, experiência, portfólio e formação).',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.dinero(r.tarifas.deseada)} ${f.factor(r.tarifas.factores.total)} = ${f.dinero(r.tarifas.ajustada)} por hora.`,
  },
  urgencia: {
    que: 'O quanto o cliente tem pressa. Normal: prazos habituais. Prioritária: ele quer antes e você trabalha mais horas por dia (+20%). Urgente: é preciso trabalhar à noite ou nos fins de semana (+45%).',
    ejemplo: 'Pedem para depois de amanhã: urgente.',
  },

  // ── Passo 4: cliente e condições ────────────────────────────────
  clienteNombre: {
    que: 'Nome da pessoa ou da empresa que contrata você. Aparece no orçamento.',
    ejemplo: 'Café La Esquina',
  },
  tipoCliente: {
    que: 'Quem paga. Uma empresa grande pode pagar mais (+25%) e uma pessoa física, menos (−10%). Também define se vão descontar retenção na fonte do seu pagamento.',
    ejemplo: 'Uma loja de bairro: empreendimento. Uma prefeitura: órgão público.',
  },
  mercado: {
    que: 'Onde está o cliente. Local ou regional: −5%. Nacional: sem ajuste. Internacional: +50%, e é recomendável cobrar em dólares ou euros.',
    ejemplo: ({ ej }) => `Se você trabalha em ${ej.ciudad} e o cliente é de outra cidade do seu país: nacional.`,
  },
  derechos: {
    que: 'O que o cliente pode fazer com o seu trabalho. Licença de uso: ele usa para o combinado e você pode mostrar no seu portfólio. Uso comercial amplo: ele pode usar em publicidade ou em produtos que vende (+15%). Cessão total: o trabalho passa a ser do cliente, com os arquivos-fonte ou o código (+40%).',
    ejemplo:
      'Um logo para um negócio pequeno: licença de uso. Um personagem que a empresa quer estampar em camisetas: uso comercial amplo.',
  },
  costosDirectos: {
    que: 'O que você paga a outras pessoas ou empresas só para este projeto: domínio, hospedagem, fotos de banco de imagens, música, materiais ou impressão. Marque os que se aplicam e adicione os que faltarem. São cobrados pelo custo, sem lucro.',
    ejemplo: 'Um domínio por um ano ou a conta de desenvolvedor do Google Play (25 dólares).',
  },
  costoConcepto: {
    que: 'O que você vai pagar. Escreva de forma curta para reconhecer no orçamento.',
    ejemplo: 'Domínio, modelo pago ou fonte tipográfica.',
  },
  costoValor: {
    que: 'Quanto custa. Escreva só o número: o app coloca os separadores de milhar.',
    ejemplo: ({ f, p }) => {
      const valor = redondo(p.trm * 25);
      return `Escreva ${valor} e aparece como ${f.dinero(valor)}.`;
    },
  },
  costoMoneda: {
    que: 'Escolha dólares se você paga em um site estrangeiro. O app converte para a sua moeda com o câmbio que está em “Como calculamos”.',
    ejemplo: 'A conta de desenvolvedor do Google Play custa 25 dólares.',
  },
  margen: {
    que: 'O lucro do negócio, à parte do que você ganha por hora. Serve para os meses sem clientes, para trocar o equipamento e para pagar cursos. O normal é entre 10% e 20%.',
    ejemplo: '10%',
  },
  imprevistos: {
    que: 'Horas extras caso algo dê errado: um arquivo que se corrompe, uma ideia que não funciona, uma alteração que você não esperava. No modo automático, elas são calculadas conforme a complexidade e o seu domínio. Se você desativar, coloca a sua própria porcentagem.',
    ejemplo: 'Intermediário com 50% de domínio: 20% de horas extras.',
  },
  imprevistosManual: {
    que: 'A porcentagem de horas extras que você quer somar por imprevistos, sobre as suas horas estimadas.',
    ejemplo: 'Com 15% e 20 horas estimadas, somam-se 3 horas.',
  },
  seguridadSocial: {
    que: (ctx) => {
      const { f, p, pais } = ctx;
      const total = tasaSeguridadSocial(p);
      const regimen = regimenDePais(pais.id);
      const base = enColombia(ctx)
        ? 'Como autônomo na Colômbia, você mesmo paga saúde, previdência e riscos de trabalho sobre 40% do que cobra'
        : `No seu país (${nombrePais(ctx)}), como autônomo, você paga as suas próprias contribuições à previdência social${regimen ? ` (${regimen})` : ''}`;
      return `${base}: no total, cerca de ${f.porcentaje(total, 1)} da sua renda. Deixe ativado para que o preço cubra isso e não saia do seu ganho.`;
    },
    ejemplo: ({ f, p }) => {
      const cobro = redondo(p.smmlv * 0.6);
      const total = tasaSeguridadSocial(p);
      return `Se você cobrar ${f.dinero(cobro)}, paga cerca de ${f.dinero(cobro * total)} de previdência social.`;
    },
    nota: (ctx) => notaDePais(ctx.pais.id, 'aportes', ctx.idioma),
  },
  iva: {
    que: (ctx) =>
      enColombia(ctx)
        ? 'Ative só se, no seu RUT (o cadastro tributário da Colômbia), você aparecer como responsável pelo IVA, o imposto sobre a venda colombiano. Isso acontece se você faturar mais de 3.500 UVT (unidades tributárias colombianas) por ano, cerca de COP 183 milhões, ou se você se inscreveu assim. Quase nenhum recém-formado está nessa situação.'
        : ctx.p.ivaPorDefecto
          ? `No seu país (${nombrePais(ctx)}), o normal é que um autônomo cobre ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) nas faturas; por isso, vem ativado. Desative só se você estiver isento ou em um regime em que ele não é cobrado.`
          : `Ative só se você for obrigado a cobrar ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) no seu país (${nombrePais(ctx)}). Muitos autônomos que estão começando não o cobram.`,
    ejemplo: (ctx) => (ctx.p.ivaPorDefecto ? 'Se não souber, deixe como está e confirme com um contador.' : 'Se não souber, deixe desativado.'),
    nota: (ctx) => notaDePais(ctx.pais.id, 'iva', ctx.idioma),
  },
  retencion: {
    que: 'Quando uma empresa paga você, ela pode descontar uma porcentagem como antecipação do seu imposto de renda. No modo automático, o app escolhe conforme o cliente, o produto e o seu país. Se o cliente informar outra, mude aqui.',
    ejemplo: (ctx) =>
      enColombia(ctx)
        ? 'Uma pequena empresa paga você por um logo: honorários, 10%. Se quem paga é uma pessoa física, não se aplica.'
        : 'Se quem paga é uma empresa do país, aplica-se a retenção geral; se é uma pessoa ou um cliente do exterior, normalmente não se aplica.',
    nota: (ctx) => notaDePais(ctx.pais.id, 'retencion', ctx.idioma),
  },
  compensarRetencion: {
    que: 'Se você ativar, o preço sobe um pouco para que, depois do desconto da retenção, chegue até você o valor que calculou.',
    ejemplo: ({ f, p }) => {
      const precio = redondo(p.smmlv * 0.6);
      return `Preço de ${f.dinero(precio)} com 10% de retenção: sobe para cerca de ${f.dinero(precio / 0.9)} e, depois do desconto, depositam ${f.dinero(precio)} na sua conta.`;
    },
  },
  gmf: {
    // O nome vai no final: alguns países guardam uma descrição em minúscula em vez de um nome próprio.
    que: ({ p, f }) =>
      `Quando você saca ou transfere dinheiro, o banco cobra um imposto de ${f.porcentaje(p.gmf, 2)}: ${p.gmfNombre ?? 'o imposto sobre movimentações financeiras'}. Ative se a sua conta não for isenta.`,
    ejemplo: ({ f, p }) => {
      const monto = redondo(p.smmlv * 0.6);
      return `Sacar ${f.dinero(monto)} custa ${f.dinero(monto * p.gmf)}.`;
    },
  },
  esquemaPago: {
    que: 'Quando o cliente paga você. Peça sempre uma entrada: assim você não trabalha de graça se o cliente desistir. O mais comum é 50% no início e 50% na entrega.',
    ejemplo: 'Projeto longo: 40% no início, 30% ao apresentar uma etapa e 30% na entrega.',
  },
  vigencia: {
    que: 'Por quantos dias o preço do orçamento é válido. Depois dessa data, você pode atualizá-lo.',
    ejemplo: '15 dias',
  },
  alcance: {
    que: 'Escreva o que o trabalho inclui e o que não inclui, para evitar mal-entendidos com o cliente. Aparece no orçamento.',
    ejemplo: 'Inclui 3 propostas de logo e 2 rodadas de alterações. Não inclui impressão nem manual de marca.',
  },
  ajusteCondiciones: {
    que: 'Todos os ajustes deste passo e a urgência, multiplicados: tipo de cliente × mercado × direitos × urgência. Se der mais de 1, o preço sobe; se der menos, baixa.',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.factor(r.multiplicadores.cliente)} × ${f.factor(r.multiplicadores.mercado)} × ${f.factor(r.multiplicadores.derechos)} × ${f.factor(r.multiplicadores.urgencia)} = ${f.factor(r.multiplicadores.total)}.`,
  },
  consignado: {
    que: 'O que realmente chega à sua conta: o preço menos a retenção na fonte que o cliente desconta.',
    ejemplo: ({ f, r }) =>
      `Com os seus dados: ${f.dinero(r.precio.total)} − ${f.dinero(r.neto.retencion)} de retenção = ${f.dinero(r.neto.consignado)}.`,
  },

  // ── Resultado ───────────────────────────────────────────────────
  precioSugerido: {
    que: ({ p }) =>
      `O que você cobra do cliente, sem ${p.ivaNombre ?? 'IVA'}. Já inclui o seu trabalho, os seus custos, o lucro e a previdência social.`,
    ejemplo: 'É o valor que você coloca no orçamento.',
  },
  piso: {
    que: 'O preço mais baixo que você pode aceitar sem perder dinheiro: cobre os seus gastos de vida, os seus custos e as suas contribuições, mas sem lucro extra.',
    ejemplo: 'Se o cliente oferecer menos que isso, é melhor não aceitar ou reduzir o que você entrega.',
  },
  paraNegociar: {
    que: '15% a mais que o preço sugerido. Comece a conversa com este valor: se o cliente pedir desconto, você pode baixar até o sugerido sem perder.',
    ejemplo: ({ f, r }) => `Sugerido ${f.dinero(r.precio.sinIva)}: comece com ${f.dinero(r.rango.apertura)}.`,
  },
  salud: {
    que: 'Verifica 7 boas práticas, como pedir entrada ou não ficar abaixo do mercado. Cada uma soma pontos: 100 é um orçamento saudável.',
    ejemplo: 'As que têm um X vermelho são as que você deve melhorar.',
  },
  recomendaciones: {
    que: 'Dicas conforme os seus dados. Os alertas são o mais importante: leia-os antes de enviar o orçamento.',
    ejemplo: 'Se ele disser que você não cobre o seu mínimo, aumente a tarifa ou reduza o escopo.',
  },
  desglose: {
    que: 'De onde sai cada parte do preço. A barra mostra que parte do total é cada coisa, e a tabela diz como foi calculado.',
    ejemplo: 'Seu trabalho = horas a cobrar × sua tarifa ajustada.',
  },
  neto: {
    que: 'De tudo o que o cliente paga, o que realmente chega ao seu bolso depois da retenção, dos impostos, da previdência social e dos custos.',
    ejemplo: ({ f, r }) => `Com os seus dados: você recebe ${f.dinero(r.precio.total)} e fica com cerca de ${f.dinero(r.neto.ganancia)}.`,
  },
  mercadoResultado: {
    que: (ctx) =>
      `Quanto outros cobrariam pelo mesmo trabalho no seu país (${nombrePais(ctx)}), conforme a experiência de cada um. Um recém-formado normalmente fica na faixa júnior.`,
    ejemplo: 'Se você ficar abaixo da faixa júnior, está cobrando muito pouco.',
  },
  curva: {
    que: 'Como mudaria o preço deste mesmo projeto se você soubesse mais ou menos do assunto. Passe o mouse ou toque no gráfico para ver cada valor.',
    ejemplo: 'Mostra por que se capacitar permite cobrar mais.',
  },
  nivelesResultado: {
    que: 'O mesmo produto e a mesma quantidade nos três níveis de complexidade, com as horas do catálogo.',
    ejemplo: 'Serve para oferecer ao cliente uma opção mais simples se o preço não couber no orçamento dele.',
  },
  horasResultado: {
    que: 'As horas que você cobra comparadas com as que provavelmente vai trabalhar. Se você domina pouco o assunto, vai trabalhar mais horas do que cobra.',
    ejemplo: 'Essa diferença é o seu investimento em aprender.',
  },
  entrega: {
    que: (ctx) =>
      `A data aproximada em que você terminaria, contando só dias úteis: sem sábados, domingos nem feriados do seu país (${nombrePais(ctx)}).`,
    ejemplo: 'Muda conforme as horas por dia que você dedicar.',
  },
  pagos: {
    que: 'Quanto o cliente paga em cada momento, conforme a forma de pagamento que você escolheu no passo 4.',
    ejemplo: '50% de entrada e 50% na entrega.',
  },

  // ── Dados do país (página "Como calculamos") ────────────────────
  smmlv: {
    que: (ctx) =>
      `O salário mínimo mensal do seu país (${nombrePais(ctx)}). Serve para comparar o preço e, onde se aplica, para calcular a contribuição mínima à previdência social. Mude-o se sair um novo decreto.`,
    ejemplo: ({ f, p }) => `${f.dinero(p.smmlv)} em ${p.anio}.`,
  },
  uvt: {
    que: 'A Unidade de Valor Tributário (UVT) da DIAN, a autoridade tributária da Colômbia (só Colômbia). Com ela são calculados os limites dos impostos, como o limite a partir do qual você deve cobrar IVA (3.500 UVT por ano).',
    ejemplo: 'COP 52.374 em 2026 (Resolução DIAN 000238 de 2025).',
  },
  trm: {
    que: ({ f }) =>
      `Quantas unidades da sua moeda (${f.codigo}) vale um dólar. Serve para converter para a sua moeda os custos em dólares e para mostrar o preço em dólares. Com internet, ele se atualiza sozinho com o valor do dia; se você o alterar à mão, o app mantém o seu valor.`,
    ejemplo: ({ f, p }) => `Hoje o app usa ${f.dinero(p.trm)} por dólar.`,
  },
  ivaTarifa: {
    que: ({ p }) =>
      `A alíquota geral do imposto sobre a venda (${p.ivaNombre ?? 'IVA'}). Só é somada ao preço se, no passo 4, você disser que deve cobrá-lo.`,
    ejemplo: ({ f, p }) => f.porcentaje(p.iva),
  },
  ibc: {
    que: 'Sobre que parte da sua renda são calculadas as suas contribuições como autônomo (na Colômbia, 40%). Em outros países, o app usa a base que resume o regime de cada um.',
    ejemplo: ({ f, p }) => f.porcentaje(p.ibcIndependiente),
  },
  saludTarifa: {
    que: 'O que você contribui para a saúde sobre essa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.salud, 2),
  },
  pensionTarifa: {
    que: 'O que você contribui para a previdência ou aposentadoria sobre essa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.pension, 2),
  },
  arlTarifa: {
    que: 'Riscos de trabalho e outras contribuições do regime (por exemplo, desemprego ou formação profissional), sobre essa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.arl, 3),
  },
};
