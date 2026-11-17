import { describe, expect, it } from 'vitest';
import { buscarProducto } from '../../datos/catalogo.js';
import { PARAMETROS_2026 } from '../../datos/parametros.js';
import { PERFIL_INICIAL } from '../../estado/estadoInicial.js';
import { calcularHoras, horasSugeridas } from '../horas.js';
import { tasaSeguridadSocial } from '../impuestos.js';
import {
  costoOperativoHora,
  factorDominio,
  factoresPerfil,
  horasFacturablesMes,
  tarifaMinima,
  tarifaSugerida,
} from '../tarifas.js';

const logo = buscarProducto('mul-logo');

describe('horas', () => {
  it('sugiere horas con base y unidades según la complejidad', () => {
    expect(horasSugeridas(logo, 3, 'basico')).toBe(12); // 4 × 0,75 + 3 × 3
    expect(horasSugeridas(logo, 3, 'intermedio')).toBe(19); // 4 + 3 × 5
    expect(horasSugeridas(logo, 3, 'avanzado')).toBe(29.5); // 4 × 1,4 + 3 × 8
  });

  it('suma imprevistos, revisiones y gestión a las horas facturables', () => {
    const h = calcularHoras({ horasEstimadas: 19, especialidad: 50, complejidad: 'intermedio', revisiones: 2 });
    expect(h.imprevistosPct).toBeCloseTo(0.2); // 10 % del nivel + 10 % por dominio medio
    expect(h.horasRevisiones).toBeCloseTo(2.28);
    expect(h.horasGestion).toBeCloseTo(1.9);
    expect(h.facturables).toBeCloseTo(26.98);
  });

  it('con poco dominio hay horas reales que no se cobran', () => {
    const novato = calcularHoras({ horasEstimadas: 100, especialidad: 0, complejidad: 'intermedio', revisiones: 0 });
    const experto = calcularHoras({ horasEstimadas: 100, especialidad: 100, complejidad: 'intermedio', revisiones: 0 });
    expect(novato.noCobradas).toBeCloseTo(30);
    expect(experto.noCobradas).toBe(0);
    expect(novato.facturables).toBeGreaterThan(experto.facturables);
  });

  it('respeta los imprevistos manuales y los servicios sin revisiones', () => {
    const h = calcularHoras({
      horasEstimadas: 10,
      especialidad: 50,
      complejidad: 'basico',
      revisiones: 3,
      aplicaRevisiones: false,
      imprevistosManual: 0.25,
    });
    expect(h.horasImprevistos).toBeCloseTo(2.5);
    expect(h.horasRevisiones).toBe(0);
  });
});

describe('tarifas', () => {
  it('calcula horas facturables al mes y tarifa mínima viable', () => {
    expect(horasFacturablesMes(PERFIL_INICIAL)).toBeCloseTo(103.92);
    // (650 + 550 + 160 + 250 mil) × 1,10 / 103,92 h
    expect(tarifaMinima(PERFIL_INICIAL)).toBeCloseTo(17_042.3, 0);
  });

  it('reparte los gastos del negocio por hora facturable', () => {
    // (80 + 50 + 90 + 40 mil + 4,5 M / 36 meses) / 103,92 h
    expect(costoOperativoHora(PERFIL_INICIAL)).toBeCloseTo(3_704.8, 0);
  });

  it('el dominio ajusta la tarifa entre ×0,70 y ×1,30', () => {
    expect(factorDominio(0)).toBeCloseTo(0.7);
    expect(factorDominio(50)).toBeCloseTo(1);
    expect(factorDominio(100)).toBeCloseTo(1.3);
    expect(factorDominio(150)).toBeCloseTo(1.3);
  });

  it('combina dominio, experiencia, portafolio y formación', () => {
    const perfil = { ...PERFIL_INICIAL, proyectosPrevios: 3, portafolio: 'solido', formacion: 'certificacion' };
    expect(factoresPerfil(perfil, 100).total).toBeCloseTo(1.3 * 1.1 * 1.06 * 1.06);
  });

  it('sugiere una tarifa que nunca baja de la mínima', () => {
    const sugerida = tarifaSugerida({ perfil: PERFIL_INICIAL, producto: logo, parametros: PARAMETROS_2026, margen: 10 });
    expect(sugerida).toBe(18_500);
    const caro = { ...PERFIL_INICIAL, gastos: { vivienda: 3_000_000, alimentacion: 0, transporte: 0, otros: 0 } };
    const minima = tarifaMinima(caro);
    expect(tarifaSugerida({ perfil: caro, producto: logo, parametros: PARAMETROS_2026, margen: 10 })).toBeGreaterThanOrEqual(minima);
  });

  it('la tasa de seguridad social del independiente es 11,6 %', () => {
    expect(tasaSeguridadSocial(PARAMETROS_2026)).toBeCloseTo(0.116088);
  });
});
