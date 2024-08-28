const read_db = require("../db/read-queries");

async function getHome(req, res) {
  const messages = await read_db.getAllMessages();
  const userIds = messages.map((message) => message.user_id);
  const users = await read_db.getUsersByIds(userIds);
  const userMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  const messagesWithUsers = message.map((message) => ({
    ...message,
    user: userMap[message.user_id],
  }));

  res.render("index", { user: req.user, messages: messagesWithUsers });
}

module.exports = {
  getHome,
};
