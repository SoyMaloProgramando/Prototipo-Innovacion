/**
 * Reglas de negocio que revisan la cotización y producen:
 * - chequeos: lista de verificación que da el puntaje de "salud" (0 a 100).
 * - recomendaciones: alertas, consejos y oportunidades.
 * Aquí solo se decide QUÉ mostrar y con qué cifras (en `valores`); los textos,
 * en español, inglés y portugués, están en src/i18n/textos/<idioma>/recomendaciones.js.
 */

export function evaluarChequeos(r, estado) {
  const { proyecto, condiciones } = estado;
  const primeraCuota = r.pagos.cuotas[0];
  const aplicaRevisiones = r.producto.aplicaRevisiones;
  const revisiones = Number(proyecto.revisiones) || 0;

  return [
    { id: 'piso', ok: r.precio.sinIva >= r.rango.piso },
    { id: 'mercado', ok: r.mercado.posicion.nivel !== 'debajo' },
    { id: 'anticipo', ok: r.pagos.cuotas.length > 1 && primeraCuota.porcentaje >= 0.3 },
    {
      id: 'revisiones',
      ok: !aplicaRevisiones || (revisiones >= 1 && revisiones <= 3),
      valores: { aplica: Boolean(aplicaRevisiones) },
    },
    { id: 'aportes', ok: Boolean(condiciones.incluirSeguridadSocial) },
    { id: 'margen', ok: r.precio.margen >= 0.1 },
    { id: 'ganancia-real', ok: r.neto.porHoraReal >= r.tarifas.minima },
  ];
}

export function generarRecomendaciones(r, estado) {
  const { perfil, proyecto, condiciones } = estado;
  const lista = [];
  const agregar = (tipo, id, valores = {}) => lista.push({ tipo, id, valores });

  // Alertas ─────────────────────────────────────────────────────────
  if (r.precio.sinIva < r.rango.piso) {
    agregar('alerta', 'bajo-piso', { precio: r.precio.sinIva, piso: r.rango.piso });
  }
  if (r.tarifas.deseada < r.tarifas.minima) {
    agregar('alerta', 'tarifa-bajo-minimo', { deseada: r.tarifas.deseada, horasMes: r.tarifas.horasMes, minima: r.tarifas.minima });
  }
  if (r.pagos.cuotas.length === 1) {
    agregar('alerta', 'sin-anticipo');
  }

  // Consejos ────────────────────────────────────────────────────────
  if (r.mercado.posicion.nivel === 'debajo') {
    agregar('consejo', 'debajo-mercado', { min: r.mercado.junior.min, max: r.mercado.junior.max });
  }
  if (r.especialidad < 35) {
    agregar('consejo', 'poco-dominio', {
      especialidad: r.especialidad,
      factor: r.tarifas.factores.dominio,
      imprevistos: r.horas.imprevistosPct,
      noCobradas: r.horas.noCobradas,
    });
  }
  if (!condiciones.incluirSeguridadSocial) {
    agregar('consejo', 'sin-aportes', { aportes: r.neto.aportes });
  }
  if (r.precio.retencionTasa > 0 && !condiciones.compensarRetencion) {
    agregar('consejo', 'retencion', { retencion: r.neto.retencion, tasa: r.precio.retencionTasa, consignado: r.neto.consignado });
  }
  if (r.producto.aplicaRevisiones && Number(proyecto.revisiones) > 3) {
    agregar('consejo', 'muchas-revisiones');
  }
  if (r.producto.aplicaRevisiones && Number(proyecto.revisiones) === 0) {
    agregar('consejo', 'sin-revisiones');
  }
  if (proyecto.urgencia !== 'normal') {
    agregar('consejo', 'urgencia', { recargo: r.multiplicadores.urgencia - 1 });
  }
  if (r.horas.facturables > 160) {
    agregar('consejo', 'proyecto-grande', { horas: r.horas.facturables });
  }
  if (condiciones.derechos === 'exclusivo') {
    agregar('consejo', 'exclusividad');
  }
  if (r.precio.margen < 0.1) {
    agregar('consejo', 'margen-bajo');
  }
  if (r.precio.sinIva < estado.parametros.smmlv && r.neto.aporteMinimoMensual > 0) {
    agregar('consejo', 'aporte-minimo', { aporte: r.neto.aporteMinimoMensual });
  }

  // Oportunidades ───────────────────────────────────────────────────
  if (r.especialidad >= 80 && ['debajo', 'junior'].includes(r.mercado.posicion.nivel)) {
    agregar('oportunidad', 'mucho-dominio');
  }
  if (condiciones.mercado === 'internacional' && r.pais?.moneda !== 'USD') {
    agregar('oportunidad', 'internacional', { usd: r.equivalencias.usd });
  }
  if (Number(perfil.proyectosPrevios) === 0 || perfil.portafolio === 'ninguno') {
    agregar('oportunidad', 'portafolio');
  }

  return lista;
}
