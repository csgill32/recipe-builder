const express = require('express');
const router = express.Router();
const db = require('../models');

// index
router.get('/', function (req, res) {
    db.Ingredient.find({}, function (error, allIngredients) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = { ingredients: allIngredients }
            res.render("ingredients/index", context);
        }
    });
});

// new route
router.get('/new', function (req, res) {
    db.Recipe.find({}, function (error, allRecipes) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = { recipes: allRecipes };
            res.render("ingredients/new", context);
        }
    });
});

// create route
router.post('/', function (req, res) {
    db.Ingredient.create(req.body, function (error, createdIngredient) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            db.Recipe.findById(createdIngredient.recipe, function (error, foundRecipe) {
                if (error) {
                    console.log(error);
                    res.send({ message: "Internal Sever Error" });
                } else {
                    foundRecipe.ingredients.push(createdIngredient);
                    foundRecipe.save();
                    res.redirect(`/recipes/${foundRecipe._id}`);
                }
            })
        }
    });
});

// show route
router.get("/:id", function (req, res) {
    db.Ingredient.findById(req.params.id).populate("recipe").exec(function (error, foundIngredient) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = { ingredient: foundIngredient }
            res.render("ingredients/show", context);
        }
    });
});

// edit <- view
router.get("/:id/edit", function (req, res) {
    db.Ingredient.findById(req.params.id, function (err, foundIngredient) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            const context = { ingredient: foundIngredient }
            res.render("ingredients/edit", context);
        }
    });
});

// update <- db change
router.put("/:id", function (req, res) {
    db.Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, updatedIngredient) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            db.Recipe.findById(updatedIngredient.recipe, function (err, foundRecipe) {
                if (err) {
                    console.log(err);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.redirect(`/recipes/${foundRecipe._id}`);
                }
            })

        }
    });
});

// delete
router.delete("/:id", function (req, res) {
    db.Ingredient.findByIdAndDelete(req.params.id, function (err, deletedIngredient) {
        if (err) {
            console.log(err);
            res.send({ message: "Internal Server Error" });
        } else {
            db.Recipe.findById(deletedIngredient.recipe, function (err, foundRecipe) {
                if (err) {
                    console.log(err);
                    res.send({ message: "Internal Server Error" });
                } else {
                    foundRecipe.ingredients.remove(deletedIngredient);
                    foundRecipe.save();
                    res.redirect(`/recipes/${foundRecipe._id}`);
                }
            });
        }
    });
});

module.exports = router;