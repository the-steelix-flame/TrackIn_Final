// const express = require("express");
// const router = express.Router();

// // 🔹 GET all trades
// app.get('/trades', wrapAsync(async (req, res) => {
//     const [trades] = await db.query("SELECT * FROM trades");
//     res.json(trades);
// }));

// // 🔹 GET trades for a specific user
// app.get('/users/:id/trades', wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     const [[user]] = await db.query("SELECT * FROM users WHERE uId = ?", [userId]);
//     if (!user) throw new ExpressError(404, "User not found");

//     const [trades] = await db.query("SELECT * FROM trades WHERE user_id = ?", [userId]);
//     res.render("userTradeinfo.ejs", { user, trades });
// }));

// // 🔹 Form to add new trade
// app.get('/users/:user_id/trades/new', wrapAsync(async (req, res) => {
//     const [[user]] = await db.query("SELECT * FROM users WHERE uId = ?", [req.params.user_id]);
//     if (!user) throw new ExpressError(404, "User not found");
//     res.render("newTrade.ejs", { user });
// }));

// // 🔹 CREATE trade
// app.post('/users/:user_id/trades', wrapAsync(async (req, res) => {
//     const { user_id } = req.params;
//     let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

//     if (!date) throw new ExpressError(400, "Date is required!");
//     if (!stock || !qty || !direction || !enTime || !exTime || !enPrice || !exPrice)
//         throw new ExpressError(400, "Missing required fields!");

//     date = new Date(date).toISOString().split("T")[0];

//     const isValidTime = (t) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(t);
//     if (!isValidTime(enTime) || !isValidTime(exTime)) {
//         throw new ExpressError(400, "Invalid time format! Use HH:MM:SS");
//     }

//     await db.query(`
//         INSERT INTO trades 
//         (user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `, [user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview]);

//     res.redirect(`/users/${user_id}/trades`);
// }));

// // 🔹 Edit trade form
// app.get('/users/:user_id/trades/:tradeid', wrapAsync(async (req, res) => {
//     const [[user]] = await db.query("SELECT * FROM users WHERE uId = ?", [req.params.user_id]);
//     const [[trade]] = await db.query("SELECT * FROM trades WHERE tradeid = ?", [req.params.tradeid]);
//     if (!user || !trade) throw new ExpressError(404, "User or Trade not found");

//     res.render("editTradeinfo.ejs", { user, trade });
// }));

// // 🔹 UPDATE trade
// app.put('/users/:user_id/trades/:tradeid', wrapAsync(async (req, res) => {
//     const { user_id, tradeid } = req.params;
//     let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

//     date = new Date(date).toISOString().split("T")[0];
//     const isValidTime = (t) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(t);
//     if (!isValidTime(enTime) || !isValidTime(exTime)) {
//         throw new ExpressError(400, "Invalid time format");
//     }

//     const [result] = await db.query(`
//         UPDATE trades SET 
//         date=?, stock=?, qty=?, direction=?, enTime=?, exTime=?, enPrice=?, exPrice=?, pro_los=?, 
//         enReason=?, exReason=?, stoploss=?, target=?, market=?, mistake=?, finalview=?
//         WHERE tradeid=? AND user_id=?
//     `, [date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview, tradeid, user_id]);

//     if (result.affectedRows === 0) throw new ExpressError(404, "Trade not found");

//     res.redirect(`/users/${user_id}/trades`);
// }));

// // 🔹 DELETE trade
// app.delete('/users/:user_id/trades/:tradeid', wrapAsync(async (req, res) => {
//     const { user_id, tradeid } = req.params;

//     const [result] = await db.query('DELETE FROM trades WHERE tradeid = ? AND user_id = ?', [tradeid, user_id]);
//     if (result.affectedRows === 0) throw new ExpressError(404, "Trade not found");

//     res.redirect(`/users/${user_id}/trades`);
// }));


const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn} = require('../middleware.js');

// Middleware to protect routes
// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
//   };

// GET all trades for user
router.get('/',isLoggedIn, wrapAsync(async (req, res) => {
    const userId = req.params.user_id;
    const [[user]] = await db.query("SELECT * FROM Ogusers WHERE uId = ?", [userId]);
    if (!user) throw new ExpressError(404, "User not found");

    const [trades] = await db.query("SELECT * FROM trades WHERE user_id = ?", [userId]);
    res.render("userTradeinfo.ejs", { user, trades });
}));

// Form to add new trade
router.get('/new',isLoggedIn, wrapAsync(async (req, res) => {
    const [[user]] = await db.query("SELECT * FROM Ogusers WHERE uId = ?", [req.params.user_id]);
    if (!user) throw new ExpressError(404, "User not found");
    res.render("newTrade.ejs", { user });
}));

// CREATE trade
router.post('/',isLoggedIn, wrapAsync(async (req, res) => {
    const { user_id } = req.params;
    let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

    if (!date || !stock || !qty || !direction || !enTime || !exTime || !enPrice || !exPrice)
        throw new ExpressError(400, "Missing required fields!");

    date = new Date(date).toISOString().split("T")[0];
    const isValidTime = t => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(t);
    if (!isValidTime(enTime) || !isValidTime(exTime)) {
        throw new ExpressError(400, "Invalid time format! Use HH:MM:SS");
    }

    await db.query(`
        INSERT INTO trades 
        (user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview]);

    req.flash("success", "New trade added!!");
    res.redirect(`/users/${user_id}/trades`);
}));

// Edit trade form
router.get('/:tradeid',isLoggedIn, wrapAsync(async (req, res) => {
    const [[user]] = await db.query("SELECT * FROM Ogusers WHERE uId = ?", [req.params.user_id]);
    const [[trade]] = await db.query("SELECT * FROM trades WHERE tradeid = ?", [req.params.tradeid]);
    if (!user || !trade) throw new ExpressError(404, "User or Trade not found");
    res.render("editTradeinfo.ejs", { user, trade });
}));

// UPDATE trade
router.put('/:tradeid',isLoggedIn, wrapAsync(async (req, res) => {
    const { user_id, tradeid } = req.params;
    let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

    date = new Date(date).toISOString().split("T")[0];
    const isValidTime = t => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(t);
    if (!isValidTime(enTime) || !isValidTime(exTime)) {
        throw new ExpressError(400, "Invalid time format");
    }

    const [result] = await db.query(`
        UPDATE trades SET 
        date=?, stock=?, qty=?, direction=?, enTime=?, exTime=?, enPrice=?, exPrice=?, pro_los=?, 
        enReason=?, exReason=?, stoploss=?, target=?, market=?, mistake=?, finalview=?
        WHERE tradeid=? AND user_id=?
    `, [date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, enReason, exReason, stoploss, target, market, mistake, finalview, tradeid, user_id]);

    if (result.affectedRows === 0) throw new ExpressError(404, "Trade not found");
    req.flash("success", "Trade edited successfully!!");
    res.redirect(`/users/${user_id}/trades`);
}));

// DELETE trade
router.delete('/:tradeid',isLoggedIn, wrapAsync(async (req, res) => {
    const { user_id, tradeid } = req.params;
    const [result] = await db.query('DELETE FROM trades WHERE tradeid = ? AND user_id = ?', [tradeid, user_id]);
    if (result.affectedRows === 0) throw new ExpressError(404, "Trade not found");
    req.flash("success", "Trade deleted!!");
    res.redirect(`/users/${user_id}/trades`);
}));

module.exports = router;
