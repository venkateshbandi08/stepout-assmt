import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost", // Your database host
  user: "root", // Your database user
  password: process.env.MYSQL_PASSWORD, // Your database password
  database: "stepout", // Your database name
  waitForConnections: true, // Wait for connections if the pool is busy
  connectionLimit: 10, // Max number of connections in the pool
  queueLimit: 0, // Max number of connection requests in the queue
});

export default pool;
