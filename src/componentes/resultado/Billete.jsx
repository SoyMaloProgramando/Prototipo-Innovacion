/**
 * El precio impreso como un billete. Es el elemento protagonista de la app:
 * se usa en el inicio, en el resumen en vivo del asistente y en el resultado.
 */
import { useCatalogo } from '../../i18n/catalogo.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import Guilloche from './Guilloche.jsx';

export default function Billete({ resultado: r, codigo, variante = 'grande', titulo }) {
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const impuesto = r.pais.ivaNombre;
  const etiqueta =
    titulo ?? (r.pais.iva > 0 ? t('resultado.billete.titulo', { impuesto }) : t('resultado.billete.tituloSinImpuesto'));
  const compacto = variante === 'compacto';
  // Si la moneda local ya es el dólar, la equivalencia en dólares sobra.
  const enDolares = !compacto && r.pais.moneda !== 'USD';
  const lineaProducto = t('resultado.billete.producto', {
    producto: cat.producto(r.producto).nombre,
    cantidad: f.numero(r.unidades),
    unidad: cat.unidad(r.producto, r.unidades),
    nivel: t(`parametros.niveles.${r.nivel.id}.nombre`).toLocaleLowerCase(idioma),
  });
  return (
    <section className={`billete billete-${variante}`} data-carrera={r.producto.carrera} aria-label={`${etiqueta}: ${f.dinero(r.precio.sinIva)}`}>
      <Guilloche />
      <div className="billete-contenido">
        <div className="billete-cabeza">
          <span className="billete-marca">{t('comun.marca')}</span>
          <span className="billete-serie">{codigo ?? t('comun.borrador')}</span>
        </div>

        <p className="billete-etiqueta">{etiqueta}</p>
        <p className="billete-precio" aria-live="polite">
          {f.dinero(r.precio.sinIva)}
        </p>
        <p className="billete-producto">{lineaProducto}</p>

        <dl className="billete-cifras">
          <div>
            <dt>{t('resultado.billete.piso')}</dt>
            <dd className="cifra">{f.dinero(r.rango.piso)}</dd>
          </div>
          <div>
            <dt>{t('resultado.billete.negociar')}</dt>
            <dd className="cifra">{f.dinero(r.rango.apertura)}</dd>
          </div>
          {enDolares ? (
            <div>
              <dt>{t('resultado.billete.dolares')}</dt>
              <dd className="cifra">{f.usd(r.equivalencias.usd)}</dd>
            </div>
          ) : null}
          {!compacto && r.precio.iva > 0 ? (
            <div>
              <dt>{t('resultado.billete.total', { impuesto })}</dt>
              <dd className="cifra">{f.dinero(r.precio.total)}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
