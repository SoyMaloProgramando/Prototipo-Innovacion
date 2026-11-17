import { useMemo, useState } from 'react';
import Billete from '../componentes/resultado/Billete.jsx';
import { Deslizador } from '../componentes/ui/Campos.jsx';
import { CARRERAS, categoriasDeCarrera, PRODUCTOS, productosDeCategoria, buscarProducto } from '../datos/catalogo.js';
import { buscarPais } from '../datos/paises.js';
import { claveNivelDominio } from '../datos/parametros.js';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { costosDeProducto, PROYECTO_INICIAL, proyectoParaProducto } from '../estado/estadoInicial.js';
import { navegar } from '../hooks/useRuta.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato } from '../i18n/useFormato.js';
import { calcularCotizacion } from '../logica/calculadora.js';
import { tasaSeguridadSocial } from '../logica/impuestos.js';

/** Productos de la demo; su nombre corto está en inicio.demos. */
const DEMOS = ['mul-logo', 'mul-model-sheet', 'mul-animacion-3d', 'sis-landing', 'sis-multiplataforma', 'sis-base-datos'];

/** Los cuatro pasos del asistente, con su texto en inicio.pasos. */
const PASOS = ['perfil', 'producto', 'tiempo', 'condiciones'];

/** Solo se muestran los datos que el país tiene (por ejemplo, la UVT solo existe en Colombia). */
const esCifra = (valor) => typeof valor === 'number' && Number.isFinite(valor);

export default function Inicio() {
  const { estado, acciones } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const [demoId, setDemoId] = useState('mul-logo');
  const [dominio, setDominio] = useState(50);

  const demo = useMemo(() => {
    const producto = buscarProducto(demoId);
    const condiciones = { ...estado.condiciones, costosDirectos: costosDeProducto(producto) };
    const proyecto = {
      ...proyectoParaProducto(producto, {
        perfil: estado.perfil,
        parametros: estado.parametros,
        condiciones,
        proyectoActual: PROYECTO_INICIAL,
      }),
      especialidad: dominio,
      fechaInicio: estado.proyecto.fechaInicio,
    };
    return calcularCotizacion({ perfil: estado.perfil, proyecto, condiciones, parametros: estado.parametros }, { ligero: true });
  }, [demoId, dominio, estado.perfil, estado.parametros, estado.condiciones, estado.proyecto.fechaInicio]);

  const cotizarDemo = () => {
    acciones.elegirProducto(demoId);
    acciones.actualizarProyecto('especialidad', dominio);
    acciones.irAPaso(0);
    navegar('cotizar');
  };

  const p = estado.parametros;
  const pais = buscarPais(p.pais).nombres[idioma];
  const gastosMes = Object.values(estado.perfil.gastos).reduce((s, v) => s + v, 0);
  const aportes = tasaSeguridadSocial(p);
  const formatoDominio = (v) =>
    t('inicio.demo.valorDominio', { porcentaje: f.porcentaje(v / 100), nivel: t(`parametros.dominio.${claveNivelDominio(v)}`) });

  return (
    <div className="inicio">
      <section className="portada contenedor">
        <div className="portada-texto">
          <h1>{t('inicio.titulo')}</h1>
          <p className="portada-lema">{t('inicio.lema')}</p>
          <div className="grupo-botones">
            <a className="boton boton-principal" href="#/cotizar">
              {t('inicio.cotizarProyecto')}
            </a>
            <a className="boton" href="#/catalogo">
              {t('inicio.verProductos', { n: PRODUCTOS.length })}
            </a>
          </div>
        </div>

        <div className="portada-demo" data-carrera={demo.producto.carrera}>
          <fieldset className="demo-productos">
            <legend className="campo-etiqueta">{t('inicio.demo.leyenda')}</legend>
            <div className="fichas">
              {DEMOS.map((id) => (
                <label key={id} className={`ficha ${demoId === id ? 'ficha-activa' : ''}`}>
                  <input type="radio" name="demo" value={id} checked={demoId === id} onChange={() => setDemoId(id)} />
                  {t(`inicio.demos.${id}`)}
                </label>
              ))}
            </div>
          </fieldset>

          <Billete resultado={demo} codigo={t('comun.ejemplo')} variante="compacto" />

          <Deslizador
            etiqueta={t('inicio.demo.dominio')}
            explicacion="especialidad"
            valor={dominio}
            alCambiar={setDominio}
            formato={formatoDominio}
            marcas={[f.porcentaje(0), f.porcentaje(0.5), f.porcentaje(1)]}
          />
          <div className="demo-pie">
            <p className="texto-secundario texto-pequeno">
              {t('inicio.demo.datos', {
                n: estado.perfil.horasSemana,
                horas: f.numero(estado.perfil.horasSemana),
                gastos: f.dinero(gastosMes),
                pais,
              })}
            </p>
            <button type="button" className="boton boton-pequeno" onClick={cotizarDemo}>
              {t('inicio.demo.cotizar')}
            </button>
          </div>
        </div>
      </section>

      <section className="contenedor seccion-inicio" aria-labelledby="titulo-carreras">
        <h2 id="titulo-carreras">{t('inicio.carreras.titulo', { n: PRODUCTOS.length })}</h2>
        <div className="carreras">
          {Object.values(CARRERAS).map((carrera) => {
            const categorias = categoriasDeCarrera(carrera.id);
            const total = categorias.reduce((s, c) => s + productosDeCategoria(c.id).length, 0);
            return (
              <article key={carrera.id} className="carrera" data-carrera={carrera.id}>
                <h3>
                  <span className="carrera-punto" aria-hidden="true" />
                  {cat.carrera(carrera.id)}
                </h3>
                <p className="texto-secundario">{t('inicio.carreras.resumen', { total, grupos: categorias.length })}</p>
                <ul className="carrera-categorias">
                  {categorias.map((c) => (
                    <li key={c.id}>
                      <a href={`#/catalogo?carrera=${carrera.id}&categoria=${c.id}`}>{cat.categoria(c)}</a>
                      <span className="cifra texto-secundario">{productosDeCategoria(c.id).length}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contenedor seccion-inicio" aria-labelledby="titulo-pasos">
        <h2 id="titulo-pasos">{t('inicio.pasos.titulo')}</h2>
        <ol className="pasos-inicio">
          {PASOS.map((paso) => (
            <li key={paso}>
              <h3>{t(`inicio.pasos.${paso}.titulo`)}</h3>
              <p className="texto-secundario">
                {t(`inicio.pasos.${paso}.texto`, { n: PRODUCTOS.length, impuesto: demo.pais.ivaNombre })}
              </p>
            </li>
          ))}
        </ol>
        <p>
          <a href="#/metodologia">{t('inicio.pasos.verFormula')}</a>
        </p>
      </section>

      <section className="contenedor seccion-inicio" aria-labelledby="titulo-datos">
        <h2 id="titulo-datos">{t('inicio.datos.titulo', { pais })}</h2>
        <dl className="datos-pais">
          {esCifra(p.smmlv) ? (
            <div>
              <dt>{t('inicio.datos.salarioMinimo', { anio: p.anio })}</dt>
              <dd className="cifra">{f.dinero(p.smmlv)}</dd>
            </div>
          ) : null}
          {esCifra(p.uvt) ? (
            <div>
              <dt>{t('inicio.datos.uvt', { anio: p.anio })}</dt>
              <dd className="cifra">{f.dinero(p.uvt)}</dd>
            </div>
          ) : null}
          {esCifra(p.trm) && f.codigo !== 'USD' ? (
            <div>
              <dt>{t('inicio.datos.dolar')}</dt>
              <dd className="cifra">{f.dinero(p.trm)}</dd>
            </div>
          ) : null}
          {esCifra(aportes) ? (
            <div>
              <dt>{t('inicio.datos.aportes')}</dt>
              <dd className="cifra">{t('inicio.datos.aportesValor', { porcentaje: f.porcentaje(aportes, 1) })}</dd>
            </div>
          ) : null}
        </dl>
        <p className="texto-secundario texto-pequeno">{t('inicio.datos.nota', { pagina: t('comun.nav.metodologia') })}</p>
      </section>
    </div>
  );
}
