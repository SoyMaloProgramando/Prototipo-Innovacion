# Estructura de carpetas

```
Prototipo Innovacion/
├── README.md                      Qué es, cómo instalarlo y cómo compartirlo
├── CLAUDE.md                      Contexto del proyecto para Claude Code (comandos, reglas y mapa)
├── ABRIR_EN_VSCODE.bat            Abre esta carpeta en Visual Studio Code
├── VERIFICAR_ENTORNO.bat          Revisa Node.js, npm y ngrok y guarda verificacion-entorno.txt
├── INSTALAR.bat                   npm install + npm test + npm run build (registro-instalacion.txt)
├── INICIAR.bat                    Modo desarrollo en http://localhost:5173
├── CONFIGURAR_NGROK.bat           Instala ngrok (opcional) y guarda tu authtoken
├── COMPARTIR_CON_NGROK.bat        Compila, sirve en el puerto 4173 y abre el túnel con QR
├── package.json                   Dependencias y comandos (dev, build, preview, test, compartir, docs)
├── vite.config.js                 Servidor de Vite: red local, puertos y dominios de ngrok permitidos
├── index.html                     Página base donde React monta la app
│
├── docs/                          Documentación del proyecto
│   ├── PLAN_DE_TRABAJO.md         Objetivos, fases, horas, cronograma, riesgos, indicadores y protocolo de prueba
│   ├── LOGICA_DE_NEGOCIO.md       Todas las fórmulas, factores, parámetros 2026 y un ejemplo completo
│   ├── DIAGRAMAS_DE_FLUJO.md      Diagramas del usuario, del cálculo, de la arquitectura y cronograma
│   ├── CATALOGO_DE_PRODUCTOS.md   Los 80 productos con unidades, horas y rangos de mercado
│   ├── PAISES_Y_FUENTES.md        Datos, cálculos y fuentes de los 29 países
│   ├── ESTRUCTURA_DE_CARPETAS.md  Este archivo
│   ├── GUIA_NGROK.md              Paso a paso para compartir la app con los estudiantes
│   └── diagramas/                 .mmd (código Mermaid), .png (para Word) y .svg (vectorial)
│
├── public/                        Archivos que se sirven tal cual
│   ├── favicon.svg
│   └── diagramas/                 Los .svg que muestra la app
│
├── scripts/
│   ├── compartir.mjs              Inicia vite preview + ngrok, lee el enlace público y lo muestra con QR
│   ├── generar-docs.mjs           Regenera el catálogo y el plan de trabajo desde los datos (npm run docs)
│   └── generar-festivos.mjs       Regenera src/datos/festivos.js con date-holidays (npm run festivos)
│
└── src/                           Código de la app
    ├── main.jsx                   Punto de entrada: fuentes, estilos, <IdiomaProvider> y <CotizadorProvider>
    ├── App.jsx                    Estructura general y elección de página según la ruta
    │
    ├── datos/                     Datos fijos (no hay base de datos)
    │   ├── catalogoSistemas.js    6 grupos y 32 productos de Ingeniería de Sistemas
    │   ├── catalogoMultimedia.js  8 grupos y 48 productos de Ingeniería en Multimedia
    │   ├── catalogo.js            Une los catálogos y trae funciones de búsqueda y filtro
    │   ├── parametros.js          Parámetros de Colombia 2026, factores y tarifas de mercado
    │   ├── paises.js              Los 29 países: nombres en 3 idiomas, moneda, región, idioma y ciudad
    │   ├── datosPaises.js         Impuestos, aportes, retenciones, ejemplos y salarios de cada país (generado)
    │   ├── festivos.js            Festivos de 2026 y 2027 de cada país (generado)
    │   ├── explicaciones.js       Acceso directo a las explicaciones en español (ahora en src/i18n/)
    │   ├── planTrabajo.js         Fases, horas, riesgos e indicadores del plan
    │   └── proyecto.js            Nombre, autores, universidad y versión
    │
    ├── logica/                    Lógica de negocio: funciones puras, sin React
    │   ├── calculadora.js         calcularCotizacion(), curvaDominio(), comparativoComplejidad()
    │   ├── horas.js               Horas sugeridas, imprevistos, revisiones, gestión y horas reales
    │   ├── tarifas.js             Tarifa mínima, costo operativo, factores de perfil y tarifa sugerida
    │   ├── impuestos.js           Seguridad social del independiente y retención en la fuente, por país
    │   ├── paises.js              Parámetros, ejemplos, tarifas de mercado y conversión de moneda por país
    │   ├── cambio.js              Tipo de cambio del día: leer, validar y aplicar las tasas de las API
    │   ├── mercado.js             Rangos junior, semi-senior y senior y posición del precio
    │   ├── calendario.js          Pascua, festivos de cada país (Colombia con la Ley Emiliani) y días hábiles
    │   ├── recomendaciones.js     Chequeos de salud y recomendaciones
    │   ├── formato.js             Dinero por moneda e idioma (crearFormato), horas, fechas y redondeo comercial
    │   └── __tests__/             Pruebas con Vitest del catálogo, el calendario, las horas, las tarifas, los países y el cálculo
    │
    ├── i18n/                      Idiomas: español, inglés y portugués
    │   ├── index.js               Lista de idiomas, diccionarios y traducir()
    │   ├── IdiomaContext.jsx      useIdioma() → t(), <T> para textos con negrita y el idioma guardado
    │   ├── useFormato.js          Dinero, números y fechas en la moneda del país y el idioma elegido
    │   ├── catalogo.js            Productos, categorías y costos en el idioma elegido
    │   ├── catalogo/              en.js y pt.js: traducción de los 80 productos
    │   ├── nombres.js             Nombres de retenciones y festivos
    │   ├── resultado.js           Textos de recomendaciones y chequeos
    │   ├── textos/                es/, en/ y pt/: un archivo por sección con las mismas claves
    │   └── __tests__/             Revisa que los tres idiomas tengan las mismas claves y que los "!" se armen bien
    │
    ├── servicios/
    │   └── tipoDeCambio.js        Único pedido a internet: tipo de cambio del día (con respaldo y tiempo máximo)
    │
    ├── estado/                    Estado global de React
    │   ├── estadoInicial.js       Valores de ejemplo de un recién egresado en Tunja (o en la ciudad principal de otro país)
    │   ├── cotizadorReducer.js    Todas las acciones que cambian el estado (useReducer)
    │   ├── CotizadorContext.jsx   Provider: useReducer + useMemo con el resultado calculado
    │   └── __tests__/             Pruebas del reducer
    │
    ├── hooks/
    │   ├── useRuta.js             Navegación por hash (#/cotizar, #/resultado...) sin librerías
    │   ├── useTema.js             Modo claro u oscuro (botón del encabezado)
    │   ├── useTipoDeCambio.js     De dónde sale el dólar que se está usando (del día, guardado o a mano)
    │   └── useAnchoElemento.js    Mide el ancho disponible para las gráficas SVG
    │
    ├── componentes/
    │   ├── estructura/            Encabezado (con el botón de modo claro u oscuro), pie de página y ventana para compartir con QR
    │   ├── ui/                    Campos de formulario, botón "!" con su explicación (Ayuda.jsx), deslizador, interruptores, opciones e íconos
    │   ├── asistente/             Guía de 5 pasos, los 4 pasos, el indicador de pasos y el resumen en vivo
    │   ├── resultado/             Billete con guilloché, desglose, lo que te queda, paneles y hoja imprimible
    │   └── graficas/              Barra segmentada, rango de mercado, curva de dominio, barras y medidor
    │
    ├── paginas/                   Inicio, Cotizar, Resultado, Catálogo, Metodología, Historial, Proyecto
    └── estilos/                   tokens.css (colores y tipografía), base, componentes, páginas e impresión
```

## Archivos que aparecen al usar la app

| Archivo o carpeta | Lo crea | Se puede borrar |
|---|---|---|
| `node_modules/` | `INSTALAR.bat` o `npm install` | Sí, se recrea al instalar |
| `dist/` | `npm run build` | Sí, se recrea al compilar |
| `verificacion-entorno.txt` | `VERIFICAR_ENTORNO.bat` | Sí |
| `registro-instalacion.txt` | `INSTALAR.bat` | Sí |
| `enlace-ngrok.txt` | `COMPARTIR_CON_NGROK.bat` | Sí |

## Cómo fluyen los datos

1. Un componente llama a una acción del contexto, por ejemplo `acciones.actualizarProyecto('especialidad', 80)` o `acciones.cambiarPais('MX')`.
2. `cotizadorReducer` devuelve un estado nuevo (nunca modifica el anterior).
3. `CotizadorContext` recalcula con `useMemo(() => calcularCotizacion(estado))`. Al abrir la página y cada 6 horas también pide el tipo de cambio del día y lo pasa al reducer.
4. Todas las páginas leen `resultado` con `useCotizador()` y se actualizan solas.
5. Los textos salen de `useIdioma()` y las cifras de `useFormato()`: cambiar de idioma no toca el estado ni el cálculo.
