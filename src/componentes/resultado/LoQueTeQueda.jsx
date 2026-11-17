/** Del total que paga el cliente, cuánto te queda de verdad. */
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import BarraSegmentada from '../graficas/BarraSegmentada.jsx';

export default function LoQueTeQueda({ resultado: r }) {
  const { t } = useIdioma();
  const f = useFormato();
  const n = r.neto;
  // La DIAN y el 4 por mil son de Colombia; en otros países se habla del fisco
  // y del impuesto a las transacciones con su nombre legal (si lo hay).
  const colombia = r.pais.id === 'CO';
  const impuesto = r.pais.ivaNombre;
  const gmf = !colombia && r.pais.gmfNombre ? r.pais.gmfNombre : t('resultado.neto.cuatroPorMil');

  const partes = [
    { id: 'ganancia', etiqueta: t('resultado.neto.partes.ganancia'), valor: Math.max(0, n.ganancia), slot: 1 },
    { id: 'aportes', etiqueta: t('resultado.neto.partes.aportes'), valor: n.aportes, slot: 4 },
    { id: 'operativos', etiqueta: t('resultado.neto.partes.operativos'), valor: n.costosOperativos, slot: 2 },
    { id: 'directos', etiqueta: t('resultado.neto.partes.directos'), valor: n.costosDirectos, slot: 5 },
    { id: 'retencion', etiqueta: t('resultado.neto.partes.retencion'), valor: n.retencion, slot: 6 },
    { id: 'iva', etiqueta: t('resultado.neto.partes.iva', { impuesto, colombia }), valor: n.iva, slot: 7 },
    { id: 'gmf', etiqueta: gmf, valor: n.gmf, slot: 8 },
  ];

  const filas = [
    { id: 'total', texto: t('resultado.neto.filas.total'), valor: n.total, tipo: 'total' },
    { id: 'retencion', texto: t('resultado.neto.filas.retencion'), valor: -n.retencion },
    { id: 'consignado', texto: t('resultado.neto.filas.consignado'), valor: n.consignado, tipo: 'subtotal' },
    { id: 'iva', texto: t('resultado.neto.filas.iva', { impuesto, colombia }), valor: -n.iva },
    { id: 'aportes', texto: t('resultado.neto.filas.aportes'), valor: -n.aportes },
    { id: 'directos', texto: t('resultado.neto.filas.directos'), valor: -n.costosDirectos },
    { id: 'operativos', texto: t('resultado.neto.filas.operativos'), valor: -n.costosOperativos },
    { id: 'gmf', texto: t('resultado.neto.filas.gmf', { nombre: gmf }), valor: -n.gmf },
  ].filter((fila) => fila.tipo || Math.abs(fila.valor) > 0.5);

  return (
    <>
      {n.ganancia > 0 ? (
        <BarraSegmentada partes={partes} etiqueta={t('resultado.neto.barra')} />
      ) : (
        <p className="aviso aviso-alerta">{t('resultado.neto.pierdes')}</p>
      )}
      <div className="tabla-envoltura">
        <table className="tabla">
          <caption className="solo-lectores">{t('resultado.neto.tabla')}</caption>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.id} className={fila.tipo ? `fila-${fila.tipo}` : ''}>
                <th scope="row">{fila.texto}</th>
                <td className="cifra num">{fila.valor < -0.5 ? `−${f.dinero(-fila.valor)}` : f.dinero(fila.valor)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">{t('resultado.neto.teQueda')}</th>
              <td className="cifra num">{f.dinero(n.ganancia)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <dl className="mini-cifras">
        <div>
          <dt>{t('resultado.neto.porHoraCobrada')}</dt>
          <dd className="cifra">{f.dinero(n.porHoraFacturable)}</dd>
        </div>
        <div>
          <dt>{t('resultado.neto.porHoraReal')}</dt>
          <dd className="cifra">{f.dinero(n.porHoraReal)}</dd>
        </div>
        <div>
          <dt>{t('resultado.neto.parteDelTotal')}</dt>
          <dd className="cifra">{f.porcentaje(n.margenNeto)}</dd>
        </div>
      </dl>
      {r.precio.retencionTasa > 0 ? (
        <p className="texto-secundario texto-pequeno">{t('resultado.neto.notaRetencion')}</p>
      ) : null}
    </>
  );
}
