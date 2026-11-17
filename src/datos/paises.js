/**
 * Países de habla hispana y portuguesa que maneja TarifaJusta.
 *
 * Aquí está lo fijo de cada país: nombre en los tres idiomas, idioma oficial,
 * región, moneda y ciudad principal. Los números (tipo de cambio, salario mínimo,
 * impuestos, costo de vida y salarios del sector) están en `datosPaises.js`,
 * con sus fuentes en docs/PAISES_Y_FUENTES.md.
 *
 * moneda.decimales: 2 en monedas de valor alto por unidad (dólar, euro, real...),
 * para mostrar centavos en tarifas por hora; 0 en el resto.
 */
export const REGIONES = ['sudamerica', 'centroamerica', 'caribe', 'europa', 'africa', 'asia'];

export const PAISES = {
  AR: { id: 'AR', idioma: 'es', region: 'sudamerica', nombres: { es: 'Argentina', en: 'Argentina', pt: 'Argentina' }, moneda: { codigo: 'ARS', decimales: 0 }, ciudad: 'Buenos Aires' },
  BO: { id: 'BO', idioma: 'es', region: 'sudamerica', nombres: { es: 'Bolivia', en: 'Bolivia', pt: 'Bolívia' }, moneda: { codigo: 'BOB', decimales: 2 }, ciudad: 'La Paz' },
  BR: { id: 'BR', idioma: 'pt', region: 'sudamerica', nombres: { es: 'Brasil', en: 'Brazil', pt: 'Brasil' }, moneda: { codigo: 'BRL', decimales: 2 }, ciudad: 'São Paulo' },
  CL: { id: 'CL', idioma: 'es', region: 'sudamerica', nombres: { es: 'Chile', en: 'Chile', pt: 'Chile' }, moneda: { codigo: 'CLP', decimales: 0 }, ciudad: 'Santiago' },
  CO: { id: 'CO', idioma: 'es', region: 'sudamerica', nombres: { es: 'Colombia', en: 'Colombia', pt: 'Colômbia' }, moneda: { codigo: 'COP', decimales: 0 }, ciudad: 'Tunja' },
  EC: { id: 'EC', idioma: 'es', region: 'sudamerica', nombres: { es: 'Ecuador', en: 'Ecuador', pt: 'Equador' }, moneda: { codigo: 'USD', decimales: 2 }, ciudad: 'Quito' },
  PY: { id: 'PY', idioma: 'es', region: 'sudamerica', nombres: { es: 'Paraguay', en: 'Paraguay', pt: 'Paraguai' }, moneda: { codigo: 'PYG', decimales: 0 }, ciudad: 'Asunción' },
  PE: { id: 'PE', idioma: 'es', region: 'sudamerica', nombres: { es: 'Perú', en: 'Peru', pt: 'Peru' }, moneda: { codigo: 'PEN', decimales: 2 }, ciudad: 'Lima' },
  UY: { id: 'UY', idioma: 'es', region: 'sudamerica', nombres: { es: 'Uruguay', en: 'Uruguay', pt: 'Uruguai' }, moneda: { codigo: 'UYU', decimales: 0 }, ciudad: 'Montevideo' },
  VE: { id: 'VE', idioma: 'es', region: 'sudamerica', nombres: { es: 'Venezuela', en: 'Venezuela', pt: 'Venezuela' }, moneda: { codigo: 'VES', decimales: 0 }, ciudad: 'Caracas' },

  CR: { id: 'CR', idioma: 'es', region: 'centroamerica', nombres: { es: 'Costa Rica', en: 'Costa Rica', pt: 'Costa Rica' }, moneda: { codigo: 'CRC', decimales: 0 }, ciudad: 'San José' },
  SV: { id: 'SV', idioma: 'es', region: 'centroamerica', nombres: { es: 'El Salvador', en: 'El Salvador', pt: 'El Salvador' }, moneda: { codigo: 'USD', decimales: 2 }, ciudad: 'San Salvador' },
  GT: { id: 'GT', idioma: 'es', region: 'centroamerica', nombres: { es: 'Guatemala', en: 'Guatemala', pt: 'Guatemala' }, moneda: { codigo: 'GTQ', decimales: 2 }, ciudad: 'Ciudad de Guatemala' },
  HN: { id: 'HN', idioma: 'es', region: 'centroamerica', nombres: { es: 'Honduras', en: 'Honduras', pt: 'Honduras' }, moneda: { codigo: 'HNL', decimales: 2 }, ciudad: 'Tegucigalpa' },
  MX: { id: 'MX', idioma: 'es', region: 'centroamerica', nombres: { es: 'México', en: 'Mexico', pt: 'México' }, moneda: { codigo: 'MXN', decimales: 2 }, ciudad: 'Ciudad de México' },
  NI: { id: 'NI', idioma: 'es', region: 'centroamerica', nombres: { es: 'Nicaragua', en: 'Nicaragua', pt: 'Nicarágua' }, moneda: { codigo: 'NIO', decimales: 0 }, ciudad: 'Managua' },
  PA: { id: 'PA', idioma: 'es', region: 'centroamerica', nombres: { es: 'Panamá', en: 'Panama', pt: 'Panamá' }, moneda: { codigo: 'USD', decimales: 2 }, ciudad: 'Ciudad de Panamá' },

  CU: { id: 'CU', idioma: 'es', region: 'caribe', nombres: { es: 'Cuba', en: 'Cuba', pt: 'Cuba' }, moneda: { codigo: 'CUP', decimales: 0 }, ciudad: 'La Habana' },
  PR: { id: 'PR', idioma: 'es', region: 'caribe', nombres: { es: 'Puerto Rico', en: 'Puerto Rico', pt: 'Porto Rico' }, moneda: { codigo: 'USD', decimales: 2 }, ciudad: 'San Juan' },
  DO: { id: 'DO', idioma: 'es', region: 'caribe', nombres: { es: 'República Dominicana', en: 'Dominican Republic', pt: 'República Dominicana' }, moneda: { codigo: 'DOP', decimales: 0 }, ciudad: 'Santo Domingo' },

  ES: { id: 'ES', idioma: 'es', region: 'europa', nombres: { es: 'España', en: 'Spain', pt: 'Espanha' }, moneda: { codigo: 'EUR', decimales: 2 }, ciudad: 'Madrid' },
  PT: { id: 'PT', idioma: 'pt', region: 'europa', nombres: { es: 'Portugal', en: 'Portugal', pt: 'Portugal' }, moneda: { codigo: 'EUR', decimales: 2 }, ciudad: 'Lisboa' },

  AO: { id: 'AO', idioma: 'pt', region: 'africa', nombres: { es: 'Angola', en: 'Angola', pt: 'Angola' }, moneda: { codigo: 'AOA', decimales: 0 }, ciudad: 'Luanda' },
  CV: { id: 'CV', idioma: 'pt', region: 'africa', nombres: { es: 'Cabo Verde', en: 'Cape Verde', pt: 'Cabo Verde' }, moneda: { codigo: 'CVE', decimales: 0 }, ciudad: 'Praia' },
  GQ: { id: 'GQ', idioma: 'es', region: 'africa', nombres: { es: 'Guinea Ecuatorial', en: 'Equatorial Guinea', pt: 'Guiné Equatorial' }, moneda: { codigo: 'XAF', decimales: 0 }, ciudad: 'Malabo' },
  GW: { id: 'GW', idioma: 'pt', region: 'africa', nombres: { es: 'Guinea-Bisáu', en: 'Guinea-Bissau', pt: 'Guiné-Bissau' }, moneda: { codigo: 'XOF', decimales: 0 }, ciudad: 'Bissau' },
  MZ: { id: 'MZ', idioma: 'pt', region: 'africa', nombres: { es: 'Mozambique', en: 'Mozambique', pt: 'Moçambique' }, moneda: { codigo: 'MZN', decimales: 0 }, ciudad: 'Maputo' },
  ST: { id: 'ST', idioma: 'pt', region: 'africa', nombres: { es: 'Santo Tomé y Príncipe', en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' }, moneda: { codigo: 'STN', decimales: 2 }, ciudad: 'São Tomé' },

  TL: { id: 'TL', idioma: 'pt', region: 'asia', nombres: { es: 'Timor Oriental', en: 'Timor-Leste', pt: 'Timor-Leste' }, moneda: { codigo: 'USD', decimales: 2 }, ciudad: 'Díli' },
};

export const PAIS_BASE = 'CO';

export function buscarPais(id) {
  return PAISES[id] ?? PAISES[PAIS_BASE];
}

/** Países ordenados por nombre en el idioma pedido. */
export function paisesOrdenados(idioma = 'es') {
  return Object.values(PAISES).sort((a, b) => a.nombres[idioma].localeCompare(b.nombres[idioma], idioma));
}
