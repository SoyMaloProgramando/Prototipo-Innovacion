/**
 * Precio sugerido y piso según el dominio (0 a 100 %).
 * Línea de 2 px, punto en tu nivel actual, retícula horizontal tenue y
 * cruz que sigue al puntero (o a las flechas del teclado) con la lectura de ambas series.
 */
import { useState } from 'react';
import { useAnchoElemento } from '../../hooks/useAnchoElemento.js';
import { T, useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { escalaLineal, marcasBonitas } from './escalas.js';

export default function CurvaDominio({ puntos, actual }) {
  const { t } = useIdioma();
  const f = useFormato();
  const pct = (valor) => f.porcentaje(valor / 100);
  const [ref, ancho] = useAnchoElemento();
  const [indice, setIndice] = useState(null);
  const angosto = ancho < 520;
  const margen = { izq: 64, der: angosto ? 24 : 120, arriba: 20, abajo: 44 };
  const alto = 260;

  const valores = puntos.flatMap((p) => [p.precio, p.piso]);
  const { dominio, marcas } = marcasBonitas(Math.min(...valores) * 0.95, Math.max(...valores) * 1.03, 4);
  const x = escalaLineal([0, 100], [margen.izq, ancho - margen.der]);
  const y = escalaLineal(dominio, [alto - margen.abajo, margen.arriba]);

  const camino = (clave) => puntos.map((p, i) => `${i ? 'L' : 'M'}${x(p.especialidad).toFixed(1)},${y(p[clave]).toFixed(1)}`).join('');
  const ultimo = puntos.at(-1);
  const puntoActual = puntos.reduce((mejor, p) =>
    Math.abs(p.especialidad - actual) < Math.abs(mejor.especialidad - actual) ? p : mejor,
  );
  const enfoque = indice === null ? null : puntos[indice];

  // Etiquetas directas al final de cada línea solo si no se chocan.
  const yFinPrecio = y(ultimo.precio);
  const yFinPiso = y(ultimo.piso);
  const etiquetasDirectas = !angosto && Math.abs(yFinPrecio - yFinPiso) >= 16;

  const moverA = (clientX, caja) => {
    const valor = x.invertir(clientX - caja.left);
    const paso = puntos[1].especialidad - puntos[0].especialidad;
    const i = Math.round(Math.min(100, Math.max(0, valor)) / paso);
    setIndice(Math.min(puntos.length - 1, Math.max(0, i)));
  };

  return (
    <figure className="grafica" ref={ref}>
      <svg
        width={ancho}
        height={alto}
        role="img"
        aria-labelledby="titulo-curva desc-curva"
        tabIndex={0}
        onPointerMove={(e) => moverA(e.clientX, e.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setIndice(null)}
        onFocus={() => setIndice(puntos.indexOf(puntoActual))}
        onBlur={() => setIndice(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') setIndice((i) => Math.min(puntos.length - 1, (i ?? 0) + 1));
          if (e.key === 'ArrowLeft') setIndice((i) => Math.max(0, (i ?? 0) - 1));
        }}
      >
        <title id="titulo-curva">{t('graficas.curva.titulo')}</title>
        <desc id="desc-curva">
          {t('graficas.curva.descripcion', {
            cero: pct(0),
            precioCero: f.dinero(puntos[0].precio),
            cien: pct(100),
            precioCien: f.dinero(ultimo.precio),
            actual: pct(actual),
          })}
        </desc>

        {marcas.map((m) => (
          <g key={m}>
            <line className="rejilla" x1={margen.izq} x2={ancho - margen.der} y1={y(m)} y2={y(m)} />
            <text className="eje-texto" x={margen.izq - 10} y={y(m) + 4} textAnchor="end">
              {f.dineroCorto(m)}
            </text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map((m) => (
          <text key={m} className="eje-texto" x={x(m)} y={alto - margen.abajo + 20} textAnchor="middle">
            {pct(m)}
          </text>
        ))}
        <text className="eje-texto" x={(margen.izq + ancho - margen.der) / 2} y={alto - 6} textAnchor="middle">
          {t('graficas.curva.eje')}
        </text>

        <line className="eje" x1={margen.izq} x2={ancho - margen.der} y1={alto - margen.abajo} y2={alto - margen.abajo} />

        <path className="linea serie-trazo-2" d={camino('piso')} />
        <path className="linea serie-trazo-1" d={camino('precio')} />

        {/* Tu nivel actual */}
        <line className="guia-actual" x1={x(actual)} x2={x(actual)} y1={margen.arriba} y2={alto - margen.abajo} />
        <circle className="punto serie-relleno-1" cx={x(puntoActual.especialidad)} cy={y(puntoActual.precio)} r={5} />

        {etiquetasDirectas ? (
          <>
            <text className="etiqueta-directa" x={x(100) + 10} y={yFinPrecio + 4}>
              {t('graficas.curva.precioFinal', { valor: f.dineroCorto(ultimo.precio) })}
            </text>
            <text className="etiqueta-directa" x={x(100) + 10} y={yFinPiso + 4}>
              {t('graficas.curva.pisoFinal', { valor: f.dineroCorto(ultimo.piso) })}
            </text>
          </>
        ) : null}

        {enfoque ? (
          <g className="cruz">
            <line x1={x(enfoque.especialidad)} x2={x(enfoque.especialidad)} y1={margen.arriba} y2={alto - margen.abajo} />
            <circle className="punto serie-relleno-1" cx={x(enfoque.especialidad)} cy={y(enfoque.precio)} r={4} />
            <circle className="punto serie-relleno-2" cx={x(enfoque.especialidad)} cy={y(enfoque.piso)} r={4} />
          </g>
        ) : null}
      </svg>

      {enfoque ? (
        <div
          className="tooltip"
          role="status"
          style={{ left: Math.min(Math.max(0, x(enfoque.especialidad) - 90), ancho - 190), top: 8 }}
        >
          <span className="tooltip-titulo">{t('graficas.curva.dominio', { valor: pct(enfoque.especialidad) })}</span>
          <span className="tooltip-linea">
            <span className="clave clave-linea serie-fondo-1" aria-hidden="true" />
            <T k="graficas.curva.precio" valores={{ valor: <strong className="cifra">{f.dinero(enfoque.precio)}</strong> }} />
          </span>
          <span className="tooltip-linea">
            <span className="clave clave-linea serie-fondo-2" aria-hidden="true" />
            <T k="graficas.curva.piso" valores={{ valor: <strong className="cifra">{f.dinero(enfoque.piso)}</strong> }} />
          </span>
        </div>
      ) : null}

      <figcaption>
        <ul className="leyenda">
          <li>
            <span className="clave clave-linea serie-fondo-1" aria-hidden="true" />
            {t('graficas.curva.leyendaPrecio')}
          </li>
          <li>
            <span className="clave clave-linea serie-fondo-2" aria-hidden="true" />
            {t('graficas.curva.leyendaPiso')}
          </li>
          <li>
            <span className="clave clave-guia" aria-hidden="true" />
            {t('graficas.curva.leyendaActual', { valor: pct(actual) })}
          </li>
        </ul>
      </figcaption>
    </figure>
  );
}
