const db = require("../db");
const bcrypt = require("bcrypt");

const findUserByEmail = async (uEmail) => {
  const [rows] = await db.query("SELECT * FROM Ogusers WHERE uEmail = ?", [uEmail]);
  return rows[0];
};

const findUserById = async (uId) => {
  const [rows] = await db.query("SELECT * FROM Ogusers WHERE uId = ?", [uId]);
  return rows[0];
};

const createUser = async (uName, uEmail, uPass) => {
  const hashedPassword = await bcrypt.hash(uPass, 10);
  await db.query(
    "INSERT INTO Ogusers (uName, uEmail, uPass) VALUES (?, ?, ?)",
    [uName, uEmail, hashedPassword]
  );
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
