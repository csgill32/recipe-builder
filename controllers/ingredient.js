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




module.exports = router;