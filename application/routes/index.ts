import {Request, Response, NextFunction, Router} from "express";

var router = Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'CSC 317 App', name:"Ethan Magalong" });
});

module.exports = router;
