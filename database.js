const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aya',
    password: '1234',
    database: 'gardeen'
});

module.exports = connection;



