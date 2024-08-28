const pool = require("./pool");

// CREATE FUNCTIONS
async function insertUser(first, last, pass, email) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, password, email, status_id)" +
      "VALUES ($1, $2, $3, $4, $5)",
    [first, last, pass, email, 1]
  );
}

module.exports = {
  insertUser,
};
