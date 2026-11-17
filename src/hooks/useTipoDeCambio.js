/**
 * Estado del dólar del país para mostrarlo en la interfaz:
 *   situacion: 'fijo' (la moneda es el dólar), 'api' (el del día), 'manual' (lo escribió la persona),
 *              'cargando' (consultando), 'sinApi' (Cuba: se actualiza a mano) o 'guardado' (sin conexión).
 *   valor: "$ 3.183" ya formateado · fecha: día del valor, formateado · proveedor: { nombre, url } o null.
 */
import { useMemo } from 'react';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { useFormato } from '../i18n/useFormato.js';
import { FUENTES_CAMBIO, MONEDAS_SIN_API, tasaDelDia } from '../logica/cambio.js';

const fechaDeISO = (iso) => {
  if (!iso) return null;
  const [anio, mes, dia] = iso.slice(0, 10).split('-').map(Number);
  return anio && mes && dia ? new Date(anio, mes - 1, dia) : null;
};

export function useTipoDeCambio() {
  const { estado, acciones } = useCotizador();
  const f = useFormato();
  const { parametros: p, cambio } = estado;

  return useMemo(() => {
    const moneda = p.moneda;
    const delDia = tasaDelDia(cambio, moneda);
    let situacion = 'guardado';
    if (moneda === 'USD') situacion = 'fijo';
    else if (p.trmFuente === 'manual') situacion = 'manual';
    else if (p.trmFuente === 'api') situacion = 'api';
    else if (MONEDAS_SIN_API.has(moneda)) situacion = 'sinApi';
    else if (cambio.estado === 'inicial' || cambio.estado === 'cargando') situacion = 'cargando';
    const fecha = fechaDeISO(p.trmFecha);
    return {
      situacion,
      moneda,
      cargando: cambio.estado === 'cargando',
      valor: f.dinero(p.trm),
      fecha: fecha ? f.fechaMedia(fecha) : null,
      proveedor: FUENTES_CAMBIO[p.trmProveedor] ?? null,
      delDia: delDia && delDia !== p.trm ? f.dinero(delDia) : null,
      actualizar: acciones.actualizarCambio,
      usarDelDia: acciones.usarCambioDelDia,
    };
  }, [p.moneda, p.trm, p.trmFuente, p.trmFecha, p.trmProveedor, cambio, f, acciones]);
}
