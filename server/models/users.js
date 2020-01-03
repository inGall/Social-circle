const db = require('../database');

class Users {
  static retrieveAll(callback) {
    db.query('SELECT * from users', (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static checkIfUserExist(username, callback) {
    db.query('SELECT * from users WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static getName(username, callback) {
    db.query('SELECT name from users WHERE username = $1', [username], (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static validateUser(username, password, callback) {
    db.query(
      'SELECT * from users WHERE username = $1 AND password = $2',
      [username, password],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static fetchKeyUsers(username, keyword, callback) {
    db.query(
      "SELECT * from users WHERE username <> $1 AND UPPER(username) LIKE UPPER('%' || $2 || '%')",
      [username, keyword],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(username, password, callback) {
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
