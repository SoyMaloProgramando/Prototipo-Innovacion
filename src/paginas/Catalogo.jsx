import { useEffect, useMemo, useState } from 'react';
import Icono from '../componentes/ui/Icono.jsx';
import { CARRERAS, CATEGORIAS } from '../datos/catalogo.js';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { navegar } from '../hooks/useRuta.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato } from '../i18n/useFormato.js';
import { horasPorNivel } from '../logica/horas.js';
import { rangosMercado } from '../logica/mercado.js';

/** Primera letra en minúscula para usar un nombre dentro de una frase, salvo siglas como "UX/UI". */
function inicialMinuscula(texto, idioma) {
  return /^\p{Lu}\p{Ll}/u.test(texto) ? texto.charAt(0).toLocaleLowerCase(idioma) + texto.slice(1) : texto;
}

export default function Catalogo({ parametros }) {
  const { estado, acciones } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();
  const consulta = parametros.toString();
  const [carrera, setCarrera] = useState(parametros.get('carrera') ?? 'todas');
  const [categoria, setCategoria] = useState(parametros.get('categoria') ?? 'todas');
  const [texto, setTexto] = useState('');
  const pais = estado.parametros.pais;

  useEffect(() => {
    const p = new URLSearchParams(consulta);
    setCarrera(p.get('carrera') ?? 'todas');
    setCategoria(p.get('categoria') ?? 'todas');
  }, [consulta]);

  const lista = useMemo(() => cat.filtrar({ carrera, categoria, texto }), [cat, carrera, categoria, texto]);
  const grupos = useMemo(
    () =>
      CATEGORIAS.map((c) => ({ categoria: c, productos: lista.filter((p) => p.categoria === c.id) })).filter(
        (g) => g.productos.length > 0,
      ),
    [lista],
  );
  const categoriasVisibles = CATEGORIAS.filter((c) => carrera === 'todas' || c.carrera === carrera);

  const cotizar = (id) => {
    acciones.elegirProducto(id);
    acciones.irAPaso(1);
    navegar('cotizar');
  };

  return (
    <div className="pagina contenedor catalogo">
      <header className="pagina-cabeza">
        <h1>{t('catalogo.titulo')}</h1>
        <p>{t('catalogo.intro')}</p>
      </header>

      <div className="barra-filtros">
        <div className="segmentado" role="group" aria-label={t('catalogo.filtros.carrera')}>
          {['todas', ...Object.keys(CARRERAS)].map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={carrera === id}
              onClick={() => {
                setCarrera(id);
                setCategoria('todas');
              }}
            >
              {id === 'todas' ? t('catalogo.filtros.todas') : cat.carrera(id, true)}
            </button>
          ))}
        </div>
        <div className="campo-entrada selector-categoria">
          <select aria-label={t('catalogo.filtros.grupo')} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="todas">{t('catalogo.filtros.todosLosGrupos')}</option>
            {categoriasVisibles.map((c) => (
              <option key={c.id} value={c.id}>
                {cat.categoria(c)}
              </option>
            ))}
          </select>
        </div>
        <div className="campo-entrada buscador">
          <span className="campo-afijo">
            <Icono nombre="buscar" tamano={18} />
          </span>
          <input
            type="search"
            placeholder={t('catalogo.filtros.buscar')}
            aria-label={t('catalogo.filtros.buscar')}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
        <p className="texto-secundario cifra" aria-live="polite">
          {t('catalogo.cantidad', { n: lista.length })}
        </p>
      </div>

      {grupos.length === 0 ? (
        <p className="vacio">{t('catalogo.vacio', { todas: t('catalogo.filtros.todas') })}</p>
      ) : (
        grupos.map(({ categoria: c, productos }) => (
          <section key={c.id} className="catalogo-grupo" data-carrera={c.carrera} aria-labelledby={`grupo-${c.id}`}>
            <div className="catalogo-grupo-cabeza">
              <h2 id={`grupo-${c.id}`}>{cat.categoria(c)}</h2>
              <p className="texto-secundario texto-pequeno">
                {t('catalogo.grupo', {
                  carrera: cat.carrera(c.carrera),
                  area: inicialMinuscula(t(`parametros.areas.${c.area}`), idioma),
                })}
              </p>
            </div>
            <div className="tabla-envoltura">
              <table className="tabla tabla-catalogo">
                <thead>
                  <tr>
                    <th scope="col">{t('catalogo.tabla.producto')}</th>
                    <th scope="col">{t('catalogo.tabla.unidad')}</th>
                    <th scope="col" className="num">
                      {t('catalogo.tabla.horas')}
                    </th>
                    <th scope="col" className="num">
                      {t('catalogo.tabla.junior')}
                    </th>
                    <th scope="col">
                      <span className="solo-lectores">{t('catalogo.tabla.accion')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => {
                    const traducido = cat.producto(p);
                    const h = horasPorNivel(p);
                    const m = rangosMercado({ producto: p, unidades: p.unidades.defecto, complejidad: 'intermedio', pais });
                    return (
                      <tr key={p.id}>
                        <th scope="row">
                          <span className="catalogo-nombre">{traducido.nombre}</span>
                          <span className="texto-secundario texto-pequeno">{traducido.descripcion}</span>
                        </th>
                        <td>
                          {traducido.unidad.singular}
                          <span className="texto-secundario texto-pequeno"> {t('catalogo.tipico', { n: f.numero(p.unidades.defecto) })}</span>
                        </td>
                        <td className="num cifra">
                          {f.horas(h.basico)}, {f.horas(h.intermedio)}, {f.horas(h.avanzado)}
                        </td>
                        <td className="num cifra">
                          {t('catalogo.rango', { min: f.dineroCorto(m.junior.min), max: f.dineroCorto(m.junior.max) })}
                        </td>
                        <td>
                          <button type="button" className="boton boton-pequeno" onClick={() => cotizar(p.id)}>
                            {t('catalogo.cotizar')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
