import { CARRERAS, PRODUCTOS, productosDeCarrera } from '../datos/catalogo.js';
import { FASES, INDICADORES, RIESGOS, TOTAL_HORAS_PLAN } from '../datos/planTrabajo.js';
import { PROYECTO } from '../datos/proyecto.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato } from '../i18n/useFormato.js';

/**
 * Árbol de carpetas: [ruta, clave del comentario en proyecto.arquitectura.arbol].
 * Los comentarios empiezan todos en la misma columna.
 */
const ARBOL = [
  ['Prototipo Innovacion/'],
  ['├── docs/', 'docs'],
  ['├── public/', 'public'],
  ['├── scripts/', 'scripts'],
  ['├── src/'],
  ['│   ├── datos/', 'datos'],
  ['│   ├── logica/', 'logica'],
  ['│   ├── estado/', 'estado'],
  ['│   ├── hooks/', 'hooks'],
  ['│   ├── componentes/', 'componentes'],
  ['│   ├── paginas/', 'paginas'],
  ['│   ├── estilos/', 'estilos'],
  ['│   ├── App.jsx'],
  ['│   └── main.jsx'],
  ['├── VERIFICAR_ENTORNO.bat', 'verificar'],
  ['├── INSTALAR.bat', 'instalar'],
  ['├── INICIAR.bat', 'iniciar'],
  ['├── CONFIGURAR_NGROK.bat', 'configurarNgrok'],
  ['├── COMPARTIR_CON_NGROK.bat', 'compartirNgrok'],
  ['├── package.json'],
  ['└── vite.config.js'],
];
const COLUMNA_COMENTARIOS = 29;

/** El programa académico es una de las carreras del catálogo: se muestra con su nombre traducido. */
const CARRERA_DEL_PROGRAMA = Object.values(CARRERAS).find((c) => c.nombre === PROYECTO.programa);

export default function Proyecto() {
  const { t } = useIdioma();
  const f = useFormato();
  const cat = useCatalogo();

  /** Texto del espacio "proyecto" o, si falta, el dato en español de src/datos/. */
  const tr = (clave, respaldo, valores) => {
    const texto = t(`proyecto.${clave}`, valores);
    return typeof texto === 'string' && texto !== `proyecto.${clave}` ? texto : respaldo;
  };

  const lema = tr('lema', PROYECTO.lema, { sistemas: cat.carrera('sistemas'), multimedia: cat.carrera('multimedia') });
  const programa = CARRERA_DEL_PROGRAMA ? cat.carrera(CARRERA_DEL_PROGRAMA.id) : PROYECTO.programa;
  const arbol = ARBOL.map(([ruta, clave]) =>
    clave ? `${ruta.padEnd(COLUMNA_COMENTARIOS)}${t(`proyecto.arquitectura.arbol.${clave}`, { n: PRODUCTOS.length })}` : ruta,
  ).join('\n');

  return (
    <div className="pagina contenedor proyecto">
      <header className="pagina-cabeza">
        <h1>{t('proyecto.titulo')}</h1>
        <p>{t('proyecto.intro', { lema })}</p>
      </header>

      <section className="bloque-pagina dos-columnas" aria-labelledby="t-problema">
        <div>
          <h2 id="t-problema">{t('proyecto.problema.titulo')}</h2>
          <p>{t('proyecto.problema.texto')}</p>
        </div>
        <div>
          <h2>{t('proyecto.propuesta.titulo')}</h2>
          <p>{t('proyecto.propuesta.texto')}</p>
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-cifras">
        <h2 id="t-cifras">{t('proyecto.cifras.titulo')}</h2>
        <dl className="datos-pais">
          <div>
            <dt>{t('proyecto.cifras.productos')}</dt>
            <dd className="cifra">{PRODUCTOS.length}</dd>
          </div>
          <div>
            <dt>{t('proyecto.cifras.deCarrera', { carrera: cat.carrera('sistemas') })}</dt>
            <dd className="cifra">{productosDeCarrera('sistemas').length}</dd>
          </div>
          <div>
            <dt>{t('proyecto.cifras.deCarrera', { carrera: cat.carrera('multimedia') })}</dt>
            <dd className="cifra">{productosDeCarrera('multimedia').length}</dd>
          </div>
          <div>
            <dt>{t('proyecto.cifras.horasPlan')}</dt>
            <dd className="cifra">{f.horas(TOTAL_HORAS_PLAN)}</dd>
          </div>
        </dl>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-plan">
        <h2 id="t-plan">{t('proyecto.plan.titulo')}</h2>
        <p className="texto-secundario">{t('proyecto.plan.intro')}</p>
        <ol className="fases">
          {FASES.map((fase) => {
            const clave = `plan.fases.${fase.id}`;
            return (
              <li key={fase.id}>
                <div className="fase-cabeza">
                  <h3>{tr(`${clave}.nombre`, fase.nombre)}</h3>
                  <span className="texto-secundario cifra">
                    {t('proyecto.plan.semanas', { n: fase.semanas.length, lista: fase.semanas.join(', ') })}
                  </span>
                </div>
                <ul>
                  {fase.actividades.map((a, i) => (
                    <li key={a.nombre}>
                      {tr(`${clave}.actividades.${i}`, a.nombre)}{' '}
                      <span className="texto-secundario cifra">({f.horas(a.horas)})</span>
                    </li>
                  ))}
                </ul>
                <p className="fase-entregable">
                  {t('proyecto.plan.entregable', { texto: tr(`${clave}.entregable`, fase.entregable) })}
                </p>
              </li>
            );
          })}
        </ol>
        <figure className="diagrama">
          <img src="./diagramas/cronograma.svg" alt={t('proyecto.plan.cronograma.alt')} loading="lazy" />
          <figcaption>{t('proyecto.plan.cronograma.pie')}</figcaption>
        </figure>
      </section>

      <section className="bloque-pagina dos-columnas" aria-labelledby="t-exito">
        <div>
          <h2 id="t-exito">{t('proyecto.exito')}</h2>
          <ul className="lista-simple">
            {INDICADORES.map((indicador, i) => (
              <li key={indicador}>{tr(`plan.indicadores.${i}`, indicador)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t('proyecto.riesgos')}</h2>
          <dl className="riesgos">
            {RIESGOS.map((r, i) => (
              <div key={r.riesgo}>
                <dt>{tr(`plan.riesgos.${i}.riesgo`, r.riesgo)}</dt>
                <dd>{tr(`plan.riesgos.${i}.mitigacion`, r.mitigacion)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-arquitectura">
        <h2 id="t-arquitectura">{t('proyecto.arquitectura.titulo')}</h2>
        <p className="texto-secundario">{t('proyecto.arquitectura.texto')}</p>
        <figure className="diagrama">
          <img src="./diagramas/arquitectura.svg" alt={t('proyecto.arquitectura.alt')} loading="lazy" />
          <figcaption>{t('proyecto.arquitectura.pie')}</figcaption>
        </figure>
        <pre className="arbol" aria-label={t('proyecto.arquitectura.estructura')}>
          {arbol}
        </pre>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-ngrok">
        <h2 id="t-ngrok">{t('proyecto.ngrok.titulo')}</h2>
        <ol className="lista-simple">
          {t('proyecto.ngrok.pasos').map((paso) => (
            <li key={paso}>{paso}</li>
          ))}
        </ol>
      </section>

      <section className="bloque-pagina" aria-labelledby="t-creditos">
        <h2 id="t-creditos">{t('proyecto.creditos.titulo')}</h2>
        <p>
          {t('proyecto.creditos.autoria', {
            autores: PROYECTO.autores.join(', '),
            programa,
            universidad: PROYECTO.universidad,
            ciudad: PROYECTO.ciudad,
            anio: PROYECTO.anio,
            version: PROYECTO.version,
          })}
        </p>
        <p className="texto-secundario">{t('proyecto.creditos.tecnologia')}</p>
      </section>
    </div>
  );
}
