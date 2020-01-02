var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', (req, res) => {
  Users.retrieveAll((err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

router.get('/:username', (req, res) => {
  var username = req.params.username;
  Users.checkIfUserExist(username, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

router.get('/retrieve/:username/:keyword', (req, res) => {
  var username = req.params.username;
  var keyword = req.params.keyword;
  Users.fetchKeyUsers(username, keyword, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

router.get('/:username/:password', (req, res) => {
  var username = req.params.username;
  var password = req.params.password;
  Users.validateUser(username, password, (err, users) => {
    if (err) return res.json(err);
    return res.json(users);
  });
});

router.post('/', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  Users.insert(username, password, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
