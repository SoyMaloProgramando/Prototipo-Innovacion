import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import './estilos/tokens.css';
import './estilos/base.css';
import './estilos/componentes.css';
import './estilos/paginas.css';
import './estilos/impresion.css';
import App from './App.jsx';
import { AyudaProvider } from './componentes/ui/Ayuda.jsx';
import { CotizadorProvider } from './estado/CotizadorContext.jsx';
import { IdiomaProvider } from './i18n/IdiomaContext.jsx';

createRoot(document.getElementById('raiz')).render(
  <StrictMode>
    <IdiomaProvider>
      <CotizadorProvider>
        <AyudaProvider>
          <App />
        </AyudaProvider>
      </CotizadorProvider>
    </IdiomaProvider>
  </StrictMode>,
);
