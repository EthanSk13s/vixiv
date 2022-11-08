import { Request, Response, NextFunction, Router} from "express";
import { RowDataPacket } from "mysql2/promise";
import * as bcrypt from "bcrypt";

import { db, UserSession, sessions } from "./connection";

var router = Router();
const COOKIE_EXPIRATION: number = 216000;

/* GET login page. */
async function checkUser(username: string, pass: string) {
    let matchPassResult: boolean = false;

    const conn = db.promise();
    const [rowsLike, fields] = await conn.query(`SELECT * FROM vixiv.users WHERE username=?`, [username]);
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];

    if ((rows as RowDataPacket[]).length == 1) {
        matchPassResult = await bcrypt.compare(pass, rows[0].password);

        return {result: matchPassResult, row: rows[0]};
    }
}

function createUserSession(req: Request, res: Response, userId: number) {
    const randId = Math.random() * 10000;
    const now: Date = new Date();

    const expiresAt: Date = new Date(+now + (COOKIE_EXPIRATION * 100));
    const session: UserSession = new UserSession(userId, expiresAt);

    sessions[randId] = session;
    res.cookie('login_token', randId, {signed: true, expires: expiresAt, sameSite: "lax"})
    res.json({valid: true, userId: userId});
    res.end();
}

router.post('/', function (req: Request, res: Response, next: NextFunction) {
    checkUser(req.body.username, req.body.password)
        .then((data) => {
            if (data?.result) {
                createUserSession(req, res, data!.row.id);
            }
        })
});

module.exports = router;