import { buscarPais } from '../datos/paises.js';
import {
  CURVA_APRENDIZAJE,
  DERECHOS,
  EXPERIENCIA,
  FORMACION,
  IMPREVISTOS_POR_POCO_DOMINIO,
  MERCADOS,
  NIVELES_COMPLEJIDAD,
  PORTAFOLIO,
  TIPOS_CLIENTE,
  URGENCIA,
} from '../datos/parametros.js';
import { CampoDinero, CampoNumero } from '../componentes/ui/Campos.jsx';
import Icono from '../componentes/ui/Icono.jsx';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { useTipoDeCambio } from '../hooks/useTipoDeCambio.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { minusculaInicial } from '../i18n/index.js';
import { T, useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato } from '../i18n/useFormato.js';
import { tasaSeguridadSocial } from '../logica/impuestos.js';
import {
  bandasDePais,
  confianzaDePais,
  fuentesDePais,
  parametrosDePais,
  regimenDePais,
  salariosDePais,
  SALARIOS_COLOMBIA,
} from '../logica/paises.js';
import { factorDominio } from '../logica/tarifas.js';

/** Enlaces de las fuentes de Colombia; sus títulos están en metodologia.fuentes.colombia (mismo orden). */
const FUENTES_COLOMBIA = [
  'https://consultorsalud.com/aumento-del-salario-minimo-en-colombia-2026/',
  'https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2025/12/dian-fijo-en-52-374-en-valor-de-la-uvt-para-el-ano-gravable-2026/',
  'https://siemprealdia.co/colombia/impuestos/tabla-de-retencion-en-la-fuente-2026/',
  'https://www.eluniversal.com.co/colombia/2026/01/05/salario-minimo-2026-cuanto-pagaran-los-trabajadores-independientes-por-seguridad-social-en-colombia/',
  'https://www.ugpp.gov.co/wp-content/uploads/2026/01/ABC-Trabajador-Independiente-Contrato-Prestacion-Servicios.pdf',
  'https://www.portafolio.co/economia/empleo/cuanto-gana-un-desarrollador-de-software-en-colombia-627749',
  'https://www.magneto365.com/co/preguntas-frecuentes/diseñador-grafico/cual-es-salario-de-un-disenador-grafico-en-colombia',
  'https://www.datos.gov.co/Econom-a-y-Finanzas/Tasa-de-Cambio-Representativa-del-Mercado-Historic/mcec-87by',
];

function TablaFactores({ titulo, filas }) {
  const f = useFormato();
  return (
    <div className="tabla-envoltura">
      <table className="tabla tabla-compacta">
        <caption>{titulo}</caption>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id}>
              <th scope="row">{fila.nombre}</th>
              <td className="num cifra">{f.factor(fila.factor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Dólar del día: de dónde sale, de qué fecha es y botones para actualizarlo. */
function EstadoDolar() {
  const { t } = useIdioma();
  const d = useTipoDeCambio();
  const fuente = d.proveedor ? (
    <a href={d.proveedor.url} target="_blank" rel="noreferrer">
      {d.proveedor.nombre}
    </a>
  ) : (
    '—'
  );
  return (
    <div className="estado-dolar" aria-live="polite">
      <p>
        <strong>{t('metodologia.parametros.cambio.titulo')}:</strong>{' '}
        <T k={`metodologia.parametros.cambio.${d.situacion}`} valores={{ valor: d.valor, fecha: d.fecha ?? '—', fuente }} />
      </p>
      {d.situacion !== 'fijo' && d.situacion !== 'sinApi' ? (
        <div className="grupo-botones">
          {d.situacion === 'manual' && d.delDia ? (
            <button type="button" className="boton boton-pequeno" onClick={d.usarDelDia}>
              {t('metodologia.parametros.cambio.usarDelDia', { valor: d.delDia })}
            </button>
          ) : null}
          <button type="button" className="boton boton-pequeno boton-fantasma" onClick={d.actualizar} disabled={d.cargando}>
            <Icono nombre="reiniciar" />
            {d.cargando ? t('metodologia.parametros.cambio.actualizando') : t('metodologia.parametros.cambio.actualizar')}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function sitioDe(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function Metodologia() {
  const { estado, acciones, resultado: r } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const p = estado.parametros;
  const setP = acciones.actualizarParametro;
  const paisId = p.pais ?? 'CO';
  const pais = buscarPais(paisId);
  const nombrePais = pais.nombres[idioma] ?? pais.nombres.es;
  const colombia = paisId === 'CO';
  const impuesto = p.ivaNombre ?? 'IVA';
  const regimen = regimenDePais(paisId);
  const tasaAportes = tasaSeguridadSocial(p);
  const confianza = confianzaDePais(paisId);
  const bandas = bandasDePais(paisId);
  const salarios = salariosDePais(paisId);
  const anioOriginal = parametrosDePais(paisId).anio;
  const pct = (campo) => ({
    valor: Math.round((Number(p[campo]) || 0) * 100000) / 1000,
    alCambiar: (v) => setP(campo, (Number(v) || 0) / 100),
  });
  const ejemplo = (contenido) => (
    <p className="ejemplo">
      {t('metodologia.tuEjemplo')} {contenido}
    </p>
  );

  const tablasFactores = [
    {
      id: 'experiencia',
      filas: EXPERIENCIA.map((e, i) => ({ id: e.id, nombre: t('parametros.experiencia')[i] ?? e.nombre, factor: e.factor })),
    },
    {
      id: 'portafolio',
      filas: Object.values(PORTAFOLIO).map((e) => ({ id: e.id, nombre: t(`parametros.portafolio.${e.id}`), factor: e.factor })),
    },
    {
      id: 'formacion',
      filas: Object.values(FORMACION).map((e) => ({ id: e.id, nombre: t(`parametros.formacion.${e.id}`), factor: e.factor })),
    },
    {
      id: 'clientes',
      filas: Object.values(TIPOS_CLIENTE).map((e) => ({ id: e.id, nombre: t(`parametros.clientes.${e.id}.nombre`), factor: e.factor })),
    },
    {
      id: 'mercados',
      filas: Object.values(MERCADOS).map((e) => ({ id: e.id, nombre: t(`parametros.mercados.${e.id}`), factor: e.factor })),
    },
    {
      id: 'derechos',
      filas: Object.values(DERECHOS).map((e) => ({ id: e.id, nombre: t(`parametros.derechos.${e.id}.nombre`), factor: e.factor })),
    },
    {
      id: 'urgencia',
      filas: Object.values(URGENCIA).map((e) => ({ id: e.id, nombre: t(`parametros.urgencia.${e.id}.nombre`), factor: e.factor })),
    },
  ];

  const glosario = [...t('metodologia.glosario.general'), ...(colombia ? t('metodologia.glosario.colombia') : t('metodologia.glosario.pais', { impuesto }))];
  const fuentes = colombia
    ? FUENTES_COLOMBIA.map((url, i) => ({ url, texto: t('metodologia.fuentes.colombia')[i] }))
    : fuentesDePais(paisId).map((fuente) => ({
        url: fuente.url,
        texto: t('metodologia.fuentes.tema', { tema: t(`metodologia.fuentes.temas.${fuente.tema}`), sitio: sitioDe(fuente.url) }),
      }));

  const textoAportes = colombia
    ? t('metodologia.formula.aportes.colombia', {
        salud: f.porcentaje(p.salud, 1),
        pension: f.porcentaje(p.pension, 1),
        arl: f.porcentaje(p.arl, 3),
        base: f.porcentaje(p.ibcIndependiente),
        tasa: f.porcentaje(tasaAportes, 2),
      })
    : tasaAportes > 0
      ? t('metodologia.formula.aportes.pais', { pais: nombrePais, regimen, tasa: f.porcentaje(tasaAportes, 1) })
      : t('metodologia.formula.aportes.sinAportes', { pais: nombrePais, regimen });

  return (
    <div className="pagina contenedor metodologia">
      <header className="pagina-cabeza">
        <h1>{t('metodologia.titulo')}</h1>
        <p>{t('metodologia.intro', { pais: nombrePais, producto: minusculaInicial(cat.producto(r.producto).nombre) })}</p>
      </header>

      <section className="bloque-pagina" aria-labelledby="t-formula">
        <h2 id="t-formula">{t('metodologia.formula.titulo')}</h2>
        <ol className="formula">
          <li>
            <h3>{t('metodologia.formula.horas.titulo')}</h3>
            <p>{t('metodologia.formula.horas.texto', { maximo: f.porcentaje(IMPREVISTOS_POR_POCO_DOMINIO) })}</p>
            {ejemplo(
              <>
                {f.horas(r.horas.estimadas)} + {f.horas(r.horas.horasImprevistos)} + {f.horas(r.horas.horasRevisiones)} +{' '}
                {f.horas(r.horas.horasGestion)} = <strong>{f.horas(r.horas.facturables)}</strong>
              </>,
            )}
          </li>
          <li>
            <h3>{t('metodologia.formula.tarifa.titulo')}</h3>
            <p>{t('metodologia.formula.tarifa.texto')}</p>
            {ejemplo(
              <>
                {f.dinero(r.tarifas.deseada)} {f.factor(r.tarifas.factores.total)} ={' '}
                <strong>{t('metodologia.formula.tarifa.porHora', { valor: f.dinero(r.tarifas.ajustada) })}</strong>
              </>,
            )}
          </li>
          <li>
            <h3>{t('metodologia.formula.trabajo.titulo')}</h3>
            <p>{t('metodologia.formula.trabajo.texto')}</p>
            {ejemplo(`${f.dinero(r.precio.manoDeObra)} + ${f.dinero(r.precio.costosOperativos)}`)}
          </li>
          <li>
            <h3>{t('metodologia.formula.condiciones.titulo')}</h3>
            <p>{t('metodologia.formula.condiciones.texto')}</p>
            {ejemplo(
              t('metodologia.formula.condiciones.ejemplo', {
                factor: f.factor(r.multiplicadores.total),
                valor: `${r.precio.ajusteComercial < 0 ? '−' : ''}${f.dinero(Math.abs(r.precio.ajusteComercial))}`,
              }),
            )}
          </li>
          <li>
            <h3>{t('metodologia.formula.utilidad.titulo')}</h3>
            <p>{t('metodologia.formula.utilidad.texto')}</p>
            {ejemplo(`${f.porcentaje(r.precio.margen)} = ${f.dinero(r.precio.utilidad)}`)}
          </li>
          <li>
            <h3>{t('metodologia.formula.aportes.titulo')}</h3>
            <p>{textoAportes}</p>
            {ejemplo(f.dinero(r.precio.seguridadSocial))}
          </li>
          <li>
            <h3>{t('metodologia.formula.impuestos.titulo', { impuesto })}</h3>
            <p>
              {Number(p.iva) > 0
                ? t('metodologia.formula.impuestos.texto', { impuesto, tasa: f.porcentaje(p.iva, 1) })
                : t('metodologia.formula.impuestos.sinImpuesto')}
            </p>
            {ejemplo(
              <>
                {Number(p.iva) > 0
                  ? t('metodologia.formula.impuestos.ejemplo', { impuesto })
                  : t('metodologia.formula.impuestos.ejemploSinImpuesto')}{' '}
                <strong>{f.dinero(r.precio.sinIva)}</strong>
              </>,
            )}
          </li>
          <li>
            <h3>{t('metodologia.formula.rango.titulo')}</h3>
            <p>{t('metodologia.formula.rango.texto')}</p>
            {ejemplo(
              t('metodologia.formula.rango.ejemplo', {
                piso: f.dinero(r.rango.piso),
                apertura: f.dinero(r.rango.apertura),
                posicion: t(`parametros.posiciones.${r.mercado.posicion.nivel}`),
              }),
            )}
          </li>
        </ol>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-dominio-tabla">
        <h2 id="t-dominio-tabla">{t('metodologia.dominio.titulo')}</h2>
        <div className="tabla-envoltura">
          <table className="tabla">
            <thead>
              <tr>
                <th scope="col">{t('metodologia.dominio.columnas.dominio')}</th>
                <th scope="col" className="num">
                  {t('metodologia.dominio.columnas.tarifa')}
                </th>
                <th scope="col" className="num">
                  {t('metodologia.dominio.columnas.imprevistos')}
                </th>
                <th scope="col" className="num">
                  {t('metodologia.dominio.columnas.horasExtra')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[0, 25, 50, 75, 100].map((e) => {
                const falta = 1 - e / 100;
                return (
                  <tr key={e}>
                    <th scope="row">{f.porcentaje(e / 100)}</th>
                    <td className="num cifra">{f.factor(factorDominio(e))}</td>
                    <td className="num cifra">+{f.porcentaje(IMPREVISTOS_POR_POCO_DOMINIO * falta)}</td>
                    <td className="num cifra">{f.horas(10 * CURVA_APRENDIZAJE * falta)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="texto-secundario texto-pequeno">
          {t('metodologia.dominio.nota', {
            niveles: Object.values(NIVELES_COMPLEJIDAD)
              .map((n) => `${minusculaInicial(t(`parametros.niveles.${n.id}.nombre`))} ${f.porcentaje(n.imprevistos)}`)
              .join(', '),
          })}
        </p>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-factores">
        <h2 id="t-factores">{t('metodologia.factores.titulo')}</h2>
        <div className="rejilla-tablas">
          {tablasFactores.map((tabla) => (
            <TablaFactores key={tabla.id} titulo={t(`metodologia.factores.${tabla.id}`)} filas={tabla.filas} />
          ))}
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-bandas">
        <h2 id="t-bandas">{t('metodologia.bandas.titulo')}</h2>
        <p className="texto-secundario">
          {colombia || !salarios
            ? t('metodologia.bandas.colombia', { moneda: pais.moneda.codigo })
            : t('metodologia.bandas.pais', {
                pais: nombrePais,
                moneda: pais.moneda.codigo,
                devPais: f.dinero(salarios.desarrollo[0]),
                devColombia: `${f.numero(SALARIOS_COLOMBIA.desarrollo[0], 0)} COP`,
                disPais: f.dinero(salarios.diseno[0]),
                disColombia: `${f.numero(SALARIOS_COLOMBIA.diseno[0], 0)} COP`,
              })}
        </p>
        <div className="tabla-envoltura">
          <table className="tabla">
            <thead>
              <tr>
                <th scope="col">{t('metodologia.bandas.area')}</th>
                {['junior', 'semi', 'senior'].map((n) => (
                  <th key={n} scope="col" className="num">
                    {t(`parametros.nivelesMercado.${n}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(bandas).map((b) => (
                <tr key={b.id}>
                  <th scope="row">{t(`parametros.areas.${b.id}`)}</th>
                  {['junior', 'semi', 'senior'].map((n) => (
                    <td key={n} className="num cifra">
                      {t('metodologia.bandas.rango', { min: f.dinero(b[n][0]), max: f.dinero(b[n][1]) })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-parametros">
        <h2 id="t-parametros">{t('metodologia.parametros.titulo', { pais: nombrePais, anio: p.anio })}</h2>
        <p className="texto-secundario">{t('metodologia.parametros.intro')}</p>
        {confianza ? (
          <p className={`aviso ${confianza === 'baja' ? 'aviso-alerta' : 'aviso-consejo'}`}>
            <strong>{t('metodologia.parametros.confianzaTitulo')}:</strong> {t(`metodologia.parametros.confianza.${confianza}`)}
            {!colombia && regimen ? ` ${t('metodologia.parametros.regimen', { regimen })}` : ''}
          </p>
        ) : null}
        <EstadoDolar />
        <div className="rejilla-campos">
          {Number(p.smmlv) > 0 ? (
            <CampoDinero
              etiqueta={t('metodologia.parametros.salarioMinimo')}
              explicacion="smmlv"
              valor={p.smmlv}
              alCambiar={(v) => setP('smmlv', v)}
            />
          ) : null}
          {colombia ? (
            <CampoDinero etiqueta={t('metodologia.parametros.uvt')} explicacion="uvt" valor={p.uvt} alCambiar={(v) => setP('uvt', v)} />
          ) : null}
          {pais.moneda.codigo !== 'USD' ? (
            <CampoDinero
              etiqueta={colombia ? t('metodologia.parametros.trm') : t('metodologia.parametros.tipoCambio', { moneda: pais.moneda.codigo })}
              explicacion="trm"
              valor={p.trm}
              alCambiar={(v) => setP('trm', v)}
              precision={4}
            />
          ) : null}
          <CampoNumero
            etiqueta={t('metodologia.parametros.iva', { impuesto })}
            explicacion="ivaTarifa"
            sufijo="%"
            decimales
            min={0}
            max={50}
            {...pct('iva')}
          />
          {colombia ? (
            <>
              <CampoNumero
                etiqueta={t('metodologia.parametros.ibc')}
                explicacion="ibc"
                sufijo="%"
                decimales
                min={0}
                max={100}
                {...pct('ibcIndependiente')}
              />
              <CampoNumero
                etiqueta={t('metodologia.parametros.salud')}
                explicacion="saludTarifa"
                sufijo="%"
                decimales
                min={0}
                max={50}
                paso={0.5}
                {...pct('salud')}
              />
              <CampoNumero
                etiqueta={t('metodologia.parametros.pension')}
                explicacion="pensionTarifa"
                sufijo="%"
                decimales
                min={0}
                max={50}
                paso={0.5}
                {...pct('pension')}
              />
              <CampoNumero
                etiqueta={t('metodologia.parametros.arl')}
                explicacion="arlTarifa"
                sufijo="%"
                decimales
                min={0}
                max={10}
                paso={0.1}
                {...pct('arl')}
              />
            </>
          ) : (
            <>
              <CampoNumero
                etiqueta={t('metodologia.parametros.aportesEfectivos')}
                explicacion={t('metodologia.parametros.ayudas.aportesEfectivos')}
                sufijo="%"
                decimales
                min={0}
                max={60}
                paso={0.5}
                {...pct('aportesEfectivos')}
              />
              <CampoDinero
                etiqueta={t('metodologia.parametros.aporteMinimo')}
                explicacion={t('metodologia.parametros.ayudas.aporteMinimo')}
                valor={p.aporteMinimo ?? 0}
                alCambiar={(v) => setP('aporteMinimo', v)}
              />
              {p.gmfNombre ? (
                <CampoNumero
                  etiqueta={t('metodologia.parametros.transacciones', { nombre: p.gmfNombre })}
                  explicacion={t('metodologia.parametros.ayudas.transacciones')}
                  sufijo="%"
                  decimales
                  min={0}
                  max={10}
                  paso={0.01}
                  {...pct('gmf')}
                />
              ) : null}
            </>
          )}
        </div>
        <div className="grupo-botones">
          <button type="button" className="boton" onClick={acciones.restablecerParametros}>
            <Icono nombre="reiniciar" />
            {t('metodologia.parametros.restablecer', { anio: anioOriginal })}
          </button>
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-diagramas">
        <h2 id="t-diagramas">{t('metodologia.diagramas.titulo')}</h2>
        <p className="texto-secundario">
          {t('metodologia.diagramas.leyenda')}
          {idioma !== 'es' ? ` ${t('metodologia.diagramas.idioma')}` : ''}
        </p>
        <div className="dos-columnas">
          <figure className="diagrama diagrama-alto">
            <img src="./diagramas/flujo-usuario.svg" alt={t('metodologia.diagramas.usuarioAlt')} loading="lazy" />
            <figcaption>
              {t('metodologia.diagramas.usuario')}{' '}
              <a href="./diagramas/flujo-usuario.svg" target="_blank" rel="noreferrer">
                {t('metodologia.diagramas.abrir')}
              </a>
            </figcaption>
          </figure>
          <figure className="diagrama diagrama-alto">
            <img src="./diagramas/flujo-calculo.svg" alt={t('metodologia.diagramas.calculoAlt')} loading="lazy" />
            <figcaption>
              {t('metodologia.diagramas.calculo')}{' '}
              <a href="./diagramas/flujo-calculo.svg" target="_blank" rel="noreferrer">
                {t('metodologia.diagramas.abrir')}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-glosario">
        <h2 id="t-glosario">{t('metodologia.glosario.titulo')}</h2>
        <dl className="glosario">
          {glosario.map(([termino, definicion]) => (
            <div key={termino}>
              <dt>{termino}</dt>
              <dd>{definicion}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-fuentes">
        <h2 id="t-fuentes">{t('metodologia.fuentes.titulo')}</h2>
        <ul className="fuentes">
          {fuentes.map((fuente) => (
            <li key={`${fuente.url}-${fuente.texto}`}>
              <a href={fuente.url} target="_blank" rel="noreferrer">
                {fuente.texto}
              </a>
            </li>
          ))}
        </ul>
        <p className="texto-secundario texto-pequeno">
          {t('metodologia.fuentes.nota')} {t('metodologia.fuentes.documento')}
        </p>
      </section>
    </div>
  );
}
