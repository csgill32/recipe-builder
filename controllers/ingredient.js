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




module.exports = router;