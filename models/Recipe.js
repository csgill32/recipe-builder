const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    dateCreated: { type: Date },
    directions: { type: String },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;