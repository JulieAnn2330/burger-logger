/*Import express
Import burger.js
Create the router for the app
Export the router with module.exports*/

const express = require("express");
const burgerjs = require('/models/burger.js');

// Routes
app.get("/icecreams/:name", function(req, res) {
    for (var i = 0; i, icereams.length; i++)
    if (icecreams[i].name === req.params.name) {
        return res.render("icecream", icecreams[i]);
    }
  });