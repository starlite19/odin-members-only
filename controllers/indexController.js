const read_db = require("../db/read-queries");
const delete_db = require("../db/delete-queries");

async function getHome(req, res) {
  const messages = await read_db.getAllMessages();
  if (messages?.length == 0) {
    res.render("index", { user: req.user, messages: messages });
  } else {
    const userIds = messages.map((message) => message.user_id);
    const users = await read_db.getUsersByIds(userIds);
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    const messagesWithUsers = messages.map((message) => ({
      ...message,
      user: userMap[message.user_id],
    }));

    res.render("index", { user: req.user, messages: messagesWithUsers });
  }
}

async function deleteMessage(req, res) {
  const messageId = req.params.messageId;
  await delete_db.deleteMessage(messageId);
  res.redirect("/");
}

module.exports = {
  getHome,
  deleteMessage,
};
