const db = require('../database');

class Users {
  static retrieveAll(callback) {
    db.query('SELECT * from users', (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* LoginPage.js */
  static checkIfUserAlreadyExist(username, callback) {
    db.query('SELECT * from users WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Post.js, Profile.js, User.js */
  static fetchNameOfUser(username, callback) {
    db.query('SELECT name from users WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Search.js */
  static fetchUsersWithKeyword(username, keyword, callback) {
    db.query(
      "SELECT * from users WHERE username <> $1 AND UPPER(username) LIKE UPPER('%' || $2 || '%')",
      [username, keyword],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* LoginPage.js */
  static validateCredentials(username, password, callback) {
    db.query(
      'SELECT * from users WHERE username = $1 AND password = $2',
      [username, password],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* LoginPage.js */
  static signup(username, password, callback) {
    db.query(
      'INSERT INTO Users (username, password) VALUES ($1, $2)',
      [username, password],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Users;
