//const express = require("express");
import * as express from "express";
import { router } from "./routes";
const bodyParser = require("body-parser");
const pool = require("./models/db");
//const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

app.use(router);

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});