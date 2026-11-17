/**
 * Grabado de guilloché como el de los billetes: anillos ondulados que se
 * superponen en una roseta, más una cenefa de ondas en el borde inferior.
 * Se calcula una sola vez (es decoración estática) y hereda el color del acento.
 */
const ANCHO = 640;
const ALTO = 320;

function anillo(cx, cy, radio, amplitud, lobulos, fase, pasos = 540) {
  let d = '';
  for (let i = 0; i <= pasos; i += 1) {
    const t = (i / pasos) * Math.PI * 2;
    const r = radio + amplitud * Math.sin(lobulos * t + fase);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

function onda(y, amplitud, longitud, fase) {
  let d = '';
  for (let x = -10; x <= ANCHO + 10; x += 4) {
    const yy = y + amplitud * Math.sin((x / longitud) * Math.PI * 2 + fase);
    d += `${x === -10 ? 'M' : 'L'}${x},${yy.toFixed(1)}`;
  }
  return d;
}

const ROSETA = Array.from({ length: 26 }, (_, k) => ({
  d: anillo(500, 150, 46 + k * 4.6, 7 + (k % 4) * 1.6, k % 2 === 0 ? 18 : 24, k * 0.42),
  opacidad: 0.14 + (k % 5) * 0.05,
}));

const CENEFA = Array.from({ length: 7 }, (_, k) => ({
  d: onda(286 + k * 3.2, 6 + (k % 3), 42 + k * 2, k * 0.9),
  opacidad: 0.16 + (k % 3) * 0.08,
}));

export default function Guilloche({ className = '' }) {
  return (
    <svg
      className={`guilloche ${className}`}
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        {ROSETA.map((a, i) => (
          <path key={`r${i}`} d={a.d} opacity={a.opacidad} />
        ))}
        {CENEFA.map((o, i) => (
          <path key={`c${i}`} d={o.d} opacity={o.opacidad} />
        ))}
      </g>
    </svg>
  );
}
