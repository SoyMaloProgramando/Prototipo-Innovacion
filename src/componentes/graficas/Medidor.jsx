/** Medidor delgado de 0 a 100. El relleno cambia de color según el estado. */
export default function Medidor({ valor, etiqueta }) {
  const estado = valor >= 80 ? 'bien' : valor >= 55 ? 'aviso' : 'critico';
  return (
    <div className={`medidor medidor-${estado}`}>
      <div
        className="medidor-pista"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={valor}
        aria-label={etiqueta}
      >
        <div className="medidor-relleno" style={{ width: `${valor}%` }} />
      </div>
    </div>
  );
}
