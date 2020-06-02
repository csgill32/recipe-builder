const express = require("express");
const router = express.Router();
const bcrypt = require("brcyptjs");
const db = require("../models");

// register post
router.post("/register", async function (req, res) {
    try {
      // access the req.body
      // search db for user with existing email
      const foundUser = await db.User.findOne({ email: req.body.email });
      // if found send back error
      if (foundUser) {
        return res.send({ message: "Account is already registered" });
      }
      // if not found we will hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      // create user with req.body and hash password
      const newUser = await db.User.create(req.body);
      // redirect to login
      res.redirect("/login");
    } catch (err) {
      res.send({ message: "Internal Server Error", error: err });
    }
  });

  // login form
  router.get("/login", function (req, res) {
    res.render("auth/login");
  }