/** Encabezado, pie de página y ventana para compartir. */
export default {
  pie: {
    linea1: ({ nombre, version, programa, universidad, ciudad, anio }) =>
      `${nombre} ${version}. Prototipo académico de ${programa}, ${universidad}, ${ciudad} ${anio}.`,
    aviso: ({ pais, anio }) => `Los valores son de referencia para ${pais} en ${anio} y no reemplazan la asesoría de un contador.`,
    verMetodo: 'Ver cómo calculamos',
  },
  compartir: {
    titulo: 'Compartir TarifaJusta',
    enlace: 'Enlace',
    enlaceApp: 'Enlace de la app',
    qrAlt: ({ enlace }) => `Código QR del enlace ${enlace}`,
    copiar: 'Copiar enlace',
    copiado: 'Enlace copiado',
    privacidad: 'Cada persona que abre el enlace tiene sus propios datos: nada se guarda en un servidor ni en una base de datos.',
    mensajes: {
      ngrok: 'Este enlace de ngrok funciona desde cualquier lugar con internet mientras tu PC tenga ngrok abierto.',
      local:
        'Estás abriendo la app desde tu propio PC (localhost), así que este enlace solo sirve aquí. Ejecuta COMPARTIR_CON_NGROK.bat y abre la app desde el enlace de ngrok para compartirla.',
      red: 'Este enlace funciona para equipos conectados a tu misma red. Para compartir por internet usa ngrok.',
      publico: 'Cualquier persona con este enlace puede abrir la app.',
    },
  },
};
