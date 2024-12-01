var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'db',  // Use the Docker Compose service name for the MySQL container
    user: 'root',
    password: 'my-secret-pw',  // Update the password to match the one in your Docker Compose file
    database: 'photodb',
    port: 3306  // Make sure the port matches the one your MySQL service is listening on inside the container
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = conn;
