"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var path = require("path");
//import ihubController from "../controllers/ihubController";
var ihubController = require("./ihubController");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/api', function (req, res) {
    res.send({ Id: 5, Name: "Pran" });
});
router.route("/api/ihub")
    .post(ihubController.addIdea);
// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
