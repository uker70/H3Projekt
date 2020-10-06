// const mariadb = require("mariadb");
// const dbConfig = require("../config/db.config.js");

// const connection = mariadb.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

// connection.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
// });

// module.exports = connection;
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;