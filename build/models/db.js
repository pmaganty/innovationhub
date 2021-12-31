"use strict";
var Pool = require("pg").Pool;
var pool = new Pool({
    connectionString: 'postgres://thuzetvdufqrlw:7a74286e38224eafd2c110df67805cd135b7bbfa83a885e4d4b02d1a825cafa6@ec2-52-70-205-234.compute-1.amazonaws.com:5432/d78ib0lpgrkgnm',
    ssl: { rejectUnauthorized: false }
});
module.exports = pool;
