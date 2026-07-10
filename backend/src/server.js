const express = require("express");
const pool = require("./db/db");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const path = require("path");


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "../public")));

app.use("/api/auth", authRoutes);

// app.get("/", async (req, res) => {
//   const result = await pool.query("SELECT NOW()");
//   res.json(result.rows);
// });

 const Path = path.join(__dirname, "..","./public/index.html"  )
 console.log(path);
 console.log("__dirname",__dirname);
 console.log("Path",Path);
 
 
app.get("*name",(req,res)=>{
 
 res.sendFile(Path)
 
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
