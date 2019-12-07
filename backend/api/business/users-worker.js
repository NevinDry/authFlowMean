const passwordHelper = require("../helpers/password-helper"),
    tokendHelper = require("../helpers/token-helper"),
     { ErrorHandler } = require('./../helpers/errors-helper'),
    usersRepo = require("../repository/users-repository.js");

exports.register = function (req) {
    return new Promise(async function (resolve, reject) {

        let userAlreadyExist = await usersRepo.getUserByEmail(req.email).catch(
            (err) => {
                reject(new ErrorHandler(500, 'Something went wrong'));
            }
        );

        if (!userAlreadyExist) {
            let user = {
                name: req.name,
                email: req.email,
                password: passwordHelper.hash(req.password)
            };

            usersRepo.insertOne(user).then(id => {
                resolve({ token: tokendHelper.createToken(id, user.name) });
            }).catch(err => {
                reject(new ErrorHandler(500, 'Something went wrong'));
            })
        } else {
            reject(new ErrorHandler(500, 'A user already exist with this email'));
        }

    });
}

exports.login = function (req) {
    return new Promise(async function (resolve, reject) {  
        let user = await usersRepo.getUserByEmail(req.email).catch(
            (err) => {
                reject(new ErrorHandler(500, 'Something went wrong'));
            }
        );
        if (!user) {
            reject(new Error("No user found with this email"));
        } else {
            if(passwordHelper.compare(req.password, user.password)){
                resolve({ token: tokendHelper.createToken(user._id, user.name) });
            }else{
                reject(new ErrorHandler(500, 'Wrong credentials'));
            }
        }      
    });
}