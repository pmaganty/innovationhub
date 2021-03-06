import { Router } from "express";
const passport = require("passport");
const path = require("path");
const stripe = require("stripe")('sk_test_51KAzN1K57oIWPlviEqzrARmSoxhzcFGfb6eDKk8BYQ6BFAJ9SfyvudRZbrtEwqR9i01yBro8Fqv60knWdjieIP0900SMH2KxL6');
const ihubController = require("./ihubController");
const router =  Router();
require("./auth");

// Google oauth2.0 API to reroute user to login
// This is taken from passport documentation
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google oauth2.0 callback
// This is taken from passport documentation
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failedLogin', session: true }),
  function (req, res) {
    res.redirect('/home');
  });

// Function to generate account link with account info associated with user payment info
// This is taken from Stripe documentation
function generateAccountLink(accountID: string, origin: string, idea_id: string) {
    return stripe.accountLinks
      .create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/checkSubmission?account_id=${accountID}&idea_id=${idea_id}`,
        return_url: `${origin}/checkSubmission?account_id=${accountID}&idea_id=${idea_id}`
      })
      .then((link: any) => link.url);
  }

// Onboard user payment information useing Stripe Connect API
// This is taken from Stripe documentation
router.post("/onboard-user", async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            type: "standard",
            business_type: 'individual',
            email: req.body.email
        });
        const origin = `${req.headers.origin}`;
        const accountLinkURL = await generateAccountLink(account.id, origin, req.body.id);
        res.send({ url: accountLinkURL, id: account.id });
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
        res.json(message);
    }
  });

  // Get stripe account associated with a stripe id using Stripe Connect API
  router.get("/stripeAccount/:id", async (req, res) => {
    try {
        const account = await stripe.accounts.retrieve(req.params.id);
        res.send(account);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
        res.json(message);
    }
  });

  // Get current user of current session
  router.get('/user', async (req, res) => {
    res.send(req.user);
  });
  
  // Create checkout session for user to input payment using Stripe Connect API
  // This is taken from Stripe documentation
  router.post('/create-checkout-session', async (req, res) => {
    const origin = `${req.headers.origin}`;
    const { amount, stripe_id, title, idea_id } = req.body;

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
      cancel_url: `${origin}/failedPayment?idea_id=${idea_id}`,
    }, {
      stripeAccount: stripe_id,
    });   

    res.send({
        sessionId: session.id, 
        url: session.url
    });
});   

// All custom routes below

// Associated with adding or updating new idea
router.route("/api/ihub")
  .post(ihubController.addIdea)
  .put(ihubController.updateIdeaStripeID);

// Associated with ideas belonging to specific user
router.route("/api/ihub/ideas/:user")
  .get(ihubController.readUserIdeas)
  .delete(ihubController.deleteIdea);

// Associated with invalid ideas
router.route("/api/ihub/ideas/payment/invalid")
  .delete(ihubController.deleteInvalidIdea);

// Associated with invalid donations
router.route("/api/ihub/donations/invalid/:id")
  .delete(ihubController.deleteInvalidDonation);

// Associated with searching all ideas
router.route("/api/ihub/search/:searchTerm")
  .get(ihubController.readAll);

// Associated with payments for specific idea
router.route("/api/ihub/stripeId/:id")
  .get(ihubController.getStripeId)
  .put(ihubController.updateIdea);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

export { router };