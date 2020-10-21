"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../config/auth"),
    ensureAuthenticated = _require.ensureAuthenticated,
    forwardAuthenticated = _require.forwardAuthenticated; // Welcome Page


router.get("/", forwardAuthenticated, function (req, res) {
  return res.render("welcome");
}); // Dashboard

router.get("/dashboard", ensureAuthenticated, function (req, res) {
  res.render("dashboard", {
    user: req.user
  });
});
module.exports = router;