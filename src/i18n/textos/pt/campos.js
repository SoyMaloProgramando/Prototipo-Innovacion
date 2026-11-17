/** Mensagens dos campos de formulário. */
export default {
  minimo: ({ min }) => `Use um valor de ${min} ou mais.`,
  rango: ({ min, max }) => `Use um valor entre ${min} e ${max}.`,
  restar: ({ paso }) => `Subtrair ${paso}`,
  sumar: ({ paso }) => `Somar ${paso}`,
};
