const db = require("../models/db");

// This controller will handle all database management
// It will take information from the client, handle in database, 
// and return the necessary data

module.exports = {
    // Insert new idea into db
    addIdea: async function(req: any, res: any) {
        try {
            const idea = await db.query("INSERT INTO ideas(firstName, lastName, email, title, descr, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING ideas_id",
                                        [req.body.firstName, req.body.lastName, req.body.email, req.body.title, req.body.description, req.body.user_id]);

            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    },
    // Update idea with stripe id
    updateIdeaStripeID: async function(req: any, res: any) {
        try {
            const idea = await db.query("UPDATE ideas SET stripe_id = $1 WHERE ideas_id = $2",
                                        [req.body.stripe_id, req.body.ideas_id]);

            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            res.json(message);
        }
    },
    // Get all ideas associated with input search term
    readAll: async function(req: any, res: any) {
        try {
            let parameter = "%" + req.params.searchTerm + "%";
            const idea_list = await db.query("SELECT * FROM ideas WHERE ((LOWER(firstName) LIKE LOWER($1)) OR (LOWER(lastName) LIKE LOWER($1)) OR (LOWER(descr) LIKE LOWER($1)) OR (LOWER(title) LIKE LOWER($1)))", 
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
    // Get idea associated with idea id
    getStripeId: async function(req: any, res: any) {
        try {
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
    // Add new user
    addUser: async function(userInfo: any) {
        try {
            console.log(process.env.DATABASE_URL);
            const user = await db.query("INSERT INTO users(user_id, firstName, lastName) VALUES($1, $2, $3) ON CONFLICT (user_id) DO NOTHING",
                                        [userInfo.user_id, userInfo.firstName, userInfo.lastName]);

            return user;

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log("Error:" + message);
            return message;
        }
    },
    // Get all ideas associated with user
    readUserIdeas: async function(req: any, res: any) {
        try {
            const ideas = await db.query("SELECT * FROM ideas WHERE user_id = $1",
                                        [req.params.user]);
            res.json(ideas);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log("Err: " + message);
            return message;
        }
    },
    // Update idea with a donation amount
    updateIdea: async function(req: any, res: any) {
        try {
            const idea = await db.query("UPDATE ideas SET donations = donations+$1, lastDonated = $1 WHERE ideas_id = $2",
                                        [req.body.donation, req.params.id]);
            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            return message;
        }
    },
    // Delete idea associated with idea id
    deleteIdea: async function(req: any, res: any) {
        try {
            const ideas = await db.query("DELETE FROM ideas WHERE ideas_id = $1 RETURNING *",
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
    // Delete last idea
    deleteInvalidIdea: async function(req: any, res: any) {
        try {
            const idea = await db.query("DELETE FROM ideas WHERE ideas_id = (SELECT MAX(ideas_id) FROM ideas)");
            res.json(idea);

        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            console.log(message);
            return message;
        }
    },    
    // Delete last made donation
    deleteInvalidDonation: async function(req: any, res: any) {
        try {

            const idea = await db.query("UPDATE ideas SET donations = donations-lastDonated WHERE ideas_id = (SELECT MAX(ideas_id) FROM ideas)");
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