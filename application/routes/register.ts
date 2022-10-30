import { Request, Response, NextFunction, Router } from "express";

var router = Router();

router.post('/', function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body.user);
    console.log(req.body.email);
    console.log(req.body.password);

    res.redirect('/login');
})

module.exports = router;
