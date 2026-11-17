/**
 * Barras horizontales simples (una sola serie). La barra actual va en el color
 * de la serie y las demás en gris, para resaltar sin competir.
 * Sin formatoValor, los valores se muestran como dinero en la moneda de la cotización.
 */
import { useAnchoElemento } from '../../hooks/useAnchoElemento.js';
import { useFormato } from '../../i18n/useFormato.js';
import { escalaLineal } from './escalas.js';

export default function BarrasNiveles({ datos, actual, titulo, formatoValor, detalle }) {
  const f = useFormato();
  const formatear = formatoValor ?? f.dinero;
  const [ref, ancho] = useAnchoElemento();
  const margen = { izq: 104, der: 120 };
  const altoFila = 40;
  const alto = datos.length * altoFila + 8;
  const maximo = Math.max(...datos.map((d) => d.valor), 1);
  const x = escalaLineal([0, maximo], [margen.izq, ancho - margen.der]);

  return (
    <figure className="grafica" ref={ref}>
      <svg width={ancho} height={alto} role="img" aria-label={titulo}>
        <line className="eje" x1={margen.izq} x2={margen.izq} y1={0} y2={alto - 4} />
        {datos.map((d, i) => {
          const yCentro = i * altoFila + altoFila / 2 + 2;
          const anchoBarra = Math.max(4, x(d.valor) - margen.izq);
          // Sin "actual", todas las barras son la misma serie y van en su color.
          const esActual = actual === null || actual === undefined || d.id === actual;
          return (
            <g key={d.id}>
              <title>{`${d.nombre}: ${formatear(d.valor)}${detalle ? `, ${detalle(d)}` : ''}`}</title>
              <text className={`eje-texto ${esActual ? 'eje-texto-fuerte' : ''}`} x={margen.izq - 12} y={yCentro + 4} textAnchor="end">
                {d.nombre}
              </text>
              <path
                className={esActual ? 'serie-relleno-1' : 'barra-apagada'}
                d={`M${margen.izq},${yCentro - 11}h${anchoBarra - 4}a4,4 0 0 1 4,4v14a4,4 0 0 1 -4,4h-${anchoBarra - 4}z`}
              />
              <text className={`valor-barra ${esActual ? 'valor-barra-fuerte' : ''}`} x={margen.izq + anchoBarra + 8} y={yCentro + 4}>
                {formatear(d.valor)}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
