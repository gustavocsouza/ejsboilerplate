exports.checkCsrfToken = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') res.send('Ocorreu um erro');
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}