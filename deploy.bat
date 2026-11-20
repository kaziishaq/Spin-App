@echo off
REM SpinPick - build and publish to Vercel. Double-click this file to run it.
title SpinPick - Deploy to Vercel
cd /d "%~dp0"

echo.
echo ===== 1/4  Checking Node.js =====
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download it from https://nodejs.org and run this file again.
  goto :end
)

echo.
echo ===== 2/4  Checking Vercel =====
where vercel >nul 2>nul
if errorlevel 1 (
  echo Installing Vercel...
  call npm install -g vercel
  if errorlevel 1 (
    echo Could not install Vercel.
    goto :end
  )
)

call vercel whoami >nul 2>nul
if errorlevel 1 (
  echo You are not logged in. A browser window will open to log in.
  call vercel login
  if errorlevel 1 goto :end
)

echo.
echo ===== 3/4  Building the site =====
call node build.js
if errorlevel 1 (
  echo Build failed.
  goto :end
)

echo.
echo ===== 4/4  Publishing to Vercel =====
echo First time only: press Enter to accept the defaults, and type a project name like spinpick.
echo.
call vercel dist --prod
if errorlevel 1 (
  echo Publishing failed. Read the message above.
  goto :end
)

echo.
echo ===== Done! Your live link is shown above (https://....vercel.app) =====

:end
echo.
pause
