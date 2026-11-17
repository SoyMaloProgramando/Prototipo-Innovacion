/**
 * Campos de formulario controlados. Todos reciben `valor` y `alCambiar`
 * y muestran etiqueta, ayuda corta y error con la misma estructura.
 *
 * `explicacion` agrega el botón "!" junto a la etiqueta. Puede ser la clave de
 * src/i18n/textos/<idioma>/explicaciones.js (por ejemplo "horasSemana") o un objeto
 * { que, ejemplo, nota } ya traducido.
 */
import { useId, useState } from 'react';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { sinCortes } from '../../logica/formato.js';
import { useAyuda } from './Ayuda.jsx';

const SIN_GUIA = { abierto: false, boton: null, panel: null, panelId: undefined };

export function Campo({ etiqueta, ayuda, error, id, guia = SIN_GUIA, children, className = '' }) {
  return (
    <div className={`campo ${error ? 'campo-error' : ''} ${className}`}>
      {etiqueta ? (
        <div className="campo-cabeza">
          <label className="campo-etiqueta" htmlFor={id}>
            {etiqueta}
          </label>
          {guia.boton}
        </div>
      ) : null}
      {guia.panel}
      {children}
      {error ? (
        <p className="campo-mensaje-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
      {ayuda ? (
        <p className="campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id, ayuda, error, guia) {
  return (
    [error ? `${id}-error` : null, ayuda ? `${id}-ayuda` : null, guia?.abierto ? guia.panelId : null].filter(Boolean).join(' ') ||
    undefined
  );
}

export function CampoTexto({
  etiqueta,
  ayuda,
  explicacion,
  valor,
  alCambiar,
  placeholder,
  tipo = 'text',
  autoComplete,
  className,
}) {
  const id = useId();
  const guia = useAyuda(explicacion, etiqueta);
  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} id={id} guia={guia} className={className}>
      <div className="campo-entrada">
        <input
          id={id}
          type={tipo}
          value={valor}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={describedBy(id, ayuda, null, guia)}
          onChange={(e) => alCambiar(e.target.value)}
        />
      </div>
    </Campo>
  );
}

export function CampoAreaTexto({ etiqueta, ayuda, explicacion, valor, alCambiar, placeholder }) {
  const id = useId();
  const guia = useAyuda(explicacion, etiqueta);
  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} id={id} guia={guia}>
      <div className="campo-entrada">
        <textarea
          id={id}
          value={valor}
          placeholder={placeholder}
          aria-describedby={describedBy(id, ayuda, null, guia)}
          onChange={(e) => alCambiar(e.target.value)}
        />
      </div>
    </Campo>
  );
}

/**
 * Número con prefijo o sufijo opcional. Acepta coma decimal.
 * Mientras escribes guarda el texto; al salir del campo lo ajusta al rango.
 */
export function CampoNumero({
  etiqueta,
  ayuda,
  explicacion,
  valor,
  alCambiar,
  min = 0,
  max,
  paso = 1,
  prefijo,
  sufijo,
  decimales = false,
  className,
}) {
  const id = useId();
  const { t } = useIdioma();
  const f = useFormato();
  const guia = useAyuda(explicacion, etiqueta);
  const [texto, setTexto] = useState(null);
  const mostrado =
    texto ?? (valor === '' || valor === null || valor === undefined ? '' : String(valor).replace('.', f.separadorDecimal));
  const fueraDeRango = valor !== '' && ((min !== undefined && Number(valor) < min) || (max !== undefined && Number(valor) > max));
  const error = fueraDeRango
    ? max === undefined
      ? t('campos.minimo', { min: f.numero(min, 2) })
      : t('campos.rango', { min: f.numero(min, 2), max: f.numero(max, 2) })
    : null;

  const convertir = (crudo) => {
    const limpio = crudo.replace(/\s/g, '').replace(',', '.');
    if (limpio === '' || limpio === '.') return '';
    const numero = decimales ? Number.parseFloat(limpio) : Number.parseInt(limpio, 10);
    return Number.isNaN(numero) ? '' : numero;
  };

  const ajustar = (n) => {
    if (n === '') return min ?? 0;
    let v = n;
    if (min !== undefined) v = Math.max(min, v);
    if (max !== undefined) v = Math.min(max, v);
    return v;
  };

  const sumar = (delta) => {
    const actual = Number(valor) || 0;
    const nuevo = ajustar(Math.round((actual + delta) * 100) / 100);
    setTexto(null);
    alCambiar(nuevo);
  };

  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} error={error} id={id} guia={guia} className={className}>
      <div className="campo-entrada campo-numero">
        <button type="button" className="campo-paso" onClick={() => sumar(-paso)} aria-label={t('campos.restar', { paso })}>
          −
        </button>
        {prefijo ? <span className="campo-afijo">{prefijo}</span> : null}
        <input
          id={id}
          type="text"
          inputMode={decimales ? 'decimal' : 'numeric'}
          value={mostrado}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, ayuda, error, guia)}
          onChange={(e) => {
            const crudo = e.target.value.replace(/[^\d,.\s]/g, '');
            setTexto(crudo);
            const n = convertir(crudo);
            if (n !== '') alCambiar(n);
          }}
          onBlur={() => {
            const n = convertir(texto ?? String(valor));
            setTexto(null);
            alCambiar(ajustar(n));
          }}
        />
        {sufijo ? <span className="campo-afijo">{sufijo}</span> : null}
        <button type="button" className="campo-paso" onClick={() => sumar(paso)} aria-label={t('campos.sumar', { paso })}>
          +
        </button>
      </div>
    </Campo>
  );
}

/**
 * Valor en dinero: escribe solo números y se muestra con separadores de miles.
 * Usa la moneda del país; con `moneda="USD"` es un valor en dólares.
 * En monedas con centavos (dólar, euro, real...) acepta decimales.
 * `precision` fija cuántos decimales acepta y muestra (por ejemplo 4 para un tipo de
 * cambio como 3.182,99 o 18,824, aunque la moneda no use centavos).
 */
export function CampoDinero({ etiqueta, ayuda, explicacion, valor, alCambiar, moneda, className, precision }) {
  const id = useId();
  const f = useFormato();
  const guia = useAyuda(explicacion, etiqueta);
  const [texto, setTexto] = useState(null);
  const enDolares = moneda === 'USD' && f.codigo !== 'USD';
  const conPrecision = precision !== undefined && precision !== null;
  const mostrado = texto ?? (enDolares ? String(valor ?? '') : conPrecision ? f.numero(valor, precision) : f.miles(valor));
  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} id={id} guia={guia} className={className}>
      <div className="campo-entrada">
        <span className="campo-afijo">{enDolares ? 'US$' : f.simbolo}</span>
        <input
          id={id}
          type="text"
          inputMode={f.conDecimales || enDolares || precision > 0 ? 'decimal' : 'numeric'}
          value={mostrado}
          aria-describedby={describedBy(id, ayuda, null, guia)}
          onFocus={() =>
            setTexto(
              !valor ? '' : conPrecision ? f.numero(valor, precision) : String(valor).replace('.', f.separadorDecimal),
            )
          }
          onBlur={() => setTexto(null)}
          onChange={(e) => {
            setTexto(e.target.value);
            const dolares = Number.parseFloat(e.target.value.replace(/[^\d,.]/g, '').replace(',', '.'));
            if (enDolares) alCambiar(Number.isNaN(dolares) ? 0 : Math.round(dolares * 100) / 100);
            else alCambiar(conPrecision ? f.leerDinero(e.target.value, precision) : f.leerDinero(e.target.value));
          }}
        />
        <span className="campo-afijo">{enDolares ? 'USD' : f.codigo}</span>
      </div>
    </Campo>
  );
}

/** Lista desplegable. `opciones: [{ valor, texto }]` o `grupos: [{ etiqueta, opciones }]` (con <optgroup>). */
export function CampoSelector({ etiqueta, ayuda, explicacion, valor, alCambiar, opciones = [], grupos, className }) {
  const id = useId();
  const guia = useAyuda(explicacion, etiqueta);
  const lista = (items) =>
    items.map((o) => (
      <option key={o.valor} value={o.valor}>
        {o.texto}
      </option>
    ));
  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} id={id} guia={guia} className={className}>
      <div className="campo-entrada">
        <select
          id={id}
          value={valor}
          aria-describedby={describedBy(id, ayuda, null, guia)}
          onChange={(e) => alCambiar(e.target.value)}
        >
          {grupos
            ? grupos.map((g) => (
                <optgroup key={g.etiqueta} label={g.etiqueta}>
                  {lista(g.opciones)}
                </optgroup>
              ))
            : lista(opciones)}
        </select>
      </div>
    </Campo>
  );
}

export function CampoFecha({ etiqueta, ayuda, explicacion, valor, alCambiar }) {
  const id = useId();
  const guia = useAyuda(explicacion, etiqueta);
  return (
    <Campo etiqueta={etiqueta} ayuda={ayuda} id={id} guia={guia}>
      <div className="campo-entrada">
        <input
          id={id}
          type="date"
          value={valor}
          onChange={(e) => alCambiar(e.target.value)}
          aria-describedby={describedBy(id, ayuda, null, guia)}
        />
      </div>
    </Campo>
  );
}

/**
 * Interruptor (sí / no). La etiqueta envuelve solo el título, para que el "!"
 * quede justo al lado sin activar el interruptor al tocarlo.
 */
export function Interruptor({ titulo, descripcion, explicacion, activo, alCambiar }) {
  const id = useId();
  const guia = useAyuda(explicacion, titulo);
  const descripcionId = `${id}-descripcion`;
  return (
    <div className="interruptor-campo">
      <div className="interruptor">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={activo}
          aria-describedby={
            [descripcion ? descripcionId : null, guia.abierto ? guia.panelId : null].filter(Boolean).join(' ') || undefined
          }
          onChange={(e) => alCambiar(e.target.checked)}
        />
        <span className="interruptor-texto">
          <span className="campo-cabeza">
            <label className="interruptor-titulo" htmlFor={id}>
              {titulo}
            </label>
            {guia.boton}
          </span>
          {descripcion ? <span id={descripcionId}>{sinCortes(descripcion)}</span> : null}
        </span>
      </div>
      {guia.panel}
    </div>
  );
}

/**
 * Grupo de opciones (radio) presentado como tarjetas o como botones segmentados.
 * opciones: [{ valor, titulo, descripcion?, detalle? }]
 */
export function GrupoOpciones({ leyenda, ayuda, explicacion, valor, alCambiar, opciones, variante = 'tarjetas', columnas }) {
  const nombre = useId();
  const guia = useAyuda(explicacion, leyenda);
  const leyendaId = `${nombre}-leyenda`;
  return (
    <fieldset
      className={`opciones opciones-${variante}`}
      aria-labelledby={leyendaId}
      aria-describedby={guia.abierto ? guia.panelId : undefined}
    >
      <legend className="campo-etiqueta opciones-leyenda">
        <span id={leyendaId}>{leyenda}</span>
        {guia.boton}
      </legend>
      {guia.panel}
      {ayuda ? <p className="campo-ayuda">{ayuda}</p> : null}
      <div className="opciones-lista" style={columnas ? { '--columnas': columnas } : undefined}>
        {opciones.map((o) => {
          const marcado = String(o.valor) === String(valor);
          return (
            <label key={o.valor} className={`opcion ${marcado ? 'opcion-activa' : ''}`}>
              <input type="radio" name={nombre} value={o.valor} checked={marcado} onChange={() => alCambiar(o.valor)} />
              <span className="opcion-titulo">{sinCortes(o.titulo)}</span>
              {o.detalle ? <span className="opcion-detalle">{sinCortes(o.detalle)}</span> : null}
              {o.descripcion ? <span className="opcion-descripcion">{sinCortes(o.descripcion)}</span> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Deslizador con el valor visible y marcas de texto opcionales. */
export function Deslizador({
  etiqueta,
  ayuda,
  explicacion,
  valor,
  alCambiar,
  min = 0,
  max = 100,
  paso = 1,
  formato = (v) => v,
  marcas,
}) {
  const id = useId();
  const guia = useAyuda(explicacion, etiqueta);
  const relleno = `${((Number(valor) - min) / (max - min)) * 100}%`;
  return (
    <div className="campo deslizador-campo">
      <div className="deslizador-cabeza">
        <div className="campo-cabeza">
          <label className="campo-etiqueta" htmlFor={id}>
            {etiqueta}
          </label>
          {guia.boton}
        </div>
        <output htmlFor={id} className="deslizador-valor">
          {formato(valor)}
        </output>
      </div>
      {guia.panel}
      <input
        id={id}
        className="deslizador"
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        style={{ '--relleno': relleno }}
        aria-valuetext={String(formato(valor))}
        aria-describedby={describedBy(id, ayuda, null, guia)}
        onChange={(e) => alCambiar(Number(e.target.value))}
      />
      {marcas ? (
        <div className="deslizador-marcas" aria-hidden="true">
          {marcas.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      ) : null}
      {ayuda ? (
        <div className="campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </div>
      ) : null}
    </div>
  );
}
