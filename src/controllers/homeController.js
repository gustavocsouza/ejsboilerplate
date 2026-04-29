module.exports.paginaInicial = (req, res) => {
    req.session.user = { nome: 'Gustavo' }
    console.log(req.session)
    res.render('index');
};