
var bcrypt = require('bcryptjs');

exports.hash = function (password) {
    return bcrypt.hashSync(password, 10)
}

exports.compare = function (prompt, password) {
    if (bcrypt.compareSync(prompt, password)) {
        return true;
    } else {
        return false;
    }
}