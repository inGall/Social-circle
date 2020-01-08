const db = require('../database');

class Requests {
  /* Request.js */
  static fetchRequests(username, callback) {
    db.query('SELECT * from Requests WHERE followee = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* User.js */
  static fetchIfRequest(follower, followee, callback) {
    db.query(
      'SELECT * from Requests WHERE follower = $1 AND followee = $2',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* User.js */
  static handleFollowRequest(follower, followee, callback) {
    db.query(
      'INSERT INTO Requests (follower, followee) VALUES ($1, $2)',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* User.js */
  static handleRemoveRequest(follower, followee, callback) {
    db.query(
      'DELETE FROM Requests WHERE follower = $1 AND followee = $2',
      [follower, followee],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Requests;
