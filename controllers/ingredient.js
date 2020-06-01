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
    res.render("ingredients/new");
})

// create route
router.post('/', function (req, res) {
    db.Ingredient.create(req.body, function (error, createdIngredient) {
        if (error) {
            console.log(error);
            res.send({ message: "Internal server error." });
        } else {
            res.redirect("/ingredients");
        }
    });
});

// show route
router.get("/:id", function (req, res) {
    db.Ingredient.findById(req.params.id, function (error, foundIngredient) {
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
            res.redirect(`/ingredients/${updatedIngredient._id}`);
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
            res.redirect('/ingredients');
        }
    });
});

module.exports = router;