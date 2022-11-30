import { Request, Response, Router, NextFunction } from "express";
import multer from 'multer';
import sharp from 'sharp';
import bcrypt from 'bcrypt';

import path from "path";

import { RowDataPacket } from "mysql2";

import { db } from "./connection";
import { SALT_ROUNDS } from "./register";

const PROFILE_PATH = path.join(__dirname, "../public/storage/profiles");
const upload = multer({ storage: multer.memoryStorage() })
var router = Router();

/* GET users listing. */
router.get('/profile/:id', async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.session.user;
    const conn = db;

    let [rowsLike] = await conn.query('SELECT * FROM users WHERE id=?', [userId]);
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];
    let data = rows[0] as RowDataPacket;

    let user = {
        username: data.username,
        hasProfile: data.has_profile
    }
    res.json(user);
});

router.post('/profile', upload.single('avatar-crop'), async function (req: Request, res: Response, next: NextFunction) {
    const userId = req.session.user;
    const conn = db;

    if (!userId) {
        res.sendStatus(403);
    }

    // Convert to png
    if (req.file) {
        sharp(req.file.buffer)
            .toFormat('png')
            .toFile(path.join(PROFILE_PATH, `${userId}.png`))

        await conn.execute('UPDATE users SET has_profile=1 WHERE id=?', [userId]);
    }

    if (req.body.username) {
        await conn.execute('UPDATE users SET username=? WHERE id=?', [req.body.username, userId]);
    }

    if (req.body.password) {
        let hashedPass: string = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        await conn.execute('UPDATE users SET has_profile=1 WHERE id=?', [hashedPass, userId]);
    }
    res.sendStatus(200);
});

module.exports = router;
