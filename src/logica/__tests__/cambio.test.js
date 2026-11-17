import { describe, expect, it } from 'vitest';
import { crearEstadoInicial } from '../../estado/estadoInicial.js';
import { ACCIONES, cotizadorReducer } from '../../estado/cotizadorReducer.js';
import { obtenerTipoDeCambio, FUENTE_TRM, FUENTES_GENERALES } from '../../servicios/tipoDeCambio.js';
import { aplicarCambio, combinarCambio, filtrarTasas, leerRespuesta, MONEDAS_CON_CAMBIO } from '../cambio.js';
import { aMonedaLocal, parametrosDePais, referenciasDeCambio } from '../paises.js';

const REFERENCIAS = referenciasDeCambio();

// Respuestas reales (recortadas) de las tres fuentes, 31 de octubre de 2026.
const ER = {
  result: 'success',
  time_last_update_unix: 1793404951,
  base_code: 'USD',
  rates: { USD: 1, COP: 3164.0729, MXN: 18.824005, BRL: 5.397239, EUR: 0.895588, CUP: 24, ARS: 1537.3487, JPY: 152.3 },
};
const FA = { date: '2026-10-31', usd: { cop: 3221.49628687, mxn: 18.78733781, brl: 5.43935446, eur: 0.89589705, cup: 24.0636666 } };
const TRM = [{ valor: '3182.99', vigenciadesde: '2026-10-31T00:00:00.000' }];

describe('lectura de las API de tipo de cambio', () => {
  it('lee ExchangeRate-API, Currency API y la TRM oficial', () => {
    expect(leerRespuesta('exchangerate-api', ER)).toMatchObject({ fecha: '2026-10-31', tasas: { MXN: 18.824005 } });
    expect(leerRespuesta('currency-api', FA)).toMatchObject({ fecha: '2026-10-31', tasas: { COP: 3221.49628687, MXN: 18.78733781 } });
    expect(leerRespuesta('trm-colombia', TRM)).toEqual({ fecha: '2026-10-31', tasas: { COP: 3182.99 } });
  });

  it('devuelve null si la respuesta no tiene el formato esperado', () => {
    expect(leerRespuesta('exchangerate-api', { result: 'error', 'error-type': 'quota-reached' })).toBeNull();
    expect(leerRespuesta('currency-api', { fecha: 'x' })).toBeNull();
    expect(leerRespuesta('trm-colombia', [])).toBeNull();
    expect(leerRespuesta('trm-colombia', [{ valor: 'abc' }])).toBeNull();
    expect(leerRespuesta('otra', ER)).toBeNull();
  });
});

describe('validación de las tasas', () => {
  it('deja solo las monedas de la app y descarta las que no son creíbles', () => {
    const { tasas, descartadas } = filtrarTasas({ ...ER.rates, ARS: 1537.3487 * 10, BOB: -3 }, REFERENCIAS);
    expect(tasas).toMatchObject({ COP: 3164.0729, MXN: 18.824005, EUR: 0.895588 });
    expect(tasas.JPY).toBeUndefined(); // no es de ningún país de la app
    expect(tasas.USD).toBeUndefined();
    expect(tasas.BOB).toBeUndefined(); // negativa
    expect(tasas.CUP).toBeUndefined(); // Cuba se actualiza a mano: las API dan la tasa vieja de 24
    expect(descartadas).toEqual(['ARS']); // diez veces la guardada
  });

  it('cubre las 23 monedas de los 29 países (todas menos el dólar)', () => {
    expect(MONEDAS_CON_CAMBIO).toHaveLength(23);
    expect(MONEDAS_CON_CAMBIO).not.toContain('USD');
  });

  it('para el peso colombiano manda la TRM oficial', () => {
    const cambio = combinarCambio(
      { ...leerRespuesta('exchangerate-api', ER), fuente: 'exchangerate-api' },
      { ...leerRespuesta('trm-colombia', TRM), fuente: 'trm-colombia' },
      REFERENCIAS,
    );
    expect(cambio.tasas.COP).toBe(3182.99);
    expect(cambio.fuentes).toMatchObject({ COP: 'trm-colombia', MXN: 'exchangerate-api' });
    expect(combinarCambio(null, null, REFERENCIAS)).toBeNull();
  });
});

describe('uso de la tasa del día', () => {
  const cambio = { tasas: { COP: 3182.99, MXN: 18.824005, EUR: 0.895588 }, fuentes: { MXN: 'exchangerate-api' }, fechas: {}, fecha: '2026-10-31' };

  it('actualiza el dólar del país y el peso colombiano para el catálogo', () => {
    const p = aplicarCambio(parametrosDePais('MX'), cambio);
    expect(p).toMatchObject({ trm: 18.824005, trmFuente: 'api', trmFecha: '2026-10-31', trmProveedor: 'exchangerate-api', copPorDolar: 3182.99 });
    // 3.182,99 pesos colombianos = 1 dólar = 18,82 pesos mexicanos.
    expect(aMonedaLocal(3182.99, 'COP', p)).toBeCloseTo(18.824005);
  });

  it('no pisa un dólar escrito a mano, salvo que se pida', () => {
    const manual = { ...parametrosDePais('MX'), trm: 20, trmFuente: 'manual' };
    expect(aplicarCambio(manual, cambio).trm).toBe(20);
    expect(aplicarCambio(manual, cambio, { forzar: true }).trm).toBe(18.824005);
  });

  it('los países con dólar no cambian de tipo de cambio', () => {
    const p = aplicarCambio(parametrosDePais('EC'), cambio);
    expect(p.trm).toBe(1);
    expect(p.trmFuente).toBe('fijo');
  });

  it('sin tasa del día queda el dólar guardado', () => {
    const cuba = aplicarCambio(parametrosDePais('CU'), cambio);
    expect(cuba.trm).toBe(parametrosDePais('CU').trm);
    expect(cuba.trmFuente).toBe('datos');
    expect(cuba.copPorDolar).toBe(3182.99); // los costos del catálogo sí usan el peso colombiano del día
    expect(aplicarCambio(parametrosDePais('MX'), null)).toEqual(parametrosDePais('MX'));
  });
});

describe('tipo de cambio en el reducer', () => {
  const recibido = { tipo: ACCIONES.CAMBIO_RECIBIDO, tasas: { COP: 3182.99, MXN: 18.824005 }, fuentes: {}, fechas: {}, fecha: '2026-10-31' };

  it('al llegar, actualiza el país actual y sirve para los países que se elijan después', () => {
    let estado = crearEstadoInicial('multimedia', 'CO');
    expect(estado.cambio.estado).toBe('inicial');
    estado = cotizadorReducer(estado, { tipo: ACCIONES.CAMBIO_PEDIDO });
    expect(estado.cambio.estado).toBe('cargando');
    estado = cotizadorReducer(estado, recibido);
    expect(estado.cambio.estado).toBe('listo');
    expect(estado.parametros.trm).toBe(3182.99);
    estado = cotizadorReducer(estado, { tipo: ACCIONES.CAMBIAR_PAIS, pais: 'MX' });
    expect(estado.parametros.trm).toBe(18.824005);
    estado = cotizadorReducer(estado, { tipo: ACCIONES.RESTABLECER_PARAMETROS });
    expect(estado.parametros.trm).toBe(18.824005);
  });

  it('respeta el dólar escrito a mano hasta que se pide usar el del día', () => {
    let estado = cotizadorReducer(crearEstadoInicial('multimedia', 'MX'), { tipo: ACCIONES.ACTUALIZAR_PARAMETRO, campo: 'trm', valor: 20 });
    expect(estado.parametros.trmFuente).toBe('manual');
    estado = cotizadorReducer(estado, recibido);
    expect(estado.parametros.trm).toBe(20);
    estado = cotizadorReducer(estado, { tipo: ACCIONES.USAR_CAMBIO_DEL_DIA });
    expect(estado.parametros.trm).toBe(18.824005);
  });

  it('si falla, se queda con lo que tenía', () => {
    const inicial = crearEstadoInicial('multimedia', 'MX');
    const estado = cotizadorReducer(inicial, { tipo: ACCIONES.CAMBIO_FALLIDO, error: 'sin conexión' });
    expect(estado.cambio.estado).toBe('error');
    expect(estado.parametros).toEqual(inicial.parametros);
  });
});

describe('servicio de tipo de cambio', () => {
  const respuesta = (cuerpo, ok = true) => Promise.resolve({ ok, status: ok ? 200 : 500, json: () => Promise.resolve(cuerpo) });
  const ahora = () => new Date('2026-10-31T19:00:00Z');

  it('usa la fuente principal y la TRM oficial', async () => {
    const pedidos = [];
    const fetchFn = (url) => {
      pedidos.push(url);
      if (url === FUENTE_TRM.url) return respuesta(TRM);
      if (url === FUENTES_GENERALES[0].url) return respuesta(ER);
      return Promise.reject(new Error('no debería pedirse'));
    };
    const cambio = await obtenerTipoDeCambio({ fetchFn, ahora });
    expect(cambio.tasas).toMatchObject({ COP: 3182.99, MXN: 18.824005 });
    expect(cambio.consultado).toBe('2026-10-31T19:00:00.000Z');
    expect(pedidos).toHaveLength(2);
  });

  it('si la principal falla, prueba la siguiente', async () => {
    const fetchFn = (url) => {
      if (url === FUENTES_GENERALES[0].url) return Promise.reject(new TypeError('Failed to fetch'));
      if (url === FUENTES_GENERALES[1].url) return respuesta({}, false);
      if (url === FUENTES_GENERALES[2].url) return respuesta(FA);
      return respuesta(null, false);
    };
    const cambio = await obtenerTipoDeCambio({ fetchFn, ahora });
    expect(cambio.tasas.MXN).toBe(18.78733781);
    expect(cambio.fuentes.COP).toBe('currency-api');
  });

  it('sin internet, avisa con un error', async () => {
    const fetchFn = () => Promise.reject(new TypeError('Failed to fetch'));
    await expect(obtenerTipoDeCambio({ fetchFn, ahora })).rejects.toThrow();
  });
});
