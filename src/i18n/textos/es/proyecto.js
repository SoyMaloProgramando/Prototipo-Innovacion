/**
 * Página "El proyecto".
 * El lema y el plan de trabajo en español salen de src/datos/proyecto.js y src/datos/planTrabajo.js
 * (que también generan docs/PLAN_DE_TRABAJO.md): edítalos allí. Inglés y portugués traen la misma
 * estructura: fases por id; actividades, indicadores y riesgos por su posición en la lista.
 */
import { FASES, INDICADORES, RIESGOS } from '../../../datos/planTrabajo.js';
import { PROYECTO } from '../../../datos/proyecto.js';

/** ['a', 'b'] → { 0: 'a', 1: 'b' }, para que la revisión de claves compare cada elemento. */
const porPosicion = (lista) => Object.fromEntries(lista.map((valor, i) => [i, valor]));

export default {
  titulo: 'El proyecto',
  intro: '{lema}. Prototipo de innovación hecho con React, sin base de datos.',
  lema: PROYECTO.lema,
  problema: {
    titulo: 'El problema',
    texto:
      'Al graduarse, la mayoría de ingenieros de Sistemas y de Multimedia recibe sus primeros encargos sin saber cuánto cobrar. Ponen un precio al azar, copian el de un amigo o cobran tan poco que pierden dinero sin darse cuenta: olvidan los aportes a seguridad social, la retención, las horas que no se cobran y el desgaste del equipo.',
  },
  propuesta: {
    titulo: 'La propuesta',
    texto:
      'Un cotizador que parte de la realidad de cada uno: sus gastos, sus horas y qué tanto domina el tema. Convierte esos datos en un precio sugerido, un piso para no perder y una comparación con el mercado, y explica de dónde sale cada valor.',
  },
  cifras: {
    titulo: 'En cifras',
    productos: 'Productos en el catálogo',
    deCarrera: 'De {carrera}',
    horasPlan: 'Horas del plan de trabajo',
  },
  plan: {
    titulo: 'Plan de trabajo',
    intro: 'Design Thinking por fases, con el prototipo construido en tres sprints de una semana.',
    semanas: ({ n, lista }) => `${n === 1 ? 'Semana' : 'Semanas'} ${lista}`,
    entregable: 'Entregable: {texto}',
    cronograma: {
      alt: 'Cronograma de 8 semanas del proyecto',
      pie: 'Cronograma de referencia de ocho semanas.',
    },
    fases: Object.fromEntries(
      FASES.map((fase) => [
        fase.id,
        { nombre: fase.nombre, actividades: porPosicion(fase.actividades.map((a) => a.nombre)), entregable: fase.entregable },
      ]),
    ),
    indicadores: porPosicion(INDICADORES),
    riesgos: porPosicion(RIESGOS.map(({ riesgo, mitigacion }) => ({ riesgo, mitigacion }))),
  },
  exito: 'Cómo sabremos que funciona',
  riesgos: 'Riesgos',
  arquitectura: {
    titulo: 'Arquitectura',
    texto:
      'React guarda todo en un solo estado (useReducer dentro de un Context). Cada cambio recalcula la cotización con funciones puras que no dependen de la interfaz, y por eso se pueden probar solas.',
    alt: 'Diagrama de la arquitectura de componentes, estado y lógica',
    pie: 'Flujo de datos: de la interfaz al reducer, del estado al motor de cálculo y de vuelta a la pantalla.',
    estructura: 'Estructura de carpetas',
    /** Comentarios del árbol de carpetas. */
    arbol: {
      docs: 'Plan de trabajo, lógica, diagramas y guía de ngrok',
      public: 'Ícono y diagramas que muestra la app',
      scripts: 'compartir.mjs (ngrok) y generadores de documentación',
      datos: 'Catálogo ({n} productos), parámetros 2026, plan y explicaciones "!"',
      logica: 'Motor de cálculo: funciones puras y pruebas',
      estado: 'useReducer + Context: el único estado de la app',
      hooks: 'useRuta (navegación), useTema (claro u oscuro) y useAnchoElemento',
      componentes: 'Asistente, resultado, gráficas, estructura y UI',
      paginas: 'Inicio, Cotizar, Resultado, Catálogo, Metodología...',
      estilos: 'Tokens, base, componentes, páginas e impresión',
      verificar: 'Revisa Node, npm y ngrok',
      instalar: 'npm install + pruebas + compilación',
      iniciar: 'Modo desarrollo en http://localhost:5173',
      configurarNgrok: 'Instala ngrok y guarda el authtoken',
      compartirNgrok: 'Compila, sirve y abre el túnel de ngrok',
    },
  },
  ngrok: {
    titulo: 'Compartir con ngrok',
    pasos: [
      'Crea una cuenta gratis en ngrok.com y copia tu authtoken del panel.',
      'Instala ngrok desde la Microsoft Store o con el comando winget install ngrok -s msstore.',
      'Guarda el token una sola vez con ngrok config add-authtoken TU_TOKEN.',
      'Ejecuta COMPARTIR_CON_NGROK.bat: compila la app, la sirve en el puerto 4173 y muestra el enlace público con su QR.',
      'Comparte el enlace. Mientras la ventana siga abierta, los estudiantes pueden entrar desde cualquier lugar.',
    ],
  },
  creditos: {
    titulo: 'Créditos',
    autoria: '{autores}. {programa}, {universidad}, {ciudad}, {anio}. Versión {version}.',
    tecnologia: 'Hecho con React 19, Vite 8, JavaScript y CSS. Pruebas con Vitest. Sin base de datos.',
  },
};
