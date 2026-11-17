/**
 * Enrutador mínimo basado en el hash de la URL (#/cotizar, #/catalogo...).
 * Funciona igual en localhost, en la red local y a través de ngrok,
 * sin configurar nada en el servidor.
 */
import { useEffect, useState } from 'react';

export const RUTAS = ['inicio', 'cotizar', 'resultado', 'catalogo', 'metodologia', 'historial', 'proyecto'];

function leerRuta() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [ruta, consulta = ''] = hash.split('?');
  return { ruta: ruta || 'inicio', parametros: new URLSearchParams(consulta) };
}

export function useRuta() {
  const [ruta, setRuta] = useState(leerRuta);

  useEffect(() => {
    const alCambiar = () => {
      setRuta(leerRuta());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', alCambiar);
    return () => window.removeEventListener('hashchange', alCambiar);
  }, []);

  return ruta;
}

export function navegar(ruta) {
  window.location.hash = `#/${ruta}`;
}
