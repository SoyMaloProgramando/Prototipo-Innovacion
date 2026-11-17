/**
 * Textos de las recomendaciones y los chequeos de salud, en el idioma de la interfaz
 * y con las cifras en la moneda del país.
 *   const tx = useTextosResultado();
 *   tx.recomendacion(rec)  →  { titulo, texto, tipo }
 *   tx.chequeo(chequeo)    →  texto
 */
import { useMemo } from 'react';
import { useIdioma } from './IdiomaContext.jsx';
import { useFormato } from './useFormato.js';

export function useTextosResultado() {
  const { t } = useIdioma();
  const f = useFormato();
  return useMemo(
    () => ({
      recomendacion: (rec) => ({
        tipo: t(`recomendaciones.tipos.${rec.tipo}`),
        titulo: t(`recomendaciones.${rec.id}.titulo`, { ...rec.valores, f }),
        texto: t(`recomendaciones.${rec.id}.texto`, { ...rec.valores, f }),
      }),
      chequeo: (chequeo) => t(`recomendaciones.chequeos.${chequeo.id}`, { ...chequeo.valores, f }),
    }),
    [t, f],
  );
}
