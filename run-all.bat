@echo off
title BimaKey - Running All Services

echo ================================================
echo    Starting BimaKey Insurance Platform
echo ================================================
echo.

:: Start Backend in new window
start "BimaKey Backend" cmd /k "cd /d %~dp0backend && npm run dev"

:: Wait a moment
timeout /t 2 /nobreak >nul

:: Start Frontend
start "BimaKey Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ================================================
echo    Services Started!
echo.
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:5173
echo.
echo    Press Ctrl+C in each window to stop
echo ================================================
