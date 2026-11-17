/**
 * Contexto global del cotizador.
 * - useReducer guarda todo el estado (perfil, proyecto, condiciones, parámetros, historial).
 * - useMemo recalcula la cotización cada vez que cambia un dato.
 * - Al abrir la página y cada 6 horas consulta el tipo de cambio del día
 *   (src/servicios/tipoDeCambio.js); si no hay internet, siguen los valores guardados.
 * No hay base de datos: todo vive en memoria mientras la pestaña esté abierta.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { calcularCotizacion } from '../logica/calculadora.js';
import { INTERVALO_CAMBIO_MS } from '../logica/cambio.js';
import { obtenerTipoDeCambio } from '../servicios/tipoDeCambio.js';
import { ACCIONES, cotizadorReducer } from './cotizadorReducer.js';
import { crearEstadoInicial } from './estadoInicial.js';

const CotizadorContext = createContext(null);

function crearAcciones(despachar) {
  return {
    actualizarPerfil: (campo, valor) => despachar({ tipo: ACCIONES.ACTUALIZAR_PERFIL, campo, valor }),
    cambiarCarrera: (carrera) => despachar({ tipo: ACCIONES.CAMBIAR_CARRERA, carrera }),
    actualizarProyecto: (campo, valor) => despachar({ tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo, valor }),
    elegirProducto: (id) => despachar({ tipo: ACCIONES.ELEGIR_PRODUCTO, id }),
    usarHorasSugeridas: () => despachar({ tipo: ACCIONES.USAR_HORAS_SUGERIDAS }),
    usarTarifaSugerida: () => despachar({ tipo: ACCIONES.USAR_TARIFA_SUGERIDA }),
    actualizarCondiciones: (campo, valor) => despachar({ tipo: ACCIONES.ACTUALIZAR_CONDICIONES, campo, valor }),
    agregarCosto: (costo) => despachar({ tipo: ACCIONES.AGREGAR_COSTO, ...costo }),
    actualizarCosto: (id, cambios) => despachar({ tipo: ACCIONES.ACTUALIZAR_COSTO, id, cambios }),
    quitarCosto: (id) => despachar({ tipo: ACCIONES.QUITAR_COSTO, id }),
    cambiarPais: (pais) => despachar({ tipo: ACCIONES.CAMBIAR_PAIS, pais }),
    actualizarParametro: (campo, valor) => despachar({ tipo: ACCIONES.ACTUALIZAR_PARAMETRO, campo, valor }),
    restablecerParametros: () => despachar({ tipo: ACCIONES.RESTABLECER_PARAMETROS }),
    irAPaso: (paso) => despachar({ tipo: ACCIONES.IR_A_PASO, paso }),
    guardarCotizacion: () => despachar({ tipo: ACCIONES.GUARDAR_COTIZACION }),
    cargarCotizacion: (id) => despachar({ tipo: ACCIONES.CARGAR_COTIZACION, id }),
    eliminarCotizacion: (id) => despachar({ tipo: ACCIONES.ELIMINAR_COTIZACION, id }),
    importarHistorial: (entradas) => despachar({ tipo: ACCIONES.IMPORTAR_HISTORIAL, entradas }),
    nuevaCotizacion: () => despachar({ tipo: ACCIONES.NUEVA_COTIZACION }),
    reiniciarTodo: () => despachar({ tipo: ACCIONES.REINICIAR_TODO }),
    usarCambioDelDia: () => despachar({ tipo: ACCIONES.USAR_CAMBIO_DEL_DIA }),
  };
}

export function CotizadorProvider({ children }) {
  const [estado, despachar] = useReducer(cotizadorReducer, undefined, () => crearEstadoInicial());
  const montado = useRef(true);

  // Tipo de cambio del día: un pedido a la vez, al abrir y cada 6 horas.
  const pidiendo = useRef(false);
  const actualizarCambio = useCallback(async () => {
    if (pidiendo.current) return;
    pidiendo.current = true;
    despachar({ tipo: ACCIONES.CAMBIO_PEDIDO });
    try {
      const cambio = await obtenerTipoDeCambio();
      if (montado.current) despachar({ tipo: ACCIONES.CAMBIO_RECIBIDO, ...cambio });
    } catch (error) {
      if (montado.current) despachar({ tipo: ACCIONES.CAMBIO_FALLIDO, error: String(error?.message ?? error) });
    } finally {
      pidiendo.current = false;
    }
  }, []);

  useEffect(() => {
    montado.current = true;
    actualizarCambio();
    const reloj = setInterval(actualizarCambio, INTERVALO_CAMBIO_MS);
    return () => {
      montado.current = false;
      clearInterval(reloj);
    };
  }, [actualizarCambio]);

  const acciones = useMemo(() => ({ ...crearAcciones(despachar), actualizarCambio }), [actualizarCambio]);

  const { perfil, proyecto, condiciones, parametros } = estado;
  const resultado = useMemo(
    () => calcularCotizacion({ perfil, proyecto, condiciones, parametros }),
    [perfil, proyecto, condiciones, parametros],
  );

  const valor = useMemo(() => ({ estado, acciones, resultado }), [estado, acciones, resultado]);
  return <CotizadorContext.Provider value={valor}>{children}</CotizadorContext.Provider>;
}

export function useCotizador() {
  const contexto = useContext(CotizadorContext);
  if (!contexto) throw new Error('useCotizador debe usarse dentro de <CotizadorProvider>');
  return contexto;
}
