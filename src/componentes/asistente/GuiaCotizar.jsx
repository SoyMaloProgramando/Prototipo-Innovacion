/**
 * Guía rápida del cotizador: qué se hace en cada paso, contada para el
 * ingeniero que va a cotizar su propio trabajo. Se puede cerrar.
 */
import { useState } from 'react';
import { T, useIdioma } from '../../i18n/IdiomaContext.jsx';

// Si la cierras, sigue cerrada mientras la página esté abierta (al recargar vuelve a abrirse).
let abiertaEnEstaVisita = true;

export default function GuiaCotizar() {
  const { t } = useIdioma();
  const [abierta, setAbierta] = useState(abiertaEnEstaVisita);
  const pasos = t('cotizar.guia.pasos');
  return (
    <details
      className="guia"
      open={abierta}
      onToggle={(e) => {
        abiertaEnEstaVisita = e.currentTarget.open;
        setAbierta(e.currentTarget.open);
      }}
    >
      <summary>
        <span className="guia-titulo">{t('cotizar.guia.titulo')}</span>
        <span className="guia-accion texto-secundario">{abierta ? t('cotizar.guia.ocultar') : t('cotizar.guia.ver')}</span>
      </summary>
      <div className="guia-cuerpo">
        <p className="guia-intro">{t('cotizar.guia.intro')}</p>
        <ol className="guia-pasos">
          {pasos.map((paso, i) => (
            <li key={paso.titulo}>
              <span className={`guia-numero guia-numero-${i + 1}`} aria-hidden="true">
                {i + 1}
              </span>
              <strong>{paso.titulo}</strong>
              <span className="texto-secundario">{paso.texto}</span>
            </li>
          ))}
        </ol>
        <p className="guia-pie">
          <span className="ayuda-muestra" aria-hidden="true">
            !
          </span>
          <span>
            <T k="cotizar.guia.pie" />
          </span>
        </p>
      </div>
    </details>
  );
}
