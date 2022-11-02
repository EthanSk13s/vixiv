import {Request, Response, NextFunction, Router} from "express";

import { sessions, UserSession } from "./connection";

var router = Router();
/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
    const clientSessionToken = req.signedCookies['login_token'];
    if (clientSessionToken) {
        const session: UserSession = sessions[clientSessionToken];
        res.json({session});
    } else {
        res.send(404);
    }
});

module.exports = router;
