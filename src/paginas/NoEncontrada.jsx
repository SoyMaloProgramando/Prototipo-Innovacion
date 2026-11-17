import { useIdioma } from '../i18n/IdiomaContext.jsx';

export default function NoEncontrada() {
  const { t } = useIdioma();
  return (
    <div className="pagina contenedor">
      <div className="vacio vacio-grande">
        <h1>{t('noEncontrada.titulo')}</h1>
        <p className="texto-secundario">{t('noEncontrada.texto')}</p>
        <div className="grupo-botones">
          <a className="boton boton-principal" href="#/cotizar">
            {t('noEncontrada.cotizar')}
          </a>
          <a className="boton" href="#/">
            {t('noEncontrada.inicio')}
          </a>
        </div>
      </div>
    </div>
  );
}
