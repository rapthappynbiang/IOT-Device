const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MyDB",
  password: "password",
  port: 5432,
});

const db = pool;

module.exports = { db };
