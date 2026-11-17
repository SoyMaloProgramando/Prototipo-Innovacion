/** Mensajes de los campos de formulario. */
export default {
  minimo: ({ min }) => `Usa un valor de ${min} o más.`,
  rango: ({ min, max }) => `Usa un valor entre ${min} y ${max}.`,
  restar: ({ paso }) => `Restar ${paso}`,
  sumar: ({ paso }) => `Sumar ${paso}`,
};
