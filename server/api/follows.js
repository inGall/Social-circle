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

router.get('/follow/:follower/:followee', (req, res) => {
  var follower = req.params.follower;
  var followee = req.params.followee;
  Follows.checkFollowing(follower, followee, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

router.post('/insert', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Follows.insert(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post('/delete', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Follows.delete(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
