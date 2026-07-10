const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authmiddleware");
const pool = require("../db/db");
const { depositmoney } = require("../controllers/depositmoney");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "select u.id,u.name,u.email,u.phone ,a.account_number,a.account_type,a.balance ,a.upi_id from users u left join accounts a on u.id = a.user_id where u.id = $1",
      [req.user.id],
    );
 
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "user not found" });
    }
    const user = result.rows[0];

    res.json({
      message: "Protected route accessed",
      user: user,
    });
  } catch (error) {
    console.error("profile error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.post("/deposit",authMiddleware, depositmoney);


module.exports = router;
