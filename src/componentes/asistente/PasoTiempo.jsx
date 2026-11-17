import { claveNivelDominio, URGENCIA } from '../../datos/parametros.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useCatalogo } from '../../i18n/catalogo.js';
import { minusculaInicial } from '../../i18n/index.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { tarifaSugerida } from '../../logica/tarifas.js';
import { CampoDinero, CampoFecha, CampoNumero, Deslizador, GrupoOpciones } from '../ui/Campos.jsx';
import CabezaPaso from './CabezaPaso.jsx';
import NotaResultado, { NotaDato } from './NotaResultado.jsx';

export default function PasoTiempo() {
  const { estado, acciones, resultado: r } = useCotizador();
  const { t } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const { proyecto } = estado;
  const set = acciones.actualizarProyecto;
  const sugerida = tarifaSugerida({
    perfil: estado.perfil,
    producto: r.producto,
    parametros: estado.parametros,
    margen: estado.condiciones.margen,
  });
  const banda = r.mercado.area.junior;
  const area = minusculaInicial(t(`parametros.areas.${r.mercado.area.id}`));
  const producto = cat.producto(r.producto);

  return (
    <div className="paso-contenido">
      <CabezaPaso numero={3} titulo={t('cotizar.tiempo.titulo')}>
        {t('cotizar.tiempo.intro')}
      </CabezaPaso>

      <section className="bloque bloque-destacado" aria-labelledby="titulo-horas">
        <h3 id="titulo-horas">{t('cotizar.tiempo.horas')}</h3>
        <div className="rejilla-campos">
          <CampoNumero
            etiqueta={t('cotizar.tiempo.horasCampo')}
            explicacion="horasEstimadas"
            valor={r.horas.estimadas}
            alCambiar={(v) => set('horasEstimadas', v)}
            min={0.5}
            max={5000}
            paso={1}
            decimales
            sufijo="h"
            ayuda={t('cotizar.tiempo.horasAyuda', { horas: f.horas(r.horasCatalogo) })}
          />
        </div>
        {proyecto.horasManual ? (
          <button type="button" className="boton boton-pequeno" onClick={acciones.usarHorasSugeridas}>
            {t('cotizar.tiempo.usarHoras', { horas: f.horas(r.horasCatalogo) })}
          </button>
        ) : null}
      </section>

      <section className="bloque bloque-destacado" aria-labelledby="titulo-tarifa">
        <h3 id="titulo-tarifa">{t('cotizar.tiempo.tarifa')}</h3>
        <div className="rejilla-campos">
          <CampoDinero
            etiqueta={t('cotizar.tiempo.tarifaCampo')}
            explicacion="tarifaDeseada"
            valor={proyecto.tarifaDeseada}
            alCambiar={(v) => set('tarifaDeseada', v)}
            ayuda={t('cotizar.tiempo.tarifaAyuda')}
          />
        </div>
        <p className="texto-pequeno texto-secundario">{t('cotizar.tiempo.referencias')}</p>
        <ul className="referencias">
          <li>
            {t('cotizar.tiempo.tuMinimo')} <strong className="cifra">{f.dinero(r.tarifas.minima)}</strong>
          </li>
          <li>
            {t('cotizar.tiempo.sugerida')} <strong className="cifra">{f.dinero(sugerida)}</strong>
          </li>
          <li>{t('cotizar.tiempo.junior', { area, min: f.dinero(banda[0]), max: f.dinero(banda[1]) })}</li>
        </ul>
        {proyecto.tarifaPersonalizada ? (
          <button type="button" className="boton boton-pequeno" onClick={acciones.usarTarifaSugerida}>
            {t('cotizar.tiempo.usarSugerida', { valor: f.dinero(sugerida) })}
          </button>
        ) : null}
      </section>

      <section className="bloque bloque-destacado" aria-labelledby="titulo-dominio">
        <h3 id="titulo-dominio">{t('cotizar.tiempo.dominio')}</h3>
        <Deslizador
          etiqueta={t('cotizar.tiempo.dominioCampo', { producto: producto.nombre })}
          explicacion="especialidad"
          valor={proyecto.especialidad}
          alCambiar={(v) => set('especialidad', v)}
          formato={(v) => f.porcentaje(v / 100)}
          marcas={t('cotizar.tiempo.marcas')}
          ayuda={t('cotizar.tiempo.dominioAyuda')}
        />
        <dl className="efectos">
          <div>
            <dt>{t('cotizar.tiempo.nivel')}</dt>
            <dd>{t(`parametros.dominio.${claveNivelDominio(proyecto.especialidad)}`)}</dd>
          </div>
          <div>
            <dt>{t('cotizar.tiempo.multiplica')}</dt>
            <dd className="cifra">{f.factor(r.tarifas.factores.dominio)}</dd>
          </div>
          <div>
            <dt>{t('cotizar.tiempo.colchon')}</dt>
            <dd className="cifra">{f.porcentaje(r.horas.imprevistosPct)}</dd>
          </div>
          <div>
            <dt>{t('cotizar.tiempo.noCobradas')}</dt>
            <dd className="cifra">{f.horas(r.horas.noCobradas)}</dd>
          </div>
        </dl>
        <p className="texto-secundario texto-pequeno">{t('cotizar.tiempo.dominioNota')}</p>
      </section>

      <section className="bloque" aria-labelledby="titulo-ritmo">
        <h3 id="titulo-ritmo">{t('cotizar.tiempo.ritmo')}</h3>
        <div className="rejilla-campos">
          <CampoNumero
            etiqueta={t('cotizar.tiempo.revisiones')}
            explicacion="revisiones"
            valor={proyecto.revisiones}
            alCambiar={(v) => set('revisiones', v)}
            min={0}
            max={10}
            ayuda={
              r.producto.aplicaRevisiones
                ? t('cotizar.tiempo.revisionesAyuda', { horas: f.horas(r.horas.horasPorRonda) })
                : t('cotizar.tiempo.sinRevisiones')
            }
          />
          <CampoNumero
            etiqueta={t('cotizar.tiempo.horasDia')}
            explicacion="horasDia"
            valor={proyecto.horasDia}
            alCambiar={(v) => set('horasDia', v)}
            min={1}
            max={14}
            sufijo="h"
          />
          <CampoFecha
            etiqueta={t('cotizar.tiempo.inicio')}
            explicacion="fechaInicio"
            valor={proyecto.fechaInicio}
            alCambiar={(v) => set('fechaInicio', v)}
          />
        </div>
        <GrupoOpciones
          leyenda={t('cotizar.tiempo.urgencia')}
          explicacion="urgencia"
          valor={proyecto.urgencia}
          alCambiar={(v) => set('urgencia', v)}
          columnas={3}
          opciones={Object.values(URGENCIA).map((u) => ({
            valor: u.id,
            titulo: t(`parametros.urgencia.${u.id}.nombre`),
            detalle: u.factor === 1 ? t('cotizar.tiempo.sinRecargo') : `+${f.porcentaje(u.factor - 1)}`,
            descripcion: t(`parametros.urgencia.${u.id}.descripcion`),
          }))}
        />
      </section>

      <NotaResultado>
        <NotaDato
          etiqueta={t('cotizar.tiempo.horasCobrar')}
          explicacion="horasACobrar"
          cifra={f.horas(r.horas.facturables)}
          detalle={t('cotizar.tiempo.horasCobrarDetalle', { horas: f.horas(r.horas.estimadas) })}
        />
        <NotaDato
          etiqueta={t('cotizar.tiempo.tarifaAjustada')}
          explicacion="tarifaAjustada"
          cifra={f.dinero(r.tarifas.ajustada)}
          detalle={t('cotizar.tiempo.tarifaAjustadaDetalle', {
            deseada: f.dinero(r.tarifas.deseada),
            factor: f.factor(r.tarifas.factores.total),
          })}
        />
      </NotaResultado>
    </div>
  );
}
