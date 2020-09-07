/* Use this file to setup code to connect node to mySQL
Export connection*/

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 0,
    user: "root",
    password: "Tbjs233069$",
    database: "burgers_db"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });

  module.exports = connection;