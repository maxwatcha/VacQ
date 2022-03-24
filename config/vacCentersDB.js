const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Indyslum54',
    database:'vacCenter'
});

module.exports=connection;