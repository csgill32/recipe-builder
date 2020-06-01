
const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(function () {
        console.log("Mongodb connected...");
    })
    .catch(function (err) {
        console.log("Mongodb Error", err);
    });

module.exports = {
    Recipe: require("./Recipe"),
    Ingredient: require("./Ingredient")
};
