const db = require("../models/db");

module.exports = {
    addIdea: async function(req: any, res: any) {
        try {
            console.log(req.body);

            const idea = await db.query("INSERT INTO ideas(firstName, lastName, email, title, descr, stripe_id) VALUES($1, $2, $3, $4, $5, $6)",
                                        [req.body.firstName, req.body.lastName, req.body.email, req.body.title, req.body.description, req.body.stripe_id]);

            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    },
    readAll: async function(req: any, res: any) {
        try {
            console.log(req.params);
            let parameter = "%" + req.params.searchTerm + "%";
            console.log(parameter);
            const idea_list = await db.query("SELECT * FROM ideas WHERE ((firstName LIKE $1) OR (lastName LIKE $1) OR (descr LIKE $1) OR (title LIKE $1))", 
                                                [parameter]);
            res.json(idea_list);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    },
    checkEmail: async function(req: any, res: any) {
        try {
            console.log(req.params);
            const user_list = await db.query("SELECT * FROM ideas WHERE email = $1", 
                                                [req.params.email]);
            res.json(user_list);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    },
    getStripeId: async function(req: any, res: any) {
        try {
            console.log(req.params);
            const idea = await db.query("SELECT * FROM ideas WHERE ideas_id = $1", 
                                                [req.params.id]);
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