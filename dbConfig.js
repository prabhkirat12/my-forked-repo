var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'moe-mysql-app',
    user: 'root',
    password: 'moeroot',
    database:'photodb',
    port: 3311
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = conn;