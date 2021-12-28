"use strict";
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
var ihubController = require("./ihubController");
var GOOGLE_CLIENT_ID = '751940641317-ppl10nn6su6jvdgl848tirqv6d0oa8oo.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    var user = ihubController.addUser({
        user_id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
    });
    console.log(user);
    return done(null, profile);
}));
passport.serializeUser(function (user, done) {
    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    return done(null, user);
});
