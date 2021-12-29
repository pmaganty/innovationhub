import axios from "axios";

export default {
  addIdea: function(idea: any) {
    return axios.post("/api/ihub", idea);
  },
  updateIdeaStripeID: function(info: any) {
    return axios.put("/api/ihub", info);
  },
  readAll: function(newSearch: any) {
    console.log("Inside readall api" + newSearch);
    return axios.get("/api/ihub/search/" + newSearch);
  },
  checkEmail: function(email: any) {
    return axios.get("/api/ihub/email/" + email);
  },
  stripeOnboard: function(info: any) {
    console.log("fronend route onboard-user");
    return axios.post("/onboard-user", info);
  },
  checkStripeAccount: function(id: any) {
    console.log("fronend route check stripe account");
    return axios.get("/stripeAccount/" + id);
  },
  getStripeId: function(id: any) {
    console.log("fronend route get stripe id");
    return axios.get("/api/ihub/stripeId/" + id);
  },
  donateMoney: function(newPayment: any) {
    console.log("fronend route donate money");
    return axios.post("/create-checkout-session", newPayment);
  },
  createNewUser: function() {
    console.log("fronend route auth");
    return axios.post("/auth/google");
  },
  checkUser: function() {
    console.log("fronend route check user");
    return axios.get("/user");
  },
  readUserIdeas: function(id: any) {
    console.log("fronend route read user ideas");
    return axios.get("/api/ihub/ideas/" + id);
  },
  updateIdea: function(info: any, id: any) {
    console.log("fronend route update ideas");
    return axios.put("/api/ihub/stripeId/" + id, info);
  },
  deleteIdea: function(id: any) {
    console.log("fronend route delete ideas");
    return axios.delete("/api/ihub/ideas/" + id);
  },
  deleteInvalidIdea: function() {
    console.log("fronend route delete invalid ideas");
    return axios.delete("/api/ihub/ideas/payment/invalid");
  },
  deleteInvalidDonation: function() {
    console.log("fronend route delete invalid donation");
    return axios.delete("/api/ihub/donations/invalid");
  }
};
