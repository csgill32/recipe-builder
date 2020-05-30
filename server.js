/* External Modules */
const express = require("express");
const bodyparser = require("body-parser");
const methodOverride = require("method-override");

/* Internal Modules */
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration Variables */
const PORT = 4000;

/* App configuration */
app.set("view engine", "ejs");

/* Middleware */
app.use(bodyparser.urlencoded({ extended: false })); // this will give us req.body
app.use(methodOverride("_method")); // allow change in method in form

/* Routes */

// root routes
app.get("/", function (req, res) {
    res.render("index");
});

// // recipe routes
// app.use("/recipes", controllers.recipe);
// // ingredient routes
// app.use("/ingredients", controllers.ingredient);

/* Bind Server to Port */
app.listen(PORT, function () {
    console.log(`Server is live on  http://localhost:${PORT}`);
});
