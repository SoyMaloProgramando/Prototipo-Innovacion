# TarifaJusta

Prototipo académico (Ingeniería en Multimedia, Universidad de Boyacá, 2026): cotizador web para que recién egresados de Ingeniería de Sistemas e Ingeniería en Multimedia calculen cuánto cobrar por su trabajo, en los 29 países de habla hispana y portuguesa y en su moneda. La interfaz está en español, inglés y portugués; el código y los nombres, en español.

## Comandos

- `npm install`: instalar dependencias.
- `npm run dev`: servidor de desarrollo en http://localhost:5173 (también `npm start`).
- `npm test`: pruebas de Vitest (lógica, catálogo, calendario y reducer). Deben pasar siempre.
- `npm run build`: compila a `dist/`. `npm run preview` la sirve en http://localhost:4173.
- `npm run compartir`: preview + túnel de ngrok + QR en la terminal (necesita ngrok con authtoken).
- `npm run docs`: regenera `docs/CATALOGO_DE_PRODUCTOS.md` y `docs/PLAN_DE_TRABAJO.md` desde `src/datos/`.
- `npm run festivos`: regenera `src/datos/festivos.js` con `date-holidays` (festivos de 2026 y 2027 de cada país; Colombia usa su propio cálculo con la Ley Emiliani).

## Reglas del proyecto

- **Sin base de datos.** El estado vive en React: `useReducer` dentro de `src/estado/CotizadorContext.jsx`. El historial se exporta e importa en JSON o CSV. No agregar backend, localStorage como fuente de verdad, ni librerías de estado.
- **La lógica de negocio va en `src/logica/` como funciones puras** (sin React, sin DOM). Cada cambio de fórmula lleva su prueba en `src/logica/__tests__/`.
- **Todo cambio de estado pasa por el reducer** (`src/estado/cotizadorReducer.js`), con una acción en `ACCIONES` y su función en `crearAcciones` del contexto.
- **Datos editables en `src/datos/`:** `catalogoSistemas.js` (32 productos), `catalogoMultimedia.js` (48), `parametros.js` (parámetros de Colombia 2026, factores y tarifas de mercado), `paises.js` (los 29 países: nombres, moneda, región, idioma y ciudad), `datosPaises.js` (impuestos, aportes, retenciones, valores de ejemplo y salarios de cada país menos Colombia; generado, con fuentes en `docs/PAISES_Y_FUENTES.md`), `festivos.js` (generado), `planTrabajo.js` y `proyecto.js`.
- **Países:** Colombia es la base. Para otro país, `src/logica/paises.js` arma sus parámetros (`parametrosDePais`), sus valores de ejemplo (`perfilDePais`) y sus tarifas de mercado (`bandasDePais` = las de Colombia × el factor de salarios del país, así no dependen del tipo de cambio). Todo el dinero del estado está en la moneda del país; los costos del catálogo (en pesos colombianos o dólares) se convierten con `aMonedaLocal`. Cambiar de país pasa por la acción `CAMBIAR_PAIS`. Si cambias un dato de un país, anota la fuente en `docs/PAISES_Y_FUENTES.md`.
- **Tipo de cambio en vivo:** `src/servicios/tipoDeCambio.js` es el único pedido a internet de la app (API gratuitas sin clave: TRM oficial de datos.gov.co para el peso colombiano y ExchangeRate-API para las demás, con Currency API de respaldo). `CotizadorContext` lo llama al abrir y cada 6 horas; lo que llega pasa por el reducer (`CAMBIO_PEDIDO`, `CAMBIO_RECIBIDO`, `CAMBIO_FALLIDO`) y se aplica con `aplicarCambio` de `src/logica/cambio.js`, que descarta valores fuera de 1/5 a 5 veces el guardado. Un dólar escrito a mano (`trmFuente: 'manual'`) no se pisa hasta que se pulsa "Usar el de hoy" (`USAR_CAMBIO_DEL_DIA`). Cuba (CUP) se actualiza a mano porque las API publican una tasa vieja. Sin internet, quedan los valores de `src/datos`. No guardar las tasas en `localStorage`.
- **Navegación por hash** (`#/cotizar`, `#/resultado`...) con `src/hooks/useRuta.js`; no hay react-router.
- **Gráficas en SVG hechas a mano** en `src/componentes/graficas/`; no hay librería de gráficas.
- **Estilos:** CSS plano con variables en `src/estilos/tokens.css`. Paleta: blanco, durazno `#FCCE90`, rosa `#FD39A2`, morado `#A43BCB` y turquesa `#84D4D8`. El morado es el color principal (`--acento`); `data-carrera` cambia `--carrera` y `--carrera-vivo` (turquesa Sistemas, rosa Multimedia) en el billete, el catálogo y el detalle del producto. Las series de las gráficas (`--s1` a `--s8`) están validadas para daltonismo: si las cambias, vuelve a validarlas. No usar Tailwind.
- **Modo claro y oscuro:** botón en el encabezado (`src/hooks/useTema.js`), que pone `data-theme` en `<html>`. `index.html` lo aplica antes de pintar para que no parpadee.
- **`localStorage` solo guarda preferencias de la interfaz:** el tema (`tarifajusta-tema`) y el idioma (`tarifajusta-idioma`). Nada de la cotización.
- **Idiomas (`src/i18n/`):** los textos están en `src/i18n/textos/<es|en|pt>/<espacio>.js`, con las mismas claves en los tres idiomas (una prueba lo revisa). En los componentes: `const { t } = useIdioma()` y `t('espacio.clave', valores)`; `<T k="..." />` para textos con `<b>` o `<em>`. Un texto puede ser una cadena con `{marcadores}`, una función (plurales, frases armadas) o una lista. El español es la fuente y el respaldo. Dinero, números y fechas siempre con `const f = useFormato()` (`f.dinero`, `f.horas`, `f.porcentaje`...), nunca con `toLocaleString` ni con las funciones de `formato.js` en la interfaz. El catálogo traducido sale de `useCatalogo()` (`src/i18n/catalogo/en.js` y `pt.js`, por id de producto). Si agregas un texto, agrégalo en los tres idiomas.
- **Explicaciones "!":** cada dato del asistente y cada sección del resultado tiene un botón "!" con qué poner y un ejemplo. Los textos están en `src/i18n/textos/<idioma>/explicaciones.js` y pueden ser funciones que reciben `{ f, ej, p, r, pais, idioma }` para que el ejemplo salga en la moneda y con las cifras del país; el botón y el panel están en `src/componentes/ui/Ayuda.jsx`. Para agregar uno, pasa `explicacion="clave"` al campo (todos los de `Campos.jsx` lo aceptan) o usa `TituloConAyuda`. Si cambias una fórmula o un factor, revisa que los ejemplos sigan dando los mismos números.
- **Textos de la interfaz:** español de Colombia, inglés de Estados Unidos y portugués de Brasil (con vocabulario neutro); tuteo o "você", frases cortas, sin mayúsculas sostenidas.
- `vite.config.js` permite los dominios de ngrok en `server.allowedHosts` y `preview.allowedHosts`; no quitarlos.
- Los `.bat` deben quedar con finales de línea CRLF.

## Mapa rápido

- `src/logica/calculadora.js`: `calcularCotizacion(estado)` arma todo el resultado; `curvaDominio` y `comparativoComplejidad` alimentan las gráficas.
- `src/logica/horas.js`, `tarifas.js`, `impuestos.js` (aportes y retenciones por país), `mercado.js`, `paises.js` (datos por país), `calendario.js` (festivos de cada país), `recomendaciones.js` (devuelven ids y valores; los textos están en el espacio `recomendaciones`), `formato.js` (`crearFormato` y redondeo por moneda).
- `src/logica/cambio.js` (leer y validar las tasas del día) y `src/servicios/tipoDeCambio.js` (el pedido a internet, con respaldo y tiempo máximo); `src/hooks/useTipoDeCambio.js` dice en la interfaz de dónde sale el dólar.
- `src/i18n/`: idiomas (`index.js`, `IdiomaContext.jsx`), formato por idioma y país (`useFormato.js`), catálogo traducido (`catalogo.js`), nombres de retenciones y festivos (`nombres.js`) y textos del resultado (`resultado.js`).
- `src/componentes/asistente/`: los 4 pasos (perfil, producto, horas/tarifa/dominio, cliente y condiciones), la guía de uso (`GuiaCotizar.jsx`) y el encabezado de cada paso (`CabezaPaso.jsx`).
- `src/componentes/resultado/`: billete con guilloché, desglose, lo que te queda, paneles y cotización imprimible.
- `src/paginas/`: Inicio, Cotizar, Resultado, Catalogo, Metodologia, Historial, Proyecto.
- `docs/`: plan de trabajo, lógica de negocio, diagramas de flujo (Mermaid en `docs/diagramas/*.mmd`), estructura, catálogo, países y fuentes, y guía de ngrok.
