/** Form field messages. */
export default {
  minimo: ({ min }) => `Use a value of ${min} or more.`,
  rango: ({ min, max }) => `Use a value between ${min} and ${max}.`,
  restar: ({ paso }) => `Subtract ${paso}`,
  sumar: ({ paso }) => `Add ${paso}`,
};
