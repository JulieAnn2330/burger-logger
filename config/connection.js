/* Use this file to setup code to connect node to mySQL
Export connection*/

//Set up MySQL connection.
var mysql = require("mysql");

if (process.env.NODE_ENV === 'production') {
  const connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
 var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Tbjs233069$",
  database: "burgers_db"
});
};

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;