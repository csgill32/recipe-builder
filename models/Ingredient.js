const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: { type: String },
    quantity: { type: Number },
    measurement: { type: String },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;