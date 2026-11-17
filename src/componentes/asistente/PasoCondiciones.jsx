import { useState } from 'react';
import { DERECHOS, ESQUEMAS_PAGO, MERCADOS, TIPOS_CLIENTE } from '../../datos/parametros.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useCatalogo } from '../../i18n/catalogo.js';
import { T, useIdioma } from '../../i18n/IdiomaContext.jsx';
import { nombreRetencion } from '../../i18n/nombres.js';
import { useFormato } from '../../i18n/useFormato.js';
import { opcionesRetencion, tasaSeguridadSocial } from '../../logica/impuestos.js';
import { aMonedaLocal } from '../../logica/paises.js';
import { TituloConAyuda } from '../ui/Ayuda.jsx';
import {
  CampoAreaTexto,
  CampoDinero,
  CampoNumero,
  CampoSelector,
  CampoTexto,
  Deslizador,
  GrupoOpciones,
  Interruptor,
} from '../ui/Campos.jsx';
import Icono from '../ui/Icono.jsx';
import CabezaPaso from './CabezaPaso.jsx';
import NotaResultado, { NotaDato } from './NotaResultado.jsx';

/** Formulario para agregar un costo propio, en la moneda del país o en dólares. */
function NuevoCosto({ alAgregar, monedaLocal }) {
  const { t } = useIdioma();
  const [concepto, setConcepto] = useState('');
  const [valor, setValor] = useState(0);
  const [enDolares, setEnDolares] = useState(false);
  const pideMoneda = monedaLocal !== 'USD';
  const moneda = enDolares && pideMoneda ? 'USD' : monedaLocal;
  return (
    <form
      className="nuevo-costo"
      onSubmit={(e) => {
        e.preventDefault();
        if (!concepto.trim() || !valor) return;
        alAgregar({ concepto: concepto.trim(), valor, moneda });
        setConcepto('');
        setValor(0);
      }}
    >
      <CampoTexto
        etiqueta={t('cotizar.condiciones.nuevoConcepto')}
        explicacion="costoConcepto"
        valor={concepto}
        alCambiar={setConcepto}
        placeholder={t('cotizar.condiciones.nuevoConceptoEj')}
      />
      <CampoDinero
        etiqueta={t('cotizar.condiciones.nuevoValor')}
        explicacion="costoValor"
        valor={valor}
        alCambiar={setValor}
        moneda={moneda}
      />
      {pideMoneda ? (
        <CampoSelector
          etiqueta={t('cotizar.condiciones.moneda')}
          explicacion="costoMoneda"
          valor={moneda === 'USD' ? 'USD' : 'local'}
          alCambiar={(v) => setEnDolares(v === 'USD')}
          opciones={[
            { valor: 'local', texto: t('cotizar.condiciones.monedaLocal', { codigo: monedaLocal }) },
            { valor: 'USD', texto: t('cotizar.condiciones.dolares') },
          ]}
        />
      ) : null}
      <button type="submit" className="boton" disabled={!concepto.trim() || !valor}>
        <Icono nombre="mas" />
        {t('cotizar.condiciones.agregar')}
      </button>
    </form>
  );
}

export default function PasoCondiciones() {
  const { estado, acciones, resultado: r } = useCotizador();
  const { t } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const { condiciones, proyecto, parametros } = estado;
  const set = acciones.actualizarCondiciones;
  const pais = parametros.pais ?? 'CO';
  const monedaLocal = parametros.moneda ?? 'COP';

  const factorTexto = (factor) => {
    if (factor === 1) return t('cotizar.condiciones.sinAjuste');
    return factor > 1 ? `+${f.porcentaje(factor - 1)}` : `−${f.porcentaje(1 - factor)}`;
  };

  const retenciones = opcionesRetencion(parametros);
  const hayRetencion = retenciones.some((x) => x.id !== 'ninguna');
  const automatica = nombreRetencion(t, pais, r.precio.retencionId);
  const tieneAportes = tasaSeguridadSocial(parametros) > 0;
  const tieneIva = Number(parametros.iva) > 0;
  const impuesto = parametros.ivaNombre ?? 'IVA';
  const tieneGmf = Number(parametros.gmf) > 0;

  return (
    <div className="paso-contenido">
      <CabezaPaso numero={4} titulo={t('cotizar.condiciones.titulo')} tenerAMano={t('cotizar.condiciones.tenerAMano')}>
        {t('cotizar.condiciones.intro')}
      </CabezaPaso>

      <section className="bloque" aria-labelledby="titulo-cliente">
        <h3 id="titulo-cliente">{t('cotizar.condiciones.cliente')}</h3>
        <CampoTexto
          etiqueta={t('cotizar.condiciones.clienteNombre')}
          explicacion="clienteNombre"
          valor={condiciones.clienteNombre}
          alCambiar={(v) => set('clienteNombre', v)}
          placeholder={t('cotizar.condiciones.clienteEj')}
        />
        <GrupoOpciones
          leyenda={t('cotizar.condiciones.quienPaga')}
          explicacion="tipoCliente"
          valor={condiciones.tipoCliente}
          alCambiar={(v) => set('tipoCliente', v)}
          columnas={3}
          opciones={Object.values(TIPOS_CLIENTE).map((c) => ({
            valor: c.id,
            titulo: t(`parametros.clientes.${c.id}.nombre`),
            detalle: factorTexto(c.factor),
            descripcion: t(`parametros.clientes.${c.id}.descripcion`),
          }))}
        />
        <GrupoOpciones
          leyenda={t('cotizar.condiciones.deDonde')}
          explicacion="mercado"
          valor={condiciones.mercado}
          alCambiar={(v) => set('mercado', v)}
          columnas={3}
          opciones={Object.values(MERCADOS).map((m) => ({
            valor: m.id,
            titulo: t(`parametros.mercados.${m.id}`),
            detalle: factorTexto(m.factor),
          }))}
        />
        <GrupoOpciones
          leyenda={t('cotizar.condiciones.derechos')}
          explicacion="derechos"
          valor={condiciones.derechos}
          alCambiar={(v) => set('derechos', v)}
          columnas={3}
          opciones={Object.values(DERECHOS).map((d) => ({
            valor: d.id,
            titulo: t(`parametros.derechos.${d.id}.nombre`),
            detalle: factorTexto(d.factor),
            descripcion: t(`parametros.derechos.${d.id}.descripcion`),
          }))}
        />
      </section>

      <section className="bloque" aria-labelledby="titulo-costos">
        <TituloConAyuda id="titulo-costos" explicacion="costosDirectos" tipo="poner">
          {t('cotizar.condiciones.costos')}
        </TituloConAyuda>
        <p className="bloque-intro">
          <T k="cotizar.condiciones.costosIntro" />
        </p>
        {condiciones.costosDirectos.length === 0 ? (
          <p className="vacio">{t('cotizar.condiciones.sinCostos')}</p>
        ) : (
          <ul className="costos">
            {condiciones.costosDirectos.map((c) => {
              const concepto = cat.concepto(c, r.producto);
              const enDolares = c.moneda === 'USD' && monedaLocal !== 'USD';
              return (
                <li key={c.id} className={c.activo ? '' : 'costo-inactivo'}>
                  <label className="costo-check">
                    <input
                      type="checkbox"
                      checked={c.activo}
                      onChange={(e) => acciones.actualizarCosto(c.id, { activo: e.target.checked })}
                    />
                    <span>{concepto}</span>
                  </label>
                  <span className="cifra costo-valor">
                    {enDolares
                      ? `US$ ${f.numero(c.valor, 2)} ≈ ${f.dinero(aMonedaLocal(c.valor, 'USD', parametros))}`
                      : f.dinero(aMonedaLocal(c.valor, c.moneda ?? monedaLocal, parametros))}
                  </span>
                  {c.propio ? (
                    <button
                      type="button"
                      className="boton boton-fantasma boton-pequeno boton-peligro"
                      onClick={() => acciones.quitarCosto(c.id)}
                      aria-label={t('cotizar.condiciones.quitar', { concepto })}
                    >
                      <Icono nombre="papelera" />
                    </button>
                  ) : (
                    <span />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <NuevoCosto alAgregar={acciones.agregarCosto} monedaLocal={monedaLocal} />
        <p className="texto-secundario">
          <T k="cotizar.condiciones.totalCostos" valores={{ total: f.dinero(r.precio.costosDirectos) }} />
        </p>
      </section>

      <section className="bloque" aria-labelledby="titulo-utilidad">
        <h3 id="titulo-utilidad">{t('cotizar.condiciones.utilidad')}</h3>
        <Deslizador
          etiqueta={t('cotizar.condiciones.margen')}
          explicacion="margen"
          valor={condiciones.margen}
          alCambiar={(v) => set('margen', v)}
          min={0}
          max={40}
          formato={(v) => f.porcentaje(v / 100)}
          ayuda={t('cotizar.condiciones.margenAyuda')}
        />
        <Interruptor
          titulo={t('cotizar.condiciones.imprevistosAuto')}
          explicacion="imprevistos"
          descripcion={t('cotizar.condiciones.imprevistosAutoDetalle', { porcentaje: f.porcentaje(r.horas.imprevistosPct) })}
          activo={condiciones.imprevistosAuto}
          alCambiar={(v) => set('imprevistosAuto', v)}
        />
        {!condiciones.imprevistosAuto ? (
          <div className="rejilla-campos">
            <CampoNumero
              etiqueta={t('cotizar.condiciones.imprevistosManual')}
              explicacion="imprevistosManual"
              valor={condiciones.imprevistosManual}
              alCambiar={(v) => set('imprevistosManual', v)}
              min={0}
              max={100}
              sufijo="%"
            />
          </div>
        ) : null}
      </section>

      <section className="bloque" aria-labelledby="titulo-impuestos">
        <h3 id="titulo-impuestos">{t('cotizar.condiciones.impuestos')}</h3>
        <p className="bloque-intro">{t('cotizar.condiciones.impuestosIntro')}</p>
        {tieneAportes ? (
          <Interruptor
            titulo={t('cotizar.condiciones.incluirAportes')}
            explicacion="seguridadSocial"
            descripcion={t('cotizar.condiciones.incluirAportesDetalle', { porcentaje: f.porcentaje(r.precio.tasaAportes, 1) })}
            activo={condiciones.incluirSeguridadSocial}
            alCambiar={(v) => set('incluirSeguridadSocial', v)}
          />
        ) : null}
        {tieneIva ? (
          <Interruptor
            titulo={t('cotizar.condiciones.responsableIva', { impuesto })}
            explicacion="iva"
            descripcion={t(
              parametros.ivaPorDefecto ? 'cotizar.condiciones.responsableIvaComun' : 'cotizar.condiciones.responsableIvaDetalle',
              { impuesto, tasa: f.porcentaje(parametros.iva, 1) },
            )}
            activo={condiciones.responsableIva}
            alCambiar={(v) => set('responsableIva', v)}
          />
        ) : null}
        {hayRetencion ? (
          <>
            <CampoSelector
              etiqueta={t('cotizar.condiciones.retencion')}
              explicacion="retencion"
              valor={condiciones.retencion}
              alCambiar={(v) => set('retencion', v)}
              opciones={[
                { valor: 'auto', texto: t('cotizar.condiciones.retencionAuto', { nombre: automatica }) },
                ...retenciones.map((x) => ({ valor: x.id, texto: nombreRetencion(t, pais, x.id) })),
              ]}
              ayuda={t('cotizar.condiciones.retencionAyuda')}
            />
            <Interruptor
              titulo={t('cotizar.condiciones.compensar')}
              explicacion="compensarRetencion"
              descripcion={t('cotizar.condiciones.compensarDetalle')}
              activo={condiciones.compensarRetencion}
              alCambiar={(v) => set('compensarRetencion', v)}
            />
          </>
        ) : (
          <p className="texto-secundario texto-pequeno">{t('cotizar.condiciones.sinRetencion')}</p>
        )}
        {tieneGmf ? (
          <Interruptor
            titulo={t('cotizar.condiciones.gmf', { nombre: parametros.gmfNombre ?? '' })}
            explicacion="gmf"
            descripcion={t('cotizar.condiciones.gmfDetalle', { tasa: f.porcentaje(parametros.gmf, 2) })}
            activo={condiciones.gmf}
            alCambiar={(v) => set('gmf', v)}
          />
        ) : null}
      </section>

      <section className="bloque" aria-labelledby="titulo-pago">
        <h3 id="titulo-pago">{t('cotizar.condiciones.pago')}</h3>
        <GrupoOpciones
          leyenda={t('cotizar.condiciones.comoPaga')}
          explicacion="esquemaPago"
          valor={condiciones.esquemaPago}
          alCambiar={(v) => set('esquemaPago', v)}
          columnas={2}
          opciones={Object.values(ESQUEMAS_PAGO).map((e) => ({ valor: e.id, titulo: t(`parametros.esquemas.${e.id}`) }))}
        />
        <div className="rejilla-campos">
          <CampoNumero
            etiqueta={t('cotizar.condiciones.vigencia')}
            explicacion="vigencia"
            valor={condiciones.vigenciaDias}
            alCambiar={(v) => set('vigenciaDias', v)}
            min={1}
            max={90}
            sufijo={t('cotizar.condiciones.dias')}
          />
        </div>
        <CampoAreaTexto
          etiqueta={t('cotizar.condiciones.alcance')}
          explicacion="alcance"
          valor={proyecto.alcance}
          alCambiar={(v) => acciones.actualizarProyecto('alcance', v)}
          placeholder={t('cotizar.condiciones.alcanceEj')}
        />
      </section>

      <NotaResultado>
        <NotaDato
          etiqueta={t('cotizar.condiciones.ajuste')}
          explicacion="ajusteCondiciones"
          cifra={f.factor(r.multiplicadores.total)}
          detalle={t('cotizar.condiciones.ajusteDetalle')}
        />
        <NotaDato
          etiqueta={t('cotizar.condiciones.consignan')}
          explicacion="consignado"
          cifra={f.dinero(r.neto.consignado)}
          detalle={t(hayRetencion ? 'cotizar.condiciones.consignanDetalle' : 'cotizar.condiciones.consignanSinRetencion')}
        />
      </NotaResultado>
    </div>
  );
}
