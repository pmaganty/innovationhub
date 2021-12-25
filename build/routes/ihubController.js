"use strict";
var db = require("../models/db");
module.exports = {
    addIdea: function (req, res) {
        try {
            console.log(req.body);
            var firstName = req.body.firstName;
            var lastName = req.body.firstName;
            var title = req.body.title;
            var descr = req.body.descr;
            console.log(firstName);
            console.log(lastName);
            console.log(title);
            console.log(descr);
            res.json({ Id: 5, Name: "Pran" });
        }
        catch (error) {
            var message = void 0;
            if (error instanceof Error)
                message = error.message;
            else
                message = String(error);
            console.log(message);
            res.json(message);
        }
    }
};
