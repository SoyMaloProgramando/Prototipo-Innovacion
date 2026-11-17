/** Íconos SVG en línea (trazo de 1,75 px, heredan el color del texto). */
const TRAZOS = {
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  equis: <path d="M6 6l12 12M18 6L6 18" />,
  alerta: (
    <>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5M12 17.5v.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.5v.01" />
    </>
  ),
  estrella: <path d="M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />,
  imprimir: (
    <>
      <path d="M7 8V3.5h10V8" />
      <rect x="3.5" y="8" width="17" height="8.5" rx="1.5" />
      <path d="M7 14h10v6.5H7z" />
    </>
  ),
  guardar: (
    <>
      <path d="M5 3.5h11l3.5 3.5v13.5h-14.5z" />
      <path d="M8 3.5v5h7v-5M8 20.5v-6h8v6" />
    </>
  ),
  compartir: (
    <>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" />
    </>
  ),
  papelera: (
    <>
      <path d="M4 6.5h16M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14" />
    </>
  ),
  copiar: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0014.5 4h-9A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16H8" />
    </>
  ),
  editar: <path d="M4 20h4l11-11-4-4L4 16zM13.5 6.5l4 4" />,
  mas: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  atras: <path d="M14.5 6l-6 6 6 6" />,
  adelante: <path d="M9.5 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  descargar: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  subir: <path d="M12 16V5M7 9.5l5-5 5 5M5 20h14" />,
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendario: (
    <>
      <rect x="4" y="5.5" width="16" height="15" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  duplicar: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M12 11.5v5M9.5 14h5M4 15V5.5A1.5 1.5 0 015.5 4H15" />
    </>
  ),
  reiniciar: <path d="M4.5 12a7.5 7.5 0 102.2-5.3M4.5 4.5v4h4" />,
  buscar: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
    </>
  ),
  luna: <path d="M20 14.2A8.2 8.2 0 019.8 4 8.2 8.2 0 1020 14.2z" />,
  globo: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5s1.2-6.2 3.6-8.5z" />
    </>
  ),
  ruta: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5" />
    </>
  ),
};

export default function Icono({ nombre, titulo, className = '', tamano = 20 }) {
  return (
    <svg
      className={`icono ${className}`}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={titulo ? undefined : 'true'}
      role={titulo ? 'img' : undefined}
    >
      {titulo ? <title>{titulo}</title> : null}
      {TRAZOS[nombre] ?? TRAZOS.info}
    </svg>
  );
}
