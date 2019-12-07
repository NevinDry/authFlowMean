var express = require('express');
var router = express.Router();
var userWorker = require("./../business/users-worker");


/* Register a User */
router.post('/register', function (req, res, next) {
  userWorker.register(req.body).then(data => {
    res.status(200).json(data);
  },
    err => {
      next(err);
    })
});

/* Log a User */
router.post('/login', function (req, res, next) {
  userWorker.login(req.body).then(data => {
    res.status(200).json(data);
  },
    err => {
      next(err);
    })
});

module.exports = router;
