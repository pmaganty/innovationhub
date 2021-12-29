CREATE DATABASE ihub;

CREATE TABLE ideas(
    ideas_id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    title TEXT,
    descr TEXT,
    stripe_id TEXT,
    donations NUMERIC DEFAULT 0,
    user_id TEXT REFERENCES users (user_id)
);

CREATE TABLE users(
    user_id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT
);