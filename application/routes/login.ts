import {Request, Response, NextFunction, Router} from "express";

var router = Router();

/* GET login page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('login');
});

module.exports = router;
