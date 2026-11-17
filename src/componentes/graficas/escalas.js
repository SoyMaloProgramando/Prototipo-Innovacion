/** Escalas y marcas de eje para las gráficas SVG hechas a mano. */

export function escalaLineal([d0, d1], [r0, r1]) {
  const m = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
  const escala = (v) => r0 + (v - d0) * m;
  escala.invertir = (px) => (m === 0 ? d0 : d0 + (px - r0) / m);
  return escala;
}

function pasoBonito(rango, marcas) {
  const crudo = rango / Math.max(1, marcas);
  const magnitud = 10 ** Math.floor(Math.log10(crudo));
  const normal = crudo / magnitud;
  const factor = normal >= 5 ? 10 : normal >= 2 ? 5 : normal >= 1 ? 2 : 1;
  return factor * magnitud;
}

/** Dominio redondeado y marcas "bonitas" (0, 250 mil, 500 mil...). */
export function marcasBonitas(min, max, marcas = 4) {
  if (min === max) {
    const holgura = Math.abs(min) * 0.1 || 1;
    return marcasBonitas(min - holgura, max + holgura, marcas);
  }
  const paso = pasoBonito(max - min, marcas);
  const inicio = Math.floor(min / paso) * paso;
  const fin = Math.ceil(max / paso) * paso;
  const lista = [];
  for (let v = inicio; v <= fin + paso / 2; v += paso) lista.push(Math.round(v * 1000) / 1000);
  return { dominio: [inicio, fin], marcas: lista };
}
