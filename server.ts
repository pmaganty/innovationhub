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
const PORT = process.env.PORT || 3000;

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

  
//if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
//}

app.use(router);

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});