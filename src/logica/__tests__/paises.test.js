import { describe, expect, it } from 'vitest';
import { PAISES } from '../../datos/paises.js';
import { BANDAS_MERCADO } from '../../datos/parametros.js';
import { crearEstadoInicial } from '../../estado/estadoInicial.js';
import { ACCIONES, cotizadorReducer } from '../../estado/cotizadorReducer.js';
import { calcularCotizacion } from '../calculadora.js';
import { aISO, esDiaHabil, festivosDelPais } from '../calendario.js';
import { crearFormato, pasoComercial, redondeoComercial } from '../formato.js';
import { opcionesRetencion, resolverRetencion, tasaSeguridadSocial } from '../impuestos.js';
import { aMonedaLocal, bandasDePais, factoresMercado, notaDePais, parametrosDePais, perfilDePais } from '../paises.js';

const LISTA = Object.values(PAISES);
const CONDICIONES_EMPRESA = { tipoCliente: 'pyme', mercado: 'nacional', retencion: 'auto' };

describe('países de habla hispana y portuguesa', () => {
  it('son 29 y todos tienen parámetros en su propia moneda', () => {
    expect(LISTA).toHaveLength(29);
    for (const pais of LISTA) {
      const p = parametrosDePais(pais.id);
      expect(p.pais, pais.id).toBe(pais.id);
      expect(p.moneda, pais.id).toBe(pais.moneda.codigo);
      expect(p.trm, pais.id).toBeGreaterThan(0);
      if (pais.moneda.codigo === 'USD') expect(p.trm, pais.id).toBe(1);
      expect(p.iva, pais.id).toBeGreaterThanOrEqual(0);
      expect(p.iva, pais.id).toBeLessThan(0.3);
      expect(tasaSeguridadSocial(p), pais.id).toBeGreaterThanOrEqual(0);
      expect(tasaSeguridadSocial(p), pais.id).toBeLessThan(0.4);
    }
  });

  it('Colombia conserva sus aportes detallados: 40 % × (12,5 % + 16 % + 0,522 %)', () => {
    const p = parametrosDePais('CO');
    expect(p.aportesEfectivos).toBeNull();
    expect(tasaSeguridadSocial(p)).toBeCloseTo(0.116088);
  });

  it('los demás países usan una tasa efectiva de aportes', () => {
    expect(tasaSeguridadSocial(parametrosDePais('ES'))).toBeCloseTo(0.175);
    expect(tasaSeguridadSocial(parametrosDePais('CL'))).toBe(0);
  });

  it('cada país tiene sus notas de impuestos, aportes y retención en los tres idiomas', () => {
    for (const pais of LISTA.filter((p) => p.id !== 'CO')) {
      for (const tema of ['iva', 'aportes', 'retencion']) {
        for (const idioma of ['es', 'en', 'pt']) {
          expect(notaDePais(pais.id, tema, idioma).length, `${pais.id} ${tema} ${idioma}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it('los valores de ejemplo del perfil son positivos y están en la moneda del país', () => {
    for (const pais of LISTA) {
      const perfil = perfilDePais(pais.id);
      for (const valor of [...Object.values(perfil.gastos), ...Object.values(perfil.negocio), perfil.valorEquipo]) {
        expect(Number.isFinite(valor) && valor > 0, `${pais.id}: ${valor}`).toBe(true);
      }
    }
  });

  it('cotiza el producto de ejemplo en todos los países sin cifras raras', () => {
    for (const pais of LISTA) {
      for (const carrera of ['multimedia', 'sistemas']) {
        const estado = crearEstadoInicial(carrera, pais.id);
        estado.proyecto = { ...estado.proyecto, fechaInicio: '2026-11-03' };
        const r = calcularCotizacion(estado);
        const donde = `${pais.id}/${carrera}`;
        expect(r.precio.sinIva, donde).toBeGreaterThan(0);
        expect(r.rango.piso, donde).toBeLessThanOrEqual(r.precio.sinIva);
        const suma = r.distribucion.reduce((s, parte) => s + parte.valor, 0);
        expect(Math.abs(suma - r.precio.total), donde).toBeLessThan(1);
        for (const v of [r.precio.total, r.neto.consignado, r.neto.ganancia, r.tarifas.minima, r.mercado.junior.min]) {
          expect(Number.isFinite(v), donde).toBe(true);
        }
      }
    }
  });
});

describe('tarifas de mercado por país', () => {
  it('Colombia usa sus tarifas tal cual', () => {
    expect(bandasDePais('CO')).toBe(BANDAS_MERCADO);
    expect(factoresMercado('CO')).toEqual({ tecnologia: 1, creativo: 1 });
  });

  it('los demás países escalan las de Colombia con su factor de salarios', () => {
    for (const pais of LISTA.filter((p) => p.id !== 'CO')) {
      const bandas = bandasDePais(pais.id);
      const { tecnologia, creativo } = factoresMercado(pais.id);
      expect(tecnologia, pais.id).toBeGreaterThan(0);
      expect(creativo, pais.id).toBeGreaterThan(0);
      for (const banda of Object.values(bandas)) {
        expect(banda.junior[0], `${pais.id} ${banda.id}`).toBeLessThan(banda.junior[1]);
        expect(banda.junior[1], `${pais.id} ${banda.id}`).toBeLessThanOrEqual(banda.semi[1]);
        expect(banda.semi[1], `${pais.id} ${banda.id}`).toBeLessThanOrEqual(banda.senior[1]);
      }
      const desarrollo = bandas.desarrollo.junior[0] / BANDAS_MERCADO.desarrollo.junior[0];
      expect(desarrollo / tecnologia, pais.id).toBeGreaterThan(0.9);
      expect(desarrollo / tecnologia, pais.id).toBeLessThan(1.1);
    }
  });
});

describe('retención en la fuente por país', () => {
  const producto = { retencion: 'software35' };

  it('en España aplica sola la de nuevos profesionales y se puede elegir la general', () => {
    const p = parametrosDePais('ES');
    expect(resolverRetencion(CONDICIONES_EMPRESA, producto, p)).toBe('irpf7');
    expect(resolverRetencion({ ...CONDICIONES_EMPRESA, retencion: 'irpf15' }, producto, p)).toBe('irpf15');
    expect(opcionesRetencion(p).map((r) => r.id)).toEqual(['ninguna', 'irpf7', 'irpf15']);
  });

  it('no retienen las personas ni los clientes del exterior', () => {
    const p = parametrosDePais('MX');
    expect(resolverRetencion({ ...CONDICIONES_EMPRESA, tipoCliente: 'persona' }, producto, p)).toBe('ninguna');
    expect(resolverRetencion({ ...CONDICIONES_EMPRESA, mercado: 'internacional' }, producto, p)).toBe('ninguna');
  });

  it('las retenciones marcadas auto: false solo se aplican si se eligen', () => {
    const p = parametrosDePais('UY');
    expect(resolverRetencion(CONDICIONES_EMPRESA, producto, p)).toBe('ninguna');
    expect(resolverRetencion({ ...CONDICIONES_EMPRESA, retencion: 'irpf7' }, producto, p)).toBe('irpf7');
  });

  it('una retención de otro país no se cuela al cambiar de país', () => {
    expect(resolverRetencion({ ...CONDICIONES_EMPRESA, retencion: 'irpf15' }, producto, parametrosDePais('CO'))).toBe('software35');
  });
});

describe('cambio de país en el reducer', () => {
  it('cambia moneda, parámetros, valores de ejemplo y costos, y vuelve a Colombia', () => {
    let estado = crearEstadoInicial('sistemas', 'CO');
    estado = cotizadorReducer(estado, { tipo: ACCIONES.AGREGAR_COSTO, concepto: 'Plugin', valor: 159_150, moneda: 'COP' });
    estado = cotizadorReducer(estado, { tipo: ACCIONES.CAMBIAR_PAIS, pais: 'ES' });
    expect(estado.parametros.moneda).toBe('EUR');
    expect(estado.condiciones.responsableIva).toBe(true);
    expect(estado.perfil.gastos).toEqual(perfilDePais('ES').gastos);
    const propio = estado.condiciones.costosDirectos.find((c) => c.propio);
    expect(propio.moneda).toBe('EUR');
    expect(propio.valor).toBe(Math.round((159_150 / 3_183) * estado.parametros.trm * 100) / 100);
    expect(estado.condiciones.costosDirectos.filter((c) => !c.propio).every((c) => c.moneda !== 'COP')).toBe(true);

    estado = cotizadorReducer(estado, { tipo: ACCIONES.CAMBIAR_PAIS, pais: 'CO' });
    expect(estado.parametros).toEqual(parametrosDePais('CO'));
    expect(estado.condiciones.responsableIva).toBe(false);
  });

  it('Chile compensa la retención de las boletas desde el inicio', () => {
    expect(crearEstadoInicial('multimedia', 'CL').condiciones.compensarRetencion).toBe(true);
  });
});

describe('monedas', () => {
  it('redondea el precio con pasos cómodos en cada moneda', () => {
    expect(redondeoComercial(707_312, 'COP')).toBe(710_000);
    expect(redondeoComercial(1_786_100, 'COP')).toBe(1_790_000);
    expect(redondeoComercial(522.4, 'EUR')).toBe(525);
    expect(redondeoComercial(1_013.2, 'BRL')).toBe(1_020);
    expect(pasoComercial(98.7, 'USD')).toBe(0.5);
  });

  it('convierte costos del catálogo pasando por dólares', () => {
    const p = parametrosDePais('MX');
    expect(aMonedaLocal(10, 'USD', p)).toBeCloseTo(10 * p.trm);
    expect(aMonedaLocal(3_183, 'COP', p)).toBeCloseTo(p.trm);
    expect(aMonedaLocal(5, 'MXN', p)).toBe(5);
  });

  it('formatea según el idioma y el país', () => {
    expect(crearFormato({ idioma: 'es', pais: PAISES.CO }).dinero(710_000)).toBe('$ 710.000');
    expect(crearFormato({ idioma: 'pt', pais: PAISES.BR }).dinero(1_020)).toMatch(/^R\$\s1\.020$/);
    expect(crearFormato({ idioma: 'es', pais: PAISES.ES }).dinero(525)).toMatch(/^525\s€$/);
    expect(crearFormato({ idioma: 'en', pais: PAISES.MX }).dinero(4_100)).toBe('MXN 4,100');
    expect(crearFormato({ idioma: 'es', pais: PAISES.CO }).porcentaje(0.2)).toBe('20 %');
    expect(crearFormato({ idioma: 'en', pais: PAISES.CO }).porcentaje(0.2)).toBe('20%');
  });

  it('lee lo que se escribe: pesos sin centavos y tipos de cambio con decimales', () => {
    const co = crearFormato({ idioma: 'es', pais: PAISES.CO });
    expect(co.leerDinero('710.000')).toBe(710_000);
    expect(co.leerDinero('3.182,99', 4)).toBe(3182.99);
    expect(crearFormato({ idioma: 'es', pais: PAISES.MX }).leerDinero('18.824', 4)).toBe(18.824);
    expect(crearFormato({ idioma: 'en', pais: PAISES.CO }).leerDinero('3,182.99', 4)).toBe(3182.99);
    expect(crearFormato({ idioma: 'pt', pais: PAISES.BR }).leerDinero('1.020,50')).toBe(1020.5);
  });
});

describe('festivos de cada país', () => {
  const festivo = (pais, iso) => festivosDelPais(pais, Number(iso.slice(0, 4))).some((f) => aISO(f.fecha) === iso);

  it('incluye fiestas nacionales propias', () => {
    expect(festivo('MX', '2026-11-16')).toBe(true); // Revolución: tercer lunes de noviembre
    expect(festivo('BR', '2026-11-02')).toBe(true); // Finados
    expect(festivo('ES', '2026-10-12')).toBe(true); // Fiesta Nacional
    expect(festivo('AR', '2026-07-09')).toBe(true); // Independencia
    expect(festivo('PT', '2026-12-08')).toBe(true); // Imaculada Conceição
    expect(festivo('CO', '2026-11-16')).toBe(true); // Independencia de Cartagena (lunes)
  });

  it('un festivo no es día hábil y el fin de semana tampoco', () => {
    expect(esDiaHabil(new Date(2026, 10, 2), 'BR')).toBe(false);
    expect(esDiaHabil(new Date(2026, 10, 2), 'CO')).toBe(false);
    expect(esDiaHabil(new Date(2026, 10, 3), 'BR')).toBe(true);
    expect(esDiaHabil(new Date(2026, 10, 7), 'ES')).toBe(false);
  });
});
