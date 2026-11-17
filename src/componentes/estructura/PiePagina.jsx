import { buscarPais } from '../../datos/paises.js';
import { PROYECTO } from '../../datos/proyecto.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { nombreCarrera } from '../../i18n/catalogo.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';

export default function PiePagina() {
  const { t, idioma } = useIdioma();
  const { estado } = useCotizador();
  const pais = buscarPais(estado.parametros.pais);
  return (
    <footer className="pie">
      <div className="contenedor pie-fila">
        <p>
          {t('estructura.pie.linea1', {
            nombre: PROYECTO.nombre,
            version: PROYECTO.version,
            programa: nombreCarrera(idioma, 'multimedia'),
            universidad: PROYECTO.universidad,
            ciudad: PROYECTO.ciudad,
            anio: PROYECTO.anio,
          })}
        </p>
        <p className="texto-secundario">
          {t('estructura.pie.aviso', { pais: pais.nombres[idioma], anio: PROYECTO.anio })}{' '}
          <a href="#/metodologia">{t('estructura.pie.verMetodo')}</a>.
        </p>
      </div>
    </footer>
  );
}
