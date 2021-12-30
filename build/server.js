"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var routes_1 = require("./routes");
var dotenv = __importStar(require("dotenv"));
var bodyParser = require("body-parser");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
dotenv.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Define middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
//if (process.env.NODE_ENV === "production") {
app.use(express_1.default.static("client/build"));
//}
app.use(routes_1.router);
// Start the API server
app.listen(PORT, function () {
    console.log("API Server now listening on PORT ".concat(PORT, "!"));
});
