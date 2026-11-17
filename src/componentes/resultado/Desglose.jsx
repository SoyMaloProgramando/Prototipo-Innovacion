/** Cómo se arma el precio: barra segmentada + tabla con la operación de cada línea. */
import { useCatalogo } from '../../i18n/catalogo.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import BarraSegmentada from '../graficas/BarraSegmentada.jsx';

const SLOTS = { trabajo: 1, operativos: 2, utilidad: 3, aportes: 4, directos: 5, retencion: 6, iva: 7, redondeo: 8 };

function Valor({ v, f }) {
  const negativo = v < -0.5;
  return <td className="cifra num">{negativo ? `−${f.dinero(Math.abs(v))}` : f.dinero(v)}</td>;
}

export default function Desglose({ resultado: r }) {
  const { t } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const p = r.precio;
  const m = r.multiplicadores;
  const impuesto = r.pais.ivaNombre;
  const porHora = (tarifa) => t('resultado.desglose.como.porHora', { horas: f.horas(r.horas.facturables), tarifa: f.dinero(tarifa) });
  const fila = (id, como, valor, conBarra = true) => ({
    id,
    concepto: t(`resultado.desglose.filas.${id}`),
    como,
    valor,
    slot: conBarra ? SLOTS[id] : null,
  });

  const filas = [
    fila('trabajo', porHora(r.tarifas.ajustada), p.manoDeObra),
    fila('operativos', porHora(r.tarifas.costoOperativoHora), p.costosOperativos),
    fila(
      'ajuste',
      t('resultado.desglose.como.ajuste', {
        total: f.factor(m.total),
        cliente: f.factor(m.cliente),
        mercado: f.factor(m.mercado),
        derechos: f.factor(m.derechos),
        urgencia: f.factor(m.urgencia),
      }),
      p.ajusteComercial,
      false,
    ),
    fila('utilidad', t('resultado.desglose.como.utilidad', { porcentaje: f.porcentaje(p.margen) }), p.utilidad),
    fila(
      'aportes',
      p.seguridadSocial > 0
        ? t('resultado.desglose.como.aportes', { porcentaje: f.porcentaje(p.tasaAportes, 1) })
        : t('resultado.desglose.como.aportesNo'),
      p.seguridadSocial,
    ),
    fila(
      'directos',
      p.itemsDirectos.length
        ? p.itemsDirectos.map((c) => cat.concepto(c, r.producto)).join(', ')
        : t('resultado.desglose.como.ninguno'),
      p.costosDirectos,
    ),
  ];
  if (p.compensacionRetencion > 0) {
    filas.push(
      fila(
        'retencion',
        t('resultado.desglose.como.retencion', { porcentaje: f.porcentaje(p.retencionTasa, 1) }),
        p.compensacionRetencion,
      ),
    );
  }
  filas.push(fila('redondeo', t('resultado.desglose.como.redondeo'), p.redondeo));

  // El impuesto a la venta lleva el nombre local (IVA, IGV, ITBIS...).
  const partes = r.distribucion.map((d) => ({
    ...d,
    etiqueta: d.id === 'iva' ? impuesto : t(`parametros.distribucion.${d.id}`),
    slot: SLOTS[d.id],
  }));

  return (
    <>
      <BarraSegmentada partes={partes} etiqueta={t('resultado.desglose.barra')} />
      <p className="texto-secundario texto-pequeno">{t('resultado.desglose.notaBarra')}</p>
      <div className="tabla-envoltura">
        <table className="tabla">
          <caption className="solo-lectores">{t('resultado.desglose.tabla')}</caption>
          <thead>
            <tr>
              <th scope="col">{t('resultado.desglose.columnas.concepto')}</th>
              <th scope="col">{t('resultado.desglose.columnas.como')}</th>
              <th scope="col" className="num">
                {t('resultado.desglose.columnas.valor')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map((linea) => (
              <tr key={linea.id}>
                <th scope="row">
                  {linea.slot ? (
                    <span className={`clave clave-barra serie-${linea.slot}`} aria-hidden="true" />
                  ) : (
                    <span className="clave clave-vacia" aria-hidden="true" />
                  )}
                  {linea.concepto}
                </th>
                <td className="texto-secundario">{linea.como}</td>
                <Valor v={linea.valor} f={f} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={2}>
                {r.pais.iva > 0 ? t('resultado.desglose.sinImpuesto', { impuesto }) : t('resultado.desglose.sinImpuestoNinguno')}
              </th>
              <td className="cifra num">{f.dinero(p.sinIva)}</td>
            </tr>
            {p.iva > 0 ? (
              <>
                <tr>
                  <th scope="row" colSpan={2}>
                    <span className="clave clave-barra serie-7" aria-hidden="true" />
                    {impuesto} ({f.porcentaje(p.iva / p.sinIva)})
                  </th>
                  <td className="cifra num">{f.dinero(p.iva)}</td>
                </tr>
                <tr>
                  <th scope="row" colSpan={2}>
                    {t('resultado.desglose.total')}
                  </th>
                  <td className="cifra num">{f.dinero(p.total)}</td>
                </tr>
              </>
            ) : null}
          </tfoot>
        </table>
      </div>
    </>
  );
}
