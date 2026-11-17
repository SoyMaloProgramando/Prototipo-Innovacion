import { CARRERAS } from '../../datos/catalogo.js';
import { buscarPais, paisesOrdenados, REGIONES } from '../../datos/paises.js';
import { EXPERIENCIA, FORMACION, PORTAFOLIO, SEMANAS_POR_MES } from '../../datos/parametros.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { nombreCarrera } from '../../i18n/catalogo.js';
import { T, useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { gastosPersonalesMes } from '../../logica/tarifas.js';
import BarraSegmentada from '../graficas/BarraSegmentada.jsx';
import { TituloConAyuda } from '../ui/Ayuda.jsx';
import { CampoDinero, CampoNumero, CampoSelector, CampoTexto, Deslizador, GrupoOpciones } from '../ui/Campos.jsx';
import Icono from '../ui/Icono.jsx';
import { useTipoDeCambio } from '../../hooks/useTipoDeCambio.js';
import CabezaPaso from './CabezaPaso.jsx';
import NotaResultado, { NotaDato } from './NotaResultado.jsx';

/** Qué tan realista es el porcentaje de horas que se cobran. */
function opinionFacturable(porcentaje) {
  if (porcentaje < 40) return { tono: 'aviso', icono: 'alerta', clave: 'muyBajo' };
  if (porcentaje < 50) return { tono: 'neutro', icono: 'info', clave: 'bajo' };
  if (porcentaje <= 70) return { tono: 'bien', icono: 'check', clave: 'normal' };
  if (porcentaje <= 80) return { tono: 'neutro', icono: 'info', clave: 'alto' };
  return { tono: 'aviso', icono: 'alerta', clave: 'muyAlto' };
}

export default function PasoPerfil() {
  const dolar = useTipoDeCambio();
  const { estado, acciones, resultado: r } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const { perfil } = estado;
  const set = acciones.actualizarPerfil;
  const pais = buscarPais(estado.parametros.pais);

  const horasMesTotales = (Number(perfil.horasSemana) || 0) * SEMANAS_POR_MES;
  const horasCobradas = r.tarifas.horasMes;
  const horasSinCobrar = Math.max(0, horasMesTotales - horasCobradas);
  const opinion = opinionFacturable(perfil.porcentajeFacturable);
  const experiencia = t('parametros.experiencia');

  const gruposPaises = REGIONES.map((region) => ({
    etiqueta: t(`comun.regiones.${region}`),
    opciones: paisesOrdenados(idioma)
      .filter((p) => p.region === region)
      .map((p) => ({ valor: p.id, texto: `${p.nombres[idioma]} (${p.moneda.codigo})` })),
  })).filter((g) => g.opciones.length > 0);

  const textoDolar =
    dolar.situacion === 'fijo' ? '' : t(`cotizar.perfil.dolar.${dolar.situacion}`, { valor: dolar.valor, fecha: dolar.fecha ?? '' });
  return (
    <div className="paso-contenido">
      <CabezaPaso numero={1} titulo={t('cotizar.perfil.titulo')} tenerAMano={t('cotizar.perfil.tenerAMano')}>
        {t('cotizar.perfil.intro')}
      </CabezaPaso>

      <section className="bloque" aria-labelledby="titulo-datos">
        <h3 id="titulo-datos">{t('cotizar.perfil.datos')}</h3>
        <div className="rejilla-campos">
          <CampoSelector
            etiqueta={t('cotizar.perfil.pais')}
            explicacion="pais"
            valor={pais.id}
            alCambiar={acciones.cambiarPais}
            grupos={gruposPaises}
            ayuda={`${t('cotizar.perfil.paisAyuda', { moneda: pais.moneda.codigo })}${textoDolar ? ` ${textoDolar}` : ''}`}
          />
        </div>
        <GrupoOpciones
          leyenda={t('cotizar.perfil.carrera')}
          explicacion="carrera"
          variante="segmentado"
          valor={perfil.carrera}
          alCambiar={acciones.cambiarCarrera}
          opciones={Object.values(CARRERAS).map((c) => ({ valor: c.id, titulo: nombreCarrera(idioma, c.id) }))}
        />

        <div className="rejilla-campos">
          <CampoTexto
            etiqueta={t('cotizar.perfil.nombre')}
            explicacion="nombre"
            valor={perfil.nombre}
            alCambiar={(v) => set('nombre', v)}
            autoComplete="name"
            placeholder={t('cotizar.perfil.nombreEj')}
          />
          <CampoTexto
            etiqueta={t('cotizar.perfil.ciudad')}
            explicacion="ciudad"
            valor={perfil.ciudad}
            alCambiar={(v) => set('ciudad', v)}
            placeholder={t('cotizar.perfil.ciudadEj', { ciudad: pais.ciudad })}
          />
          <CampoTexto
            etiqueta={t('cotizar.perfil.contacto')}
            explicacion="contacto"
            valor={perfil.correo}
            alCambiar={(v) => set('correo', v)}
            placeholder={t('cotizar.perfil.contactoEj')}
          />
        </div>
      </section>

      <section className="bloque" aria-labelledby="titulo-experiencia">
        <h3 id="titulo-experiencia">{t('cotizar.perfil.experiencia')}</h3>
        <p className="bloque-intro">{t('cotizar.perfil.experienciaIntro')}</p>
        <GrupoOpciones
          leyenda={t('cotizar.perfil.proyectos')}
          explicacion="proyectosPrevios"
          valor={perfil.proyectosPrevios}
          alCambiar={(v) => set('proyectosPrevios', Number(v))}
          columnas={4}
          opciones={EXPERIENCIA.map((e) => ({ valor: e.id, titulo: experiencia[e.id], detalle: f.factor(e.factor) }))}
        />
        <GrupoOpciones
          leyenda={t('cotizar.perfil.portafolio')}
          explicacion="portafolio"
          valor={perfil.portafolio}
          alCambiar={(v) => set('portafolio', v)}
          columnas={3}
          opciones={Object.values(PORTAFOLIO).map((e) => ({
            valor: e.id,
            titulo: t(`parametros.portafolio.${e.id}`),
            detalle: f.factor(e.factor),
          }))}
        />
        <GrupoOpciones
          leyenda={t('cotizar.perfil.formacion')}
          explicacion="formacion"
          valor={perfil.formacion}
          alCambiar={(v) => set('formacion', v)}
          columnas={3}
          opciones={Object.values(FORMACION).map((e) => ({
            valor: e.id,
            titulo: t(`parametros.formacion.${e.id}`),
            detalle: f.factor(e.factor),
          }))}
        />
      </section>

      <section className="bloque" aria-labelledby="titulo-gastos">
        <TituloConAyuda id="titulo-gastos" explicacion="gastos" tipo="poner">
          {t('cotizar.perfil.gastos')}
        </TituloConAyuda>
        <p className="bloque-intro">
          <T k="cotizar.perfil.gastosIntro" />
        </p>
        <div className="rejilla-campos">
          <CampoDinero
            etiqueta={t('cotizar.perfil.vivienda')}
            explicacion="gastoVivienda"
            valor={perfil.gastos.vivienda}
            alCambiar={(v) => set('gastos.vivienda', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.alimentacion')}
            explicacion="gastoAlimentacion"
            valor={perfil.gastos.alimentacion}
            alCambiar={(v) => set('gastos.alimentacion', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.transporte')}
            explicacion="gastoTransporte"
            valor={perfil.gastos.transporte}
            alCambiar={(v) => set('gastos.transporte', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.otros')}
            explicacion="gastoOtros"
            valor={perfil.gastos.otros}
            alCambiar={(v) => set('gastos.otros', v)}
          />
          <CampoNumero
            etiqueta={t('cotizar.perfil.ahorro')}
            explicacion="ahorro"
            valor={perfil.ahorro}
            alCambiar={(v) => set('ahorro', v)}
            min={0}
            max={60}
            sufijo="%"
            ayuda={t('cotizar.perfil.ahorroAyuda')}
          />
        </div>
        <p className="calculo-linea">
          <T
            k="cotizar.perfil.gastosLinea"
            valores={{
              gastos: f.dinero(gastosPersonalesMes(perfil)),
              ahorro: f.numero(perfil.ahorro),
              necesidad: f.dinero(r.tarifas.necesidadMensual),
            }}
          />
        </p>
      </section>

      <section className="bloque" aria-labelledby="titulo-tiempo">
        <h3 id="titulo-tiempo">{t('cotizar.perfil.tiempo')}</h3>
        <p className="bloque-intro">{t('cotizar.perfil.tiempoIntro')}</p>
        <div className="rejilla-campos rejilla-tiempo">
          <CampoNumero
            etiqueta={t('cotizar.perfil.horasSemana')}
            explicacion="horasSemana"
            valor={perfil.horasSemana}
            alCambiar={(v) => set('horasSemana', v)}
            min={5}
            max={80}
            sufijo="h"
            ayuda={t('cotizar.perfil.horasSemanaAyuda')}
          />
          <Deslizador
            etiqueta={t('cotizar.perfil.porcentaje')}
            explicacion="porcentajeFacturable"
            valor={perfil.porcentajeFacturable}
            alCambiar={(v) => set('porcentajeFacturable', v)}
            min={30}
            max={90}
            paso={5}
            formato={(v) => f.porcentaje(v / 100)}
            marcas={[f.porcentaje(0.3), f.porcentaje(0.6), f.porcentaje(0.9)]}
            ayuda={
              <span className={`opinion opinion-${opinion.tono}`}>
                <Icono nombre={opinion.icono} tamano={18} />
                <span>{t(`cotizar.perfil.opinion.${opinion.clave}`)}</span>
              </span>
            }
          />
        </div>

        <div className="tiempo-mes">
          <TituloConAyuda nivel={4} explicacion="horasFacturablesMes">
            {t('cotizar.perfil.resultadoHoras')}
          </TituloConAyuda>
          <p className="tiempo-formula" aria-live="polite">
            <T
              k="cotizar.perfil.formula"
              valores={{
                horas: f.numero(perfil.horasSemana),
                semanas: f.numero(4.33, 2),
                porcentaje: f.porcentaje(perfil.porcentajeFacturable / 100),
                total: f.horas(horasCobradas),
              }}
            />
          </p>
          <BarraSegmentada
            etiqueta={t('cotizar.perfil.barra')}
            formatoValor={f.horas}
            mostrarValores
            partes={[
              { id: 'cobradas', etiqueta: t('cotizar.perfil.cobradas'), valor: horasCobradas, slot: 1 },
              { id: 'sin-cobrar', etiqueta: t('cotizar.perfil.sinCobrar'), valor: horasSinCobrar, slot: 3 },
            ]}
          />
          <p className="tiempo-uso">
            <T
              k="cotizar.perfil.paraQue"
              valores={{
                necesidad: f.dinero(r.tarifas.necesidadMensual),
                horas: f.horas(horasCobradas),
                minima: f.dinero(r.tarifas.minima),
              }}
            />
          </p>
        </div>
      </section>

      <section className="bloque" aria-labelledby="titulo-negocio">
        <TituloConAyuda id="titulo-negocio" explicacion="negocio" tipo="poner">
          {t('cotizar.perfil.negocio')}
        </TituloConAyuda>
        <p className="bloque-intro">{t('cotizar.perfil.negocioIntro')}</p>
        <div className="rejilla-campos">
          <CampoDinero
            etiqueta={t('cotizar.perfil.internet')}
            explicacion="internet"
            valor={perfil.negocio.internet}
            alCambiar={(v) => set('negocio.internet', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.energia')}
            explicacion="energia"
            valor={perfil.negocio.energia}
            alCambiar={(v) => set('negocio.energia', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.software')}
            explicacion="software"
            valor={perfil.negocio.software}
            alCambiar={(v) => set('negocio.software', v)}
            ayuda={t('cotizar.perfil.softwareAyuda')}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.otrosNegocio')}
            explicacion="otrosNegocio"
            valor={perfil.negocio.otros}
            alCambiar={(v) => set('negocio.otros', v)}
          />
          <CampoDinero
            etiqueta={t('cotizar.perfil.equipo')}
            explicacion="valorEquipo"
            valor={perfil.valorEquipo}
            alCambiar={(v) => set('valorEquipo', v)}
            ayuda={t('cotizar.perfil.equipoAyuda')}
          />
          <CampoNumero
            etiqueta={t('cotizar.perfil.vidaUtil')}
            explicacion="vidaUtil"
            valor={perfil.vidaUtilAnios}
            alCambiar={(v) => set('vidaUtilAnios', v)}
            min={1}
            max={10}
            sufijo={t('cotizar.perfil.anios')}
          />
        </div>
      </section>

      <NotaResultado>
        <NotaDato
          etiqueta={t('cotizar.perfil.notaMinima')}
          explicacion="tarifaMinima"
          cifra={f.dinero(r.tarifas.minima)}
          detalle={t('cotizar.perfil.notaMinimaDetalle')}
        />
        <NotaDato
          etiqueta={t('cotizar.perfil.notaOperativo')}
          explicacion="costoOperativo"
          cifra={f.dinero(r.tarifas.costoOperativoHora)}
          detalle={t('cotizar.perfil.notaOperativoDetalle', { depreciacion: f.dinero(r.tarifas.gastosNegocio.depreciacion) })}
        />
      </NotaResultado>
    </div>
  );
}
