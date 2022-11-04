import { Request, Response, NextFunction, Router } from "express";
import * as bcrypt from "bcrypt";

import { db } from "./connection";

const SALT_ROUNDS: number = 15;
var router = Router();

// https://stackoverflow.com/a/56478076 for now, figure out something better
function genID() {
    return Date.now() + ((Math.random()*100000).toFixed())
}

async function registerUser(username: string, email: string, pass: string) {
    let hashedPass: string = bcrypt.hashSync(pass, SALT_ROUNDS);
    const conn = await db;

    await conn.query(
        `
        INSERT INTO users(id, username, password, email)
            VALUES(?, ?, ?, ?)
        `, [genID(), username, hashedPass, email]
    );
}

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    await registerUser(req.body.user, req.body.email, req.body.password);

    res.redirect('/login');
})

module.exports = router;
