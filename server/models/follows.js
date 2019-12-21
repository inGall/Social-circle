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
}

module.exports = Follows;
