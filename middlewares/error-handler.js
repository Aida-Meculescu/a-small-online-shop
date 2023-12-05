function handleErrors(error, req, res, next) { // a default error middleware from express
    console.log(error)
    res.status(500).render('shared/500') // error for server
}

module.exports = handleErrors