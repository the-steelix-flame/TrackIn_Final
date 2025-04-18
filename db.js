//const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'B@n%tI970',
//     database: 'mysql_db'
// })
//const mysql = require('mysql2');

// Configure the connection
// db.js
//MAIN
const mysql = require('mysql2/promise');

// Configure the pool (recommended)
const pool = mysql.createPool({
    host: 'tramway.proxy.rlwy.net',
    user: 'root',
    password: 'BtXrxurgqqjyQLPaxFxQZywpBNNYPBTf',
    database: 'railway',
    port: 19753,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;











// const mysql = require('mysql2');

// // Configure the connection
// const connection = mysql.createConnection({
//     host: 'tramway.proxy.rlwy.net',
//     user: 'root',
//     password: 'BtXrxurgqqjyQLPaxFxQZywpBNNYPBTf', // Replace with your actual password
//     database: 'railway',
//     port: 19753
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database as ID', connection.threadId);
// });

// // Create a table (if it doesn't exist)
// const createTableQuery = `
//     CREATE TABLE notes (
//     noteId INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     title VARCHAR(255),
//     content TEXT,
//     FOREIGN KEY (user_id) REFERENCES Ogusers(uId) ON DELETE CASCADE
//     )
// `;

// connection.query(createTableQuery, (err, results) => {
//     if (err) {
//         console.error('Error creating table:', err.stack);
//         return;
//     }
//     console.log('Table "notes" is ready');
// });

// Keep the connection open for further operations










// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the database as ID', connection.threadId);
// });

// // Example query
// connection.query('SELECT 1 + 1 AS result', (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err.stack);
//         return;
//     }
//     console.log('Query result:', results[0].result); // Should print 2
// });

// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS trades (
//   tradeid INT NOT NULL AUTO_INCREMENT,
//   user_id INT DEFAULT NULL,
//   date DATE DEFAULT NULL,
//   stock VARCHAR(255) DEFAULT NULL,
//   qty INT DEFAULT NULL,
//   direction VARCHAR(255) DEFAULT NULL,
//   enTime TIME DEFAULT NULL,
//   exTime TIME DEFAULT NULL,
//   enPrice INT DEFAULT NULL,
//   exPrice INT DEFAULT NULL,
//   pro_los INT DEFAULT NULL,
//   enReason VARCHAR(255) DEFAULT NULL,
//   exReason VARCHAR(255) DEFAULT NULL,
//   stoploss INT DEFAULT NULL,
//   target INT DEFAULT NULL,
//   market VARCHAR(255) DEFAULT NULL,
//   mistake VARCHAR(255) DEFAULT NULL,
//   finalview VARCHAR(255) DEFAULT NULL,
//   PRIMARY KEY (tradeid),
//   FOREIGN KEY (user_id) REFERENCES Ogusers(uId) ON DELETE CASCADE
// );

// `;

// connection.query(createTableQuery, (err, results) => {
//     if (err) {
//         console.error('Error creating table:', err.stack);
//         return;
//     }
//     console.log('Table "Ogusers" is ready');
// });

// // Close the connection (optional, depending on your use case)
// // connection.end();
// // const mysql = require('mysql2/promise');

// // const pool = mysql.createPool({
// //     host: 'tramway.proxy.rlwy.net',
// //     port: 19753,
// //     user: 'root',
// //     password: 'BtXrxurgqqjyQLPaxFxQZywpBNNYPBTf', // Replace with your actual password
// //     database: 'railway'
// // });

// // module.exports = pool;