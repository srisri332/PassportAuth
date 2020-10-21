"use strict";

var GoogleStrategy = require("passport-google-oauth2").Strategy;

var mongoose = require("mongoose");

var User = require("../models/GoogUser"); //Passport config used for validating google auth


module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, function _callee(accessToken, refreshToken, profile, done) {
    var newUser, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value
            };
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(User.findOne({
              googleId: profile.id
            }));

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            done(null, user);
            _context.next = 13;
            break;

          case 9:
            _context.next = 11;
            return regeneratorRuntime.awrap(User.create(newUser));

          case 11:
            user = _context.sent;
            done(null, user);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 15]]);
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};