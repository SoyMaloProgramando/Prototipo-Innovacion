/**
 * Modo claro u oscuro.
 *
 * Arranca con el modo del sistema operativo. Si la persona lo cambia con el
 * botón del encabezado, se recuerda en este navegador (localStorage). Es solo
 * una preferencia visual: la cotización no se guarda en el navegador.
 */
import { useCallback, useEffect, useState } from 'react';

const CLAVE = 'tarifajusta-tema';
const COLOR_BARRA = { light: '#ffffff', dark: '#140d1a' };

function leerGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado === 'light' || guardado === 'dark' ? guardado : null;
  } catch {
    return null;
  }
}

function temaDelSistema() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function estadoInicial() {
  const guardado = leerGuardado();
  return { tema: guardado ?? temaDelSistema(), elegido: Boolean(guardado) };
}

export function useTema() {
  const [estado, setEstado] = useState(estadoInicial);

  useEffect(() => {
    document.documentElement.dataset.theme = estado.tema;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute('content', COLOR_BARRA[estado.tema]));
    if (estado.elegido) {
      try {
        localStorage.setItem(CLAVE, estado.tema);
      } catch {
        // Sin almacenamiento (modo privado): el cambio vale mientras la página esté abierta.
      }
    }
  }, [estado]);

  // Mientras la persona no elija, sigue los cambios del sistema operativo.
  useEffect(() => {
    if (estado.elegido || !window.matchMedia) return undefined;
    const consulta = window.matchMedia('(prefers-color-scheme: dark)');
    const alCambiar = (e) => setEstado({ tema: e.matches ? 'dark' : 'light', elegido: false });
    consulta.addEventListener?.('change', alCambiar);
    return () => consulta.removeEventListener?.('change', alCambiar);
  }, [estado.elegido]);

  const alternar = useCallback(() => setEstado((e) => ({ tema: e.tema === 'dark' ? 'light' : 'dark', elegido: true })), []);

  return [estado.tema, alternar];
}
