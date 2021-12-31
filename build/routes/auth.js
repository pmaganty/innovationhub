"use strict";
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
var ihubController = require("./ihubController");
// Save client ID and SECRET for google oauth2.0
var GOOGLE_CLIENT_ID = '906533237378-fudqvinp77l1e9kpokjlst1pcivd00rm.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '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';
// Create google strategy to implement oauth using passport and google API
// This is taken from passport documentation
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
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
