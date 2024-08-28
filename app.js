const read_db = require("./db/read-queries");

const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const indexRouter = require("./routes/indexRouter");
const createRouter = require("./routes/createRouter");
const joinRouter = require("./routes/joinRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const rows = await read_db.getUserByEmail(email);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await read_db.getUserById(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", indexRouter);
app.use("/create", createRouter);
app.get("/login", (req, res) => res.render("login-form"));
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
app.use("/join", joinRouter);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(400).render("/", {
        errors: [{ msg: "Error logging out." }],
      });
    }
    res.redirect("/");
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Clubhouse - listening on port ${PORT}!`));
