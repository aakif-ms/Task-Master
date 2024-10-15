const User = require("../models/user");

module.exports.renderLogin = (req, res) => {
  res.render("user/login");
};

module.exports.loginUser = async (req, res) => {
  req.flash('success', 'Welcome Back');
  const redirectUrl = '/';
  res.redirect(redirectUrl);
};

module.exports.renderRegister = (req, res) => {
  res.render('user/register');
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
};
