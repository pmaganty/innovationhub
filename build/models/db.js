"use strict";
var Pool = require("pg").Pool;
require('dotenv').config({ path: __dirname + '../.env' });
var pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});
module.exports = pool;
