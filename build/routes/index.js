"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/api', function (req, res) {
    res.send({ Id: 5, Name: "Pran" });
});
router.post('/api/ihub', function (req, res) {
    try {
        console.log(req.body);
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var title = req.body.title;
        var descr = req.body.descr;
        console.log(firstName);
    }
    catch (error) {
        var message = void 0;
        if (error instanceof Error)
            message = error.message;
        else
            message = String(error);
        console.log(message);
    }
});
