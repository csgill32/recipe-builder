const express = require("express");
const router = express.Router();


// Index route
router.get("/", function(req, res) {
    res.render("recipes/index");
});

module.exports = router;