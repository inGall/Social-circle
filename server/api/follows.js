var express = require('express');
var Follows = require('../models/follows');

var router = express.Router();

router.get('/following/:username', (req, res) => {
  var username = req.params.username;
  Follows.retrieveFollowing(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

router.get('/follower/:username', (req, res) => {
  var username = req.params.username;
  Follows.retrieveFollower(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

module.exports = router;
