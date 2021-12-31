import express from "express";
import session from "express-session";
import { router } from "./routes";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");

dotenv.config();

// Create express app and specify PORT
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

  
app.use(express.static("client/build"));

// Allow app to user outes defined in router
app.use(router);

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});