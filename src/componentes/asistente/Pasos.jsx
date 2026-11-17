import { useIdioma } from '../../i18n/IdiomaContext.jsx';

/** Indicador de pasos del asistente. Es una secuencia real, por eso va numerado. */
export default function Pasos({ pasos, actual, alElegir }) {
  const { t } = useIdioma();
  return (
    <nav className="pasos" aria-label={t('cotizar.pagina.pasosAria')}>
      <ol>
        {pasos.map((paso, i) => {
          const estado = i === actual ? 'actual' : i < actual ? 'hecho' : 'pendiente';
          return (
            <li key={i} className={`paso paso-${estado}`}>
              <button type="button" onClick={() => alElegir(i)} aria-current={i === actual ? 'step' : undefined}>
                <span className="paso-numero" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="paso-titulo">{paso.titulo}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
