"use strict";
var Pool = require("pg").Pool;
require('dotenv').config();
var pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});
module.exports = pool;
