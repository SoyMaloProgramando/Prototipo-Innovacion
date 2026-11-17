import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dominios de ngrok permitidos. Vite bloquea por seguridad las peticiones que
 * llegan con un "Host" desconocido; sin esta lista, el enlace de ngrok mostraría
 * "Blocked request. This host is not allowed".
 */
const dominiosNgrok = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev', '.ngrok.io', '.ngrok.pizza'];

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: el build funciona en cualquier carpeta o subruta.
  base: './',
  server: {
    host: true, // escucha también en la red local (otros equipos del mismo WiFi/LAN)
    port: 5173,
    strictPort: true,
    allowedHosts: dominiosNgrok,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: dominiosNgrok,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
