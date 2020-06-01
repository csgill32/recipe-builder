const express = require("express");
const router = express.Router();
const db = require("../models")

// Index route
router.get("/", function(req, res) {
    db.Recipe.find({}, function(error, allRecipes) {
    if (error) {
        console.log(error);
        res.send({message: "Internal server error."});
    } else {
        const context = {recipes: allRecipes};
        res.render("recipes/index", context);
    }
 });
});

// New route
router.get("/new", function(req, res) {
    res.render("recipes/new");
});

// Create route
router.post("/", function(req, res) {
    db.Recipe.create(req.body, function(error, createdRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal server error."});
        } else {
            res.redirect("/recipes");
        }
    });
});

// Show route
router.get("/:id", function(req, res) {
    db.Recipe.findById(req.params.id).populate("ingredients").exec(function(error, foundRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal server error."});
        } else {
            const context = {recipe: foundRecipe};
            res.render("recipes/show", context);
        }
    });    
});

module.exports = router;