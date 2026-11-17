/**
 * Explicaciones del botón "!": qué poner (o qué significa) y un ejemplo.
 * Las partes que dependen del país o de tus datos son funciones que reciben:
 *   f (formato de la moneda), ej (valores de ejemplo del país), p (parámetros del país),
 *   r (resultado actual), estado, pais (nombre y moneda) e idioma.
 */
import { tasaSeguridadSocial } from '../../../logica/impuestos.js';
import { notaDePais, regimenDePais } from '../../../logica/paises.js';

const suma = (o) => Object.values(o ?? {}).reduce((s, v) => s + (Number(v) || 0), 0);
const HORAS_EJEMPLO = 40 * 4.33 * 0.6; // 103,9 horas que se cobran al mes
/** Redondea a dos cifras significativas para que el ejemplo se lea fácil. */
const redondo = (v) => {
  if (!v) return 0;
  const potencia = 10 ** (Math.floor(Math.log10(Math.abs(v))) - 1);
  return Math.round(v / potencia) * potencia;
};
const nombrePais = ({ pais, idioma }) => pais.nombres[idioma] ?? pais.nombres.es;
const enColombia = ({ pais }) => pais.id === 'CO';

export default {
  // ── Paso 1: tu perfil ───────────────────────────────────────────
  pais: {
    que: 'El país donde trabajas y donde vive tu cliente. Cambia la moneda, el salario mínimo, los impuestos, los aportes a seguridad social, los festivos y las tarifas del mercado.',
    ejemplo: 'Si vives en Lima y le cobras a una empresa peruana, elige Perú: todo se calcula en soles.',
    nota: 'Al cambiar de país, tus gastos y costos vuelven a los valores de ejemplo de ese país, en su moneda. Revísalos.',
  },
  carrera: {
    que: 'Elige la carrera en la que te graduaste. Con esto la app te muestra primero los productos de tu área en el paso 2.',
    ejemplo:
      'Si estudiaste Ingeniería en Multimedia, elige Multimedia. Igual puedes cotizar productos de la otra carrera si los sabes hacer.',
  },
  nombre: {
    que: 'Tu nombre tal como quieres que aparezca en la cotización que le entregas al cliente. Es opcional.',
    ejemplo: 'Yerson Ariza',
  },
  ciudad: {
    que: 'La ciudad donde trabajas. Sale en la cotización.',
    ejemplo: ({ ej }) => ej.ciudad,
  },
  contacto: {
    que: 'Un correo o un número de celular para que el cliente te responda. Sale en la cotización. Es opcional.',
    ejemplo: 'tucorreo@gmail.com',
  },
  proyectosPrevios: {
    que: ({ f }) =>
      `Cuántos trabajos parecidos al que vas a cotizar ya hiciste, pagados o de la universidad. Más experiencia sube un poco tu tarifa: de ${f.factor(0.95)} (ninguno) a ${f.factor(1.1)} (6 o más).`,
    ejemplo: 'Vas a cotizar un logo y ya hiciste 2 logos para amigos: elige "1 o 2 proyectos".',
  },
  portafolio: {
    que: 'Si tienes dónde mostrar tus trabajos: Behance, GitHub, ArtStation, una página web o un Instagram de trabajos. Un portafolio sólido justifica cobrar un poco más.',
    ejemplo: 'Tienes 3 proyectos en Behance pero quieres mejorarlo: elige "Básico o en construcción".',
  },
  formacion: {
    que: 'Si además de la carrera hiciste cursos o tienes una certificación en ESTE tipo de trabajo.',
    ejemplo: 'Hiciste un curso de After Effects y vas a cotizar motion graphics: elige "Cursos en este tema".',
  },
  gastos: {
    que: 'Lo que gastas TÚ cada mes para vivir. No son gastos del proyecto. Con esto la app calcula cuánto necesitas ganar como mínimo. Pon valores aproximados en tu moneda.',
    ejemplo: ({ f, ej }) =>
      `Vivienda ${f.dinero(ej.gastos.vivienda)}, comida ${f.dinero(ej.gastos.alimentacion)}, transporte ${f.dinero(ej.gastos.transporte)} y otros ${f.dinero(ej.gastos.otros)}: en total ${f.dinero(suma(ej.gastos))} al mes.`,
  },
  gastoVivienda: {
    que: 'Arriendo o lo que aportas en tu casa, más servicios: agua, luz, gas. Si vives con tu familia y no pagas nada, pon lo que aportas o 0.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.vivienda),
  },
  gastoAlimentacion: {
    que: 'Mercado, almuerzos y domicilios de todo el mes.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.alimentacion),
  },
  gastoTransporte: {
    que: 'Buses, metro, gasolina, taxis o pasajes de todo el mes.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.transporte),
  },
  gastoOtros: {
    que: 'Plan de celular, salud, ropa, salidas y suscripciones personales como Netflix o Spotify.',
    ejemplo: ({ f, ej }) => f.dinero(ej.gastos.otros),
  },
  ahorro: {
    que: 'Qué porcentaje extra quieres guardar cada mes para emergencias o para los meses sin clientes. Se suma a tus gastos.',
    ejemplo: ({ f, ej }) => `Con 10 % y gastos de ${f.dinero(suma(ej.gastos))}, tu meta mensual es ${f.dinero(suma(ej.gastos) * 1.1)}.`,
  },
  horasSemana: {
    que: 'Cuántas horas a la semana trabajas en total como independiente, contando todo: proyectos, mensajes, reuniones y aprender. No solo las de este proyecto.',
    ejemplo: 'De lunes a viernes de 8 a 5 con una hora de almuerzo son 40 h. Si estudias y trabajas, quizá 20 h.',
  },
  porcentajeFacturable: {
    que: 'De todas esas horas, qué porcentaje le terminas cobrando a un cliente. El resto se va en cosas que nadie te paga: buscar clientes, responder mensajes, hacer cotizaciones, facturar, aprender y arreglar el computador. Al empezar, lo normal es entre 50 % y 70 %. Si no sabes, deja 60 %.',
    ejemplo: 'Trabajas 40 h a la semana y 24 de esas horas son trabajo para clientes: 24 ÷ 40 = 60 %.',
  },
  horasFacturablesMes: {
    que: ({ f }) =>
      `Las horas que de verdad le cobras a tus clientes en un mes. Se calcula así: horas a la semana × ${f.numero(4.33, 2)} semanas que tiene un mes × el porcentaje que cobras. Tus gastos del mes se reparten entre estas horas: si cobras pocas horas, cada hora tiene que valer más.`,
    ejemplo: ({ f }) => `40 h × ${f.numero(4.33, 2)} × ${f.porcentaje(0.6)} = ${f.numero(HORAS_EJEMPLO, 1)} horas que cobras al mes.`,
  },
  negocio: {
    que: 'Lo que te cuesta trabajar cada mes: internet, luz del computador, programas y el desgaste del equipo. Esto no es tu ganancia: es un costo que el precio también debe cubrir.',
    ejemplo: ({ f, ej }) =>
      `Internet ${f.dinero(ej.negocio.internet)}, energía ${f.dinero(ej.negocio.energia)}, software ${f.dinero(ej.negocio.software)}, otros ${f.dinero(ej.negocio.otros)} y un computador de ${f.dinero(ej.valorEquipo)} que dura 3 años.`,
  },
  internet: {
    que: 'Lo que pagas de internet al mes. Si lo compartes con tu familia, pon solo la parte que usas para trabajar.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.internet),
  },
  energia: {
    que: 'La parte de la factura de luz que gasta tu computador trabajando. Un computador potente encendido 8 horas al día gasta unos 50 a 60 kWh al mes: multiplícalo por el precio del kWh de tu factura.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.energia),
  },
  software: {
    que: 'Programas y servicios que pagas para trabajar: Adobe, Autodesk, Figma, hosting de pruebas, plugins o fuentes. Si solo usas programas gratis como Blender, Godot o VS Code, pon 0.',
    ejemplo: ({ f }) => `Si pagas Adobe Creative Cloud y Figma, suma lo que te cobran al mes por los dos. Solo programas gratis: ${f.dinero(0)}.`,
  },
  otrosNegocio: {
    que: 'Otros gastos para trabajar: plan de celular para clientes, coworking, publicidad o cursos.',
    ejemplo: ({ f, ej }) => f.dinero(ej.negocio.otros),
  },
  valorEquipo: {
    que: 'Cuánto costó, o cuánto cuesta hoy, tu computador con monitor y accesorios. La app reparte ese valor entre los meses que te dura, porque el equipo se desgasta y algún día tendrás que cambiarlo.',
    ejemplo: ({ f, ej }) => f.dinero(ej.valorEquipo),
  },
  vidaUtil: {
    que: 'Cuántos años crees que te va a servir el computador antes de cambiarlo. Lo normal es entre 3 y 5 años.',
    ejemplo: '3',
  },
  tarifaMinima: {
    que: 'Lo mínimo que tienes que ganar por cada hora que le cobras a un cliente para pagar tus gastos de vida y tu ahorro. Si cobras menos, pierdes plata.',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.dinero(r.tarifas.necesidadMensual)} que necesitas al mes ÷ ${f.horas(r.tarifas.horasMes)} que cobras = ${f.dinero(r.tarifas.minima)} por hora.`,
  },
  costoOperativo: {
    que: 'Lo que te cuesta trabajar por cada hora cobrada: internet, luz, software y desgaste del computador. Se suma al precio aparte de lo que ganas tú.',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.dinero(r.tarifas.gastosNegocio.total)} de gastos de trabajo al mes ÷ ${f.horas(r.tarifas.horasMes)} = ${f.dinero(r.tarifas.costoOperativoHora)} por hora.`,
  },

  // ── Paso 2: producto ────────────────────────────────────────────
  buscarProducto: {
    que: 'Primero elige la carrera y, si quieres, un grupo. También puedes escribir una palabra para buscar.',
    ejemplo: 'Escribe "logo", "app", "base de datos" o "animación".',
  },
  producto: {
    que: 'El trabajo que te pidió el cliente. Si no está exacto, elige el más parecido y ajusta las horas en el paso 3. Si el cliente pide varias cosas, haz una cotización por cada una y súmalas.',
    ejemplo: 'Te piden un logo y 10 posts: cotiza "Logotipo" y luego "Piezas para redes sociales".',
  },
  unidades: {
    que: 'El tamaño del trabajo. Cada producto se mide con una unidad distinta: pantallas, segundos, páginas, propuestas, tablas... Pon cuántas vas a entregar.',
    ejemplo:
      'Logotipo: cuántas propuestas iniciales le muestras al cliente (lo normal son 3). Animación: cuántos segundos dura el video.',
  },
  complejidad: {
    que: 'Qué tan difícil es el trabajo. Básico: sencillo y el cliente ya tiene todo claro. Intermedio: lo normal, con algo de personalización. Avanzado: mucho detalle, efectos o integraciones difíciles, o un cliente que cambia de idea seguido.',
    ejemplo:
      'Logo solo con letras: básico. Logo con un ícono propio: intermedio. Logo con mascota y muchas variaciones: avanzado.',
  },
  horasCatalogo: {
    que: 'Las horas que normalmente toma este trabajo para alguien que lo domina a nivel medio. Salen de: horas base del producto (ajustadas por la complejidad) + cantidad × horas por cada unidad. Las puedes cambiar en el paso 3.',
    ejemplo: 'Logotipo intermedio con 3 propuestas: 4 h base + 3 × 5 h = 19 h.',
  },

  // ── Paso 3: horas, tarifa y dominio ─────────────────────────────
  horasEstimadas: {
    que: 'Cuántas horas crees que te tomará hacer el trabajo. No cuentes reuniones, cambios del cliente ni imprevistos: esos los suma la app. Si no sabes, deja las sugeridas por el catálogo.',
    ejemplo: 'Un logotipo con 3 propuestas: unas 19 horas.',
  },
  tarifaDeseada: {
    que: 'Cuánto quieres ganar TÚ por cada hora de trabajo, limpio para ti. La app la ajusta según tu dominio y tu experiencia, y después le suma tus costos de trabajo, la utilidad y la seguridad social. Debe ser mayor que tu tarifa mínima. Si no sabes, usa la sugerida.',
    ejemplo: ({ f, p }) => {
      const mensual = redondo(p.smmlv * 1.7);
      const horas = f.numero(HORAS_EJEMPLO, 1);
      return `Quieres ganar ${f.dinero(mensual)} al mes y cobras ${horas} horas al mes: ${f.dinero(mensual)} ÷ ${horas} ≈ ${f.dinero(redondo(mensual / HORAS_EJEMPLO))} por hora.`;
    },
  },
  especialidad: {
    que: 'Qué tanto sabes hacer ESTE tipo de trabajo, de 0 a 100 %. 0 a 20 %: lo estás aprendiendo y necesitas tutoriales a cada rato. 21 a 40 %: lo has hecho pocas veces. 41 a 60 %: lo haces bien con algunas consultas. 61 a 80 %: lo haces rápido y bien. 81 a 100 %: podrías enseñarlo.',
    ejemplo: 'Sabes Blender pero nunca has hecho un rigging: para cotizar un rigging pon 25 %.',
    nota: ({ f }) =>
      `Más dominio sube el valor de tu hora (de ${f.factor(0.7)} a ${f.factor(1.3)}). Menos dominio suma horas de imprevistos y te muestra cuántas horas de aprendizaje no podrás cobrar.`,
  },
  revisiones: {
    que: 'Cuántas veces el cliente puede pedir cambios sin pagar más. Cada ronda suma el 6 % de las horas estimadas (mínimo 1 h). Lo normal son 2. Los cambios adicionales se cobran aparte.',
    ejemplo: '2 rondas: le muestras el trabajo, te pide ajustes, los haces; y una segunda vez.',
  },
  horasDia: {
    que: 'Cuántas horas al día le puedes dedicar a ESTE proyecto. Sirve para calcular la fecha de entrega.',
    ejemplo: 'Si estudias en la mañana y trabajas en la tarde, quizá 4 h.',
  },
  fechaInicio: {
    que: ({ pais, idioma }) =>
      `El día en que empezarías a trabajar, normalmente cuando te pagan el anticipo. La entrega se cuenta en días hábiles: sin fines de semana ni festivos de ${pais.nombres[idioma] ?? pais.nombres.es}.`,
    ejemplo: 'Si el cliente paga el lunes, pon ese lunes.',
  },
  horasACobrar: {
    que: 'Las horas que vas a cobrar en este proyecto: tus horas estimadas más los imprevistos, las rondas de revisión y un 10 % de gestión (reuniones, mensajes y entregas).',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.horas(r.horas.estimadas)} estimadas + ${f.horas(r.horas.horasImprevistos)} de imprevistos + ${f.horas(r.horas.horasRevisiones)} de revisiones + ${f.horas(r.horas.horasGestion)} de gestión = ${f.horas(r.horas.facturables)}.`,
  },
  tarifaAjustada: {
    que: 'Lo que vale tu hora en este proyecto: tu tarifa deseada multiplicada por los factores de tu perfil (dominio, experiencia, portafolio y formación).',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.dinero(r.tarifas.deseada)} ${f.factor(r.tarifas.factores.total)} = ${f.dinero(r.tarifas.ajustada)} por hora.`,
  },
  urgencia: {
    que: 'Qué tan rápido lo necesita el cliente. Normal: tiempos habituales. Prioritaria: lo quiere antes y trabajas más horas al día (+20 %). Urgente: toca trabajar noches o fines de semana (+45 %).',
    ejemplo: 'Te lo piden para pasado mañana: urgente.',
  },

  // ── Paso 4: cliente y condiciones ───────────────────────────────
  clienteNombre: {
    que: 'Nombre de la persona o empresa que te contrata. Sale en la cotización.',
    ejemplo: 'Café La Esquina',
  },
  tipoCliente: {
    que: 'Quién paga. Una empresa grande puede pagar más (+25 %) y una persona natural menos (−10 %). También define si te descuentan retención en la fuente.',
    ejemplo: 'Una tienda de barrio: emprendimiento. Una alcaldía: entidad pública.',
  },
  mercado: {
    que: 'Dónde está el cliente. Local o regional: −5 %. Nacional: sin ajuste. Internacional: +50 % y se recomienda cobrar en dólares o euros.',
    ejemplo: ({ ej }) => `Si trabajas en ${ej.ciudad} y el cliente es de otra ciudad de tu país: nacional.`,
  },
  derechos: {
    que: 'Qué puede hacer el cliente con tu trabajo. Licencia de uso: lo usa para lo acordado y tú lo puedes mostrar en tu portafolio. Uso comercial amplio: lo puede usar en publicidad o en productos que vende (+15 %). Cesión total: el trabajo pasa a ser del cliente, con archivos fuente o código (+40 %).',
    ejemplo:
      'Un logo para un negocio pequeño: licencia de uso. Un personaje que la empresa quiere imprimir en camisetas: uso comercial amplio.',
  },
  costosDirectos: {
    que: 'Lo que le pagas a otras personas o empresas SOLO para este proyecto: dominio, hosting, fotos de stock, música, materiales o impresión. Marca los que apliquen y agrega los que falten. Se cobran al costo, sin ganancia.',
    ejemplo: 'Un dominio por un año o la cuenta de desarrollador de Google Play (25 dólares).',
  },
  costoConcepto: {
    que: 'Qué es lo que vas a pagar. Escríbelo corto para reconocerlo en la cotización.',
    ejemplo: 'Dominio, plantilla de pago o fuente tipográfica.',
  },
  costoValor: {
    que: 'Cuánto cuesta. Escribe solo el número: la app pone los separadores de miles.',
    ejemplo: ({ f, p }) => {
      const valor = redondo(p.trm * 25);
      return `Escribe ${valor} y se muestra como ${f.dinero(valor)}.`;
    },
  },
  costoMoneda: {
    que: 'Elige dólares si lo pagas en una página extranjera. La app lo pasa a tu moneda con el tipo de cambio que está en "Cómo calculamos".',
    ejemplo: 'La cuenta de desarrollador de Google Play cuesta 25 dólares.',
  },
  margen: {
    que: 'La ganancia del negocio, aparte de lo que ganas por hora. Sirve para los meses sin clientes, para cambiar el equipo y para pagar cursos. Lo normal es entre 10 % y 20 %.',
    ejemplo: '10 %',
  },
  imprevistos: {
    que: 'Horas extra por si algo sale mal: un archivo que se daña, una idea que no funciona, un cambio que no esperabas. En automático se calculan según la complejidad y tu dominio. Si lo apagas, pones tu propio porcentaje.',
    ejemplo: 'Intermedio con 50 % de dominio: 20 % de horas extra.',
  },
  imprevistosManual: {
    que: 'El porcentaje de horas extra que quieres sumar por imprevistos, sobre tus horas estimadas.',
    ejemplo: 'Con 15 % y 20 horas estimadas se suman 3 horas.',
  },
  seguridadSocial: {
    que: (ctx) => {
      const { f, p, pais } = ctx;
      const total = tasaSeguridadSocial(p);
      const regimen = regimenDePais(pais.id);
      const base = enColombia(ctx)
        ? 'Como independiente en Colombia tú mismo pagas salud, pensión y riesgos laborales sobre el 40 % de lo que cobras'
        : `Como independiente en ${nombrePais(ctx)} pagas tus propios aportes a la seguridad social${regimen ? ` (${regimen})` : ''}`;
      return `${base}: en total cerca del ${f.porcentaje(total, 1)} de tus ingresos. Déjalo activado para que el precio lo cubra y no salga de tu ganancia.`;
    },
    ejemplo: ({ f, p }) => {
      const cobro = redondo(p.smmlv * 0.6);
      const total = tasaSeguridadSocial(p);
      return `Si cobras ${f.dinero(cobro)}, pagas unos ${f.dinero(cobro * total)} de seguridad social.`;
    },
    nota: (ctx) => notaDePais(ctx.pais.id, 'aportes', 'es'),
  },
  iva: {
    que: (ctx) =>
      enColombia(ctx)
        ? 'Actívalo solo si en tu RUT apareces como responsable de IVA: pasa si facturas más de 3.500 UVT al año (unos $183 millones) o si te inscribiste así. Casi ningún recién egresado lo es.'
        : ctx.p.ivaPorDefecto
          ? `En ${nombrePais(ctx)} lo normal es que un independiente cobre ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) en sus facturas, por eso viene activado. Apágalo solo si estás exento o en un régimen que no lo cobra.`
          : `Actívalo solo si estás obligado a cobrar ${ctx.p.ivaNombre} (${ctx.f.porcentaje(ctx.p.iva)}) en ${nombrePais(ctx)}. Muchos independientes que empiezan no lo cobran.`,
    ejemplo: (ctx) => (ctx.p.ivaPorDefecto ? 'Si no sabes, déjalo como viene y confírmalo con un contador.' : 'Si no sabes, déjalo apagado.'),
    nota: (ctx) => notaDePais(ctx.pais.id, 'iva', 'es'),
  },
  retencion: {
    que: 'Cuando te paga una empresa, puede descontarte un porcentaje como anticipo de tu impuesto sobre la renta. En automático la app lo elige según el cliente, el producto y tu país. Si el cliente te dice otro, cámbialo aquí.',
    ejemplo: (ctx) =>
      enColombia(ctx)
        ? 'Una pyme te paga un logo: honorarios del 10 %. Una persona natural: no aplica.'
        : 'Si te paga una empresa del país se aplica la retención general; si te paga una persona o un cliente del exterior, normalmente no aplica.',
    nota: (ctx) => notaDePais(ctx.pais.id, 'retencion', 'es'),
  },
  compensarRetencion: {
    que: 'Si lo activas, el precio sube un poco para que, después del descuento de la retención, te llegue lo que calculaste.',
    ejemplo: ({ f, p }) => {
      const precio = redondo(p.smmlv * 0.6);
      return `Precio de ${f.dinero(precio)} con 10 % de retención: sube a unos ${f.dinero(precio / 0.9)} y, después del descuento, te consignan ${f.dinero(precio)}.`;
    },
  },
  gmf: {
    que: ({ p, f }) =>
      `Es un impuesto que cobra el banco cuando sacas o transfieres plata: ${p.gmfNombre ?? 'el impuesto a los movimientos financieros'}, del ${f.porcentaje(p.gmf, 2)}. Actívalo si tu cuenta no está exenta.`,
    ejemplo: ({ f, p }) => {
      const monto = redondo(p.smmlv * 0.6);
      return `Sacar ${f.dinero(monto)} cuesta ${f.dinero(monto * p.gmf)}.`;
    },
  },
  esquemaPago: {
    que: 'Cuándo te paga el cliente. Pide siempre un anticipo: así no trabajas gratis si el cliente se arrepiente. Lo más común es 50 % al empezar y 50 % al entregar.',
    ejemplo: 'Proyecto largo: 40 % al empezar, 30 % al mostrar un avance y 30 % al entregar.',
  },
  vigencia: {
    que: 'Cuántos días vale el precio de la cotización. Después de esa fecha puedes actualizarlo.',
    ejemplo: '15 días',
  },
  alcance: {
    que: 'Escribe qué incluye y qué NO incluye el trabajo, para evitar malentendidos con el cliente. Sale en la cotización.',
    ejemplo: 'Incluye 3 propuestas de logo y 2 rondas de cambios. No incluye impresión ni manual de marca.',
  },
  ajusteCondiciones: {
    que: 'Todos los ajustes de este paso y la urgencia, multiplicados: tipo de cliente × mercado × derechos × urgencia. Si da más de 1, el precio sube; si da menos, baja.',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.factor(r.multiplicadores.cliente)} × ${f.factor(r.multiplicadores.mercado)} × ${f.factor(r.multiplicadores.derechos)} × ${f.factor(r.multiplicadores.urgencia)} = ${f.factor(r.multiplicadores.total)}.`,
  },
  consignado: {
    que: 'Lo que de verdad llega a tu cuenta: el precio menos la retención en la fuente que descuenta el cliente.',
    ejemplo: ({ f, r }) =>
      `Con tus datos: ${f.dinero(r.precio.total)} − ${f.dinero(r.neto.retencion)} de retención = ${f.dinero(r.neto.consignado)}.`,
  },

  // ── Resultado ───────────────────────────────────────────────────
  precioSugerido: {
    que: ({ p }) =>
      `Lo que le cobras al cliente, sin ${p.ivaNombre ?? 'IVA'}. Ya incluye tu trabajo, tus costos, la utilidad y la seguridad social.`,
    ejemplo: 'Es el valor que pones en la cotización.',
  },
  piso: {
    que: 'El precio más bajo que puedes aceptar sin perder plata: cubre tus gastos de vida, tus costos y tus aportes, pero sin ganancia extra.',
    ejemplo: 'Si el cliente ofrece menos que esto, mejor no aceptes o reduce lo que entregas.',
  },
  paraNegociar: {
    que: 'Un 15 % más que el precio sugerido. Empieza la conversación con este valor: si el cliente pide descuento, puedes bajar hasta el sugerido sin perder.',
    ejemplo: ({ f, r }) => `Sugerido ${f.dinero(r.precio.sinIva)}: arranca con ${f.dinero(r.rango.apertura)}.`,
  },
  salud: {
    que: 'Revisa 7 buenas prácticas, como pedir anticipo o no quedar por debajo del mercado. Cada una suma puntos: 100 es una cotización sana.',
    ejemplo: 'Las que tienen una X roja son las que debes mejorar.',
  },
  recomendaciones: {
    que: 'Consejos según tus datos. Las alertas son lo más importante: léelas antes de enviar la cotización.',
    ejemplo: 'Si te dice que no cubres tu mínimo, sube la tarifa o reduce el alcance.',
  },
  desglose: {
    que: 'De dónde sale cada peso del precio. La barra muestra qué parte del total es cada cosa y la tabla dice cómo se calculó.',
    ejemplo: 'Tu trabajo = horas a cobrar × tu tarifa ajustada.',
  },
  neto: {
    que: 'De todo lo que paga el cliente, lo que de verdad llega a tu bolsillo después de la retención, los impuestos, la seguridad social y los costos.',
    ejemplo: ({ f, r }) => `Con tus datos: te pagan ${f.dinero(r.precio.total)} y te quedan unos ${f.dinero(r.neto.ganancia)}.`,
  },
  mercadoResultado: {
    que: (ctx) =>
      `Cuánto cobrarían otros por el mismo trabajo en ${nombrePais(ctx)}, según su experiencia. Un recién egresado normalmente está en el rango junior.`,
    ejemplo: 'Si quedas por debajo del junior, estás cobrando muy poco.',
  },
  curva: {
    que: 'Cómo cambiaría el precio de este mismo proyecto si supieras más o menos del tema. Pasa el mouse o toca la gráfica para ver cada valor.',
    ejemplo: 'Muestra por qué capacitarte te deja cobrar más.',
  },
  nivelesResultado: {
    que: 'El mismo producto y cantidad en los tres niveles de complejidad, con las horas del catálogo.',
    ejemplo: 'Sirve para ofrecerle al cliente una opción más sencilla si el precio no le alcanza.',
  },
  horasResultado: {
    que: 'Las horas que cobras frente a las que probablemente trabajes. Si dominas poco el tema, trabajarás más horas de las que cobras.',
    ejemplo: 'Esa diferencia es tu inversión en aprender.',
  },
  entrega: {
    que: (ctx) =>
      `La fecha aproximada en que terminarías, contando solo días hábiles: sin sábados, domingos ni festivos de ${nombrePais(ctx)}.`,
    ejemplo: 'Cambia según las horas al día que le dediques.',
  },
  pagos: {
    que: 'Cuánto te paga el cliente en cada momento, según la forma de pago que elegiste en el paso 4.',
    ejemplo: '50 % de anticipo y 50 % al entregar.',
  },

  // ── Datos del país (página "Cómo calculamos") ───────────────────
  smmlv: {
    que: (ctx) =>
      `El salario mínimo mensual de ${nombrePais(ctx)}. Sirve para comparar el precio y, donde aplica, para calcular el aporte mínimo a la seguridad social. Cámbialo si sale un decreto nuevo.`,
    ejemplo: ({ f, p }) => `${f.dinero(p.smmlv)} en ${p.anio}.`,
  },
  uvt: {
    que: 'La Unidad de Valor Tributario de la DIAN (solo Colombia). Con ella se calculan los topes de impuestos, como el de responsable de IVA (3.500 UVT al año).',
    ejemplo: '$52.374 en 2026 (Resolución DIAN 000238 de 2025).',
  },
  trm: {
    que: ({ f }) =>
      `Cuántas unidades de tu moneda (${f.codigo}) vale un dólar. Sirve para pasar a tu moneda los costos en dólares y para mostrar el precio en dólares. Con internet se actualiza solo con el valor del día; si lo cambias a mano, la app respeta tu valor.`,
    ejemplo: ({ f, p }) => `Hoy la app usa ${f.dinero(p.trm)} por cada dólar.`,
  },
  ivaTarifa: {
    que: ({ p }) => `La tarifa general del impuesto a la venta (${p.ivaNombre ?? 'IVA'}). Solo se suma al precio si en el paso 4 dices que debes cobrarlo.`,
    ejemplo: ({ f, p }) => f.porcentaje(p.iva),
  },
  ibc: {
    que: 'Sobre qué parte de tus ingresos se calculan tus aportes como independiente (en Colombia, el 40 %). En otros países la app usa la base que resume su régimen.',
    ejemplo: ({ f, p }) => f.porcentaje(p.ibcIndependiente),
  },
  saludTarifa: {
    que: 'Lo que aportas a salud sobre esa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.salud, 2),
  },
  pensionTarifa: {
    que: 'Lo que aportas a pensión o jubilación sobre esa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.pension, 2),
  },
  arlTarifa: {
    que: 'Riesgos laborales y otros aportes del régimen (por ejemplo, desempleo o formación), sobre esa base.',
    ejemplo: ({ f, p }) => f.porcentaje(p.arl, 3),
  },
};
