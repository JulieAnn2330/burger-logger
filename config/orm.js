/*Use this file to import connection.js and methods to execute mySQL commands in controllers. This will retrieve and store data in the db. Export ORM with module.exports*/

// Dependencies
var connection = require("./connection.js");

// Object Relational Mapper
// 	Here we pass in query parameters for all 3 methods, including callbacks, to receive the data from the model
var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * from ??";
		connection.query(queryString, [tableInput], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	orderBurger: function(tableInput, columnName, burgerName, cb) {
		var queryString = "INSERT INTO ?? (??) VALUES (?)";
		connection.query(queryString, [tableInput, columnName, burgerName], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	devourBurger: function(tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal, cb) {
		var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		connection.query(queryString, [tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	}
};

// Export ORM
module.exports = orm;