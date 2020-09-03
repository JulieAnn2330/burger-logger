/*Import express
Import burger.js
Create the router for the app
Export the router with module.exports*/

const express = require("express");
const burgerjs = require('/models/burger.js');
const router = express.Router();

// Routes
// Use Handlebars to render the main index.html page with the burgers in it.
router.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { burgers: data });
    });
  });
  
  // Create a new burger
  router.post("/api/burgers", function(req, res) {
    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger_name], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
  
  //Devour a Burger
  router.put("/api/burgers", function(req, res) {
    connection.query("UPDATE burgers SET devoured = 1 WHERE burger_name = ?", [req.params.burger_name], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
  
      // Send back the devoured status of the burger
      res.json({ devoured: result.updateDevoured });
      console.log({ devoured: result.updateDevoured });
    
  
    });
  });

  moudule.exports = router;