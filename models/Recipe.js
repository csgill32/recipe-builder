const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    directions: { type: String },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;