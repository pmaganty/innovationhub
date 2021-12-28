//const express = require("express");
import express from "express";
import session from "express-session";
import { router } from "./routes";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

dotenv.config();

const app = express();
const PORT = 3000;

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })  
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());

app.use(express.static("client/build"));

app.use(router);

/*passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
    return done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '751940641317-ppl10nn6su6jvdgl848tirqv6d0oa8oo.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
    },
    function(accessToken: any, refreshToken: any, profile: any, cb: any) {
    //This means authentication is succesful. Add to database.
    console.log(profile);
    })
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});*/

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});