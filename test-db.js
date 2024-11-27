var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'moe-mysql-app',
    user: 'moeuser',
    password: 'moepass',
    database: 'photodb',
    port: 3306
});

console.log('Attempting to connect to the database...');

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed:');
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        console.error('Stack trace:', err.stack);
        process.exit(1); // Exit with failure
    }
    console.log('Connected to database successfully!');
    connection.end();
});
