var express = require('express');
var Requests = require('../models/requests');

var router = express.Router();

/* Request.js */
router.get('/fetchRequests/:username', (req, res) => {
  var username = req.params.username;
  Requests.fetchRequests(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* User.js */
router.get('/fetchIfRequest/:follower/:followee', (req, res) => {
  var follower = req.params.follower;
  var followee = req.params.followee;
  Requests.fetchIfRequest(follower, followee, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* User.js */
router.post('/handleFollowRequest', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Requests.handleFollowRequest(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

/* User.js */
router.post('/handleRemoveRequest', (req, res) => {
  var follower = req.body.follower;
  var followee = req.body.followee;
  Requests.handleRemoveRequest(follower, followee, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
