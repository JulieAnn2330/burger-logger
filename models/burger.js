/*Use this file to import orm.js
Create code that will call ORM functions using burger specific input for the ORM.
Export burger.js with module.exports*/

var burger = {
	selectAll: function(cb) {
		orm.selectAll("burgers", function(res) {
			cb(res);
		});
	},
	orderBurger: function(burgerName, cb) {
		orm.orderBurger("burgers", "burger_name", burgerName, function(res) {
			cb(res);
		});
	},
	devourBurger: function(burgerId, cb) {
		orm.devourBurger("burgers", "devoured", 1, "id", burgerId, function(res) {
			cb(res);
		});
	}
};

// Export
module.exports = burger;