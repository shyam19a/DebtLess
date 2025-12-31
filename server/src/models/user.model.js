const db = require("../config/db");

exports.getAllUsers = async () => {
  const res = await db.query("SELECT * FROM users ORDER BY id");
  return res.rows;
};

exports.createUser = async ({ name, email }) => {
  const res = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return res.rows[0];
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
};
