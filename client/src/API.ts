import axios from "axios";

export default {
  addIdea: function(idea: any) {
    return axios.post("/api/ihub", idea);
  },
  readAll: function(newSearch: any) {
    console.log("Inside readall api" + newSearch);
    return axios.get("/api/ihub/search/" + newSearch);
  },
  checkEmail: function(email: any) {
    return axios.get("/api/ihub/email/" + email);
  },
  stripeOnboard: function() {
    console.log("fronend route onboard-user");
    return axios.post("/onboard-user");
  },
  getStripeId: function(id: any) {
    console.log("fronend route get stripe id");
    return axios.get("/api/ihub/stripeId/" + id);
  },
  donateMoney: function(newPayment: any) {
    console.log("fronend route donate money");
    return axios.post("/create-checkout-session", newPayment);
  }
};
