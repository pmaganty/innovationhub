import { Router } from "express";
import { appendFile } from "fs";
const passport = require("passport");
const path = require("path");
const stripe = require("stripe")('sk_test_51KAzN1K57oIWPlviEqzrARmSoxhzcFGfb6eDKk8BYQ6BFAJ9SfyvudRZbrtEwqR9i01yBro8Fqv60knWdjieIP0900SMH2KxL6');
//import ihubController from "../controllers/ihubController";
const ihubController = require("./ihubController");
const router =  Router();
require("./auth");

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failedLogin', session: true }),
  function (req, res) {
    res.redirect('/home');
  });

function generateAccountLink(accountID: any, origin: any) {
    return stripe.accountLinks
      .create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/failedSubmission`,
        return_url: `${origin}/successfulSubmission`
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
        res.send({ url: accountLinkURL, id: account.id });
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
        res.json(message);
    }
  });

  router.get('/user', async (req, res) => {
    console.log("inside backend user route");
    res.send(req.user);
  });
  
  router.post('/create-checkout-session', async (req, res) => {
    console.log("backend create checkout session");
    const origin = `${req.headers.origin}`;

    console.log(origin);
  
    const { amount, stripe_id, title } = req.body;

    console.log(amount);
    // Create new Checkout Session for the order
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: title,
          quantity: 1,
          currency: 'USD',
          amount: amount, // Keep the amount on the server to prevent customers from manipulating on client
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${origin}/successfulPayment`,
      cancel_url: `${origin}/failedPayment`,
    }, {
      stripeAccount: stripe_id,
    });   

    res.send({
        sessionId: session.id, 
        url: session.url
    });
});   



router.get('/api', (req,res)=>{
  res.send({Id: 5, Name: "Pran"});
});

router.route("/api/ihub")
  .post(ihubController.addIdea)

router.route("/api/ihub/ideas/:user")
  .get(ihubController.readUserIdeas)
  .delete(ihubController.deleteIdea);

router.route("/api/ihub/ideas/payment/invalid")
  .delete(ihubController.deleteInvalidIdea);

router.route("/api/ihub/donations/invalid")
  .delete(ihubController.deleteInvalidDonation);

router.route("/api/ihub/search/:searchTerm")
  .get(ihubController.readAll);

router.route("/api/ihub/email/:email")
  .get(ihubController.checkEmail);

router.route("/api/ihub/stripeId/:id")
  .get(ihubController.getStripeId)
  .put(ihubController.updateIdea);



// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

export { router };