import { Request, Response, NextFunction, Router} from "express";
import { RowDataPacket } from "mysql2/promise";
import * as bcrypt from "bcrypt";

import { db } from "./connection";

var router = Router();

/* GET login page. */
async function checkUser(username: string, pass: string) {
    let matchPassResult: boolean = false;

    const conn = db;
    const [rowsLike, fields] = await conn.query(`SELECT * FROM vixiv.users WHERE username=?`, [username]);
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];

    if ((rows as RowDataPacket[]).length == 1) {
        matchPassResult = await bcrypt.compare(pass, rows[0].password);

        return {result: matchPassResult, row: rows[0]};
    }
}

function createUserSession(req: Request, res: Response, userId: number, hasProfile: boolean, next: NextFunction) {
    req.session.regenerate((err: any) => {
        if (err) next(err);

        req.session.user = String(userId);

        req.session.save((err: any) => {
            if (err) next(err);
            res.json({valid: true, userId: userId, hasProfile: hasProfile});
        })
    })
}

router.post('/', function (req: Request, res: Response, next: NextFunction) {
    checkUser(req.body.username, req.body.password)
        .then((data) => {
            if (data?.result) {
                createUserSession(req, res, data!.row.id, data!.row.has_profile, next);
            } else {
                res.json({valid: false})
            }
        })
});

module.exports = router;