/** Paneles pequeños del resultado: salud, recomendaciones, horas, entrega y pagos. */
import { GESTION_PROYECTO } from '../../datos/parametros.js';
import { T, useIdioma } from '../../i18n/IdiomaContext.jsx';
import { nombreFestivo } from '../../i18n/nombres.js';
import { useTextosResultado } from '../../i18n/resultado.js';
import { useFormato } from '../../i18n/useFormato.js';
import Medidor from '../graficas/Medidor.jsx';
import Icono from '../ui/Icono.jsx';

export function Salud({ resultado: r }) {
  const { t } = useIdioma();
  const tx = useTextosResultado();
  return (
    <div className="salud">
      <div className="salud-cabeza">
        <strong className="salud-valor">{r.salud}</strong>
        <span className="texto-secundario">{t('resultado.salud.de100')}</span>
      </div>
      <Medidor valor={r.salud} etiqueta={t('resultado.secciones.salud.titulo')} />
      <ul className="chequeos">
        {r.chequeos.map((c) => (
          <li key={c.id} className={c.ok ? 'chequeo-ok' : 'chequeo-falla'}>
            <Icono
              nombre={c.ok ? 'check' : 'equis'}
              tamano={18}
              titulo={c.ok ? t('resultado.salud.cumple') : t('resultado.salud.noCumple')}
            />
            {tx.chequeo(c)}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ICONOS = { alerta: 'alerta', consejo: 'info', oportunidad: 'estrella' };

export function Recomendaciones({ lista }) {
  const { t } = useIdioma();
  const tx = useTextosResultado();
  if (!lista.length) {
    return <p className="texto-secundario">{t('resultado.recomendaciones.vacio')}</p>;
  }
  return (
    <ul className="recomendaciones">
      {lista.map((rec) => {
        const { titulo, texto } = tx.recomendacion(rec);
        return (
          <li key={rec.id} className={`recomendacion recomendacion-${rec.tipo}`}>
            <Icono nombre={ICONOS[rec.tipo]} />
            <div>
              <p className="recomendacion-tipo">{t(`resultado.recomendaciones.tipos.${rec.tipo}`)}</p>
              <h4>{titulo}</h4>
              <p>{texto}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function DetalleHoras({ resultado: r }) {
  const { t } = useIdioma();
  const f = useFormato();
  const h = r.horas;
  return (
    <div className="tabla-envoltura">
      <table className="tabla">
        <caption className="solo-lectores">{t('resultado.horas.tabla')}</caption>
        <tbody>
          <tr>
            <th scope="row">{t('resultado.horas.estimadas')}</th>
            <td className="texto-secundario">{r.horasManual ? t('resultado.horas.tuEstimacion') : t('resultado.horas.delCatalogo')}</td>
            <td className="cifra num">{f.horas(h.estimadas)}</td>
          </tr>
          <tr>
            <th scope="row">{t('resultado.horas.imprevistos')}</th>
            <td className="texto-secundario">{t('resultado.horas.imprevistosComo', { porcentaje: f.porcentaje(h.imprevistosPct) })}</td>
            <td className="cifra num">{f.horas(h.horasImprevistos)}</td>
          </tr>
          <tr>
            <th scope="row">{t('resultado.horas.revisiones')}</th>
            <td className="texto-secundario">{t('resultado.horas.rondas', { n: h.rondas, horas: f.horas(h.horasPorRonda) })}</td>
            <td className="cifra num">{f.horas(h.horasRevisiones)}</td>
          </tr>
          <tr>
            <th scope="row">{t('resultado.horas.gestion')}</th>
            <td className="texto-secundario">{t('resultado.horas.gestionComo', { porcentaje: f.porcentaje(GESTION_PROYECTO) })}</td>
            <td className="cifra num">{f.horas(h.horasGestion)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2}>
              {t('resultado.horas.cobras')}
            </th>
            <td className="cifra num">{f.horas(h.facturables)}</td>
          </tr>
          <tr>
            <th scope="row" colSpan={2}>
              {t('resultado.horas.reales')}
            </th>
            <td className="cifra num">{f.horas(h.reales)}</td>
          </tr>
          {h.noCobradas > 0 ? (
            <tr>
              <th scope="row" colSpan={2}>
                {t('resultado.horas.aprendizaje')}
              </th>
              <td className="cifra num">{f.horas(h.noCobradas)}</td>
            </tr>
          ) : null}
        </tfoot>
      </table>
    </div>
  );
}

export function Entrega({ resultado: r }) {
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const e = r.entrega;
  return (
    <div className="entrega">
      <p className="entrega-fecha">
        <Icono nombre="calendario" />
        <span>
          <T k="resultado.entrega.fin" valores={{ fecha: f.fecha(e.fin) }} />
        </span>
      </p>
      <p className="texto-secundario">
        {t('resultado.entrega.detalle', { n: e.diasHabiles, horasDia: f.horas(e.horasDia), horas: f.horas(r.horas.reales) })}
      </p>
      {e.festivos.length ? (
        <ul className="festivos">
          {e.festivos.map((festivo) => (
            <li key={festivo.fecha.toISOString()}>
              <span className="cifra">{f.fechaBreve(festivo.fecha)}</span> {nombreFestivo(festivo, idioma)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function PlanPagos({ resultado: r }) {
  const { t } = useIdioma();
  const f = useFormato();
  return (
    <div className="tabla-envoltura">
      <table className="tabla">
        <caption className="solo-lectores">{t('resultado.pagos.tabla')}</caption>
        <thead>
          <tr>
            <th scope="col">{t('resultado.pagos.pago')}</th>
            <th scope="col" className="num">
              {t('resultado.pagos.parte')}
            </th>
            <th scope="col" className="num">
              {t('resultado.pagos.valor')}
            </th>
          </tr>
        </thead>
        <tbody>
          {r.pagos.cuotas.map((c) => (
            <tr key={c.clave}>
              <th scope="row">{t(`parametros.cuotas.${c.clave}`)}</th>
              <td className="cifra num">{f.porcentaje(c.porcentaje)}</td>
              <td className="cifra num">{f.dinero(c.valor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
