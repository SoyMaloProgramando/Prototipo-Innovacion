import { useEffect, useRef } from 'react';
import GuiaCotizar from '../componentes/asistente/GuiaCotizar.jsx';
import PasoCondiciones from '../componentes/asistente/PasoCondiciones.jsx';
import PasoPerfil from '../componentes/asistente/PasoPerfil.jsx';
import PasoProducto from '../componentes/asistente/PasoProducto.jsx';
import Pasos from '../componentes/asistente/Pasos.jsx';
import PasoTiempo from '../componentes/asistente/PasoTiempo.jsx';
import ResumenEnVivo from '../componentes/asistente/ResumenEnVivo.jsx';
import { BarraAyuda } from '../componentes/ui/Ayuda.jsx';
import Icono from '../componentes/ui/Icono.jsx';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { T, useIdioma } from '../i18n/IdiomaContext.jsx';

const COMPONENTES = [PasoPerfil, PasoProducto, PasoTiempo, PasoCondiciones];

export default function Cotizar() {
  const { estado, acciones } = useCotizador();
  const { t } = useIdioma();
  const paso = estado.paso;
  const titulos = t('cotizar.pasos');
  const pasos = COMPONENTES.map((Componente, i) => ({ titulo: titulos[i], Componente }));
  const { Componente } = pasos[paso];
  const formulario = useRef(null);
  const primeraVez = useRef(true);

  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }
    formulario.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    formulario.current?.focus({ preventScroll: true });
  }, [paso]);

  return (
    <div className="pagina contenedor cotizar">
      <header className="pagina-cabeza">
        <h1>{t('cotizar.pagina.titulo')}</h1>
        <p>{t('cotizar.pagina.lema')}</p>
      </header>

      <GuiaCotizar />

      <Pasos pasos={pasos} actual={paso} alElegir={acciones.irAPaso} />

      <div className="cotizar-rejilla">
        <div className="cotizar-formulario" ref={formulario} tabIndex={-1} aria-label={pasos[paso].titulo}>
          <BarraAyuda>
            <T k="cotizar.pagina.barraAyuda" />
          </BarraAyuda>
          <Componente />
          <nav className="navegacion-pasos" aria-label={t('cotizar.pagina.navegacion')}>
            {paso > 0 ? (
              <button type="button" className="boton" onClick={() => acciones.irAPaso(paso - 1)}>
                <Icono nombre="atras" />
                {pasos[paso - 1].titulo}
              </button>
            ) : (
              <span />
            )}
            {paso < pasos.length - 1 ? (
              <button type="button" className="boton boton-principal" onClick={() => acciones.irAPaso(paso + 1)}>
                {t('cotizar.pagina.siguiente', { titulo: pasos[paso + 1].titulo })}
                <Icono nombre="adelante" />
              </button>
            ) : (
              <a className="boton boton-principal" href="#/resultado">
                {t('cotizar.pagina.verPrecio')}
                <Icono nombre="adelante" />
              </a>
            )}
          </nav>
        </div>
        <aside className="cotizar-resumen" aria-label={t('cotizar.pagina.resumenAria')}>
          <ResumenEnVivo />
        </aside>
      </div>
    </div>
  );
}
