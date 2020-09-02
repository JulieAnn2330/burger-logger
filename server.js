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
    i. Create a db folder
        i. Inside this create schema.sql
            1. Create burgers-db
            2. Switch to burgers-db
            3. Create burgers table
                i. burger_name = varchar
                ii. devoured = boolean
        ii. Create seeds.sql file
            1. At least three entries to poplulate burgers table
    j. Create DB in mySQL Workbench
        i. Run from command line (?) mysql -u root -p
            1. Enter source schema.spl to create DB
            2.Enter source seeds.sql to populate table 
        ii. Run exit to close out
    k. Inside burger create config folder
        i. Create a connection.js file inside this
            1. Inside this setup code to connect node to mySQL
            2. Export connection
        ii. Create an orm.js file inside this
            1. Inside this import (require) connection.js
            2. Create methods that will execute mySQL commands in the controllers. This will retrieve and store data in the db
                a. selectAll()
                b. insertOne()
                c. updateOne()
            3. Export ORM with module.exports
    l. Create a folder called models
        i. Inside this make a burger.js file
            1. Inside this import orm.js
            2. Create code that will call ORM functions using burger specific input for the ORM
            3. Export burger.js with module.exports
    m. Create a folder called controllers
        i. Inside this create burgers_controller.js
            1. Inside this import Express
            2. Inside this import burger.js
        ii. Create the router for the app
            1. Export router with module.exports
    n. Create a folder called views
        i. Inside this create index.handlebars
            1. This will be the template for Handlebars to render onto
                a. Include graphic of burger -- DONE
                b. Colored background
                c. Style text
                d. Style textboxes
                e. Logo for Eat-Da-Burger(?) -- DONE
                    i. Home of World-Famous-Custom-Order-Burgers
            2. Create a submit button that will submit input into mySQL db
        ii. Inside this create layouts folder
            1. Inside this create main.handlebars
4. Code
    a. Start with what I know / can do right now
        i. MySQL
        ii. Express
        iii. Handlebars
*/