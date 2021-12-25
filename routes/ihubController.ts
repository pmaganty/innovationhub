const db = require("../models/db");

module.exports = {
    addIdea: async function(req: any, res: any) {
        try {
            console.log(req.body);
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const title = req.body.title;
            const descr = req.body.descr;

            console.log(firstName);
            console.log(lastName);
            console.log(title);
            console.log(descr);

            const idea = await db.query("INSERT INTO ideas(firstName, lastName, title, descr) VALUES($1, $2, $3, $4)",
                                        [req.body.firstName, req.body.lastName, req.body.title, req.body.descr]);

            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    }    
  };