const Contato = require('../models/ContatoModel');

module.exports.index = async (req, res) => {
    const contatos = await Contato.findAll();
    res.render('index', { contatos });
};