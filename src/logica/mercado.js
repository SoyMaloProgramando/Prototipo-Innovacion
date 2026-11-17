import { GESTION_PROYECTO, NIVELES_COMPLEJIDAD } from '../datos/parametros.js';
import { limitar } from './formato.js';
import { horasPorRonda, horasSugeridas } from './horas.js';
import { bandasDePais } from './paises.js';

/**
 * Horas que facturaría un profesional típico por este alcance:
 * horas del catálogo + imprevistos del nivel + gestión + 2 rondas de revisión.
 */
export function horasReferenciaMercado(producto, unidades, complejidad) {
  const nivel = NIVELES_COMPLEJIDAD[complejidad] ?? NIVELES_COMPLEJIDAD.intermedio;
  const horas = horasSugeridas(producto, unidades, complejidad);
  const revisiones = producto.aplicaRevisiones === false ? 0 : 2 * horasPorRonda(horas);
  return horas * (1 + nivel.imprevistos + GESTION_PROYECTO) + revisiones;
}

/** Rangos de precio junior, semi-senior y senior para el mismo alcance, en la moneda del país. */
export function rangosMercado({ producto, unidades, complejidad, costosDirectos = 0, pais = 'CO' }) {
  const bandas = bandasDePais(pais);
  const banda = bandas[producto.area] ?? bandas.desarrollo;
  const horas = horasReferenciaMercado(producto, unidades, complejidad);
  const rango = ([tarifaMin, tarifaMax]) => ({
    min: horas * tarifaMin + costosDirectos,
    max: horas * tarifaMax + costosDirectos,
    tarifaMin,
    tarifaMax,
  });
  return {
    area: banda,
    horas,
    junior: rango(banda.junior),
    semi: rango(banda.semi),
    senior: rango(banda.senior),
  };
}

const ETIQUETAS = {
  debajo: 'Por debajo del rango junior',
  junior: 'Dentro del rango junior',
  'junior-semi': 'Entre junior y semi-senior',
  semi: 'Dentro del rango semi-senior',
  'semi-senior': 'Entre semi-senior y senior',
  senior: 'Dentro del rango senior',
  encima: 'Por encima del rango senior',
};

/**
 * Ubica un valor frente a tres rangos { junior, semi, senior } con { min, max }.
 * Sirve tanto para precios como para tarifas por hora.
 */
export function clasificarEnRangos(valor, { junior, semi, senior }) {
  let nivel;
  if (valor < junior.min) nivel = 'debajo';
  else if (valor <= junior.max) nivel = 'junior';
  else if (valor < semi.min) nivel = 'junior-semi';
  else if (valor <= semi.max) nivel = 'semi';
  else if (valor < senior.min) nivel = 'semi-senior';
  else if (valor <= senior.max) nivel = 'senior';
  else nivel = 'encima';
  const fraccion = limitar((valor - junior.min) / (senior.max - junior.min), 0, 1);
  return { nivel, etiqueta: ETIQUETAS[nivel], fraccion };
}

/** Rangos por hora (tarifas todo incluido) del área del producto en el país. */
export function rangosPorHora(producto, pais = 'CO') {
  const bandas = bandasDePais(pais);
  const banda = bandas[producto.area] ?? bandas.desarrollo;
  const rango = ([min, max]) => ({ min, max });
  return { junior: rango(banda.junior), semi: rango(banda.semi), senior: rango(banda.senior) };
}
