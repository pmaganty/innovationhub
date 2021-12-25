"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
var express = require("express");
var routes_1 = require("./routes");
var bodyParser = require("body-parser");
var pool = require("./models/db");
//const routes = require("./routes");
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(routes_1.router);
// Start the API server
app.listen(PORT, function () {
    console.log("API Server now listening on PORT ".concat(PORT, "!"));
});
