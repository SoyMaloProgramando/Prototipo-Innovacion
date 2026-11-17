import { describe, expect, it } from 'vitest';
import { buscarPais } from '../../datos/paises.js';
import { crearEstadoInicial } from '../../estado/estadoInicial.js';
import { calcularCotizacion } from '../../logica/calculadora.js';
import { crearFormato } from '../../logica/formato.js';
import { perfilDePais } from '../../logica/paises.js';
import { DICCIONARIOS, IDIOMAS, interpolar, traducir } from '../index.js';

/** Rutas de un texto: los objetos se recorren; cadenas, funciones y listas son hojas (la lista con su largo). */
function rutas(nodo, prefijo = '') {
  if (Array.isArray(nodo)) return [`${prefijo}[${nodo.length}]`];
  if (nodo && typeof nodo === 'object') {
    return Object.entries(nodo).flatMap(([clave, valor]) => rutas(valor, prefijo ? `${prefijo}.${clave}` : clave));
  }
  return [prefijo];
}

/** Lo mismo que arma el botón "!" en la app (useContextoEjemplos en Ayuda.jsx). */
function contextoEjemplos(idioma, paisId) {
  const estado = crearEstadoInicial('multimedia', paisId);
  estado.proyecto = { ...estado.proyecto, fechaInicio: '2026-10-31' };
  const r = calcularCotizacion(estado);
  const pais = buscarPais(paisId);
  return {
    t: (clave, valores) => traducir(idioma, clave, valores),
    idioma,
    f: crearFormato({ idioma, pais }),
    estado,
    r,
    p: estado.parametros,
    pais,
    ej: perfilDePais(paisId),
  };
}

const PAISES_PRUEBA = ['CO', 'MX', 'BR', 'ES', 'PT', 'AR', 'EC', 'CV'];
const RAROS = /undefined|NaN|\[object Object\]|\bnull\b|Infinity/;

describe('textos en tres idiomas', () => {
  it('inglés y portugués tienen todos los espacios del español', () => {
    const espacios = Object.keys(DICCIONARIOS.es).sort();
    expect(Object.keys(DICCIONARIOS.en).sort()).toEqual(espacios);
    expect(Object.keys(DICCIONARIOS.pt).sort()).toEqual(espacios);
  });

  for (const idioma of ['en', 'pt']) {
    it(`${idioma} tiene las mismas claves que el español en cada espacio que ya tradujo`, () => {
      for (const espacio of Object.keys(DICCIONARIOS[idioma] ?? {})) {
        expect(DICCIONARIOS.es[espacio], `el espacio ${espacio} no existe en español`).toBeDefined();
        const base = rutas(DICCIONARIOS.es[espacio]).sort();
        const otro = rutas(DICCIONARIOS[idioma][espacio]).sort();
        expect({ espacio, claves: otro }).toEqual({ espacio, claves: base });
      }
    });
  }

  it('interpola marcadores y deja los que no tienen valor', () => {
    expect(interpolar('Paso {n} de {total}', { n: 2, total: 4 })).toBe('Paso 2 de 4');
    expect(interpolar('Hola {nombre}', {})).toBe('Hola {nombre}');
  });

  it('usa el español si falta el texto en otro idioma, y la clave si no existe', () => {
    expect(traducir('en', 'comun.marca')).toBe(traducir('es', 'comun.marca'));
    expect(traducir('pt', 'no.existe.esta.clave')).toBe('no.existe.esta.clave');
  });
});

describe('explicaciones del botón "!"', () => {
  for (const { id: idioma } of IDIOMAS) {
    const explicaciones = DICCIONARIOS[idioma]?.explicaciones;
    if (!explicaciones) continue;
    it(`se arman sin errores en ${idioma} para varios países`, () => {
      for (const paisId of PAISES_PRUEBA) {
        const ctx = contextoEjemplos(idioma, paisId);
        for (const [clave, crudo] of Object.entries(explicaciones)) {
          expect(crudo && typeof crudo === 'object', `${idioma}.${clave} debe ser un objeto { que, ejemplo, nota }`).toBe(true);
          for (const parte of ['que', 'ejemplo', 'nota']) {
            const valor = typeof crudo[parte] === 'function' ? crudo[parte](ctx) : crudo[parte];
            if (valor === undefined || valor === '') continue;
            const donde = `${idioma}/${paisId}: ${clave}.${parte}`;
            expect(typeof valor, donde).toBe('string');
            expect(valor, donde).not.toMatch(RAROS);
          }
        }
      }
    });
  }
});
