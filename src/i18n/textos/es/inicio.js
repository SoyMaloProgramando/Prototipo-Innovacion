/** Página de inicio: portada, demo en vivo, carreras, pasos del cálculo y datos del país. */
export default {
  titulo: '¿Cuánto cobro por esto?',
  lema:
    'TarifaJusta calcula un precio justo para tu trabajo de Ingeniería de Sistemas o de Multimedia. Pones las horas, lo que quieres ganar y qué tanto dominas el tema; te devuelve el precio, tu mínimo y cómo se compara con el mercado.',
  cotizarProyecto: 'Cotizar mi proyecto',
  verProductos: 'Ver los {n} productos',
  demo: {
    leyenda: 'Prueba con un producto',
    dominio: 'Qué tanto dominas este tipo de trabajo',
    valorDominio: ({ porcentaje, nivel }) => `${porcentaje}, ${nivel.toLowerCase()}`,
    datos: ({ n, horas, gastos, pais }) =>
      `Datos de ejemplo: ${horas} ${n === 1 ? 'hora' : 'horas'} a la semana, gastos de ${gastos} al mes y cliente pyme en ${pais}.`,
    cotizar: 'Cotizar este producto',
  },
  /** Nombres cortos de los productos de la demo (por id de producto). */
  demos: {
    'mul-logo': 'Logotipo',
    'mul-model-sheet': 'Model sheet',
    'mul-animacion-3d': 'Animación 3D',
    'sis-landing': 'Landing page',
    'sis-multiplataforma': 'App multiplataforma',
    'sis-base-datos': 'Base de datos',
  },
  carreras: {
    titulo: 'Dos carreras, {n} productos',
    resumen: ({ total, grupos }) =>
      `${total} ${total === 1 ? 'producto' : 'productos'} en ${grupos} ${grupos === 1 ? 'grupo' : 'grupos'}`,
  },
  pasos: {
    titulo: 'Cómo llega al precio',
    perfil: {
      titulo: 'Tu perfil',
      texto: 'Tus gastos del mes y las horas que de verdad puedes cobrar definen tu tarifa mínima.',
    },
    producto: {
      titulo: 'El producto',
      texto: 'Eliges entre {n} productos. Cada uno trae horas de referencia según su tamaño y complejidad.',
    },
    tiempo: {
      titulo: 'Horas, tarifa y dominio',
      texto: 'Lo que quieres ganar por hora se ajusta según qué tanto dominas el tema, del 0 al 100 %.',
    },
    condiciones: {
      titulo: 'Cliente y condiciones',
      texto: 'El tipo de cliente, la urgencia, los derechos, los aportes, la retención y el {impuesto} cierran el precio.',
    },
    verFormula: 'Ver la fórmula completa, paso a paso',
  },
  datos: {
    titulo: 'Datos de {pais} que usa el cálculo',
    salarioMinimo: 'Salario mínimo {anio}',
    uvt: 'UVT {anio}',
    dolar: 'Dólar de referencia',
    aportes: 'Aportes de un independiente',
    aportesValor: '{porcentaje} del ingreso',
    nota: 'Puedes actualizar estos valores en la página {pagina}.',
  },
};
