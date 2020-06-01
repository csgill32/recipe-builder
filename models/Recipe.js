const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    name: { type: "String", required: true },
    category: { type: "String", required: true },
    dateCreated: { type: Date },
    directions: { type: "String" },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;