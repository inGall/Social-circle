const db = require('../database');

class Follows {
  /* Following.js, Profile.js */
  static fetchUsersThatIFollow(username, callback) {
    db.query('SELECT * from Follows WHERE follower = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Follower.js, Profile.js */
  static fetchUsersThatFollowMe(username, callback) {
    db.query('SELECT * from Follows WHERE followee = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* MainBody.js */
  static fetchFollowingName(username, callback) {
    db.query('SELECT followee from Follows WHERE follower = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* User.js */
  static fetchIfFollow(follower, followee, callback) {
    db.query(
      'SELECT * from Follows WHERE follower = $1 AND followee = $2',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* User.js */
  static handleFollow(follower, followee, callback) {
    db.query(
      'INSERT INTO Follows (follower, followee) VALUES ($1, $2)',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* User.js */
  static handleUnfollow(follower, followee, callback) {
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
