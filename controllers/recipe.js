const express = require("express");
const router = express.Router();


// Index route
router.get("/", function(req, res) {
    res.render("recipes/index");
});

// New route
router.get("/new", function(req, res) {
    res.render("recipes/new");
});

module.exports = router;