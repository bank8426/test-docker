const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = process.env.BACKEND_PORT;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: process.env.PMA_HOST,
    user: process.env.PMA_USER,
    password: process.env.PMA_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};

app.get("/users", async (req, res) => {
  const [results] = await conn.query("SELECT * FROM users");
  res.json(results);
});

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

app.listen(port, async () => {
  await initMySQL();
  console.log(`Server running at http://localhost:${port}/`);
});
