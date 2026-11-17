/**
 * Chequeos de salud y recomendaciones del resultado.
 * Las funciones reciben las cifras de la regla y `f`, el formato del país (f.dinero, f.horas...).
 */
export default {
  tipos: { alerta: 'Alerta', consejo: 'Consejo', oportunidad: 'Oportunidad' },
  chequeos: {
    piso: 'El precio cubre tu piso (gastos de vida y de trabajo)',
    mercado: 'No queda por debajo del rango junior del mercado',
    anticipo: 'Pides al menos 30 % de anticipo',
    revisiones: ({ aplica }) => (aplica ? 'Las revisiones incluidas están limitadas (de 1 a 3)' : 'Este servicio no usa rondas de revisión'),
    aportes: 'El precio incluye tus aportes a seguridad social',
    margen: 'Dejas al menos 10 % de utilidad',
    'ganancia-real': 'Tu ganancia por hora real supera tu tarifa mínima',
  },
  'bajo-piso': {
    titulo: 'El precio no cubre tu mínimo',
    texto: ({ f, precio, piso }) =>
      `Cobrarías ${f.dinero(precio)} y tu piso es ${f.dinero(piso)}. Sube la tarifa, reduce el alcance o acepta la diferencia solo si el proyecto te deja portafolio o aprendizaje.`,
  },
  'tarifa-bajo-minimo': {
    titulo: 'Tu tarifa deseada no cubre tus gastos de vida',
    texto: ({ f, deseada, horasMes, minima }) =>
      `Pediste ${f.dinero(deseada)} por hora, pero con ${f.horas(horasMes)} facturables al mes necesitas al menos ${f.dinero(minima)} por hora para tus gastos y tu ahorro.`,
  },
  'sin-anticipo': {
    titulo: 'Pide un anticipo',
    texto: 'Cobrar todo al final te deja sin respaldo si el cliente cancela o se demora en pagar. Lo normal es pedir entre 30 % y 50 % al aprobar la cotización.',
  },
  'debajo-mercado': {
    titulo: 'Estás por debajo del mercado',
    texto: ({ f, min, max }) =>
      `Un junior cobraría entre ${f.dinero(min)} y ${f.dinero(max)} por este alcance. Cobrar mucho menos baja los precios para todos y le dice al cliente que tu trabajo vale poco.`,
  },
  'poco-dominio': {
    titulo: 'Dominas poco este tipo de producto',
    texto: ({ f, especialidad, factor, imprevistos, noCobradas }) =>
      `Con ${especialidad} % de dominio tu tarifa se multiplica por ${f.factor(factor)} y se suma ${f.porcentaje(imprevistos)} de imprevistos. Probablemente trabajes ${f.horas(noCobradas)} que no se cobran: tómalas como inversión en aprendizaje.`,
  },
  'sin-aportes': {
    titulo: 'No incluiste la seguridad social',
    texto: ({ f, aportes }) => `Igual tienes que pagarla: por este proyecto son cerca de ${f.dinero(aportes)}. Ya están descontados de tu ganancia.`,
  },
  retencion: {
    titulo: 'El cliente te hará una retención',
    texto: ({ f, retencion, tasa, consignado }) =>
      `Te descontarán ${f.dinero(retencion)} (${f.porcentaje(tasa, 2)}) como anticipo de tu impuesto de renta, así que te consignarán ${f.dinero(consignado)}. Confirma el concepto con su área contable.`,
  },
  'muchas-revisiones': {
    titulo: 'Incluiste muchas revisiones',
    texto: 'Cada ronda suma horas. Escribe en la cotización que los cambios adicionales se cobran aparte.',
  },
  'sin-revisiones': {
    titulo: 'No incluiste revisiones',
    texto: 'Casi todo cliente pide cambios. Si no los incluyes, deja escrito cuánto cuesta cada ronda adicional.',
  },
  urgencia: {
    titulo: 'Recargo por urgencia',
    texto: ({ f, recargo }) =>
      `Trabajar más horas al día justifica el ${f.porcentaje(recargo)} adicional. Si el cliente puede esperar, ofrécele también la opción normal.`,
  },
  'proyecto-grande': {
    titulo: 'Divide el proyecto en fases',
    texto: ({ f, horas }) =>
      `Son ${f.horas(horas)} facturables, más de un mes de trabajo. Cobra por hitos y entrega por fases para no financiar tú el proyecto.`,
  },
  exclusividad: {
    titulo: 'Deja la cesión de derechos por escrito',
    texto: 'Si cedes los derechos o el código fuente, fírmalo en un contrato e indica qué archivos entregas.',
  },
  'margen-bajo': {
    titulo: 'Tu utilidad es baja',
    texto: 'La utilidad cubre los meses sin proyectos, el cambio de equipo y tus cursos. Lo usual es dejar entre 10 % y 20 %.',
  },
  'aporte-minimo': {
    titulo: 'Ojo con el aporte mínimo',
    texto: ({ f, aporte }) =>
      `Como independiente pagas un aporte mínimo a la seguridad social: unos ${f.dinero(aporte)} al mes. Si este es tu único ingreso del mes, el aporte real será mayor que el calculado.`,
  },
  'mucho-dominio': {
    titulo: 'Tu dominio da para cobrar más',
    texto: 'Con un dominio tan alto podrías acercarte al rango semi-senior. Respáldalo con portafolio y resultados de proyectos anteriores.',
  },
  internacional: {
    titulo: 'Cotiza en dólares',
    texto: ({ f, usd }) =>
      `Para un cliente del exterior el precio equivale a ${f.usd(usd)}. Usa una plataforma de pagos con comisión baja y revisa la tasa de cambio el día que cobres.`,
  },
  portafolio: {
    titulo: 'Conviértelo en portafolio',
    texto: 'Pide permiso para mostrar el resultado. Un buen caso publicado mejora tu perfil en la próxima cotización.',
  },
};
