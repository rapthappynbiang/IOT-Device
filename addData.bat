@echo off

rem create add dummy data database
set DEV_DB=MyDB
set PG_PATH=C:\Program Files\PostgreSQL\14\bin

set SQL_FILE=%cd%\Model\initialData.sql
echo Adding Dummy Data...
"%PG_PATH%\psql.exe" -U postgres -h localhost -p 5432 -d %DEV_DB% -f "%SQL_FILE%"
goto end

echo Done
pause

