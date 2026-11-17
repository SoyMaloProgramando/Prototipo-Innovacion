/**
 * Barra segmentada alta: un total dividido en partes.
 * Cada parte lleva su color fijo (slot), un espacio de 2 px entre bloques,
 * su porcentaje adentro solo si cabe, y detalle al pasar el mouse o con el teclado.
 * La leyenda va debajo en el mismo orden. Los valores exactos están en la tabla vecina.
 * Sin formatoValor, los valores se muestran como dinero en la moneda de la cotización.
 */
import { useState } from 'react';
import { useAnchoElemento } from '../../hooks/useAnchoElemento.js';
import { useFormato } from '../../i18n/useFormato.js';

const ESPACIO = 2;

export default function BarraSegmentada({ partes, etiqueta, formatoValor, mostrarValores = false }) {
  const f = useFormato();
  const formatear = formatoValor ?? f.dinero;
  const [ref, ancho] = useAnchoElemento();
  const [activa, setActiva] = useState(null);
  const visibles = partes.filter((p) => p.valor > 0);
  const total = visibles.reduce((s, p) => s + p.valor, 0) || 1;
  const disponible = Math.max(0, ancho - ESPACIO * (visibles.length - 1));
  const parteActiva = visibles.find((p) => p.id === activa);

  let acumulado = 0;
  const posiciones = visibles.map((p) => {
    const anchoPx = (p.valor / total) * disponible;
    const inicio = acumulado;
    acumulado += anchoPx + ESPACIO;
    return { ...p, anchoPx, inicio };
  });

  return (
    <figure className="grafica barra-segmentada">
      <div ref={ref} className="segmentos" role="group" aria-label={etiqueta}>
        {posiciones.map((p) => {
          const texto = f.porcentaje(p.valor / total);
          const cabe = p.anchoPx >= texto.length * 8 + 16;
          return (
            <button
              type="button"
              key={p.id}
              className={`segmento serie-${p.slot} ${activa === p.id ? 'segmento-activo' : ''}`}
              style={{ flexGrow: p.valor, flexBasis: 0 }}
              aria-label={`${p.etiqueta}: ${formatear(p.valor)}, ${texto}`}
              onPointerEnter={() => setActiva(p.id)}
              onPointerLeave={() => setActiva(null)}
              onFocus={() => setActiva(p.id)}
              onBlur={() => setActiva(null)}
            >
              {cabe ? <span className="segmento-texto">{texto}</span> : null}
            </button>
          );
        })}
        {parteActiva ? (
          <div
            className="tooltip"
            role="status"
            style={{
              left: Math.min(
                Math.max(
                  0,
                  posiciones.find((p) => p.id === activa).inicio + posiciones.find((p) => p.id === activa).anchoPx / 2 - 90,
                ),
                Math.max(0, ancho - 180),
              ),
            }}
          >
            <strong className="cifra">{formatear(parteActiva.valor)}</strong>
            <span className="tooltip-linea">
              <span className={`clave clave-barra serie-${parteActiva.slot}`} aria-hidden="true" />
              {parteActiva.etiqueta}, {f.porcentaje(parteActiva.valor / total)}
            </span>
          </div>
        ) : null}
      </div>
      <figcaption>
        <ul className="leyenda">
          {visibles.map((p) => (
            <li key={p.id}>
              <span className={`clave clave-barra serie-${p.slot}`} aria-hidden="true" />
              {p.etiqueta}
              {mostrarValores ? (
                <>
                  : <strong className="cifra">{formatear(p.valor)}</strong>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
