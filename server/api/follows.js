var express = require('express');
var Follows = require('../models/follows');

var router = express.Router();

/* Following.js, Profile.js */
router.get('/fetchUsersThatIFollow/:username', (req, res) => {
  var username = req.params.username;
  Follows.fetchUsersThatIFollow(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* Follower.js, Profile.js */
router.get('/fetchUsersThatFollowMe/:username', (req, res) => {
  var username = req.params.username;
  Follows.fetchUsersThatFollowMe(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* MainBody.js */
router.get('/fetchFollowingName/:username', (req, res) => {
  var username = req.params.username;
  Follows.fetchFollowingName(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* User.js */
router.get('/fetchIfFollow/:follower/:followee', (req, res) => {
  var follower = req.params.follower;
  var followee = req.params.followee;
  Follows.fetchIfFollow(follower, followee, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* User.js */
router.post('/handleFollow', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Follows.handleFollow(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

/* User.js */
router.post('/handleUnfollow', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Follows.handleUnfollow(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
