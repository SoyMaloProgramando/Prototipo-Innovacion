import { useEffect, useMemo, useState } from 'react';
import BarrasNiveles from '../componentes/graficas/BarrasNiveles.jsx';
import CurvaDominio from '../componentes/graficas/CurvaDominio.jsx';
import RangoMercado from '../componentes/graficas/RangoMercado.jsx';
import Billete from '../componentes/resultado/Billete.jsx';
import CotizacionImprimible from '../componentes/resultado/CotizacionImprimible.jsx';
import Desglose from '../componentes/resultado/Desglose.jsx';
import LoQueTeQueda from '../componentes/resultado/LoQueTeQueda.jsx';
import { DetalleHoras, Entrega, PlanPagos, Recomendaciones, Salud } from '../componentes/resultado/Paneles.jsx';
import { BarraAyuda, useAyuda } from '../componentes/ui/Ayuda.jsx';
import Icono from '../componentes/ui/Icono.jsx';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { navegar } from '../hooks/useRuta.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { T, useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato } from '../i18n/useFormato.js';
import { comparativoComplejidad, curvaDominio } from '../logica/calculadora.js';

/**
 * Nombre en minúscula inicial para usarlo dentro de una frase ("para una pequeña o mediana empresa").
 * Si empieza por una sigla (UX/UI, QA, ONG) se deja igual.
 */
function enFrase(texto, idioma) {
  if (!texto) return '';
  const [primera, segunda = ''] = Array.from(texto);
  if (segunda && segunda !== segunda.toLocaleLowerCase(idioma)) return texto;
  return primera.toLocaleLowerCase(idioma) + texto.slice(primera.length);
}

function Seccion({ id, titulo, descripcion, explicacion, children, className = '' }) {
  const ayuda = useAyuda(explicacion, titulo, 'significa');
  return (
    <section className={`resultado-seccion ${className}`} aria-labelledby={id}>
      <div className="titulo-ayuda">
        <h2 id={id}>{titulo}</h2>
        {ayuda.boton}
      </div>
      {ayuda.panel}
      {descripcion ? <p className="texto-secundario">{descripcion}</p> : null}
      {children}
    </section>
  );
}

/** Las cifras del billete, cada una con su significado y su "!". */
function FilaLectura({ termino, valor, resumen, explicacion }) {
  const ayuda = useAyuda(explicacion, termino, 'significa');
  return (
    <li>
      <div className="lectura-cabeza">
        <span className="lectura-termino">
          {termino}
          {ayuda.boton}
        </span>
        <strong className="cifra">{valor}</strong>
      </div>
      <p className="lectura-resumen">{resumen}</p>
      {ayuda.panel}
    </li>
  );
}

function LecturaPrecio({ resultado: r }) {
  const { t } = useIdioma();
  const f = useFormato();
  return (
    <section className="lectura-precio" aria-labelledby="t-lectura">
      <h2 id="t-lectura">{t('resultado.lectura.titulo')}</h2>
      <ul>
        <FilaLectura
          termino={t('resultado.lectura.sugerido')}
          valor={f.dinero(r.precio.sinIva)}
          resumen={t('resultado.lectura.sugeridoResumen')}
          explicacion="precioSugerido"
        />
        <FilaLectura
          termino={t('resultado.lectura.piso')}
          valor={f.dinero(r.rango.piso)}
          resumen={t('resultado.lectura.pisoResumen')}
          explicacion="piso"
        />
        <FilaLectura
          termino={t('resultado.lectura.negociar')}
          valor={f.dinero(r.rango.apertura)}
          resumen={t('resultado.lectura.negociarResumen')}
          explicacion="paraNegociar"
        />
      </ul>
    </section>
  );
}

export default function Resultado() {
  const { estado, acciones, resultado: r } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const [guardada, setGuardada] = useState(null);
  const { perfil, proyecto, condiciones, parametros } = estado;

  const curva = useMemo(
    () => curvaDominio({ perfil, proyecto, condiciones, parametros }),
    [perfil, proyecto, condiciones, parametros],
  );
  const niveles = useMemo(
    () => comparativoComplejidad({ perfil, proyecto, condiciones, parametros }),
    [perfil, proyecto, condiciones, parametros],
  );

  // Si cambias algo después de guardar, el código vuelve a "Borrador".
  useEffect(() => {
    setGuardada((g) => (g && g.huella !== JSON.stringify([proyecto, condiciones]) ? null : g));
  }, [proyecto, condiciones]);

  const codigo = guardada?.codigo ?? t('comun.borrador');
  const cliente = condiciones.clienteNombre || enFrase(t(`parametros.clientes.${r.contexto.cliente.id}.nombre`), idioma);
  const unidad = cat.unidad(r.producto, r.unidades);
  const cifra = (valor) => <span className="cifra">{f.dinero(valor)}</span>;

  const guardar = () => {
    const numero = estado.siguienteNumero;
    acciones.guardarCotizacion();
    setGuardada({ codigo: `COT-${String(numero).padStart(4, '0')}`, huella: JSON.stringify([proyecto, condiciones]) });
  };

  return (
    <div className="pagina contenedor resultado" data-carrera={r.producto.carrera}>
      <header className="resultado-cabeza">
        <div>
          <h1>{t('resultado.titulo')}</h1>
          <p className="texto-secundario">
            {t('resultado.resumen', {
              producto: cat.producto(r.producto).nombre,
              cliente,
              tipo: !condiciones.clienteNombre,
              dominio: f.porcentaje(r.especialidad / 100),
              horas: f.horas(r.horas.facturables),
            })}
          </p>
        </div>
        <div className="grupo-botones no-imprimir">
          <button type="button" className="boton boton-principal" onClick={guardar} disabled={Boolean(guardada)}>
            <Icono nombre={guardada ? 'check' : 'guardar'} />
            {guardada ? t('resultado.acciones.guardada', { codigo: guardada.codigo }) : t('resultado.acciones.guardar')}
          </button>
          <button type="button" className="boton" onClick={() => window.print()}>
            <Icono nombre="imprimir" />
            {t('resultado.acciones.imprimir')}
          </button>
          <a className="boton" href="#/cotizar">
            <Icono nombre="editar" />
            {t('resultado.acciones.ajustar')}
          </a>
          <button
            type="button"
            className="boton boton-fantasma"
            onClick={() => {
              acciones.nuevaCotizacion();
              navegar('cotizar');
            }}
          >
            <Icono nombre="mas" />
            {t('resultado.acciones.nueva')}
          </button>
        </div>
      </header>

      <div className="resultado-pantalla">
        <BarraAyuda>
          <T k="resultado.barraAyuda" />
        </BarraAyuda>

        <div className="resultado-portada">
          <div className="resultado-precio">
            <Billete resultado={r} codigo={codigo} />
            <LecturaPrecio resultado={r} />
          </div>
          <Seccion id="t-salud" titulo={t('resultado.secciones.salud.titulo')} explicacion="salud" className="resultado-salud">
            <Salud resultado={r} />
          </Seccion>
        </div>

        <Seccion
          id="t-recomendaciones"
          titulo={t('resultado.secciones.recomendaciones.titulo')}
          explicacion="recomendaciones"
          descripcion={t('resultado.secciones.recomendaciones.descripcion')}
        >
          <Recomendaciones lista={r.recomendaciones} />
        </Seccion>

        <div className="resultado-columnas">
          <Seccion
            id="t-desglose"
            titulo={t('resultado.secciones.desglose.titulo')}
            explicacion="desglose"
            descripcion={t('resultado.secciones.desglose.descripcion')}
          >
            <Desglose resultado={r} />
          </Seccion>
          <Seccion
            id="t-neto"
            titulo={t('resultado.secciones.neto.titulo')}
            explicacion="neto"
            descripcion={t('resultado.secciones.neto.descripcion')}
          >
            <LoQueTeQueda resultado={r} />
          </Seccion>
        </div>

        <Seccion
          id="t-mercado"
          titulo={t('resultado.secciones.mercado.titulo')}
          explicacion="mercadoResultado"
          descripcion={t('resultado.secciones.mercado.descripcion', {
            horas: f.horas(r.mercado.horas),
            area: enFrase(t(`parametros.areas.${r.mercado.area.id}`), idioma),
          })}
        >
          <p className="destacado-linea">
            <T
              k="resultado.secciones.mercado.linea"
              valores={{
                posicion: t(`parametros.posiciones.${r.mercado.posicion.nivel}`),
                tarifa: cifra(r.tarifas.efectiva),
                min: cifra(r.mercado.junior.tarifaMin),
                max: cifra(r.mercado.junior.tarifaMax),
              }}
            />
          </p>
          <RangoMercado mercado={r.mercado} precio={r.precio.sinIva} piso={r.rango.piso} apertura={r.rango.apertura} />
        </Seccion>

        <div className="resultado-columnas">
          <Seccion
            id="t-dominio"
            titulo={t('resultado.secciones.dominio.titulo')}
            explicacion="curva"
            descripcion={t('resultado.secciones.dominio.descripcion')}
          >
            <CurvaDominio puntos={curva} actual={r.especialidad} />
          </Seccion>
          <Seccion
            id="t-niveles"
            titulo={t('resultado.secciones.niveles.titulo')}
            explicacion="nivelesResultado"
            descripcion={t('resultado.secciones.niveles.descripcion', { cantidad: f.numero(r.unidades), unidad })}
          >
            <BarrasNiveles
              titulo={t('resultado.secciones.niveles.grafica')}
              datos={niveles.map((n) => ({
                id: n.id,
                nombre: t(`parametros.niveles.${n.id}.nombre`),
                valor: n.precio,
                horas: n.horas,
              }))}
              actual={r.nivel.id}
              detalle={(d) => t('resultado.secciones.niveles.detalle', { horas: f.horas(d.horas) })}
            />
          </Seccion>
        </div>

        <div className="resultado-columnas resultado-columnas-3">
          <Seccion id="t-horas" titulo={t('resultado.secciones.horas.titulo')} explicacion="horasResultado">
            <DetalleHoras resultado={r} />
          </Seccion>
          <Seccion id="t-entrega" titulo={t('resultado.secciones.entrega.titulo')} explicacion="entrega">
            <Entrega resultado={r} />
          </Seccion>
          <Seccion id="t-pagos" titulo={t('resultado.secciones.pagos.titulo')} explicacion="pagos">
            <PlanPagos resultado={r} />
          </Seccion>
        </div>
      </div>

      <section className="resultado-seccion vista-cliente" aria-labelledby="t-cliente">
        <h2 id="t-cliente" className="no-imprimir">
          {t('resultado.secciones.cliente.titulo')}
        </h2>
        <p className="texto-secundario no-imprimir">{t('resultado.secciones.cliente.descripcion')}</p>
        <CotizacionImprimible resultado={r} estado={estado} codigo={codigo} />
      </section>
    </div>
  );
}
