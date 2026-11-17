/**
 * Idioma de la interfaz (es, en, pt).
 *
 * Arranca con el idioma del navegador. Si la persona lo cambia con el selector
 * del encabezado, se recuerda en este navegador (localStorage), igual que el
 * modo claro u oscuro. Es solo una preferencia visual: la cotización no se guarda.
 */
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { detectarIdioma, IDIOMA_BASE, IDIOMAS, interpolar, traducir } from './index.js';

const CLAVE = 'tarifajusta-idioma';

function leerGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return IDIOMAS.some((i) => i.id === guardado) ? guardado : null;
  } catch {
    return null;
  }
}

const IdiomaContext = createContext({
  idioma: IDIOMA_BASE,
  cambiarIdioma: () => {},
  t: (clave, valores) => traducir(IDIOMA_BASE, clave, valores),
});

export function IdiomaProvider({ children, inicial }) {
  const [idioma, setIdioma] = useState(() => inicial ?? leerGuardado() ?? detectarIdioma());

  useEffect(() => {
    document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : idioma === 'en' ? 'en' : 'es';
  }, [idioma]);

  const cambiarIdioma = useCallback((nuevo) => {
    if (!IDIOMAS.some((i) => i.id === nuevo)) return;
    setIdioma(nuevo);
    try {
      localStorage.setItem(CLAVE, nuevo);
    } catch {
      // Sin almacenamiento (modo privado): el cambio vale mientras la página esté abierta.
    }
  }, []);

  const t = useCallback((clave, valores) => traducir(idioma, clave, valores), [idioma]);
  const valor = useMemo(() => ({ idioma, cambiarIdioma, t }), [idioma, cambiarIdioma, t]);
  return <IdiomaContext.Provider value={valor}>{children}</IdiomaContext.Provider>;
}

export function useIdioma() {
  return useContext(IdiomaContext);
}

const ETIQUETAS = { b: 'strong', strong: 'strong', em: 'em', i: 'em' };
const PATRON = /(<(?:b|strong|em|i)>[\s\S]*?<\/(?:b|strong|em|i)>|\{\w+\})/g;

/** Convierte "<b>texto</b>" y "{marcador}" en elementos de React. */
export function enriquecer(texto, valores = {}, prefijo = 'r') {
  if (typeof texto !== 'string') return texto;
  const partes = texto.split(PATRON);
  const resultado = [];
  for (let i = 0; i < partes.length; i += 1) {
    const parte = partes[i];
    if (parte === undefined || parte === '') continue;
    const etiqueta = parte.match(/^<(b|strong|em|i)>([\s\S]*)<\/\1>$/);
    if (etiqueta) {
      const Elemento = ETIQUETAS[etiqueta[1]];
      resultado.push(<Elemento key={`${prefijo}${i}`}>{enriquecer(etiqueta[2], valores, `${prefijo}${i}-`)}</Elemento>);
      continue;
    }
    const marcador = parte.match(/^\{(\w+)\}$/);
    if (marcador && valores[marcador[1]] !== undefined) {
      resultado.push(<Fragment key={`${prefijo}${i}`}>{valores[marcador[1]]}</Fragment>);
      continue;
    }
    resultado.push(parte);
  }
  return resultado;
}

/**
 * Texto traducido con formato: <T k="cotizar.barraAyuda" valores={{ n: 3, precio: <strong>$ 1</strong> }} />
 * Acepta <b>…</b> y <em>…</em> dentro del texto, y valores que sean elementos de React.
 */
export function T({ k, valores }) {
  const { t } = useIdioma();
  const texto = t(k, valores);
  return <>{enriquecer(typeof texto === 'string' ? interpolar(texto, valores) : texto, valores)}</>;
}
