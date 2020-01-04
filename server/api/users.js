var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', (req, res) => {
  Users.retrieveAll((err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

/* LoginPage.js */
router.get('/checkIfUserAlreadyExist/:username', (req, res) => {
  var username = req.params.username;
  Users.checkIfUserAlreadyExist(username, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

/* Post.js, Profile.js, User.js */
router.get('/fetchNameOfUser/:username', (req, res) => {
  var username = req.params.username;
  Users.fetchNameOfUser(username, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

/* Search.js */
router.get('/fetchUsersWithKeyword/:username/:keyword', (req, res) => {
  var username = req.params.username;
  var keyword = req.params.keyword;
  Users.fetchUsersWithKeyword(username, keyword, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

/* LoginPage.js */
router.get('/validateCredentials/:username/:password', (req, res) => {
  var username = req.params.username;
  var password = req.params.password;
  Users.validateCredentials(username, password, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

/* LoginPage.js */
router.post('/signup', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  Users.signup(username, password, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
