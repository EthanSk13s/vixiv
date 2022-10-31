import { Request, Response, NextFunction, Router} from "express";
import { FieldPacket, QueryError, RowDataPacket } from "mysql2";
import * as bcrypt from "bcrypt";

import { db } from "./connection";

var router = Router();

/* GET login page. */
function checkUser(username: string, pass: string, callback: Function) {
    let matchPassResult: boolean = false;
    db.query(`SELECT * FROM vixiv.users WHERE username=?`, [username], (err, result: RowDataPacket[], fields) => {
        if (err) throw err;

        if (result.length == 1) {
            console.log(result[0].password);
            matchPassResult = bcrypt.compareSync(pass, result[0].password);

            return callback(matchPassResult);
        }
    });
}

router.post('/', function (req: Request, res: Response, next: NextFunction) {
    checkUser(req.body.username, req.body.password, (result: boolean) => {
        if (result) {
            res.json({valid: true});
        } else {
            console.log(":(");
        }
    });
});

module.exports = router;
