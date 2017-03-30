var {User} = require('../models/user');

var authenticate = (request, response, next) => {
    var token = request.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return new Promise((resolve, reject) => {
                reject();
            });
        }
        request.token = token;
        request.user = user;
        next();
    }).catch((e) => {
        response.status(401).send();
    });
};

module.exports.authenticate = authenticate;