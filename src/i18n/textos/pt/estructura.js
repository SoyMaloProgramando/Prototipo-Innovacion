/** Cabeçalho, rodapé e janela para compartilhar. */
export default {
  pie: {
    linea1: ({ nombre, version, programa, universidad, ciudad, anio }) =>
      `${nombre} ${version}. Protótipo acadêmico do curso de ${programa}, ${universidad}, ${ciudad} ${anio}.`,
    aviso: ({ pais, anio }) => `Os valores são referências para ${pais} em ${anio} e não substituem a orientação de um contador.`,
    verMetodo: 'Ver como calculamos',
  },
  compartir: {
    titulo: 'Compartilhar o TarifaJusta',
    enlace: 'Link',
    enlaceApp: 'Link do app',
    qrAlt: ({ enlace }) => `QR code do link ${enlace}`,
    copiar: 'Copiar link',
    copiado: 'Link copiado',
    privacidad: 'Cada pessoa que abre o link tem seus próprios dados: nada fica salvo em um servidor nem em um banco de dados.',
    mensajes: {
      ngrok: 'Este link do ngrok funciona de qualquer lugar com internet enquanto o seu PC estiver com o ngrok aberto.',
      local:
        'Você está abrindo o app no seu próprio PC (localhost), então este link só funciona aqui. Execute COMPARTIR_CON_NGROK.bat e abra o app pelo link do ngrok para compartilhá-lo.',
      red: 'Este link funciona para aparelhos conectados à sua mesma rede. Para compartilhar pela internet, use o ngrok.',
      publico: 'Qualquer pessoa com este link pode abrir o app.',
    },
  },
};
