import { Request, Response, NextFunction, Router } from "express";

var router = Router();

// I have no clue why copy-pasting this here works, but not in another module so ¯\_(ツ)_/¯
import 'express-session';

declare module 'express-session' {
    export interface SessionData {
        user: string | null;
    }
}

router.get('/logout', function (req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
        if (err) next(err);

        res.sendStatus(200);
    })
});

router.get('/session', function (req: Request, res: Response) {
    if (req.session.user) {
        res.sendStatus(200)
    }
})

module.exports = router;
