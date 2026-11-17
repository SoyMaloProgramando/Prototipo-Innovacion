import { describe, expect, it } from 'vitest';
import { crearEstadoInicial } from '../../estado/estadoInicial.js';
import { calcularCotizacion, comparativoComplejidad, curvaDominio } from '../calculadora.js';
import { sumar } from '../formato.js';

function estadoCon(cambios = {}) {
  const base = crearEstadoInicial('multimedia');
  return {
    ...base,
    proyecto: { ...base.proyecto, fechaInicio: '2026-10-31', ...cambios.proyecto },
    condiciones: { ...base.condiciones, ...cambios.condiciones },
    perfil: { ...base.perfil, ...cambios.perfil },
    parametros: { ...base.parametros, ...cambios.parametros },
  };
}

describe('calculadora de cotizaciones', () => {
  it('cotiza el logotipo de ejemplo', () => {
    const r = calcularCotizacion(estadoCon());
    expect(r.horas.facturables).toBeCloseTo(26.98);
    expect(r.tarifas.ajustada).toBe(18_500);
    expect(r.precio.sinIva).toBe(710_000);
    expect(r.rango.piso).toBe(635_000);
    expect(r.rango.apertura).toBe(820_000);
    expect(r.mercado.posicion.nivel).toBe('junior');
  });

  it('el desglose suma exactamente el precio', () => {
    const r = calcularCotizacion(estadoCon({ condiciones: { responsableIva: true, compensarRetencion: true } }));
    const p = r.precio;
    const suma =
      p.manoDeObra + p.costosOperativos + p.ajusteComercial + p.utilidad + p.seguridadSocial + p.costosDirectos + p.compensacionRetencion + p.redondeo;
    expect(suma).toBeCloseTo(p.sinIva, 4);
    expect(sumar(r.distribucion.map((d) => d.valor))).toBeCloseTo(p.total, 4);
  });

  it('más dominio significa mayor precio', () => {
    const curva = curvaDominio(estadoCon(), 10);
    for (let i = 1; i < curva.length; i += 1) {
      expect(curva[i].precio).toBeGreaterThanOrEqual(curva[i - 1].precio);
    }
    expect(curva.at(-1).precio).toBeGreaterThan(curva[0].precio);
  });

  it('más complejidad significa mayor precio', () => {
    const [basico, intermedio, avanzado] = comparativoComplejidad(estadoCon());
    expect(basico.precio).toBeLessThan(intermedio.precio);
    expect(intermedio.precio).toBeLessThan(avanzado.precio);
  });

  it('agrega IVA solo si eres responsable', () => {
    const sinIva = calcularCotizacion(estadoCon());
    const conIva = calcularCotizacion(estadoCon({ condiciones: { responsableIva: true } }));
    expect(sinIva.precio.iva).toBe(0);
    expect(conIva.precio.iva).toBeCloseTo(conIva.precio.sinIva * 0.19);
    expect(conIva.precio.total).toBeCloseTo(conIva.precio.sinIva * 1.19);
  });

  it('aplica retención automática según el cliente', () => {
    const empresa = calcularCotizacion(estadoCon({ condiciones: { tipoCliente: 'pyme' } }));
    const persona = calcularCotizacion(estadoCon({ condiciones: { tipoCliente: 'persona' } }));
    const exterior = calcularCotizacion(estadoCon({ condiciones: { tipoCliente: 'grande', mercado: 'internacional' } }));
    expect(empresa.precio.retencionTasa).toBe(0.1);
    expect(persona.precio.retencionTasa).toBe(0);
    expect(exterior.precio.retencionTasa).toBe(0);
  });

  it('compensar la retención hace que te consignen al menos lo calculado', () => {
    const r = calcularCotizacion(estadoCon({ condiciones: { compensarRetencion: true } }));
    const sinCompensar = calcularCotizacion(estadoCon());
    expect(r.neto.consignado).toBeGreaterThanOrEqual(sinCompensar.precio.antesDeRedondeo - 1);
  });

  it('convierte costos directos en dólares con la TRM', () => {
    const r = calcularCotizacion(
      estadoCon({
        parametros: { trm: 4_000 },
        condiciones: { costosDirectos: [{ id: 'x', concepto: 'Cuenta Google Play', valor: 25, moneda: 'USD', activo: true }] },
      }),
    );
    expect(r.precio.costosDirectos).toBe(100_000);
  });

  it('las cuotas de pago suman el total', () => {
    for (const esquemaPago of ['50-50', '40-30-30', '30-40-30', '100-final']) {
      const r = calcularCotizacion(estadoCon({ condiciones: { esquemaPago, responsableIva: true } }));
      expect(sumar(r.pagos.cuotas.map((c) => c.valor))).toBeCloseTo(r.precio.total, 6);
    }
  });

  it('los recargos comerciales suben el precio', () => {
    const normal = calcularCotizacion(estadoCon());
    const urgente = calcularCotizacion(estadoCon({ proyecto: { urgencia: 'urgente' } }));
    const exclusivo = calcularCotizacion(estadoCon({ condiciones: { derechos: 'exclusivo' } }));
    expect(urgente.precio.sinIva).toBeGreaterThan(normal.precio.sinIva);
    expect(exclusivo.precio.sinIva).toBeGreaterThan(normal.precio.sinIva);
  });

  it('la urgencia acorta la entrega', () => {
    const normal = calcularCotizacion(estadoCon());
    const urgente = calcularCotizacion(estadoCon({ proyecto: { urgencia: 'urgente' } }));
    expect(urgente.entrega.diasHabiles).toBeLessThan(normal.entrega.diasHabiles);
  });

  it('avisa cuando la tarifa no cubre los gastos de vida', () => {
    const r = calcularCotizacion(estadoCon({ proyecto: { tarifaDeseada: 8_000, tarifaPersonalizada: true } }));
    const ids = r.recomendaciones.map((x) => x.id);
    expect(ids).toContain('tarifa-bajo-minimo');
    expect(ids).toContain('bajo-piso');
    expect(r.salud).toBeLessThan(100);
  });

  it('tolera datos vacíos sin romperse', () => {
    const r = calcularCotizacion(
      estadoCon({ proyecto: { unidades: '', tarifaDeseada: '', horasDia: '' }, perfil: { horasSemana: '' } }),
    );
    expect(Number.isFinite(r.precio.sinIva)).toBe(true);
    expect(r.entrega.diasHabiles).toBeGreaterThanOrEqual(1);
  });
});
