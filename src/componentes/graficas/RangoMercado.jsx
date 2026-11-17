/**
 * Rangos de mercado (junior, semi-senior y senior) para el mismo alcance,
 * con tres marcas: tu piso, tu precio y el precio para negociar.
 */
import { useState } from 'react';
import { useAnchoElemento } from '../../hooks/useAnchoElemento.js';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { escalaLineal, marcasBonitas } from './escalas.js';

const FILAS = [
  { id: 'junior', clase: 'rampa-1' },
  { id: 'semi', clase: 'rampa-2' },
  { id: 'senior', clase: 'rampa-3' },
];

export default function RangoMercado({ mercado, precio, piso, apertura }) {
  const { t } = useIdioma();
  const f = useFormato();
  const nombreNivel = (id) => t(`parametros.nivelesMercado.${id}`);
  const textoRango = (id) =>
    t('graficas.rango.nivel', { nivel: nombreNivel(id), min: f.dinero(mercado[id].min), max: f.dinero(mercado[id].max) });
  const [ref, ancho] = useAnchoElemento();
  const [activa, setActiva] = useState(null);
  const angosto = ancho < 520;
  const margen = { izq: angosto ? 92 : 112, der: 24, arriba: 40, abajo: 58 };
  const altoFila = 40;
  const alto = margen.arriba + FILAS.length * altoFila + margen.abajo;

  const valores = [mercado.junior.min, mercado.senior.max, precio, piso, apertura];
  const { dominio, marcas } = marcasBonitas(Math.min(...valores) * 0.92, Math.max(...valores) * 1.04, angosto ? 3 : 7);
  const x = escalaLineal(dominio, [margen.izq, ancho - margen.der]);
  const yFila = (i) => margen.arriba + i * altoFila + altoFila / 2;
  const yBase = margen.arriba + FILAS.length * altoFila;

  const xPiso = x(piso);
  const xApertura = x(apertura);

  return (
    <figure className="grafica" ref={ref}>
      <svg width={ancho} height={alto} role="img" aria-labelledby="titulo-rango desc-rango">
        <title id="titulo-rango">{t('graficas.rango.titulo')}</title>
        <desc id="desc-rango">
          {[
            ...FILAS.map((fila) => `${textoRango(fila.id)}.`),
            t('graficas.rango.tuyo', { precio: f.dinero(precio), piso: f.dinero(piso) }),
          ].join(' ')}
        </desc>

        {marcas.map((m) => (
          <g key={m}>
            <line className="rejilla" x1={x(m)} x2={x(m)} y1={margen.arriba - 6} y2={yBase} />
            <text className="eje-texto" x={x(m)} y={yBase + 18} textAnchor="middle">
              {f.dineroCorto(m)}
            </text>
          </g>
        ))}

        {FILAS.map((fila, i) => {
          const r = mercado[fila.id];
          const x0 = x(r.min);
          const x1 = x(r.max);
          return (
            <g
              key={fila.id}
              tabIndex={0}
              className="fila-rango"
              onPointerEnter={() => setActiva(fila.id)}
              onPointerLeave={() => setActiva(null)}
              onFocus={() => setActiva(fila.id)}
              onBlur={() => setActiva(null)}
              aria-label={textoRango(fila.id)}
            >
              <rect x={margen.izq - 8} y={yFila(i) - altoFila / 2} width={ancho - margen.izq} height={altoFila} fill="transparent" />
              <text className="eje-texto eje-texto-fuerte" x={margen.izq - 14} y={yFila(i) + 4} textAnchor="end">
                {nombreNivel(fila.id)}
              </text>
              <rect
                className={`rango-barra ${fila.clase} ${activa === fila.id ? 'rango-activo' : ''}`}
                x={x0}
                y={yFila(i) - 8}
                width={Math.max(4, x1 - x0)}
                height={16}
                rx={4}
              />
            </g>
          );
        })}

        {/* Marcas de tu cotización */}
        <line className="marca-piso" x1={xPiso} x2={xPiso} y1={margen.arriba - 6} y2={yBase + 26} />
        <text className="marca-texto" x={xPiso - 6} y={yBase + 40} textAnchor="end">
          {t('graficas.rango.piso')}
        </text>

        <line className="marca-apertura" x1={xApertura} x2={xApertura} y1={margen.arriba - 6} y2={yBase + 26} />
        <text className="marca-texto" x={xApertura + 6} y={yBase + 40} textAnchor="start">
          {t('graficas.rango.negociar')}
        </text>

        <line className="marca-precio" x1={x(precio)} x2={x(precio)} y1={margen.arriba - 14} y2={yBase} />
        <circle className="marca-precio-punto" cx={x(precio)} cy={margen.arriba - 14} r={5} />
        <text
          className="marca-texto marca-texto-fuerte"
          x={x(precio)}
          y={margen.arriba - 24}
          textAnchor={x(precio) > ancho - 120 ? 'end' : x(precio) < margen.izq + 60 ? 'start' : 'middle'}
        >
          {t('graficas.rango.precio', { valor: f.dineroCorto(precio) })}
        </text>
      </svg>
      {activa ? (
        <div className="tooltip tooltip-fijo" role="status">
          <strong className="cifra">
            {t('graficas.rango.entre', { min: f.dinero(mercado[activa].min), max: f.dinero(mercado[activa].max) })}
          </strong>
          <span>
            {t('graficas.rango.porHora', {
              nivel: nombreNivel(activa),
              min: f.dinero(mercado[activa].tarifaMin),
              max: f.dinero(mercado[activa].tarifaMax),
            })}
          </span>
        </div>
      ) : null}
    </figure>
  );
}
