const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("addContato", { contato: {} });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        return res.redirect("/contatos");
      });
      return;
    }

    req.flash("success", "Contato registrado com sucesso.");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const contato = await Contato.findById(req.params.id);
  if (!contato) return res.render("404");

  res.render("addContato", { contato });
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");

    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        return res.redirect(`/contatos/${req.params.id}`);
      });
      return;
    }

    req.flash("success", "Contato editado com sucesso.");
    req.session.save(() => {
      return res.redirect(`/contatos/${req.params.id}`);
    }); 
  } catch (error) {
    console.log(error);
    res.render('404'); 
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const contato = await Contato.delete(req.params.id);
  if (!contato) return res.render("404");

  req.flash("success", "Contato apagado com sucesso.");
  req.session.save(() => {
    return res.redirect(`/`);
  }); 
}
