const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {createAccount} = require("../controllers/accountcreat");

// 1. User Registration Logic
exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    // Check if user already exists
    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR phone = $2",
      [email, phone]
    );
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "Email or Phone already registered." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into DB
    const newUser = await pool.query(
      "INSERT INTO users (name, phone, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
      [name, phone, email, hashedPassword]
    );
    const createdAccount = await createAccount(newUser.rows[0].id,name);
    
    res.status(201).json({ 
      message: "Registration successful!", 
      user: newUser.rows[0], 
      account: createdAccount 
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. User Login Logic
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid Email or Password." });
    }

    const user = result.rows[0];

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or Password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "bankxsecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// // user registration login check....
// exports.register = async(req,res) => {
//   const{name,phone,email,password}=req.body
//     try{
//       const user  = await pool.query("select * from users where email = $1 or phone = $2",[email,phone]);
//       if(user.rows.length > 0){
//         return res.status(400).json({error:"user Email or phone number already exit"})
//       }

//       //hash passowrd
//       const hashpassword = await bcrypt.hash(password,10);

//       //user insert
//       const newUser = await pool.query(" INSERT INTO  USERS (name,phone ,email,password) VALUES ($1,$2,$3,$4) RETURNING id,name,email",[name,phone,email,hashpassword]);
//       res.status(201).json({message:"user registration successfull!!!"})
//     }
//     catch(error){
//         console.error("register error:",error)
//         res.status(500).json({error:"Internal server error",details:error.message})
//     }
  
// }