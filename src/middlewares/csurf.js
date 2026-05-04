exports.checkCsrfToken = (err, req, res, next) => {
    if (err) res.render('404');
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}