import axios from "axios";

export default {
  addIdea: function(idea) {
    return axios.post("/api/profiles", idea);
  },
};
