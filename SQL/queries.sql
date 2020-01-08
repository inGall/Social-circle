DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Posts CASCADE;
DROP TABLE IF EXISTS Follows CASCADE;

CREATE TABLE Users (
  username varchar(50) PRIMARY KEY,
  password varchar(50) NOT NULL,
  name varchar(50),
  posts integer,
  followers integer,
  following integer
);

CREATE TABLE Posts (
  content varchar(500),
  username varchar(50) REFERENCES Users (username),
  created_at varchar(50)
);

CREATE TABLE Follows (
  follower varchar(50) REFERENCES Users (username),
  followee varchar(50) REFERENCES Users (username),
  PRIMARY KEY (follower, followee)
);

CREATE TABLE Requests (
  follower varchar(50) REFERENCES Users (username),
  followee varchar(50) REFERENCES Users (username),
  PRIMARY KEY (follower, followee)
)