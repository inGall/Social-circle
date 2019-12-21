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
  Posts.insert(content, username, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
