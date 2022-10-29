import {Request, Response, NextFunction, Router} from "express";

var router = Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('view_image');
});

module.exports = router;
