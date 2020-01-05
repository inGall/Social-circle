var express = require('express');
var Posts = require('../models/posts');

var router = express.Router();

/* MainBody.js, Profile.js */
router.get('/fetchAllPost/:username', (req, res) => {
  var username = req.params.username;
  Posts.fetchAllPost(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

/* MainBody.js */
router.post('/handleAddPost', (req, res) => {
  var content = req.body.content;
  var username = req.body.username;
  var date = new Date();
  var options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  var created_at = new Date().toLocaleDateString('en', options);
  Posts.handleAddPost(content, username, created_at, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

/* MainBody.js */
router.post('/handleRemovePost', (req, res) => {
  var content = req.body.content;
  var username = req.body.username;
  var created_at = req.body.created_at;
  Posts.handleRemovePost(content, username, created_at, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
