const Login = require("../models/LoginModel");

module.exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

module.exports.register = async (req, res) => {
  const login = new Login(req.body);

  try {
    await login.register();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("login");
      });
      return;
    }

    req.flash("success", "Seu usuário foi criado com sucesso!");
    req.session.save(() => {
      return res.redirect("login");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

module.exports.login = async (req, res) => {
  const login = new Login(req.body);

  try {
    await login.login();
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("login");
      });
      return;
    }

    req.flash("success", "Logado com sucesso!");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("login");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

module.exports.logout = async (req, res) => {
  req.flash("success", "Deslogado com sucesso!");
  req.session.destroy(() => {
    return res.redirect("/");
  });
};
