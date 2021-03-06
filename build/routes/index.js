"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var passport = require("passport");
var path = require("path");
var stripe = require("stripe")('sk_test_51KAzN1K57oIWPlviEqzrARmSoxhzcFGfb6eDKk8BYQ6BFAJ9SfyvudRZbrtEwqR9i01yBro8Fqv60knWdjieIP0900SMH2KxL6');
var ihubController = require("./ihubController");
var router = (0, express_1.Router)();
exports.router = router;
require("./auth");
// Google oauth2.0 API to reroute user to login
// This is taken from passport documentation
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// Google oauth2.0 callback
// This is taken from passport documentation
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failedLogin', session: true }), function (req, res) {
    res.redirect('/home');
});
// Function to generate account link with account info associated with user payment info
// This is taken from Stripe documentation
function generateAccountLink(accountID, origin, idea_id) {
    return stripe.accountLinks
        .create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: "".concat(origin, "/checkSubmission?account_id=").concat(accountID, "&idea_id=").concat(idea_id),
        return_url: "".concat(origin, "/checkSubmission?account_id=").concat(accountID, "&idea_id=").concat(idea_id)
    })
        .then(function (link) { return link.url; });
}
// Onboard user payment information useing Stripe Connect API
// This is taken from Stripe documentation
router.post("/onboard-user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var account, origin_1, accountLinkURL, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, stripe.accounts.create({
                        type: "standard",
                        business_type: 'individual',
                        email: req.body.email
                    })];
            case 1:
                account = _a.sent();
                origin_1 = "".concat(req.headers.origin);
                return [4 /*yield*/, generateAccountLink(account.id, origin_1, req.body.id)];
            case 2:
                accountLinkURL = _a.sent();
                res.send({ url: accountLinkURL, id: account.id });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                message = void 0;
                if (error_1 instanceof Error)
                    message = error_1.message;
                else
                    message = String(error_1);
                console.log(message);
                res.json(message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get stripe account associated with a stripe id using Stripe Connect API
router.get("/stripeAccount/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var account, error_2, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, stripe.accounts.retrieve(req.params.id)];
            case 1:
                account = _a.sent();
                res.send(account);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                message = void 0;
                if (error_2 instanceof Error)
                    message = error_2.message;
                else
                    message = String(error_2);
                console.log(message);
                res.json(message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get current user of current session
router.get('/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send(req.user);
        return [2 /*return*/];
    });
}); });
// Create checkout session for user to input payment using Stripe Connect API
// This is taken from Stripe documentation
router.post('/create-checkout-session', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var origin, _a, amount, stripe_id, title, idea_id, session;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                origin = "".concat(req.headers.origin);
                _a = req.body, amount = _a.amount, stripe_id = _a.stripe_id, title = _a.title, idea_id = _a.idea_id;
                return [4 /*yield*/, stripe.checkout.sessions.create({
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
                        success_url: "".concat(origin, "/successfulPayment"),
                        cancel_url: "".concat(origin, "/failedPayment?idea_id=").concat(idea_id),
                    }, {
                        stripeAccount: stripe_id,
                    })];
            case 1:
                session = _b.sent();
                res.send({
                    sessionId: session.id,
                    url: session.url
                });
                return [2 /*return*/];
        }
    });
}); });
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
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
