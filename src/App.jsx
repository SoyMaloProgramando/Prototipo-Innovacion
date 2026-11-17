import { useState } from 'react';
import Encabezado from './componentes/estructura/Encabezado.jsx';
import ModalCompartir from './componentes/estructura/ModalCompartir.jsx';
import PiePagina from './componentes/estructura/PiePagina.jsx';
import { useCotizador } from './estado/CotizadorContext.jsx';
import { useIdioma } from './i18n/IdiomaContext.jsx';
import { useRuta } from './hooks/useRuta.js';
import Catalogo from './paginas/Catalogo.jsx';
import Cotizar from './paginas/Cotizar.jsx';
import Historial from './paginas/Historial.jsx';
import Inicio from './paginas/Inicio.jsx';
import Metodologia from './paginas/Metodologia.jsx';
import NoEncontrada from './paginas/NoEncontrada.jsx';
import Proyecto from './paginas/Proyecto.jsx';
import Resultado from './paginas/Resultado.jsx';

const PAGINAS = {
  inicio: Inicio,
  cotizar: Cotizar,
  resultado: Resultado,
  catalogo: Catalogo,
  metodologia: Metodologia,
  historial: Historial,
  proyecto: Proyecto,
};

export default function App() {
  const { ruta, parametros } = useRuta();
  const { estado } = useCotizador();
  const { t } = useIdioma();
  const [compartir, setCompartir] = useState(false);
  const Pagina = PAGINAS[ruta] ?? NoEncontrada;

  return (
    <div className="app" data-carrera={estado.perfil.carrera}>
      <a className="saltar" href="#contenido" onClick={(e) => {
        e.preventDefault();
        document.getElementById('contenido')?.focus();
      }}>
        {t('comun.saltar')}
      </a>
      <Encabezado rutaActual={ruta} alCompartir={() => setCompartir(true)} />
      <main id="contenido" tabIndex={-1}>
        <Pagina parametros={parametros} />
      </main>
      <PiePagina />
      <ModalCompartir abierto={compartir} alCerrar={() => setCompartir(false)} />
    </div>
  );
}
