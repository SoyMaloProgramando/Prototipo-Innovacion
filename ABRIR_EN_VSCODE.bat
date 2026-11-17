@echo off
setlocal EnableExtensions
cd /d "%~dp0"
set "VSCODE=%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe"
where code >nul 2>&1
if not errorlevel 1 (
  call code "%~dp0."
  exit /b 0
)
if exist "%VSCODE%" (
  start "" "%VSCODE%" "%~dp0."
  exit /b 0
)
echo No se encontro Visual Studio Code. Abre la carpeta desde VS Code con Archivo, Abrir carpeta.
pause
