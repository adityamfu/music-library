const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6702730",
  password: "6XgyGfyLJ3",
  database: "sql6702730",
});

const connectDB = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL: " + err.stack);
      return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
  });
};

module.exports = { connection, connectDB };
