@echo off
setlocal EnableExtensions
chcp 65001 >nul
title TarifaJusta - Compartir con ngrok
cd /d "%~dp0"

if not exist "node_modules\vite" (
  echo Primero hay que instalar las dependencias. Ejecutando INSTALAR.bat...
  call "%~dp0INSTALAR.bat"
)

where ngrok >nul 2>&1
if errorlevel 1 (
  echo.
  echo  ngrok no esta instalado. Ejecuta CONFIGURAR_NGROK.bat o mira docs\GUIA_NGROK.md
  echo  Mientras tanto la app se abrira solo en tu red local.
  echo.
)

echo  Compilando la ultima version...
call npm run build
if errorlevel 1 (
  echo  La compilacion fallo. Revisa los mensajes de arriba.
  pause
  exit /b 1
)

node scripts\compartir.mjs --sin-compilar
pause
