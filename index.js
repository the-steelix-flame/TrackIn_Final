// const express = require('express');
// const app = express();
// require('express-async-errors')
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());

// const path = require('path');
// app.use(express.static('views'));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname,"views"));
// app.use(express.urlencoded({ extended: true}));
// app.use(methodOverride("_method"));
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname,"/public")));

// // MySQL Connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'B@n%tI970',
//     database: 'mysql_db'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to MySQL database.');
//     }
// });

// app.get("/",(req,res)=>{
//     res.send("ROOT!!");
// })

// app.get("/home",(req,res)=>{
//    res.render("frontpage.ejs");
// })



// // 🔹 GET all users
// app.get('/users', wrapAsync(async(req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.json(results);
//     });
// }));

// // 🔹 GET a single user by ID
// app.get('/users/:id',wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     db.query('SELECT * FROM users WHERE uId = ?', [userId], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) return res.status(404).json({ message: 'User not found' });
//         //res.render("userDash.ejs",{info :result[0]});
//         //res.json(results[0]);

//         db.query('SELECT * FROM trades WHERE user_id = ?', [userId], (err, results) => {
//             if (err) return res.status(500).json(err);
//             res.render("userDash.ejs",{user : result[0], trades :results, });
//             //res.json(results);
//         });
//     });
// }));

// // 🔹 CREATE a new user
// app.post('/users', 
//     wrapAsync(async(req, res,next) => {
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade} = req.body;
//     db.query('INSERT INTO users (uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade) VALUES (?,?,?,?,?,?,?)', [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade ], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ id: result.insertId, uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade });
//     });
// }));

// // 🔹 UPDATE a user
// app.put('/users/:id', wrapAsync(async(req, res) => {
//     const userId = req.params.id;
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
//     db.query('UPDATE users SET uName = ?, uEmail = ?, uPass = ?, uNote = ?, totalPL = ?, pTrade = ?, lTrade = ? WHERE uId = ?', [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade, userId], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'User updated successfully' });
//     });
// }));

// // 🔹 DELETE a user
// app.delete('/users/:id',wrapAsync(async(req, res) => {
//     const userId = req.params.id;
//     db.query("DELETE  FROM trades WHERE user_id = ?",[userId])
//     db.query('DELETE FROM users WHERE uId = ?', [userId], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'User deleted successfully' });
//     });
// }));

// //Trades--Routing
// // 🔹 GET all trades
// app.get('/trades',wrapAsync(async (req, res) => {
//     db.query('SELECT * FROM trades', (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.json(results);
//     });
// }));

// // 🔹 GET all trades for a specific user
// app.get('/users/:id/trades', wrapAsync(async(req, res) => {
//     const userId = req.params.id;
//     db.query('SELECT * FROM users WHERE uId = ?', [userId], (err, userInfo) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
//         if (userInfo.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         //console.log(userInfo);

//         db.query('SELECT * FROM trades WHERE user_id = ?', [userId], (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.render("userTradeinfo.ejs",{user : userInfo[0], trades :results, });
//         //res.json(results);
//         });
//     });
// }));

// //Add new Trade form
// app.get('/users/:user_id/trades/new', wrapAsync(async(req,res)=>{
//     const userId = req.params.user_id;
//     db.query('SELECT * FROM users WHERE uId = ?', [userId], (err, userInfo) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
//         if (userInfo.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.render("newTrade.ejs",{user : userInfo[0]});
//     });
// }));


// // 🔹 CREATE a new trade for a specific user
// // app.post('/users/:user_id/trades', (req, res) => {
// //     const { user_id } = req.params;
// //     let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
// //         enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

// //     // Convert ISO date to MySQL date format (YYYY-MM-DD)
// //     date = new Date(date).toISOString().split('T')[0]; 

// //     if (!date || !stock || !qty || !direction || !enTime || !exTime || !enPrice || !exPrice) {
// //         return res.status(400).json({ error: "Missing required fields!" });
// //     }

// //     db.query(
// //         `INSERT INTO trades 
// //         (user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
// //         enReason, exReason, stoploss, target, market, mistake, finalview) 
// //         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
// //         [user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
// //         enReason, exReason, stoploss, target, market, mistake, finalview], 
// //         (err, result) => {
// //             if (err) return res.status(500).json(err);
// //             res.json({ 
// //                 id: result.insertId, 
// //                 user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
// //                 enReason, exReason, stoploss, target, market, mistake, finalview 
// //             });
// //         }
// //     );
// // });

// // 🔹 CREATE a new trade for a specific user
// app.post('/users/:user_id/trades', wrapAsync(async(req, res) => {
//     const { user_id } = req.params;
//     let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
//         enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

//     // Ensure date is valid
//     if (!date) {
//         return res.status(400).json({ error: "Date is required!" });
//     }

//     // Convert date to MySQL format (YYYY-MM-DD)
//     date = new Date(date).toISOString().split('T')[0];

//     // Validate required fields
//     if (!stock || !qty || !direction || !enTime || !exTime || !enPrice || !exPrice) {
//         return res.status(400).json({ error: "Missing required fields!" });
//     }

//     // Ensure time values are properly formatted in HH:MM:SS
//     const isValidTime = (time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
    
//     if (!isValidTime(enTime) || !isValidTime(exTime)) {
//         return res.status(400).json({ error: "Invalid time format! Use HH:MM:SS" });
//     }

//     db.query(
//         `INSERT INTO trades 
//         (user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
//         enReason, exReason, stoploss, target, market, mistake, finalview) 
//         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//         [user_id, date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
//         enReason, exReason, stoploss, target, market, mistake, finalview], 
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.redirect(`/users/${user_id}/trades`);
//         }
//     );
// }));

// //GET ROUTE FOR EDIT TRADE ENTRY
// // app.get('/users/:user_id/trades/:tradeid',(req,res)=>{
// //     const tradeId = req.params.tradeid;
// //     db.query('SELECT * FROM trades WHERE tradeid = ?', [tradeId], (err, tradeInfo) => {
// //         if (err) {
// //             return res.status(500).json({ error: "Database error", details: err });
// //         }
// //         if (tradeInfo.length === 0) {
// //             return res.status(404).json({ error: "Trade not found" });
// //         }
// //         res.render("editTradeinfo.ejs",{trades : tradeInfo});
// //     });
// // });

// app.get('/users/:user_id/trades/:tradeid', wrapAsync(async(req, res) => {
//     const userId = req.params.user_id;  // Extract user_id
//     const tradeId = req.params.tradeid; // Extract tradeid

//     // Query to get user details
//     db.query('SELECT * FROM users WHERE uId = ?', [userId], (err, userInfo) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }
//         if (userInfo.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Query to get trade details
//         db.query('SELECT * FROM trades WHERE tradeid = ?', [tradeId], (err, tradeInfo) => {
//             if (err) {
//                 return res.status(500).json({ error: "Database error", details: err });
//             }
//             if (tradeInfo.length === 0) {
//                 return res.status(404).json({ error: "Trade not found" });
//             }
//             //console.log(tradeInfo);
//             // Render the page with both trade and user data
//             res.render("editTradeinfo.ejs", {user: userInfo[0], trade: tradeInfo[0], });
//         });
//     });
// }));



// // 🔹 UPDATE a trade
// app.put('/users/:user_id/trades/:tradeid', wrapAsync(async(req, res) => {
//     const { user_id, tradeid } = req.params;
//     let { date, stock, qty, direction, enTime, exTime, enPrice, exPrice, pro_los, 
//         enReason, exReason, stoploss, target, market, mistake, finalview } = req.body;

//     // Convert ISO date to MySQL date format (YYYY-MM-DD)
//     date = new Date(date).toISOString().split('T')[0]; 

//     // Ensure time values are properly formatted in HH:MM:SS
//     const isValidTime = (time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
    
//     if (!isValidTime(enTime) || !isValidTime(exTime)) {
//         return res.status(400).json({ error: "Invalid time format! Use HH:MM:SS" });
//     }

//     db.query(
//         `UPDATE trades SET 
//         date = ?, stock = ?, qty = ?, direction = ?, enTime = ?, exTime = ?, enPrice = ?, exPrice = ?, 
//         pro_los = ?, enReason = ?, exReason = ?, stoploss = ?, target = ?, market = ?, mistake = ?, finalview = ?
//         WHERE tradeid = ? AND user_id = ?`,
//         [date, stock, qty, direction, enTime, exTime, enPrice, exPrice, 
//         pro_los, enReason, exReason, stoploss, target, market, mistake, finalview, tradeid, user_id], 
//         (err, result) => {
//             if (err) return res.status(500).json(err);

//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ message: "Trade not found for this user" });
//             }

//             //res.json({ message: "Trade updated successfully" });
//             res.redirect(`/users/${user_id}/trades`);
//         }
//     );
// }));


// // 🔹 DELETE a trade
// app.delete('/users/:user_id/trades/:tradeid', wrapAsync(async(req, res) => {
//     const { user_id, tradeid } = req.params;

//     db.query(
//         'DELETE FROM trades WHERE tradeid = ? AND user_id = ?', 
//         [tradeid, user_id], 
//         (err, result) => {
//             if (err) return res.status(500).json(err);

//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ message: "Trade not found for this user" });
//             }

//             // res.json({ message: "Trade deleted successfully" });
//             res.redirect(`/users/${user_id}/trades`);

//         }
//     );
// }));

// app.all("*",(req,res,next) =>{
//     next(new ExpressError(404, "Page Not Found!!"));
// })

// //GLOBAL ERROR HANDLER
// app.use((err,req,res,next)=>{
//     let {statusCode=500, message="Something went wrong!!"} = err;
//     res.status(statusCode).send(message);
// })

// // Start server
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });






//CHATGPT
// const express = require('express');
// const app = express();
// require('express-async-errors');
// const path = require('path');
// const ejsMate = require("ejs-mate");
// const methodOverride = require("method-override");

// const db = require('./db'); // Use the connection pool
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");

// // Middleware
// app.engine('ejs', ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// const sessionOptions = {
//     secret: "mysupersecretcode",
//     resave: false,
//     saveUninitialized: true, 
//     cookie : {
//         expires: Date.now() + 7*24*60*60*1000,
//         maxAge: 7*24*60*60*1000,
//         httpOnly: true
//     }
// };
// app.use(session(sessionOptions));
// app.use(flash);

// // Make error accessible in all views (res.locals)
// app.use((req, res, next) => {
//     res.locals.error = null;
//     next();
// });

// // Routes
// app.get("/", (req, res) => {
//     res.send("ROOT!!");
// });


// app.get("/home", (req, res) => {
//     res.render("frontpage.ejs");
// });



// // 🔹 GET all users
// app.get('/users', wrapAsync(async (req, res) => {
//     const [users] = await db.query('SELECT * FROM users');
//     res.json(users);
// }));

// // 🔹 GET a single user with trades
// app.get('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;

//     const [[user]] = await db.query('SELECT * FROM users WHERE uId = ?', [userId]);
//     if (!user) throw new ExpressError(404, "User not found");

//     const [trades] = await db.query('SELECT * FROM trades WHERE user_id = ?', [userId]);
//     res.render("userDash.ejs", { user, trades });
// }));

// // 🔹 CREATE user
// app.post('/users', wrapAsync(async (req, res) => {
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
//     const [result] = await db.query(
//         'INSERT INTO users (uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade) VALUES (?,?,?,?,?,?,?)',
//         [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade]
//     );
//     res.json({ id: result.insertId, uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade });
// }));

// // 🔹 UPDATE user
// app.put('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     const { uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade } = req.body;
//     await db.query(
//         'UPDATE users SET uName=?, uEmail=?, uPass=?, uNote=?, totalPL=?, pTrade=?, lTrade=? WHERE uId=?',
//         [uName, uEmail, uPass, uNote, totalPL, pTrade, lTrade, userId]
//     );
//     res.json({ message: "User updated successfully" });
// }));

// // 🔹 DELETE user and trades
// app.delete('/users/:id', wrapAsync(async (req, res) => {
//     const userId = req.params.id;
//     await db.query("DELETE FROM trades WHERE user_id = ?", [userId]);
//     await db.query("DELETE FROM users WHERE uId = ?", [userId]);
//     res.json({ message: "User and trades deleted" });
// }));

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
//     req.flash("Success","New trade added!!");
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

// // 🔹 404 route
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// // // 🔹 Global Error Handler
// // app.use((err, req, res, next) => {
// //     const { statusCode = 500, message = "Something went wrong" } = err;
// //     //res.render("error.ejs");
// //     res.status(statusCode).send(message);
// // });

// // 🔹 Global Error Handler - updated to render a page with alert
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { errorMsg: message });
// });


// // 🔹 Start Server
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });







//New CHATGPT
// const express = require('express');
// const app = express();
// require('express-async-errors');
// const path = require('path');
// const ejsMate = require("ejs-mate");
// const methodOverride = require("method-override");
// const session = require("express-session");
// const flash = require("connect-flash");

// const db = require('./db');
// const ExpressError = require("./utils/ExpressError.js");

// // Route files
// const userRoutes = require('./routes/users');
// const tradeRoutes = require('./routes/trades');

// // View engine and Middleware
// app.engine('ejs', ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// const sessionOptions = {
//     secret: "mysupersecretcode",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true
//     }
// };
// app.use(session(sessionOptions));
// app.use(flash());

// app.use((req, res, next) =>{
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     next();
// });

// // Make error accessible in all views
// app.use((req, res, next) => {
//     res.locals.error = null;
//     next();
// });

// // Basic Routes
// app.get("/", (req, res) => {
//     res.send("ROOT!!");
// });

// app.get("/home", (req, res) => {
//     res.render("frontpage.ejs");
// });

// // Use route files
// app.use('/users', userRoutes);
// app.use('/users/:user_id/trades', tradeRoutes);

// // 404
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { errorMsg: message });
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });








































































// const express = require('express');
// const app = express();
// require('express-async-errors');
// const path = require('path');
// const ejsMate = require("ejs-mate");
// const methodOverride = require("method-override");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const db = require('./db');
// const bcrypt = require("bcrypt");

// const ExpressError = require("./utils/ExpressError.js");

// // Route files
// const userRoutes = require('./routes/users');
// const tradeRoutes = require('./routes/trades');
// const { router: loginSignup, isLoggedIn } = require('./routes/logsign');


// // View engine and Middleware
// app.engine('ejs', ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// // Session & Flash
// const sessionOptions = {
//     secret: "mysupersecretcode",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true
//     }
// };
// app.use(session(sessionOptions));
// app.use(flash());

// // Passport Setup
// app.use(passport.initialize());
// app.use(passport.session());

// // Local Strategy (Username/Password)
// passport.use(new LocalStrategy(
//     { usernameField: 'email' }, // Use email for login
//     async (email, password, done) => {
//         try {
//             const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//             const user = rows[0];
//             if (!user) return done(null, false, { message: "Incorrect email." });

//             const valid = await bcrypt.compare(password, user.password);
//             if (!valid) return done(null, false, { message: "Incorrect password." });

//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));


// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//     const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
//     done(null, rows[0]);
// });

// // Flash middleware for EJS
// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currentUser = req.user || null;
//     next();
// });

// // Routes
// app.get("/", (req, res) => res.send("ROOT!!"));
// app.get("/home", (req, res) => res.render("frontpage.ejs"));
// app.use("/", loginSignup);
 

// app.use('/users', userRoutes);
// app.use('/users/:user_id/trades', tradeRoutes);

// app.get('/dashboard', isLoggedIn, (req, res) => {
//     res.render('dashboard', { user: req.user });
// });


// // 404
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// // Error handler
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { errorMsg: message });
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });




// const express = require('express');
// const app = express();
// require('express-async-errors');
// const path = require('path');
// const ejsMate = require("ejs-mate");
// const methodOverride = require("method-override");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const db = require('./db');
// const bcrypt = require("bcrypt");

// const ExpressError = require("./utils/ExpressError.js");

// // Route files
// const userRoutes = require('./routes/users');
// const tradeRoutes = require('./routes/trades');
// const { router: loginSignup, isLoggedIn } = require('./routes/logsign');


// // View engine and Middleware
// app.engine('ejs', ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// // Session & Flash
// const sessionOptions = {
//     secret: "mysupersecretcode",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true
//     }
// };
// app.use(session(sessionOptions));
// app.use(flash());

// // Passport Setup
// app.use(passport.initialize());
// app.use(passport.session());

// // Local Strategy (Username/Password)
// passport.use(new LocalStrategy({ usernameField: 'uEmail' }, async (uEmail, uPass, done) => {
//         try {
//             const [rows] = await db.query("SELECT * FROM users WHERE uEmail = ?", [uEmail]);
//             const user = rows[0];
//             if (!user) return done(null, false, { message: "Incorrect email." }); // Changed message

//             const valid = await bcrypt.compare(uPass, user.uPass);
//             if (!valid) return done(null, false, { message: "Incorrect password." }); // Changed message

//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }));


// // Serialize and deserialize user by uId
// passport.serializeUser((user, done) => done(null, user.uId));
// passport.deserializeUser(async (uId, done) => {
//     try {
//         const [rows] = await db.query("SELECT * FROM users WHERE uId = ?", [uId]);
//         done(null, rows[0]);
//     } catch (err) { done(err); }
// });

// // Flash middleware for EJS
// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currentUser = req.user || null;
//     next();
// });

// // Routes
// app.get("/", (req, res) => res.send("ROOT!!"));
// app.get("/home", (req, res) => res.render("frontpage.ejs"));
// app.use("/", loginSignup);
 

// app.use('/users', userRoutes);
// app.use('/users/:user_id/trades', tradeRoutes);

// app.get('/dashboard', isLoggedIn, (req, res) => {
//     res.render('userDash', { user: req.user });
// });


// // 404
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// // Error handler
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { errorMsg: message });
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });



const express = require('express');
const app = express();
require('express-async-errors');
const path = require('path');
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require('./db');
const bcrypt = require("bcryptjs");

const ExpressError = require("./utils/ExpressError.js");

// Route files
const userRoutes = require('./routes/users');
const tradeRoutes = require('./routes/trades');
const notesRouter = require('./routes/notes');
const { router: authRoutes, isLoggedIn } = require("./routes/auth");
require("./config/passport")(passport);
//const router = require('express/lib/router/index.js');


// View engine and Middleware
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// Session & Flash
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Local Strategy (Username/Password)
// passport.use(new LocalStrategy({ usernameField: 'uEmail' }, async (uEmail, uPass, done) => {
//         try {
//             const [rows] = await db.query("SELECT * FROM users WHERE uEmail = ?", [uEmail]);
//             const user = rows[0];
//             if (!user) return done(null, false, { message: "Incorrect email." }); // Changed message

//             const valid = await bcrypt.compare(uPass, user.uPass);
//             if (!valid) return done(null, false, { message: "Incorrect password." }); // Changed message

//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }));


// Serialize and deserialize user by uId
// passport.serializeUser((user, done) => done(null, user.uId));
// passport.deserializeUser(async (uId, done) => {
//     try {
//         const [rows] = await db.query("SELECT * FROM users WHERE uId = ?", [uId]);
//         done(null, rows[0]);
//     } catch (err) { done(err); }
// });

// Flash middleware for EJS
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || null;
    next();
});

// Routes
app.get("/", (req, res) => res.send("ROOT!!"));
app.get("/home", (req, res) => res.render("frontpage.ejs"));
app.use("/", authRoutes);
 

app.use('/users', userRoutes);
app.use('/users/:user_id/trades', tradeRoutes);
app.use('/users/:user_id/notes', notesRouter);

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('userDash', { user: req.user });
});


// 404
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { errorMsg: message });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
