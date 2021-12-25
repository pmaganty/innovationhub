import { Router } from "express";
const path = require("path");
//import ihubController from "../controllers/ihubController";
const ihubController = require("./ihubController");
const router =  Router();

router.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
});

router.route("/api/ihub")
  .post(ihubController.addIdea);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

export { router };