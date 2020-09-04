/*Use this file to import connection.js and methods to execute mySQL commands in controllers. This will retrieve and store data in the db. Export ORM with module.exports*/

// Dependencies
var connection = require("./connection");

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];

		if (Object.hasOwnProperty.call(ob, key)) {

			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arr.push(key + "=" + value);
		}
	}

	return arr.toString();
}
// Object Relational Mapper
// 	Here we pass in query parameters for all 3 methods, including callbacks, to receive the data from the model
var orm = {
	selectAll: function(table, cb) {
	  var queryString = "SELECT * FROM " + table + ";";
	  connection.query(queryString, function(err, result) {
		if (err) {
		  throw err;
		}
		cb(result);
	  });
	},
	
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;
	
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";
	
		console.log(queryString);
	
		connection.query(queryString, vals, function(err, result) {
		  if (err) {
			throw err;
		  }
	
		  cb(result);
		});
	  },
	
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " set ";
		queryString += objToSql(objColVals);
		queryString += " where ";
		queryString += condition;
		
		
		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},


    // Delete a burger from the db.
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};


// Export ORM
module.exports = orm;