@echo off
setlocal EnableExtensions
chcp 65001 >nul
title TarifaJusta - Instalar
cd /d "%~dp0"
set "LOG=%~dp0registro-instalacion.txt"
set "ERROR_PASO="

echo.
echo  TarifaJusta - Instalacion
echo  =========================
echo  Esto descarga las dependencias, prueba la logica y compila la app.
echo  Tarda uno o dos minutos la primera vez. El detalle queda en registro-instalacion.txt
echo.

> "%LOG%" echo TarifaJusta - Registro de instalacion - %date% %time%

where node >nul 2>&1 || goto sin_node

echo  [1/3] Instalando dependencias con npm install...
>>"%LOG%" echo.
>>"%LOG%" echo ===== npm install =====
call npm install >>"%LOG%" 2>&1 || (set "ERROR_PASO=npm install" & goto fallo)
echo        OK

echo  [2/3] Probando la logica de negocio con npm test...
>>"%LOG%" echo.
>>"%LOG%" echo ===== npm test =====
call npm test >>"%LOG%" 2>&1 || (set "ERROR_PASO=npm test" & goto fallo)
echo        OK

echo  [3/3] Compilando la version de produccion con npm run build...
>>"%LOG%" echo.
>>"%LOG%" echo ===== npm run build =====
call npm run build >>"%LOG%" 2>&1 || (set "ERROR_PASO=npm run build" & goto fallo)
echo        OK

>>"%LOG%" echo.
>>"%LOG%" echo RESULTADO: instalacion completa
echo.
echo  Listo. Ahora puedes:
echo    - INICIAR.bat               para usar la app en este PC
echo    - COMPARTIR_CON_NGROK.bat   para compartirla con los estudiantes
echo.
goto fin

:sin_node
>>"%LOG%" echo RESULTADO: falta Node.js
echo  No se encontro Node.js. Instala la version LTS desde https://nodejs.org y vuelve a intentarlo.
goto fin

:fallo
>>"%LOG%" echo.
>>"%LOG%" echo RESULTADO: fallo en %ERROR_PASO%
echo.
echo  Algo fallo en: %ERROR_PASO%
echo  Revisa el archivo registro-instalacion.txt. Las ultimas lineas son:
echo  ------------------------------------------------------------
powershell -NoProfile -Command "Get-Content -LiteralPath '%LOG%' -Tail 25"
echo  ------------------------------------------------------------

:fin
echo.
pause
