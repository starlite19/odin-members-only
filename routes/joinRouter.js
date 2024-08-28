const { Router } = require("express");
const statusController = require("../controllers/statusController");
const joinRouter = Router();

joinRouter.get("/", (req, res) => {
  res.render("join-club");
});

joinRouter.post(
  "/",
  statusController.validateMemberCode(),
  statusController.updateStatus
);

module.exports = joinRouter;
