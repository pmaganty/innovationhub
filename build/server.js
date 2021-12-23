"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(routes);
app.get('/api', function (req, res) {
    res.send({ Id: 5, Name: "Pran" });
});
// Start the API server
app.listen(PORT, function () {
    console.log("API Server now listening on PORT ".concat(PORT, "!"));
});
