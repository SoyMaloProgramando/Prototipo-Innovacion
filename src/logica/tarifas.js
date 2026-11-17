import {
  EXPERIENCIA,
  FACTOR_DOMINIO,
  FORMACION,
  PORTAFOLIO,
  SEMANAS_POR_MES,
} from '../datos/parametros.js';
import { limitar, pasoTarifa, redondearArriba, sumar } from './formato.js';
import { tasaSeguridadSocial } from './impuestos.js';
import { bandasDePais } from './paises.js';

/** Horas que realmente cobras al mes: horas por semana × 4,33 × % facturable. */
export function horasFacturablesMes(perfil) {
  const horas = (Number(perfil.horasSemana) || 0) * SEMANAS_POR_MES * ((Number(perfil.porcentajeFacturable) || 0) / 100);
  return Math.max(1, horas);
}

/** Gastos personales del mes (vivienda, alimentación, transporte y otros). */
export function gastosPersonalesMes(perfil) {
  return sumar(Object.values(perfil.gastos ?? {}));
}

/** Lo que necesitas ganar al mes para tus gastos más tu meta de ahorro. */
export function necesidadMensual(perfil) {
  return gastosPersonalesMes(perfil) * (1 + (Number(perfil.ahorro) || 0) / 100);
}

/** Tarifa mínima viable: lo mínimo que debes ganar por cada hora facturable. */
export function tarifaMinima(perfil) {
  return necesidadMensual(perfil) / horasFacturablesMes(perfil);
}

/** Gastos de tu negocio al mes, incluida la depreciación del equipo. */
export function gastosNegocioMes(perfil) {
  const negocio = perfil.negocio ?? {};
  const vidaUtil = Math.max(1, Number(perfil.vidaUtilAnios) || 1);
  const depreciacion = (Number(perfil.valorEquipo) || 0) / (vidaUtil * 12);
  const internet = Number(negocio.internet) || 0;
  const energia = Number(negocio.energia) || 0;
  const software = Number(negocio.software) || 0;
  const otros = Number(negocio.otros) || 0;
  return {
    internet,
    energia,
    software,
    otros,
    depreciacion,
    total: internet + energia + software + otros + depreciacion,
  };
}

/** Costo operativo que cada hora facturable debe cubrir. */
export function costoOperativoHora(perfil) {
  return gastosNegocioMes(perfil).total / horasFacturablesMes(perfil);
}

/** Factor de valor por dominio: 0 % → ×0,70, 50 % → ×1,00, 100 % → ×1,30. */
export function factorDominio(especialidad) {
  const e = limitar(Number(especialidad) || 0, 0, 100) / 100;
  return FACTOR_DOMINIO.minimo + (FACTOR_DOMINIO.maximo - FACTOR_DOMINIO.minimo) * e;
}

/** Todos los factores del perfil y su producto. */
export function factoresPerfil(perfil, especialidad) {
  const dominio = factorDominio(especialidad);
  const experiencia = (EXPERIENCIA[Number(perfil.proyectosPrevios)] ?? EXPERIENCIA[1]).factor;
  const portafolio = (PORTAFOLIO[perfil.portafolio] ?? PORTAFOLIO.basico).factor;
  const formacion = (FORMACION[perfil.formacion] ?? FORMACION.ninguna).factor;
  return {
    dominio,
    experiencia,
    portafolio,
    formacion,
    total: dominio * experiencia * portafolio * formacion,
  };
}

/**
 * Tarifa sugerida por hora para quien no sabe cuánto pedir.
 * Parte del punto medio del rango junior del área en el país (tarifa "todo incluido"),
 * le quita aportes, utilidad y costo operativo para dejar solo lo que te queda a ti,
 * y nunca baja de tu tarifa mínima viable. Se redondea hacia arriba: a 500 en pesos
 * colombianos y a un escalón proporcional en otras monedas.
 */
export function tarifaSugerida({ perfil, producto, parametros, margen }) {
  const bandas = bandasDePais(parametros?.pais ?? 'CO');
  const banda = bandas[producto.area] ?? bandas.desarrollo;
  const medio = (banda.junior[0] + banda.junior[1]) / 2;
  const tSS = tasaSeguridadSocial(parametros);
  const paraTi = (medio * (1 - tSS)) / (1 + (Number(margen) || 0) / 100) - costoOperativoHora(perfil);
  const valor = Math.max(paraTi, tarifaMinima(perfil));
  const paso = pasoTarifa(valor, parametros?.moneda ?? 'COP');
  return Math.round(redondearArriba(valor, paso) * 100) / 100;
}
