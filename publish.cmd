@echo off
rem Double-click to publish the newest saved version in Downloads to the live site.
cd /d "%~dp0"
node publish.js %*
echo.
pause
