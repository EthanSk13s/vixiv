import { Request, Response, NextFunction, Router } from "express";
import * as bcrypt from "bcrypt";

import { db } from "./connection";
import { genID } from "../helpers/id-gen";
import { RowDataPacket } from "mysql2";

export const SALT_ROUNDS: number = 15;
var router = Router();

async function registerUser(res: Response, username: string, email: string, pass: string) {
    let hashedPass: string = await bcrypt.hash(pass, SALT_ROUNDS);
    const conn = db.promise();

    const [rowsLike, fields] = await conn.query(`SELECT * FROM users WHERE username=?`, username);
    const check = rowsLike as RowDataPacket[];

    if (check.length < 1) {
        await conn.query(
            `
            INSERT INTO users(id, username, password, email)
                VALUES(?, ?, ?, ?)
            `, [genID(), username, hashedPass, email]
        );

        res.sendStatus(200)
    } else {
        res.sendStatus(409)
    }
}

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    await registerUser(res, req.body.user, req.body.email, req.body.password);
})

module.exports = router;
