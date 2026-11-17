/**
 * Plan de trabajo del prototipo. Lo usan la página "El proyecto" y el script
 * que genera docs/PLAN_DE_TRABAJO.md, así ambos dicen lo mismo.
 * Metodología: Design Thinking por fases, con el prototipo construido en sprints de una semana.
 */
export const FASES = [
  {
    id: 'empatizar',
    nombre: 'Empatizar e investigar',
    semanas: [1],
    actividades: [
      { nombre: 'Encuesta a estudiantes y egresados sobre cómo ponen precio a su trabajo', horas: 10 },
      { nombre: 'Investigación de salarios, tarifas y normas de 2026 (salario mínimo, UVT, aportes, retención)', horas: 8 },
    ],
    entregable: 'Informe de hallazgos y lista de productos a cotizar',
  },
  {
    id: 'definir',
    nombre: 'Definir',
    semanas: [2],
    actividades: [
      { nombre: 'Definición del problema y del usuario (recién egresado de Sistemas o Multimedia)', horas: 4 },
      { nombre: 'Catálogo de 80 productos con unidad de medida y horas de referencia', horas: 10 },
      { nombre: 'Diseño de la lógica de negocio y de las fórmulas', horas: 8 },
    ],
    entregable: 'Documento de lógica de negocio y catálogo de productos',
  },
  {
    id: 'idear',
    nombre: 'Idear y diseñar',
    semanas: [3],
    actividades: [
      { nombre: 'Diagramas de flujo del usuario y del cálculo', horas: 4 },
      { nombre: 'Bocetos, wireframes y prototipo navegable en Figma', horas: 10 },
      { nombre: 'Sistema visual: color, tipografía y componentes', horas: 6 },
    ],
    entregable: 'Prototipo navegable y diagramas de flujo',
  },
  {
    id: 'prototipar',
    nombre: 'Prototipar en React',
    semanas: [4, 5, 6],
    actividades: [
      { nombre: 'Sprint 1: proyecto con Vite, estado con useReducer y Context, motor de cálculo y pruebas', horas: 16 },
      { nombre: 'Sprint 2: asistente de 4 pasos, resumen en vivo y catálogo', horas: 18 },
      { nombre: 'Sprint 3: resultado con gráficas, historial, cotización imprimible y metodología', horas: 18 },
    ],
    entregable: 'Aplicación funcional en local',
  },
  {
    id: 'probar',
    nombre: 'Probar con estudiantes',
    semanas: [7],
    actividades: [
      { nombre: 'Pruebas unitarias del cálculo y revisión en celular y computador', horas: 6 },
      { nombre: 'Publicación con ngrok y sesión de prueba con 15 a 30 estudiantes', horas: 6 },
      { nombre: 'Encuesta de usabilidad (SUS) y registro de hallazgos', horas: 4 },
    ],
    entregable: 'Informe de validación con estudiantes',
  },
  {
    id: 'iterar',
    nombre: 'Iterar y entregar',
    semanas: [8],
    actividades: [
      { nombre: 'Ajustes según la retroalimentación', horas: 8 },
      { nombre: 'Documentación final y presentación', horas: 6 },
    ],
    entregable: 'Versión 1.0, documentación y presentación',
  },
];

export const INDICADORES = [
  'Al menos 20 estudiantes prueban la app por el enlace de ngrok.',
  'Puntaje de usabilidad SUS de 68 o más.',
  'Un estudiante nuevo obtiene su primera cotización en menos de 5 minutos.',
  'Al menos 8 de cada 10 participantes entienden de dónde sale el precio.',
  'Todas las pruebas automáticas del cálculo pasan.',
];

export const RIESGOS = [
  {
    riesgo: 'El enlace de ngrok deja de funcionar si el PC se apaga o se cierra la ventana.',
    mitigacion: 'Dejar el PC encendido durante la prueba y tener a mano COMPARTIR_CON_NGROK.bat.',
  },
  {
    riesgo: 'El plan gratuito de ngrok tiene límites de peticiones y de datos al mes.',
    mitigacion: 'Usar la versión compilada (más liviana) y hacer las pruebas en sesiones acotadas.',
  },
  {
    riesgo: 'Las cifras de referencia (salario mínimo, dólar, tarifas) cambian con el tiempo.',
    mitigacion: 'Parámetros editables en la app y fuentes citadas en la metodología.',
  },
  {
    riesgo: 'Que alguien tome el resultado como asesoría tributaria.',
    mitigacion: 'Aviso visible: son valores de referencia; los impuestos se confirman con un contador.',
  },
  {
    riesgo: 'Sin base de datos, los datos se pierden al recargar.',
    mitigacion: 'Exportar e importar el historial en JSON o CSV e imprimir la cotización en PDF.',
  },
];

export const TOTAL_HORAS_PLAN = FASES.reduce((total, f) => total + f.actividades.reduce((s, a) => s + a.horas, 0), 0);
