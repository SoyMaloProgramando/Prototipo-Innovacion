/**
 * Explicaciones con el botón "!".
 *
 * Junto a cada dato hay un botón redondo con un "!". Al tocarlo se abre un panel
 * que dice qué poner (o qué significa la cifra) y da un ejemplo. Los textos están
 * en src/i18n/textos/<idioma>/explicaciones.js y pueden ser funciones que reciben
 * el país, el idioma y el resultado en vivo, para que los ejemplos den los mismos
 * números que la app.
 *
 * AyudaProvider guarda un interruptor global para abrir o cerrar todas las
 * explicaciones a la vez. Es estado de la interfaz, no de la cotización, por eso
 * no pasa por el reducer.
 */
import { createContext, useCallback, useContext, useId, useMemo, useState } from 'react';
import { buscarPais } from '../../datos/paises.js';
import { useCotizador } from '../../estado/CotizadorContext.jsx';
import { useIdioma } from '../../i18n/IdiomaContext.jsx';
import { useFormato } from '../../i18n/useFormato.js';
import { sinCortes } from '../../logica/formato.js';
import { perfilDePais } from '../../logica/paises.js';

const AyudaContext = createContext({ todas: false, version: 0, alternarTodas: () => {} });

export function AyudaProvider({ children }) {
  // version cambia cada vez que se usa el interruptor global, para que ese
  // cambio pase por encima de lo que cada "!" tenía abierto o cerrado.
  const [estado, setEstado] = useState({ todas: false, version: 0 });
  const alternarTodas = useCallback(() => setEstado((e) => ({ todas: !e.todas, version: e.version + 1 })), []);
  const valor = useMemo(() => ({ ...estado, alternarTodas }), [estado, alternarTodas]);
  return <AyudaContext.Provider value={valor}>{children}</AyudaContext.Provider>;
}

export function useAyudaGlobal() {
  return useContext(AyudaContext);
}

/**
 * Datos para los ejemplos de las explicaciones: formato del país, sus valores de
 * ejemplo (ej), los parámetros (p) y el resultado actual (r), para que cada ejemplo
 * salga en la moneda y con las cifras de quien está cotizando.
 */
function useContextoEjemplos() {
  const { t, idioma } = useIdioma();
  const f = useFormato();
  const { estado, resultado } = useCotizador();
  const paisId = estado.parametros.pais;
  return useMemo(
    () => ({ t, idioma, f, estado, r: resultado, p: estado.parametros, pais: buscarPais(paisId), ej: perfilDePais(paisId) }),
    [t, idioma, f, estado, resultado, paisId],
  );
}

/** Busca la explicación: clave de src/i18n/textos/<idioma>/explicaciones.js u objeto { que, ejemplo, nota }. */
export function buscarExplicacion(explicacion, t) {
  if (!explicacion) return null;
  const crudo = typeof explicacion === 'string' ? t(`explicaciones.${explicacion}`) : explicacion;
  return crudo && typeof crudo === 'object' ? crudo : null;
}

/** Cada parte puede ser un texto o una función que recibe el contexto de ejemplos. */
export function resolverExplicacion(crudo, ctx) {
  const valor = (v) => (typeof v === 'function' ? v(ctx) : v);
  return { que: valor(crudo.que), ejemplo: valor(crudo.ejemplo), nota: valor(crudo.nota) };
}

function textoPlano(nodo) {
  return typeof nodo === 'string' || typeof nodo === 'number' ? String(nodo) : '';
}

export function BotonAyuda({ abierto, controla, nombre, tipo = 'poner', alPulsar }) {
  const { t } = useIdioma();
  const etiqueta = nombre
    ? t(tipo === 'significa' ? 'ayuda.queSignificaEn' : 'ayuda.quePonerEn', { nombre })
    : t('ayuda.verExplicacion');
  return (
    <button
      type="button"
      className="ayuda-boton"
      aria-expanded={abierto}
      aria-controls={controla}
      aria-label={etiqueta}
      title={abierto ? t('ayuda.ocultar') : tipo === 'significa' ? t('ayuda.queSignifica') : t('ayuda.quePongo')}
      onClick={alPulsar}
    >
      <span aria-hidden="true">!</span>
    </button>
  );
}

export function PanelAyuda({ id, datos, abierto, tipo = 'poner' }) {
  const { t } = useIdioma();
  return (
    <div className="ayuda-panel" id={id} hidden={!abierto}>
      {datos.que ? (
        <p>
          <strong>{tipo === 'significa' ? t('ayuda.significa') : t('ayuda.poner')}</strong> {sinCortes(datos.que)}
        </p>
      ) : null}
      {datos.ejemplo ? (
        <p>
          <strong>{t('ayuda.ejemplo')}</strong> {sinCortes(datos.ejemplo)}
        </p>
      ) : null}
      {datos.nota ? <p className="ayuda-nota">{sinCortes(datos.nota)}</p> : null}
    </div>
  );
}

/**
 * Devuelve el botón "!" y su panel para ubicarlos donde haga falta.
 * tipo: 'poner' para datos que llena el usuario, 'significa' para cifras del resultado.
 */
export function useAyuda(explicacion, etiqueta, tipo = 'poner') {
  const { t } = useIdioma();
  const ctx = useContextoEjemplos();
  const { todas, version } = useContext(AyudaContext);
  const [local, setLocal] = useState({ version: -1, abierto: false });
  const panelId = useId();

  const abierto = local.version === version ? local.abierto : todas;
  const crudo = buscarExplicacion(explicacion, t);
  if (!crudo) return { abierto: false, boton: null, panel: null, panelId: undefined };
  // Los textos (con las cifras del país) se arman solo cuando el panel está abierto.
  const datos = abierto ? resolverExplicacion(crudo, ctx) : {};

  return {
    abierto,
    panelId,
    boton: (
      <BotonAyuda
        abierto={abierto}
        controla={panelId}
        nombre={textoPlano(etiqueta)}
        tipo={tipo}
        alPulsar={() => setLocal({ version, abierto: !abierto })}
      />
    ),
    panel: <PanelAyuda id={panelId} datos={datos} abierto={abierto} tipo={tipo} />,
  };
}

/** Título de una sección con su "!" al lado y el panel debajo. */
export function TituloConAyuda({ nivel = 3, id, explicacion, tipo = 'significa', className = '', children }) {
  const ayuda = useAyuda(explicacion, textoPlano(children), tipo);
  const Encabezado = `h${nivel}`;
  return (
    <>
      <div className={`titulo-ayuda ${className}`}>
        <Encabezado id={id}>{children}</Encabezado>
        {ayuda.boton}
      </div>
      {ayuda.panel}
    </>
  );
}

/** Franja que explica el "!" y abre o cierra todas las explicaciones. */
export function BarraAyuda({ children }) {
  const { t } = useIdioma();
  const { todas, alternarTodas } = useAyudaGlobal();
  return (
    <div className="barra-ayuda">
      <p>
        <span className="ayuda-muestra" aria-hidden="true">
          !
        </span>
        <span>{children}</span>
      </p>
      <button type="button" className="boton boton-pequeno" onClick={alternarTodas}>
        {todas ? t('ayuda.cerrarTodas') : t('ayuda.abrirTodas')}
      </button>
    </div>
  );
}
