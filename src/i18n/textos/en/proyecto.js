/**
 * "The project" page. Same structure as the Spanish file, whose plan comes from src/datos/planTrabajo.js:
 * phases by id; activities, indicators and risks by their position in the list.
 */
export default {
  titulo: 'The project',
  intro: '{lema}. An innovation prototype built with React, with no database.',
  lema: 'Quote calculator for recent {sistemas} and {multimedia} graduates',
  problema: {
    titulo: 'The problem',
    texto:
      'When they graduate, most Systems and Multimedia engineers get their first jobs without knowing how much to charge. They pick a price at random, copy a friend’s or charge so little that they lose money without noticing: they forget social security contributions, withholding, the hours they cannot bill and the wear on their equipment.',
  },
  propuesta: {
    titulo: 'The proposal',
    texto:
      'A quote calculator that starts from each person’s reality: their expenses, their hours and how well they know the subject. It turns that data into a suggested price, a floor so they do not lose money and a comparison with the market, and it explains where every number comes from.',
  },
  cifras: {
    titulo: 'In numbers',
    productos: 'Products in the catalog',
    deCarrera: '{carrera} products',
    horasPlan: 'Hours in the work plan',
  },
  plan: {
    titulo: 'Work plan',
    intro: 'Design Thinking in phases, with the prototype built in three one-week sprints.',
    semanas: ({ n, lista }) => `${n === 1 ? 'Week' : 'Weeks'} ${lista}`,
    entregable: 'Deliverable: {texto}',
    cronograma: {
      alt: '8-week project schedule',
      pie: 'Eight-week reference schedule.',
    },
    fases: {
      empatizar: {
        nombre: 'Empathize and research',
        actividades: {
          0: 'Survey of students and graduates on how they price their work',
          1: 'Research on 2026 salaries, rates and rules (minimum wage, UVT, social security, withholding)',
        },
        entregable: 'Findings report and list of products to quote',
      },
      definir: {
        nombre: 'Define',
        actividades: {
          0: 'Definition of the problem and the user (recent Systems or Multimedia graduate)',
          1: 'Catalog of 80 products with unit of measure and reference hours',
          2: 'Design of the business logic and the formulas',
        },
        entregable: 'Business logic document and product catalog',
      },
      idear: {
        nombre: 'Ideate and design',
        actividades: {
          0: 'User and calculation flowcharts',
          1: 'Sketches, wireframes and clickable prototype in Figma',
          2: 'Visual system: color, typography and components',
        },
        entregable: 'Clickable prototype and flowcharts',
      },
      prototipar: {
        nombre: 'Prototype in React',
        actividades: {
          0: 'Sprint 1: Vite project, state with useReducer and Context, calculation engine and tests',
          1: 'Sprint 2: 4-step wizard, live summary and catalog',
          2: 'Sprint 3: result with charts, history, printable quote and methodology',
        },
        entregable: 'Working app running locally',
      },
      probar: {
        nombre: 'Test with students',
        actividades: {
          0: 'Unit tests of the calculation and review on phone and computer',
          1: 'Publishing with ngrok and a test session with 15 to 30 students',
          2: 'Usability survey (SUS) and log of findings',
        },
        entregable: 'Validation report with students',
      },
      iterar: {
        nombre: 'Iterate and deliver',
        actividades: {
          0: 'Adjustments based on feedback',
          1: 'Final documentation and presentation',
        },
        entregable: 'Version 1.0, documentation and presentation',
      },
    },
    indicadores: {
      0: 'At least 20 students try the app through the ngrok link.',
      1: 'SUS usability score of 68 or higher.',
      2: 'A new student gets their first quote in under 5 minutes.',
      3: 'At least 8 out of 10 participants understand where the price comes from.',
      4: 'All automated tests of the calculation pass.',
    },
    riesgos: {
      0: {
        riesgo: 'The ngrok link stops working if the PC is turned off or the window is closed.',
        mitigacion: 'Keep the PC on during the test and have COMPARTIR_CON_NGROK.bat at hand.',
      },
      1: {
        riesgo: 'The free ngrok plan has monthly limits on requests and data.',
        mitigacion: 'Use the built version (lighter) and run the tests in short sessions.',
      },
      2: {
        riesgo: 'Reference figures (minimum wage, dollar rate, rates) change over time.',
        mitigacion: 'Editable parameters in the app and sources cited in the methodology.',
      },
      3: {
        riesgo: 'Someone may take the result as tax advice.',
        mitigacion: 'A visible notice: these are reference values; taxes are confirmed with an accountant.',
      },
      4: {
        riesgo: 'Without a database, the data is lost on reload.',
        mitigacion: 'Export and import the history as JSON or CSV and print the quote to PDF.',
      },
    },
  },
  exito: 'How we will know it works',
  riesgos: 'Risks',
  arquitectura: {
    titulo: 'Architecture',
    texto:
      'React keeps everything in a single state (useReducer inside a Context). Every change recalculates the quote with pure functions that do not depend on the interface, so they can be tested on their own.',
    alt: 'Architecture diagram of components, state and logic',
    pie: 'Data flow: from the interface to the reducer, from the state to the calculation engine and back to the screen.',
    estructura: 'Folder structure',
    /** Comments in the folder tree. */
    arbol: {
      docs: 'Work plan, logic, diagrams and ngrok guide',
      public: 'Icon and diagrams shown in the app',
      scripts: 'compartir.mjs (ngrok) and documentation generators',
      datos: 'Catalog ({n} products), 2026 parameters, plan and "!" explanations',
      logica: 'Calculation engine: pure functions and tests',
      estado: 'useReducer + Context: the only state of the app',
      hooks: 'useRuta (navigation), useTema (light or dark) and useAnchoElemento',
      componentes: 'Wizard, result, charts, layout and UI',
      paginas: 'Home, Quote, Result, Catalog, Methodology...',
      estilos: 'Tokens, base, components, pages and print',
      verificar: 'Checks Node, npm and ngrok',
      instalar: 'npm install + tests + build',
      iniciar: 'Development mode at http://localhost:5173',
      configurarNgrok: 'Installs ngrok and saves the authtoken',
      compartirNgrok: 'Builds, serves and opens the ngrok tunnel',
    },
  },
  ngrok: {
    titulo: 'Share with ngrok',
    pasos: [
      'Create a free account at ngrok.com and copy your authtoken from the dashboard.',
      'Install ngrok from the Microsoft Store or with the command winget install ngrok -s msstore.',
      'Save the token once with ngrok config add-authtoken YOUR_TOKEN.',
      'Run COMPARTIR_CON_NGROK.bat: it builds the app, serves it on port 4173 and shows the public link with its QR code.',
      'Share the link. As long as the window stays open, students can get in from anywhere.',
    ],
  },
  creditos: {
    titulo: 'Credits',
    autoria: '{autores}. {programa}, {universidad}, {ciudad}, {anio}. Version {version}.',
    tecnologia: 'Built with React 19, Vite 8, JavaScript and CSS. Tests with Vitest. No database.',
  },
};
