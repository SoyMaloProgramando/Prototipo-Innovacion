import { describe, expect, it } from 'vitest';
import { aISO, desdeISO, domingoDePascua, esDiaHabil, festivosColombia, sumarDiasHabiles } from '../calendario.js';

describe('calendario de Colombia', () => {
  it('calcula el domingo de Pascua', () => {
    expect(aISO(domingoDePascua(2025))).toBe('2025-04-20');
    expect(aISO(domingoDePascua(2026))).toBe('2026-04-05');
    expect(aISO(domingoDePascua(2027))).toBe('2027-03-28');
  });

  it('tiene los 18 festivos de 2026 con la Ley Emiliani', () => {
    const fechas = festivosColombia(2026).map((f) => aISO(f.fecha));
    expect(fechas).toEqual([
      '2026-01-01',
      '2026-01-12',
      '2026-03-23',
      '2026-04-02',
      '2026-04-03',
      '2026-05-01',
      '2026-05-18',
      '2026-06-08',
      '2026-06-15',
      '2026-06-29',
      '2026-07-20',
      '2026-08-07',
      '2026-08-17',
      '2026-10-12',
      '2026-11-02',
      '2026-11-16',
      '2026-12-08',
      '2026-12-25',
    ]);
  });

  it('salta fines de semana y festivos al sumar días hábiles', () => {
    // Sábado 31 de octubre de 2026: el lunes 2 de noviembre es festivo.
    const { fin, festivos } = sumarDiasHabiles(desdeISO('2026-10-31'), 5);
    expect(aISO(fin)).toBe('2026-11-09');
    expect(festivos.map((f) => f.nombre)).toEqual(['Todos los Santos']);
  });

  it('reconoce días hábiles', () => {
    expect(esDiaHabil(desdeISO('2026-11-03'))).toBe(true);
    expect(esDiaHabil(desdeISO('2026-11-02'))).toBe(false);
    expect(esDiaHabil(desdeISO('2026-11-07'))).toBe(false);
  });

  it('rechaza fechas mal escritas', () => {
    expect(desdeISO('31/10/2026')).toBeNull();
  });
});
