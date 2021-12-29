const db = require("../models/db");

module.exports = {
    addIdea: async function(req: any, res: any) {
        try {
            console.log(req.body);

            const idea = await db.query("INSERT INTO ideas(firstName, lastName, email, title, descr, stripe_id, user_id) VALUES($1, $2, $3, $4, $5, $6, $7)",
                                        [req.body.firstName, req.body.lastName, req.body.email, req.body.title, req.body.description, req.body.stripe_id, req.body.user_id]);

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
    },
    addUser: async function(userInfo: any) {
        try {
            console.log(userInfo);
            const user = await db.query("INSERT INTO users(user_id, firstName, lastName) VALUES($1, $2, $3) ON CONFLICT (user_id) DO NOTHING",
                                        [userInfo.user_id, userInfo.firstName, userInfo.lastName]);
            return user;

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            return message;
        }
    },
    readUserIdeas: async function(req: any, res: any) {
        try {
            console.log(req.params);
            const ideas = await db.query("SELECT * FROM ideas WHERE user_id = $1",
                                        [req.params.user]);
            res.json(ideas);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            return message;
        }
    },
    updateIdea: async function(req: any, res: any) {
        try {
            console.log(req.body);
            const idea = await db.query("UPDATE ideas SET donations = donations+$1 WHERE stripe_id = $2",
                                        [req.body.donation, req.params.id]);
            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            return message;
        }
    }        
  };