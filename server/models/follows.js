const db = require('../database');

class Follows {
  static retrieveFollowing(username, callback) {
    db.query('SELECT * from Follows WHERE follower = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveFollower(username, callback) {
    db.query('SELECT * from Follows WHERE followee = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static checkFollowing(follower, followee, callback) {
    db.query(
      'SELECT * from Follows WHERE follower = $1 AND followee = $2',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(follower, followee, callback) {
    db.query(
      'INSERT INTO Follows (follower, followee) VALUES ($1, $2)',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static delete(follower, followee, callback) {
    db.query(
      'DELETE FROM Follows WHERE follower = $1 AND followee = $2',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Follows;
