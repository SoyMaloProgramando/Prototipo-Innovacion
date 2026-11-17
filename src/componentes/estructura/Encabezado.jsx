import { useEffect, useState } from 'react';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useTema } from '../../hooks/useTema.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { IDIOMAS } from '../../i18n/index.js';
import Icono from '../ui/Icono.jsx';

const ENLACES = [
  { ruta: 'cotizar', clave: 'cotizar', activas: ['cotizar', 'resultado'] },
  { ruta: 'catalogo', clave: 'catalogo' },
  { ruta: 'metodologia', clave: 'metodologia' },
  { ruta: 'historial', clave: 'historial' },
  { ruta: 'proyecto', clave: 'proyecto' },
];

export default function Encabezado({ rutaActual, alCompartir }) {
  const { estado } = useCotizador();
  const { t, idioma, cambiarIdioma } = useIdioma();
  const [abierto, setAbierto] = useState(false);
  const [tema, alternarTema] = useTema();
  const oscuro = tema === 'dark';

  useEffect(() => setAbierto(false), [rutaActual]);

  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <a className="marca" href="#/" aria-label={t('comun.irAlInicio')}>
          <span className="marca-signo" aria-hidden="true">
            $
          </span>
          TarifaJusta
        </a>

        <button
          type="button"
          className="boton boton-fantasma boton-pequeno menu-movil"
          aria-expanded={abierto}
          aria-controls="navegacion-principal"
          onClick={() => setAbierto((v) => !v)}
        >
          <Icono nombre={abierto ? 'equis' : 'menu'} />
          <span className="menu-movil-texto">{t('comun.menu')}</span>
        </button>

        <nav id="navegacion-principal" className={`navegacion ${abierto ? 'navegacion-abierta' : ''}`} aria-label={t('comun.nav.principal')}>
          <ul>
            {ENLACES.map((enlace) => {
              const activa = (enlace.activas ?? [enlace.ruta]).includes(rutaActual);
              return (
                <li key={enlace.ruta}>
                  <a href={`#/${enlace.ruta}`} aria-current={activa ? 'page' : undefined}>
                    {t(`comun.nav.${enlace.clave}`)}
                    {enlace.ruta === 'historial' && estado.historial.length > 0 ? (
                      <span className="contador" aria-label={t('comun.nav.guardadas', { n: estado.historial.length })}>
                        {estado.historial.length}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
          <button type="button" className="boton boton-pequeno" onClick={alCompartir}>
            <Icono nombre="compartir" />
            {t('comun.compartir')}
          </button>
        </nav>

        <label className="selector-idioma" title={t('comun.cambiarIdioma')}>
          <span className="solo-lectores">{t('comun.idioma')}</span>
          <Icono nombre="globo" tamano={18} />
          <select value={idioma} onChange={(e) => cambiarIdioma(e.target.value)}>
            {IDIOMAS.map((i) => (
              <option key={i.id} value={i.id} lang={i.id}>
                {i.corto} · {i.nombre}
              </option>
            ))}
          </select>
          <span className="selector-idioma-corto" aria-hidden="true">
            {IDIOMAS.find((i) => i.id === idioma)?.corto}
          </span>
        </label>

        <button
          type="button"
          className="boton boton-fantasma boton-pequeno boton-tema"
          onClick={alternarTema}
          aria-label={oscuro ? t('comun.tema.aClaro') : t('comun.tema.aOscuro')}
          title={oscuro ? t('comun.tema.aClaro') : t('comun.tema.aOscuro')}
        >
          <Icono nombre={oscuro ? 'sol' : 'luna'} />
          <span className="boton-tema-texto">{oscuro ? t('comun.tema.claro') : t('comun.tema.oscuro')}</span>
        </button>
      </div>
    </header>
  );
}
