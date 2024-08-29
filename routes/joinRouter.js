const { Router } = require("express");
const statusController = require("../controllers/statusController");
const joinRouter = Router();

joinRouter.get("/", (req, res) => {
  res.render("join-club");
});

joinRouter.post(
  "/",
  statusController.validateMemberCode(),
  statusController.updateMember
);

joinRouter.get("/admin", (req, res) => {
  res.render("admin");
});

joinRouter.post(
  "/admin",
  statusController.validateAdminCode(),
  statusController.updateAdmin
);

module.exports = joinRouter;
