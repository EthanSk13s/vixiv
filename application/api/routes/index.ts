import {Request, Response, NextFunction, Router} from "express";

import { sessions, UserSession } from "./connection";

var router = Router();

router.get('/logout', function (req: Request, res: Response, next: NextFunction) {
    const sessionId = req.signedCookies['login_token'];
    delete sessions[sessionId];
    res.clearCookie('login_token');

    res.sendStatus(200);
});

module.exports = router;
