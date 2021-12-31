import axios from "axios";

// This defines all possible API requests that can be made by client
export default {
  // Add new idea
  addIdea: function(idea: any) {
    return axios.post("/api/ihub", idea);
  },
  // Update idea with stripe id
  updateIdeaStripeID: function(info: any) {
    return axios.put("/api/ihub", info);
  },
  // Get all ideas associated with a search term
  readAll: function(newSearch: any) {
    return axios.get("/api/ihub/search/" + newSearch);
  },
  // Onboard user payment information to Stripe
  stripeOnboard: function(info: any) {
    return axios.post("/onboard-user", info);
  },
  // Get account object associated with stripe id
  checkStripeAccount: function(id: any) {
    return axios.get("/stripeAccount/" + id);
  },
  // Get stripe id associated with an idea id
  getStripeId: function(id: any) {
    return axios.get("/api/ihub/stripeId/" + id);
  },
  // Create payment method for user donation with Stripe
  donateMoney: function(newPayment: any) {
    console.log("fronend route donate money");
    return axios.post("/create-checkout-session", newPayment);
  },
  // Add new user once authenticated
  createNewUser: function() {
    console.log("fronend route auth");
    return axios.post("/auth/google");
  },
  // Get current user
  checkUser: function() {
    console.log("fronend route check user");
    return axios.get("/user");
  },
  // Get all ideas associated with a user
  readUserIdeas: function(id: any) {
    console.log("fronend route read user ideas");
    return axios.get("/api/ihub/ideas/" + id);
  },
  // Update idea associated with idea id with user donation amount
  updateIdea: function(info: any, id: any) {
    console.log("fronend route update ideas");
    return axios.put("/api/ihub/stripeId/" + id, info);
  },
  // Delete idea
  deleteIdea: function(id: any) {
    console.log("fronend route delete ideas");
    return axios.delete("/api/ihub/ideas/" + id);
  },
  // Delete Idea if last donation was invalid
  deleteInvalidIdea: function() {
    console.log("fronend route delete invalid ideas");
    return axios.delete("/api/ihub/ideas/payment/invalid");
  },
  // Delete last donation if payment was invalid
  deleteInvalidDonation: function() {
    console.log("fronend route delete invalid donation");
    return axios.delete("/api/ihub/donations/invalid");
  }
};
