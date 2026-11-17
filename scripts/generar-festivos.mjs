#!/usr/bin/env node
/**
 * Genera src/datos/festivos.js con los festivos nacionales de cada país
 * (2026 y 2027) que caen entre lunes y viernes, con su nombre en español,
 * inglés y portugués.
 *
 * Usa la librería date-holidays solo aquí (dependencia de desarrollo): la app
 * lee el archivo generado y no necesita la librería.
 * Colombia no se toma de aquí: sus fechas salen de src/logica/calendario.js
 * (Ley Emiliani), y de aquí solo se usan los nombres traducidos.
 *
 * Uso: npm run festivos
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Holidays from 'date-holidays';
import { PAISES } from '../src/datos/paises.js';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const ANIOS = [2026, 2027];
const IDIOMAS = ['es', 'en', 'pt'];

// Timor-Leste no está en date-holidays: lista de la Ley 10/2005 y sus reformas
// (fechas fijas, Viernes Santo y Corpus Christi; las fiestas islámicas son aproximadas).
const TIMOR = {
  2026: [
    ['2026-01-01', 'Año Nuevo', "New Year's Day", 'Ano Novo'],
    ['2026-03-03', 'Día de los Veteranos', "Veterans' Day", 'Dia dos Veteranos'],
    ['2026-03-20', 'Idul Fitri (aprox.)', 'Eid al-Fitr (approx.)', 'Idul Fitri (aprox.)'],
    ['2026-04-03', 'Viernes Santo', 'Good Friday', 'Sexta-feira Santa'],
    ['2026-05-01', 'Día del Trabajo', 'Labour Day', 'Dia do Trabalhador'],
    ['2026-05-20', 'Día de la Restauración de la Independencia', 'Restoration of Independence Day', 'Dia da Restauração da Independência'],
    ['2026-05-27', 'Idul Adha (aprox.)', 'Eid al-Adha (approx.)', 'Idul Adha (aprox.)'],
    ['2026-06-04', 'Corpus Christi', 'Corpus Christi', 'Corpo de Deus'],
    ['2026-08-30', 'Día de la Consulta Popular', 'Popular Consultation Day', 'Dia da Consulta Popular'],
    ['2026-11-01', 'Todos los Santos', "All Saints' Day", 'Dia de Todos os Santos'],
    ['2026-11-02', 'Día de los Difuntos', "All Souls' Day", 'Dia de Finados'],
    ['2026-11-12', 'Día de la Juventud', 'National Youth Day', 'Dia Nacional da Juventude'],
    ['2026-11-28', 'Proclamación de la Independencia', 'Proclamation of Independence Day', 'Dia da Proclamação da Independência'],
    ['2026-12-07', 'Día de la Memoria', 'Memorial Day', 'Dia da Memória'],
    ['2026-12-08', 'Inmaculada Concepción', 'Immaculate Conception', 'Imaculada Conceição'],
    ['2026-12-25', 'Navidad', 'Christmas Day', 'Natal'],
    ['2026-12-31', 'Día de los Héroes Nacionales', 'National Heroes Day', 'Dia dos Heróis Nacionais'],
  ],
  2027: [
    ['2027-01-01', 'Año Nuevo', "New Year's Day", 'Ano Novo'],
    ['2027-03-03', 'Día de los Veteranos', "Veterans' Day", 'Dia dos Veteranos'],
    ['2027-03-10', 'Idul Fitri (aprox.)', 'Eid al-Fitr (approx.)', 'Idul Fitri (aprox.)'],
    ['2027-03-26', 'Viernes Santo', 'Good Friday', 'Sexta-feira Santa'],
    ['2027-05-01', 'Día del Trabajo', 'Labour Day', 'Dia do Trabalhador'],
    ['2027-05-17', 'Idul Adha (aprox.)', 'Eid al-Adha (approx.)', 'Idul Adha (aprox.)'],
    ['2027-05-20', 'Día de la Restauración de la Independencia', 'Restoration of Independence Day', 'Dia da Restauração da Independência'],
    ['2027-05-27', 'Corpus Christi', 'Corpus Christi', 'Corpo de Deus'],
    ['2027-08-30', 'Día de la Consulta Popular', 'Popular Consultation Day', 'Dia da Consulta Popular'],
    ['2027-11-01', 'Todos los Santos', "All Saints' Day", 'Dia de Todos os Santos'],
    ['2027-11-02', 'Día de los Difuntos', "All Souls' Day", 'Dia de Finados'],
    ['2027-11-12', 'Día de la Juventud', 'National Youth Day', 'Dia Nacional da Juventude'],
    ['2027-11-28', 'Proclamación de la Independencia', 'Proclamation of Independence Day', 'Dia da Proclamação da Independência'],
    ['2027-12-07', 'Día de la Memoria', 'Memorial Day', 'Dia da Memória'],
    ['2027-12-08', 'Inmaculada Concepción', 'Immaculate Conception', 'Imaculada Conceição'],
    ['2027-12-25', 'Navidad', 'Christmas Day', 'Natal'],
    ['2027-12-31', 'Día de los Héroes Nacionales', 'National Heroes Day', 'Dia dos Heróis Nacionais'],
  ],
};

const iso = (d) => d.slice(0, 10);
const salida = {};
for (const id of Object.keys(PAISES).sort()) {
  salida[id] = {};
  for (const anio of ANIOS) {
    if (id === 'TL') {
      salida[id][anio] = TIMOR[anio].map(([fecha, es, en, pt]) => [fecha, { es, en, pt }]);
      continue;
    }
    const porFecha = new Map();
    for (const idioma of IDIOMAS) {
      const hd = new Holidays(id, { languages: [idioma], types: ['public'] });
      for (const festivo of hd.getHolidays(anio, idioma)) {
        if (festivo.type !== 'public') continue;
        const fecha = iso(festivo.date);
        if (!porFecha.has(fecha)) porFecha.set(fecha, {});
        const nombres = porFecha.get(fecha);
        if (!nombres[idioma]) nombres[idioma] = festivo.name;
      }
    }
    salida[id][anio] = [...porFecha.entries()].sort(([a], [b]) => a.localeCompare(b));
  }
  // Los festivos que caen en sábado o domingo no cambian los días hábiles: se omiten.
  for (const anio of ANIOS) {
    salida[id][anio] = salida[id][anio].filter(([fecha]) => {
      const dia = new Date(`${fecha}T12:00:00`).getDay();
      return dia !== 0 && dia !== 6;
    });
  }
}

const cuerpo = Object.entries(salida)
  .map(([id, anios]) => {
    const lineas = Object.entries(anios)
      .map(([anio, lista]) => `    ${anio}: [\n${lista.map(([f, n]) => `      [${JSON.stringify(f)}, ${JSON.stringify(n)}],`).join('\n')}\n    ],`)
      .join('\n');
    return `  ${id}: {\n${lineas}\n  },`;
  })
  .join('\n');

const archivo = `/**
 * Festivos nacionales por país (${ANIOS.join(' y ')}), con su nombre en español, inglés y portugués.
 * Archivo generado por scripts/generar-festivos.mjs (npm run festivos): no lo edites a mano.
 * Fuente: librería date-holidays ${(await import('date-holidays/package.json', { with: { type: 'json' } })).default.version}; Timor-Leste, lista propia.
 * Colombia usa sus propias reglas (src/logica/calendario.js); de aquí solo toma los nombres.
 */
export const ANIOS_FESTIVOS = ${JSON.stringify(ANIOS)};

export const FESTIVOS = {
${cuerpo}
};
`;
writeFileSync(join(RAIZ, 'src', 'datos', 'festivos.js'), archivo);
console.log('src/datos/festivos.js generado:', Object.keys(salida).length, 'países');
