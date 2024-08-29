const pool = require("./pool");

// UPDATE FUNCTIONS
async function updateStatus(email, status_id) {
  await pool.query("UPDATE users SET status_id = ($1) WHERE email = ($2)", [
    status_id,
    email,
  ]);
}

module.exports = {
  updateStatus,
};
