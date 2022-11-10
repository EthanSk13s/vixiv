import { Request, Response, NextFunction, Router } from "express";
import multer, { diskStorage } from 'multer';
import { RowDataPacket } from "mysql2";

import path from "path";

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
    const conn = db.promise()
    const now = new Date();

    await conn.query(
        `
        INSERT INTO posts(post_id, author_id, post_upload, title, description)
            VALUES(?, ?, ?, ?, ?)
        `, [postId, userId, now, title, description]
    );
}

async function getPost(postId: string) {
    const conn = db.promise()

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
    const conn = db.promise();
    const query = req.query;
    let values = [];
    let sqlQuery = `SELECT * FROM vixiv.posts INNER JOIN users ON posts.author_id = users.id `;

    if (query.user) {
        values.push(query.user);
        sqlQuery += `WHERE author_id=? `;
    }

    if (query.search) {
        if (query.user) {
            sqlQuery += `AND`;
        }

        values.push(`${query.search}%`);
        sqlQuery += `WHERE title LIKE ?`;
    }

    if (query.limit) {
        values.push(Number(query.limit));
        sqlQuery += `ORDER BY post_upload DESC LIMIT ?;`
    }

    let [rowsLike] = await conn.query(sqlQuery, values);
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

    return res.json(posts)
})

async function postComment(postId: number, userId: number, date: Date, content: string) {
    const conn = db.promise();

    let sqlQuery = 'INSERT INTO comments(post_id, user_id, comment_date, content) VALUES(?, ?, ?, ?);'

    await conn.query(sqlQuery, [postId, userId, date ,content]);
}

async function getComments(postId: string) {
    const conn = db.promise();

    let sqlQuery = `SELECT * FROM comments INNER JOIN users ON comments.user_id=users.id WHERE post_id=? ORDER BY comment_date DESC;`

    let [rowsLike] = await conn.query(sqlQuery, [postId]);
    const rows: RowDataPacket[] = rowsLike as RowDataPacket[];

    let comments: any[] = [];
    rows.forEach((data) => {
        let comment = {
            userName: data.username,
            content: data.content,
            date: data.comment_date
        }

        comments.push(comment);
    })

    return comments;
}

router.post('/posts/:id/comments', async (req: Request, res: Response, next: NextFunction) => {
    await postComment(req.body.postId, req.body.userId, new Date(req.body.date), req.body.content);

    return res.sendStatus(200);
})

router.get('/posts/:id/comments', async (req: Request, res: Response, next: NextFunction) => {
    let comments = await getComments(req.params.id);

    return res.json(comments);
})

module.exports = router;
