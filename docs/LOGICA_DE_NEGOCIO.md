# Lógica de negocio

Cómo calcula TarifaJusta el precio de un trabajo. Todo el cálculo vive en `src/logica/` como **funciones puras**: reciben el estado de React y devuelven la cotización, sin guardar nada ni tocar la interfaz. Por eso se pueden probar solas (`npm test`).

| Archivo | Qué hace |
|---|---|
| `calculadora.js` | Orquesta los pasos y arma el resultado completo |
| `horas.js` | Horas sugeridas del catálogo, imprevistos, revisiones, gestión, horas reales |
| `tarifas.js` | Horas facturables del mes, tarifa mínima, costo operativo, factores de perfil, tarifa sugerida |
| `impuestos.js` | Seguridad social del independiente y retención en la fuente, según el país |
| `paises.js` | Parámetros, valores de ejemplo, tarifas de mercado y conversión de moneda de cada país |
| `cambio.js` | Tipo de cambio del día: lee las respuestas de las API, descarta valores raros y los aplica a los parámetros |
| `mercado.js` | Rangos junior, semi-senior y senior y ubicación del precio |
| `calendario.js` | Festivos de cada país (Colombia con la Ley Emiliani y Pascua; los demás desde `src/datos/festivos.js`) y días hábiles |
| `recomendaciones.js` | Chequeos de salud y consejos en lenguaje sencillo |
| `formato.js` | Dinero en la moneda del país y el idioma elegido (`crearFormato`), horas, porcentajes, fechas y redondeo comercial por moneda |

## 1. Datos de entrada

| Paso del asistente | Datos |
|---|---|
| 1. Tu perfil | País, carrera, proyectos parecidos hechos, portafolio, formación extra, gastos personales del mes, meta de ahorro, horas de trabajo a la semana, % de ese tiempo que se puede cobrar, internet, energía, software, otros gastos, valor del computador y años de vida útil |
| 2. Producto | Producto del catálogo, cantidad de unidades y complejidad (básico, intermedio, avanzado) |
| 3. Horas, tarifa y dominio | Horas aproximadas, tarifa deseada por hora, **especialidad o dominio del 0 al 100 %**, rondas de revisión, urgencia, horas al día y fecha de inicio |
| 4. Cliente y condiciones | Tipo de cliente, mercado, derechos que recibe, costos directos (en la moneda del país o en dólares), margen de utilidad, imprevistos automáticos o manuales, seguridad social, impuesto a la venta (IVA, IGV, ITBIS...), retención, impuesto a las transacciones (como el 4 por mil), forma de pago y vigencia |

## 2. Fórmulas

### 2.1 Horas

```
horas sugeridas  = horas base × factor del nivel + unidades × horas por unidad del nivel
                   (factor del nivel: básico 0,75 · intermedio 1 · avanzado 1,4)

imprevistos %    = imprevistos del nivel + 20 % × (1 − dominio)
                   (imprevistos del nivel: básico 5 % · intermedio 10 % · avanzado 15 %)

horas por ronda  = máximo(1 h, 6 % de las horas estimadas)
gestión          = 10 % de las horas estimadas

HORAS A COBRAR   = estimadas + estimadas × imprevistos % + rondas × horas por ronda + gestión

horas reales     = estimadas × (1 + imprevistos del nivel)
                   + estimadas × 50 % × (1 − dominio)        ← curva de aprendizaje
                   + revisiones + gestión

horas no cobradas = horas reales − horas a cobrar  (si es positivo)
```

Saber poco del tema te hace trabajar hasta un 50 % más. El cálculo cobra 20 de esos 50 puntos como imprevistos y el resto lo asumes tú como inversión en aprendizaje: el cliente no debe pagar todo tu aprendizaje, pero tampoco lo regalas entero.

### 2.2 Tarifa

```
horas facturables del mes = horas por semana × 4,33 × % que se puede cobrar
tarifa mínima             = gastos personales × (1 + ahorro %) ÷ horas facturables del mes
costo operativo por hora  = (internet + energía + software + otros + valor del equipo ÷ meses de vida útil)
                            ÷ horas facturables del mes

factor de dominio  = 0,70 + 0,60 × dominio            (0 % → ×0,70 · 50 % → ×1,00 · 100 % → ×1,30)
factor de perfil   = dominio × experiencia × portafolio × formación

TARIFA AJUSTADA    = tarifa deseada × factor de perfil
```

**Tarifa sugerida** (para quien no sabe cuánto pedir): se toma el punto medio del rango junior del área, se le quitan los aportes, la utilidad y el costo operativo para dejar solo lo que te queda a ti, y nunca baja de tu tarifa mínima. Se redondea hacia arriba a 500.

### 2.3 Precio

```
tu trabajo           = horas a cobrar × tarifa ajustada
costos operativos    = horas a cobrar × costo operativo por hora
ajuste comercial     = (tu trabajo + costos operativos) × (cliente × mercado × derechos × urgencia − 1)
utilidad             = subtotal × margen %
seguridad social     = antes de aportes × t ÷ (1 − t),  con t = 40 % × (12,5 % + 16 % + 0,522 %) = 11,61 %
costos directos      = suma de costos activos (los de dólares × TRM)
compensación         = (opcional) precio × r ÷ (1 − r),  con r = tasa de retención
redondeo comercial   = hacia arriba a 1.000, 5.000 o 10.000 según el tamaño
IVA                  = 19 % si eres responsable de IVA

PRECIO SIN IVA = tu trabajo + costos operativos + ajuste + utilidad + seguridad social
                 + costos directos + compensación + redondeo
TOTAL          = precio sin IVA + IVA
```

La seguridad social se calcula "hacia adentro": el precio se divide entre (1 − t) para que, después de pagar salud, pensión y riesgos sobre el 40 % de lo que cobras, te quede lo que habías calculado.

### 2.4 Rango de precio

```
PISO           = horas a cobrar × (tarifa mínima + costo operativo) ÷ (1 − t) + costos directos
                 (lo mínimo para no perder: sin utilidad ni ajustes comerciales)
PARA NEGOCIAR  = precio sin IVA × 1,15   (empezar alto deja espacio para un descuento)
```

### 2.5 Mercado

```
horas de referencia = horas del catálogo × (1 + imprevistos del nivel + 10 % de gestión) + 2 rondas de revisión
rango de un nivel   = horas de referencia × [tarifa mínima, tarifa máxima del nivel] + costos directos
tarifa todo incluido = precio del servicio ÷ horas a cobrar
```

El precio se ubica como: por debajo del rango junior, dentro del junior, entre junior y semi-senior, dentro del semi-senior, entre semi-senior y senior, dentro del senior o por encima del senior.

### 2.6 Lo que te queda

```
te consignan = total − retención en la fuente
te queda     = te consignan − IVA para la DIAN − seguridad social − costos directos − costos operativos − 4 por mil
```

La retención es un anticipo del impuesto de renta. Si declaras renta, se descuenta de lo que debas pagar.

### 2.7 Entrega y pagos

- **Días hábiles** = horas reales ÷ (horas al día × ritmo de la urgencia). Ritmo: normal ×1, prioritaria ×1,25, urgente ×1,5.
- La fecha de entrega salta sábados, domingos y los 18 festivos de Colombia, calculados para cualquier año con la fecha de Pascua y la Ley Emiliani.
- **Cuotas**: 50/50, 40/30/30, 30/40/30 o todo al final. La última cuota absorbe el redondeo para que la suma sea exacta.

### 2.8 Salud de la cotización

Siete chequeos, cada uno vale lo mismo (puntaje de 0 a 100):

1. El precio cubre tu piso.
2. No queda por debajo del rango junior.
3. Pides al menos 30 % de anticipo.
4. Las revisiones incluidas están entre 1 y 3.
5. El precio incluye la seguridad social.
6. Dejas al menos 10 % de utilidad.
7. Tu ganancia por hora real supera tu tarifa mínima.

## 3. Factores y parámetros

| Factor | Valores |
|---|---|
| Dominio (0 a 100 %) | ×0,70 a ×1,30, lineal |
| Proyectos parecidos | ninguno ×0,95 · 1 o 2 ×1,00 · 3 a 5 ×1,05 · 6 o más ×1,10 |
| Portafolio | no tengo ×0,95 · básico ×1,00 · sólido ×1,06 |
| Formación extra | solo la carrera ×1,00 · cursos ×1,03 · certificación ×1,06 |
| Tipo de cliente | persona natural ×0,90 · emprendimiento ×0,95 · pyme ×1,00 · empresa grande ×1,25 · entidad pública ×1,15 · fundación u ONG ×0,90 |
| Mercado | local o regional ×0,95 · nacional ×1,00 · internacional ×1,50 |
| Derechos | licencia de uso ×1,00 · uso comercial amplio ×1,15 · cesión total o exclusividad ×1,40 |
| Urgencia | normal ×1,00 · prioritaria ×1,20 · urgente ×1,45 |

| Parámetro 2026 | Valor | Fuente |
|---|---|---|
| Salario mínimo | $ 1.750.905 | Decreto 1469 de 2025 |
| Auxilio de transporte | $ 249.095 | Decreto 1470 de 2025 |
| UVT | $ 52.374 | Resolución DIAN 000238 de 2025 |
| Dólar (TRM) de referencia | $ 3.183 | TRM del 31 de octubre de 2026 (Superintendencia Financiera); se edita en la app |
| IVA | 19 % | Estatuto Tributario |
| IBC de independiente | 40 % del ingreso | Decreto 1601 de 2022 y guía de la UGPP para independientes |
| Salud, pensión, ARL nivel I | 12,5 %, 16 %, 0,522 % | Aporte mínimo 2026 sobre un salario mínimo: $ 508.148 |
| Retención: software y diseño web | 3,5 % | Tabla de retención 2026 |
| Retención: servicios | 4 % o 6 % (base desde 2 UVT) | Decreto 572 de 2025 |
| Retención: honorarios | 10 % u 11 % | Estatuto Tributario (art. 392) y DUR 1625 de 2016 |

### Tarifas de referencia del mercado (COP por hora, todo incluido)

| Área | Junior | Semi-senior | Senior |
|---|---|---|---|
| Desarrollo de software | 30.000 a 50.000 | 55.000 a 90.000 | 95.000 a 160.000 |
| Datos y bases de datos | 30.000 a 50.000 | 55.000 a 95.000 | 100.000 a 170.000 |
| Infraestructura, redes y soporte | 22.000 a 38.000 | 40.000 a 65.000 | 70.000 a 110.000 |
| Calidad, seguridad y consultoría | 30.000 a 50.000 | 55.000 a 90.000 | 95.000 a 160.000 |
| Diseño gráfico y editorial | 20.000 a 35.000 | 38.000 a 60.000 | 65.000 a 110.000 |
| UX/UI y web | 28.000 a 45.000 | 50.000 a 80.000 | 85.000 a 140.000 |
| Animación, motion y 3D | 25.000 a 42.000 | 45.000 a 75.000 | 80.000 a 130.000 |
| Audiovisual, foto y audio | 22.000 a 38.000 | 40.000 a 68.000 | 72.000 a 120.000 |
| Interactivos e inmersivos | 28.000 a 48.000 | 50.000 a 85.000 | 90.000 a 150.000 |

**De dónde salen.** Se parte de salarios mensuales de mercado (por ejemplo, un diseñador junior gana cerca de $ 2.000.000 y un desarrollador de software tiene una mediana cercana a $ 4.500.000), se multiplican por ~1,5 para cubrir lo que un independiente paga por su cuenta (aportes, vacaciones, equipo) y se dividen entre unas 110 horas facturables al mes. Son estimaciones del proyecto: ajústalas en `src/datos/parametros.js` cuando tengas datos de tu propia encuesta.

## 4. Países, monedas e idiomas

La app cubre los 29 países de habla hispana y portuguesa. Al elegir el país en el paso 1, todo se calcula en su moneda:

- **Parámetros** (`parametrosDePais`): salario mínimo, tipo de cambio, impuesto a la venta con su nombre local, aportes, retenciones e impuesto a las transacciones. Colombia detalla sus aportes (40 % × salud, pensión y ARL); los demás países usan una **tasa efectiva** sobre lo que se factura (`aportesEfectivos`) y, si existe, la cuota mínima mensual de su régimen.
- **Impuesto a la venta por defecto:** en los países donde un independiente que empieza normalmente lo cobra (España, México, Uruguay, Ecuador...), el interruptor viene activado.
- **Retención automática:** la general del país cuando el cliente es una empresa (por ejemplo, 7 % de IRPF para nuevos profesionales en España o 15,25 % de las boletas en Chile). Las personas y los clientes del exterior no retienen.
- **Tarifas de mercado** (`bandasDePais`): las de Colombia multiplicadas por el factor de salarios del país (media geométrica de *salario del país ÷ salario de Colombia* en los tres niveles, en moneda local). Tecnología usa sueldos de desarrolladores y las áreas creativas, de diseñadores. No dependen del tipo de cambio.
- **Valores de ejemplo** (`perfilDePais`): gastos y costos de trabajo de un recién egresado en la ciudad principal, en moneda local.
- **Costos del catálogo:** están en pesos colombianos o dólares y pasan a la moneda local con el tipo de cambio (`aMonedaLocal`).
- **Tipo de cambio del día:** al abrir la app y cada 6 horas se consulta `src/servicios/tipoDeCambio.js`: la TRM oficial de la Superintendencia Financiera (datos.gov.co) para el peso colombiano y ExchangeRate-API (o Currency API si falla) para las demás monedas. Una tasa se acepta si está entre 1/5 y 5 veces la guardada. Actualiza el dólar del país (`trm`) y el peso colombiano que convierte el catálogo (`copPorDolar`). Si la persona escribe el dólar a mano, se respeta su valor. Sin internet, se usan los valores guardados en `src/datos`. Cuba se actualiza a mano: las API publican la tasa antigua de 24 CUP y la app usa la oficial flotante.
- **Redondeo:** el precio se redondea hacia arriba con pasos cómodos en cada moneda (en pesos colombianos, a 1.000, 5.000 o 10.000; en euros o dólares, a 1, 5 o 10).
- **Festivos:** los de cada país para calcular la fecha de entrega.

Datos, cálculos y fuentes de cada país: [PAISES_Y_FUENTES.md](PAISES_Y_FUENTES.md). Los textos están en español, inglés y portugués (`src/i18n/`); el idioma solo cambia los textos y el formato de los números, no el cálculo.

## 5. Ejemplo completo

Logotipo, 3 propuestas, nivel intermedio, 50 % de dominio, cliente pyme de Boyacá, perfil de ejemplo (gastos de $ 1.610.000, 10 % de ahorro, 40 h a la semana, 60 % facturable).

| Paso | Operación | Resultado |
|---|---|---|
| Horas sugeridas | 4 h + 3 × 5 h | 19 h |
| Imprevistos | 19 h × (10 % + 20 % × 0,5) = 19 × 20 % | 3,8 h |
| Revisiones | 2 rondas × máx(1 h; 1,14 h) | 2,28 h |
| Gestión | 19 h × 10 % | 1,9 h |
| **Horas a cobrar** | 19 + 3,8 + 2,28 + 1,9 | **26,98 h** |
| Horas facturables del mes | 40 × 4,33 × 60 % | 103,92 h |
| Tarifa mínima | 1.610.000 × 1,10 ÷ 103,92 | $ 17.042 |
| Costo operativo | (80 + 50 + 90 + 40 mil + 4.500.000 ÷ 36) ÷ 103,92 | $ 3.705 |
| Tarifa ajustada | $ 18.500 sugerida × 1,00 | $ 18.500 |
| Tu trabajo | 26,98 h × $ 18.500 | $ 499.130 |
| Costos operativos | 26,98 h × $ 3.705 | $ 99.955 |
| Ajuste comercial | × 0,95 (regional) | − $ 29.954 |
| Utilidad | 10 % de $ 569.131 | $ 56.913 |
| Seguridad social | $ 626.044 × 11,61 % ÷ 88,39 % | $ 82.221 |
| Redondeo | $ 708.265 → múltiplo de 5.000 | $ 1.735 |
| **Precio sin IVA** | | **$ 710.000** |
| Piso | 26,98 × (17.042 + 3.705) ÷ 0,8839 | $ 635.000 |
| Para negociar | 710.000 × 1,15 | $ 820.000 |
| Mercado junior | 25,08 h × $ 20.000 a $ 35.000 | $ 501.600 a $ 877.800 (dentro del rango) |
| Retención (10 %) | | − $ 71.000 |
| Te queda | 639.000 − 82.422 − 99.955 | $ 456.623 |
| Entrega | 29,8 h reales ÷ 6 h al día | 5 días hábiles |

Este mismo ejemplo es una de las pruebas automáticas (`src/logica/__tests__/calculadora.test.js`).
