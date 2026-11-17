/**
 * Formatos de dinero, números, horas y fechas según el idioma de la interfaz y el
 * país de la cotización (su moneda). Uso:
 *   const f = useFormato();
 *   f.dinero(710000)   →  "$ 710.000" (Colombia, español) · "R$ 710,00" (Brasil, portugués)
 *   f.horas(27)  ·  f.porcentaje(0.2)  ·  f.factor(0.95)  ·  f.fecha(new Date())
 */
import { useCallback, useMemo, useRef } from 'react';
import { buscarPais } from '../datos/paises.js';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { crearFormato } from '../logica/formato.js';
import { useIdioma } from './IdiomaContext.jsx';

export function useFormato(paisId) {
  const { idioma } = useIdioma();
  const { estado } = useCotizador();
  const id = paisId ?? estado.parametros.pais;
  return useMemo(() => crearFormato({ idioma, pais: buscarPais(id) }), [idioma, id]);
}

/** Para listas con cotizaciones de varios países (historial): devuelve formatoDe(paisId). */
export function useFormatos() {
  const { idioma } = useIdioma();
  const cache = useRef(new Map());
  return useCallback(
    (paisId) => {
      const clave = `${idioma}|${paisId}`;
      if (!cache.current.has(clave)) cache.current.set(clave, crearFormato({ idioma, pais: buscarPais(paisId) }));
      return cache.current.get(clave);
    },
    [idioma],
  );
}
