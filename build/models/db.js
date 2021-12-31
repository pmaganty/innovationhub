"use strict";
var Pool = require("pg").Pool;
var pool = new Pool({
    connectionString: 'postgres://vgxhfixtrvmkot:84ced54e5467da83410516f6d1eca3321afb8ca03508c3779b28c1a1a1084feb@ec2-52-70-205-234.compute-1.amazonaws.com:5432/d4kepsuceqj61i',
    ssl: { rejectUnauthorized: false }
});
module.exports = pool;
