const db = require("./../../dbContext");

exports.insertOne = function (user) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('users');
        collection.insertOne(user, function (err, res) {
            if (err) reject(err);
            resolve(res.insertedId);
        });
    })
}

exports.getUserByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('users');
        collection.findOne({
            email: email
        }, function (err, doc) {
            if (err) {
                reject(err);
            }else
            resolve(doc);
        });

    })
}