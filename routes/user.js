const express = require("express");
const router = express.Router();
const passport = require("passport");
const user = require("../controllers/user");

router
  .route("/login")
  .get(user.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/user/login",
    }),
    user.loginUser
  );

router.route("/register").get(user.renderRegister).post(user.createUser);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/user/login");
  });
});

module.exports = router;
