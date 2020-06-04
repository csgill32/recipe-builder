const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    directions: { type: String },
    ingredients: [
        {
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
=======
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
>>>>>>> submaster
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;