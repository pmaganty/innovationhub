import axios from "axios";

// This defines all possible API requests that can be made by client
export default {
  // Add new idea
  addIdea: function( idea: {firstName: string, 
                            lastName: string, 
                            title: string, 
                            description: string, 
                            email: string,
                            user_id: string}
                    ) {
    return axios.post("/api/ihub", idea);
  },
  // Update idea with stripe id
  updateIdeaStripeID: function(info: {stripe_id: string | null, ideas_id: string | null}) {
    return axios.put("/api/ihub", info);
  },
  // Get all ideas associated with a search term
  readAll: function(newSearch: string) {
    return axios.get("/api/ihub/search/" + newSearch);
  },
  // Onboard user payment information to Stripe
  stripeOnboard: function(info: {email: string, id: number}) {
    return axios.post("/onboard-user", info);
  },
  // Get account object associated with stripe id
  checkStripeAccount: function(id: string | null) {
    return axios.get("/stripeAccount/" + id);
  },
  // Get stripe id associated with an idea id
  getStripeId: function(id: number) {
    return axios.get("/api/ihub/stripeId/" + id);
  },
  // Create payment method for user donation with Stripe
  donateMoney: function(newPayment: {amount: number, stripe_id: number, title: string, idea_id: number}) {
    return axios.post("/create-checkout-session", newPayment);
  },
  // Add new user once authenticated
  createNewUser: function() {
    return axios.post("/auth/google");
  },
  // Get current user
  checkUser: function() {
    return axios.get("/user");
  },
  // Get all ideas associated with a user
  readUserIdeas: function(id: string) {
    return axios.get("/api/ihub/ideas/" + id);
  },
  // Update idea associated with idea id with user donation amount
  updateIdea: function(info: {donation: number}, id: number) {
    return axios.put("/api/ihub/stripeId/" + id, info);
  },
  // Delete idea
  deleteIdea: function(id: string | null) {
    return axios.delete("/api/ihub/ideas/" + id);
  },
  // Delete Idea if last donation was invalid
  deleteInvalidIdea: function() {
    return axios.delete("/api/ihub/ideas/payment/invalid");
  },
  // Delete last donation if payment was invalid
  deleteInvalidDonation: function(id: string | null) {
    return axios.delete("/api/ihub/donations/invalid/" + id);
  }
};
