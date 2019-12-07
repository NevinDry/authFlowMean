
var jwt = require('jsonwebtoken'),
    config = require("./../../config/config");

exports.createToken = function (id, name) {
    return jwt.sign(
        {
            name: name,
            id: id
        },
        config.secret,
        {
            expiresIn: '24h' // expires in 24 hours
        }
    );
}
