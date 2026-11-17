import { describe, expect, it } from 'vitest';
import { ACCIONES, asignarRuta, cotizadorReducer } from '../cotizadorReducer.js';
import { crearEstadoInicial } from '../estadoInicial.js';

const inicial = crearEstadoInicial('multimedia');
const r = (estado, accion) => cotizadorReducer(estado, accion);

describe('reducer del cotizador', () => {
  it('asigna rutas anidadas sin mutar', () => {
    const original = { gastos: { vivienda: 1 } };
    const nuevo = asignarRuta(original, 'gastos.vivienda', 2);
    expect(nuevo.gastos.vivienda).toBe(2);
    expect(original.gastos.vivienda).toBe(1);
  });

  it('al elegir un producto carga sus unidades y costos sugeridos', () => {
    const e = r(inicial, { tipo: ACCIONES.ELEGIR_PRODUCTO, id: 'sis-publicacion-tiendas' });
    expect(e.proyecto.productoId).toBe('sis-publicacion-tiendas');
    expect(e.perfil.carrera).toBe('sistemas');
    expect(e.condiciones.costosDirectos[0].moneda).toBe('USD');
  });

  it('cambiar de carrera cambia al producto inicial de esa carrera', () => {
    const e = r(inicial, { tipo: ACCIONES.CAMBIAR_CARRERA, carrera: 'sistemas' });
    expect(e.proyecto.productoId).toBe('sis-landing');
  });

  it('escribir la tarifa o las horas las marca como propias', () => {
    let e = r(inicial, { tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo: 'tarifaDeseada', valor: 40_000 });
    e = r(e, { tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo: 'horasEstimadas', valor: 30 });
    expect(e.proyecto.tarifaPersonalizada).toBe(true);
    expect(e.proyecto.horasManual).toBe(true);
    e = r(e, { tipo: ACCIONES.USAR_TARIFA_SUGERIDA });
    e = r(e, { tipo: ACCIONES.USAR_HORAS_SUGERIDAS });
    expect(e.proyecto.tarifaPersonalizada).toBe(false);
    expect(e.proyecto.horasManual).toBe(false);
  });

  it('agrega, edita y quita costos propios', () => {
    let e = r(inicial, { tipo: ACCIONES.AGREGAR_COSTO, concepto: 'Fuente tipográfica', valor: 45, moneda: 'USD' });
    const costo = e.condiciones.costosDirectos.at(-1);
    expect(costo.propio).toBe(true);
    e = r(e, { tipo: ACCIONES.ACTUALIZAR_COSTO, id: costo.id, cambios: { valor: 50 } });
    expect(e.condiciones.costosDirectos.at(-1).valor).toBe(50);
    e = r(e, { tipo: ACCIONES.QUITAR_COSTO, id: costo.id });
    expect(e.condiciones.costosDirectos.find((c) => c.id === costo.id)).toBeUndefined();
  });

  it('guarda, carga y elimina cotizaciones del historial', () => {
    let e = r(inicial, { tipo: ACCIONES.GUARDAR_COTIZACION });
    expect(e.historial).toHaveLength(1);
    expect(e.historial[0].codigo).toBe('COT-0001');
    expect(e.historial[0].resumen.precio).toBeGreaterThan(0);

    const guardada = e.historial[0];
    e = r(e, { tipo: ACCIONES.ELEGIR_PRODUCTO, id: 'mul-videojuego-2d' });
    e = r(e, { tipo: ACCIONES.CARGAR_COTIZACION, id: guardada.id });
    expect(e.proyecto.productoId).toBe('mul-logo');

    e = r(e, { tipo: ACCIONES.ELIMINAR_COTIZACION, id: guardada.id });
    expect(e.historial).toHaveLength(0);
  });

  it('importa historial y renumera los códigos', () => {
    const conUna = r(inicial, { tipo: ACCIONES.GUARDAR_COTIZACION });
    const e = r(conUna, { tipo: ACCIONES.IMPORTAR_HISTORIAL, entradas: [conUna.historial[0], { basura: true }] });
    expect(e.historial).toHaveLength(2);
    expect(e.historial[0].codigo).toBe('COT-0002');
  });

  it('una nueva cotización conserva el perfil y el historial', () => {
    let e = r(inicial, { tipo: ACCIONES.ACTUALIZAR_PERFIL, campo: 'nombre', valor: 'Yerson' });
    e = r(e, { tipo: ACCIONES.GUARDAR_COTIZACION });
    e = r(e, { tipo: ACCIONES.ACTUALIZAR_CONDICIONES, campo: 'clienteNombre', valor: 'Café Tunja' });
    e = r(e, { tipo: ACCIONES.NUEVA_COTIZACION });
    expect(e.perfil.nombre).toBe('Yerson');
    expect(e.historial).toHaveLength(1);
    expect(e.condiciones.clienteNombre).toBe('');
  });
});
