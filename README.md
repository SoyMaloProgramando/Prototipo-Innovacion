# TarifaJusta

**¿Cuánto cobro por esto?** Cotizador web para recién egresados de **Ingeniería de Sistemas** e **Ingeniería en Multimedia**. Con tus horas, lo que quieres ganar por hora y qué tanto dominas el tema (de 0 a 100 %), calcula un precio sugerido, tu piso para no perder y cómo se compara con el mercado de tu país. Explica de dónde sale cada valor.

Prototipo académico de Ingeniería en Multimedia, Universidad de Boyacá, Tunja, 2026.

- 80 productos: 32 de Sistemas y 48 de Multimedia, cada uno con su unidad de medida y horas de referencia.
- React 19 + Vite 8. Estado global con `useReducer` y Context. **Sin base de datos.**
- **29 países de habla hispana y portuguesa**, cada uno en su moneda: salario mínimo, tipo de cambio, impuesto a la venta, aportes de independiente, retenciones, impuesto a las transacciones, festivos y tarifas de mercado de 2026. Fuentes en [docs/PAISES_Y_FUENTES.md](docs/PAISES_Y_FUENTES.md).
- **Dólar y monedas al día:** al abrir la app (y cada 6 horas) consulta el tipo de cambio del día en servicios gratuitos: la TRM oficial para Colombia y ExchangeRate-API para las demás monedas. Sin internet sigue con los valores guardados y lo avisa en "Cómo calculamos", donde también se puede escribir a mano.
- **Tres idiomas:** español, inglés y portugués, con selector en el encabezado. Se traduce todo: pasos, catálogo, explicaciones, resultado y la cotización para el cliente.
- Se comparte con los estudiantes por un enlace de **ngrok**.
- Paleta blanco, durazno, rosa, morado y turquesa, con **modo claro y modo oscuro** (botón en el encabezado).
- Un botón **!** junto a cada dato explica qué poner y da un ejemplo.

## Empezar en Windows (doble clic)

| Archivo | Para qué |
|---|---|
| `VERIFICAR_ENTORNO.bat` | Revisa si tienes Node.js, npm y ngrok |
| `INSTALAR.bat` | Instala dependencias, corre las pruebas y compila. Solo la primera vez |
| `INICIAR.bat` | Abre la app en `http://localhost:5173` (modo desarrollo) |
| `CONFIGURAR_NGROK.bat` | Instala ngrok y guarda tu authtoken. Solo la primera vez |
| `COMPARTIR_CON_NGROK.bat` | Publica la app con un enlace y un código QR para los estudiantes |

Requisitos: Node.js 20.19 o superior (recomendado 22 LTS o 24 LTS) y, para compartir, una cuenta gratis de ngrok. Detalle en [docs/GUIA_NGROK.md](docs/GUIA_NGROK.md).

## Abrir en Visual Studio Code

1. Doble clic en `ABRIR_EN_VSCODE.bat` (o en VS Code: Archivo, Abrir carpeta, `Prototipo Innovacion`).
2. Abre la terminal con **Ctrl + `** (en teclado en español, **Ctrl + ñ**) o desde el menú Terminal, Nueva terminal.
3. La primera vez escribe `npm install`. Después, cada vez que quieras usar la app: `npm run dev` y Ctrl + clic en `http://localhost:5173`.
4. Para detener el servidor: **Ctrl + C** en la terminal.

Si PowerShell responde que **no se puede cargar npm.ps1 porque la ejecución de scripts está deshabilitada**, elige otra terminal en la flecha junto al **+** del panel (**Command Prompt** o **Símbolo del sistema**) y vuelve a escribir el comando. Si prefieres seguir en PowerShell, puedes permitir los scripts para tu usuario con `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

El archivo `CLAUDE.md` le explica el proyecto a Claude Code, para que puedas pedirle cambios desde VS Code.

## Comandos

```bash
npm install          # dependencias
npm run dev          # desarrollo en http://localhost:5173 (también: npm start)
npm test             # pruebas de la lógica de negocio (Vitest)
npm run build        # versión de producción en dist/
npm run preview      # sirve dist/ en http://localhost:4173
npm run compartir    # preview + túnel de ngrok + QR en la terminal
npm run docs         # regenera el catálogo y el plan de trabajo en docs/
npm run festivos     # regenera src/datos/festivos.js (festivos de los 29 países, 2026 y 2027)
```

Si ya tenías el proyecto instalado, vuelve a correr `npm install` una vez: se agregó `date-holidays`, que usa `npm run festivos`.

## Qué hay en la app

| Página | Contenido |
|---|---|
| Inicio | Demo en vivo: elige un producto, mueve el dominio y mira el precio |
| Cotizar | Guía de uso en 5 pasos y asistente de 4 pasos (perfil, producto, horas/tarifa/dominio, cliente y condiciones) con el precio actualizado en vivo. Cada dato tiene un botón **!** que explica qué poner, con un ejemplo |
| Resultado | Precio, piso y precio para negociar; salud de la cotización; recomendaciones; desglose; lo que te queda; mercado; curva por dominio; complejidad; horas; entrega con festivos; forma de pago; cotización imprimible para el cliente |
| Catálogo | Los 80 productos con filtros, horas por nivel y rango junior del país elegido |
| Cómo calculamos | Fórmula paso a paso con tu ejemplo, factores, tarifas de mercado del país, sus datos editables (con qué tan confiables son), diagramas, glosario y fuentes |
| Historial | Cotizaciones guardadas en memoria, comparación de 2 a 4 y exportación a JSON o CSV |
| El proyecto | Problema, plan de trabajo, cronograma, arquitectura y créditos |

## Documentación

- [Plan de trabajo](docs/PLAN_DE_TRABAJO.md)
- [Lógica de negocio](docs/LOGICA_DE_NEGOCIO.md)
- [Diagramas de flujo](docs/DIAGRAMAS_DE_FLUJO.md)
- [Estructura de carpetas](docs/ESTRUCTURA_DE_CARPETAS.md)
- [Catálogo de productos](docs/CATALOGO_DE_PRODUCTOS.md)
- [Países, datos y fuentes](docs/PAISES_Y_FUENTES.md)
- [Guía de ngrok](docs/GUIA_NGROK.md)

## Aviso

Los valores son de referencia para 2026 y no reemplazan la asesoría de un contador. Los datos de algunos países son estimaciones (la app muestra qué tan confiables son en "Cómo calculamos"). Las tarifas de mercado son estimaciones del proyecto: las de Colombia están en `src/datos/parametros.js` y las de los demás países salen de ellas con los salarios de `src/datos/datosPaises.js`.
