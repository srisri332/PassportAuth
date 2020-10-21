"use strict";

var mongoose = require("mongoose"); //schema used for manual resgistration


var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("Users", userSchema);