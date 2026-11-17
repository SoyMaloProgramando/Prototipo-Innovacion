import { useIdioma } from '../../i18n/IdiomaContext.jsx';

/** Encabezado de cada paso: en qué paso vas, qué haces aquí y qué tener a mano. */
export const TOTAL_PASOS = 4;

export default function CabezaPaso({ numero, titulo, children, tenerAMano }) {
  const { t } = useIdioma();
  return (
    <header className="paso-cabeza">
      <p className="paso-contador">{t('cotizar.cabeza.contador', { n: numero, total: TOTAL_PASOS })}</p>
      <h2>{titulo}</h2>
      <p className="paso-intro">
        <strong>{t('cotizar.cabeza.enEstePaso')}</strong> {children}
      </p>
      {tenerAMano ? (
        <p className="paso-tener">
          <strong>{t('cotizar.cabeza.tenerAMano')}</strong> {tenerAMano}
        </p>
      ) : null}
    </header>
  );
}
