//const express = require("express");
import * as express from "express";
const bodyParser = require("body-parser");
const routes = require("./routes");


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(routes);

app.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
})

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});