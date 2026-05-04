module.exports.authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Você precisa estar logado");
    return res.redirect('/');
  }
  next();
};
