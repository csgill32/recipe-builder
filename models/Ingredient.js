const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String },
    quantity: { type: Number },
=======
    name: { type: String, required: true },
    quantity: { type: String },
>>>>>>> submaster
    measurement: { type: String },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;