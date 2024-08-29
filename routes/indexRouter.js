const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.getHome);
indexRouter.get("/delete/:messageId", indexController.deleteMessage);

module.exports = indexRouter;
