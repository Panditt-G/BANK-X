const pool = require("../db/db")
const authMiddleware = require("../middleware/authmiddleware")
exports.depositmoney = async(req,res)=>{
    const {amount, identifier} = req.body;
    
    try{
        if (!identifier) {
            return res.status(400).json({error: "Recipient Account Number or UPI ID is required."});
        }
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({error: "Please enter a valid deposit amount."});
        }

        // Check if identifier contains '@' (signifying UPI ID)
        let accountQuery;
        if (identifier.includes("@")) {
            accountQuery = await pool.query("select * from accounts where LOWER(upi_id) = LOWER($1)", [identifier.trim()]);
        } else {
            accountQuery = await pool.query("select * from accounts where UPPER(account_number) = UPPER($1)", [identifier.trim()]);
        }

        if(accountQuery.rows.length === 0){
            return res.status(404).json({error:"Recipient account not found."})
        }
        
        const accountnew = accountQuery.rows[0];
        const newBalance = Number(accountnew.balance) + Number(amount);

        const result = await pool.query("update accounts set balance = $1 where account_number = $2", [newBalance, accountnew.account_number]);

        const transaction_id = Date.now()
        const transaction = await pool.query("insert into transactions (account_id,user_id,amount,type,status,transaction_id) values ($1,$2,$3,$4,$5,$6) ",[accountnew.id,accountnew.user_id,amount,"deposit","success",transaction_id])

        res.status(200).json({message:"Deposit successful!!!"})
    }
    catch(error){
        console.log("error details",error)
        res.status(500).json({error:"Internal server error",details:error.message})
    }

}