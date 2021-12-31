"use strict";
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
var ihubController = require("./ihubController");
require('dotenv').config();
// Save client ID and SECRET for google oauth2.0
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);
// Create google strategy to implement oauth using passport and google API
// This is taken from passport documentation
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://innovationhub1995.herokuapp.com/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    var user = ihubController.addUser({
        user_id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
    });
    return done(null, profile);
}));
// Save user object to session
// This is taken from passport documentation
passport.serializeUser(function (user, done) {
    return done(null, user);
});
// Allow access to user object
// This is taken from passport documentation
passport.deserializeUser(function (user, done) {
    return done(null, user);
});
