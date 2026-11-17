/** Mide el ancho de un elemento y lo actualiza al cambiar el tamaño (para gráficas SVG). */
import { useEffect, useRef, useState } from 'react';

export function useAnchoElemento(anchoInicial = 640) {
  const ref = useRef(null);
  const [ancho, setAncho] = useState(anchoInicial);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return undefined;
    const medir = () => setAncho(Math.max(240, Math.round(elemento.getBoundingClientRect().width)));
    medir();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return [ref, ancho];
}
