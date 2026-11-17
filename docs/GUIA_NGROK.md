# Guía: compartir TarifaJusta con ngrok

ngrok crea un enlace público (`https://algo.ngrok-free.dev`) que apunta a la app que corre en tu PC. Los estudiantes la abren desde su celular o computador, en cualquier red, mientras tu PC y la ventana de ngrok sigan abiertos.

No hay base de datos: cada estudiante que abre el enlace tiene su propia copia del estado en su navegador, así que nadie ve los datos de los demás.

## Lo que necesitas

| Requisito | Cómo revisarlo |
|---|---|
| Node.js 20.19 o superior (recomendado 22 LTS o 24 LTS) | `VERIFICAR_ENTORNO.bat` |
| Dependencias instaladas | `INSTALAR.bat` (una sola vez) |
| Cuenta gratis de ngrok | https://dashboard.ngrok.com/signup |
| ngrok instalado y con authtoken | `CONFIGURAR_NGROK.bat` |

## Opción rápida (Windows)

1. Doble clic en **`CONFIGURAR_NGROK.bat`** (solo la primera vez).
   - Si ngrok no está, ofrece instalarlo desde la Microsoft Store con `winget`.
   - Abre la página de tu authtoken; lo copias y lo pegas en la ventana.
2. Doble clic en **`COMPARTIR_CON_NGROK.bat`**.
   - Compila la app, la sirve en `http://localhost:4173` y abre el túnel.
   - Muestra el enlace público y un código QR, y lo guarda en `enlace-ngrok.txt`.
3. Comparte el enlace o proyecta el QR. También puedes usar el botón **Compartir** dentro de la app, que muestra el QR del enlace con el que la abriste.
4. Al terminar la prueba, cierra la ventana o pulsa `Ctrl + C`.

## Opción manual (cualquier sistema)

```bash
# 1. Instalar ngrok (Windows)
winget install ngrok -s msstore
#    o descargarlo de https://download.ngrok.com

# 2. Guardar el authtoken (una vez por computador)
ngrok config add-authtoken TU_TOKEN

# 3. Compilar y servir la app
npm run build
npm run preview          # http://localhost:4173

# 4. En otra terminal, abrir el túnel
ngrok http 4173
```

También funciona con el modo desarrollo (`npm run dev` y `ngrok http 5173`), pero la versión compilada es más liviana y rápida para muchos estudiantes a la vez.

## Lo que verán los estudiantes

- En el plan gratuito, ngrok muestra primero una página de aviso. Deben pulsar **Visit Site** una vez.
- Luego ven TarifaJusta completa. Funciona en celular y en computador.

## Por qué la app acepta el enlace de ngrok

Vite bloquea por seguridad las peticiones que llegan con un dominio desconocido. En `vite.config.js` están permitidos los dominios de ngrok (`.ngrok-free.app`, `.ngrok-free.dev`, `.ngrok.app`, `.ngrok.dev`, `.ngrok.io`) tanto para `npm run dev` como para `npm run preview`. Si ngrok algún día usa otro dominio, agrégalo a la lista `dominiosNgrok`.

## Límites del plan gratuito

Un dominio de desarrollo asignado automáticamente, hasta 3 túneles en línea, 20.000 peticiones y 1 GB de datos al mes. Para una o dos sesiones de prueba en clase es suficiente.

## Problemas comunes

| Mensaje o síntoma | Solución |
|---|---|
| `ERR_NGROK_4018` o "authtoken" | Falta el token: `CONFIGURAR_NGROK.bat` o `ngrok config add-authtoken TU_TOKEN` |
| `ERR_NGROK_108` o sesión ya en línea | Ya hay otro ngrok abierto: ciérralo |
| "Blocked request. This host is not allowed" | El dominio no está en `allowedHosts` de `vite.config.js` |
| "El puerto 4173 ya está en uso" | Ya hay otra ventana de TarifaJusta abierta: ciérrala |
| El enlace dejó de funcionar | El PC se suspendió o se cerró la ventana: vuelve a abrir `COMPARTIR_CON_NGROK.bat` (el enlace puede cambiar) |
| `ngrok` no se reconoce después de instalarlo | Cierra y vuelve a abrir la ventana para que Windows actualice el PATH |

## Alternativa sin internet: red local

Si los estudiantes están en la misma red que tu PC, pueden entrar sin ngrok con la dirección de red que muestra `npm run preview` (por ejemplo `http://192.168.1.20:4173`). Es posible que el Firewall de Windows pida permiso la primera vez.
