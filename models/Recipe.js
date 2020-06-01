const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    name: {type: "String", required: true},
    category: {type: "String", required: true},
    dateCreated: {type: Date},
    directions: {type: "String"}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;