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
    db.query('SELECT * from users WHERE UPPER(username) = UPPER($1)', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Post.js, Profile.js, User.js, Setting.js */
  static fetchNameOfUser(username, callback) {
    db.query('SELECT name from users WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Setting.js */
  static fetchPassword(username, callback) {
    db.query('SELECT password from users WHERE username = $1', [username], (err, res) => {
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
      'SELECT username from users WHERE UPPER(username) = UPPER($1) AND password = $2',
      [username, password],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* LoginPage.js */
  static signup(username, password, name, callback) {
    db.query(
      'INSERT INTO Users (username, password, name) VALUES ($1, $2, $3)',
      [username, password, name],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  /* Setting.js */
  static changeName(username, name, callback) {
    db.query('UPDATE Users SET name = $1 WHERE username = $2', [name, username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  /* Setting.js */
  static changePassword(username, password, callback) {
    db.query('UPDATE Users SET password = $1 WHERE username = $2', [password, username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = Users;
