// connect to a mysql database

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "db4free.net",

  // Your username
  user: "maindoro",

  // Your password
  password: "doropass123",
  database: "doro_app"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected to database as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;