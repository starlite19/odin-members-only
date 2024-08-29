const pool = require("./pool");

// DELETE FUNCTIONS
async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id=($1)", [messageId]);
}

module.exports = {
  deleteMessage,
};
