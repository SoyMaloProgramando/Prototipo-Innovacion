#!/usr/bin/env node
/**
 * Comparte TarifaJusta por internet con ngrok.
 *
 *  1. Compila la app para servir siempre la última versión
 *     (con --sin-compilar usa el dist/ que ya existe).
 *  2. Inicia `vite preview` en el puerto 4173.
 *  3. Abre el túnel `ngrok http 4173`.
 *  4. Lee el enlace público en la API local de ngrok (http://127.0.0.1:4040),
 *     lo muestra con un código QR y lo guarda en enlace-ngrok.txt.
 *
 * Uso:  npm run compartir      (o doble clic en COMPARTIR_CON_NGROK.bat)
 * Ctrl + C cierra el servidor y el túnel.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUERTO = 4173;
const VITE = join(RAIZ, 'node_modules', 'vite', 'bin', 'vite.js');
const API_NGROK = 'http://127.0.0.1:4040/api/tunnels';
const procesos = [];

const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
const linea = '═'.repeat(64);

function cerrarTodo(codigo = 0) {
  for (const p of procesos) {
    if (!p.killed) p.kill();
  }
  process.exit(codigo);
}

process.on('SIGINT', () => {
  console.log('\nCerrando el servidor y el túnel...');
  cerrarTodo(0);
});

async function responde(url, intentos = 60, pausa = 500) {
  for (let i = 0; i < intentos; i += 1) {
    try {
      const respuesta = await fetch(url);
      if (respuesta.ok) return respuesta;
    } catch {
      // Todavía no está listo.
    }
    await esperar(pausa);
  }
  return null;
}

function direccionesRedLocal() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => `http://${i.address}:${PUERTO}`);
}

function hayNgrok() {
  const buscador = process.platform === 'win32' ? 'where' : 'which';
  return spawnSync(buscador, ['ngrok'], { stdio: 'ignore' }).status === 0;
}

async function principal() {
  if (!existsSync(VITE)) {
    console.error('Faltan las dependencias. Ejecuta primero INSTALAR.bat (o npm install).');
    process.exit(1);
  }

  // 1. Compilar
  const yaCompilada = existsSync(join(RAIZ, 'dist', 'index.html'));
  if (!process.argv.includes('--sin-compilar') || !yaCompilada) {
    console.log('Compilando la versión de producción...');
    const build = spawnSync(process.execPath, [VITE, 'build'], { cwd: RAIZ, stdio: 'inherit' });
    if (build.status !== 0) process.exit(build.status ?? 1);
  }

  // 2. Servidor local (antes, revisar que nadie más use el puerto)
  if (await responde(`http://localhost:${PUERTO}/`, 1, 0)) {
    console.error(`El puerto ${PUERTO} ya está en uso: cierra la otra ventana de TarifaJusta y vuelve a intentarlo.`);
    process.exit(1);
  }
  console.log(`Iniciando el servidor en http://localhost:${PUERTO} ...`);
  const servidor = spawn(process.execPath, [VITE, 'preview', '--port', String(PUERTO), '--strictPort'], {
    cwd: RAIZ,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  procesos.push(servidor);
  let errorServidor = '';
  servidor.stderr.on('data', (d) => {
    errorServidor += d.toString();
  });
  servidor.on('exit', (codigo) => {
    if (codigo) {
      console.error(`\nEl servidor se cerró (código ${codigo}).`);
      if (/port .* is already in use|already in use/i.test(errorServidor)) {
        console.error(`El puerto ${PUERTO} está ocupado: cierra la otra ventana de TarifaJusta y vuelve a intentarlo.`);
      } else if (errorServidor) {
        console.error(errorServidor);
      }
      cerrarTodo(1);
    }
  });

  if (!(await responde(`http://localhost:${PUERTO}/`))) {
    console.error('El servidor no respondió. Revisa que el puerto 4173 esté libre.');
    cerrarTodo(1);
  }

  const red = direccionesRedLocal();

  // 3. ngrok
  if (!hayNgrok()) {
    console.log(`\n${linea}`);
    console.log(' ngrok no está instalado, así que la app solo se ve en tu red.');
    console.log(` En este PC:            http://localhost:${PUERTO}`);
    for (const url of red) console.log(` Mismo WiFi o cable:     ${url}`);
    console.log(' Para compartir por internet ejecuta CONFIGURAR_NGROK.bat');
    console.log(' o sigue docs/GUIA_NGROK.md. Ctrl + C para terminar.');
    console.log(linea);
    return;
  }

  console.log('Abriendo el túnel de ngrok...');
  const tunel = spawn('ngrok', ['http', String(PUERTO), '--log', 'stdout'], {
    cwd: RAIZ,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  procesos.push(tunel);
  let registroNgrok = '';
  const guardar = (d) => {
    registroNgrok = (registroNgrok + d.toString()).slice(-4000);
  };
  tunel.stdout.on('data', guardar);
  tunel.stderr.on('data', guardar);
  tunel.on('exit', (codigo) => {
    console.error(`\nngrok se cerró (código ${codigo}).`);
    if (/ERR_NGROK_4018|authtoken/i.test(registroNgrok)) {
      console.error('Falta configurar tu authtoken. Ejecuta CONFIGURAR_NGROK.bat o:');
      console.error('  ngrok config add-authtoken TU_TOKEN');
    } else if (/ERR_NGROK_108|limited to 1 simultaneous|already online/i.test(registroNgrok)) {
      console.error('Ya tienes otra sesión de ngrok abierta. Ciérrala y vuelve a intentarlo.');
    } else {
      console.error(registroNgrok.split('\n').slice(-8).join('\n'));
    }
    cerrarTodo(1);
  });

  // 4. Enlace público
  let enlace = null;
  for (let i = 0; i < 40 && !enlace; i += 1) {
    const respuesta = await responde(API_NGROK, 1, 0);
    if (respuesta) {
      const datos = await respuesta.json();
      enlace = datos.tunnels?.find((t) => t.public_url?.startsWith('https'))?.public_url ?? datos.tunnels?.[0]?.public_url;
    }
    if (!enlace) await esperar(500);
  }

  if (!enlace) {
    console.error('No se pudo leer el enlace de ngrok. Abre http://127.0.0.1:4040 para revisarlo.');
    return;
  }

  writeFileSync(join(RAIZ, 'enlace-ngrok.txt'), `${enlace}\n`, 'utf8');
  const qr = await QRCode.toString(enlace, { type: 'terminal', small: true });

  console.log(`\n${linea}`);
  console.log(' TarifaJusta está en línea. Comparte este enlace con los estudiantes:');
  console.log(`\n   ${enlace}\n`);
  console.log(qr);
  console.log(` En este PC:            http://localhost:${PUERTO}`);
  console.log(' Inspector de ngrok:    http://127.0.0.1:4040');
  console.log(' El enlace también quedó en enlace-ngrok.txt');
  console.log(' La primera vez, ngrok muestra un aviso: los estudiantes deben pulsar "Visit Site".');
  console.log(' Deja esta ventana abierta mientras dure la prueba. Ctrl + C para terminar.');
  console.log(linea);
}

principal().catch((error) => {
  console.error(error);
  cerrarTodo(1);
});
