const { Router } = require("express");
const createController = require("../controllers/createController");
const createRouter = Router();

createRouter.get("/user", createController.getUserForm);
createRouter.post(
  "/user",
  createController.validateUser(),
  createController.createUser
);

createRouter.get("/message", createController.getMessageForm);

module.exports = createRouter;
