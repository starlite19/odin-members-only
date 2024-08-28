const pool = require("./pool");

// CREATE FUNCTIONS
async function insertUser(first, last, pass, email) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, password, email, status_id)" +
      "VALUES ($1, $2, $3, $4, $5)",
    [first, last, pass, email, 1]
  );
}

async function insertMessage(user_id, title, text) {
  await pool.query(
    "INSERT INTO messages (user_id, title, time, text)" +
      "VALUES ($1, $2, CURRENT_TIMESTAMP(), $3)",
    [user_id, title, text]
  );
}

module.exports = {
  insertUser,
  insertMessage,
};
