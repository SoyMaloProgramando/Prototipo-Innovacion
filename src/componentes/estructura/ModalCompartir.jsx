/**
 * Ventana para compartir la app: muestra el enlace actual y un código QR
 * para que los estudiantes lo abran desde el celular.
 */
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import Icono from '../ui/Icono.jsx';

function tipoDeEnlace(hostname) {
  if (/ngrok/i.test(hostname)) return 'ngrok';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') return 'local';
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname)) return 'red';
  return 'publico';
}

export default function ModalCompartir({ abierto, alCerrar }) {
  const { t } = useIdioma();
  const dialogo = useRef(null);
  const [qr, setQr] = useState('');
  const [copiado, setCopiado] = useState(false);
  const enlace = `${window.location.origin}${window.location.pathname}#/`;
  const tipo = tipoDeEnlace(window.location.hostname);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    setCopiado(false);
    QRCode.toDataURL(enlace, { margin: 1, width: 440, color: { dark: '#2b1a35', light: '#ffffff' } })
      .then(setQr)
      .catch(() => setQr(''));
  }, [abierto, enlace]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(enlace);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <dialog ref={dialogo} className="modal" onClose={alCerrar} aria-labelledby="titulo-compartir">
      <div className="modal-cabeza">
        <h2 id="titulo-compartir">{t('estructura.compartir.titulo')}</h2>
        <button type="button" className="boton boton-fantasma boton-pequeno" onClick={alCerrar} aria-label={t('comun.cerrar')}>
          <Icono nombre="equis" />
        </button>
      </div>
      <div className="modal-cuerpo compartir">
        {qr ? <img className="compartir-qr" src={qr} alt={t('estructura.compartir.qrAlt', { enlace })} width="220" height="220" /> : null}
        <div className="compartir-texto">
          <p className={`aviso aviso-${tipo === 'local' ? 'consejo' : 'info'}`}>{t(`estructura.compartir.mensajes.${tipo}`)}</p>
          <div className="campo">
            <span className="campo-etiqueta">{t('estructura.compartir.enlace')}</span>
            <div className="campo-entrada">
              <input readOnly value={enlace} aria-label={t('estructura.compartir.enlaceApp')} onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="grupo-botones">
            <button type="button" className="boton boton-principal" onClick={copiar}>
              <Icono nombre={copiado ? 'check' : 'copiar'} />
              {copiado ? t('estructura.compartir.copiado') : t('estructura.compartir.copiar')}
            </button>
          </div>
          <p className="texto-secundario texto-pequeno">
            {t('estructura.compartir.privacidad')}
          </p>
        </div>
      </div>
    </dialog>
  );
}
