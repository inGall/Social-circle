const db = require('../database');

class Posts {
  static retrieveAll(username, callback) {
    db.query('SELECT * from Posts WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insert(content, username, created_at, callback) {
    db.query(
      'INSERT INTO Posts VALUES ($1, $2, $3)',
      [content, username, created_at],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static delete(content, username, created_at, callback) {
    db.query(
      'DELETE FROM Posts WHERE content = $1 AND username = $2 AND created_at = $3',
      [content, username, created_at],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Posts;
