const express = require("express");
const pool = require("./db/db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
