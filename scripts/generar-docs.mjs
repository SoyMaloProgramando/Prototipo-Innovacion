#!/usr/bin/env node
/**
 * Genera la documentación que depende de los datos de la app, para que
 * nunca quede desactualizada:
 *   docs/CATALOGO_DE_PRODUCTOS.md  ← src/datos/catalogo*.js
 *   docs/PLAN_DE_TRABAJO.md        ← src/datos/planTrabajo.js
 *
 * Uso: npm run docs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CARRERAS, categoriasDeCarrera, productosDeCategoria, PRODUCTOS } from '../src/datos/catalogo.js';
import { BANDAS_MERCADO, PARAMETROS_2026 } from '../src/datos/parametros.js';
import { FASES, INDICADORES, RIESGOS, TOTAL_HORAS_PLAN } from '../src/datos/planTrabajo.js';
import { PROYECTO } from '../src/datos/proyecto.js';
import { ACCIONES, cotizadorReducer } from '../src/estado/cotizadorReducer.js';
import { crearEstadoInicial } from '../src/estado/estadoInicial.js';
import { calcularCotizacion } from '../src/logica/calculadora.js';
import { formatoCompacto, formatoCOP, formatoHoras } from '../src/logica/formato.js';
import { horasPorNivel } from '../src/logica/horas.js';
import { rangosMercado } from '../src/logica/mercado.js';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');

// ── Catálogo ────────────────────────────────────────────────────────
function catalogo() {
  const partes = [
    '# Catálogo de productos',
    '',
    `${PRODUCTOS.length} productos que un recién egresado puede cotizar con TarifaJusta. Este archivo se genera con \`npm run docs\` a partir de \`src/datos/\`.`,
    '',
    'Cómo leer la tabla:',
    '',
    '- **Se mide por**: la unidad con la que se cuenta el tamaño del trabajo y el valor típico.',
    '- **Horas**: horas de referencia del catálogo para el tamaño típico, en nivel básico, intermedio y avanzado.',
    '- **Junior cobra**: rango de precio de mercado para un junior, en nivel intermedio y tamaño típico (sin costos directos).',
    '- **Fórmula de horas**: `horas base × factor del nivel + unidades × horas por unidad`. Factor del nivel: básico 0,75, intermedio 1, avanzado 1,4.',
    '',
  ];

  for (const carrera of Object.values(CARRERAS)) {
    const categorias = categoriasDeCarrera(carrera.id);
    const total = categorias.reduce((s, c) => s + productosDeCategoria(c.id).length, 0);
    partes.push(`## ${carrera.nombre} (${total})`, '');
    for (const categoria of categorias) {
      const banda = BANDAS_MERCADO[categoria.area];
      partes.push(
        `### ${categoria.nombre}`,
        '',
        `Tarifas de referencia: ${banda.nombre.toLowerCase()} (junior ${formatoCOP(banda.junior[0])} a ${formatoCOP(banda.junior[1])} por hora).`,
        '',
        '| Producto | Se mide por | Horas básico / intermedio / avanzado | Junior cobra | Horas base | Horas por unidad (b / i / a) |',
        '|---|---|---|---|---|---|',
      );
      for (const p of productosDeCategoria(categoria.id)) {
        const h = horasPorNivel(p);
        const m = rangosMercado({ producto: p, unidades: p.unidades.defecto, complejidad: 'intermedio' });
        const hpu = p.horasPorUnidad;
        partes.push(
          `| **${p.nombre}**<br>${p.descripcion} | ${p.unidad.singular} (típico ${p.unidades.defecto}) | ${formatoHoras(h.basico)} / ${formatoHoras(
            h.intermedio,
          )} / ${formatoHoras(h.avanzado)} | ${formatoCompacto(m.junior.min)} a ${formatoCompacto(m.junior.max)} | ${p.horasBase} h | ${
            hpu.basico
          } / ${hpu.intermedio} / ${hpu.avanzado} h |`,
        );
      }
      partes.push('');
    }
  }
  return partes.join('\n');
}

// ── Valor del propio prototipo, calculado con la lógica de la app ───
function valorDelPrototipo() {
  let estado = crearEstadoInicial('sistemas');
  estado = cotizadorReducer(estado, { tipo: ACCIONES.ELEGIR_PRODUCTO, id: 'sis-app-web' });
  estado = cotizadorReducer(estado, { tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo: 'unidades', valor: 6 });
  estado = cotizadorReducer(estado, { tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo: 'especialidad', valor: 60 });
  estado = cotizadorReducer(estado, { tipo: ACCIONES.ACTUALIZAR_PROYECTO, campo: 'horasEstimadas', valor: TOTAL_HORAS_PLAN });
  estado = cotizadorReducer(estado, { tipo: ACCIONES.ACTUALIZAR_CONDICIONES, campo: 'tipoCliente', valor: 'publica' });
  return calcularCotizacion(estado);
}

// ── Plan de trabajo ─────────────────────────────────────────────────
function plan() {
  const r = valorDelPrototipo();
  const filas = FASES.flatMap((fase, i) =>
    fase.actividades.map(
      (a, j) =>
        `| ${j === 0 ? `**${i + 1}. ${fase.nombre}**` : ''} | ${j === 0 ? fase.semanas.map((s) => `S${s}`).join(', ') : ''} | ${a.nombre} | ${
          a.horas
        } h | ${j === 0 ? fase.entregable : ''} |`,
    ),
  );

  return `# Plan de trabajo: ${PROYECTO.nombre}

**${PROYECTO.lema}.**
${PROYECTO.programa}, ${PROYECTO.universidad}, ${PROYECTO.ciudad}, ${PROYECTO.anio}. Autor: ${PROYECTO.autores.join(', ')}.

> Este archivo se genera con \`npm run docs\` a partir de \`src/datos/planTrabajo.js\`, el mismo que muestra la página "El proyecto" de la app.

## 1. Problema

Al graduarse, la mayoría de ingenieros de Sistemas y de Multimedia recibe sus primeros encargos sin saber cuánto cobrar. Ponen un precio al azar, copian el de un amigo o cobran tan poco que pierden dinero: olvidan los aportes a seguridad social, la retención en la fuente, las horas que no se pueden cobrar y el desgaste del equipo.

## 2. Objetivo general

Construir un prototipo web en React que calcule un precio justo para los productos de un recién egresado de Ingeniería de Sistemas o de Ingeniería en Multimedia, a partir de sus horas, la tarifa que quiere ganar y su nivel de especialidad en el tema, y validarlo con estudiantes por medio de un enlace público de ngrok.

## 3. Objetivos específicos

1. Construir un catálogo de ${PRODUCTOS.length} productos (32 de Sistemas y 48 de Multimedia) con unidad de medida y horas de referencia por complejidad.
2. Diseñar una lógica de negocio transparente que convierta horas, tarifa, especialidad (0 a 100 %) y condiciones comerciales en un precio sugerido, un piso y un rango de mercado.
3. Implementar la app con React y estado global (useReducer + Context), sin base de datos.
4. Documentar la lógica con diagramas de flujo y pruebas automáticas.
5. Publicar el prototipo con ngrok y medir su usabilidad con al menos 20 estudiantes.

## 4. Alcance

**Incluye:** catálogo, asistente de 4 pasos, cálculo en vivo, resultado con gráficas y recomendaciones, comparación con el mercado, historial en memoria con exportación JSON y CSV, cotización imprimible para el cliente, parámetros de Colombia ${PARAMETROS_2026.anio} editables y acceso remoto por ngrok.

**No incluye:** base de datos, cuentas de usuario, facturación electrónica ni asesoría tributaria. Las cifras son de referencia.

## 5. Metodología

Design Thinking por fases (empatizar, definir, idear, prototipar, probar) y, dentro de la fase de prototipo, tres sprints de una semana con entregas funcionales. Cada sprint termina con la app corriendo y las pruebas automáticas en verde.

## 6. Fases, actividades y entregables

| Fase | Semana | Actividad | Horas | Entregable |
|---|---|---|---|---|
${filas.join('\n')}
| | | **Total** | **${TOTAL_HORAS_PLAN} h** | |

## 7. Cronograma

![Cronograma de 8 semanas](diagramas/cronograma.png)

Semana 1 es la semana en que empiece el proyecto. El código del diagrama está en \`docs/diagramas/cronograma.mmd\`.

## 8. Recursos

| Recurso | Detalle | Costo |
|---|---|---|
| Equipo humano | ${PROYECTO.autores.length} ${PROYECTO.autores.length === 1 ? 'persona' : 'personas'} (desarrollo, diseño e investigación) | Horas del plan |
| Computador | Windows 11 con Node.js 22 o superior | Propio |
| Software | VS Code, Node.js, React, Vite, Vitest, Figma (plan gratuito) | $ 0 |
| Publicación | ngrok, plan gratuito (1 dominio de desarrollo, 1 GB al mes) | $ 0 |
| Validación | Formulario de encuesta SUS (Google Forms o Microsoft Forms) | $ 0 |

**Valor del trabajo calculado con la propia lógica de TarifaJusta:** ${TOTAL_HORAS_PLAN} h estimadas de una aplicación web a la medida (6 módulos, nivel intermedio, 60 % de dominio, cliente entidad pública) darían un precio sugerido de **${formatoCOP(
    r.precio.sinIva,
  )}**, con un piso de ${formatoCOP(r.rango.piso)} (${formatoHoras(r.horas.facturables)} a cobrar a ${formatoCOP(r.tarifas.ajustada)} por hora).

## 9. Riesgos y cómo se manejan

| Riesgo | Mitigación |
|---|---|
${RIESGOS.map((x) => `| ${x.riesgo} | ${x.mitigacion} |`).join('\n')}

## 10. Indicadores de éxito

${INDICADORES.map((i) => `- ${i}`).join('\n')}

## 11. Protocolo de prueba con estudiantes

1. **Antes:** ejecutar \`COMPARTIR_CON_NGROK.bat\`, proyectar el código QR y verificar el enlace desde un celular.
2. **Tarea guiada (5 minutos):** "Eres recién egresado y un cliente te pide un logotipo (Multimedia) o una landing page (Sistemas). Calcula cuánto cobrar y guarda la cotización."
3. **Tarea libre (5 minutos):** cotizar un producto real que el estudiante haya hecho o quiera vender.
4. **Encuesta SUS (10 preguntas, escala de 1 a 5)** más tres preguntas propias:
   - ¿Entendiste de dónde sale el precio? (sí, más o menos, no)
   - ¿El precio sugerido te pareció justo? (bajo, justo, alto)
   - ¿Qué cambiarías?
5. **Después:** calcular el puntaje SUS, agrupar los comentarios y priorizar los ajustes de la semana 8.

### Preguntas SUS en español

1. Creo que me gustaría usar esta herramienta con frecuencia.
2. Encontré la herramienta innecesariamente compleja.
3. Pensé que la herramienta era fácil de usar.
4. Creo que necesitaría ayuda de una persona técnica para poder usarla.
5. Las funciones de la herramienta están bien integradas.
6. Pensé que había demasiada inconsistencia en la herramienta.
7. Imagino que la mayoría de las personas aprendería a usarla muy rápido.
8. Encontré la herramienta muy difícil de usar.
9. Me sentí muy seguro usando la herramienta.
10. Necesité aprender muchas cosas antes de poder usarla.

Puntaje: a las preguntas impares se les resta 1; a 5 se le resta la respuesta de las pares; se suman y se multiplican por 2,5. Un resultado de 68 o más es aceptable.
`;
}

writeFileSync(join(DOCS, 'CATALOGO_DE_PRODUCTOS.md'), `${catalogo()}\n`, 'utf8');
writeFileSync(join(DOCS, 'PLAN_DE_TRABAJO.md'), plan(), 'utf8');
console.log('Listo: docs/CATALOGO_DE_PRODUCTOS.md y docs/PLAN_DE_TRABAJO.md');
