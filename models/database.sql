CREATE DATABASE ihub;

CREATE TABLE ideas(
    ideas_id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    title TEXT,
    descr TEXT,
    stripe_id TEXT
);