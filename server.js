/* External Modules */
const express = require("express");
const bodyparser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/* Internal Modules */
const controllers = require("./controllers");
const authRequired = require("./middleware/authRequired");

/* Instanced Modules */
const app = express();

/* Configuration Variables */
const PORT = 4000;

/* App configuration */
app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: false })); // this will give us req.body
app.use(methodOverride("_method")); // allow change in method in form
// configuring session
app.use(
    session({
        store: new MongoStore({
            url: "mongodb://localhost:27017/recipe",
        }),
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
    },
})
);

/* Routes */

// root routes
app.get("/", function (req, res) {
    console.log(req.session);
    res.render("index", { user: req.session.currentUser });
});

// auth route
app.use("/", controllers.auth);
// recipe routes
app.use("/recipes", authRequired, controllers.recipe);
// ingredient routes
app.use("/ingredients", authrequired, controllers.ingredient);

/* Bind Server to Port */
app.listen(PORT, function () {
    console.log(`Server is live on  http://localhost:${PORT}`);
});
