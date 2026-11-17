/** Página "Cómo calculamos": fórmula, factores, tarifas de mercado y datos del país. */

/** Un monto redondo en la moneda del país (unos 1.000 dólares) para los ejemplos. */
const montoEjemplo = (p) => {
  const v = 1000 * (Number(p.trm) || 1);
  const potencia = 10 ** Math.floor(Math.log10(v));
  return Math.round(v / potencia) * potencia;
};

export default {
  titulo: 'Cómo calculamos',
  intro: ({ pais, producto }) =>
    `La fórmula completa, los factores que usa y los datos de ${pais} que la alimentan. Los ejemplos usan la cotización que tienes abierta: ${producto}.`,
  tuEjemplo: 'Tu ejemplo:',

  formula: {
    titulo: 'La fórmula, paso a paso',
    horas: {
      titulo: 'Horas a cobrar',
      texto: ({ maximo }) =>
        `Horas estimadas + imprevistos + revisiones + gestión. Los imprevistos son el colchón de la complejidad (5, 10 o 15 %) más hasta ${maximo} si dominas poco el tema.`,
    },
    tarifa: {
      titulo: 'Tarifa ajustada por tu perfil',
      texto: 'Tu tarifa deseada × dominio × experiencia × portafolio × formación. El dominio va de ×0,70 (0 %) a ×1,30 (100 %).',
      porHora: ({ valor }) => `${valor} por hora`,
    },
    trabajo: {
      titulo: 'Tu trabajo y los costos de trabajar',
      texto:
        'Horas a cobrar × tarifa ajustada, más horas a cobrar × costo operativo por hora. El costo operativo reparte tu internet, energía, software y la depreciación del equipo entre tus horas facturables del mes.',
    },
    condiciones: {
      titulo: 'Ajuste por condiciones',
      texto: 'Se multiplica por el tipo de cliente, su mercado, los derechos que recibe y la urgencia.',
      ejemplo: ({ factor, valor }) => `${factor}, que suma ${valor}`,
    },
    utilidad: {
      titulo: 'Utilidad',
      texto: 'Un porcentaje del subtotal para el negocio: meses sin clientes, equipo nuevo y cursos.',
    },
    aportes: {
      titulo: 'Seguridad social',
      colombia: ({ salud, pension, arl, base, tasa }) =>
        `Como independiente aportas salud (${salud}), pensión (${pension}) y riesgos (${arl}) sobre el ${base} de lo que cobras: ${tasa} del ingreso. El precio se divide entre (1 − esa tasa) para que, después de pagar, te quede lo calculado.`,
      pais: ({ pais, regimen, tasa }) =>
        `Como independiente en ${pais} pagas tus propios aportes${regimen ? ` (${regimen})` : ''}. Los resumimos en una tasa efectiva de ${tasa} de lo que cobras. El precio se divide entre (1 − esa tasa) para que, después de pagar, te quede lo calculado.`,
      sinAportes: ({ pais, regimen }) =>
        `En ${pais} los aportes de un independiente son voluntarios o no aplican${regimen ? ` (${regimen})` : ''}, así que no se suman al precio. Si cotizas por tu cuenta, pon tu tasa en los datos del país, más abajo.`,
    },
    impuestos: {
      titulo: ({ impuesto }) => `Costos directos, retención, redondeo y ${impuesto}`,
      texto: ({ impuesto, tasa }) =>
        `Se suman los costos de terceros (los que están en dólares se convierten con el tipo de cambio). Si lo pides, se compensa la retención. El precio se redondea hacia arriba y, si cobras ${impuesto}, se suma el ${tasa}.`,
      sinImpuesto:
        'Se suman los costos de terceros (los que están en dólares se convierten con el tipo de cambio). Si lo pides, se compensa la retención. El precio se redondea hacia arriba.',
      ejemplo: ({ impuesto }) => `precio sin ${impuesto}`,
      ejemploSinImpuesto: 'precio',
    },
    rango: {
      titulo: 'Rango y mercado',
      texto:
        'El piso usa tu tarifa mínima sin utilidad ni ajustes. El precio para negociar es 15 % más alto que el sugerido. El mercado se calcula con las horas de referencia del catálogo por las tarifas junior, semi-senior y senior del área.',
      ejemplo: ({ piso, apertura, posicion }) => `piso ${piso}, negociar desde ${apertura}. ${posicion}.`,
    },
  },

  dominio: {
    titulo: 'Qué cambia el dominio',
    columnas: {
      dominio: 'Dominio',
      tarifa: 'Tarifa',
      imprevistos: 'Imprevistos que se cobran',
      horasExtra: 'Horas extra reales por cada 10 h',
    },
    nota: ({ niveles }) => `Más los imprevistos del nivel de complejidad: ${niveles}.`,
  },

  factores: {
    titulo: 'Factores de perfil y de condiciones',
    experiencia: 'Proyectos parecidos',
    portafolio: 'Portafolio',
    formacion: 'Formación extra',
    clientes: 'Tipo de cliente',
    mercados: 'Mercado',
    derechos: 'Derechos',
    urgencia: 'Urgencia',
  },

  bandas: {
    titulo: 'Tarifas de referencia del mercado',
    colombia: ({ moneda }) =>
      `En ${moneda} por hora, todo incluido, para trabajo independiente en Colombia. Salen de salarios de mercado multiplicados por el costo de ser independiente y divididos entre las horas que realmente se cobran.`,
    pais: ({ pais, moneda, devPais, devColombia, disPais, disColombia }) =>
      `En ${moneda} por hora, todo incluido, para trabajo independiente en ${pais}. Son las tarifas de Colombia ajustadas por lo que ganan los profesionales en cada país: un desarrollador junior gana cerca de ${devPais} al mes en ${pais} y ${devColombia} en Colombia; un diseñador junior, ${disPais} y ${disColombia}. Así las tarifas no dependen de que el dólar suba o baje.`,
    area: 'Área',
    rango: ({ min, max }) => `${min} a ${max}`,
  },

  parametros: {
    titulo: ({ pais, anio }) => `Datos de ${pais} ${anio}`,
    intro: 'Cámbialos si salió una norma nueva o si el dólar se movió. Todo se recalcula al instante.',
    salarioMinimo: 'Salario mínimo mensual',
    uvt: 'UVT',
    trm: 'Dólar (TRM)',
    tipoCambio: ({ moneda }) => `Un dólar en ${moneda}`,
    iva: ({ impuesto }) => impuesto,
    ibc: 'Base de cotización (IBC)',
    salud: 'Salud',
    pension: 'Pensión',
    arl: 'Riesgos laborales (ARL)',
    aportesEfectivos: 'Aportes a seguridad social',
    aporteMinimo: 'Aporte mínimo al mes',
    transacciones: ({ nombre }) => nombre,
    regimen: ({ regimen }) => `Régimen de aportes: ${regimen}.`,
    restablecer: ({ anio }) => `Volver a los valores de ${anio}`,
    confianza: {
      alta: 'Datos oficiales y recientes.',
      media: 'Datos de fuentes confiables, con algunas estimaciones.',
      baja: 'Datos con muchas estimaciones: revísalos con alguien del país antes de cotizar.',
    },
    cambio: {
      titulo: 'Dólar del día',
      api: 'Se actualiza solo: 1 dólar = {valor}, según {fuente} ({fecha}). La app lo vuelve a consultar cada 6 horas.',
      guardado: 'No se pudo consultar el dólar de hoy (¿sin internet?): usamos el valor guardado del {fecha}, 1 dólar = {valor}.',
      cargando: 'Consultando el dólar de hoy…',
      manual: 'Escribiste el dólar a mano ({valor}): la actualización automática no lo cambia.',
      sinApi: 'En Cuba hay varias tasas oficiales y los servicios en línea publican la antigua (24 CUP por dólar). La app usa la tasa oficial flotante ({valor}, del {fecha}): actualízala a mano en el campo de abajo.',
      fijo: 'Tu país usa el dólar: no hace falta tipo de cambio.',
      actualizar: 'Actualizar ahora',
      actualizando: 'Consultando…',
      usarDelDia: 'Usar el de hoy: {valor}',
    },
    confianzaTitulo: 'Qué tan seguros son estos datos',
    ayudas: {
      aportesEfectivos: {
        que: 'Qué parte de lo que cobras se va en aportes a seguridad social (salud, pensión y otros) como independiente. Resume las cuotas, tramos o porcentajes del régimen de tu país en un solo número.',
        ejemplo: ({ f, p }) =>
          `Con ${f.porcentaje(p.aportesEfectivos ?? 0, 1)}, de cada ${f.dinero(montoEjemplo(p))} que cobras se van ${f.dinero(montoEjemplo(p) * (p.aportesEfectivos ?? 0))} en aportes.`,
        nota: 'Si ya cotizas y sabes cuánto pagas al mes, divide ese valor entre lo que cobras en un mes normal.',
      },
      aporteMinimo: {
        que: 'La cuota más baja que paga un independiente al mes, aunque ese mes cobre poco. Si no hay cuota mínima, pon 0.',
        ejemplo: ({ f, p }) => (p.aporteMinimo ? f.dinero(p.aporteMinimo) : f.dinero(0)),
      },
      transacciones: {
        que: 'Impuesto que cobra el banco al mover o retirar plata. Solo se descuenta si lo marcas en el paso 4.',
        ejemplo: ({ f, p }) =>
          `Con ${f.porcentaje(p.gmf ?? 0, 2)}, al retirar ${f.dinero(montoEjemplo(p))} pagas ${f.dinero(montoEjemplo(p) * (p.gmf ?? 0))}.`,
      },
    },
  },

  diagramas: {
    titulo: 'Diagramas de flujo',
    leyenda: 'Óvalo: inicio o fin. Paralelogramo: datos que entran o salen. Rombo: decisión. Rectángulo: proceso.',
    usuarioAlt: 'Diagrama de flujo del recorrido del usuario por la app',
    usuario: 'Recorrido del usuario.',
    calculoAlt: 'Diagrama de flujo de la lógica de cálculo del precio',
    calculo: 'Lógica de cálculo del precio.',
    abrir: 'Abrir en tamaño completo',
    idioma: 'Los diagramas están en español.',
  },

  glosario: {
    titulo: 'Glosario',
    general: [
      ['Tarifa mínima', 'Lo que debes ganar por cada hora que cobras para cubrir tus gastos de vida y tu ahorro.'],
      ['Horas facturables', 'Las horas que de verdad cobras. El resto del tiempo se va en buscar clientes, cotizar y aprender.'],
      ['Costo operativo', 'Lo que cuesta trabajar: internet, energía, software y el desgaste de tu computador, repartido por hora.'],
      ['Dominio o especialidad', 'Qué tanto sabes de ese producto en particular, de 0 a 100 %. Sube el valor de tu hora y baja los imprevistos.'],
      ['Piso', 'El precio más bajo que puedes aceptar sin perder: cubre tu tarifa mínima, tus costos y tus aportes, sin utilidad.'],
      ['Precio para negociar', 'Un 15 % por encima del sugerido. Empieza ahí para tener margen si el cliente pide descuento.'],
      ['Tarifa todo incluido', 'El precio del servicio dividido entre las horas que cobras. Es la que se compara con el mercado.'],
      ['Retención en la fuente', 'Porcentaje que una empresa te descuenta al pagarte como anticipo de tu impuesto sobre la renta.'],
      ['Cesión de derechos', 'Cuando el cliente se queda con los derechos patrimoniales de la obra o del código y tú ya no puedes explotarla.'],
    ],
    colombia: [
      ['IBC', 'Ingreso base de cotización. Para un independiente es el 40 % de lo que cobra al mes, con un mínimo de un salario mínimo.'],
      ['Responsable de IVA', 'Quien debe cobrar IVA en sus facturas. Un independiente lo es si sus ingresos superan 3.500 UVT al año, entre otros casos.'],
      ['UVT', 'Unidad de Valor Tributario. La DIAN la fija cada año y con ella se expresan topes y bases de impuestos.'],
      ['TRM', 'Tasa Representativa del Mercado: el precio oficial del dólar en pesos para cada día.'],
    ],
    pais: ({ impuesto }) => [
      [impuesto, 'El impuesto a la venta de tu país. Solo lo cobras si tu régimen te obliga; si lo cobras, se suma al precio y se lo entregas al fisco.'],
      ['Tasa efectiva de aportes', 'La parte de lo que cobras que se va en seguridad social. Resume en un número las cuotas o porcentajes de tu régimen.'],
      ['Tipo de cambio', 'Cuántas unidades de tu moneda vale un dólar. Sirve para convertir los costos que pagas en dólares.'],
    ],
  },

  fuentes: {
    titulo: 'Fuentes',
    colombia: [
      'Decreto 1469 de 2025: salario mínimo 2026 ($1.750.905)',
      'Resolución DIAN 000238 de 2025: UVT 2026 ($52.374)',
      'Tabla de retención en la fuente 2026 y Decreto 572 de 2025',
      'Aportes a seguridad social de independientes en 2026',
      'UGPP: ABC del trabajador independiente con contrato de prestación de servicios',
      'Salario de un desarrollador de software en Colombia (Portafolio)',
      'Salario de un diseñador gráfico en Colombia (Magneto)',
      'Tasa de cambio representativa del mercado (Superintendencia Financiera)',
    ],
    temas: {
      cambio: 'Tipo de cambio',
      salarioMinimo: 'Salario mínimo',
      costoVida: 'Costo de vida',
      iva: 'Impuesto a la venta',
      aportes: 'Aportes a seguridad social',
      retencion: 'Retención sobre honorarios',
      transacciones: 'Impuesto a las transacciones',
      salariosTecnologia: 'Salarios de desarrollo de software',
      salariosDiseno: 'Salarios de diseño',
      tarifas: 'Tarifas de independientes',
      internet: 'Internet',
      energia: 'Energía',
    },
    tema: ({ tema, sitio }) => `${tema} (${sitio})`,
    nota: 'Las tarifas por hora del mercado son una estimación del proyecto a partir de esas fuentes. Revisa los impuestos con un contador antes de firmar un contrato.',
    documento: 'Todas las fuentes y cómo se calculó cada dato, país por país, están en docs/PAISES_Y_FUENTES.md.',
  },
};
