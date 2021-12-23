"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/api', function (req, res) {
    res.send({ Id: 5, Name: "Pran" });
});
