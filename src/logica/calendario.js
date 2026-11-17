/**
 * Calendario laboral: festivos de Colombia (Ley 51 de 1983, "Ley Emiliani"),
 * festivos de los demás países (tabla de src/datos/festivos.js) y suma de días
 * hábiles para estimar la fecha de entrega.
 */
import { FESTIVOS } from '../datos/festivos.js';

/** Domingo de Pascua (algoritmo de Meeus/Jones/Butcher, calendario gregoriano). */
export function domingoDePascua(anio) {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(anio, mes - 1, dia);
}

function sumarDias(fecha, dias) {
  const nueva = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  nueva.setDate(nueva.getDate() + dias);
  return nueva;
}

/** Ley Emiliani: si el festivo no cae lunes, se pasa al lunes siguiente. */
function alLunesSiguiente(fecha) {
  const diaSemana = fecha.getDay();
  const desplazamiento = (8 - diaSemana) % 7;
  return sumarDias(fecha, desplazamiento);
}

const cache = new Map();

/** Lista de festivos de Colombia para un año: [{ fecha, nombre }] ordenados. */
export function festivosColombia(anio) {
  if (cache.has(anio)) return cache.get(anio);

  const fijos = [
    [0, 1, 'Año Nuevo'],
    [4, 1, 'Día del Trabajo'],
    [6, 20, 'Día de la Independencia'],
    [7, 7, 'Batalla de Boyacá'],
    [11, 8, 'Inmaculada Concepción'],
    [11, 25, 'Navidad'],
  ].map(([mes, dia, nombre]) => ({ fecha: new Date(anio, mes, dia), nombre }));

  const trasladables = [
    [0, 6, 'Día de los Reyes Magos'],
    [2, 19, 'San José'],
    [5, 29, 'San Pedro y San Pablo'],
    [7, 15, 'Asunción de la Virgen'],
    [9, 12, 'Día de la Raza'],
    [10, 1, 'Todos los Santos'],
    [10, 11, 'Independencia de Cartagena'],
  ].map(([mes, dia, nombre]) => ({ fecha: alLunesSiguiente(new Date(anio, mes, dia)), nombre }));

  const pascua = domingoDePascua(anio);
  const religiosos = [
    { fecha: sumarDias(pascua, -3), nombre: 'Jueves Santo' },
    { fecha: sumarDias(pascua, -2), nombre: 'Viernes Santo' },
    { fecha: alLunesSiguiente(sumarDias(pascua, 39)), nombre: 'Ascensión del Señor' },
    { fecha: alLunesSiguiente(sumarDias(pascua, 60)), nombre: 'Corpus Christi' },
    { fecha: alLunesSiguiente(sumarDias(pascua, 68)), nombre: 'Sagrado Corazón de Jesús' },
  ];

  const lista = [...fijos, ...trasladables, ...religiosos].sort((x, y) => x.fecha - y.fecha);
  cache.set(anio, lista);
  return lista;
}

/** 'AAAA-MM-DD' de una fecha local. */
export function aISO(fecha) {
  const a = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

/** Fecha local a partir de 'AAAA-MM-DD' (sin problemas de zona horaria). */
export function desdeISO(texto) {
  const coincide = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(texto || ''));
  if (!coincide) return null;
  const fecha = new Date(Number(coincide[1]), Number(coincide[2]) - 1, Number(coincide[3]));
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

export function hoyISO() {
  return aISO(new Date());
}

const IDIOMA_PAIS = { CO: 'es' };
const cachePaises = new Map();

/**
 * Festivos de un país en un año: [{ fecha, nombre, nombres: { es, en, pt } }].
 * Colombia se calcula con la Ley Emiliani; los demás salen de la tabla generada
 * (si el año no está en la tabla, no se cuentan festivos).
 */
export function festivosDelPais(pais = 'CO', anio, idiomaPais = 'es') {
  const clave = `${pais}-${anio}`;
  if (cachePaises.has(clave)) return cachePaises.get(clave);
  let lista;
  if (pais === 'CO') {
    const nombresPorFecha = new Map((FESTIVOS.CO?.[anio] ?? []).map(([fecha, nombres]) => [fecha, nombres]));
    lista = festivosColombia(anio).map((f) => ({
      ...f,
      nombres: { ...(nombresPorFecha.get(aISO(f.fecha)) ?? {}), es: f.nombre },
    }));
  } else {
    lista = (FESTIVOS[pais]?.[anio] ?? []).map(([fecha, nombres]) => ({
      fecha: desdeISO(fecha),
      nombre: nombres[IDIOMA_PAIS[pais] ?? idiomaPais] ?? nombres.es ?? Object.values(nombres)[0],
      nombres,
    }));
  }
  cachePaises.set(clave, lista);
  return lista;
}

/** Devuelve el festivo de esa fecha o null. */
export function festivoDe(fecha, pais = 'CO') {
  const iso = aISO(fecha);
  return festivosDelPais(pais, fecha.getFullYear()).find((f) => aISO(f.fecha) === iso) ?? null;
}

export function esDiaHabil(fecha, pais = 'CO') {
  const dia = fecha.getDay();
  if (dia === 0 || dia === 6) return false;
  return festivoDe(fecha, pais) === null;
}

/**
 * Cuenta días hábiles desde la fecha de inicio (incluida si es hábil).
 * Devuelve la fecha del último día de trabajo y los festivos que hay en el periodo.
 */
export function sumarDiasHabiles(inicio, diasHabiles, pais = 'CO') {
  const dias = Math.max(1, Math.ceil(diasHabiles));
  let fecha = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
  let contados = 0;
  const festivos = [];
  let guardia = 0;
  while (guardia < 5000) {
    guardia += 1;
    const festivo = festivoDe(fecha, pais);
    const finDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;
    if (festivo && !finDeSemana) festivos.push(festivo);
    if (!festivo && !finDeSemana) {
      contados += 1;
      if (contados >= dias) break;
    }
    fecha = sumarDias(fecha, 1);
  }
  const diasCalendario = Math.round((fecha - new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate())) / 86_400_000) + 1;
  return { fin: fecha, festivos, diasHabiles: dias, diasCalendario };
}
