import axios from "axios";

export default {
  addIdea: function(idea: any) {
    return axios.post("/api/ihub", idea);
  },
};
