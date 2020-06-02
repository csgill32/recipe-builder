const express = require("express");
const router = express.Router();


// root route /

// register form
router.get("/register", function(req, res) {
    res.render("auth/register");
});

// register post

  // login form
  router.get("/login", function (req, res) {
    res.render("auth/login");
  });

  module.exports = router;