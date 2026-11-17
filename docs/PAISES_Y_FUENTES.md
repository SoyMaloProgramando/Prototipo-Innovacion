# Países, datos y fuentes

TarifaJusta calcula en la moneda de cada uno de los 29 países de habla hispana y portuguesa. Este documento explica de dónde sale cada dato de `src/datos/datosPaises.js` (generado) y cómo se calculó lo que no viene directo de una fuente. Colombia, el país base, está en `src/datos/parametros.js` y sus fuentes en la página "Cómo calculamos".

La investigación se hizo el 31 de octubre de 2026. Los tipos de cambio, salarios mínimos e impuestos cambian: revísalos antes de usar la app para algo real y actualízalos en la página "Cómo calculamos" (se recalcula todo al instante) o en el archivo de datos.

## Cómo se calcula cada dato

- **Tipo de cambio:** unidades de moneda local por 1 dólar, del banco central cuando se pudo. Es el valor de respaldo: con internet, la app lo reemplaza al abrir (y cada 6 horas) por el del día, de la TRM oficial para Colombia y de ExchangeRate-API para las demás monedas (`src/servicios/tipoDeCambio.js`). Solo se usa para convertir los costos que se pagan en dólares y los del catálogo (que están en pesos colombianos) y para mostrar el precio en dólares. Ecuador, El Salvador, Panamá, Puerto Rico y Timor-Leste usan el dólar. Cuba se actualiza a mano: las API publican la tasa antigua de 24 CUP.
- **Tarifas de mercado:** son las de Colombia (`BANDAS_MERCADO`) multiplicadas por un factor de salarios: la media geométrica de *salario del país ÷ salario de Colombia* en los niveles junior, semi-senior y senior, cada uno en su moneda. Desarrollo, datos, infraestructura, consultoría e interactivos usan sueldos de desarrolladores; diseño, UX/UI, animación y audiovisual, de diseñadores. Como el factor compara sueldos en moneda local, las tarifas no dependen del tipo de cambio. Referencia de Colombia: desarrollo $3.200.000 / $5.500.000 / $9.000.000 y diseño $2.200.000 / $3.300.000 / $5.000.000 al mes.
- **Cuba:** los salarios estatales (promedio de 5.839 CUP) no reflejan lo que cobra un trabajador por cuenta propia, así que se usan los de Colombia convertidos con la tasa oficial flotante. Tómalo como referencia gruesa.
- **Gastos de ejemplo:** el reparto entre vivienda, alimentación, transporte y otros sale del costo de vida de la ciudad principal. El total se ajusta para que quede entre el 55 % y el 70 % de lo que gana un junior en el país (promedio de desarrollo y diseño). En Colombia el ejemplo (Tunja) es el 60 %. Así el ejemplo es igual de realista en todos los países; varias fuentes de costo de vida (Numbeo, livingcost.org) reflejan el gasto de un extranjero.
- **Costos de trabajar:** internet según la fuente del país; energía = 58 kWh al mes al precio residencial; software = USD 28 al mes; otros gastos de trabajo en la misma proporción que en el ejemplo de Colombia; computador de la fuente si cuesta al menos USD 900, si no USD 1.100.
- **Aportes a seguridad social:** una tasa efectiva sobre lo que se factura, que resume cuotas fijas, tramos o porcentajes, y la cuota mínima mensual si existe. Cuando el régimen es voluntario y la investigación lo cuantificó, se incluye lo que costaría afiliarse con la base mínima (se puede apagar en el paso 4). En Brasil, Cabo Verde, Mozambique y Santo Tomé incluye el impuesto único del régimen simplificado que usa un junior.
- **Impuesto a la venta:** tasa general y si un independiente que empieza normalmente lo cobra (`porDefecto`). Si viene activado, la app lo suma al precio desde el inicio.
- **Retenciones:** la primera de la lista (salvo las marcadas `auto: false`) se aplica sola cuando el cliente es una empresa del país; las personas y los clientes del exterior no retienen.
- **Confianza:** alta (datos oficiales recientes), media (fuentes confiables con algunas estimaciones) o baja (muchas estimaciones). La app la muestra en "Cómo calculamos".

## Resumen

| País | Moneda | 1 USD | Salario mínimo | Impuesto a la venta | Aportes | Retención automática | Confianza |
| --- | --- | ---: | ---: | --- | ---: | --- | --- |
| Colombia | COP | 3.183 | 1.750.905 | IVA 19 % (no lo cobra) | 11,6 % | según el producto (3,5 % a 11 %) | alta |
| Angola | AOA | 920 | 100.000 | IVA 14 % (no lo cobra) | 8 % | 6,5 % | media |
| Argentina | ARS | 1.560 | 391.200 | IVA 21 % (no lo cobra) | 7,5 % | no | media |
| Bolivia | BOB | 12,09 | 3.300 | IVA 13 % (no lo cobra) | 10 % | 15,5 % | baja |
| Brasil | BRL | 5,40 | 1.621 | no hay | 10 % | no | media |
| Cabo Verde | CVE | 98,70 | 17.000 | IVA 15 % (no lo cobra) | 23,5 % | no | media |
| Chile | CLP | 993 | 553.553 | IVA 19 % (no lo cobra) | 0 % | 15,25 % | media |
| Costa Rica | CRC | 450 | 367.108 | IVA 13 % (lo cobra) | 12 % | no | media |
| Cuba | CUP | 758 | 2.100 | impuesto sobre los servicios 10 % (no lo cobra) | 12 % | no | baja |
| Ecuador | USD | 1,00 | 482,00 | IVA 15 % (lo cobra) | 8,9 % | 10 % | media |
| El Salvador | USD | 1,00 | 408,80 | IVA 13 % (lo cobra) | 7,5 % | 10 % | media |
| España | EUR | 0,90 | 1.221 | IVA 21 % (lo cobra) | 17,5 % | 7 % | alta |
| Guatemala | GTQ | 7,64 | 4.002 | IVA 12 % (no lo cobra) | 0 % | 5 % | media |
| Guinea Ecuatorial | XAF | 587 | 129.035 | IVA 15 % (no lo cobra) | 15 % | 10 % | baja |
| Guinea-Bisáu | XOF | 587 | 59.000 | IVA 19 % (no lo cobra) | 7,5 % | no | baja |
| Honduras | HNL | 26,90 | 13.292 | ISV 15 % (lo cobra) | 6 % | 12,5 % | baja |
| México | MXN | 18,80 | 9.582 | IVA 16 % (lo cobra) | 10 % | 1,25 % | alta |
| Mozambique | MZN | 63,91 | 10.845 | IVA 16 % (no lo cobra) | 10 % | no | media |
| Nicaragua | NIO | 36,62 | 8.320 | IVA 15 % (lo cobra) | 15 % | 10 % | baja |
| Panamá | USD | 1,00 | 651,04 | ITBMS 7 % (no lo cobra) | 10 % | no | media |
| Paraguay | PYG | 5.945 | 2.899.408 | IVA 10 % (lo cobra) | 0 % | no | baja |
| Perú | PEN | 3,45 | 1.130 | IGV 18 % (no lo cobra) | 6 % | 8 % | media |
| Portugal | EUR | 0,90 | 920,00 | IVA 23 % (no lo cobra) | 15 % | 23 % | media |
| Puerto Rico | USD | 1,00 | 1.820 | IVU 11,5 % (no lo cobra) | 13 % | 10 % | media |
| República Dominicana | DOP | 60,32 | 29.988 | ITBIS 18 % (lo cobra) | 0 % | 15 % | media |
| Santo Tomé y Príncipe | STN | 21,93 | 3.000 | IVA 15 % (no lo cobra) | 17 % | no | baja |
| Timor Oriental | USD | 1,00 | 115,00 | no hay | 0 % | no | baja |
| Uruguay | UYU | 40,21 | 25.383 | IVA 22 % (lo cobra) | 14 % | no | media |
| Venezuela | VES | 889 | 213.421 | IVA 16 % (lo cobra) | 0 % | 3 % | baja |

## Angola (AO, AOA)

- **Ciudad de ejemplo:** Luanda. **Confianza:** media.
- **Tipo de cambio:** 919,70 AOA por dólar (2026-10-30).
- **Salario mínimo:** 100.000 AOA al mes.
- **IVA:** 14 %; un independiente que empieza normalmente no lo cobra. Si facturas menos de 25 millones de kwanzas al año quedas fuera del IVA (14 %); pagas el impuesto del sello del 1 % sobre los recibos.
- **Aportes (INSS):** 8 % de lo facturado. Aportas el 8 % del ingreso que declaras al inscribirte.
- **Retenciones:** Retenção na fonte IRT – Grupo B (6,5 %). Las entidades con contabilidad organizada retienen el 6,5 % de IRT (Grupo B).
- **Gastos de ejemplo al mes:** vivienda 66.000, alimentación 35.000, transporte 8.200, otros 16.000. Costo de vida de la fuente: 435.429 AOA.
- **Costos de trabajar al mes:** internet 30.000, energía 820, software 26.000, otros 3.100; computador 1.000.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 210.000 / 350.000 / 560.000; diseño 147.000 / 245.000 / 392.000. Factor frente a Colombia: ×0,0638 en tecnología y ×0,0730 en áreas creativas.
- **Advertencias de la investigación:** Tipo de cambio, salario mínimo, IVA, retención y seguridad social bien documentados; salarios y costo de vida estimados. Inflación alta en 2024-2025 (los valores en kwanzas envejecen rápido). Gran reforma: el IRPS reemplaza al IRT desde 2027. Las transferencias al exterior pagan la Contribuição Especial sobre Operações Cambiais (CEOC: 10% para empresas; PwC https://taxsummaries.pwc.com/Angola/Corporate/Other-taxes); no hay un impuesto general a los movimientos bancarios internos.
- **Fuentes:**
  - Tipo de cambio: <https://tradingeconomics.com/angola/currency>
  - Salario mínimo: <https://www.verangola.net/va/pt/082025/Economia/45662/Governo-fixa-salário-mínimo-nos-100-mil-kwanzas-já-a-partir-de-Setembro.htm>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Luanda?displayCurrency=AOA>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/Angola/Corporate/Other-taxes>
  - Aportes a seguridad social: <https://angolex.com/paginas/decreto-presidencial/regime-juridico-da-proteccao-social-obrigatoria-dos-trabalhadores-por-conta-propria.html>
  - Retención sobre honorarios: <https://assets.kpmg.com/content/dam/kpmg/ao/pdf/200723-taxnews-personalincometaxamendments.pdf>
  - Salarios de desarrollo: <https://worldsalaries.com/average-software-developer-salary-in-angola/>
  - Salarios de desarrollo: <https://forbesafricalusofona.com/?p=162980>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Tarifas de independientes: <https://visulry.com/salary/graphic-designer/angola>
  - Internet: <https://www.verangola.net/va/pt/032026/Telecomunicacoes/48108/Unitel-TV-Internet-e-televisão-num-só-pacote-para-os-clientes-Unitel.htm>
  - Energía: <https://angolex.com/paginas/despachos/actualizacao-tarifas-servico-electricidade-ciclo-tarifario-2025a-2028a-7536a-26a.html>

## Argentina (AR, ARS)

- **Ciudad de ejemplo:** Buenos Aires. **Confianza:** media.
- **Tipo de cambio:** 1.560,00 ARS por dólar (2026-10-30).
- **Salario mínimo:** 391.200 ARS al mes.
- **IVA:** 21 %; un independiente que empieza normalmente no lo cobra. Si estás en el monotributo no cobras IVA: emites factura C y la cuota mensual ya lo incluye. Solo los responsables inscriptos suman el 21 %.
- **Aportes (Monotributo):** 7,5 % de lo facturado, cuota mínima 49.527 ARS al mes. El monotributo es una cuota fija al mes según tu categoría: incluye el impuesto integrado, la jubilación y la obra social. En la Ciudad de Buenos Aires se suma ingresos brutos. La tasa que usamos es la de una categoría B o C.
- **Retenciones:** ninguna general. A un monotributista que factura dentro de su categoría las empresas normalmente no le retienen Ganancias ni IVA.
- **Impuesto a las transacciones:** impuesto a los débitos y créditos bancarios, 0,6 %.
- **Gastos de ejemplo al mes:** vivienda 460.000, alimentación 180.000, transporte 23.000, otros 120.000. Costo de vida de la fuente: 1.569.665 ARS.
- **Costos de trabajar al mes:** internet 48.000, energía 12.000, software 44.000, otros 19.000; computador 1.900.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 1.390.000 / 2.500.000 / 3.750.000; diseño 834.000 / 1.390.000 / 2.220.000. Factor frente a Colombia: ×0,4349 en tecnología y ×0,4139 en áreas creativas.
- **Advertencias de la investigación:** Economía con inflación alta (~2-3 % mensual en 2026; el monotributo se actualizó 16,8 % en agosto-2026): todos los montos en ARS deben actualizarse cada pocos meses. Tipo de cambio oficial y paralelos casi alineados en oct-2026 (oficial BNA 1.560, blue 1.565, MEP ~1.570, CCL ~1.664). Muchos devs cobran en dólares (dolarizados), con sueldos 20-40 % más altos que en pesos. Los datos salariales públicos de 2026 son mayormente salarios pretendidos (Bumeran) o medianas parciales; no se halló una tabla 2026 confiable por seniority para desarrolladores ni para diseñadores gráficos. El régimen práctico para un junior es el monotributo (cuota fija que reemplaza IVA, Ganancias, jubilación y obra social); en CABA se suma IIBB unificado.
- **Fuentes:**
  - Tipo de cambio: <https://indicadores.ar/cotizacion-dolar/2026-10>
  - Salario mínimo: <https://www.colegio-escribanos.org.ar/noticias/2026_09_02_Consejo_Salario_Res-4-26.pdf>
  - Costo de vida: <https://www.zonaprop.com.ar/blog/wp-content/uploads/2026/10/INDEX_CABA_REPORTE_2026-09.pdf>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Buenos-Aires?displayCurrency=ARS>
  - Impuesto a la venta: <https://yo-facturo.com/blog/que-es-el-iva-en-argentina/>
  - Aportes a seguridad social: <https://www.afip.gob.ar/monotributo/categorias.asp>
  - Retención sobre honorarios: <https://www.unc.edu.ar/sites/default/files/RG-AFIP-2616-2009.pdf>
  - Impuesto a las transacciones: <https://www.iprofesional.com/impuestos/369360-impuesto-al-cheque-cuanto-es-quien-lo-paga-y-como-se-calcula>
  - Salarios de desarrollo: <https://www.innovaciondigital360.com/cio/los-salarios-tech-se-despegan-cuanto-piden-ganar-los-talentos-de-tecnologia-y-sistemas/>
  - Salarios de desarrollo: <https://developargentina.com/blog/cuanto-gana-programador-argentina-2026>
  - Salarios de diseño: <https://www.sitioandino.com.ar/economia/cuales-son-los-salarios-pretendidos-mas-altos-y-mas-bajos-del-mercado-laboral-argentino-n5725092>
  - Salarios de diseño: <https://www.iprofesional.com/management/457943-el-sueldo-que-piden-los-argentinos-para-aceptar-un-nuevo-trabajo-en-junio-2026>
  - Tarifas de independientes: <https://www.fcedu.uner.edu.ar/wp-content/uploads/2026/08/Tarifario-Agosto.pdf>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Buenos-Aires?displayCurrency=ARS>
  - Energía: <https://www.argentina.gob.ar/normativa/426258_res26-2_pdf/archivo>

## Bolivia (BO, BOB)

- **Ciudad de ejemplo:** La Paz. **Confianza:** baja.
- **Tipo de cambio:** 12,0900 BOB por dólar (2026-10-31).
- **Salario mínimo:** 3.300 BOB al mes.
- **IVA:** 13 %; un independiente que empieza normalmente no lo cobra. En Bolivia el IVA (13 %) va incluido en el precio de la factura y además se paga el IT (3 %). Si todavía no tienes NIT, no facturas IVA: la empresa te retiene el 15,5 %.
- **Aportes (Gestora Pública):** 10 % de lo facturado, cuota mínima 476,00 BOB al mes. Para un independiente el aporte a la Gestora es voluntario: cerca del 14,4 % del ingreso que declares. Lo calculamos con la base de un salario mínimo; si no aportas, apágalo en el paso 4.
- **Retenciones:** Retención IUE + IT sin factura (15,5 %). Si no entregas factura, la empresa te retiene el 12,5 % del IUE y el 3 % del IT (15,5 % en total).
- **Impuesto a las transacciones:** ITF (impuesto a las transacciones financieras), 0,3 %.
- **Gastos de ejemplo al mes:** vivienda 1.600, alimentación 1.100, transporte 210, otros 410. Costo de vida de la fuente: 4.050 BOB.
- **Costos de trabajar al mes:** internet 330, energía 110, software 340, otros 82; computador 13.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 5.500 / 9.000 / 14.000; diseño 4.000 / 5.500 / 8.000. Factor frente a Colombia: ×0,00164 en tecnología y ×0,00169 en áreas creativas.
- **Advertencias de la investigación:** Cambio de régimen: el boliviano pasó de un tipo fijo de 6,96 a uno flexible (12,09 Bs/USD el 31-oct-2026), así que los datos de costos y salarios anteriores a 2026 quedaron desfasados. Hubo alta inflación en 2025-2026 y cambio de gobierno a fines de 2025. La Paz es la sede de gobierno; Santa Cruz de la Sierra es el mayor centro económico. Los datos verificados son el tipo de cambio oficial (BCB), el salario mínimo 2026 (vía Playroll), el IVA del 13 % y el IT del 3 %. Los salarios, el costo de vida, la retención del 15,5 %, los aportes y el ITF son estimaciones o reglas conocidas sin verificar en esta sesión porque se agotó el presupuesto de búsquedas. Recomendación: que la app muestre advertencia de baja confianza y permita cotizar en USD.
- **Fuentes:**
  - Tipo de cambio: <https://www.bcb.gob.bo/>
  - Salario mínimo: <https://www.playroll.com/minimum-wage/bolivia>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/La-Paz>
  - Impuesto a la venta: <https://taxdo.com/resources/countries/la/bolivia.md>
  - Aportes a seguridad social: <https://www.playroll.com/minimum-wage/bolivia>
  - Retención sobre honorarios: <https://taxdo.com/resources/countries/la/bolivia.md>
  - Impuesto a las transacciones: <https://www.bcb.gob.bo/>
  - Salarios de desarrollo: <https://wage.is/bolivia/>
  - Salarios de desarrollo: <https://www.playroll.com/minimum-wage/bolivia>
  - Salarios de diseño: <https://wage.is/bolivia/>
  - Salarios de diseño: <https://www.playroll.com/minimum-wage/bolivia>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/bolivia/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/La-Paz>
  - Energía: <https://www.globalpetrolprices.com/Bolivia/electricity_prices/>

## Brasil (BR, BRL)

- **Ciudad de ejemplo:** São Paulo. **Confianza:** media.
- **Tipo de cambio:** 5,3972 BRL por dólar (2026-10-26).
- **Salario mínimo:** 1.621 BRL al mes.
- **ISS:** 0 %; un independiente que empieza normalmente no lo cobra. El ISS (2 a 5 % según la ciudad) ya está dentro de la guía mensual del Simples Nacional, así que no se suma al precio.
- **Aportes (Simples Nacional + INSS):** 10 % de lo facturado, cuota mínima 178,31 BRL al mes. Con una microempresa en el Simples Nacional pagas el DAS (6 % en la primera franja, con el ISS incluido) y el 11 % de INSS sobre un pró-labore de un salario mínimo: cerca del 10 % de lo que facturas. El MEI no permite programación ni diseño web.
- **Retenciones:** ninguna general. A una empresa del Simples Nacional los clientes normalmente no le retienen impuestos federales. Como autônomo persona física sí te descuentan el INSS (11 %) y, según el monto, el IRRF.
- **Gastos de ejemplo al mes:** vivienda 1.300, alimentación 490, transporte 140, otros 320. Costo de vida de la fuente: 4.310 BRL.
- **Costos de trabajar al mes:** internet 100, energía 51, software 150, otros 56; computador 5.900.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 4.500 / 7.500 / 11.300; diseño 2.010 / 2.800 / 4.320. Factor frente a Colombia: ×0,00134 en tecnología y ×0,00087 en áreas creativas.
- **Advertencias de la investigación:** Lo fiscal y los sueldos tienen buena base (Simples Nacional, tabla INSS 2026 de gov.br, CAGED vía salario.com.br). Lo más débil: costo de vida (Numbeo São Paulo solo devolvió datos de 2021; se usaron FipeZap, DIEESE y SPTrans + estimaciones), internet (dato 2024), electricidad (mar-2025), tipo de cambio sin PTAX oficial, sin precio de computador ni tarifas freelance. Recomendación para la app: el junior debería abrir una ME en el Simples Nacional con Fator R (≈ 10 % de lo facturado incluyendo INSS); el ISS ya está dentro del DAS y no se suma al precio. Reforma tributaria (CBS/IBS) en transición desde 2026: revisar reglas en los próximos años.
- **Fuentes:**
  - Tipo de cambio: <https://open.er-api.com/v6/latest/USD>
  - Salario mínimo: <https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal>
  - Costo de vida: <https://downloads.fipe.org.br/indices/fipezap/fipezap-202609-residencial-locacao.pdf>
  - Costo de vida: <https://www.dieese.org.br/analisecestabasica/2026/202609cestabasica.pdf>
  - Impuesto a la venta: <https://www.contabilizei.com.br/contabilidade-online/iss/>
  - Aportes a seguridad social: <https://www.contabilizei.com.br/contabilidade-online/fator-r/>
  - Retención sobre honorarios: <https://www.contabilizei.com.br/contabilidade-online/iss/>
  - Salarios de desarrollo: <https://www.salario.com.br/profissao/analista-de-desenvolvimento-de-sistemas-cbo-212405/>
  - Salarios de desarrollo: <https://www.salario.com.br/profissao/programador-de-sistemas-de-informacao-cbo-317110/>
  - Salarios de diseño: <https://www.salario.com.br/profissao/desenhista-industrial-grafico-designer-grafico-cbo-262410/>
  - Internet: <https://bestbroadbanddeals.co.uk/broadband/pricing/worldwide-comparison/>
  - Energía: <https://www.globalpetrolprices.com/Brazil/electricity_prices/>

## Cabo Verde (CV, CVE)

- **Ciudad de ejemplo:** Praia. **Confianza:** media.
- **Tipo de cambio:** 98,7000 CVE por dólar (2026-10-30).
- **Salario mínimo:** 17.000 CVE al mes.
- **IVA:** 15 %; un independiente que empieza normalmente no lo cobra. Un independiente que empieza suele entrar al REMPE: paga un tributo único del 4 % de lo que vende, en lugar del IVA y del impuesto sobre la renta, y no cobra IVA.
- **Aportes (INPS + REMPE):** 23,5 % de lo facturado. Incluye el 19,5 % del INPS sobre lo que declaras y el 4 % del tributo único del REMPE.
- **Retenciones:** Retenção IRPS – Categoria B (20 %) (se elige a mano). Con contabilidad organizada, la empresa retiene el 20 % de IRPS. En el REMPE normalmente no hay retención.
- **Gastos de ejemplo al mes:** vivienda 10.000, alimentación 4.700, transporte 790, otros 2.100. Costo de vida de la fuente: 64.779 CVE.
- **Costos de trabajar al mes:** internet 5.100, energía 1.800, software 2.800, otros 440; computador 110.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 30.000 / 42.500 / 55.000; diseño 21.000 / 29.800 / 38.500. Factor frente a Colombia: ×0,00762 en tecnología y ×0,00872 en áreas creativas.
- **Advertencias de la investigación:** Escudo con paridad fija al euro (estable). Salario mínimo, IVA, seguridad social y retención con buena fuente (PwC); salarios de TI de una sola guía y diseñadores estimados. No se encontraron tarifas freelance locales. Electricidad muy cara.
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://forbesafricalusofona.com/?p=119448>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Praia-Cape-Verde?displayCurrency=CVE>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/cabo-verde/individual/income-determination>
  - Salarios de desarrollo: <https://africarrieres.com/cape-verde/en/guide/marche-emploi/salary-guide>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Praia-Cape-Verde?displayCurrency=CVE>
  - Energía: <https://www.globalpetrolprices.com/Cape-Verde/electricity_prices/>

## Chile (CL, CLP)

- **Ciudad de ejemplo:** Santiago. **Confianza:** media.
- **Tipo de cambio:** 993,22 CLP por dólar (2026-10-30).
- **Salario mínimo:** 553.553 CLP al mes.
- **IVA:** 19 %; un independiente que empieza normalmente no lo cobra. Si emites boletas de honorarios no cobras IVA.
- **Aportes (Ley 21.133):** 0 % de lo facturado. Tus cotizaciones (pensión, salud y seguros) se pagan en la Operación Renta con lo que te retuvieron en las boletas, por eso no se suman aparte. Si te paga una persona que no retiene, tú pagas ese 15,25 % en tu declaración.
- **Retenciones:** Retención boleta de honorarios (15,25 %). En 2026 la empresa retiene el 15,25 % de cada boleta. Esa plata paga tus cotizaciones y tu impuesto en la Operación Renta: si sobra, te la devuelven.
- **Gastos de ejemplo al mes:** vivienda 390.000, alimentación 210.000, transporte 33.000, otros 100.000. Costo de vida de la fuente: 880.000 CLP.
- **Costos de trabajar al mes:** internet 21.000, energía 15.000, software 28.000, otros 18.000; computador 1.100.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 1.300.000 / 2.100.000 / 3.200.000; diseño 800.000 / 1.200.000 / 1.800.000. Factor frente a Colombia: ×0,3806 en tecnología y ×0,3624 en áreas creativas.
- **Advertencias de la investigación:** Datos oficiales sólidos: dólar observado (Banco Central vía mindicador), retención de honorarios del 15,25 % en 2026 (SII), ingreso mínimo y tasas previsionales (Previred, oct-2026). Clave para la app: el freelancer con boleta de honorarios no cobra IVA, y la retención del 15,25 % es un pago provisional que financia las cotizaciones (≈ 17 % de lo facturado) y el impuesto anual. No hay que sumar retención y cotizaciones como dos costos separados. Muchos precios se pactan en UF o en CLP. Los salarios por nivel y el costo de vida son estimaciones: Numbeo es de dic-2025 y no hubo guías salariales locales por falta de búsquedas.
- **Fuentes:**
  - Tipo de cambio: <https://mindicador.cl/api/dolar>
  - Salario mínimo: <https://www.previred.com/indicadores-previsionales/>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Santiago>
  - Impuesto a la venta: <https://taxdo.com/resources/countries/la/chile.md>
  - Aportes a seguridad social: <https://www.previred.com/indicadores-previsionales/>
  - Retención sobre honorarios: <https://www.sii.cl/destacados/boletas_honorarios/index.html>
  - Salarios de desarrollo: <https://talently.tech/herramientas/chile/salario>
  - Salarios de desarrollo: <https://lemon.io/rate-calculator/chile/>
  - Salarios de diseño: <https://www.mercadonegro.pe/publicidad/cuanto-ganan-disenadores-graficos-america-latina>
  - Salarios de diseño: <https://www.previred.com/indicadores-previsionales/>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/chile/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Santiago>
  - Energía: <https://www.globalpetrolprices.com/Chile/electricity_prices/>

## Costa Rica (CR, CRC)

- **Ciudad de ejemplo:** San José. **Confianza:** media.
- **Tipo de cambio:** 449,70 CRC por dólar (2026-10-31).
- **Salario mínimo:** 367.108 CRC al mes.
- **IVA:** 13 %; un independiente que empieza normalmente lo cobra. Desde 2019 los servicios profesionales pagan IVA: si estás inscrito, cobras el 13 % a tus clientes del país. Los servicios al exterior están exentos.
- **Aportes (CCSS):** 12 % de lo facturado. La afiliación a la CCSS es obligatoria para quien trabaja por cuenta propia. La cuota depende del ingreso que declares; usamos una estimación del 12 %. Confírmala con la CCSS.
- **Retenciones:** ninguna general. Entre empresas privadas no se acostumbra retener renta a un profesional independiente: tú declaras y pagas tu impuesto.
- **Gastos de ejemplo al mes:** vivienda 180.000, alimentación 86.000, transporte 15.000, otros 110.000. Costo de vida de la fuente: 771.570 CRC.
- **Costos de trabajar al mes:** internet 31.000, energía 5.000, software 13.000, otros 9.700; computador 490.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 697.000 / 1.320.000 / 1.800.000; diseño 421.000 / 746.000 / 997.000. Factor frente a Colombia: ×0,2187 en tecnología y ×0,2051 en áreas creativas.
- **Advertencias de la investigación:** Fuentes sólidas: tipo de cambio oficial (BCCR vía Hacienda, 31/10/2026), IVA y renta 2026 (PwC, junio 2026) y costo de vida de Numbeo (marzo 2026). Lagunas: la lista de salarios mínimos de 2026 no se pudo leer (se usa 2025) y la escala de cotización de la CCSS para independientes no se pudo verificar; la cotización es obligatoria y pesa bastante, así que conviene confirmarla. Costa Rica es el país más caro de esta región. Muchos freelancers cobran a clientes del exterior en USD: esos servicios no llevan IVA.
- **Fuentes:**
  - Tipo de cambio: <https://api.hacienda.go.cr/indicadores/tc/dolar>
  - Salario mínimo: <https://www.mtss.go.cr/temas-laborales/salarios/Documentos-Salarios/lista_salarios_2025.pdf>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/San-Jose-Costa-Rica>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/San-Jose-Costa-Rica>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/costa-rica/individual/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/costa-rica/individual/other-taxes>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/costa-rica/corporate/withholding-taxes>
  - Salarios de desarrollo: <https://www.paylab.com/cr/salaryinfo/information-technology/programmer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/cr/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/costa-rica/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/San-Jose-Costa-Rica>
  - Energía: <https://www.globalpetrolprices.com/Costa-Rica/electricity_prices/>

## Cuba (CU, CUP)

- **Ciudad de ejemplo:** La Habana. **Confianza:** baja.
- **Tipo de cambio:** 758,00 CUP por dólar (2026-10-29).
- **Salario mínimo:** 2.100 CUP al mes.
- **impuesto sobre los servicios:** 10 %; un independiente que empieza normalmente no lo cobra. Cuba no tiene IVA: el impuesto sobre los servicios (cerca del 10 % de lo que cobras) lo paga quien presta el servicio. Dato sin verificar en fuentes oficiales.
- **Aportes (TCP):** 12 % de lo facturado, cuota mínima 420,00 CUP al mes. Como trabajador por cuenta propia aportas cerca del 20 % sobre una base que eliges, con un mínimo de unos 420 CUP al mes. Dato sin verificar en fuentes oficiales.
- **Retenciones:** ninguna general. No encontramos una retención general cuando te paga una entidad.
- **Gastos de ejemplo al mes:** vivienda 160.000, alimentación 120.000, transporte 17.000, otros 61.000. Costo de vida de la fuente: 348.895 CUP.
- **Costos de trabajar al mes:** internet 30.000, energía 42, software 21.000, otros 8.900; computador 830.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 762.000 / 1.310.000 / 2.140.000; diseño 524.000 / 786.000 / 1.190.000. Factor frente a Colombia: ×0,2380 en tecnología y ×0,2381 en áreas creativas.
- **Advertencias de la investigación:** Economía con tres tasas oficiales (24, 120 y flotante ≈758 CUP/USD) más un mercado informal (≈858 CUP/USD) y una depreciación muy rápida (el dólar pasó de ~400 a ~850 CUP en poco más de un año). Hay una brecha enorme entre salarios estatales en CUP (mínimo 2.100, medio 5.839) y precios de mercado dolarizados, así que cualquier cálculo en CUP queda desfasado enseguida; conviene que la app calcule en USD y convierta con la tasa flotante, o que muestre una advertencia. Impuestos (Ley 113/2012): el TCP tributa impuesto sobre ingresos personales, en régimen general sobre utilidades declaradas (progresivo, tasa máxima 50 %) o en régimen simplificado con cuota mensual fija según la actividad; además, impuesto sobre ventas/servicios y contribución especial a la seguridad social. Las mipymes pagan impuesto sobre utilidades, ventas/servicios y aportes de seguridad social de sus trabajadores. Las tasas concretas NO se pudieron verificar para 2026 (sitios oficiales bloqueados y presupuesto de búsqueda agotado): tratar iva, aportes y retención como estimaciones pendientes de confirmar. No se encontraron tarifas freelance ni precio de computador.
- **Fuentes:**
  - Tipo de cambio: <https://www.cibercuba.com/noticias/2026-10-29-u1-e129488-s27061-nid344175-dolar-euro-baten-nuevos-records-cuba-asi-amanece>
  - Salario mínimo: <https://en.wikipedia.org/wiki/Economy_of_Cuba>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Havana>
  - Impuesto a la venta: <https://en.wikipedia.org/wiki/Taxation_in_Cuba>
  - Aportes a seguridad social: <https://en.wikipedia.org/wiki/Taxation_in_Cuba>
  - Retención sobre honorarios: <https://en.wikipedia.org/wiki/Taxation_in_Cuba>
  - Salarios de desarrollo: <https://en.wikipedia.org/wiki/Economy_of_Cuba>
  - Salarios de diseño: <https://en.wikipedia.org/wiki/Economy_of_Cuba>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Havana>
  - Energía: <https://www.globalpetrolprices.com/Cuba/electricity_prices/>

## Ecuador (EC, USD)

- **Ciudad de ejemplo:** Quito. **Confianza:** media.
- **Tipo de cambio:** 1,0000 USD por dólar (2026-10-31).
- **Salario mínimo:** 482,00 USD al mes.
- **IVA:** 15 %; un independiente que empieza normalmente lo cobra. Un profesional que factura honorarios suele estar en el régimen general y cobra el 15 % de IVA. Los servicios a clientes del exterior pueden ir con tarifa 0 %.
- **Aportes (IESS):** 8,9 % de lo facturado, cuota mínima 84,83 USD al mes. Aportas el 17,6 % sobre lo que declares. La base mínima es un salario básico, así que el aporte mínimo es de USD 84,83 al mes. Calculamos con esa base mínima.
- **Retenciones:** Retención renta honorarios (10 %); Retención renta mano de obra (3 %) (se elige a mano). Desde marzo de 2026 las empresas retienen el 10 % de renta sobre honorarios profesionales de personas naturales.
- **Gastos de ejemplo al mes:** vivienda 260, alimentación 200, transporte 17, otros 81. Costo de vida de la fuente: 830 USD.
- **Costos de trabajar al mes:** internet 28, energía 5,50, software 28, otros 14; computador 1.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 950 / 1.700 / 2.500; diseño 650 / 950 / 1.400. Factor frente a Colombia: ×0,00029 en tecnología y ×0,00029 en áreas creativas.
- **Advertencias de la investigación:** Economía dolarizada: no hay riesgo cambiario y todo se calcula en USD. Guayaquil es el mayor centro comercial, pero tomamos Quito (capital) como referencia; los costos son parecidos. Los datos oficiales (SBU USD 482, IVA 15 %, IESS 17,6 %, retención 10 % desde el 1-mar-2026) son sólidos. Los salarios por nivel provienen de fuentes orientadas a contratación tech o extranjera y se ajustaron a la baja, y el del diseñador es una estimación por proporción, así que la confianza es media o baja en salarios. También existe el Impuesto a la Salida de Divisas (ISD) sobre pagos al exterior, como suscripciones de software pagadas con tarjeta; no verifiqué su tasa vigente porque se agotó el presupuesto de búsquedas. Hubo apagones en 2024-2025.
- **Fuentes:**
  - Tipo de cambio: <https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269>
  - Salario mínimo: <https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Quito>
  - Costo de vida: <https://www.nucamp.co/blog/cost-of-living-vs-tech-salaries-in-ecuador-in-2026-can-you-actually-afford-it>
  - Impuesto a la venta: <https://taxdo.com/resources/countries/la/ecuador.md>
  - Aportes a seguridad social: <https://www.eluniverso.com/noticias/economia/salario-basico-unificado-482-aportes-iess-ecuador-2025-nota/>
  - Retención sobre honorarios: <https://nmslaw.com.ec/blog/2026/03/02/sri-nuevos-porcentajes-retencion-fuente-impuesto-renta/>
  - Salarios de desarrollo: <https://devsdata.com/average-salary-in-ecuador/>
  - Salarios de desarrollo: <https://talently.tech/herramientas/ecuador/salario>
  - Salarios de diseño: <https://www.payscale.com/research/EC/Job=Graphic_Designer/Salary>
  - Salarios de diseño: <https://www.vistazo.com/2025-12-15-salario-basico-usd-482-2026-ecuador-incremento-dolares-IC10565269>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/ecuador/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Quito>
  - Energía: <https://www.globalpetrolprices.com/Ecuador/electricity_prices/>

## El Salvador (SV, USD)

- **Ciudad de ejemplo:** San Salvador. **Confianza:** media.
- **Tipo de cambio:** 1,0000 USD por dólar (2026-10-31).
- **Salario mínimo:** 408,80 USD al mes.
- **IVA:** 13 %; un independiente que empieza normalmente lo cobra. Si estás inscrito como contribuyente de IVA, cobras el 13 % a tus clientes del país. Los servicios a clientes del exterior van al 0 %.
- **Aportes (ISSS):** 7,5 % de lo facturado, cuota mínima 40,00 USD al mes. El ISSS para independientes es una cuota fija de USD 40 al mes (cobertura individual). La AFP es voluntaria.
- **Retenciones:** Retención ISR servicios (10 %). Las empresas retienen el 10 % de ISR al pagar servicios de personas naturales.
- **Gastos de ejemplo al mes:** vivienda 210, alimentación 79, transporte 6, otros 32. Costo de vida de la fuente: 1.032 USD.
- **Costos de trabajar al mes:** internet 38, energía 16, software 28, otros 8; computador 1.100.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 531 / 947 / 1.380; diseño 409 / 466 / 644. Factor frente a Colombia: ×0,00016 en tecnología y ×0,00015 en áreas creativas.
- **Advertencias de la investigación:** Economía dolarizada: no hay riesgo cambiario. Fuentes sólidas para IVA, ISR y retenciones (PwC, revisado en sept. 2026) y para la cuota ISSS de independientes (sitio oficial). Puntos débiles: el salario mínimo viene de Trading Economics (sin decreto a la vista), el costo de vida de livingcost.org (Numbeo no se pudo leer), los sueldos de Paylab con menos de 20 respuestas y probablemente desactualizados, y el umbral de inscripción en IVA no verificado. No encontré un impuesto vigente a las transacciones financieras (PwC no menciona ninguno). Para ingresos de clientes del exterior, el IVA es 0 % (exportación).
- **Fuentes:**
  - Tipo de cambio: <https://taxsummaries.pwc.com/el-salvador/individual/taxes-on-personal-income>
  - Salario mínimo: <https://tradingeconomics.com/el-salvador/minimum-wages>
  - Costo de vida: <https://livingcost.org/cost/guatemala-city/san-salvador>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/San-Salvador>
  - Impuesto a la venta: <https://ivacalculator.com/el-salvador/>
  - Aportes a seguridad social: <https://www.isss.gob.sv/regimen-especial-para-trabajadores-independientes/>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/el-salvador/corporate/withholding-taxes>
  - Salarios de desarrollo: <https://www.paylab.com/sv/salaryinfo/information-technology/programmer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/sv/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Salarios de diseño: <https://tradingeconomics.com/el-salvador/minimum-wages>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/el-salvador/>
  - Internet: <https://livingcost.org/cost/guatemala-city/san-salvador>
  - Energía: <https://www.globalpetrolprices.com/El-Salvador/electricity_prices/>

## España (ES, EUR)

- **Ciudad de ejemplo:** Madrid. **Confianza:** alta.
- **Tipo de cambio:** 0,8951 EUR por dólar (2026-10-30).
- **Salario mínimo:** 1.221 EUR al mes.
- **IVA:** 21 %; un independiente que empieza normalmente lo cobra. En España el autónomo suma el 21 % de IVA desde la primera factura: no hay exención por facturar poco.
- **Aportes (RETA):** 17,5 % de lo facturado, cuota mínima 205,88 EUR al mes. La cuota de autónomos depende de tus rendimientos netos: desde 205,88 € al mes. El primer año puedes pagar la tarifa plana de 80 €.
- **Retenciones:** Retención IRPF nuevos profesionales (7 %); Retención IRPF profesionales (15 %) (se elige a mano). Las empresas retienen el 15 % de IRPF; en el año en que empiezas y los dos siguientes puedes pedir el 7 %.
- **Gastos de ejemplo al mes:** vivienda 650, alimentación 350, transporte 33, otros 250. Costo de vida de la fuente: 1.283 EUR.
- **Costos de trabajar al mes:** internet 31, energía 15, software 25, otros 32; computador 980.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 2.050 / 2.880 / 4.180; diseño 1.920 / 2.250 / 2.500. Factor frente a Colombia: ×0,00054 en tecnología y ×0,00067 en áreas creativas.
- **Advertencias de la investigación:** Economía estable en euros; inflación moderada. Puntos clave para el freelancer: cuota de autónomos por tramos de ingresos reales (tablas 2025 prorrogadas a 2026, tipo 31,5 % con MEI 0,9 %), tarifa plana de 80 €/mes el primer año, IVA 21 % sin umbral de exención y retención de IRPF del 15 % (7 % los tres primeros años) cuando se factura a empresas. Salarios: Payscale + Michael Page; los niveles del desarrollador son estimados a partir de datos por experiencia. No se obtuvo precio de computador (presupuesto de búsqueda agotado).
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://www.cuestioneslaborales.es/cuantia-smi-2026-diario-mensual-y-anual/>
  - Costo de vida: <https://www.idealista.com/news/node/892181>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Madrid?displayCurrency=EUR>
  - Impuesto a la venta: <https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html>
  - Aportes a seguridad social: <https://upta.es/wp-content/uploads/2026/03/RES-ORDEN-COTIZACION-2026-RETA.pdf>
  - Retención sobre honorarios: <https://guiafiscal.es/irpf/retencion-7-autonomo-nuevo/>
  - Salarios de desarrollo: <https://www.payscale.com/research/ES/Job=Software_Developer/Salary>
  - Salarios de desarrollo: <https://www.payscale.com/research/ES/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary>
  - Salarios de diseño: <https://eiposgrados.com/wp-content/uploads/2026/06/Estudio-de-Remuneracion-2026-Michael-Page-Spain.pdf>
  - Salarios de diseño: <https://es.talent.com/salary?job=dise%C3%B1ador+gr%C3%A1fico>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/spain/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Madrid?displayCurrency=EUR>
  - Energía: <https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table>

## Guatemala (GT, GTQ)

- **Ciudad de ejemplo:** Ciudad de Guatemala. **Confianza:** media.
- **Tipo de cambio:** 7,6419 GTQ por dólar (2026-10-31).
- **Salario mínimo:** 4.002 GTQ al mes.
- **IVA:** 12 %; un independiente que empieza normalmente no lo cobra. Casi todos los que empiezan se inscriben como Pequeño Contribuyente: no cobran el 12 % aparte y pagan el 5 % de lo que facturan.
- **Aportes (IGSS):** 0 % de lo facturado. El IGSS no tiene un programa abierto para independientes que nunca fueron asalariados. Si pagas un seguro médico, pon esa tasa en "Cómo calculamos".
- **Retenciones:** Retención IVA Pequeño Contribuyente (5 %). Si el cliente es agente de retención del IVA, te descuenta el 5 % del Pequeño Contribuyente; si no, tú pagas ese 5 % cada mes.
- **Gastos de ejemplo al mes:** vivienda 2.400, alimentación 1.400, transporte 66, otros 530. Costo de vida de la fuente: 6.888 GTQ.
- **Costos de trabajar al mes:** internet 330, energía 130, software 210, otros 110; computador 8.400.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 6.280 / 10.500 / 16.700; diseño 6.300 / 10.200 / 14.800. Factor frente a Colombia: ×0,00191 en tecnología y ×0,00297 en áreas creativas.
- **Advertencias de la investigación:** Tipo de cambio y salario mínimo oficiales y recientes. Lo más simple para un junior es el régimen de Pequeño Contribuyente (5 % sobre ingresos brutos, sin ISR, tope Q500,285 en 2026). No hay seguridad social para independientes: el IGSS solo cubre a asalariados, salvo la contribución voluntaria IVS para ex-afiliados. Los datos de sueldos tienen muestras pequeñas (Paylab, menos de 20 respuestas) o vienen de un agregador (Computrabajo vía Living in Guatemala). Numbeo no da el costo total sin renta para esta ciudad, así que 'otros' se completó con livingcost.org. Precio del computador estimado. No hay impuesto a las transacciones bancarias.
- **Fuentes:**
  - Tipo de cambio: <https://www.banguat.gob.gt/tipo_cambio/>
  - Salario mínimo: <https://agn.gt/asi-quedan-los-montos-del-salario-minimo-para-el-2026/>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Guatemala-City>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Guatemala-City>
  - Impuesto a la venta: <https://livinginguatemala.com/tramites/isr-vs-iva-guatemala/>
  - Aportes a seguridad social: <https://livinginguatemala.com/es/tramites/igss-cuota-voluntaria/>
  - Retención sobre honorarios: <https://livinginguatemala.com/tramites/isr-vs-iva-guatemala/>
  - Salarios de desarrollo: <https://livinginguatemala.com/es/precios-servicios/ingeniero-en-sistemas-guatemala/>
  - Salarios de desarrollo: <https://www.paylab.com/gt/salarios/tecnologias-de-la-informacion/programador-python?lang=es>
  - Salarios de diseño: <https://www.paylab.com/gt/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Salarios de diseño: <https://paylab.com/gt/salaryinfo/journalism-printing-arts-media/senior-graphic-designer>
  - Tarifas de independientes: <https://livinginguatemala.com/es/precios-servicios/ingeniero-en-sistemas-guatemala/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Guatemala-City>
  - Energía: <https://www.globalpetrolprices.com/Guatemala/electricity_prices/>

## Guinea Ecuatorial (GQ, XAF)

- **Ciudad de ejemplo:** Malabo. **Confianza:** baja.
- **Tipo de cambio:** 587,14 XAF por dólar (2026-10-30).
- **Salario mínimo:** 129.035 XAF al mes.
- **IVA:** 15 %; un independiente que empieza normalmente no lo cobra. El IVA es del 15 %. Si estás registrado como empresa debes cobrarlo; muchos independientes trabajan de manera informal.
- **Aportes (INSESO):** 15 % de lo facturado, cuota mínima 78.000 XAF al mes. Para un independiente la afiliación al INSESO es voluntaria: el 26 % sobre al menos 300.000 XAF al mes (78.000 XAF).
- **Retenciones:** Retención sobre servicios (10 %). Las empresas retienen el 10 % al pagar servicios.
- **Gastos de ejemplo al mes:** vivienda 87.000, alimentación 150.000, transporte 22.000, otros 37.000. Costo de vida de la fuente: 297.440 XAF.
- **Costos de trabajar al mes:** internet 59.000, energía 5.100, software 16.000, otros 7.400; computador 650.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 510.000 / 850.000 / 1.360.000; diseño 357.000 / 595.000 / 952.000. Factor frente a Colombia: ×0,1550 en tecnología y ×0,1773 en áreas creativas.
- **Advertencias de la investigación:** Franco CFA (BEAC) con paridad fija al euro. Impuestos y seguridad social con buena fuente (PwC, ISSA); salario mínimo posiblemente desactualizado (2022); salarios de una sola guía; costo de vida muy incierto (Malabo es caro para extranjeros, barato en estimaciones locales); electricidad sin dato. Economía dependiente del petróleo y muy concentrada en el sector público.
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://www.issa.int/sites/default/files/documents/2024-07/Equatorial%20Guinea.pdf>
  - Costo de vida: <https://nomad.watch/cities/GQ/malabo/costs>
  - Costo de vida: <https://africarrieres.com/equatorial-guinea/en/guide/decouvrir/cost-of-living>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/equatorial-guinea/individual/other-taxes>
  - Aportes a seguridad social: <https://www.issa.int/sites/default/files/documents/2024-07/Equatorial%20Guinea.pdf>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/equatorial-guinea/corporate/withholding-taxes>
  - Salarios de desarrollo: <https://africarrieres.com/equatorial-guinea/en/guide/marche-emploi/salary-guide>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://africarrieres.com/equatorial-guinea/en/guide/decouvrir/cost-of-living>

## Guinea-Bisáu (GW, XOF)

- **Ciudad de ejemplo:** Bissau. **Confianza:** baja.
- **Tipo de cambio:** 587,14 XOF por dólar (2026-10-30).
- **Salario mínimo:** 59.000 XOF al mes.
- **IVA:** 19 %; un independiente que empieza normalmente no lo cobra. El IVA es del 19 % desde 2025, pero solo hay que registrarse si se facturan más de 10 millones de XOF al año.
- **Aportes (INSS):** 7,5 % de lo facturado. Aportas entre el 5 % y el 10 % de lo que declaras, según la cobertura que elijas. Usamos el 7,5 %.
- **Retenciones:** ninguna general. No encontramos una retención general sobre honorarios.
- **Gastos de ejemplo al mes:** vivienda 57.000, alimentación 40.000, transporte 7.600, otros 15.000. Costo de vida de la fuente: 402.135 XOF.
- **Costos de trabajar al mes:** internet 47.000, energía 5.100, software 16.000, otros 3.000; computador 650.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 200.000 / 450.000 / 600.000; diseño 140.000 / 315.000 / 420.000. Factor frente a Colombia: ×0,0699 en tecnología y ×0,0799 en áreas creativas.
- **Advertencias de la investigación:** Franco CFA con paridad fija al euro. Salario mínimo sin publicación oficial reciente; IVA nuevo (2025) y retenciones con fuentes secundarias; costo de vida e internet de estimaciones IA; electricidad sin dato. Economía muy informal y mercado de TI pequeño (telecom, bancos, ONG).
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://rivermate.com/guides/guinea-bissau/salary>
  - Costo de vida: <https://nomad.watch/cities/GW/bissau/costs>
  - Impuesto a la venta: <https://rivermate.com/guides/guinea-bissau/taxes>
  - Aportes a seguridad social: <https://www.issa.int/sites/default/files/documents/2024-07/Guinea-Bissau.pdf>
  - Retención sobre honorarios: <https://rivermate.com/guides/guinea-bissau/taxes>
  - Salarios de desarrollo: <https://africarrieres.com/guinea-bissau/en/guide/marche-emploi/salary-guide>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://nomad.watch/cities/GW/bissau/costs>

## Honduras (HN, HNL)

- **Ciudad de ejemplo:** Tegucigalpa. **Confianza:** baja.
- **Tipo de cambio:** 26,8964 HNL por dólar (2026-10-27).
- **Salario mínimo:** 13.292 HNL al mes.
- **ISV:** 15 %; un independiente que empieza normalmente lo cobra. Si estás inscrito, facturas con CAI y cobras el 15 % de ISV a tus clientes del país. Los servicios exportados normalmente no lo llevan.
- **Aportes (IHSS):** 6 % de lo facturado, cuota mínima 1.595 HNL al mes. La afiliación al IHSS es voluntaria para independientes: cerca de L 1,595 al mes sobre un salario mínimo.
- **Retenciones:** Retención ISR honorarios (12.5 %). Quien te paga honorarios retiene el 12.5 % como anticipo del ISR. Si tu impuesto del año es menor, la diferencia es un saldo a tu favor.
- **Impuesto a las transacciones:** tasa de seguridad poblacional, 0,2 %.
- **Gastos de ejemplo al mes:** vivienda 6.900, alimentación 6.400, transporte 530, otros 1.800. Costo de vida de la fuente: 20.337 HNL.
- **Costos de trabajar al mes:** internet 970, energía 340, software 750, otros 390; computador 30.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 27.200 / 52.000 / 72.800; diseño 17.400 / 29.400 / 40.300. Factor frente a Colombia: ×0,00866 en tecnología y ×0,00828 en áreas creativas.
- **Advertencias de la investigación:** El tipo de cambio y el salario mínimo 2026 son oficiales y recientes (el mínimo depende del sector y del tamaño de la empresa). Los datos débiles son: sueldos de Paylab con menos de 20 respuestas, costo de vida de livingcost.org (Numbeo no se pudo leer), formato de afiliación al IHSS de 2012 y precio del computador estimado. Para un junior el ISR anual es bajo (0 % bajo el mínimo exento de L228,324/año; ≈4.5 % con L27,000/mes), pero la retención de 12.5 % de los clientes empresa afecta mucho su flujo de caja. La seguridad social del independiente es voluntaria. San Pedro Sula es el otro gran centro de negocios.
- **Fuentes:**
  - Tipo de cambio: <https://www.laprensa.hn/economia/honduras-precio-dolar-martes-27-octubre-bch-tipo-cambio-KA32450864>
  - Salario mínimo: <https://www.bloomberglinea.com/latinoamerica/honduras/salario-minimo-2026-en-honduras-estos-son-los-nuevos-montos-por-actividad-economica/>
  - Costo de vida: <https://livingcost.org/cost/honduras/tegucigalpa>
  - Impuesto a la venta: <https://ivacalculator.com/honduras/regimen-simplificado/>
  - Aportes a seguridad social: <https://honduras.eregulations.org/media/Convenio%20independientes.pdf>
  - Retención sobre honorarios: <https://invoicedataextraction.com/blog/honduras-withholding-tax-invoices>
  - Impuesto a las transacciones: <https://laprensa.hn/honduras/buscan-ampliar-limite-transacciones-financieras-KL32287940>
  - Salarios de desarrollo: <https://paylab.com/hn/salaryinfo/information-technology/programmer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/hn/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/hn/salaryinfo/journalism-printing-arts-media/junior-graphic-designer?lang=en>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/honduras/>
  - Internet: <https://livingcost.org/cost/honduras/tegucigalpa>
  - Energía: <https://www.globalpetrolprices.com/Honduras/electricity_prices/>

## México (MX, MXN)

- **Ciudad de ejemplo:** Ciudad de México. **Confianza:** alta.
- **Tipo de cambio:** 18,7962 MXN por dólar (2026-10-30).
- **Salario mínimo:** 9.582 MXN al mes.
- **IVA:** 16 %; un independiente que empieza normalmente lo cobra. Como persona física con actividad profesional cobras el 16 % de IVA. Si te paga una empresa, te retiene dos terceras partes de ese IVA.
- **Aportes (IMSS):** 10 % de lo facturado, cuota mínima 1.906 MXN al mes. El IMSS es voluntario para independientes: unos 1,906 MXN al mes cotizando sobre el salario mínimo.
- **Retenciones:** Retención ISR RESICO (1.25 %); Retención ISR honorarios, actividades profesionales (10 %) (se elige a mano). En el RESICO las empresas te retienen el 1.25 % de ISR; en el régimen de actividades profesionales, el 10 %.
- **Gastos de ejemplo al mes:** vivienda 5.200, alimentación 2.300, transporte 140, otros 2.600. Costo de vida de la fuente: 26.000 MXN.
- **Costos de trabajar al mes:** internet 620, energía 120, software 530, otros 250; computador 21.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 19.200 / 32.000 / 51.200; diseño 10.000 / 12.500 / 15.800. Factor frente a Colombia: ×0,00583 en tecnología y ×0,00379 en áreas creativas.
- **Advertencias de la investigación:** Datos oficiales sólidos (Banxico, CONASAMI, LISR/LIVA). Para un junior conviene RESICO: ISR 1–2.5 % sobre ingresos y retención de 1.25 % por personas morales, frente a 10 % de retención y tarifa progresiva en actividades profesionales. La seguridad social del independiente es voluntaria (IMSS PTI o modalidad 44). México no tiene impuesto a las transacciones bancarias (el IDE se derogó en 2014; los bancos solo informan al SAT los depósitos en efectivo mayores a 15,000 MXN/mes). Los sueldos tech varían mucho entre empresas locales y empresas que pagan en USD (nearshore). El costo de vida usa CDMX, la ciudad más cara; Guadalajara o Monterrey son algo más baratas en vivienda.
- **Fuentes:**
  - Tipo de cambio: <https://www.banxico.org.mx/tipcamb/tipCamMIAction.do?idioma=es>
  - Salario mínimo: <https://www.unotv.com/negocios/salario-minimo-2026-aumento-montos-y-fecha-de-entrada-en-vigor/>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Mexico-City>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Mexico-City>
  - Impuesto a la venta: <https://www.diputados.gob.mx/LeyesBiblio/pdf/LIVA.pdf>
  - Aportes a seguridad social: <https://calcforlife.com/es/calculadora-modalidad-10-trabajadores-independientes-imss/>
  - Retención sobre honorarios: <https://praxiumconsultores.com/blog/retenciones-a-freelancers-resico-vs-actividad-profesional>
  - Salarios de desarrollo: <https://www.glassdoor.com/Salaries/mexico-software-developer-salary-SRCH_IL.0,6_IN169_KO7,25.htm>
  - Salarios de desarrollo: <https://talently.tech/herramientas/mexico/salario>
  - Salarios de diseño: <https://www.glassdoor.com.mx/Sueldos/dise%C3%B1ador-gr%C3%A1fico-sueldo-SRCH_KO0,18.htm>
  - Salarios de diseño: <https://mx.talent.com/salary?job=dise%C3%B1ador+grafico>
  - Tarifas de independientes: <https://www.cronoshare.com.mx/cuanto-cuesta/servicio-diseno-grafico>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Mexico-City>
  - Energía: <https://www.globalpetrolprices.com/Mexico/electricity_prices/>

## Mozambique (MZ, MZN)

- **Ciudad de ejemplo:** Maputo. **Confianza:** media.
- **Tipo de cambio:** 63,9100 MZN por dólar (2026-08-20).
- **Salario mínimo:** 10.845 MZN al mes.
- **IVA:** 16 %; un independiente que empieza normalmente no lo cobra. Desde 2026 el pequeño contribuyente puede pagar el ISPC (desde el 3 % de lo que factura) en lugar del IVA y del IRPS, y no cobra IVA.
- **Aportes (INSS + ISPC):** 10 % de lo facturado, cuota mínima 759,15 MZN al mes. Incluye el 7 % del INSS sobre lo que declaras (mínimo un salario mínimo del sector) y el 3 % del ISPC.
- **Retenciones:** Retenção IRPS trabalho independente (20 %) (se elige a mano). En el régimen general, las entidades con contabilidad organizada retienen el 20 % de IRPS. En el ISPC normalmente no hay retención.
- **Gastos de ejemplo al mes:** vivienda 9.200, alimentación 4.200, transporte 520, otros 1.600. Costo de vida de la fuente: 44.596 MZN.
- **Costos de trabajar al mes:** internet 5.600, energía 470, software 1.800, otros 390; computador 70.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 25.000 / 55.000 / 91.500; diseño 19.400 / 32.200 / 44.700. Factor frente a Colombia: ×0,00926 en tecnología y ×0,00916 en áreas creativas.
- **Advertencias de la investigación:** Moneda estable. Reforma fiscal 2026 (fin de la exención de IVA para pequeños, nuevo ISPC con umbral de 4 M MT): conviene revisar la reglamentación (prevista para mediados de 2026). Salarios con pocas respuestas en Paylab; no se encontraron tarifas freelance locales.
- **Fuentes:**
  - Tipo de cambio: <https://www.bancomoc.mz/media/g0zlcvgk/taxas-de-câmbio-de-referência-do-mercado-cambial-do-dia-20082026.pdf>
  - Salario mínimo: <https://wageindicator.org/pt-mz/trabalho-em-mocambique/salario-minimo/>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Maputo?displayCurrency=MZN>
  - Impuesto a la venta: <https://www.rsm.global/mozambique/sites/default/files/media/documents/Mo%C3%A7ambique%20Guia%20Fiscal%202026.PT%20_0.pdf>
  - Aportes a seguridad social: <https://un.social-protection.org/gimi/Media.action?id=18633>
  - Retención sobre honorarios: <https://www.rsm.global/mozambique/sites/default/files/media/documents/Mo%C3%A7ambique%20Guia%20Fiscal%202026.PT%20_0.pdf>
  - Salarios de desarrollo: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Maputo?displayCurrency=MZN>
  - Energía: <https://www.globalpetrolprices.com/Mozambique/electricity_prices/>

## Nicaragua (NI, NIO)

- **Ciudad de ejemplo:** Managua. **Confianza:** baja.
- **Tipo de cambio:** 36,6243 NIO por dólar (2026-10-16).
- **Salario mínimo:** 8.320 NIO al mes.
- **IVA:** 15 %; un independiente que empieza normalmente lo cobra. Los servicios profesionales pagan IVA: si estás inscrito, cobras el 15 % a tus clientes del país.
- **Aportes (INSS):** 15 % de lo facturado, cuota mínima 1.851 NIO al mes. Como asegurado facultativo pagas tú solo la cuota del INSS sobre el salario que declares. Usamos una estimación sin verificar.
- **Retenciones:** Retención IR servicios profesionales (10 %); Retención IR compras de bienes y servicios (2 %) (se elige a mano). Las empresas retienen el 10 % de IR al pagar servicios profesionales.
- **Gastos de ejemplo al mes:** vivienda 2.800, alimentación 2.000, transporte 50, otros 2.300. Costo de vida de la fuente: 31.445 NIO.
- **Costos de trabajar al mes:** internet 1.200, energía 380, software 1.000, otros 180; computador 40.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 12.000 / 23.300 / 31.900; diseño 8.320 / 10.300 / 14.100. Factor frente a Colombia: ×0,00383 en tecnología y ×0,00322 en áreas creativas.
- **Advertencias de la investigación:** Lo oficial y fiable: el tipo de cambio del BCN (estable, prácticamente fijo) y el IVA, IR y retenciones de PwC (revisado en agosto de 2026). Lagunas: el salario mínimo de comercio/servicios (solo se obtuvo el de manufactura), las tasas del seguro facultativo del INSS (no verificadas), sueldos de Paylab con muestra pequeña y ninguna tarifa freelance local encontrada (Lemon.io no tiene página para Nicaragua). Costo de vida de Numbeo actualizado a oct. 2026, pero con perfil de clase media. No encontré impuesto a las transacciones bancarias.
- **Fuentes:**
  - Tipo de cambio: <https://www.bcn.gob.ni/>
  - Salario mínimo: <https://tradingeconomics.com/nicaragua/minimum-wages>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Managua>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Managua>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/nicaragua/corporate/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/nicaragua/corporate/other-taxes>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/nicaragua/corporate/withholding-taxes>
  - Salarios de desarrollo: <https://www.paylab.com/ni/salaryinfo/information-technology/programmer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/ni/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Salarios de diseño: <https://tradingeconomics.com/nicaragua/minimum-wages>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Managua>
  - Energía: <https://www.globalpetrolprices.com/Nicaragua/electricity_prices/>

## Panamá (PA, USD)

- **Ciudad de ejemplo:** Ciudad de Panamá. **Confianza:** media.
- **Tipo de cambio:** 1,0000 USD por dólar (2026-10-31).
- **Salario mínimo:** 651,04 USD al mes.
- **ITBMS:** 7 %; un independiente que empieza normalmente no lo cobra. Si facturas menos de USD 36,000 al año no tienes que cobrar el 7 % de ITBMS.
- **Aportes (CSS):** 10 % de lo facturado. Los independientes cotizan a la CSS sobre lo que declaran. Usamos una estimación cercana a la cuota de un asalariado (10 %).
- **Retenciones:** ninguna general. Las empresas no retienen ISR al pagar a un profesional independiente residente: tú lo declaras y lo pagas.
- **Gastos de ejemplo al mes:** vivienda 600, alimentación 260, transporte 19, otros 81. Costo de vida de la fuente: 1.250 USD.
- **Costos de trabajar al mes:** internet 52, energía 10, software 28, otros 24; computador 1.100.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 1.760 / 3.200 / 4.490; diseño 985 / 1.710 / 2.310. Factor frente a Colombia: ×0,00054 en tecnología y ×0,00048 en áreas creativas.
- **Advertencias de la investigación:** Economía dolarizada (balboa a la par): sin riesgo cambiario. ITBMS bajo (7 %) con umbral de inscripción de USD 36,000 al año (no verificado); el ISR grava solo la renta de fuente panameña, lo que favorece a quien trabaja para clientes del exterior. Lagunas: la cotización de independientes a la CSS (obligatoria, tasa no verificada tras la reforma de 2025), el salario mínimo de comercio (solo el de manufactura, región 1) y tarifas freelance locales (Lemon.io no tiene página para Panamá). Sueldos de Paylab con muestra pequeña. No hay impuesto a las transacciones bancarias.
- **Fuentes:**
  - Tipo de cambio: <https://tradingeconomics.com/panama/minimum-wages>
  - Salario mínimo: <https://tradingeconomics.com/panama/minimum-wages>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Panama-City>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Panama-City>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/panama/corporate/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/panama/individual/other-taxes>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/panama/individual/taxes-on-personal-income>
  - Salarios de desarrollo: <https://www.paylab.com/pa/salaryinfo/information-technology/programmer?lang=en>
  - Salarios de diseño: <https://www.paylab.com/pa/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Panama-City>
  - Energía: <https://www.globalpetrolprices.com/electricity_prices/>

## Paraguay (PY, PYG)

- **Ciudad de ejemplo:** Asunción. **Confianza:** baja.
- **Tipo de cambio:** 5.944,76 PYG por dólar (2026-10-30).
- **Salario mínimo:** 2.899.408 PYG al mes.
- **IVA:** 10 %; un independiente que empieza normalmente lo cobra. Los servicios personales pagan IVA: si estás inscrito en el RUC, facturas el 10 % y lo liquidas cada mes.
- **Aportes (IPS):** 0 % de lo facturado. Para independientes el IPS es voluntario, así que no lo sumamos. Sin él no tienes jubilación ni salud: si cotizas o pagas un seguro, pon esa tasa en "Cómo calculamos".
- **Retenciones:** ninguna general. No encontramos una retención general cuando una empresa te paga honorarios.
- **Gastos de ejemplo al mes:** vivienda 1.500.000, alimentación 810.000, transporte 130.000, otros 300.000. Costo de vida de la fuente: 4.367.567 PYG.
- **Costos de trabajar al mes:** internet 130.000, energía 23.000, software 170.000, otros 68.000; computador 6.500.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 4.520.000 / 7.530.000 / 12.000.000; diseño 3.390.000 / 5.640.000 / 9.030.000. Factor frente a Colombia: ×1,3713 en tecnología y ×1,6817 en áreas creativas.
- **Advertencias de la investigación:** Datos con huecos importantes: salario mínimo vigente posiblemente desactualizado (no se verificó el reajuste de julio 2026), sueldos de desarrollador con muestra mínima (12 datos en levels.fyi) y de diseñador estimados por relación con otro país, sin precio local de computador ni tarifas freelance. Lo fiscal sí está claro: IVA 10 % sobre servicios personales; IRP solo por encima de Gs 80 M/año (8-10 %); seguridad social voluntaria para independientes (por eso la tasa efectiva es ≈ 0, pero sin jubilación ni salud). Economía estable, guaraní fuerte en 2026 (≈ 5.945 Gs/USD BCP al 30-10-2026).
- **Fuentes:**
  - Tipo de cambio: <https://www.bcp.gov.py/webapps/web/cotizacion/monedas>
  - Salario mínimo: <https://wageindicator.org/es-py/trabajo-en-paraguay/salario-minimo>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Asuncion>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Asuncion?displayCurrency=USD>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/paraguay/individual/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/paraguay/individual/taxes-on-personal-income>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/paraguay/individual/tax-administration>
  - Salarios de desarrollo: <https://www.levels.fyi/t/software-engineer/locations/paraguay>
  - Salarios de diseño: <https://www.levels.fyi/t/software-engineer/locations/paraguay>
  - Salarios de diseño: <https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Asuncion>
  - Energía: <https://www.globalpetrolprices.com/Paraguay/electricity_prices/>

## Perú (PE, PEN)

- **Ciudad de ejemplo:** Lima. **Confianza:** media.
- **Tipo de cambio:** 3,4535 PEN por dólar (2026-10-29).
- **Salario mínimo:** 1.130 PEN al mes.
- **IGV:** 18 %; un independiente que empieza normalmente no lo cobra. Si emites recibos por honorarios no cobras IGV.
- **Aportes (ONP / AFP):** 6 % de lo facturado, cuota mínima 147,00 PEN al mes. Para quien emite recibos por honorarios la pensión es voluntaria: en la ONP, el 13 % de lo que declares. Calculamos con la base de una remuneración mínima.
- **Retenciones:** Retención renta de cuarta categoría (8 %). La empresa retiene el 8 % en recibos de más de S/ 1.500. Si en el año vas a ganar menos de S/ 48.125, puedes pedir la suspensión de retenciones a la SUNAT.
- **Impuesto a las transacciones:** ITF (impuesto a las transacciones financieras), 0,005 %.
- **Gastos de ejemplo al mes:** vivienda 840, alimentación 560, transporte 100, otros 210. Costo de vida de la fuente: 2.450 PEN.
- **Costos de trabajar al mes:** internet 92, energía 41, software 97, otros 42; computador 3.800.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 3.300 / 5.500 / 8.500; diseño 1.600 / 2.400 / 3.800. Factor frente a Colombia: ×0,00099 en tecnología y ×0,00074 en áreas creativas.
- **Advertencias de la investigación:** Sol estable (≈ 3,45 por USD). Lo clave para el freelancer: emite recibos por honorarios electrónicos (cuarta categoría), no cobra IGV, la empresa le retiene el 8 % solo si el recibo supera S/ 1.500 y, con ingresos de junior, puede pedir la suspensión de retenciones (umbral 2026 ≈ S/ 48.125/año). En 2026 no hay aporte previsional obligatorio para independientes. Limitaciones: el tipo de cambio viene de un agregador porque el BCRP bloqueó la consulta; varias reglas tributarias (IGV en cuarta categoría, ITF, umbrales de suspensión) se describen según la norma conocida, pero no se verificaron en páginas oficiales porque se agotó el presupuesto de búsquedas; y los salarios son estimaciones a partir de Talently y datos de diseño de 2022-2026.
- **Fuentes:**
  - Tipo de cambio: <https://open.er-api.com/v6/latest/USD>
  - Salario mínimo: <https://www.playroll.com/minimum-wage/peru>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Lima>
  - Impuesto a la venta: <https://taxdo.com/resources/countries/la/peru.md>
  - Aportes a seguridad social: <https://www.playroll.com/minimum-wage/peru>
  - Retención sobre honorarios: <https://www.sunat.gob.pe/indicestasas/uit.html>
  - Impuesto a las transacciones: <https://www.sunat.gob.pe/legislacion/general/index.html>
  - Salarios de desarrollo: <https://talently.tech/herramientas/peru/salario>
  - Salarios de desarrollo: <https://www.payscale.com/research/PE/Job=Software_Developer/Salary>
  - Salarios de diseño: <https://www.aprender21.com/blog/salario-disenador-grafico-2026>
  - Salarios de diseño: <https://www.mercadonegro.pe/publicidad/cuanto-ganan-disenadores-graficos-america-latina>
  - Tarifas de independientes: <https://gestion.pe/economia/management-empleo/freelancers-peruanos-de-que-carreras-son-cuanto-cobran-y-oportunidades-contratacion-tarifa-por-hora-noticia/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Lima>
  - Energía: <https://www.globalpetrolprices.com/Peru/electricity_prices/>

## Portugal (PT, EUR)

- **Ciudad de ejemplo:** Lisboa. **Confianza:** media.
- **Tipo de cambio:** 0,8951 EUR por dólar (2026-10-30).
- **Salario mínimo:** 920,00 EUR al mes.
- **IVA:** 23 %; un independiente que empieza normalmente no lo cobra. Si facturas menos de 15.000 € al año puedes acogerte a la exención del artículo 53 del CIVA y no cobrar el 23 % de IVA.
- **Aportes (Segurança Social):** 15 % de lo facturado, cuota mínima 20,00 EUR al mes. Pagas el 21,4 % sobre el 70 % de lo que facturas (cerca del 15 %). Los primeros 12 meses estás exento.
- **Retenciones:** Retenção na fonte IRS categoria B (23 %); Retenção IRS outras prestações (11,5 %) (se elige a mano). Las empresas retienen el 23 % de IRS. Si facturas menos de 15.000 € al año puedes pedir la dispensa de retención.
- **Gastos de ejemplo al mes:** vivienda 570, alimentación 300, transporte 38, otros 220. Costo de vida de la fuente: 1.190 EUR.
- **Costos de trabajar al mes:** internet 30, energía 14, software 25, otros 28; computador 980.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 1.720 / 2.430 / 3.560; diseño 1.490 / 1.870 / 2.250. Factor frente a Colombia: ×0,00045 en tecnología y ×0,00056 en áreas creativas.
- **Advertencias de la investigación:** Economía estable en euros. Lo fiscal está bien documentado: recibos verdes con Segurança Social 21,4 % sobre el 70 % de lo facturado (exento los primeros 12 meses), IVA 23 % con exención del art. 53.º hasta 15.000 €/año, retención de IRS 23 % (con dispensa opcional bajo 15.000 €). Los salarios vienen de Payscale con muestras pequeñas (sobre todo diseñadores), por eso la confianza es media. No se obtuvo precio de computador (presupuesto de búsqueda agotado).
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://rr.pt/noticia/economia/2025/12/29/agora-e-oficial-subida-do-salario-minimo-para-920-euros-em-2026-publicada-em-diario-da-republica/453287/>
  - Costo de vida: <https://executivedigest.sapo.pt/?p=747117>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Lisbon?displayCurrency=EUR>
  - Impuesto a la venta: <https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx>
  - Aportes a seguridad social: <https://crncontabilidade.pt/blog/calculadora-seguranca-social-2026-para-trabalhadores-independentes-quanto-pagar-de-contribuicoes-irs-e-iva/>
  - Retención sobre honorarios: <https://www.deco.proteste.pt/dinheiro/impostos/dicas/retencao-fonte-recibos-verdes>
  - Salarios de desarrollo: <https://www.payscale.com/research/PT/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary>
  - Salarios de desarrollo: <https://www.payscale.com/research/PT/Job=Software_Engineer_%2F_Developer_%2F_Programmer/Salary/5ba588fa/Early-Career>
  - Salarios de diseño: <https://www.payscale.com/research/PT/Job=Graphic_Designer/Salary>
  - Salarios de diseño: <https://www.payscale.com/research/PT/Job=Senior_Graphic_Designer/Salary>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/portugal/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Lisbon?displayCurrency=EUR>
  - Energía: <https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table>

## Puerto Rico (PR, USD)

- **Ciudad de ejemplo:** San Juan. **Confianza:** media.
- **Tipo de cambio:** 1,0000 USD por dólar (2026-10-31).
- **Salario mínimo:** 1.820 USD al mes.
- **IVU:** 11,5 %; un independiente que empieza normalmente no lo cobra. El IVU general es 11.5 % para servicios a consumidores. Los servicios a otros negocios pagan 4 %, y estás exento si facturas menos de USD 200,000 al año.
- **Aportes (Self-employment tax):** 13 % de lo facturado. Pagas el 15.3 % sobre el 92.35 % de tu ganancia neta (Seguro Social y Medicare): cerca del 13 % de lo que facturas.
- **Retenciones:** Retención en el origen por servicios (10 %). Las empresas retienen el 10 % al pagar servicios. Hacienda puede darte un certificado de relevo de retención.
- **Gastos de ejemplo al mes:** vivienda 1.000, alimentación 400, transporte 250, otros 340. Costo de vida de la fuente: 2.010 USD.
- **Costos de trabajar al mes:** internet 71, energía 20, software 28, otros 49; computador 1.100.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 4.130 / 6.620 / 8.130; diseño 2.140 / 2.850 / 4.050. Factor frente a Colombia: ×0,00112 en tecnología y ×0,00088 en áreas creativas.
- **Advertencias de la investigación:** Economía dolarizada (USD), sin riesgo cambiario. Puntos clave: self-employment tax federal de 15,3 % sobre el 92,35 % de la ganancia neta (Formulario 1040-SS), contribución sobre ingresos local, IVU 11,5 % (B2B 4 % y exento hasta $200.000 de volumen) y retención de 10 % cuando paga una empresa o el gobierno. Salarios oficiales del BLS (mayo 2025) asignados a niveles por percentiles. La electricidad es muy cara y volátil (33,86 ¢/kWh en oct-dic 2026). El costo de vida es estimado (Numbeo de San Juan no se actualiza desde 2024). No se encontraron tarifas freelance locales ni precio de computador (presupuesto de búsqueda agotado).
- **Fuentes:**
  - Tipo de cambio: <https://www.onetonline.org/link/localwages/15-1252.00?st=PR>
  - Salario mínimo: <https://fred.stlouisfed.org/series/STTMINWGPR>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/San-Juan>
  - Costo de vida: <https://www.elnuevodia.com/noticias/locales/notas/nueva-tarifa-record-alza-de-18-lleva-el-costo-del-kilovatio-hora-a-336-centavos/>
  - Impuesto a la venta: <https://trykintsugi.com/es-419/sales-tax-guides/usa/puerto-rico>
  - Aportes a seguridad social: <https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes>
  - Retención sobre honorarios: <https://hacienda.pr.gov/comerciantes/patronos-y-agentes-retenedores/retencion-en-servicios-prestados>
  - Salarios de desarrollo: <https://www.onetonline.org/link/localwages/15-1252.00?st=PR>
  - Salarios de desarrollo: <https://www.bls.gov/oes/2023/may/oes_pr.htm>
  - Salarios de diseño: <https://www.onetonline.org/link/localwages/27-1024.00?st=PR>
  - Internet: <https://www.numbeo.com/cost-of-living/in/San-Juan>
  - Energía: <https://www.elnuevodia.com/noticias/locales/notas/nueva-tarifa-record-alza-de-18-lleva-el-costo-del-kilovatio-hora-a-336-centavos/>

## República Dominicana (DO, DOP)

- **Ciudad de ejemplo:** Santo Domingo. **Confianza:** media.
- **Tipo de cambio:** 60,3200 DOP por dólar (2026-10-28).
- **Salario mínimo:** 29.988 DOP al mes.
- **ITBIS:** 18 %; un independiente que empieza normalmente lo cobra. Si estás inscrito en el RNC, sumas el 18 % de ITBIS. Si te paga una empresa, ella retiene todo el ITBIS y lo paga a la DGII.
- **Aportes (SDSS):** 0 % de lo facturado. No hay un aporte obligatorio para independientes: el régimen para cuenta propia todavía no empieza. Si pagas un seguro de salud o ahorras para tu pensión, pon esa tasa en "Cómo calculamos".
- **Retenciones:** Retención ISR honorarios (15 %). Desde julio de 2026 (Ley 30-26) las empresas retienen el 15 % de ISR sobre honorarios de personas físicas; antes era el 10 %.
- **Impuesto a las transacciones:** impuesto a los cheques y transferencias, 0,2 %.
- **Gastos de ejemplo al mes:** vivienda 8.400, alimentación 5.400, transporte 1.200, otros 3.700. Costo de vida de la fuente: 55.500 DOP.
- **Costos de trabajar al mes:** internet 2.200, energía 390, software 1.700, otros 460; computador 66.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 35.000 / 58.300 / 93.300; diseño 18.400 / 29.600 / 47.400. Factor frente a Colombia: ×0,0106 en tecnología y ×0,00893 en áreas creativas.
- **Advertencias de la investigación:** Peso dominicano estable (≈RD$60 por USD). Reforma fiscal Ley 30-26 de 2026: la retención de ISR a personas físicas por honorarios sube de 10 % a 15 % desde el 1-jul-2026 y el impuesto a cheques y transferencias pasa de 0,15 % a 0,20 % desde el 3-jul-2026; cambios del ISR de personas físicas desde 2027 y RST pendiente de reglamento. No hay seguridad social obligatoria para independientes. Lo fiscal y laboral está bien documentado; los salarios de desarrolladores y diseñadores tienen fuentes débiles y contradictorias (estimados con la regla 0,6×/1,6×). No se obtuvo precio de computador (presupuesto de búsqueda agotado).
- **Fuentes:**
  - Tipo de cambio: <https://revistamercado.do/money-invest/republica-dominicana/precio-del-dolar-hoy-en-republica-dominicana-compra-y-venta-este-miercoles-28-de-octubre-de-2026/>
  - Salario mínimo: <https://www.ey.com/es_ce/technical/tax/tax-alerts/republica-dominicana-salario-minimo-2026>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Santo-Domingo?displayCurrency=DOP>
  - Impuesto a la venta: <https://eldinero.com.do/369509/retencion-de-15-del-isr-igual-que-antes-pero-diferente/>
  - Aportes a seguridad social: <https://dida.panel-dev-pys.ogtic.gob.do/wp-content/uploads/2024/10/ABC-No.-40-Febrero-2024-generalidades-del-Sistema-Dominicano-de-la-Seguridad-Social.pdf>
  - Retención sobre honorarios: <https://eldinero.com.do/369509/retencion-de-15-del-isr-igual-que-antes-pero-diferente/>
  - Impuesto a las transacciones: <https://siemprealdia.co/republica-dominicana/impuestos/calendario-de-implementacion-de-la-ley-30-26/>
  - Salarios de desarrollo: <https://www.payscale.com/research/DO/Job=Software_Developer/Salary>
  - Salarios de desarrollo: <https://www.paylab.com/do/salarios/tecnologias-de-la-informacion/programador-java?lang=es>
  - Salarios de diseño: <https://www.payscale.com/research/DO/Job=Graphic_Designer/Salary>
  - Salarios de diseño: <https://www.ey.com/es_ce/technical/tax/tax-alerts/republica-dominicana-salario-minimo-2026>
  - Tarifas de independientes: <https://lemon.io/rate-calculator/dominican-republic/>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Santo-Domingo?displayCurrency=DOP>
  - Energía: <https://www.globalpetrolprices.com/Dominican-Republic/electricity_prices/>

## Santo Tomé y Príncipe (ST, STN)

- **Ciudad de ejemplo:** São Tomé. **Confianza:** baja.
- **Tipo de cambio:** 21,9300 STN por dólar (2026-10-30).
- **Salario mínimo:** 3.000 STN al mes.
- **IVA:** 15 %; un independiente que empieza normalmente no lo cobra. Si facturas menos de 1.000.000 STN al año no cobras IVA, pero pagas el 7 % de lo que facturas.
- **Aportes (INSS):** 17 % de lo facturado. Incluye el 10 % del INSS sobre lo que declaras y el 7 % sobre la facturación del régimen de exención del IVA.
- **Retenciones:** Retenção IRS categoria B (15 %) (se elige a mano). Sobre trabajo independiente puede haber una retención del 15 % como pago a cuenta del IRS.
- **Gastos de ejemplo al mes:** vivienda 1.300, alimentación 1.300, transporte 180, otros 430. Costo de vida de la fuente: 10.899 STN.
- **Costos de trabajar al mes:** internet 880, energía 320, software 610, otros 80; computador 24.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 5.300 / 7.500 / 9.700; diseño 3.710 / 5.250 / 6.790. Factor frente a Colombia: ×0,00135 en tecnología y ×0,00154 en áreas creativas.
- **Advertencias de la investigación:** Economía muy pequeña con paridad fija al euro. Salario mínimo e IVA con fuente; seguridad social, retención y costo de vida vienen de fuentes secundarias o estimaciones de IA; salarios estimados por ratio. Mercado de TI local muy pequeño; no se encontraron tarifas freelance locales.
- **Fuentes:**
  - Tipo de cambio: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html>
  - Salario mínimo: <https://wageindicator.org/pt-st/trabalho-em-sao-tome-e-principe/salario-minimo/>
  - Costo de vida: <https://nomad.watch/cities/ST/sao-tome/costs>
  - Impuesto a la venta: <https://vatcalc.com/?p=25943>
  - Aportes a seguridad social: <https://immigrantinvest.com/de/blog/sao-tome-and-principe-taxes/>
  - Retención sobre honorarios: <https://immigrantinvest.com/de/blog/sao-tome-and-principe-taxes/>
  - Salarios de desarrollo: <https://wageindicator.org/pt-st/trabalho-em-sao-tome-e-principe/salario-minimo/>
  - Salarios de desarrollo: <https://africarrieres.com/cape-verde/en/guide/marche-emploi/salary-guide>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://360nations.com/africa/sao-tome-and-principe/cost-utilities-internet.html>
  - Energía: <https://360nations.com/africa/sao-tome-and-principe/cost-utilities-internet.html>

## Timor Oriental (TL, USD)

- **Ciudad de ejemplo:** Díli. **Confianza:** baja.
- **Tipo de cambio:** 1,0000 USD por dólar (2026-10-30).
- **Salario mínimo:** 115,00 USD al mes.
- **IVA:** 0 %; un independiente que empieza normalmente no lo cobra. Timor-Leste no tiene IVA.
- **Aportes (sin régimen):** 0 % de lo facturado. No encontramos un régimen de seguridad social para independientes.
- **Retenciones:** ninguna general. No hay retención sobre honorarios pagados a profesionales residentes.
- **Gastos de ejemplo al mes:** vivienda 110, alimentación 44, transporte 11, otros 25. Costo de vida de la fuente: 805 USD.
- **Costos de trabajar al mes:** internet 55, energía 8,50, software 28, otros 4,50; computador 1.100.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 320 / 600 / 815; diseño 225 / 420 / 570. Factor frente a Colombia: ×0,00010 en tecnología y ×0,00011 en áreas creativas.
- **Advertencias de la investigación:** Economía dolarizada (sin riesgo cambiario). Impuestos claros y bajos (sin IVA, sin retención a profesionales residentes; PwC). Salario mínimo antiguo y sin verificar; salarios estimados por comparación regional; costo de vida e internet de estimaciones IA; electricidad sin dato; seguridad social de independientes no confirmada.
- **Fuentes:**
  - Tipo de cambio: <https://taxsummaries.pwc.com/timor-leste/individual/taxes-on-personal-income>
  - Salario mínimo: <https://rivermate.com/guides/timor-leste/salary>
  - Costo de vida: <https://nomad.watch/cities/TL/dili/costs>
  - Impuesto a la venta: <https://taxsummaries.pwc.com/timor-leste/corporate/other-taxes>
  - Aportes a seguridad social: <https://taxsummaries.pwc.com/timor-leste/individual/other-taxes>
  - Retención sobre honorarios: <https://taxsummaries.pwc.com/timor-leste/corporate/withholding-taxes>
  - Salarios de desarrollo: <https://worldsalaries.com/average-software-developer-salary-in-angola/>
  - Salarios de desarrollo: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salarios/tecnologia-da-informacao/programador?lang=pt>
  - Salarios de diseño: <https://www.paylab.com/mz/salaryinfo/marketing-advertising-pr/graphic-designer?lang=en>
  - Internet: <https://nomad.watch/cities/TL/dili/costs>

## Uruguay (UY, UYU)

- **Ciudad de ejemplo:** Montevideo. **Confianza:** media.
- **Tipo de cambio:** 40,2100 UYU por dólar (2026-10-30).
- **Salario mínimo:** 25.383 UYU al mes.
- **IVA:** 22 %; un independiente que empieza normalmente lo cobra. Los servicios personales pagan IVA del 22 % y no hay exención por facturar poco.
- **Aportes (BPS + FONASA):** 14 % de lo facturado, cuota mínima 8.833 UYU al mes. Los aportes al BPS son fijos según tu categoría, no un porcentaje: la categoría 1 con FONASA cuesta unos UYU 8.833 al mes.
- **Retenciones:** Retención IRPF servicios personales (7 %) (se elige a mano). Solo retienen el 7 % de IRPF las grandes empresas y el Estado. Si ganas poco, lo recuperas en la declaración anual.
- **Gastos de ejemplo al mes:** vivienda 21.000, alimentación 10.000, transporte 2.300, otros 4.600. Costo de vida de la fuente: 49.978 UYU.
- **Costos de trabajar al mes:** internet 1.700, energía 600, software 1.100, otros 940; computador 44.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 62.500 / 97.500 / 130.000; diseño 47.500 / 72.500 / 95.000. Factor frente a Colombia: ×0,0171 en tecnología y ×0,0208 en áreas creativas.
- **Advertencias de la investigación:** Economía estable, con inflación de un dígito y tipo de cambio libre (~40 UYU/USD). Muchos freelancers tech exportan servicios (sin IVA) y cobran en USD. Para clientes locales hay que sumar IVA 22 % a la tarifa. El aporte BPS es fijo (ficto), no un porcentaje: la tasa efectiva depende de cuánto se facture. Faltan: montos 2026 de la Caja de Profesionales (reformada por Ley 20.410), precio local de computador y una encuesta salarial independiente (CUTI/Advice); los salarios vienen de rangos agregados de Coderhouse.
- **Fuentes:**
  - Tipo de cambio: <https://www.poundsterlinglive.com/history/USD-UYU-2026>
  - Salario mínimo: <https://www.impo.com.uy/bases/decretos/319-2025>
  - Costo de vida: <https://www.numbeo.com/cost-of-living/in/Montevideo?displayCurrency=UYU>
  - Costo de vida: <https://www.numbeo.com/food-prices/in/Montevideo>
  - Impuesto a la venta: <https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/2024-04/IVA%20SERVICIOS%20PERSONALES%20-%202023.pdf>
  - Aportes a seguridad social: <https://www.bps.gub.uy/6665/industria-y-comercio.html>
  - Retención sobre honorarios: <https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/documentos/publicaciones/Aspectos%20generales%20de%20la%20tributaci%C3%B3n%20del%20IRPF.pdf>
  - Salarios de desarrollo: <https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-full-stack-uruguay-2025>
  - Salarios de desarrollo: <https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-aplicaciones-uruguay-2025>
  - Salarios de diseño: <https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025>
  - Tarifas de independientes: <https://www.coderhouse.com/uy/sueldos/sueldo-desarrollador-full-stack-uruguay-2025>
  - Tarifas de independientes: <https://www.coderhouse.com/uy/sueldos/sueldo-disenador-ux-ui-uruguay-2025>
  - Internet: <https://www.numbeo.com/cost-of-living/in/Montevideo?displayCurrency=UYU>
  - Energía: <https://www.impo.com.uy/bases/decretos/339-2025>

## Venezuela (VE, VES)

- **Ciudad de ejemplo:** Caracas. **Confianza:** baja.
- **Tipo de cambio:** 889,26 VES por dólar (2026-10-30).
- **Salario mínimo:** 213.421 VES al mes.
- **IVA:** 16 %; un independiente que empieza normalmente lo cobra. Quien factura formalmente a empresas del país cobra el 16 % de IVA. Los servicios a clientes del exterior van al 0 %.
- **Aportes (IVSS):** 0 % de lo facturado. La afiliación al IVSS es voluntaria y su costo es muy bajo, así que no la sumamos.
- **Retenciones:** Retención ISLR honorarios (3 %). Las empresas retienen el 3 % de ISLR sobre honorarios de personas naturales residentes.
- **Impuesto a las transacciones:** IGTF (impuesto a las grandes transacciones financieras), 3 %.
- **Gastos de ejemplo al mes:** vivienda 120.000, alimentación 62.000, transporte 8.600, otros 27.000. Costo de vida de la fuente: 564.676 VES.
- **Costos de trabajar al mes:** internet 26.000, energía 2.400, software 25.000, otros 5.400; computador 890.000.
- **Salarios mensuales (junior / semi-senior / senior):** desarrollo 356.000 / 622.000 / 1.070.000; diseño 267.000 / 400.000 / 667.000. Factor frente a Colombia: ×0,1144 en tecnología y ×0,1252 en áreas creativas.
- **Advertencias de la investigación:** Economía de facto dolarizada con un bolívar en fuerte depreciación (BCV +191 % entre enero y octubre de 2026) y una brecha con el dólar paralelo/USDT de ~17-20 % en julio-agosto. La mayoría de los freelancers cotiza y cobra en USD (efectivo, Zelle, USDT/Binance, PayPal) o en Bs al tipo del día. Recomendación para la app: calcular en USD y mostrar los Bs al BCV del día; no fijar montos en bolívares. Los montos en Bs de este archivo se calcularon a 889,2553 Bs/USD y se desactualizan en semanas. El salario mínimo base sigue en 130 Bs, y lo relevante es el ingreso mínimo integral de USD 240 en bonos. Hubo transición política en 2026 (Delcy Rodríguez como presidenta encargada) y apertura parcial de la economía. Faltan encuestas salariales recientes por cargo, así que los salarios y el costo de vida son estimaciones.
- **Fuentes:**
  - Tipo de cambio: <https://finanzasdigital.com/category/tasa-bcv/>
  - Salario mínimo: <https://www.infobae.com/venezuela/2026/05/05/venezuela-aplaza-de-nuevo-la-reforma-salarial-el-aumento-a-240-dolares-ira-en-bonos-no-en-salario/>
  - Costo de vida: <https://expatistan.com/cost-of-living/caracas>
  - Costo de vida: <https://eldiario.com/2026/03/23/canasta-alimentaria-venezuela-febrero-2026/>
  - Impuesto a la venta: <https://taxdo.com/resources/countries/la/venezuela.md>
  - Aportes a seguridad social: <https://eldiario.com/2024/04/07/ivss-pasos-para-cotizar-trabajador-independiente-venezuela/>
  - Retención sobre honorarios: <https://www.forvismazars.com/ve/es/insights/forvis-mazars-insights/tabla-de-retenciones-islr-ut-9-00-bs-may-2023>
  - Impuesto a las transacciones: <https://finanzasdigital.com/glosario/igtf/>
  - Salarios de desarrollo: <https://www.bloomberglinea.com/latinoamerica/venezuela/salarios-de-sector-privado-se-erosionan-en-venezuela-por-inflacion-esto-gana-un-gerente/>
  - Salarios de desarrollo: <https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/>
  - Salarios de diseño: <https://www.bloomberglinea.com/latinoamerica/venezuela/salarios-de-sector-privado-se-erosionan-en-venezuela-por-inflacion-esto-gana-un-gerente/>
  - Salarios de diseño: <https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/>
  - Tarifas de independientes: <https://eldiario.com/2024/12/09/cuanto-ganan-profesionales-informatica-venezuela-otro-paises-latinoamerica/>
  - Internet: <https://expatistan.com/cost-of-living/caracas>
  - Energía: <https://www.globalpetrolprices.com/Venezuela/electricity_prices/>
