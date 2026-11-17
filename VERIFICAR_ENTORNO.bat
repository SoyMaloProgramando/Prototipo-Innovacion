@echo off
setlocal EnableExtensions
chcp 65001 >nul
title TarifaJusta - Verificar entorno
cd /d "%~dp0"
set "LOG=%~dp0verificacion-entorno.txt"
set "FALTA="

> "%LOG%" echo ==============================================================
>>"%LOG%" echo  TarifaJusta - Verificacion del entorno
>>"%LOG%" echo  Fecha: %date% %time%
>>"%LOG%" echo  Carpeta: %cd%
>>"%LOG%" echo ==============================================================
ver >>"%LOG%"

:node
>>"%LOG%" echo.
>>"%LOG%" echo [1] Node.js - requerido 20.19+ o 22.12+ - recomendado 22 LTS o 24 LTS
where node >>"%LOG%" 2>&1 || goto node_falta
for /f "delims=" %%v in ('node -v') do >>"%LOG%" echo     Version instalada: %%v
node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit((a===20&&b>=19)||(a===22&&b>=12)||a>=23?0:1)" || goto node_vieja
>>"%LOG%" echo     ESTADO: OK
goto npm
:node_falta
>>"%LOG%" echo     ESTADO: NO INSTALADO - descarga la version LTS en https://nodejs.org
set "FALTA=1"
goto npm
:node_vieja
>>"%LOG%" echo     ESTADO: VERSION ANTIGUA - actualiza a Node 22 LTS o 24 LTS desde https://nodejs.org
set "FALTA=1"

:npm
>>"%LOG%" echo.
>>"%LOG%" echo [2] npm
call npm -v >"%TEMP%\tj_npm.txt" 2>&1 || goto npm_falta
for /f "usebackq delims=" %%v in ("%TEMP%\tj_npm.txt") do >>"%LOG%" echo     Version instalada: %%v
>>"%LOG%" echo     ESTADO: OK
goto ngrok
:npm_falta
>>"%LOG%" echo     ESTADO: NO DISPONIBLE - se instala junto con Node.js
set "FALTA=1"

:ngrok
>>"%LOG%" echo.
>>"%LOG%" echo [3] ngrok - para compartir la app con un enlace publico
where ngrok >>"%LOG%" 2>&1 || goto ngrok_falta
for /f "delims=" %%v in ('ngrok version 2^>^&1') do >>"%LOG%" echo     %%v
ngrok config check >>"%LOG%" 2>&1
set "TOKEN=NO"
if defined NGROK_AUTHTOKEN set "TOKEN=SI"
findstr /i /c:"authtoken" "%LOCALAPPDATA%\ngrok\ngrok.yml" >nul 2>&1 && set "TOKEN=SI"
findstr /i /c:"authtoken" "%USERPROFILE%\.ngrok2\ngrok.yml" >nul 2>&1 && set "TOKEN=SI"
findstr /i /c:"authtoken" "%USERPROFILE%\.config\ngrok\ngrok.yml" >nul 2>&1 && set "TOKEN=SI"
if "%TOKEN%"=="SI" goto ngrok_ok
>>"%LOG%" echo     ESTADO: INSTALADO pero SIN authtoken - ejecuta CONFIGURAR_NGROK.bat
set "FALTA=1"
goto extras
:ngrok_ok
>>"%LOG%" echo     ESTADO: OK - authtoken configurado
goto extras
:ngrok_falta
>>"%LOG%" echo     ESTADO: NO INSTALADO - ejecuta CONFIGURAR_NGROK.bat o mira docs\GUIA_NGROK.md
set "FALTA=1"

:extras
>>"%LOG%" echo.
>>"%LOG%" echo [4] Opcionales
where git >nul 2>&1
if errorlevel 1 (>>"%LOG%" echo     git: no instalado - opcional) else (for /f "delims=" %%v in ('git --version') do >>"%LOG%" echo     %%v)
where winget >nul 2>&1
if errorlevel 1 (>>"%LOG%" echo     winget: no disponible) else (>>"%LOG%" echo     winget: disponible)
>>"%LOG%" echo.
>>"%LOG%" echo [5] Proyecto
netstat -ano | findstr /c:":5173 " /c:":4173 " >nul
if errorlevel 1 (>>"%LOG%" echo     Puertos 5173 y 4173 libres) else (>>"%LOG%" echo     Atencion: el puerto 5173 o 4173 ya esta en uso)
if exist "%~dp0node_modules" (>>"%LOG%" echo     node_modules: instalado) else (>>"%LOG%" echo     node_modules: falta ejecutar INSTALAR.bat)

>>"%LOG%" echo.
if defined FALTA (>>"%LOG%" echo RESULTADO: falta instalar o configurar algo. Revisa las lineas ESTADO.) else (>>"%LOG%" echo RESULTADO: todo listo. Siguiente paso: INSTALAR.bat)

type "%LOG%"
echo.
echo El resultado tambien quedo guardado en verificacion-entorno.txt
pause
