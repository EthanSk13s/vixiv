import { Request, Response, Router, NextFunction } from "express";
import { RowDataPacket } from "mysql2";

import { db } from "./connection";

var router = Router();

/* GET users listing. */
router.get('/profile/:id', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.session.user;
    const conn = db.promise();

    let [rowsLike] = await conn.query('SELECT * FROM users WHERE id=?', [userId]);
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];
    let data = rows[0] as RowDataPacket;

    let user = {
        username: data.username,
        hasProfile: data.has_profile
    }
    res.json(user);
});

module.exports = router;
