/**
 * Parámetros económicos y factores de negocio de TarifaJusta.
 *
 * Todos los valores son de referencia para Colombia en 2026. Los parámetros
 * económicos se pueden editar desde la página "Cómo calculamos" de la app.
 */

/** Parámetros económicos de Colombia, año 2026. */
export const PARAMETROS_2026 = {
  pais: 'CO',
  moneda: 'COP',
  anio: 2026,
  /** Salario mínimo mensual legal vigente. Decreto 1469 de 2025. */
  smmlv: 1_750_905,
  /** Auxilio de transporte. Decreto 1470 de 2025. */
  auxilioTransporte: 249_095,
  /** Unidad de Valor Tributario. Resolución DIAN 000238 de 2025. */
  uvt: 52_374,
  /** Tasa de cambio de referencia (COP por 1 USD): TRM del 31 de octubre de 2026. Actualízala el día que cotices. */
  trm: 3_183,
  /** Tarifa general de IVA. */
  iva: 0.19,
  /** Ingreso base de cotización de un independiente: 40 % del ingreso mensual (Decreto 1601 de 2022, UGPP). */
  ibcIndependiente: 0.4,
  /** Aporte a salud del independiente. */
  salud: 0.125,
  /** Aporte a pensión del independiente. */
  pension: 0.16,
  /** Aporte a riesgos laborales, nivel de riesgo I. */
  arl: 0.00522,
  /** Gravamen a los movimientos financieros (4 por mil). */
  gmf: 0.004,
};

/** Semanas promedio por mes (52 semanas / 12 meses). */
export const SEMANAS_POR_MES = 4.33;

/** Niveles de complejidad del producto. */
export const NIVELES_COMPLEJIDAD = {
  basico: {
    id: 'basico',
    nombre: 'Básico',
    factorBase: 0.75,
    imprevistos: 0.05,
    descripcion: 'Alcance sencillo, requisitos claros y material del cliente listo.',
  },
  intermedio: {
    id: 'intermedio',
    nombre: 'Intermedio',
    factorBase: 1,
    imprevistos: 0.1,
    descripcion: 'Alcance estándar con personalización, algunas integraciones o más detalle.',
  },
  avanzado: {
    id: 'avanzado',
    nombre: 'Avanzado',
    factorBase: 1.4,
    imprevistos: 0.15,
    descripcion: 'Mucho detalle, integraciones o efectos complejos y requisitos que pueden cambiar.',
  },
};

/**
 * Factor de valor según el dominio (especialidad) del 0 al 100 %.
 * 0 % multiplica la tarifa por 0,70 y 100 % la multiplica por 1,30.
 */
export const FACTOR_DOMINIO = { minimo: 0.7, maximo: 1.3 };

/** Colchón de imprevistos que se cobra cuando el dominio es 0 % (baja hasta 0 con 100 %). */
export const IMPREVISTOS_POR_POCO_DOMINIO = 0.2;

/** Horas extra reales que toma aprender cuando el dominio es 0 % (no todas se cobran). */
export const CURVA_APRENDIZAJE = 0.5;

/** Horas de gestión (reuniones, correos, entregas) como fracción de las horas estimadas. */
export const GESTION_PROYECTO = 0.1;

/** Horas de cada ronda de revisión como fracción de las horas estimadas (mínimo 1 h). */
export const HORAS_POR_REVISION = 0.06;

/** Proyectos parecidos que ya hiciste. */
export const EXPERIENCIA = [
  { id: 0, nombre: 'Ninguno todavía', factor: 0.95 },
  { id: 1, nombre: '1 o 2 proyectos', factor: 1 },
  { id: 2, nombre: '3 a 5 proyectos', factor: 1.05 },
  { id: 3, nombre: '6 o más proyectos', factor: 1.1 },
];

export const PORTAFOLIO = {
  ninguno: { id: 'ninguno', nombre: 'No tengo portafolio', factor: 0.95 },
  basico: { id: 'basico', nombre: 'Básico o en construcción', factor: 1 },
  solido: { id: 'solido', nombre: 'Sólido y publicado', factor: 1.06 },
};

export const FORMACION = {
  ninguna: { id: 'ninguna', nombre: 'Solo lo visto en la carrera', factor: 1 },
  cursos: { id: 'cursos', nombre: 'Cursos en este tema', factor: 1.03 },
  certificacion: { id: 'certificacion', nombre: 'Certificación reconocida', factor: 1.06 },
};

export const TIPOS_CLIENTE = {
  persona: {
    id: 'persona',
    nombre: 'Persona natural',
    factor: 0.9,
    retiene: false,
    descripcion: 'Un particular que paga de su bolsillo.',
  },
  emprendimiento: {
    id: 'emprendimiento',
    nombre: 'Emprendimiento',
    factor: 0.95,
    retiene: false,
    descripcion: 'Negocio que está empezando, con presupuesto corto.',
  },
  pyme: {
    id: 'pyme',
    nombre: 'Pequeña o mediana empresa',
    factor: 1,
    retiene: true,
    descripcion: 'Empresa establecida con área contable.',
  },
  grande: {
    id: 'grande',
    nombre: 'Empresa grande',
    factor: 1.25,
    retiene: true,
    descripcion: 'Más exigencias, más trámites y más presupuesto.',
  },
  publica: {
    id: 'publica',
    nombre: 'Entidad pública',
    factor: 1.15,
    retiene: true,
    descripcion: 'Alcaldías, gobernación, universidades públicas. Más papeleo.',
  },
  ong: {
    id: 'ong',
    nombre: 'Fundación u ONG',
    factor: 0.9,
    retiene: true,
    descripcion: 'Proyectos sociales con presupuesto limitado.',
  },
};

export const URGENCIA = {
  normal: {
    id: 'normal',
    nombre: 'Normal',
    factor: 1,
    ritmo: 1,
    descripcion: 'Trabajas a tu ritmo habitual.',
  },
  prioritaria: {
    id: 'prioritaria',
    nombre: 'Prioritaria',
    factor: 1.2,
    ritmo: 1.25,
    descripcion: 'Hay que adelantar: trabajas un 25 % más de horas por día.',
  },
  urgente: {
    id: 'urgente',
    nombre: 'Urgente',
    factor: 1.45,
    ritmo: 1.5,
    descripcion: 'Noches o fines de semana: trabajas un 50 % más de horas por día.',
  },
};

export const DERECHOS = {
  uso: {
    id: 'uso',
    nombre: 'Licencia de uso',
    factor: 1,
    descripcion: 'El cliente lo usa para lo acordado. Tú conservas los derechos y lo muestras en tu portafolio.',
  },
  comercial: {
    id: 'comercial',
    nombre: 'Uso comercial amplio',
    factor: 1.15,
    descripcion: 'Puede usarlo en publicidad, productos o reventa, sin exclusividad.',
  },
  exclusivo: {
    id: 'exclusivo',
    nombre: 'Cesión total o exclusividad',
    factor: 1.4,
    descripcion: 'Le cedes los derechos patrimoniales o el código fuente en exclusiva.',
  },
};

export const MERCADOS = {
  regional: { id: 'regional', nombre: 'Regional (Boyacá)', factor: 0.95 },
  nacional: { id: 'nacional', nombre: 'Nacional', factor: 1 },
  internacional: { id: 'internacional', nombre: 'Internacional, cobro en dólares', factor: 1.5 },
};

/**
 * Conceptos de retención en la fuente más comunes para una persona natural
 * que presta servicios. La tasa exacta depende de cómo el cliente clasifique el pago.
 */
export const RETENCIONES = {
  auto: { id: 'auto', nombre: 'Automática según el cliente y el producto', tasa: null },
  ninguna: { id: 'ninguna', nombre: 'No aplica', tasa: 0 },
  software35: { id: 'software35', nombre: 'Software, informática y diseño web (3,5 %)', tasa: 0.035 },
  servicios4: { id: 'servicios4', nombre: 'Servicios, declarante de renta (4 %)', tasa: 0.04 },
  servicios6: { id: 'servicios6', nombre: 'Servicios, no declarante (6 %)', tasa: 0.06 },
  honorarios10: { id: 'honorarios10', nombre: 'Honorarios (10 %)', tasa: 0.1 },
  honorarios11: { id: 'honorarios11', nombre: 'Honorarios, contratos grandes (11 %)', tasa: 0.11 },
};

export const ESQUEMAS_PAGO = {
  '50-50': {
    id: '50-50',
    nombre: '50 % de anticipo y 50 % al entregar',
    cuotas: [
      { clave: 'anticipo', etiqueta: 'Anticipo al aprobar la cotización', porcentaje: 0.5 },
      { clave: 'final', etiqueta: 'Al entregar el trabajo final', porcentaje: 0.5 },
    ],
  },
  '40-30-30': {
    id: '40-30-30',
    nombre: '40 % anticipo, 30 % avance y 30 % final',
    cuotas: [
      { clave: 'anticipo', etiqueta: 'Anticipo al aprobar la cotización', porcentaje: 0.4 },
      { clave: 'avance', etiqueta: 'Al entregar el avance', porcentaje: 0.3 },
      { clave: 'final', etiqueta: 'Al entregar el trabajo final', porcentaje: 0.3 },
    ],
  },
  '30-40-30': {
    id: '30-40-30',
    nombre: '30 % anticipo, 40 % avance y 30 % final',
    cuotas: [
      { clave: 'anticipo', etiqueta: 'Anticipo al aprobar la cotización', porcentaje: 0.3 },
      { clave: 'avance', etiqueta: 'Al entregar el avance', porcentaje: 0.4 },
      { clave: 'final', etiqueta: 'Al entregar el trabajo final', porcentaje: 0.3 },
    ],
  },
  '100-final': {
    id: '100-final',
    nombre: 'Todo al entregar (riesgoso)',
    cuotas: [{ clave: 'final', etiqueta: 'Al entregar el trabajo final', porcentaje: 1 }],
  },
};

/**
 * Tarifas de referencia por hora (COP) para trabajo independiente en Colombia, 2026.
 * Son tarifas "todo incluido" (lo que paga el cliente por hora, sin IVA).
 * Se construyeron a partir de salarios de mercado (junior, semi-senior, senior)
 * multiplicados por el costo de trabajar como independiente y divididos entre
 * las horas que realmente se facturan. Ver docs/LOGICA_DE_NEGOCIO.md.
 */
export const BANDAS_MERCADO = {
  desarrollo: {
    id: 'desarrollo',
    nombre: 'Desarrollo de software',
    junior: [30_000, 50_000],
    semi: [55_000, 90_000],
    senior: [95_000, 160_000],
  },
  datos: {
    id: 'datos',
    nombre: 'Datos y bases de datos',
    junior: [30_000, 50_000],
    semi: [55_000, 95_000],
    senior: [100_000, 170_000],
  },
  infraestructura: {
    id: 'infraestructura',
    nombre: 'Infraestructura, redes y soporte',
    junior: [22_000, 38_000],
    semi: [40_000, 65_000],
    senior: [70_000, 110_000],
  },
  consultoria: {
    id: 'consultoria',
    nombre: 'Calidad, seguridad y consultoría',
    junior: [30_000, 50_000],
    semi: [55_000, 90_000],
    senior: [95_000, 160_000],
  },
  diseno: {
    id: 'diseno',
    nombre: 'Diseño gráfico y editorial',
    junior: [20_000, 35_000],
    semi: [38_000, 60_000],
    senior: [65_000, 110_000],
  },
  uxui: {
    id: 'uxui',
    nombre: 'UX/UI y web',
    junior: [28_000, 45_000],
    semi: [50_000, 80_000],
    senior: [85_000, 140_000],
  },
  animacion: {
    id: 'animacion',
    nombre: 'Animación, motion y 3D',
    junior: [25_000, 42_000],
    semi: [45_000, 75_000],
    senior: [80_000, 130_000],
  },
  audiovisual: {
    id: 'audiovisual',
    nombre: 'Audiovisual, foto y audio',
    junior: [22_000, 38_000],
    semi: [40_000, 68_000],
    senior: [72_000, 120_000],
  },
  interactivos: {
    id: 'interactivos',
    nombre: 'Interactivos e inmersivos',
    junior: [28_000, 48_000],
    semi: [50_000, 85_000],
    senior: [90_000, 150_000],
  },
};

/** Etiquetas de los niveles de mercado. */
export const NIVELES_MERCADO = {
  junior: 'Junior',
  semi: 'Semi-senior',
  senior: 'Senior',
};

/** Clave del nivel de dominio (para traducirlo): aprendiendo, basico, intermedio, avanzado o experto. */
export function claveNivelDominio(especialidad) {
  if (especialidad <= 20) return 'aprendiendo';
  if (especialidad <= 40) return 'basico';
  if (especialidad <= 60) return 'intermedio';
  if (especialidad <= 80) return 'avanzado';
  return 'experto';
}

/** Nombre del nivel de dominio según el porcentaje de especialidad. */
export function nombreNivelDominio(especialidad) {
  if (especialidad <= 20) return 'Lo estoy aprendiendo';
  if (especialidad <= 40) return 'Básico';
  if (especialidad <= 60) return 'Intermedio';
  if (especialidad <= 80) return 'Avanzado';
  return 'Experto';
}
