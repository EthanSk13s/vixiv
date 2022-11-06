import { Request, Response, NextFunction, Router } from "express";
import multer, { diskStorage } from 'multer';
import { RowDataPacket } from "mysql2";

import path from "path";
import { json } from "stream/consumers";

import { genID } from "../helpers/id-gen";
import { db, sessions } from "./connection";

var router = Router();

// https://github.com/expressjs/multer/issues/439#issuecomment-559698822 file extension mapping
const extensionMatch = /\.+[\S]+$/;
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/storage/images'))
    },
    filename: (req, file, cb) => {
        const { originalname } = file;

        const fileExtension = (originalname.match(extensionMatch) || [])[0];
        cb(null, `${genID()}${fileExtension}`);
    }
})
const upload = multer({ storage: storage })

async function createPost(postId: string, userId: string, title: string, description: string) {
    const conn = await db;
    const now = new Date();

    await conn.query(
        `
        INSERT INTO posts(post_id, author_id, post_upload, title, description)
            VALUES(?, ?, ?, ?, ?)
        `, [postId, userId, now, title, description]
    );
}

async function getPost(postId: string) {
    const conn = await db;

    let [rowsLike] = await conn.query(
        `
        SELECT * FROM vixiv.posts 
            INNER JOIN users ON posts.author_id = users.id 
            WHERE post_id=?;
        `, [postId]
    );
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];
    let data = rows[0] as RowDataPacket;

    let post = {
        postId: data.post_id,
        title: data.title,
        description: data.description,
        postUpload: data.post_upload,
        authorName: data.username
    }

    return post;
}

router.post('/', upload.single('file-upload'),  async (req: Request, res: Response, next: NextFunction) => {
    const requestCookie = req.signedCookies['login_token'];
    const userId = sessions[requestCookie].userId;
    const postId = req.file?.filename.replace(extensionMatch, '');

    await createPost(postId!, userId, req.body.imageTitle, req.body.imageDesc);
    res.redirect(`/post/${postId}`);
});

router.get('/posts/:id', async (req: Request, res: Response, next: NextFunction) => {
    let post = await getPost(req.params.id);
    return res.send({post});
})

router.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
    const conn = await db;
    
    let [rowsLike] = await conn.query(
        `
        SELECT * FROM vixiv.posts
            INNER JOIN users ON posts.author_id = users.id 
            ORDER BY post_upload DESC LIMIT 15;
        `
    )
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];
    let posts: any[] = [];

    rows.forEach((data) => {
        let post = {
            postId: data.post_id,
            title: data.title,
            authorName: data.username
        }

        posts.push(post);
    })

    let response = JSON.stringify({data: posts});

    return res.send(response)
})

module.exports = router;
