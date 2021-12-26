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
};