/** Resumen que acompaña al asistente: el billete y las cifras clave, siempre al día. */
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import Billete from '../resultado/Billete.jsx';

export default function ResumenEnVivo() {
  const { resultado: r } = useCotizador();
  const { t } = useIdioma();
  const f = useFormato();
  return (
    <>
      <div className="resumen-vivo">
        <Billete resultado={r} variante="compacto" />
        <dl className="resumen-cifras">
          <div>
            <dt>{t('cotizar.resumen.horas')}</dt>
            <dd className="cifra">{f.horas(r.horas.facturables)}</dd>
          </div>
          <div>
            <dt>{t('cotizar.resumen.tarifa')}</dt>
            <dd className="cifra">{t('cotizar.resumen.porHora', { valor: f.dinero(r.tarifas.ajustada) })}</dd>
          </div>
          <div>
            <dt>{t('cotizar.resumen.mercado')}</dt>
            <dd>{t(`parametros.posiciones.${r.mercado.posicion.nivel}`)}</dd>
          </div>
          <div>
            <dt>{t('cotizar.resumen.queda')}</dt>
            <dd className="cifra">{f.dinero(r.neto.ganancia)}</dd>
          </div>
        </dl>
        <a className="boton boton-principal" href="#/resultado">
          {t('cotizar.resumen.verCompleta')}
        </a>
      </div>

      <div className="resumen-movil" data-carrera={r.producto.carrera}>
        <div>
          <span className="texto-pequeno texto-secundario">{t('cotizar.resumen.precio')}</span>
          <strong className="cifra">{f.dinero(r.precio.sinIva)}</strong>
        </div>
        <a className="boton boton-principal boton-pequeno" href="#/resultado">
          {t('cotizar.resumen.verCotizacion')}
        </a>
      </div>
    </>
  );
}
