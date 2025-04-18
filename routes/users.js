// const express = require("express");
// const router = express.Router();
// const db = require('../db.js'); // Use the connection pool
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");

// // 🔹 GET all users
// router.get('/users', wrapAsync(async (req, res) => {
//     const [users] = await db.query('SELECT * FROM users');
//     res.json(users);
// }));

// // 🔹 GET a single user with trades
// router.get('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;

//     const [[user]] = await db.query('SELECT * FROM users WHERE uId = ?', [userId]);
//     if (!user) throw new ExpressError(404, "User not found");

//     const [trades] = await db.query('SELECT * FROM trades WHERE user_id = ?', [userId]);
//     res.render("userDash.ejs", { user, trades });
// }));

// // 🔹 CREATE user
// router.post('/users', wrapAsync(async (req, res) => {
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
//     const [result] = await db.query(
//         'INSERT INTO users (uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade) VALUES (?,?,?,?,?,?,?)',
//         [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade]
//     );
//     res.json({ id: result.insertId, uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade });
// }));

// // 🔹 UPDATE user
// router.put('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
//     await db.query(
//         'UPDATE users SET uName=?, uEmail=?, uPass=?, uNote=?, totalPL=?, pTrade=?, lTrade=? WHERE uId=?',
//         [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade, userId]
//     );
//     res.json({ message: "User updated successfully" });
// }));

// // 🔹 DELETE user and trades
// router.delete('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     await db.query("DELETE FROM trades WHERE user_id = ?", [userId]);
//     await db.query("DELETE FROM users WHERE uId = ?", [userId]);
//     res.json({ message: "User and trades deleted" });
// }));



const express = require('express');
const router = express.Router();
const db = require('../db');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn} = require('../middleware.js');

// Middleware to protect routes
// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
//   };

// GET all users
router.get('/',isLoggedIn, wrapAsync(async (req, res) => {
    const [users] = await db.query('SELECT * FROM Ogusers');
    res.json(users);
}));

// GET a single user with trades
// router.get('/:id',isLoggedIn, wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     const [[user]] = await db.query('SELECT * FROM Ogusers WHERE uId = ?', [userId]);
//     //if (!user) throw new ExpressError(404, "User doesn't exist");
//     if (!user){
//         req.flash("error","User doesn't exist!!");
//         res.redirect("/home");
//     }
//     const [trades] = await db.query('SELECT * FROM trades WHERE user_id = ?', [userId]);
//     res.render("userDash.ejs", { user, trades });
// }));

router.get('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const userId = req.params.id;
  
    // Step 1: Check user exists
    const [[user]] = await db.query('SELECT * FROM Ogusers WHERE uId = ?', [userId]);
  
    if (!user) {
      req.flash("error", "User doesn't exist!!");
      return res.redirect("/home");
    }
  
    // Step 2: Get user's trades
    const [trades] = await db.query('SELECT * FROM trades WHERE user_id = ?', [userId]);
  
    // Step 3: Calculate total P&L, profit count, and loss count
    const [[stats]] = await db.query(`
        SELECT 
          IFNULL(SUM(pro_los) * -1, 0) AS totalPL,
          COUNT(CASE WHEN pro_los > 0 THEN 1 END) AS lTrade,
          COUNT(CASE WHEN pro_los < 0 THEN 1 END) AS pTrade
        FROM trades
        WHERE user_id = ?
      `, [userId]);
      
  
    // Debugging logs
    //console.log("Stats:", [stats]);
  
    // Step 4: Attach stats to user
    user.totalPL = stats.totalPL;
    user.pTrade = stats.pTrade;
    user.lTrade = stats.lTrade;
  
    // Final step: Render dashboard
    res.render("userDash.ejs", { user, trades });
  }));
  
  

// CREATE user
router.post('/',isLoggedIn, wrapAsync(async (req, res) => {
    const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
    const [result] = await db.query(
        'INSERT INTO Ogusers (uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade) VALUES (?,?,?,?,?,?,?)',
        [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade]
    );
    res.json({ id: result.insertId, uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade });
}));

// UPDATE user
router.put('/:id',isLoggedIn, wrapAsync(async (req, res) => {
    const userId = req.params.id;
    const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
    await db.query(
        'UPDATE Ogusers SET uName=?, uEmail=?, uPass=?, uNote=?, totalPL=?, pTrade=?, lTrade=? WHERE uId=?',
        [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade, userId]
    );
    res.json({ message: "User updated successfully" });
}));

// DELETE user and trades
router.delete('/:id',isLoggedIn, wrapAsync(async (req, res) => {
    const userId = req.params.id;
    await db.query("DELETE FROM trades WHERE user_id = ?", [userId]);
    await db.query("DELETE FROM Ogusers WHERE uId = ?", [userId]);
    res.json({ message: "User and trades deleted" });
}));

module.exports = router;
