"use strict";

var express = require("express");

var expressLayouts = require("express-ejs-layouts");

var mongoose = require("mongoose");

var passport = require("passport");

var flash = require("connect-flash");

var session = require("express-session");

require("dotenv/config");

var app = express(); // Passport Config

require("./config/passport")(passport);

require("./config/gpassport")(passport); // Connect to MongoDB


mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("MongoDB Connected");
})["catch"](function (err) {
  return console.log(err);
}); // EJS

app.use(expressLayouts);
app.set("view engine", "ejs"); // Express body parser

app.use(express.urlencoded({
  extended: true
})); // Express session

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
})); // Passport middleware

app.use(passport.initialize());
app.use(passport.session()); // Connect flash

app.use(flash()); // Global variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
}); // Routes

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use(express["static"]("public"));
app.use("/users", express["static"]("public"));
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started on port ".concat(PORT)));