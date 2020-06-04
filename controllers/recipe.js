const express = require("express");
const router = express.Router();
const db = require("../models")

// Index async route
router.get("/", async function (req, res) {
    try {
<<<<<<< HEAD
        const allRecipes = await db.Recipe.find({user: req.session.currentUser.id});
        const context = {recipes: allRecipes};
=======
        const allRecipes = await db.Recipe.find({ user: req.session.currentUser.id });
        const context = { recipes: allRecipes };
>>>>>>> submaster
        res.render("recipes/index", context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal server error." });
    }
});

// New route
router.get("/new", function (req, res) {
    res.render("recipes/new");
});

// Create route
router.post("/", function(req, res) {
    const recipe = {
        name: req.body.name,
        user: req.session.currentUser.id,
        category: req.body.category,
        directions: req.body.directions
    };
    db.Recipe.create(recipe, function(error, createdRecipe) {
        if (error) {
            console.log(error);
            res.send({message: "Internal Server Error"});
        } else {
            res.redirect("/recipes");
        }
    });
});

<<<<<<< HEAD


=======
// Search Route
router.get('/search', function (req, res) {
    db.Recipe.find({ name: { $regex: req.query.name, $options: "i" } }, function (error, foundRecipes) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            db.Ingredient.find({ name: { $regex: req.query.name, $options: "i" } }).populate("recipe").exec(function (error, foundIngredients) {
                console.log(foundIngredients);
                for (let i = 0; i < foundIngredients.length; i++) {
                    foundRecipes.push(foundIngredients[i].recipe);
                }
                const context = { recipes: foundRecipes }
                res.render("recipes/search", context);
            })

        }
    });
});
>>>>>>> submaster

// Show route
router.get("/:id", function (req, res) {
    db.Recipe.findById(req.params.id).populate("ingredients user").exec(function (error, foundRecipe) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = {recipe: foundRecipe};
            res.render("recipes/show", context);
        }
    });
});

// Edit route
router.get("/:id/edit", function (req, res) {
    db.Recipe.findById(req.params.id, function (error, foundRecipe) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            const context = { recipe: foundRecipe };
            res.render("recipes/edit", context);
        }
    });
});

// Update route
router.put("/:id", function (req, res) {
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (error, updatedRecipe) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            res.redirect(`/recipes/${updatedRecipe._id}`)
        }
    });
});

// Delete route
router.delete("/:id", async function (req, res) {
    try {
        const deletedRecipe = await db.Recipe.findByIdAndDelete(req.params.id)
        const deletedIngredients = await db.Ingredient.remove({
            recipe: deletedRecipe._id,
        });
        res.redirect("/recipes");
    } catch (error) {
        console.log(error);
        res.send({message: "Internal Server Error"});
    }
});
    
   

module.exports = router;