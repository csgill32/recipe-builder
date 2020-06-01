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

// Edit route
router.get("/:id/edit", function(req, res) {
    db.Recipe.findById(req.params.id, function(error, foundRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal server error."});
        } else {
            const context = {recipe: foundRecipe};
            res.render("recipes/edit", context);
        }
    });
});

// Update route
router.put("/:id", function(req, res) {
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(error, updatedRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal server error."});
        } else {
            res.redirect(`/recipes/${updatedRecipe._id}`)
        }
    });
});

// Delete route
router.delete("/:id", function(req, res) {
    db.Recipe.findByIdAndDelete(req.params.id, function(error, deletedRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal server error."});
        } else {
            res.redirect("/recipes");
        }
    });
});

module.exports = router;