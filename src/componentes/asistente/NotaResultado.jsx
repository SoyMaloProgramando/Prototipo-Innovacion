/** Recuadro con las cifras que salen de cada paso, cada una con su "!". */
import { useAyuda } from '../ui/Ayuda.jsx';

export function NotaDato({ etiqueta, cifra, detalle, explicacion }) {
  const ayuda = useAyuda(explicacion, etiqueta, 'significa');
  return (
    <div className="nota-dato">
      <span className="nota-cabeza">
        <span className="nota-etiqueta">{etiqueta}</span>
        {ayuda.boton}
      </span>
      <strong className="nota-cifra cifra">{cifra}</strong>
      {detalle ? <span className="texto-secundario texto-pequeno">{detalle}</span> : null}
      {ayuda.panel}
    </div>
  );
}

export default function NotaResultado({ children }) {
  return (
    <aside className="nota-resultado" aria-live="polite">
      {children}
    </aside>
  );
}
