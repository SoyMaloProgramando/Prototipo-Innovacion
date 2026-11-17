/**
 * Motor de cálculo de TarifaJusta.
 *
 * Recibe el estado de React (perfil, proyecto, condiciones y parámetros) y
 * devuelve la cotización completa: horas, tarifas, desglose del precio, rango,
 * comparación con el mercado, lo que te queda, fechas, pagos y recomendaciones.
 * Son funciones puras: no guardan nada y no tocan la interfaz.
 */
import { DERECHOS, ESQUEMAS_PAGO, MERCADOS, NIVELES_COMPLEJIDAD, RETENCIONES, TIPOS_CLIENTE, URGENCIA } from '../datos/parametros.js';
import { buscarCategoria, buscarProducto } from '../datos/catalogo.js';
import { buscarPais } from '../datos/paises.js';
import { desdeISO, sumarDiasHabiles } from './calendario.js';
import { limitar, redondeoComercial, sumar } from './formato.js';
import { calcularHoras, horasSugeridas } from './horas.js';
import { aporteMinimoMensual, opcionesRetencion, resolverRetencion, tasaRetencion, tasaSeguridadSocial } from './impuestos.js';
import { clasificarEnRangos, rangosMercado, rangosPorHora } from './mercado.js';
import { aMonedaLocal } from './paises.js';
import { evaluarChequeos, generarRecomendaciones } from './recomendaciones.js';
import {
  factoresPerfil,
  gastosNegocioMes,
  horasFacturablesMes,
  necesidadMensual,
  tarifaMinima,
} from './tarifas.js';

/** Factor que separa el precio de apertura (para negociar) del precio sugerido. */
export const FACTOR_APERTURA = 1.15;

/**
 * Convierte los costos directos activos a la moneda del país.
 * Acepta el parámetro viejo `trm` (número) para Colombia.
 */
export function costosDirectosEnPesos(costos = [], parametrosOTrm) {
  const parametros = typeof parametrosOTrm === 'number' ? { moneda: 'COP', trm: parametrosOTrm } : parametrosOTrm ?? {};
  return costos
    .filter((c) => c.activo)
    .map((c) => {
      const valorLocal = aMonedaLocal(c.valor, c.moneda ?? parametros.moneda ?? 'COP', parametros);
      return { ...c, valorLocal, valorCOP: valorLocal };
    });
}

/** Redondea al centavo en monedas con decimales y a la unidad en las demás. */
function redondearUnidad(valor, decimales) {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

/**
 * Calcula la cotización completa.
 * @param {object} estado  { perfil, proyecto, condiciones, parametros }
 * @param {object} opciones { ligero: true } omite calendario y recomendaciones (para gráficas).
 */
export function calcularCotizacion(estado, opciones = {}) {
  const { perfil, proyecto, condiciones, parametros } = estado;
  const pais = buscarPais(parametros.pais);
  const moneda = parametros.moneda ?? pais.moneda.codigo;
  const producto = buscarProducto(proyecto.productoId);
  const categoria = buscarCategoria(producto.categoria);
  const nivel = NIVELES_COMPLEJIDAD[proyecto.complejidad] ?? NIVELES_COMPLEJIDAD.intermedio;
  const especialidad = limitar(Number(proyecto.especialidad) || 0, 0, 100);
  const unidades = Math.max(0, Number(proyecto.unidades) || 0);

  // 1. Horas ─────────────────────────────────────────────────────────
  const horasCatalogo = horasSugeridas(producto, unidades, nivel.id);
  const horasEstimadas = proyecto.horasManual ? Math.max(0, Number(proyecto.horasEstimadas) || 0) : horasCatalogo;
  const horas = calcularHoras({
    horasEstimadas,
    especialidad,
    complejidad: nivel.id,
    revisiones: proyecto.revisiones,
    aplicaRevisiones: producto.aplicaRevisiones,
    imprevistosManual: condiciones.imprevistosAuto ? null : (Number(condiciones.imprevistosManual) || 0) / 100,
  });

  // 2. Tarifa ────────────────────────────────────────────────────────
  const horasMes = horasFacturablesMes(perfil);
  const minima = tarifaMinima(perfil);
  const negocio = gastosNegocioMes(perfil);
  const costoOperativoHora = negocio.total / horasMes;
  const factores = factoresPerfil(perfil, especialidad);
  const deseada = Math.max(0, Number(proyecto.tarifaDeseada) || 0);
  const ajustada = redondearUnidad(deseada * factores.total, pais.moneda.decimales);

  // 3. Mano de obra y costos operativos ─────────────────────────────
  const manoDeObra = horas.facturables * ajustada;
  const costosOperativos = horas.facturables * costoOperativoHora;

  // 4. Ajustes comerciales ──────────────────────────────────────────
  const cliente = TIPOS_CLIENTE[condiciones.tipoCliente] ?? TIPOS_CLIENTE.pyme;
  const urgencia = URGENCIA[proyecto.urgencia] ?? URGENCIA.normal;
  const derechos = DERECHOS[condiciones.derechos] ?? DERECHOS.uso;
  const mercadoCliente = MERCADOS[condiciones.mercado] ?? MERCADOS.nacional;
  const multiplicadores = {
    cliente: cliente.factor,
    urgencia: urgencia.factor,
    derechos: derechos.factor,
    mercado: mercadoCliente.factor,
  };
  const multiplicador = multiplicadores.cliente * multiplicadores.urgencia * multiplicadores.derechos * multiplicadores.mercado;
  const baseServicio = manoDeObra + costosOperativos;
  const ajusteComercial = baseServicio * (multiplicador - 1);
  const subtotalServicio = baseServicio + ajusteComercial;

  // 5. Utilidad ─────────────────────────────────────────────────────
  const margen = Math.max(0, Number(condiciones.margen) || 0) / 100;
  const utilidad = subtotalServicio * margen;
  const antesDeAportes = subtotalServicio + utilidad;

  // 6. Seguridad social (se suma para que tu ganancia no se reduzca al pagarla)
  const tasaAportes = tasaSeguridadSocial(parametros);
  const seguridadSocial = condiciones.incluirSeguridadSocial ? (antesDeAportes * tasaAportes) / (1 - tasaAportes) : 0;
  const precioServicio = antesDeAportes + seguridadSocial;

  // 7. Costos directos, retención, redondeo e IVA ───────────────────
  const itemsDirectos = costosDirectosEnPesos(condiciones.costosDirectos, { ...parametros, moneda });
  const costosDirectos = sumar(itemsDirectos.map((c) => c.valorLocal));
  const precioConCostos = precioServicio + costosDirectos;

  const retencionId = resolverRetencion(condiciones, producto, parametros);
  const retencionTasa = tasaRetencion(retencionId, parametros);
  const compensacionRetencion =
    condiciones.compensarRetencion && retencionTasa > 0 ? (precioConCostos * retencionTasa) / (1 - retencionTasa) : 0;
  const antesDeRedondeo = precioConCostos + compensacionRetencion;
  const precio = redondeoComercial(antesDeRedondeo, moneda);
  const redondeo = precio - antesDeRedondeo;
  const iva = condiciones.responsableIva ? precio * parametros.iva : 0;
  const total = precio + iva;

  // 8. Lo que te queda ──────────────────────────────────────────────
  const retencion = precio * retencionTasa;
  const consignado = total - retencion;
  const aportesAPagar = tasaAportes * Math.max(0, precio - costosDirectos);
  const gmf = condiciones.gmf && Number(parametros.gmf) > 0 ? consignado * parametros.gmf : 0;
  const ganancia = consignado - iva - aportesAPagar - costosDirectos - costosOperativos - gmf;

  // 9. Rango de precio y mercado ────────────────────────────────────
  const piso = redondeoComercial((horas.facturables * (minima + costoOperativoHora)) / (1 - tasaAportes) + costosDirectos, moneda);
  const apertura = redondeoComercial(precio * FACTOR_APERTURA, moneda);
  const mercado = rangosMercado({ producto, unidades, complejidad: nivel.id, costosDirectos, pais: pais.id });
  const posicion = clasificarEnRangos(precio, mercado);
  const tarifaEfectiva = horas.facturables > 0 ? precioServicio / horas.facturables : 0;
  const posicionTarifa = clasificarEnRangos(tarifaEfectiva, rangosPorHora(producto, pais.id));

  // 10. Pagos ───────────────────────────────────────────────────────
  const esquema = ESQUEMAS_PAGO[condiciones.esquemaPago] ?? ESQUEMAS_PAGO['50-50'];
  let acumulado = 0;
  const cuotas = esquema.cuotas.map((cuota, indice, lista) => {
    const valor = indice === lista.length - 1 ? total - acumulado : redondearUnidad(total * cuota.porcentaje, pais.moneda.decimales);
    acumulado += valor;
    return { ...cuota, valor };
  });

  // 11. Composición del precio (sin valores negativos, para gráficas) ─
  const distribucion = [
    { id: 'trabajo', etiqueta: 'Tu trabajo', valor: manoDeObra * multiplicador },
    { id: 'operativos', etiqueta: 'Costos operativos', valor: costosOperativos * multiplicador },
    { id: 'utilidad', etiqueta: 'Utilidad', valor: utilidad },
    { id: 'aportes', etiqueta: 'Seguridad social', valor: seguridadSocial },
    { id: 'directos', etiqueta: 'Costos directos', valor: costosDirectos },
    { id: 'retencion', etiqueta: 'Retención compensada', valor: compensacionRetencion },
    { id: 'redondeo', etiqueta: 'Redondeo', valor: redondeo },
    { id: 'iva', etiqueta: 'IVA', valor: iva },
  ].filter((parte) => parte.valor > 0.5);

  const resultado = {
    pais: {
      id: pais.id,
      moneda,
      ivaNombre: parametros.ivaNombre ?? 'IVA',
      iva: Number(parametros.iva) || 0,
      gmfNombre: parametros.gmfNombre ?? null,
    },
    producto,
    categoria,
    nivel,
    unidades,
    especialidad,
    horasCatalogo,
    horasManual: Boolean(proyecto.horasManual),
    horas,
    tarifas: {
      deseada,
      ajustada,
      minima,
      costoOperativoHora,
      efectiva: tarifaEfectiva,
      factores,
      horasMes,
      necesidadMensual: necesidadMensual(perfil),
      gastosNegocio: negocio,
    },
    multiplicadores: { ...multiplicadores, total: multiplicador },
    precio: {
      manoDeObra,
      costosOperativos,
      baseServicio,
      ajusteComercial,
      subtotalServicio,
      margen,
      utilidad,
      antesDeAportes,
      tasaAportes,
      seguridadSocial,
      precioServicio,
      itemsDirectos,
      costosDirectos,
      retencionId,
      retencionNombre: (pais.id === 'CO' ? RETENCIONES[retencionId]?.nombre : opcionesRetencion(parametros).find((x) => x.id === retencionId)?.nombre) ?? '',
      retencionTasa,
      compensacionRetencion,
      antesDeRedondeo,
      redondeo,
      sinIva: precio,
      iva,
      total,
    },
    neto: {
      total,
      retencion,
      consignado,
      iva,
      aportes: aportesAPagar,
      costosDirectos,
      costosOperativos,
      gmf,
      ganancia,
      margenNeto: total > 0 ? ganancia / total : 0,
      porHoraFacturable: horas.facturables > 0 ? ganancia / horas.facturables : 0,
      porHoraReal: horas.reales > 0 ? ganancia / horas.reales : 0,
      aporteMinimoMensual: aporteMinimoMensual(parametros),
    },
    rango: { piso, sugerido: precio, apertura },
    mercado: { ...mercado, posicion, posicionTarifa },
    pagos: { esquema, cuotas },
    distribucion,
    equivalencias: {
      usd: parametros.trm > 0 ? precio / parametros.trm : 0,
      salariosMinimos: parametros.smmlv > 0 ? precio / parametros.smmlv : 0,
      uvt: parametros.uvt > 0 ? precio / parametros.uvt : null,
    },
    contexto: { cliente, urgencia, derechos, mercadoCliente },
  };

  if (opciones.ligero) return resultado;

  // 12. Tiempo de entrega ───────────────────────────────────────────
  const horasDia = Math.max(0.5, Number(proyecto.horasDia) || 0) * urgencia.ritmo;
  const diasHabiles = Math.max(1, Math.ceil(horas.reales / horasDia));
  const inicio = desdeISO(proyecto.fechaInicio) ?? new Date();
  const calendario = sumarDiasHabiles(inicio, diasHabiles, pais.id);
  resultado.entrega = {
    inicio,
    horasDia,
    diasHabiles,
    semanas: diasHabiles / 5,
    fin: calendario.fin,
    festivos: calendario.festivos,
    diasCalendario: calendario.diasCalendario,
  };

  resultado.chequeos = evaluarChequeos(resultado, estado);
  const aprobados = resultado.chequeos.filter((c) => c.ok).length;
  resultado.salud = Math.round((aprobados / resultado.chequeos.length) * 100);
  resultado.recomendaciones = generarRecomendaciones(resultado, estado);
  return resultado;
}

/** Precio sugerido para cada nivel de dominio de 0 a 100 %. */
export function curvaDominio(estado, paso = 5) {
  const puntos = [];
  for (let especialidad = 0; especialidad <= 100; especialidad += paso) {
    const r = calcularCotizacion({ ...estado, proyecto: { ...estado.proyecto, especialidad } }, { ligero: true });
    puntos.push({ especialidad, precio: r.precio.sinIva, piso: r.rango.piso });
  }
  return puntos;
}

/** Precio con las horas del catálogo en cada nivel de complejidad. */
export function comparativoComplejidad(estado) {
  return Object.values(NIVELES_COMPLEJIDAD).map((nivel) => {
    const r = calcularCotizacion(
      { ...estado, proyecto: { ...estado.proyecto, complejidad: nivel.id, horasManual: false } },
      { ligero: true },
    );
    return { id: nivel.id, nombre: nivel.nombre, precio: r.precio.sinIva, horas: r.horas.facturables };
  });
}
