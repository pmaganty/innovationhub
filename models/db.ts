const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnathorized: false
    }
});

/*
user: "postgres",
password: "maganty4",
host: "localhost",
port: 5432,
database: "ihub"
*/

module.exports = pool;