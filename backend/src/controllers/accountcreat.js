const pool = require("../db/db");

exports.createAccount = async (userId,name) => {
 
  try {
    // 1. Check if user already has a bank account in the accounts table
    const accountExist = await pool.query(
      "SELECT * FROM accounts WHERE user_id = $1", 
      [userId]
    );
    
    
    
    if (accountExist.rows.length > 0) {
      throw new Error("Bank account already exists for this user.");
    }

    // 2. Generate mock details
    const account_number = "BANKX" + Date.now();
    const ifsc_code = "bankx000001";
    const account_type = "savings";
    const balance = 0.00;
    const status = "active";
    const upi_id = `${name.toLowerCase().replace(/\s/g, "")}@bankx`;
    
    // 3. Insert user bank account record
    const result = await pool.query(
      "INSERT INTO accounts (user_id, account_number, ifsc_code, account_type, balance, upi_id, status) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *",
      [userId, account_number, ifsc_code, account_type, balance, upi_id, status]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Account Create Error:", error);
    throw error;
  }
};