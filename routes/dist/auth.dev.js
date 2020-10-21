"use strict";

var express = require("express");

var passport = require("passport");

var router = express.Router();
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/"
}), function (req, res) {
  res.redirect("/dashboard");
});
module.exports = router;