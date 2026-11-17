import { useState } from 'react';
import { CARRERAS, categoriasDeCarrera } from '../../datos/catalogo.js';
import { NIVELES_COMPLEJIDAD } from '../../datos/parametros.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useCatalogo } from '../../i18n/catalogo.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { horasPorNivel } from '../../logica/horas.js';
import { TituloConAyuda } from '../ui/Ayuda.jsx';
import { CampoNumero, GrupoOpciones } from '../ui/Campos.jsx';
import Icono from '../ui/Icono.jsx';
import CabezaPaso from './CabezaPaso.jsx';

export default function PasoProducto() {
  const { estado, acciones, resultado: r } = useCotizador();
  const { t } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const [carrera, setCarrera] = useState(r.producto.carrera);
  const [categoria, setCategoria] = useState('todas');
  const [texto, setTexto] = useState('');
  const original = r.producto;
  const producto = cat.producto(original);
  const lista = cat.filtrar({ carrera, categoria, texto });
  const horas = horasPorNivel(original, r.unidades);
  const nivel = NIVELES_COMPLEJIDAD[estado.proyecto.complejidad];
  const explicacionUnidades = {
    ...t('explicaciones.unidades'),
    nota: t('cotizar.producto.notaUnidades', {
      producto: producto.nombre,
      plural: producto.unidad.plural,
      min: original.unidades.min,
      max: original.unidades.max,
      defecto: original.unidades.defecto,
    }),
  };

  return (
    <div className="paso-contenido">
      <CabezaPaso numero={2} titulo={t('cotizar.producto.titulo')} tenerAMano={t('cotizar.producto.tenerAMano')}>
        {t('cotizar.producto.intro')}
      </CabezaPaso>

      <section className="grupo-paso" aria-labelledby="titulo-buscar">
        <TituloConAyuda id="titulo-buscar" explicacion="buscarProducto" tipo="poner">
          {t('cotizar.producto.buscar')}
        </TituloConAyuda>
        <div className="filtros-producto">
          <div className="segmentado" role="group" aria-label={t('cotizar.producto.carreraAria')}>
            {Object.values(CARRERAS).map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={carrera === c.id}
                onClick={() => {
                  setCarrera(c.id);
                  setCategoria('todas');
                }}
              >
                {cat.carrera(c.id, true)}
              </button>
            ))}
          </div>
          <div className="campo-entrada buscador">
            <span className="campo-afijo">
              <Icono nombre="buscar" tamano={18} />
            </span>
            <input
              type="search"
              placeholder={t('cotizar.producto.buscador')}
              aria-label={t('cotizar.producto.buscadorAria')}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
        </div>

        <div className="fichas" role="group" aria-label={t('cotizar.producto.grupoAria')}>
          <button type="button" className={`ficha ${categoria === 'todas' ? 'ficha-activa' : ''}`} onClick={() => setCategoria('todas')}>
            {t('cotizar.producto.todos')}
          </button>
          {categoriasDeCarrera(carrera).map((c) => (
            <button
              type="button"
              key={c.id}
              className={`ficha ${categoria === c.id ? 'ficha-activa' : ''}`}
              onClick={() => setCategoria(c.id)}
            >
              {cat.categoria(c)}
            </button>
          ))}
        </div>
      </section>

      <section className="grupo-paso" aria-labelledby="titulo-producto">
        <TituloConAyuda id="titulo-producto" explicacion="producto" tipo="poner">
          {t('cotizar.producto.elegir', { n: lista.length })}
        </TituloConAyuda>
        <fieldset className="lista-productos" aria-labelledby="titulo-producto">
          <legend className="solo-lectores">{t('cotizar.producto.productoLeyenda')}</legend>
          {lista.length === 0 ? (
            <p className="vacio">{t('cotizar.producto.sinResultados', { texto })}</p>
          ) : (
            lista.map((p) => {
              const tr = cat.producto(p);
              return (
                <label key={p.id} className={`producto-opcion ${p.id === original.id ? 'producto-activo' : ''}`}>
                  <input type="radio" name="producto" checked={p.id === original.id} onChange={() => acciones.elegirProducto(p.id)} />
                  <span className="producto-nombre">{tr.nombre}</span>
                  <span className="producto-unidad">{t('cotizar.producto.por', { unidad: tr.unidad.singular })}</span>
                </label>
              );
            })
          )}
        </fieldset>

        <article className="detalle-producto" data-carrera={original.carrera} aria-live="polite">
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          {producto.nota ? <p className="aviso aviso-consejo">{producto.nota}</p> : null}
          <div className="detalle-columnas">
            <div>
              <h4>{t('cotizar.producto.incluye')}</h4>
              <ul>
                {producto.entregables.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{t('cotizar.producto.herramientas')}</h4>
              <ul>
                {original.herramientas.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="grupo-paso" aria-labelledby="titulo-tamano">
        <h3 id="titulo-tamano">{t('cotizar.producto.tamano')}</h3>
        <div className="rejilla-campos">
          <CampoNumero
            etiqueta={t('cotizar.producto.cuantas', { plural: producto.unidad.plural })}
            explicacion={explicacionUnidades}
            valor={estado.proyecto.unidades}
            alCambiar={(v) => acciones.actualizarProyecto('unidades', v)}
            min={original.unidades.min}
            max={original.unidades.max}
            ayuda={t('cotizar.producto.cuantasAyuda', {
              min: original.unidades.min,
              max: original.unidades.max,
              defecto: original.unidades.defecto,
            })}
          />
        </div>

        <GrupoOpciones
          leyenda={t('cotizar.producto.complejidad')}
          explicacion="complejidad"
          valor={estado.proyecto.complejidad}
          alCambiar={(v) => acciones.actualizarProyecto('complejidad', v)}
          columnas={3}
          opciones={Object.values(NIVELES_COMPLEJIDAD).map((n) => ({
            valor: n.id,
            titulo: t(`parametros.niveles.${n.id}.nombre`),
            detalle: f.horas(horas[n.id]),
            descripcion: t(`parametros.niveles.${n.id}.descripcion`),
          }))}
        />

        <div className="resultado-paso">
          <TituloConAyuda nivel={4} explicacion="horasCatalogo">
            {t('cotizar.producto.resultado')}
          </TituloConAyuda>
          <p className="calculo-linea">
            <strong className="cifra">{f.horas(r.horasCatalogo)}</strong>
            <span className="texto-secundario">
              {' '}
              {t('cotizar.producto.formula', {
                base: f.numero(original.horasBase * nivel.factorBase),
                cantidad: f.numero(r.unidades),
                unidad: cat.unidad(original, r.unidades),
                porUnidad: f.numero(original.horasPorUnidad[nivel.id]),
              })}
            </span>
          </p>
          <p className="texto-secundario texto-pequeno">{t('cotizar.producto.nota')}</p>
        </div>
      </section>
    </div>
  );
}
