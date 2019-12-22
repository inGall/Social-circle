var express = require('express');
var Posts = require('../models/posts');

var router = express.Router();

router.get('/:username', (req, res) => {
  var username = req.params.username;
  Posts.retrieveAll(username, (err, posts) => {
    if (err) return res.json(err);
    return res.json(posts);
  });
});

router.post('/', (req, res) => {
  var content = req.body.content;
  var username = req.body.username;
  var created_at = new Date().toLocaleString();
  Posts.insert(content, username, created_at, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post('/delete/', (req, res) => {
  var content = req.body.content;
  var username = req.body.username;
  var created_at = req.body.created_at;
  Posts.delete(content, username, created_at, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
