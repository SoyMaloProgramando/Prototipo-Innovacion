import { describe, expect, it } from 'vitest';
import { BANDAS_MERCADO, NIVELES_COMPLEJIDAD } from '../../datos/parametros.js';
import { CATEGORIAS, filtrarProductos, PRODUCTOS, productosDeCarrera } from '../../datos/catalogo.js';

describe('catálogo de productos', () => {
  it('tiene 32 productos de Sistemas y 48 de Multimedia', () => {
    expect(PRODUCTOS).toHaveLength(80);
    expect(productosDeCarrera('sistemas')).toHaveLength(32);
    expect(productosDeCarrera('multimedia')).toHaveLength(48);
  });

  it('no repite identificadores', () => {
    const ids = PRODUCTOS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada producto tiene categoría, área de mercado y datos completos', () => {
    for (const p of PRODUCTOS) {
      expect(CATEGORIAS.some((c) => c.id === p.categoria), p.id).toBe(true);
      expect(BANDAS_MERCADO[p.area], p.id).toBeDefined();
      expect(p.unidad.singular && p.unidad.plural, p.id).toBeTruthy();
      expect(p.unidades.defecto, p.id).toBeGreaterThanOrEqual(p.unidades.min);
      expect(p.unidades.defecto, p.id).toBeLessThanOrEqual(p.unidades.max);
      for (const nivel of Object.keys(NIVELES_COMPLEJIDAD)) {
        expect(p.horasPorUnidad[nivel], `${p.id} ${nivel}`).toBeGreaterThan(0);
      }
      expect(p.horasPorUnidad.basico).toBeLessThanOrEqual(p.horasPorUnidad.intermedio);
      expect(p.horasPorUnidad.intermedio).toBeLessThanOrEqual(p.horasPorUnidad.avanzado);
      expect(p.entregables.length, p.id).toBeGreaterThanOrEqual(3);
      expect(p.herramientas.length, p.id).toBeGreaterThanOrEqual(1);
    }
  });

  it('busca sin importar tildes ni mayúsculas', () => {
    const resultados = filtrarProductos({ texto: 'ANIMACION 3d' });
    expect(resultados.map((p) => p.id)).toContain('mul-animacion-3d');
  });

  it('filtra por carrera y categoría', () => {
    expect(filtrarProductos({ carrera: 'sistemas', categoria: 'movil' })).toHaveLength(4);
    expect(filtrarProductos({ carrera: 'multimedia', categoria: 'audio' })).toHaveLength(2);
  });
});
