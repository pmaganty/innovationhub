import { Router } from "express";
const router =  Router();

router.get('/api', (req,res)=>{
    res.send({Id: 5, Name: "Pran"});
});

router.post('/api/ihub', (req,res)=>{
    try {
        console.log(req.body);
        const firstName = req.body.firstName;
        const lastName = req.body.firstName;
        const title = req.body.title;
        const descr = req.body.descr;

        console.log(firstName);
        console.log(lastName);
        console.log(title);
        console.log(descr);

    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.log(message);
    }
});

export { router };