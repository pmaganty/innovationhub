import { Router } from "express";
//import ihubController from "../controllers/ihubController";
const ihubController = require("./ihubController");
const router =  Router();

router.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
});

router.route("/api/ihub")
  .post(ihubController.addIdea);

export { router };