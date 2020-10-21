"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcryptjs");

var passport = require("passport"); // Load User model


var User = require("../models/RegUser");

var _require = require("../config/auth"),
    forwardAuthenticated = _require.forwardAuthenticated; // Login Page


router.get("/login", forwardAuthenticated, function (req, res) {
  return res.render("login");
}); // Register Page

router.get("/register", forwardAuthenticated, function (req, res) {
  return res.render("register");
}); // Register

router.post("/register", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      password2 = _req$body.password2;
  var errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields"
    });
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords do not match"
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2
    });
  } else {
    User.findOne({
      email: email
    }).then(function (user) {
      if (user) {
        errors.push({
          msg: "Email already exists"
        });
        res.render("register", {
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2
        });
      } else {
        var newUser = new User({
          name: name,
          email: email,
          password: password
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(function (user) {
              req.flash("success_msg", "You are now registered and can log in");
              res.redirect("/users/login");
            })["catch"](function (err) {
              return console.log(err);
            });
          });
        });
      }
    });
  }
}); // Login

router.post("/login", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
}); // Logout

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;