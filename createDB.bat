@echo off

rem prompt for password
set /p PGPASSWORD="Enter password: "

cd /d %~dp0
echo Current directory: %cd%

if exist ".\Model\scripts.bat" (
    echo Running scripts.bat...
    call ".\Model\scripts.bat"
) else (
    echo scripts.bat not found in %cd%\Model
)

rem clear password from variable
set PGPASSWORD=

echo Done.
