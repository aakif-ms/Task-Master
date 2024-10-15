const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const { isLoggedIn } = require("./middleware");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const ToDo = require("./models/todo");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

app.get("/", isLoggedIn, async (req, res) => {
  const todos = await ToDo.find({ author: req.user._id });
  const user = req.user.username;
  res.render("home", { todos, user });
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (!err.message) err.message = "Oh No Something Went Wrong!!!";
  res.status(statusCode).render("error", { err });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
