const db = require('../database');

class Posts {
  static retrieveAll(username, callback) {
    db.query('SELECT * from Posts WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insert(content, username, callback) {
    db.query(
      'INSERT INTO Posts (content, username) VALUES ($1, $2)',
      [content, username],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Posts;
