var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'moe-mysql-app',
    user: 'moeuser',
    password: 'moepass',
    database:'photodb',
    port: 3306
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = conn;