const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL || "";
const pool = new Pool({
  connectionString,
  ssl: true,
});

module.exports = pool;
