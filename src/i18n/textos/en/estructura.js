/** Header, footer and share dialog. */
export default {
  pie: {
    linea1: ({ nombre, version, programa, universidad, ciudad, anio }) =>
      `${nombre} ${version}. Academic prototype from the ${programa} program, ${universidad}, ${ciudad} ${anio}.`,
    aviso: ({ pais, anio }) => `Values are references for ${pais} in ${anio} and do not replace advice from an accountant.`,
    verMetodo: 'See how we calculate',
  },
  compartir: {
    titulo: 'Share TarifaJusta',
    enlace: 'Link',
    enlaceApp: 'App link',
    qrAlt: ({ enlace }) => `QR code for the link ${enlace}`,
    copiar: 'Copy link',
    copiado: 'Link copied',
    privacidad: 'Everyone who opens the link has their own data: nothing is stored on a server or in a database.',
    mensajes: {
      ngrok: 'This ngrok link works from anywhere with internet access while your PC keeps ngrok open.',
      local:
        'You are opening the app from your own PC (localhost), so this link only works here. Run COMPARTIR_CON_NGROK.bat and open the app from the ngrok link to share it.',
      red: 'This link works for devices on your same network. To share it over the internet, use ngrok.',
      publico: 'Anyone with this link can open the app.',
    },
  },
};
