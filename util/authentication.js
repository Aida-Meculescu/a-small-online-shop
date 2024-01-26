function createUserSession(req, user, action) {
    req.session.uid = user._id.toString() // req.sessios if from the express-session package!
    req.session.save(action) // the save will ativate only after the session is saved!
}

function destroyUserAuthSession(req) {
    req.session.uid = null;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
}