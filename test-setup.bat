@echo off
echo ================================================
echo   BimaKey Platform - Quick Verification Test
echo ================================================
echo.

echo Testing Backend Health...
curl -s http://localhost:5000/api/health
echo.
echo.

echo Testing AI Service...
curl -s http://localhost:5000/api/ai/health
echo.
echo.

echo ================================================
echo   All Tests Complete!
echo ================================================
pause
