const pool = require("./pool");

// READ FUNCTIONS
async function getUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
    [email]
  );
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [
    id,
  ]);
  return rows;
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * from messages");
  return rows;
}

async function getUsersByIds(userIds) {
  const placeholders = userIds.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE id IN (${placeholders})`,
    userIds
  );
  return rows;
}

module.exports = {
  getUserByEmail,
  getUserById,
  getAllMessages,
  getUsersByIds,
};
