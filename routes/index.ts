import { Router } from "express";
const path = require("path");
const stripe = require("stripe")('sk_test_51KAzN1K57oIWPlviEqzrARmSoxhzcFGfb6eDKk8BYQ6BFAJ9SfyvudRZbrtEwqR9i01yBro8Fqv60knWdjieIP0900SMH2KxL6');
//import ihubController from "../controllers/ihubController";
const ihubController = require("./ihubController");
const router =  Router();

function generateAccountLink(accountID: any, origin: any) {
    return stripe.accountLinks
      .create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/email`,
        return_url: `${origin}/create`
      })
      .then((link: any) => link.url);
  }

router.post("/onboard-user", async (req, res) => {
    try {
        console.log("inside back end onboard user route");
        const account = await stripe.accounts.create({
            type: "standard",
            business_type: 'individual'
        });
        //req.session.accountID = account.id;
        const origin = `${req.headers.origin}`;
        const accountLinkURL = await generateAccountLink(account.id, origin);
        res.send({ url: accountLinkURL });
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
        res.json(message);
    }
  });

router.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
});

router.route("/api/ihub")
  .post(ihubController.addIdea)

router.route("/api/ihub/search/:searchTerm")
  .get(ihubController.readAll);

router.route("/api/ihub/email/:email")
  .get(ihubController.checkEmail);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

export { router };