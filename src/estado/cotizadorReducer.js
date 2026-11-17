/**
 * Reducer del cotizador: única forma de cambiar el estado de la app.
 * Cada acción es un objeto { tipo, ...datos }.
 */
import { buscarProducto, CARRERAS } from '../datos/catalogo.js';
import { buscarPais } from '../datos/paises.js';
import { calcularCotizacion } from '../logica/calculadora.js';
import { hoyISO } from '../logica/calendario.js';
import { aplicarCambio } from '../logica/cambio.js';
import { condicionesDePais, parametrosDePais } from '../logica/paises.js';
import { tarifaSugerida } from '../logica/tarifas.js';
import {
  CONDICIONES_INICIALES,
  costosDeProducto,
  crearEstadoInicial,
  perfilParaPais,
  PROYECTO_INICIAL,
  proyectoParaProducto,
} from './estadoInicial.js';

export const ACCIONES = {
  ACTUALIZAR_PERFIL: 'perfil/actualizar',
  CAMBIAR_CARRERA: 'perfil/carrera',
  ACTUALIZAR_PROYECTO: 'proyecto/actualizar',
  ELEGIR_PRODUCTO: 'proyecto/producto',
  USAR_HORAS_SUGERIDAS: 'proyecto/horasSugeridas',
  USAR_TARIFA_SUGERIDA: 'proyecto/tarifaSugerida',
  ACTUALIZAR_CONDICIONES: 'condiciones/actualizar',
  AGREGAR_COSTO: 'condiciones/costo/agregar',
  ACTUALIZAR_COSTO: 'condiciones/costo/actualizar',
  QUITAR_COSTO: 'condiciones/costo/quitar',
  CAMBIAR_PAIS: 'parametros/pais',
  ACTUALIZAR_PARAMETRO: 'parametros/actualizar',
  RESTABLECER_PARAMETROS: 'parametros/restablecer',
  IR_A_PASO: 'asistente/paso',
  GUARDAR_COTIZACION: 'historial/guardar',
  CARGAR_COTIZACION: 'historial/cargar',
  ELIMINAR_COTIZACION: 'historial/eliminar',
  IMPORTAR_HISTORIAL: 'historial/importar',
  NUEVA_COTIZACION: 'cotizacion/nueva',
  REINICIAR_TODO: 'todo/reiniciar',
  CAMBIO_PEDIDO: 'cambio/pedido',
  CAMBIO_RECIBIDO: 'cambio/recibido',
  CAMBIO_FALLIDO: 'cambio/fallido',
  USAR_CAMBIO_DEL_DIA: 'cambio/usarDelDia',
};

/** Asigna un valor en una ruta tipo 'gastos.vivienda' sin mutar el objeto. */
export function asignarRuta(objeto, ruta, valor) {
  const [clave, ...resto] = ruta.split('.');
  if (resto.length === 0) return { ...objeto, [clave]: valor };
  return { ...objeto, [clave]: asignarRuta(objeto[clave] ?? {}, resto.join('.'), valor) };
}

function cambiarProducto(estado, producto) {
  const proyecto = proyectoParaProducto(producto, {
    perfil: estado.perfil,
    parametros: estado.parametros,
    condiciones: estado.condiciones,
    proyectoActual: estado.proyecto,
  });
  const propios = estado.condiciones.costosDirectos.filter((c) => c.propio);
  return {
    ...estado,
    perfil: { ...estado.perfil, carrera: producto.carrera },
    proyecto,
    condiciones: { ...estado.condiciones, costosDirectos: [...costosDeProducto(producto, estado.parametros), ...propios] },
  };
}

/** Resumen corto que se guarda en el historial junto con la copia del estado. */
export function resumirCotizacion(estado) {
  const r = calcularCotizacion(estado, { ligero: true });
  return {
    producto: r.producto.nombre,
    productoId: r.producto.id,
    carrera: r.producto.carrera,
    complejidad: r.nivel.nombre,
    complejidadId: r.nivel.id,
    unidades: r.unidades,
    unidad: r.unidades === 1 ? r.producto.unidad.singular : r.producto.unidad.plural,
    cliente: estado.condiciones.clienteNombre,
    especialidad: r.especialidad,
    horasFacturables: r.horas.facturables,
    horasReales: r.horas.reales,
    tarifaAjustada: r.tarifas.ajustada,
    precio: r.precio.sinIva,
    total: r.precio.total,
    piso: r.rango.piso,
    ganancia: r.neto.ganancia,
    gananciaPorHora: r.neto.porHoraReal,
    posicion: r.mercado.posicion.etiqueta,
    posicionNivel: r.mercado.posicion.nivel,
    pais: estado.parametros.pais ?? 'CO',
    moneda: estado.parametros.moneda ?? 'COP',
  };
}

export function cotizadorReducer(estado, accion) {
  switch (accion.tipo) {
    case ACCIONES.ACTUALIZAR_PERFIL: {
      const perfil = asignarRuta(estado.perfil, accion.campo, accion.valor);
      const siguiente = { ...estado, perfil };
      // Si la tarifa no la ha escrito el usuario, se recalcula con el nuevo perfil.
      if (!estado.proyecto.tarifaPersonalizada) {
        const producto = buscarProducto(estado.proyecto.productoId);
        siguiente.proyecto = {
          ...estado.proyecto,
          tarifaDeseada: tarifaSugerida({ perfil, producto, parametros: estado.parametros, margen: estado.condiciones.margen }),
        };
      }
      return siguiente;
    }

    case ACCIONES.CAMBIAR_CARRERA: {
      if (estado.perfil.carrera === accion.carrera) return estado;
      const producto = buscarProducto(CARRERAS[accion.carrera].productoInicial);
      return cambiarProducto({ ...estado, perfil: { ...estado.perfil, carrera: accion.carrera } }, producto);
    }

    case ACCIONES.ELEGIR_PRODUCTO: {
      if (estado.proyecto.productoId === accion.id) return estado;
      return cambiarProducto(estado, buscarProducto(accion.id));
    }

    case ACCIONES.ACTUALIZAR_PROYECTO: {
      let proyecto = asignarRuta(estado.proyecto, accion.campo, accion.valor);
      if (accion.campo === 'tarifaDeseada') proyecto = { ...proyecto, tarifaPersonalizada: true };
      if (accion.campo === 'horasEstimadas') proyecto = { ...proyecto, horasManual: true };
      return { ...estado, proyecto };
    }

    case ACCIONES.USAR_HORAS_SUGERIDAS:
      return { ...estado, proyecto: { ...estado.proyecto, horasManual: false } };

    case ACCIONES.USAR_TARIFA_SUGERIDA: {
      const producto = buscarProducto(estado.proyecto.productoId);
      const tarifa = tarifaSugerida({
        perfil: estado.perfil,
        producto,
        parametros: estado.parametros,
        margen: estado.condiciones.margen,
      });
      return { ...estado, proyecto: { ...estado.proyecto, tarifaDeseada: tarifa, tarifaPersonalizada: false } };
    }

    case ACCIONES.ACTUALIZAR_CONDICIONES: {
      const condiciones = asignarRuta(estado.condiciones, accion.campo, accion.valor);
      const siguiente = { ...estado, condiciones };
      // La tarifa sugerida depende del margen: se recalcula si el usuario no la escribió.
      if (accion.campo === 'margen' && !estado.proyecto.tarifaPersonalizada) {
        const producto = buscarProducto(estado.proyecto.productoId);
        siguiente.proyecto = {
          ...estado.proyecto,
          tarifaDeseada: tarifaSugerida({ perfil: estado.perfil, producto, parametros: estado.parametros, margen: condiciones.margen }),
        };
      }
      return siguiente;
    }

    case ACCIONES.AGREGAR_COSTO: {
      const nuevo = {
        id: `propio-${Date.now()}-${Math.round(Math.random() * 1000)}`,
        concepto: accion.concepto || 'Otro costo',
        valor: Number(accion.valor) || 0,
        moneda: accion.moneda === 'USD' ? 'USD' : estado.parametros.moneda ?? 'COP',
        activo: true,
        propio: true,
      };
      return {
        ...estado,
        condiciones: { ...estado.condiciones, costosDirectos: [...estado.condiciones.costosDirectos, nuevo] },
      };
    }

    case ACCIONES.ACTUALIZAR_COSTO:
      return {
        ...estado,
        condiciones: {
          ...estado.condiciones,
          costosDirectos: estado.condiciones.costosDirectos.map((c) => (c.id === accion.id ? { ...c, ...accion.cambios } : c)),
        },
      };

    case ACCIONES.QUITAR_COSTO:
      return {
        ...estado,
        condiciones: {
          ...estado.condiciones,
          costosDirectos: estado.condiciones.costosDirectos.filter((c) => c.id !== accion.id),
        },
      };

    case ACCIONES.ACTUALIZAR_PARAMETRO: {
      const parametros = { ...estado.parametros, [accion.campo]: accion.valor };
      // Un dólar escrito a mano no lo pisa la actualización automática.
      if (accion.campo === 'trm') Object.assign(parametros, { trmFuente: 'manual', trmFecha: null, trmProveedor: null });
      return { ...estado, parametros };
    }

    case ACCIONES.CAMBIAR_PAIS: {
      if (!accion.pais || estado.parametros.pais === accion.pais) return estado;
      const anteriores = estado.parametros;
      const parametros = aplicarCambio(parametrosDePais(accion.pais), estado.cambio);
      const centavos = 10 ** (buscarPais(parametros.pais).moneda.decimales ?? 0);
      // Los valores de dinero cambian de moneda: el perfil toma los de ejemplo del país
      // y los costos propios se convierten pasando por dólares.
      const perfil = perfilParaPais(estado.perfil, parametros.pais);
      const producto = buscarProducto(estado.proyecto.productoId);
      const propios = estado.condiciones.costosDirectos
        .filter((c) => c.propio)
        .map((c) =>
          c.moneda === 'USD'
            ? c
            : {
                ...c,
                valor: Math.round(((Number(c.valor) || 0) / (Number(anteriores.trm) || 1)) * parametros.trm * centavos) / centavos,
                moneda: parametros.moneda,
              },
        );
      const condiciones = {
        ...estado.condiciones,
        ...condicionesDePais(parametros),
        retencion: 'auto',
        gmf: false,
        costosDirectos: [...costosDeProducto(producto, parametros), ...propios],
      };
      const proyecto = {
        ...estado.proyecto,
        tarifaPersonalizada: false,
        tarifaDeseada: tarifaSugerida({ perfil, producto, parametros, margen: condiciones.margen }),
      };
      return { ...estado, parametros, perfil, condiciones, proyecto };
    }

    case ACCIONES.RESTABLECER_PARAMETROS:
      return { ...estado, parametros: aplicarCambio(parametrosDePais(estado.parametros.pais), estado.cambio) };

    case ACCIONES.CAMBIO_PEDIDO:
      return { ...estado, cambio: { ...estado.cambio, estado: 'cargando' } };

    case ACCIONES.CAMBIO_RECIBIDO: {
      const cambio = {
        estado: 'listo',
        tasas: accion.tasas ?? {},
        fuentes: accion.fuentes ?? {},
        fechas: accion.fechas ?? {},
        fecha: accion.fecha ?? null,
        consultado: accion.consultado ?? null,
        error: null,
      };
      return { ...estado, cambio, parametros: aplicarCambio(estado.parametros, cambio) };
    }

    case ACCIONES.CAMBIO_FALLIDO:
      // Se conservan las tasas que ya se tenían (o las guardadas en los datos del país).
      return { ...estado, cambio: { ...estado.cambio, estado: 'error', error: accion.error ?? 'error' } };

    case ACCIONES.USAR_CAMBIO_DEL_DIA:
      return { ...estado, parametros: aplicarCambio(estado.parametros, estado.cambio, { forzar: true }) };

    case ACCIONES.IR_A_PASO:
      return { ...estado, paso: Math.max(0, Math.min(3, accion.paso)) };

    case ACCIONES.GUARDAR_COTIZACION: {
      const copia = {
        perfil: estado.perfil,
        proyecto: estado.proyecto,
        condiciones: estado.condiciones,
        parametros: estado.parametros,
      };
      const entrada = {
        id: estado.siguienteNumero,
        codigo: `COT-${String(estado.siguienteNumero).padStart(4, '0')}`,
        fecha: new Date().toISOString(),
        resumen: resumirCotizacion(copia),
        estado: copia,
      };
      return { ...estado, historial: [entrada, ...estado.historial], siguienteNumero: estado.siguienteNumero + 1 };
    }

    case ACCIONES.CARGAR_COTIZACION: {
      const entrada = estado.historial.find((h) => h.id === accion.id);
      if (!entrada) return estado;
      return { ...estado, ...entrada.estado, paso: 0 };
    }

    case ACCIONES.ELIMINAR_COTIZACION:
      return { ...estado, historial: estado.historial.filter((h) => h.id !== accion.id) };

    case ACCIONES.IMPORTAR_HISTORIAL: {
      const validas = (accion.entradas || []).filter((e) => e && e.estado && e.resumen);
      let numero = estado.siguienteNumero;
      const renumeradas = validas.map((e) => {
        const id = numero;
        numero += 1;
        return { ...e, id, codigo: `COT-${String(id).padStart(4, '0')}` };
      });
      return { ...estado, historial: [...renumeradas, ...estado.historial], siguienteNumero: numero };
    }

    case ACCIONES.NUEVA_COTIZACION: {
      const producto = buscarProducto(CARRERAS[estado.perfil.carrera].productoInicial);
      const condiciones = {
        ...CONDICIONES_INICIALES,
        ...condicionesDePais(estado.parametros),
        costosDirectos: costosDeProducto(producto, estado.parametros),
      };
      const proyecto = {
        ...proyectoParaProducto(producto, {
          perfil: estado.perfil,
          parametros: estado.parametros,
          condiciones,
          proyectoActual: PROYECTO_INICIAL,
        }),
        fechaInicio: hoyISO(),
      };
      return { ...estado, proyecto, condiciones, paso: 0 };
    }

    case ACCIONES.REINICIAR_TODO: {
      const limpio = crearEstadoInicial(estado.perfil.carrera, estado.parametros.pais);
      return {
        ...limpio,
        parametros: aplicarCambio(limpio.parametros, estado.cambio),
        cambio: estado.cambio,
        historial: estado.historial,
        siguienteNumero: estado.siguienteNumero,
      };
    }

    default:
      return estado;
  }
}
