/*Pseudocode
1.App
    a. Burger Logger
        i. Restaurant Name: Eat-Da-Burger
        ii. Users can input the names of burgers they'd like to eat with a submit button
            1. When user submits burger name, it displays on the left side of the page
        iii. Users devour the burger with a Devour It! button.
            1. When the user clicks the button, the burger moves to the right side of the page.
        iv. Every burger will be stored in a database, whether it is devoured or not.
2. Apps Needed
    a. MySQL
    b. Node
    C. Express
    d. Handlebars
    e. Homemade ORM
3. Setup
    a. Git Repo -- DONE
        i. Burger Logger
    b. Run npm init -- DONE
    c. Run npm i express -- DONE
        i. Require this in the server.js file
    d. Create a server.js file -- DONE
    e. Run npm i express-handlebars -- DONE
    f. Run npm i mysql -- DONE
    g. Run npm i nodemon -- DONE
        i. Add "dev": "nodemon index"script to package.json -- DONE
    h. Create .gitignore file -- DONE
    i. Create a db folder -- DONE
        i. Inside this create schema.sql -- DONE
            1. Create burgers-db -- DONE
            2. Switch to burgers-db -- DONE
            3. Create burgers table -- DONE
                i. id = auto_increment -- DONE
                ii. burger_name = varchar -- DONE
                iii. devoured = boolean -- DONE
        ii. Create seeds.sql file -- DONE
            1. At least three entries to poplulate burgers table -- DONE
    j. Create DB in mySQL Workbench
        i. Run from command line (?) mysql -u root -p
            1. Enter source schema.sql to create DB
            2.Enter source seeds.sql to populate table 
        ii. Run exit to close out
    k. Inside burger create config folder -- DONE
        i. Create a connection.js file inside this -- DONE
            1. Inside this setup code to connect node to mySQL -- DONE
            2. Export connection
        ii. Create an orm.js file inside this -- DONE
            1. Inside this import (require) connection.js
            2. Create methods that will execute mySQL commands in the controllers. This will retrieve and store data in the db
                a. selectAll()
                b. insertOne()
                c. updateOne()
            3. Export ORM with module.exports
    l. Create a folder called models -- DONE
        i. Inside this make a burger.js file -- DONE
            1. Inside this import orm.js
            2. Create code that will call ORM functions using burger specific input for the ORM
            3. Export burger.js with module.exports
    m. Create a folder called controllers -- DONE
        i. Inside this create burgers_controller.js -- DONE
            1. Inside this import Express
            2. Inside this import burger.js
        ii. Create the router for the app
            1. Export router with module.exports
    n. Create a folder called views -- DONE
        i. Inside this create index.handlebars -- DONE
            1. This will be the template for Handlebars to render onto
                a. Include graphic of burger -- DONE
                b. Colored background -- DONE
                c. Style text -- DONE
                d. Style textboxes
                e. Logo for Eat-Da-Burger(?) -- DONE
                    i. Home of World-Famous-Custom-Order-Burgers
            2. Create a submit button that will submit input into mySQL db
        ii. Inside this create layouts folder -- DONE
            1. Inside this create main.handlebars -- DONE
    o. Create a folder called public -- DONE
        i. Inside this create an assets folder -- DONE
            1. Inside this create a css folder -- DONE
                a. Inside this create burger_style.css -- DONE
            2. Inside this create img folder -- DONE
                a. Inside this add image(s) to use on page -- DONE
4. Code
    a. Start with what I know / can do right now
        i. MySQL
        ii. Express
        iii. Handlebars
        iv. npm setup -- DONE
        v. Folder structure -- DONE
        vi. CSS
        vii. HTML
*/

// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require('mysql');
const nodemon = require('nodemon');


var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
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

// Use Handlebars to render the main index.html page with the plans in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM plans;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { plans: data });
  });
});

// Create a new plan
app.post("/api/plans", function(req, res) {
  connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new plan
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a plan
app.put("/api/plans/:id", function(req, res) {
  connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
