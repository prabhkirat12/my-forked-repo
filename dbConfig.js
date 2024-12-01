const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Use 'localhost' since the MySQL container is mapped to the host on port 3307
  user: 'root', // Replace with your MySQL root username
  password: 'your_password', // Replace with your MySQL root password
  database: 'photodb', // The database name
  port: 3307, // Port exposed by your MySQL container
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
