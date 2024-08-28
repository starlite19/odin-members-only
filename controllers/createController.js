const read_db = require("../db/read-queries");
const create_db = require("../db/create-queries");
const update_db = require("../db/update-queries");
const delete_db = require("../db/delete-queries");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

async function getUserForm(req, res) {
  res.render("signup-form");
}

const validateUser = () => [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty.")
    .isAlpha()
    .withMessage("First name must only contain alphabet letters"),
  body("lastName").trim().notEmpty().withMessage("Last name cannot be empty."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Email must be in the format user@example.com.")
    .custom(async (value) => {
      const user = await read_db.getUserByEmail(value);
      if (user?.length !== 0) {
        throw new Error("Email already in use.");
      }
    }),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
  body("confirmPassword")
    .if(body("password").trim().notEmpty())
    .trim()
    .notEmpty()
    .withMessage("Re-enter your password.")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
    }),
];

async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup-form", {
      errors: errors.array(),
    });
  }
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(400).render("signup-form", {
        errors: [{ msg: "Error signing up." }],
      });
    }
    // otherwise, store hashedPassword in DB
    await create_db.insertUser(firstName, lastName, hashedPassword, email);
  });
  // console.log(firstName, lastName, email, password, confirmPassword);
  res.redirect("/");
}

async function getMessageForm(req, res) {
  res.render("new-message-form");
}

async function createMessage(req, res) {
  const user = req.user;
  const { title, message } = req.body;
  await create_db.createMessage(user.id, title, message);
  res.redirect("/");
}

module.exports = {
  getUserForm,
  validateUser,
  createUser,
  getMessageForm,
  createMessage,
};
