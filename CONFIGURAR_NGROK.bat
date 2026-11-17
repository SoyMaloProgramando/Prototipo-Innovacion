@echo off
setlocal EnableExtensions
chcp 65001 >nul
title TarifaJusta - Configurar ngrok
cd /d "%~dp0"

echo.
echo  Configurar ngrok para compartir TarifaJusta
echo  ===========================================
echo  Necesitas una cuenta gratis en ngrok.com. Vamos paso a paso.
echo.

where ngrok >nul 2>&1
if not errorlevel 1 goto token

echo  [1/2] ngrok no esta instalado.
where winget >nul 2>&1
if errorlevel 1 goto manual
choice /C SN /M "  Quieres instalarlo ahora desde la Microsoft Store con winget"
if errorlevel 2 goto manual
winget install ngrok -s msstore --accept-source-agreements --accept-package-agreements
where ngrok >nul 2>&1
if errorlevel 1 (
  echo.
  echo  La instalacion termino, pero esta ventana todavia no ve el comando ngrok.
  echo  Cierra esta ventana y vuelve a abrir CONFIGURAR_NGROK.bat
  goto fin
)
goto token

:manual
echo.
echo  Instalalo de una de estas formas y vuelve a abrir este archivo:
echo    - Microsoft Store: busca "ngrok"
echo    - Descarga directa: https://download.ngrok.com
start "" "https://download.ngrok.com"
goto fin

:token
echo  [2/2] Guardar tu authtoken
echo  Se abrira la pagina de tu cuenta de ngrok. Inicia sesion o crea la cuenta,
echo  copia el authtoken y pegalo aqui. Solo se hace una vez por computador.
echo.
start "" "https://dashboard.ngrok.com/get-started/your-authtoken"
set "TOKEN="
set /p TOKEN=  Pega tu authtoken y pulsa Enter: 
if "%TOKEN%"=="" (
  echo  No escribiste nada. Vuelve a intentarlo cuando tengas el token.
  goto fin
)
ngrok config add-authtoken %TOKEN%
if errorlevel 1 (
  echo  No se pudo guardar el token. Revisa que lo copiaste completo.
  goto fin
)
echo.
echo  Listo. Ahora ejecuta COMPARTIR_CON_NGROK.bat

:fin
echo.
pause
