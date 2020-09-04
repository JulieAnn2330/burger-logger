/*Import express
Import burger.js
Create the router for the app
Export the router with module.exports*/

const express = require("express");
const router = express.Router();

var burger = require('../models/burger');

// Routes
// Use Handlebars to render the main index.html page with the burgers in it.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
  var hbsObject = {
    burgers: data
  };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  // Create a new burger
  router.post("/api/burgers", function(req, res) {
    burger.insertOne([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  //Devour a Burger
  router.put("/api/burgers/:id", function(req, res) {

    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

  module.exports = router;