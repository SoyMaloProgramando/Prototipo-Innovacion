# Diagramas de flujo

Cuatro diagramas, cada uno en tres formatos dentro de `docs/diagramas/`:

- **`.png`**: para insertar en Word o en las diapositivas.
- **`.svg`**: vectorial, se ve nítido a cualquier tamaño. La app muestra estas versiones en las páginas "Cómo calculamos" y "El proyecto".
- **`.mmd`**: el código fuente en Mermaid, por si quieres editarlos.

Símbolos de los diagramas de flujo:

| Símbolo | Significado |
|---|---|
| Óvalo | Inicio o fin |
| Paralelogramo | Datos que entran o salen |
| Rombo | Decisión (sí o no) |
| Rectángulo | Proceso o cálculo |

## 1. Recorrido del usuario

Desde que abre la app hasta que guarda, imprime o comparte la cotización.

![Diagrama de flujo del usuario](diagramas/flujo-usuario.png)

```mermaid
flowchart TD
  A(["Inicio"]) --> B["Página de inicio"]
  B --> C{"¿Prueba un ejemplo?"}
  C -- Sí --> D[/"Elige un producto de ejemplo
y mueve el dominio"/]
  D --> E["Ve el precio en el billete"]
  E --> F
  C -- No --> F["Abre Cotizar"]
  F --> F2["Lee la guía de 5 pasos.
Cada dato tiene un botón ! que dice
qué poner, con un ejemplo"]
  F2 --> G[/"Paso 1. Perfil: carrera, experiencia,
gastos, horas y costos de trabajo"/]
  G --> H["Calcula tarifa mínima
y costo operativo por hora"]
  H --> I[/"Paso 2. Producto: catálogo,
unidades y complejidad"/]
  I --> J["Sugiere las horas del catálogo"]
  J --> K[/"Paso 3. Horas, tarifa por hora,
dominio de 0 a 100 %, revisiones y urgencia"/]
  K --> L[/"Paso 4. Cliente, derechos, costos directos,
utilidad, aportes, retención, IVA y pago"/]
  L --> M["El motor de cálculo
recalcula en vivo"]
  M --> N["Resultado: precio, piso, mercado,
gráficas y recomendaciones"]
  N --> O{"¿Le convence?"}
  O -- No --> P["Ajusta los datos"]
  P --> G
  O -- Sí --> Q{"¿Qué quiere hacer?"}
  Q -- Guardar --> R["Guarda en el historial
(estado de React, sin base de datos)"]
  Q -- Imprimir --> S[/"Cotización para el cliente en PDF"/]
  Q -- Compartir --> T["Enlace de ngrok y código QR"]
  R --> U{"¿Comparar?"}
  U -- Sí --> V["Compara de 2 a 4 cotizaciones
y exporta JSON o CSV"]
  U -- No --> W(["Fin"])
  V --> W
  S --> W
  T --> W
```

## 2. Lógica de cálculo del precio

Lo que hace `src/logica/calculadora.js` cada vez que cambia un dato. Ver el detalle de cada fórmula en [LOGICA_DE_NEGOCIO.md](LOGICA_DE_NEGOCIO.md).

![Diagrama de flujo del cálculo](diagramas/flujo-calculo.png)

```mermaid
flowchart TD
  A(["Inicio del cálculo"]) --> B[/"Datos: perfil, proyecto,
condiciones y parámetros 2026"/]
  B --> C{"¿El usuario escribió
sus propias horas?"}
  C -- Sí --> D["Horas estimadas = las del usuario"]
  C -- No --> E["Horas estimadas = base × factor del nivel
+ unidades × horas por unidad"]
  D --> F
  E --> F["Imprevistos = colchón del nivel
+ 20 % × (1 − dominio)"]
  F --> G["Horas a cobrar = estimadas + imprevistos
+ revisiones + gestión del 10 %"]
  G --> H["Tarifa mínima = gastos × (1 + ahorro)
÷ horas facturables del mes"]
  H --> I["Tarifa ajustada = tarifa deseada × dominio
× experiencia × portafolio × formación"]
  I --> J["Base = horas × tarifa ajustada
+ horas × costo operativo"]
  J --> K["Ajuste: × cliente × mercado
× derechos × urgencia"]
  K --> L["+ utilidad (margen %)"]
  L --> M{"¿Incluir seguridad social?"}
  M -- Sí --> N["÷ (1 − 11,6 %) para cubrir
salud, pensión y riesgos"]
  M -- No --> O
  N --> O["+ costos directos
(dólares × TRM)"]
  O --> P{"¿Compensar la retención?"}
  P -- Sí --> Q["÷ (1 − tasa de retención)"]
  P -- No --> R
  Q --> R["Redondeo comercial hacia arriba"]
  R --> S{"¿Responsable de IVA?"}
  S -- Sí --> T["+ IVA del 19 %"]
  S -- No --> U
  T --> U["Precio sin IVA y total"]
  U --> V["Piso, precio para negociar
y rangos junior, semi-senior y senior"]
  V --> W["Lo que te queda = total − retención − IVA
− aportes − costos − 4 por mil"]
  W --> X["Fecha de entrega en días hábiles
con festivos de Colombia"]
  X --> Y["Chequeos de salud y recomendaciones"]
  Y --> Z[/"Cotización en pantalla"/]
  Z --> FIN(["Fin"])
```

## 3. Arquitectura y flujo de datos

La interfaz despacha acciones al reducer; el nuevo estado pasa por el motor de cálculo y el resultado vuelve a la pantalla. Vite sirve la app y ngrok la publica para los estudiantes.

![Arquitectura de la app](diagramas/arquitectura.png)

```mermaid
flowchart LR
  subgraph UI["Interfaz en React"]
    PAG["Páginas
Inicio, Cotizar, Resultado,
Catálogo, Metodología, Historial"]
    COMP["Componentes
asistente, billete, gráficas"]
  end
  subgraph EST["Estado global sin base de datos"]
    RED["cotizadorReducer
recibe acciones"]
    CTX["CotizadorContext
useReducer + useMemo"]
  end
  subgraph LOG["Lógica de negocio: funciones puras"]
    CALC["calculadora.js"]
    MOD["horas, tarifas, impuestos,
mercado, calendario,
recomendaciones"]
  end
  subgraph DAT["Datos"]
    CAT["Catálogo de 80 productos"]
    PAR["Parámetros de Colombia 2026"]
  end
  PAG --> COMP
  COMP -- "acción" --> RED
  RED -- "nuevo estado" --> CTX
  CTX -- "estado" --> CALC
  CALC --> MOD
  CAT --> CALC
  PAR --> CALC
  CALC -- "resultado" --> CTX
  CTX -- "estado y resultado" --> PAG
  VITE["Servidor de Vite
puerto 5173 o 4173"] --> NG["ngrok
enlace público HTTPS"]
  NG --> ALU["Estudiantes
en su navegador"]
```

## 4. Cronograma

![Cronograma de 8 semanas](diagramas/cronograma.png)

```mermaid
gantt
  title Cronograma de TarifaJusta en 8 semanas
  dateFormat YYYY-MM-DD
  axisFormat Sem. %W
  tickInterval 1week
  weekday monday
  excludes weekends

  section 1. Empatizar
  Encuesta a estudiantes            :e1, 2026-01-05, 3d
  Investigación de tarifas y normas :e2, after e1, 2d

  section 2. Definir
  Problema y usuario                :d1, after e2, 1d
  Catálogo de 80 productos          :d2, after d1, 2d
  Lógica de negocio                 :d3, after d2, 2d

  section 3. Idear y diseñar
  Diagramas de flujo                :i1, after d3, 1d
  Wireframes y prototipo en Figma   :i2, after i1, 3d
  Sistema visual                    :i3, after i2, 1d

  section 4. Prototipar
  Sprint 1, estado y cálculo        :p1, after i3, 5d
  Sprint 2, asistente y catálogo    :p2, after p1, 5d
  Sprint 3, resultado e historial   :p3, after p2, 5d

  section 5. Probar
  Pruebas automáticas               :t1, after p3, 2d
  Prueba con estudiantes por ngrok  :crit, t2, after t1, 2d
  Encuesta SUS y hallazgos          :t3, after t2, 1d

  section 6. Iterar y entregar
  Ajustes                           :r1, after t3, 3d
  Documentación y presentación      :r2, after r1, 2d
```

## Cómo volver a generar las imágenes

Con Node.js instalado, desde la carpeta del proyecto:

```bash
npx -p @mermaid-js/mermaid-cli mmdc -i docs/diagramas/flujo-calculo.mmd -o docs/diagramas/flujo-calculo.png -c docs/diagramas/mermaid-config.json -b white -s 2
```

Cambia el nombre del archivo para los otros diagramas, y usa `.svg` en la salida para la versión vectorial (luego cópiala a `public/diagramas/` para que la app la muestre). También puedes pegar el código en https://mermaid.live para editarlo en el navegador.
