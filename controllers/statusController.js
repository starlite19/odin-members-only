const update_db = require("../db/update-queries");
const { body, validationResult } = require("express-validator");

const validateMemberCode = () =>
  body("secret")
    .trim()
    .custom(async (value) => {
      if (value !== "MICKEYMOUSE") {
        throw new Error("Invalid secret code.");
      }
    });

async function updateMember(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("join-club", {
      errors: errors.array(),
    });
  }
  const user = req.user;
  await update_db.updateStatus(user.email, 2);
  res.redirect("/");
}

const validateAdminCode = () =>
  body("secret")
    .trim()
    .custom(async (value) => {
      if (value !== "MMCLUBHOUSE") {
        throw new Error("Invalid secret code.");
      }
    });

async function updateAdmin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("admin", {
      errors: errors.array(),
    });
  }
  const user = req.user;
  await update_db.updateStatus(user.email, 3);
  res.redirect("/");
}

module.exports = {
  validateMemberCode,
  updateMember,
  validateAdminCode,
  updateAdmin,
};
