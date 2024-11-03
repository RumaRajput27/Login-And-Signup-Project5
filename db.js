
const mysql = require('mysql2'); // Import the mysql2 package
const connection = mysql.createConnection({
  host: 'localhost',       // Your MySQL host (usually localhost)
  user: 'root',            // Your MySQL username
  password: 'Ruma@123#',   // Your MySQL password
  database: 'expense_db'      // The name of the database you're connecting to
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit if unable to connect
  }
  console.log('Connected to MySQL database');
});

// Export the connection for use in other modules
module.exports = connection;
