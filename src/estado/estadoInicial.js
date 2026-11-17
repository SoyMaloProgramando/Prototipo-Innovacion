/**
 * Estado inicial del cotizador. Todo vive en memoria (estado de React):
 * no hay base de datos. Al recargar la página se vuelve a estos valores.
 */
import { buscarProducto, CARRERAS } from '../datos/catalogo.js';
import { hoyISO } from '../logica/calendario.js';
import { horasSugeridas } from '../logica/horas.js';
import { condicionesDePais, costoParaPais, parametrosDePais, perfilDePais } from '../logica/paises.js';
import { tarifaSugerida } from '../logica/tarifas.js';

export const PERFIL_INICIAL = {
  nombre: '',
  correo: '',
  telefono: '',
  ciudad: 'Tunja',
  carrera: 'multimedia',
  proyectosPrevios: 1,
  portafolio: 'basico',
  formacion: 'ninguna',
  gastos: {
    vivienda: 650_000,
    alimentacion: 550_000,
    transporte: 160_000,
    otros: 250_000,
  },
  ahorro: 10,
  horasSemana: 40,
  porcentajeFacturable: 60,
  negocio: {
    internet: 80_000,
    energia: 50_000,
    software: 90_000,
    otros: 40_000,
  },
  valorEquipo: 4_500_000,
  vidaUtilAnios: 3,
};

export const PROYECTO_INICIAL = {
  productoId: CARRERAS.multimedia.productoInicial,
  complejidad: 'intermedio',
  unidades: 3,
  horasManual: false,
  horasEstimadas: 19,
  tarifaDeseada: 18_500,
  tarifaPersonalizada: false,
  especialidad: 50,
  revisiones: 2,
  urgencia: 'normal',
  horasDia: 6,
  fechaInicio: '',
  alcance: '',
};

/**
 * Tipo de cambio del día (src/servicios/tipoDeCambio.js). estado: 'inicial', 'cargando',
 * 'listo' o 'error'. Mientras no llegue, se usan los valores guardados de cada país.
 */
export const CAMBIO_INICIAL = { estado: 'inicial', tasas: {}, fuentes: {}, fechas: {}, fecha: null, consultado: null, error: null };

export const CONDICIONES_INICIALES = {
  clienteNombre: '',
  tipoCliente: 'pyme',
  mercado: 'regional',
  derechos: 'uso',
  margen: 10,
  imprevistosAuto: true,
  imprevistosManual: 15,
  incluirSeguridadSocial: true,
  responsableIva: false,
  retencion: 'auto',
  compensarRetencion: false,
  gmf: false,
  esquemaPago: '50-50',
  vigenciaDias: 15,
  costosDirectos: [],
};

/**
 * Costos directos sugeridos por el producto, listos para el estado.
 * Los que el catálogo tiene en pesos colombianos pasan a la moneda del país.
 * `indice` permite traducir el concepto (src/i18n/catalogo).
 */
export function costosDeProducto(producto, parametros) {
  return producto.costos.map((costo, indice) => {
    const enMoneda = costoParaPais(costo, parametros ?? { moneda: 'COP' });
    return {
      id: `${producto.id}-${indice}`,
      productoId: producto.id,
      indice,
      concepto: costo.concepto,
      valor: enMoneda.valor,
      moneda: enMoneda.moneda,
      activo: costo.activo,
      propio: false,
    };
  });
}

/** Datos del proyecto para un producto, con horas y tarifa sugeridas. */
export function proyectoParaProducto(producto, { perfil, parametros, condiciones, proyectoActual = PROYECTO_INICIAL }) {
  const unidades = producto.unidades.defecto;
  const tarifa = proyectoActual.tarifaPersonalizada
    ? proyectoActual.tarifaDeseada
    : tarifaSugerida({ perfil, producto, parametros, margen: condiciones.margen });
  return {
    ...proyectoActual,
    productoId: producto.id,
    unidades,
    horasManual: false,
    horasEstimadas: horasSugeridas(producto, unidades, proyectoActual.complejidad),
    tarifaDeseada: tarifa,
  };
}

/** Perfil con los valores de ejemplo del país (en su moneda), sin tocar lo demás. */
export function perfilParaPais(perfil, pais) {
  const base = perfilDePais(pais);
  return { ...perfil, ciudad: base.ciudad, gastos: base.gastos, negocio: base.negocio, valorEquipo: base.valorEquipo };
}

export function crearEstadoInicial(carrera = 'multimedia', pais = 'CO') {
  const producto = buscarProducto(CARRERAS[carrera]?.productoInicial ?? CARRERAS.multimedia.productoInicial);
  const parametros = parametrosDePais(pais);
  const perfil = perfilParaPais({ ...PERFIL_INICIAL, carrera: producto.carrera }, parametros.pais);
  const condiciones = {
    ...CONDICIONES_INICIALES,
    ...condicionesDePais(parametros),
    costosDirectos: costosDeProducto(producto, parametros),
  };
  const proyecto = {
    ...proyectoParaProducto(producto, { perfil, parametros, condiciones }),
    fechaInicio: hoyISO(),
  };
  return {
    perfil,
    proyecto,
    condiciones,
    parametros,
    cambio: CAMBIO_INICIAL,
    paso: 0,
    historial: [],
    siguienteNumero: 1,
  };
}
