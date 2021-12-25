const db = require("../models/db");

module.exports = {
    addIdea: function(req: any, res: any) {
        try {
            console.log(req.body);
            const firstName = req.body.firstName;
            const lastName = req.body.firstName;
            const title = req.body.title;
            const descr = req.body.descr;

            console.log(firstName);
            console.log(lastName);
            console.log(title);
            console.log(descr);
            res.json({Id: 5, Name: "Pran"});

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    }    
  };