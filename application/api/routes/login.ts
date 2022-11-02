import { Request, Response, NextFunction, Router} from "express";
import { RowDataPacket } from "mysql2";
import * as bcrypt from "bcrypt";

import { db, UserSession, sessions } from "./connection";

var router = Router();
const COOKIE_EXPIRATION: number = 216000;

/* GET login page. */
function checkUser(username: string, pass: string, callback: Function) {
    let matchPassResult: boolean = false;
    db.query(`SELECT * FROM vixiv.users WHERE username=?`, [username], (err, result: RowDataPacket[], fields) => {
        if (err) throw err;

        if (result.length == 1) {
            console.log(result[0].password);
            matchPassResult = bcrypt.compareSync(pass, result[0].password);

            return callback(matchPassResult, result[0]);
        }
    });
}

function createUserSession(req: Request, res: Response, userId: number) {
    const randId = Math.random() * 10000;
    const now: Date = new Date();

    const expiresAt: Date = new Date(+now + (COOKIE_EXPIRATION * 100));
    const session: UserSession = new UserSession(userId, expiresAt);

    sessions[randId] = session;
    res.cookie('login_token', randId, {signed: true, expires: expiresAt, sameSite: "lax"})
    res.json({valid: true});
    res.end();
}

router.post('/', function (req: Request, res: Response, next: NextFunction) {
    checkUser(req.body.username, req.body.password, (result: boolean, data: RowDataPacket) => {
        if (result) {
            createUserSession(req, res, data.id);
            console.log(sessions);
        } else {
            console.log(":(");
        }
    });
});

router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.render("login");
});

module.exports = router;
