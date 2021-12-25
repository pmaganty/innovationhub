"use strict";
var Pool = require("pg").Pool;
var pool = new Pool({
    user: "postgres",
    password: "maganty4",
    host: "localhost",
    port: 5432,
    database: "ihub"
});
module.exports = pool;
