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

// new route ******* this was for when we still had a drop down *******
//
// router.get('/new/:id', function (req, res) {
//     db.Recipe.find({}, function (error, allRecipes) {
//         if (error) {
//             console.log(error);
//             res.send({ message: "Internal server error." });
//         } else {
//             const activeRecipe = allRecipes.find(function (recipe) {
//                 return `${recipe._id}` === req.params.id;
//             });
//             const remainingRecipes = allRecipes.filter(function (recipe) {
//                 return `${recipe._id}` !== req.params.id;
//             });
//             const context = { recipes: remainingRecipes, activeRecipe: activeRecipe };
//             console.log(context);
//             res.render("ingredients/new", context);
//         }
//     });
// });

// new route
router.get('/new/:id', function (req, res) {
    db.Recipe.findById(req.params.id, function (error, recipe) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = { recipe, user: req.session.currentUser };
            console.log(context);
            res.render("ingredients/new", context);
        }
    });
});

// create route
router.post('/:id', function (req, res) {
    req.body.recipe = req.params.id;
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
            const context = { ingredient: foundIngredient, user: req.session.currentUser }
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