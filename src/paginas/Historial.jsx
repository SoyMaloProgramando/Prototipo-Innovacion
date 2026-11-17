import { useRef, useState } from 'react';
import BarrasNiveles from '../componentes/graficas/BarrasNiveles.jsx';
import Icono from '../componentes/ui/Icono.jsx';
import { PRODUCTOS } from '../datos/catalogo.js';
import { buscarPais } from '../datos/paises.js';
import { useCotizador } from '../estado/CotizadorContext.jsx';
import { navegar } from '../hooks/useRuta.js';
import { useCatalogo } from '../i18n/catalogo.js';
import { useIdioma } from '../i18n/IdiomaContext.jsx';
import { useFormato, useFormatos } from '../i18n/useFormato.js';

const productosPorId = new Map(PRODUCTOS.map((p) => [p.id, p]));

function descargar(nombre, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Columnas del CSV, en orden. Sus encabezados están en historial.csv. */
const COLUMNAS_CSV = [
  'codigo',
  'fecha',
  'producto',
  'cliente',
  'complejidad',
  'unidades',
  'especialidad',
  'horasFacturables',
  'tarifaAjustada',
  'precio',
  'total',
  'piso',
  'ganancia',
  'posicion',
  'pais',
  'moneda',
];

/**
 * CSV para Excel, separado por punto y coma.
 * columnas: [[encabezado, (cotizacion) => valor]]. Los números van sin formato, redondeados a un decimal.
 */
function aCSV(columnas, historial) {
  const celda = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
  const crudo = (v) => (typeof v === 'number' ? Math.round(v * 10) / 10 : v);
  const filas = historial.map((h) => columnas.map(([, valor]) => celda(crudo(valor(h)))).join(';'));
  return `﻿${columnas.map(([encabezado]) => celda(encabezado)).join(';')}\n${filas.join('\n')}`;
}

/** País de una cotización guardada. Las anteriores a los 29 países no lo traen: eran de Colombia. */
const paisDe = (h) => h.resumen?.pais ?? 'CO';

/** Nombre local del impuesto a la venta de la cotización (IVA, IGV, ITBIS...). */
const impuestoDe = (h) => h.estado?.parametros?.ivaNombre ?? 'IVA';

/** El valor que comparten todas las cotizaciones de la lista, o null si alguna tiene otro. */
function valorComun(lista, valorDe) {
  const valores = new Set(lista.map(valorDe));
  return valores.size === 1 ? [...valores][0] : null;
}

export default function Historial() {
  const { estado, acciones } = useCotizador();
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const formatoDe = useFormatos();
  const cat = useCatalogo();
  const [seleccion, setSeleccion] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const archivo = useRef(null);
  const { historial } = estado;
  const comparadas = historial.filter((h) => seleccion.includes(h.id));

  /** Texto traducido o, si la clave no existe (un id desconocido), el texto en español que se guardó. */
  const traducirO = (clave, respaldo) => {
    const texto = t(clave);
    return texto === clave ? respaldo : texto;
  };

  /** Textos de una cotización en el idioma actual. Las antiguas no traen ids: se usan sus textos en español. */
  const textosDe = (h) => {
    const r = h.resumen;
    const producto = productosPorId.get(r.productoId);
    return {
      producto: producto ? cat.producto(producto).nombre : r.producto,
      complejidad: r.complejidadId ? traducirO(`parametros.niveles.${r.complejidadId}.nombre`, r.complejidad) : r.complejidad,
      posicion: r.posicionNivel ? traducirO(`parametros.posiciones.${r.posicionNivel}`, r.posicion) : r.posicion,
      pais: buscarPais(paisDe(h)).nombres[idioma],
    };
  };

  /** Cada cotización se muestra en la moneda de su país. */
  const dineroDe = (h) => formatoDe(paisDe(h)).dinero;
  const impuestoDeLista = (lista) => valorComun(lista, impuestoDe) ?? t('historial.impuestoGenerico');
  const variosPaises = new Set(historial.map(paisDe)).size > 1;

  const alternar = (id) =>
    setSeleccion((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= 4 ? s : [...s, id]));

  const importar = async (evento) => {
    const file = evento.target.files?.[0];
    evento.target.value = '';
    if (!file) return;
    try {
      const datos = JSON.parse(await file.text());
      const entradas = Array.isArray(datos) ? datos : datos.historial;
      if (!Array.isArray(entradas)) throw new Error('formato');
      acciones.importarHistorial(entradas);
      setMensaje({ clave: 'importadas', n: entradas.length });
    } catch {
      setMensaje({ clave: 'archivoInvalido' });
    }
  };

  const exportarCSV = () => {
    const impuesto = impuestoDeLista(historial);
    const valores = {
      codigo: (h) => h.codigo,
      fecha: (h) => String(h.fecha ?? '').slice(0, 10),
      producto: (h) => textosDe(h).producto,
      complejidad: (h) => textosDe(h).complejidad,
      posicion: (h) => textosDe(h).posicion,
      pais: (h) => textosDe(h).pais,
      moneda: (h) => h.resumen.moneda ?? formatoDe(paisDe(h)).codigo,
    };
    const columnas = COLUMNAS_CSV.map((clave) => [
      t(`historial.csv.${clave}`, { impuesto }),
      valores[clave] ?? ((h) => h.resumen[clave]),
    ]);
    descargar('tarifajusta-historial.csv', aCSV(columnas, historial), 'text/csv;charset=utf-8');
  };

  const monedaComun = valorComun(comparadas, (h) => formatoDe(paisDe(h)).codigo);
  const impuestoComparadas = impuestoDeLista(comparadas);
  const metricas = [
    ...(new Set(comparadas.map(paisDe)).size > 1 ? [['pais', (h, tx) => tx.pais]] : []),
    ['producto', (h, tx) => tx.producto],
    ['cliente', (h) => h.resumen.cliente || t('historial.sinNombre')],
    ['complejidad', (h, tx) => tx.complejidad],
    ['dominio', (h) => f.porcentaje((Number(h.resumen.especialidad) || 0) / 100)],
    ['horas', (h) => f.horas(h.resumen.horasFacturables)],
    ['tarifa', (h) => t('historial.metricas.porHora', { valor: dineroDe(h)(h.resumen.tarifaAjustada) })],
    ['precio', (h) => dineroDe(h)(h.resumen.precio)],
    ['piso', (h) => dineroDe(h)(h.resumen.piso)],
    ['ganancia', (h) => dineroDe(h)(h.resumen.ganancia)],
    ['gananciaPorHora', (h) => dineroDe(h)(h.resumen.gananciaPorHora)],
    ['mercado', (h, tx) => tx.posicion],
  ];

  return (
    <div className="pagina contenedor historial">
      <header className="pagina-cabeza">
        <h1>{t('historial.titulo')}</h1>
        <p>{t('historial.intro')}</p>
      </header>

      <div className="grupo-botones barra-historial">
        <button
          type="button"
          className="boton"
          disabled={!historial.length}
          onClick={() => descargar('tarifajusta-historial.json', JSON.stringify({ version: 1, historial }, null, 2), 'application/json')}
        >
          <Icono nombre="descargar" />
          {t('historial.exportarJson')}
        </button>
        <button type="button" className="boton" disabled={!historial.length} onClick={exportarCSV}>
          <Icono nombre="descargar" />
          {t('historial.exportarCsv')}
        </button>
        <button type="button" className="boton" onClick={() => archivo.current?.click()}>
          <Icono nombre="subir" />
          {t('historial.importarJson')}
        </button>
        <input ref={archivo} type="file" accept="application/json,.json" hidden onChange={importar} />
        {mensaje ? (
          <p className="texto-secundario" role="status">
            {t(`historial.${mensaje.clave}`, mensaje)}
          </p>
        ) : null}
      </div>

      {historial.length === 0 ? (
        <div className="vacio vacio-grande">
          <h2>{t('historial.vacio.titulo')}</h2>
          <p className="texto-secundario">
            {t('historial.vacio.texto', { boton: traducirO('resultado.acciones.guardar', t('historial.vacio.boton')) })}
          </p>
          <a className="boton boton-principal" href="#/cotizar">
            {t('historial.vacio.cotizar')}
          </a>
        </div>
      ) : (
        <>
          <div className="tabla-envoltura">
            <table className="tabla">
              <caption className="solo-lectores">{t('historial.tabla.titulo')}</caption>
              <thead>
                <tr>
                  <th scope="col">{t('historial.tabla.comparar')}</th>
                  <th scope="col">{t('historial.tabla.codigo')}</th>
                  <th scope="col">{t('historial.tabla.producto')}</th>
                  <th scope="col">{t('historial.tabla.cliente')}</th>
                  <th scope="col" className="num">
                    {t('historial.tabla.horas')}
                  </th>
                  <th scope="col" className="num">
                    {t('historial.tabla.precio')}
                  </th>
                  <th scope="col" className="num">
                    {t('historial.tabla.teQueda')}
                  </th>
                  <th scope="col">
                    <span className="solo-lectores">{t('historial.tabla.acciones')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => {
                  const tx = textosDe(h);
                  const dinero = dineroDe(h);
                  return (
                    <tr key={h.id} data-carrera={h.resumen.carrera}>
                      <td>
                        <input
                          type="checkbox"
                          checked={seleccion.includes(h.id)}
                          onChange={() => alternar(h.id)}
                          aria-label={t('historial.tabla.compararCodigo', { codigo: h.codigo })}
                        />
                      </td>
                      <th scope="row">
                        <span className="cifra">{h.codigo}</span>
                        <span className="texto-secundario texto-pequeno">
                          {' '}
                          {f.fechaBreve(new Date(h.fecha))}
                          {variosPaises ? ` · ${tx.pais}` : ''}
                        </span>
                      </th>
                      <td>
                        <span className="carrera-punto" aria-hidden="true" /> {tx.producto}
                      </td>
                      <td>{h.resumen.cliente || <span className="texto-secundario">{t('historial.sinNombre')}</span>}</td>
                      <td className="num cifra">{f.horas(h.resumen.horasFacturables)}</td>
                      <td className="num cifra">{dinero(h.resumen.precio)}</td>
                      <td className="num cifra">{dinero(h.resumen.ganancia)}</td>
                      <td>
                        <div className="acciones-fila">
                          <button
                            type="button"
                            className="boton boton-pequeno"
                            onClick={() => {
                              acciones.cargarCotizacion(h.id);
                              navegar('resultado');
                            }}
                          >
                            {t('historial.tabla.abrir')}
                          </button>
                          <button
                            type="button"
                            className="boton boton-fantasma boton-pequeno boton-peligro"
                            onClick={() => {
                              acciones.eliminarCotizacion(h.id);
                              setSeleccion((s) => s.filter((x) => x !== h.id));
                            }}
                            aria-label={t('historial.tabla.eliminar', { codigo: h.codigo })}
                          >
                            <Icono nombre="papelera" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <section className="resultado-seccion comparacion" aria-labelledby="t-comparar">
            <h2 id="t-comparar">{t('historial.comparacion.titulo')}</h2>
            {comparadas.length < 2 ? (
              <p className="texto-secundario">{t('historial.comparacion.instruccion')}</p>
            ) : (
              <>
                {monedaComun ? (
                  <BarrasNiveles
                    titulo={t('historial.comparacion.grafica', { impuesto: impuestoComparadas })}
                    datos={comparadas.map((h) => ({ id: h.id, nombre: h.codigo, valor: h.resumen.precio }))}
                    actual={null}
                    formatoValor={(v) => dineroDe(comparadas.find((h) => h.resumen.precio === v) ?? comparadas[0])(v)}
                  />
                ) : (
                  // Precios en monedas distintas no se pueden comparar en una misma escala.
                  <p className="texto-secundario">{t('historial.comparacion.monedasDistintas')}</p>
                )}
                <div className="tabla-envoltura">
                  <table className="tabla">
                    <thead>
                      <tr>
                        <th scope="col">{t('historial.comparacion.dato')}</th>
                        {comparadas.map((h) => (
                          <th key={h.id} scope="col" className="num">
                            {h.codigo}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {metricas.map(([clave, valor]) => (
                        <tr key={clave}>
                          <th scope="row">{t(`historial.metricas.${clave}`, { impuesto: impuestoComparadas })}</th>
                          {comparadas.map((h) => (
                            <td key={h.id} className="num cifra">
                              {valor(h, textosDe(h))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
