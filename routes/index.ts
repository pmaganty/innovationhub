import { Router } from "express";
const router =  Router();

router.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
});


export { router };