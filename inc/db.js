const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: 'Clear.Rod22',
    multipleStatements: true
});

module.exports = connection;