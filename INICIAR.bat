@echo off
setlocal EnableExtensions
chcp 65001 >nul
title TarifaJusta - Modo desarrollo
cd /d "%~dp0"

if not exist "node_modules\vite" (
  echo Primero hay que instalar las dependencias. Ejecutando INSTALAR.bat...
  call "%~dp0INSTALAR.bat"
)

echo.
echo  TarifaJusta en modo desarrollo
echo  ==============================
echo  En este PC:  http://localhost:5173
echo  Los cambios en el codigo se ven al instante.
echo  Para compartir por internet usa COMPARTIR_CON_NGROK.bat
echo  Cierra esta ventana o pulsa Ctrl + C para detener.
echo.
call npm run dev -- --open
pause
