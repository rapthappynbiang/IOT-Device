@echo off

rem create pts_dev database
set DEV_DB=MyDB
set PG_PATH=C:\Program Files\PostgreSQL\14\bin
set MAIN_DIRECTORY=%CD%
set TABLES=.\Model\tables


echo Creating Dev database...
"%PG_PATH%\createdb.exe" -U postgres -h localhost -p 5432 -w %DEV_DB%

echo create tables
cd /d %TABLES%

:: Loop through all TABLES files in the directory and run them
for %%F in (*.sql) do (
    echo Running table scripts: %%F
    "%PG_PATH%\psql.exe" -U postgres -h localhost -p 5432 -d %DEV_DB% -w -f "%%F"
)




