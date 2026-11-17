/**
 * La cotización formal para el cliente. En pantalla se ve como una hoja;
 * al imprimir (o guardar como PDF) es lo único que sale en el papel.
 * Muestra el valor del servicio, los costos directos, el impuesto a la venta y las condiciones,
 * no los cálculos internos (utilidad, aportes, tarifa mínima).
 */
import { useCatalogo } from '../../i18n/catalogo.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';

export default function CotizacionImprimible({ resultado: r, estado, codigo }) {
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const { perfil, proyecto, condiciones } = estado;
  const producto = cat.producto(r.producto);
  const impuesto = r.pais.ivaNombre;
  const hoy = new Date();
  const vence = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + (Number(condiciones.vigenciaDias) || 15));
  const valorServicio = r.precio.sinIva - r.precio.costosDirectos;
  const derechos = r.contexto.derechos.id;

  return (
    <article className="hoja" data-carrera={r.producto.carrera} aria-label={t('resultado.hoja.aria')}>
      <header className="hoja-cabeza">
        <div>
          <p className="hoja-tipo">{t('resultado.hoja.tipo')}</p>
          <h3>{producto.nombre}</h3>
        </div>
        <dl className="hoja-datos">
          <div>
            <dt>{t('resultado.hoja.numero')}</dt>
            <dd>{codigo}</dd>
          </div>
          <div>
            <dt>{t('resultado.hoja.fecha')}</dt>
            <dd>{f.fechaMedia(hoy)}</dd>
          </div>
          <div>
            <dt>{t('resultado.hoja.validaHasta')}</dt>
            <dd>{f.fechaMedia(vence)}</dd>
          </div>
        </dl>
      </header>

      <div className="hoja-partes">
        <div>
          <h4>{t('resultado.hoja.de')}</h4>
          <p>{perfil.nombre || t('resultado.hoja.tuNombre')}</p>
          <p>{cat.carrera(perfil.carrera)}</p>
          <p>{[perfil.ciudad, perfil.correo].filter(Boolean).join(', ')}</p>
        </div>
        <div>
          <h4>{t('resultado.hoja.para')}</h4>
          <p>{condiciones.clienteNombre || t('resultado.hoja.nombreCliente')}</p>
          <p>{t(`parametros.clientes.${r.contexto.cliente.id}.nombre`)}</p>
        </div>
      </div>

      <section>
        <h4>{t('resultado.hoja.alcance')}</h4>
        <p>
          {producto.descripcion}{' '}
          {t('resultado.hoja.cantidad', {
            cantidad: f.numero(r.unidades),
            unidad: cat.unidad(r.producto, r.unidades),
            nivel: t(`parametros.niveles.${r.nivel.id}.nombre`).toLocaleLowerCase(idioma),
          })}
        </p>
        {proyecto.alcance ? <p>{proyecto.alcance}</p> : null}
        <ul>
          {producto.entregables.map((e) => (
            <li key={e}>{e}</li>
          ))}
          {r.producto.aplicaRevisiones ? <li>{t('resultado.hoja.revisiones', { n: r.horas.rondas })}</li> : null}
          <li>
            {t(`parametros.derechos.${derechos}.nombre`)}: {t(`parametros.derechos.${derechos}.descripcion`)}
          </li>
        </ul>
      </section>

      <table className="hoja-tabla">
        <thead>
          <tr>
            <th scope="col">{t('resultado.hoja.concepto')}</th>
            <th scope="col" className="num">
              {t('resultado.hoja.valor')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('resultado.hoja.servicio', { producto: producto.nombre })}</td>
            <td className="num cifra">{f.dinero(valorServicio)}</td>
          </tr>
          {r.precio.itemsDirectos.map((c) => (
            <tr key={c.id ?? c.concepto}>
              <td>{cat.concepto(c, r.producto)}</td>
              <td className="num cifra">{f.dinero(c.valorLocal ?? c.valorCOP)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">{t('resultado.hoja.subtotal')}</th>
            <td className="num cifra">{f.dinero(r.precio.sinIva)}</td>
          </tr>
          <tr>
            <th scope="row">{r.precio.iva > 0 ? `${impuesto} ${f.porcentaje(r.precio.iva / r.precio.sinIva)}` : impuesto}</th>
            <td className="num cifra">
              {r.precio.iva > 0 ? f.dinero(r.precio.iva) : t('resultado.hoja.noResponsable', { impuesto })}
            </td>
          </tr>
          <tr className="hoja-total">
            <th scope="row">{t('resultado.hoja.total')}</th>
            <td className="num cifra">{f.dinero(r.precio.total)}</td>
          </tr>
        </tfoot>
      </table>

      <section>
        <h4>{t('resultado.hoja.formaPago')}</h4>
        <ul>
          {r.pagos.cuotas.map((c) => (
            <li key={c.clave}>
              {t(`parametros.cuotas.${c.clave}`)}: {f.dinero(c.valor)} ({f.porcentaje(c.porcentaje)})
            </li>
          ))}
        </ul>
        <h4>{t('resultado.hoja.tiempoEntrega')}</h4>
        <p>{t('resultado.hoja.dias', { n: r.entrega.diasHabiles })}</p>
      </section>

      <footer className="hoja-firma">
        <div>
          <span className="hoja-linea" />
          <p>{perfil.nombre || t('resultado.hoja.firma')}</p>
        </div>
        <div>
          <span className="hoja-linea" />
          <p>{t('resultado.hoja.aprobado')}</p>
        </div>
      </footer>
    </article>
  );
}
