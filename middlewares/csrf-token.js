function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken() // req.csrfToken() this generate a token 
    // locals is like a global variable that is available everywhere
    next()
}

module.exports = addCsrfToken