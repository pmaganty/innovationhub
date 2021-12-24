CREATE DATABASE ihub;

CREATE TABLE ideas(
    ideas_id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    title TEXT,
    descr TEXT
);